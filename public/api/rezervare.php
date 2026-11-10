<?php
// Booking requests from edmont.ro.
// Checks the form, blocks spam, then sends the request to the hosts on WhatsApp
// (Meta Cloud API) and by email. Secrets live in edmont-config.php outside public_html.

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
date_default_timezone_set('Europe/Bucharest');

const STAY = [
    'double' => 'Cameră dublă matrimonială',
    'triple' => 'Cameră triplă',
    'several' => 'Mai multe camere',
    'whole' => 'Toată pensiunea',
];
const OCCASION = [
    'stay' => 'Sejur',
    'birthday' => 'Aniversare',
    'christening' => 'Botez',
    'retreat' => 'Retreat sau training',
    'company' => 'Întâlnire de firmă',
    'other' => 'Altceva',
];
const PET = [
    'no' => 'Nu',
    'small' => 'Da, de talie mică',
];

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $code, string $log = ''): void
{
    if ($log !== '') {
        error_log('EdMont booking: ' . $log);
    }
    respond($status, ['ok' => false, 'error' => $code]);
}

function load_config(): array
{
    $path = getenv('EDMONT_CONFIG') ?: dirname(__DIR__, 2) . '/edmont-config.php';
    if (!is_file($path)) {
        fail(500, 'config', 'config file not found at ' . $path);
    }
    $config = require $path;
    if (!is_array($config) || strlen((string)($config['secret'] ?? '')) < 32) {
        fail(500, 'config', 'config secret is missing or too short');
    }
    return $config;
}

function data_dir(array $config): string
{
    $dir = $config['data_dir'] ?? dirname(__DIR__, 2) . '/edmont-data';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        fail(500, 'storage', 'cannot create data dir ' . $dir);
    }
    return $dir;
}

// Small locked JSON file for rate limits and one-time challenges.
// $fn receives the stored array and returns [result, new array].
function with_store(string $file, callable $fn)
{
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        fail(500, 'storage', 'cannot open ' . $file);
    }
    flock($handle, LOCK_EX);
    $data = json_decode((string)stream_get_contents($handle), true);
    if (!is_array($data)) {
        $data = [];
    }
    [$result, $data] = $fn($data);
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($data));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    return $result;
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function cut(string $value, int $max): string
{
    if (text_length($value) <= $max) {
        return $value;
    }
    return (function_exists('mb_substr') ? mb_substr($value, 0, $max - 1, 'UTF-8') : substr($value, 0, $max - 1)) . '…';
}

function clean_line($value, int $max): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string)$value) ?? '';
    return cut(trim(preg_replace('/\s+/u', ' ', $value) ?? ''), $max);
}

function clean_text($value, int $max): string
{
    $value = str_replace(["\r\n", "\r"], "\n", (string)$value);
    $value = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]+/u', ' ', $value) ?? '';
    $value = preg_replace("/\n{3,}/", "\n\n", $value) ?? '';
    return cut(trim($value), $max);
}

// Proof of work: the browser must find a number whose hash matches the challenge.
// Cheap for one guest, expensive for anyone sending requests in bulk.
function new_challenge(array $config): array
{
    $max = (int)($config['pow_max'] ?? 80000);
    $salt = bin2hex(random_bytes(12)) . '?expires=' . (time() + 1800);
    $challenge = hash('sha256', $salt . random_int(0, $max));
    return [
        'algorithm' => 'SHA-256',
        'salt' => $salt,
        'challenge' => $challenge,
        'maxnumber' => $max,
        'signature' => hash_hmac('sha256', $challenge, $config['secret']),
    ];
}

function verify_challenge(array $config, string $dir, $pow): bool
{
    if (!is_array($pow)) {
        return false;
    }
    $salt = (string)($pow['salt'] ?? '');
    $challenge = (string)($pow['challenge'] ?? '');
    $signature = (string)($pow['signature'] ?? '');
    $number = $pow['number'] ?? null;

    if (!is_int($number) || $number < 0) {
        return false;
    }
    if (!preg_match('/^[a-f0-9]{24}\?expires=(\d{10})$/', $salt, $match) || (int)$match[1] < time()) {
        return false;
    }
    if (!hash_equals(hash_hmac('sha256', $challenge, $config['secret']), $signature)) {
        return false;
    }
    if (!hash_equals($challenge, hash('sha256', $salt . $number))) {
        return false;
    }

    return with_store($dir . '/challenges.json', function (array $used) use ($challenge) {
        $now = time();
        $used = array_filter($used, function ($expires) use ($now) {
            return $expires > $now;
        });
        if (isset($used[$challenge])) {
            return [false, $used];
        }
        $used[$challenge] = $now + 1800;
        return [true, $used];
    });
}

