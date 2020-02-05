<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPlansNumToPlanGeos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plan_geographiques', function (Blueprint $table) {
            $table->bigInteger('niveau_1')->unsigned()->nullable();
            $table->bigInteger('niveau_2')->unsigned()->nullable();
            $table->bigInteger('niveau_3')->unsigned()->nullable();
            $table->bigInteger('niveau_4')->unsigned()->nullable();
            $table->bigInteger('niveau_5')->unsigned()->nullable();
            $table->bigInteger('niveau_6')->unsigned()->nullable();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_geographiques', function (Blueprint $table) {
            //
        });
    }
}
