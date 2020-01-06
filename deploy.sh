#!/bin/sh

# passer en mode maintenance
php artisan down

# update code depuis le depot git
git pull 

### mise a jour des dependances php via composer

export COMPOSER_HOME='/tmp/composer'
composer install --no-interaction --no-dev --prefer-dist

npm install 


php artisan cache:clear

php artisan config:clear

php artisan config:cache

php artisan -v queue:restart


php artisan up

