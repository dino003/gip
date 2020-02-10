<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPlanVehiculeToVehicules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicules', function (Blueprint $table) {
            $table->bigInteger('plan_vehicule_id')->unsigned()->nullable()->index('vehicules_plan_vehicule_id_foreign');

            $table->foreign('plan_vehicule_id')->references('id')->on('plan_vehicules')->onUpdate('CASCADE')->onDelete('SET NULL');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicules', function (Blueprint $table) {
            //
        });
    }
}
