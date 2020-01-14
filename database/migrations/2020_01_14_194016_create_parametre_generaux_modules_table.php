<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxModulesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_modules', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->boolean('utilisation_vehicules')->default(0);
			$table->boolean('consomation_vehicules')->default(0);
			$table->boolean('amortissement_vehicules')->default(0);
			$table->boolean('budget_depenses_vehicules')->default(0);
			$table->boolean('documents')->default(0);
			$table->boolean('messages')->default(0);
			$table->boolean('gestion_vehicule_type_engin')->default(0);
			$table->boolean('gestion_tournee_chaufeur')->default(0);
			$table->boolean('gestion_ordre_de_mission')->default(0);
			$table->boolean('gestion_commandes')->default(0);
			$table->boolean('intervention_vehicules')->default(0);
			$table->boolean('reservations')->default(0);
			$table->boolean('contrat_assurance_sinistres')->default(0);
			$table->boolean('journal_evenement')->default(0);
			$table->boolean('courriers')->default(0);
			$table->boolean('amendes')->default(0);
			$table->boolean('stock_pieces_detache_consomable')->default(0);
			$table->boolean('donnee_geolocalisation')->default(0);
			$table->boolean('gestion_operation_web')->default(0);
			$table->boolean('gestion_stationnement')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_modules');
	}

}
