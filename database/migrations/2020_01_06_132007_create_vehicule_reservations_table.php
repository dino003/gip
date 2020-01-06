<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeReservationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_reservations', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->boolean('abandonne')->default(0);
			$table->string('numero_ordre_mission', 50)->nullable();
			$table->string('emplacement_station', 50)->nullable();
			$table->bigInteger('personne_reservant')->unsigned()->nullable()->index('FK_reservation_personne');
			$table->date('date_fin_reservation')->nullable();
			$table->time('heure_fin_reservation')->nullable();
			$table->boolean('vehicule_parti')->default(0);
			$table->boolean('vehicule_retourne')->default(0);
			$table->boolean('transforme_en_utilisation')->default(0);
			$table->string('entite_personne_reservant', 150)->nullable();
			$table->bigInteger('objet_reservation')->unsigned()->nullable()->index('FK_reservation_objet');
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_reservation_vehicule');
			$table->date('date_debut_reservation')->nullable();
			$table->time('heure_debut_reservation')->nullable();
			$table->smallInteger('duree_total_reservation')->nullable();
			$table->string('lieu_depart', 150)->nullable();
			$table->smallInteger('nombre_personne_dans_vehicule')->nullable();
			$table->float('kilometrage_prevu', 10, 0)->nullable()->default(0);
			$table->string('destination_ville', 150)->nullable();
			$table->string('destination_departement', 150)->nullable();
			$table->string('destination_pays', 150)->nullable();
			$table->boolean('vehicule_avec_chauffeur')->default(0);
			$table->boolean('carte_carburant')->default(0);
			$table->boolean('carte_autoroute')->default(0);
			$table->integer('kilometrage_vehicule_a_la_reservation')->nullable();
			$table->string('numero_carte_carburant', 150)->nullable();
			$table->string('numero_carte_peage', 150)->nullable();
			$table->text('infos_complementaire', 65535)->nullable();
			$table->boolean('reservation_reccurente')->default(0);
			$table->date('date_reservation')->nullable();
			$table->bigInteger('utilisateur')->unsigned()->nullable()->index('FK_reservatio_user');
			$table->string('numero_document_genere', 50)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_reservations');
	}

}
