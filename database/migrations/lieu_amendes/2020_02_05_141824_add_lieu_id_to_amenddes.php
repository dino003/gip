<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLieuIdToAmenddes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicule_amendes', function (Blueprint $table) {
            $table->bigInteger('lieu_id')->unsigned()->nullable()->index('vehicules_amendes_lieu_id_foreign');
			$table->foreign('lieu_id')->references('id')->on('plan_geographiques')->onUpdate('CASCADE')->onDelete('SET NULL');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicule_amendes', function (Blueprint $table) {
            //
        });
    }
}
