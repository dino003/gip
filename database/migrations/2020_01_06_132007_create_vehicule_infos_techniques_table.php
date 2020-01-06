<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeInfosTechniquesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_infos_techniques', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->integer('chevaux_fiscaux')->nullable();
			$table->bigInteger('vehicule')->unsigned()->nullable()->default(0)->index('FK_info_techniques_vehicule');
			$table->integer('nombre_place')->nullable();
			$table->string('couleur', 80)->nullable();
			$table->string('couleur_interieure', 80)->nullable();
			$table->string('taille_pneu', 80)->nullable();
			$table->float('pression_avant', 10, 0)->nullable();
			$table->float('pression_arrieere', 10, 0)->nullable();
			$table->string('numero_serie', 100)->nullable();
			$table->string('information_moteur', 100)->nullable();
			$table->string('numero_moteur', 100)->nullable();
			$table->float('poids_vide', 10, 0)->nullable();
			$table->float('poids_charge', 10, 0)->nullable();
			$table->float('taux_emission_co2', 10, 0)->nullable();
			$table->float('capacite_reservoire', 10, 0)->nullable();
			$table->float('volume_interieur', 10, 0)->nullable();
			$table->float('longueur', 10, 0)->nullable();
			$table->float('largeur', 10, 0)->nullable();
			$table->float('hauteur', 10, 0)->nullable();
			$table->boolean('climatisation')->default(1);
			$table->boolean('telephone')->default(1);
			$table->boolean('radioCD')->default(1);
			$table->boolean('gps')->default(1);
			$table->boolean('pneu_neige')->default(1);
			$table->float('kilometrage_entree_au_parc', 10, 0)->nullable();
			$table->float('kilometrage_actuel', 10, 0)->nullable();
			$table->date('date_dernier_releve')->nullable();
			$table->float('kilometrage_theorique', 10, 0)->nullable();
			$table->float('ecart', 10, 0)->nullable();
			$table->float('consomation_au_100_km', 10, 0)->nullable();
			$table->float('cout_moyen_kim', 10, 0)->nullable();
			$table->float('kilometrage_moyen_par_mois', 10, 0)->nullable();
			$table->float('consomation_moyen_100_km', 10, 0)->unsigned()->nullable();
			$table->float('ecart_consomation', 10, 0)->nullable();
			$table->float('heures', 10, 0)->nullable();
			$table->float('minutes', 10, 0)->nullable();
			$table->date('date_dernier_releve_horraire')->nullable();
			$table->string('photo', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_infos_techniques');
	}

}
