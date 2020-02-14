<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanBudgetairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_budgetaires', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('libelle', 200)->nullable();

            $table->bigInteger('structure_budgetaire_id')->unsigned()->nullable()->index('structure_structure_budgetaire_id_foreign');

            $table->foreign('structure_budgetaire_id')->references('id')->on('structure_budgetaires')->onUpdate('CASCADE')->onDelete('SET NULL');


            $table->bigInteger('parent')->unsigned()->nullable()->index('plans_plan_budgetaire_id_foreign');

            $table->foreign('parent')->references('id')->on('plan_budgetaires')->onUpdate('CASCADE')->onDelete('SET NULL');



            $table->bigInteger('niveau_1')->unsigned()->nullable();
            $table->bigInteger('niveau_2')->unsigned()->nullable();
            $table->bigInteger('niveau_3')->unsigned()->nullable();
            $table->bigInteger('niveau_4')->unsigned()->nullable();
            $table->bigInteger('niveau_5')->unsigned()->nullable();
            $table->bigInteger('niveau_6')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan_budgetaires');
    }
}
