<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeDepensesRecettesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_depenses_recettes', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_depense_recette_vehicule');
			$table->string('depense_ou_recette', 50)->nullable();
			$table->date('date')->nullable();
			$table->bigInteger('annee_budgetaire')->unsigned()->nullable()->index('FK_depense_recettes_annee_budgetaire');
			$table->bigInteger('nature')->unsigned()->nullable()->index('FK_depense_recette_nature');
			$table->bigInteger('tiers')->unsigned()->nullable()->index('FK_depense_recette_tiers');
			$table->string('imputation_interne', 100)->nullable();
			$table->float('montant_ht', 10, 0)->nullable();
			$table->bigInteger('taux_tvaR')->unsigned()->nullable()->index('FK_depense_recette_tva');
			$table->float('tva', 10, 0)->nullable();
			$table->float('taux_tva', 10, 0)->nullable();
			$table->float('montant_ttc', 10, 0)->nullable();
			$table->string('numero_piece', 100)->nullable();
			$table->date('date_piece')->nullable();
			$table->string('libelle', 100)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_depenses_recettes');
	}

}
