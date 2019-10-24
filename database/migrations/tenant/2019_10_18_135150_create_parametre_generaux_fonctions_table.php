<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxFonctionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_fonctions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->enum('utilisation_vehicules', array('oui','non'))->default('oui');
			$table->enum('consomation_vehicules', array('oui','non'))->default('oui');
			$table->enum('amortissement_vehicules', array('oui','non'))->default('oui');
			$table->enum('budget_depenses_vehicules', array('oui','non'))->default('oui');
			$table->enum('documents', array('oui','non'))->default('oui');
			$table->enum('messages', array('oui','non'))->default('oui');
			$table->enum('gestion_vehicule_type_engin', array('oui','non'))->default('oui');
			$table->enum('gestion_tournee_chaufeur', array('oui','non'))->default('oui');
			$table->enum('gestion_ordre_de_mission', array('oui','non'))->default('oui');
			$table->enum('gestion_commandes', array('oui','non'))->default('oui');
			$table->enum('intervention_vehicules', array('oui','non'))->default('oui');
			$table->enum('reservation_planing', array('oui','non'))->default('oui');
			$table->enum('contrat_assurance_sinistres', array('oui','non'))->default('oui');
			$table->enum('journal_evenement', array('oui','non'))->default('oui');
			$table->enum('courriers', array('oui','non'))->default('oui');
			$table->enum('amendes', array('oui','non'))->default('oui');
			$table->enum('stock_pieces_detache_consomable', array('oui','non'))->default('oui');
			$table->enum('donnee_geolocalisation', array('oui','non'))->default('oui');
			$table->enum('gestion_operation_web', array('oui','non'))->default('oui');
			$table->enum('gestion_stationnement', array('oui','non'))->default('oui');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_fonctions');
	}

}
