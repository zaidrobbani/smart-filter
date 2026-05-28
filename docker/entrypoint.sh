#!/bin/bash
set -e

# Load .env kalau ada
if [ -f /var/www/html/.env ]; then
    export $(grep -v '^#' /var/www/html/.env | grep -v '^\s*$' | sed 's/[[:space:]]*#.*$//' | xargs)
fi

echo "==> Menunggu database siap... (host: $DB_HOST port: $DB_PORT)"
until php -r "
    try {
        \$pdo = new PDO(
            'mysql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}',
            '${DB_USERNAME}',
            '${DB_PASSWORD}'
        );
        echo 'connected';
    } catch (Exception \$e) {
        echo \$e->getMessage();
        exit(1);
    }
" 2>/dev/null | grep -q connected; do
    echo "    Database belum siap, tunggu 2 detik..."
    sleep 2
done

echo "==> Database siap!"
echo "==> Generate wayfinder types..."
php artisan wayfinder:generate --with-form || true

echo "==> Menjalankan migrasi..."
php artisan migrate --force

echo "==> Optimasi cache..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Storage link..."
php artisan storage:link || true

echo "==> Set permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

echo "==> Menjalankan Apache..."
exec "$@"