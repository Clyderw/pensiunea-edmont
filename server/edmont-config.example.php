<?php
// Copy this file to the hosting account's home folder (next to public_html, NOT inside it)
// as edmont-config.php and fill in the values. The booking form reads it from there.

return [
    // Random string of at least 32 characters. Used to sign anti-spam challenges.
    'secret' => 'REPLACE_WITH_A_LONG_RANDOM_STRING',

    // Pages allowed to send requests.
    'allowed_origins' => ['https://edmont.ro', 'https://www.edmont.ro'],

    // WhatsApp Cloud API (Meta). Leave token empty until Meta is set up:
    // requests then go by email only.
    'whatsapp' => [
        'token' => '',
        'phone_number_id' => '',
        'graph_version' => 'v23.0',
        'template' => 'cerere_rezervare',
        'language' => 'ro',
        'recipients' => ['40772210309'],
    ],

    // Email copy of every request.
    'mail' => [
        'to' => 'edmont.residence@gmail.com',
        'from' => 'rezervari@edmont.ro',
        'from_name' => 'Rezervări EdMont',
    ],

    // Google reCAPTCHA v3 (optional). Leave empty to switch it off.
    'recaptcha' => [
        'site_key' => '',
        'secret' => '',
        'min_score' => 0.5,
    ],

    // Anti-spam limits. limit_per_day_total also caps the WhatsApp bill:
    // 30 requests x about $0.03 = under $1 a day even during an attack.
    'limit_per_10_min' => 3,
    'limit_per_day_ip' => 8,
    'limit_per_day_total' => 30,

    // true = do not send anything, only write requests to edmont-data/dry-run.log.
    'dry_run' => false,
];