function recaptcha_enabled(array $config): bool
{
    $rc = $config['recaptcha'] ?? [];
    return ($rc['site_key'] ?? '') !== '' && ($rc['secret'] ?? '') !== '';
}

// Google reCAPTCHA v3: the browser sends a token, Google says how likely it is a human.
function verify_recaptcha(array $config, $token): bool
{
    $rc = $config['recaptcha'];
    if (!is_string($token) || $token === '' || strlen($token) > 4000) {
        return false;
    }

    $curl = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $rc['secret'],
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 8,
    ]);
    $result = json_decode((string)curl_exec($curl), true);
    curl_close($curl);

    $score = (float)($result['score'] ?? 0);
    $ok = !empty($result['success'])
        && ($result['action'] ?? '') === 'booking'
        && $score >= (float)($rc['min_score'] ?? 0.5);
    if (!$ok) {
        error_log('EdMont booking: reCAPTCHA rejected (score ' . ($result['score'] ?? 'n/a') . ')');
    }
    return $ok;
}

function within_limits(array $config, string $dir, string $ipKey): bool
{
    $per10 = (int)($config['limit_per_10_min'] ?? 3);
    $perDayIp = (int)($config['limit_per_day_ip'] ?? 8);
    $perDayAll = (int)($config['limit_per_day_total'] ?? 30);

    return with_store($dir . '/limits.json', function (array $data) use ($ipKey, $per10, $perDayIp, $perDayAll) {
        $now = time();
        $recent = function (array $times, int $window) use ($now) {
            return array_values(array_filter($times, function ($time) use ($now, $window) {
                return $time > $now - $window;
            }));
        };

        $all = $recent($data['all'] ?? [], 86400);
        $ips = [];
        foreach (($data['ip'] ?? []) as $key => $times) {
            $times = $recent((array)$times, 86400);
            if ($times) {
                $ips[$key] = $times;
            }
        }
        $mine = $ips[$ipKey] ?? [];

        $allowed = count($all) < $perDayAll
            && count($mine) < $perDayIp
            && count($recent($mine, 600)) < $per10;

        if ($allowed) {
            $all[] = $now;
            $mine[] = $now;
            $ips[$ipKey] = $mine;
        }
        return [$allowed, ['all' => $all, 'ip' => $ips]];
    });
}

// The same request (phone + dates) delivered in the last 30 minutes is not sent again.
// Only delivered requests are remembered, so a guest can retry after a failure.
function recently_sent(string $dir, string $key, bool $remember): bool
{
    return with_store($dir . '/recent.json', function (array $seen) use ($key, $remember) {
        $now = time();
        $seen = array_filter($seen, function ($time) use ($now) {
            return $time > $now - 1800;
        });
        $found = isset($seen[$key]);
        if ($remember) {
            $seen[$key] = $now;
        }
        return [$found, $seen];
    });
}

function parse_date(string $value): ?DateTimeImmutable
{
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
        return null;
    }
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    return $date && $date->format('Y-m-d') === $value ? $date : null;
}

