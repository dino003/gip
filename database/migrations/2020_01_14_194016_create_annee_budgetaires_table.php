<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAnneeBudgetairesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('annee_budgetaires', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->smallInteger('annee_budgetaire')->nullable();
			$table->date('date_debut')->nullable();
			$table->date('date_fin')->nullable();
			$table->boolean('encours')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('annee_budgetaires');
	}

}
