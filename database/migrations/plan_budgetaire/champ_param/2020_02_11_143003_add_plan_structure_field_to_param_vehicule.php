<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPlanStructureFieldToParamVehicule extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parametre_generaux_vehicules', function (Blueprint $table) {
            $table->boolean('zonne_geographique_obligatoire')->default(0);
            $table->boolean('zone_organisationnelle_obligatoire')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parametre_generaux_vehicules', function (Blueprint $table) {
            //
        });
    }
}
