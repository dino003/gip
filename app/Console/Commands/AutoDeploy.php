<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AutoDeploy extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'git:deploy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'deploiement de l\'application sur Git';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // script shell
        exec('php artisan down');
        exec('git checkout -f');
        exec('git pull');
       exec('composer install --no-interaction --no-dev --prefer-dist');
       exec('npm install');
        exec('php artisan cache:clear');
        exec('php artisan config:clear');
        exec('php artisan config:cache');
        exec('php artisan up');

    }
}
