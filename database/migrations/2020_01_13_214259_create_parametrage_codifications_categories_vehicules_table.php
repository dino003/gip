<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageCodificationsCategoriesVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_codifications_categories_vehicules', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('nom_type', 152)->nullable();
			$table->enum('type', array('Véhicule','Engin'))->nullable()->default('Véhicule');
			$table->float('cout', 10, 0)->nullable();
			$table->enum('encombrement', array('oui','non'))->default('non');
			$table->enum('cartes', array('oui','non'))->default('non');
			$table->enum('entretien_planifies', array('oui','non'))->default('non');
			$table->enum('amortissement', array('oui','non'))->default('non');
			$table->enum('garantie', array('oui','non'))->default('non');
			$table->enum('nombre_place', array('oui','non'))->default('non');
			$table->enum('puissance', array('oui','non'))->default('non');
			$table->enum('kilometrage', array('oui','non'))->default('non');
			$table->enum('compteur_horraire', array('oui','non'))->default('non');
			$table->enum('option', array('oui','non'))->default('non');
			$table->enum('etat', array('oui','non'))->default('non');
			$table->enum('roues', array('oui','non'))->default('non');
			$table->enum('liens', array('oui','non'))->default('non');
			$table->enum('taxes', array('oui','non'))->default('non');
			$table->enum('historique_detenteur', array('oui','non'))->default('non');
			$table->enum('avant_nature', array('oui','non'))->default('non');
			$table->float('montant_forfait', 10, 0)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_codifications_categories_vehicules');
	}

}
