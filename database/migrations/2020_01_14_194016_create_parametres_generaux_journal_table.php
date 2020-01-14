<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametresGenerauxJournalTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametres_generaux_journal', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->boolean('parc')->default(1);
			$table->boolean('contrat_assurance')->default(1);
			$table->boolean('utilisation_vehicules')->default(1);
			$table->boolean('intervention_vehicules')->default(1);
			$table->boolean('reservation_vehicules')->default(1);
			$table->boolean('consommation_vehicules')->default(1);
			$table->boolean('tiers')->default(1);
			$table->boolean('personnels')->default(1);
			$table->boolean('entites')->default(1);
			$table->boolean('stocks')->default(1);
			$table->boolean('budgets')->default(1);
			$table->boolean('depense_recettes')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametres_generaux_journal');
	}

}