function validate_request(array $input): array
{
    $arrival = parse_date((string)($input['arrival'] ?? ''));
    $departure = parse_date((string)($input['departure'] ?? ''));
    // One day of slack for guests in other time zones.
    $earliest = (new DateTimeImmutable('today'))->modify('-1 day');

    if (!$arrival || !$departure || $arrival < $earliest || $arrival > $earliest->modify('+2 years')) {
        return [null, 'dates'];
    }
    $nights = (int)$arrival->diff($departure)->format('%r%a');
    if ($nights < 1 || $nights > 60) {
        return [null, 'dates'];
    }

    $adults = filter_var($input['adults'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 20]]);
    $children = filter_var($input['children'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0, 'max_range' => 10]]);
    $stay = (string)($input['stay'] ?? '');
    $occasion = (string)($input['occasion'] ?? '');
    $pet = (string)($input['pet'] ?? '');
    $name = clean_line($input['name'] ?? '', 80);
    $phone = (string)($input['phone'] ?? '');
    $email = clean_line($input['email'] ?? '', 120);
    $details = clean_text($input['details'] ?? '', 1000);

    if ($adults === false || $children === false || !isset(STAY[$stay], OCCASION[$occasion], PET[$pet])) {
        return [null, 'fields'];
    }
    if (text_length($name) < 3) {
        return [null, 'name'];
    }
    if (!preg_match('/^\+[1-9]\d{7,14}$/', $phone)) {
        return [null, 'phone'];
    }
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return [null, 'email'];
    }

    return [[
        'arrival' => $arrival,
        'departure' => $departure,
        'nights' => $nights,
        'adults' => $adults,
        'children' => $children,
        'stay' => STAY[$stay],
        'occasion' => OCCASION[$occasion],
        'pet' => PET[$pet],
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'details' => $details,
        'lang' => ($input['lang'] ?? 'ro') === 'en' ? 'engleză' : 'română',
    ], null];
}

function guests_text(array $r): string
{
    $text = $r['adults'] === 1 ? '1 adult' : $r['adults'] . ' adulți';
    if ($r['children'] > 0) {
        $text .= ', ' . ($r['children'] === 1 ? '1 copil' : $r['children'] . ' copii');
    }
    return $text;
}

function period_text(array $r): string
{
    return $r['arrival']->format('d.m.Y') . ' - ' . $r['departure']->format('d.m.Y');
}

function send_whatsapp(array $config, array $r): bool
{
    $wa = $config['whatsapp'] ?? [];
    $token = (string)($wa['token'] ?? '');
    $phoneId = (string)($wa['phone_number_id'] ?? '');
    $recipients = (array)($wa['recipients'] ?? []);
    if ($token === '' || $phoneId === '' || !$recipients) {
        return false;
    }

    // Template parameters may not contain line breaks or long runs of spaces.
    $param = function (string $value, int $max = 200) {
        $value = clean_line($value, $max);
        return ['type' => 'text', 'text' => $value === '' ? '-' : $value];
    };

    $components = [
        [
            'type' => 'body',
            'parameters' => [
                $param(period_text($r)),
                $param((string)$r['nights']),
                $param(guests_text($r)),
                $param($r['stay']),
                $param($r['occasion']),
                $param($r['pet']),
                $param($r['name']),
                $param($r['phone']),
                $param($r['email']),
                $param($r['details'], 400),
            ],
        ],
        [
            'type' => 'button',
            'sub_type' => 'url',
            'index' => '0',
            'parameters' => [['type' => 'text', 'text' => ltrim($r['phone'], '+')]],
        ],
    ];

    $url = sprintf(
        'https://graph.facebook.com/%s/%s/messages',
        $wa['graph_version'] ?? 'v23.0',
        rawurlencode($phoneId)
    );

    $sent = false;
    foreach ($recipients as $to) {
        $payload = [
            'messaging_product' => 'whatsapp',
            'to' => preg_replace('/\D+/', '', (string)$to),
            'type' => 'template',
            'template' => [
                'name' => $wa['template'] ?? 'cerere_rezervare',
                'language' => ['code' => $wa['language'] ?? 'ro'],
                'components' => $components,
            ],
        ];

        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $token, 'Content-Type: application/json'],
            CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 10,
        ]);
        $body = curl_exec($curl);
        $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $error = curl_error($curl);
        curl_close($curl);

        $result = json_decode((string)$body, true);
        if ($status === 200 && !empty($result['messages'][0]['id'])) {
            $sent = true;
        } else {
            $reason = $result['error']['message'] ?? $error ?: 'HTTP ' . $status;
            error_log('EdMont booking: WhatsApp send failed: ' . $reason);
        }
    }
    return $sent;
}

