<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddZoneToUtil extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicule_reservations', function (Blueprint $table) {
            $table->bigInteger('lieu_depart_id')->unsigned()->nullable()->index('reservation_lieu_depart_id_foreign');
            $table->bigInteger('destination_id')->unsigned()->nullable()->index('reservation_destination_id_foreign');
            $table->foreign('lieu_depart_id')->references('id')->on('plan_geographiques')->onUpdate('CASCADE')->onDelete('SET NULL');
            $table->foreign('destination_id')->references('id')->on('plan_geographiques')->onUpdate('CASCADE')->onDelete('SET NULL');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicule_reservations', function (Blueprint $table) {
            //
        });
    }
}
