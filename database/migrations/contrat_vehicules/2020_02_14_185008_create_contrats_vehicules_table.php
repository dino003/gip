<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContratsVehiculesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contrats_vehicules', function (Blueprint $table) {

            $table->bigInteger('contrat_assurance_id_pivot')->unsigned()->nullable()->index('contrat_assurance_vehicule_id_foreign');

            $table->foreign('contrat_assurance_id_pivot')->references('id')->on('vehicules')->onUpdate('CASCADE')->onDelete('SET NULL');


            $table->bigInteger('vehicule_id_pivot')->unsigned()->nullable()->index('vehicule_contrat_assurance_pivot_foreign');

            $table->foreign('vehicule_id_pivot')->references('id')->on('contrat_assurances')->onUpdate('CASCADE')->onDelete('SET NULL');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contrats_vehicules');
    }
}
