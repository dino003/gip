<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddVehiculeToContratAssurances extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contrat_assurances', function (Blueprint $table) {
            $table->bigInteger('vehicule_id')->unsigned()->nullable()->index('contrat_assurance_vehicule_id_new_foreign');

            $table->foreign('vehicule_id')->references('id')->on('vehicules')->onUpdate('CASCADE')->onDelete('SET NULL');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contrat_assurances', function (Blueprint $table) {
            //
        });
    }
}
