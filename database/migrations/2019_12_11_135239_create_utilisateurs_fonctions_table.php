<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUtilisateursFonctionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('utilisateurs_fonctions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->enum('creation_vehicule', array('oui','non'))->default('oui');
			$table->bigInteger('user')->unsigned()->index('FK_user_fonction');
			$table->enum('info_detenteur_message', array('oui','non'))->default('oui');
			$table->enum('modification_vehicule', array('oui','non'))->default('oui');
			$table->enum('suppresion_vehicule', array('oui','non'))->default('oui');
			$table->enum('commande_vehicule', array('oui','non'))->default('oui');
			$table->enum('utilisation_vehicule', array('L/E','L','non'))->default('L/E');
			$table->enum('reservations', array('L/E','L','non'))->default('L/E');
			$table->enum('intervention', array('L/E','L','non'))->default('L/E');
			$table->enum('contrat_assurance', array('L/E','L','non'))->default('L/E');
			$table->enum('ordre_de_mission', array('L/E','L','non'))->default('L/E');
			$table->enum('autorisation_parking', array('L/E','L','non'))->default('L/E');
			$table->enum('consomation_vehicule', array('L/E','L','non'))->default('L/E');
			$table->enum('cout_vehicule', array('L/E','L','non'))->default('L/E');
			$table->enum('gestion_stock_piece', array('L/E','L','non'))->default('L/E');
			$table->enum('amende_vehicule', array('L/E','L','non'))->default('L/E');
			$table->enum('module_des_commandes', array('L/E','L','non'))->default('L/E');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('utilisateurs_fonctions');
	}

}
