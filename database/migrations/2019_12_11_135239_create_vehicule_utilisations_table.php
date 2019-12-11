<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeUtilisationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_utilisations', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_utilisation_vehicule');
			$table->string('utilisatation_normal_ou_pret', 50)->nullable();
			$table->bigInteger('vehicule_id')->unsigned()->nullable();
			$table->bigInteger('utilisateur_id')->unsigned()->nullable();
			$table->bigInteger('chauffeur_id')->unsigned()->nullable();
			$table->bigInteger('utilisateur')->unsigned()->nullable()->index('FK_utilisation_utilisateur');
			$table->bigInteger('entite_utilisateur')->unsigned()->nullable()->index('FK_utilisation_entite_utilisateur');
			$table->bigInteger('entite_utilisateur_id')->unsigned()->nullable();
			$table->bigInteger('nature_utilisation')->unsigned()->nullable()->index('FK_utilisation_nature');
			$table->bigInteger('chauffeur')->unsigned()->nullable()->index('FK_utilisation_chauffeur');
			$table->date('date_debut_utilisation')->nullable();
			$table->date('date_fin_utilisation')->nullable();
			$table->time('heure_debut')->nullable();
			$table->time('heure_de_fin')->nullable();
			$table->integer('kilometrage_compteur_debut')->nullable();
			$table->integer('kilometrage_compteur_retour')->nullable();
			$table->integer('kilometres_parcourus')->nullable();
			$table->float('pourcentage_reservoire_debut', 10, 0)->nullable();
			$table->integer('duree_utilisation_heure')->nullable();
			$table->float('pourcentage_reservoire_retour', 10, 0)->nullable();
			$table->text('observation', 65535)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_utilisations');
	}

}
