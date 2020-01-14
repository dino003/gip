<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageCodificationsModeleVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_codifications_modele_vehicules', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('nom_modele', 150)->nullable();
			$table->bigInteger('categorie')->unsigned()->nullable()->index('FK_modele_categorie');
			$table->bigInteger('marque')->unsigned()->nullable()->index('FK_modele_marque');
			$table->bigInteger('fournisseur')->unsigned()->nullable()->index('FK_modele_fournisseur');
			$table->string('energie', 50)->nullable();
			$table->string('precision_energie', 50)->nullable();
			$table->boolean('vehicule_propre')->nullable()->default(0);
			$table->float('chevaux', 10, 0)->nullable();
			$table->integer('nombre_place')->nullable();
			$table->string('taille_pneu', 50)->nullable();
			$table->string('couleur', 50)->nullable();
			$table->float('longueur', 10, 0)->nullable();
			$table->float('largeur', 10, 0)->nullable();
			$table->enum('amortissement', array('Pas calcul','Dégressif','Linéaire'))->nullable()->default('Pas calcul');
			$table->float('hauteur', 10, 0)->nullable();
			$table->float('leasing_valeur_rachat', 10, 0)->nullable();
			$table->float('poids_vide', 10, 0)->nullable();
			$table->float('poids_charge', 10, 0)->nullable();
			$table->float('pression_pneu_avant', 10, 0)->nullable();
			$table->float('pression_pneu_arriere', 10, 0)->nullable();
			$table->enum('climatisation', array('oui','non'))->nullable()->default('non');
			$table->enum('pneu_neige', array('oui','non'))->default('non');
			$table->string('numero_contrat_location', 100)->nullable();
			$table->date('echeance')->nullable();
			$table->boolean('vehicule_remplacement_prevu')->default(0);
			$table->float('duree_en_mois_location', 10, 0)->nullable();
			$table->float('montant_provision_carburant', 10, 0)->nullable();
			$table->float('montant_deposit', 10, 0)->nullable();
			$table->float('loyer_annuel_ttc', 10, 0)->nullable();
			$table->float('loyer_mensuel_ttc', 10, 0)->nullable();
			$table->float('leasing_apport_initial', 10, 0)->nullable();
			$table->float('pour_kilometre', 10, 0)->nullable();
			$table->enum('radio', array('oui','non'))->nullable()->default('non');
			$table->enum('gps', array('oui','non'))->nullable()->default('non');
			$table->float('entretien_par_km', 10, 0)->nullable();
			$table->float('taux_co2', 10, 0)->nullable();
			$table->float('cout_moyen_km', 10, 0)->nullable();
			$table->enum('type_permis', array('A1','A','B','C','C1','D','E','F','BCDE'))->nullable();
			$table->enum('leasing_duree', array('1 an','2 ans','3 ans','4 ans','5 ans'))->nullable()->default('1 an');
			$table->float('cout_carte_grise', 10, 0)->nullable();
			$table->bigInteger('contrat')->unsigned()->nullable();
			$table->integer('duree_annee_garantie')->nullable();
			$table->integer('duree_annee_amortissement')->nullable();
			$table->enum('mode_acquisition', array('Achat','Location','Leasing'))->default('Achat');
			$table->float('prix_ht', 10, 0)->nullable();
			$table->bigInteger('tva')->unsigned()->nullable();
			$table->float('prix_ttc', 10, 0)->nullable();
			$table->string('loueur', 150)->nullable();
			$table->string('loyer_annuel', 150)->nullable();
			$table->string('photo_vehicule', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_codifications_modele_vehicules');
	}

}
