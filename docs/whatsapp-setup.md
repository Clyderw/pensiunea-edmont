# Подключение WhatsApp для заявок с edmont.ro

Пока WhatsApp не подключён, заявки с сайта приходят только на почту edmont.residence@gmail.com.
Когда шаги ниже сделаны, каждая заявка будет приходить ещё и в WhatsApp на +40 772 210 309.

## Что понадобится

- Отдельная SIM-карта для «бота» (любая румынская предоплаченная). Нужна только чтобы один раз получить код из SMS. Карту лучше не выбрасывать: если номер отключат за неактивность, бот перестанет работать.
- На этом номере не должно быть обычного WhatsApp. Если есть, сначала удалить аккаунт в приложении.
- Facebook-аккаунт хозяев и банковская карта для оплаты сообщений (около 0,13 лей за заявку).

## Шаги

1. Зайти на https://business.facebook.com и создать бизнес-портфолио: название «Pensiunea EdMont», страна Румыния.
2. Зайти на https://developers.facebook.com, нажать «My Apps», «Create App», тип «Business», привязать к портфолио из шага 1.
3. В приложении добавить продукт «WhatsApp» и нажать «API Setup».
4. Нажать «Add phone number» и ввести номер новой SIM-карты:
   - Display name: `EdMont Rezervări`
   - Категория: Hotel and lodging
   - Код подтверждения придёт по SMS на эту SIM.
5. В WhatsApp Manager (https://business.facebook.com/wa/manage) открыть «Payment methods» и добавить карту. Валюту лучше выбрать EUR, потом её не поменять.
6. В WhatsApp Manager открыть «Message templates», «Create template»:
   - Category: **Utility**
   - Name: `cerere_rezervare`
   - Language: **Romanian**
   - Body (скопировать как есть):

     ```
     Cerere nouă de rezervare de pe edmont.ro

     Perioada: {{1}}
     Nopți: {{2}}
     Oaspeți: {{3}}
     Cazare: {{4}}
     Ocazie: {{5}}
     Animal de companie: {{6}}

     Nume: {{7}}
     Telefon: {{8}}
     Email: {{9}}
     Detalii: {{10}}

     Răspunde-i oaspetelui cât mai curând ca să confirmi disponibilitatea.
     ```

   - Примеры для переменных (Meta их просит): `18.12.2026 - 20.12.2026`, `2`, `2 adulți, 1 copil`, `Cameră dublă matrimonială`, `Sejur`, `Nu`, `Ion Popescu`, `+40722123456`, `ion@example.com`, `Sosim pe la 18:00`
   - Button: «Visit website», текст `Scrie-i pe WhatsApp`, тип URL «Dynamic», адрес `https://wa.me/{{1}}`, пример `40722123456`
   - Отправить на проверку. Обычно одобряют за несколько минут, максимум за сутки.
7. Постоянный ключ доступа (токен):
   - В https://business.facebook.com/settings открыть «Users», «System users», «Add»: имя `edmont-site`, роль Admin.
   - «Assign assets»: выбрать приложение из шага 2 и WhatsApp-аккаунт, дать полный доступ.
   - «Generate new token»: выбрать приложение, срок «Never», права `whatsapp_business_messaging` и `whatsapp_business_management`.
   - Токен показывается один раз, его нужно сразу сохранить.
8. В «API Setup» скопировать **Phone number ID** (это число, не сам номер телефона).

## Что вписать на сервере

Файл `edmont-config.php` лежит на хостинге в домашней папке, рядом с `public_html` (не внутри неё).
В cPanel: File Manager, открыть файл, «Edit», вписать:

```php
'whatsapp' => [
    'token' => 'ТОКЕН ИЗ ШАГА 7',
    'phone_number_id' => 'ID ИЗ ШАГА 8',
    ...
],
```

Сохранить. Пересобирать сайт не нужно. После этого отправить с сайта тестовую заявку.

## Google reCAPTCHA (по желанию)

Форма уже защищена от спама и без неё. Если нужна ещё и reCAPTCHA:

1. Зайти на https://www.google.com/recaptcha/admin/create.
2. Тип: **reCAPTCHA v3**, домены: `edmont.ro` и `www.edmont.ro`.
3. Вписать ключи в тот же `edmont-config.php`:

```php
'recaptcha' => [
    'site_key' => 'SITE KEY',
    'secret' => 'SECRET KEY',
    'min_score' => 0.5,
],
```

Под формой сам появится текст о том, что сайт защищён reCAPTCHA. Бесплатно до 10 000 проверок в месяц.

## Если что-то не работает

- Ошибки пишутся в cPanel, раздел «Errors» или файл `error_log` в `public_html/api`. Строки начинаются с `EdMont booking:`.
- Если WhatsApp не сработал, заявка всё равно приходит на почту.
- Лимиты от спама меняются в `edmont-config.php`: `limit_per_10_min`, `limit_per_day_ip`, `limit_per_day_total`.
