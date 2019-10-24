<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeBudgetDepensesRecettesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_budget_depenses_recettes', function(Blueprint $table)
		{
			$table->foreign('nature_ligne_budget', 'FK_budget_vehicule_nature')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_budget_vehicule_vehicule')->references('id')->on('vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('annee_budgetaire', 'FK_buget_vehicule_annee_budgetaire')->references('id')->on('annee_budgetaires')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_budget_depenses_recettes', function(Blueprint $table)
		{
			$table->dropForeign('FK_budget_vehicule_nature');
			$table->dropForeign('FK_budget_vehicule_vehicule');
			$table->dropForeign('FK_buget_vehicule_annee_budgetaire');
		});
	}

}
