<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeBudgetDepensesRecettesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_budget_depenses_recettes', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_budget_vehicule_vehicule');
			$table->string('entite_vehicule', 100)->nullable();
			$table->bigInteger('nature_ligne_budget')->unsigned()->nullable()->index('FK_budget_vehicule_nature');
			$table->string('imputation_interne', 100)->nullable();
			$table->float('depense_budget', 10, 0)->nullable();
			$table->float('depense_realisation', 10, 0)->nullable();
			$table->float('depense_pourcentage', 10, 0)->nullable();
			$table->float('depense_reste', 10, 0)->nullable();
			$table->float('recette_budget', 10, 0)->nullable();
			$table->float('recette_realisation', 10, 0)->nullable();
			$table->float('recette_pourcentage', 10, 0)->nullable();
			$table->float('recette_reste', 10, 0)->nullable();
			$table->text('commentaire', 65535)->nullable();
			$table->bigInteger('annee_budgetaire')->unsigned()->nullable()->index('FK_buget_vehicule_annee_budgetaire');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_budget_depenses_recettes');
	}

}
