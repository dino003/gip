<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_vehicules', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->enum('gestion_numero_immo', array('oui manuel','non','oui auto'))->default('non');
			$table->smallInteger('gestion_numero_interne_vehicule')->default(0);
			$table->string('lieu_stockage_double_cle', 250)->nullable();
			$table->boolean('affichage_alerte_vehicule')->default(1);
			$table->boolean('affichage_contrat_assurance')->default(1);
			$table->boolean('vehicule_service_attribue_personne')->default(1);
			$table->boolean('echeancier_reglement')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_vehicules');
	}

}
