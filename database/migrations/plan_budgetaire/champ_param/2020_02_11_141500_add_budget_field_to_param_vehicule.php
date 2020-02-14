<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBudgetFieldToParamVehicule extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parametre_generaux_vehicules', function (Blueprint $table) {
            $table->boolean('depense_impute_sur_budget')->default(0);

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