function mail_body(array $r): string
{
    $lines = [
        'Cerere nouă de rezervare de pe edmont.ro',
        '',
        'Perioada: ' . period_text($r) . ' (' . $r['nights'] . ($r['nights'] === 1 ? ' noapte)' : ' nopți)'),
        'Oaspeți: ' . guests_text($r),
        'Cazare: ' . $r['stay'],
        'Ocazie: ' . $r['occasion'],
        'Animal de companie: ' . $r['pet'],
        '',
        'Nume: ' . $r['name'],
        'Telefon: ' . $r['phone'],
        'Email: ' . ($r['email'] !== '' ? $r['email'] : '-'),
        'Limba site-ului: ' . $r['lang'],
        '',
        'Detalii:',
        $r['details'] !== '' ? $r['details'] : '-',
        '',
        'Scrie-i pe WhatsApp: https://wa.me/' . ltrim($r['phone'], '+'),
        'Sună: tel:' . $r['phone'],
    ];
    return implode("\n", $lines);
}

function send_mail(array $config, array $r): bool
{
    $mail = $config['mail'] ?? [];
    $to = (string)($mail['to'] ?? '');
    $from = (string)($mail['from'] ?? '');
    if ($to === '' || $from === '') {
        return false;
    }

    $subject = 'Cerere rezervare: ' . $r['name'] . ', ' . period_text($r);
    $fromName = '=?UTF-8?B?' . base64_encode((string)($mail['from_name'] ?? 'Rezervări EdMont')) . '?=';
    $headers = [
        'From: ' . $fromName . ' <' . $from . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    if ($r['email'] !== '') {
        $headers[] = 'Reply-To: ' . $r['email'];
    }

    $ok = @mail(
        $to,
        '=?UTF-8?B?' . base64_encode($subject) . '?=',
        mail_body($r),
        implode("\r\n", $headers),
        '-f' . $from
    );
    if (!$ok) {
        error_log('EdMont booking: mail() failed');
    }
    return $ok;
}

// ---------------------------------------------------------------------------

$method = $_SERVER['REQUEST_METHOD'] ?? '';
$config = load_config();
$dir = data_dir($config);

if ($method === 'GET' && isset($_GET['challenge'])) {
    $site = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? 'same-origin';
    if ($site !== 'same-origin') {
        fail(403, 'origin');
    }
    $challenge = new_challenge($config);
    if (recaptcha_enabled($config)) {
        $challenge['recaptcha'] = $config['recaptcha']['site_key'];
    }
    respond(200, $challenge);
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    fail(405, 'method');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = (array)($config['allowed_origins'] ?? ['https://edmont.ro', 'https://www.edmont.ro']);
if (!in_array($origin, $allowed, true)) {
    fail(403, 'origin');
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$input = json_decode((string)$raw, true);
if (!is_array($input)) {
    fail(400, 'json');
}

// Bots fill the hidden field or submit within seconds. Pretend it worked.
if (trim((string)($input['website'] ?? '')) !== '' || (int)($input['elapsed'] ?? 0) < 3000) {
    respond(200, ['ok' => true]);
}

if (!verify_challenge($config, $dir, $input['pow'] ?? null)) {
    fail(403, 'challenge');
}

if (recaptcha_enabled($config) && !verify_recaptcha($config, $input['recaptcha'] ?? null)) {
    fail(403, 'captcha');
}

[$request, $error] = validate_request($input);
if ($request === null) {
    fail(422, $error);
}

$secret = $config['secret'];
$duplicateKey = hash_hmac('sha256', $request['phone'] . '|' . $request['arrival']->format('Y-m-d') . '|' . $request['departure']->format('Y-m-d'), $secret);
if (recently_sent($dir, $duplicateKey, false)) {
    respond(200, ['ok' => true]);
}

$ipKey = hash_hmac('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? ''), $secret);
if (!within_limits($config, $dir, $ipKey)) {
    fail(429, 'limit');
}

if (!empty($config['dry_run'])) {
    file_put_contents($dir . '/dry-run.log', date('c') . "\n" . mail_body($request) . "\n\n", FILE_APPEND | LOCK_EX);
    recently_sent($dir, $duplicateKey, true);
    respond(200, ['ok' => true, 'dry_run' => true]);
}

$whatsapp = send_whatsapp($config, $request);
$email = send_mail($config, $request);

if (!$whatsapp && !$email) {
    fail(502, 'delivery', 'neither WhatsApp nor email worked');
}

recently_sent($dir, $duplicateKey, true);
respond(200, ['ok' => true]);
