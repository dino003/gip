<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddChampVehicules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicules', function (Blueprint $table) {
            $table->string('photo', 200)->default('default.jpg')->nullable();

            $table->bigInteger('affectation_geographique_id')->unsigned()->nullable()->index('vehicules_affectation_geographique_id_foreign');
			$table->bigInteger('affectation_organisationnel_id')->unsigned()->nullable()->index('vehicules_affectation_organisationnel_id_foreign');

            $table->foreign('affectation_geographique_id')->references('id')->on('plan_geographiques')->onUpdate('CASCADE')->onDelete('SET NULL');

            $table->foreign('affectation_organisationnel_id')->references('id')->on('plan_organisationnels')->onUpdate('CASCADE')->onDelete('SET NULL');


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
