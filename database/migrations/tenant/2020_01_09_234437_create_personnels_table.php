<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePersonnelsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('personnels', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('nom', 100)->nullable();
			$table->string('prenom', 150)->nullable();
			$table->boolean('actif')->default(1);
			$table->boolean('default')->default(0);
			$table->string('fonction', 100)->nullable();
			$table->string('matricule', 100)->nullable();
			$table->string('telephone', 100)->nullable();
			$table->string('portable', 100)->nullable();
			$table->string('fax', 100)->nullable();
			$table->string('adresse_email', 100)->nullable();
			$table->string('nationalite', 100)->nullable();
			$table->date('date_naissance')->nullable();
			$table->boolean('personne_prioritaire')->default(0);
			$table->boolean('statut_chaufeur')->default(0);
			$table->enum('duree_contrat', array('Indéterminé','Déterminé'))->default('Indéterminé');
			$table->enum('college', array('Indéterminé','Cadre','Non Cadre','Non Cadre, fait office de Cadre'))->default('Indéterminé');
			$table->string('numero_permis_conduire', 100)->nullable();
			$table->date('date_delivrance')->nullable();
			$table->string('lieu_delivrance', 150)->nullable();
			$table->enum('type_permis', array('A1','A','B','C','C1','D','E','F','BCDE'))->nullable()->default('B');
			$table->string('numero_conducteur_pour_gestion_carte', 50)->nullable();
			$table->bigInteger('categorie')->unsigned()->nullable()->index('FK_personnel_categorie_vehicule');
			$table->bigInteger('entite_affectation')->unsigned()->nullable()->index('FK_personnel_entite_affectation');
			$table->float('montant_aen', 10, 0)->nullable();
			$table->string('numero_autorisation_octroye', 100)->nullable();
			$table->string('nom_entite_affectation', 100)->nullable();
			$table->date('date_autorisation')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('personnels');
	}

}
