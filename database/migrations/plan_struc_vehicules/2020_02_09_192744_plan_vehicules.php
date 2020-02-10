<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PlanVehicules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('plan_vehicules', function(Blueprint $table)
		{
            $table->bigInteger('id', true)->unsigned();

            $table->string('libelle', 200)->nullable();

            $table->bigInteger('structure_vehicule_id')->unsigned()->nullable()->index('structure_structure_vehicule_id_foreign');

            $table->foreign('structure_vehicule_id')->references('id')->on('structure_vehicules')->onUpdate('CASCADE')->onDelete('SET NULL');


            $table->bigInteger('parent')->unsigned()->nullable()->index('plans_plan_vehicule_id_foreign');

            $table->foreign('parent')->references('id')->on('plan_vehicules')->onUpdate('CASCADE')->onDelete('SET NULL');



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
        Schema::drop('plan_vehicules');

    }
}
