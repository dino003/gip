<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPlanFieldToConsoVehicule extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vehicule_consomations', function (Blueprint $table) {
            $table->bigInteger('plan_budgetaire_id')->unsigned()->nullable()->index('conso_plan_budgetaire_id_foreign');

            $table->foreign('plan_budgetaire_id')->references('id')->on('plan_budgetaires')->onUpdate('CASCADE')->onDelete('SET NULL');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicule_consomations', function (Blueprint $table) {
            //
        });
    }
}
