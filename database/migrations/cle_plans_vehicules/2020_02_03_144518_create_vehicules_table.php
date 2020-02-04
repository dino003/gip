<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicules', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('immatriculation', 50);
			$table->bigInteger('entite_comptable')->unsigned()->nullable()->index('FK_vehicule_entite_comptable');
			$table->bigInteger('entite_physique')->unsigned()->nullable()->index('FK_vehicule_entite_physique');
			$table->enum('type_vehicule_statut', array('Service','Fonction','Flotte'))->default('Service');
			$table->enum('etat_vehicule_status', array('En service','Commande','Vendu','Restitué','Sorti'))->nullable()->default('En service');
			$table->smallInteger('mode_acquisition')->nullable()->default(0);
			$table->date('date_commande')->nullable();
			$table->date('date_livraison_previsionelle')->nullable();
			$table->date('date_livraison_reele')->nullable();
			$table->string('numero_commande', 50)->nullable();
			$table->bigInteger('demandeur')->unsigned()->nullable()->index('FKvehicule_demandeur');
			$table->bigInteger('contrat_assurance_id')->unsigned()->nullable()->index('FK_vehicule_contrat_assurance');
			$table->boolean('neuf_occasion')->nullable()->default(0);
			$table->date('date_entree_au_parc')->nullable();
			$table->date('annee_mise_circulation')->nullable();
			$table->date('premiere_mise_circulation')->nullable();
			$table->bigInteger('categorie')->unsigned()->nullable()->index('FK_vehicule_categorie');
			$table->bigInteger('marque')->unsigned()->nullable()->index('FK_vehicule_marque');
			$table->bigInteger('tiers')->unsigned()->nullable()->index('FK_vehicule_tiers');
			$table->bigInteger('detenteur')->unsigned()->nullable()->index('FK_vehicule_detenteur');
			$table->string('precision_energie', 100)->nullable();
			$table->bigInteger('chauffeur_atitre')->unsigned()->nullable()->index('FK_vehicule_chauffeur_atitre');
			$table->string('modele', 100)->nullable();
			$table->string('code_modele', 100)->nullable();
			$table->bigInteger('energie')->unsigned()->nullable()->index('FK_véhicule_energie');
			$table->string('numero_place_parking', 50)->nullable();
			$table->string('type_vehicule_carte_grise', 100)->nullable();
			$table->string('numero_carte_grise', 100)->nullable();
			$table->float('cout_carte_grise', 10, 0)->nullable();
			$table->boolean('vehicule_propre')->default(0);
			$table->date('detenu_depuis')->nullable();
			$table->float('kilometrage_acquisition', 10, 0)->nullable()->default(0);
			$table->float('kilometrage_nouvelle_acquisition', 10, 0)->nullable()->default(0);
			$table->float('kilometrage_actuel', 10, 0)->nullable()->default(0);
			$table->date('garantie_annee')->nullable();
			$table->date('grantie_date_fin')->nullable();
			$table->enum('garantie_en_cours', array('Garantie en cours','Garantie terminée'))->default('Garantie terminée');
			$table->enum('amortissement_calcul', array('Pas Calcul','Dégressif','Linéaire'))->nullable()->default('Pas Calcul');
			$table->date('amortissement_annee')->nullable();
			$table->date('amortissement_date_fin')->nullable();
			$table->enum('amortissement_etat', array('Amortissement en cours','Amorti'))->default('Amorti');
			$table->smallInteger('usage_vehicule')->nullable();
			$table->boolean('reservable')->default(1);
			$table->boolean('vehicule_prioritaire')->default(0);
			$table->boolean('vehicule_usage_exclusif')->default(0);
			$table->boolean('vehicule_lie_astreinte')->default(0);
			$table->string('lieu_prise_en_charge_vehicule', 100)->nullable();
			$table->string('lieu_restitution', 100)->nullable();
			$table->string('lieu_stockage_double', 100)->nullable();
			$table->string('type_permis', 10)->nullable();
			$table->string('etat_vehicule_physique', 50)->nullable();
			$table->enum('mode_acquisition_etat_vehicule', array('Neuf','Occasion'))->default('Neuf');
			$table->string('tech_chevaux_fiscaux', 50)->nullable();
			$table->string('tech_couleur', 50)->nullable();
			$table->string('tech_couleur_interieure', 50)->nullable();
			$table->string('tech_numero_serie', 100)->nullable();
			$table->string('tech_information_moteur', 100)->nullable();
			$table->string('tech_numero_moteur', 100)->nullable();
			$table->string('tech_taille_pneu', 50)->nullable();
			$table->float('tech_pression_avant', 10, 0)->nullable();
			$table->float('tech_pression_arriere', 10, 0)->nullable();
			$table->float('tech_poids_vide', 10, 0)->nullable();
			$table->float('tech_en_charge', 10, 0)->nullable();
			$table->float('tech_capacite_reservoire', 10, 0)->nullable();
			$table->float('tech_taux_emmission_co2', 10, 0)->nullable();
			$table->float('tech_volume_interieur', 10, 0)->nullable();
			$table->float('tech_longueur', 10, 0)->nullable();
			$table->float('tech_largeur', 10, 0)->nullable();
			$table->float('tech_hauteur', 10, 0)->nullable();
			$table->enum('mode_acquisition_type_vehicule', array('Véhicule de la société','Véhicule personnel'))->default('Véhicule de la société');
			$table->date('acquisition_pret_date_debut')->nullable();
			$table->date('acquisition_pret_date_fin')->nullable();
			$table->integer('acquisition_pret_kilometrage_debut')->nullable();
			$table->integer('acquisition_pret_kilometrage_fin')->nullable();
			$table->text('acquisition_pret_motif', 65535)->nullable();
			$table->float('acquisition_achat_prix_ht', 10, 0)->nullable();
			$table->float('acquisition_achat_prix_ttc', 10, 0)->nullable();
			$table->float('acquisition_achat_taux_tva', 10, 0)->nullable();
			$table->string('acquisition_achat_numero_facture', 50)->nullable();
			$table->date('acquisition_achat_date_facture')->nullable();
			$table->date('acquisition_achat_reglee_le')->nullable();
			$table->string('acquisition_leasing_numero_contrat', 50)->nullable();
			$table->smallInteger('acquisition_leasing_duree_annee')->nullable();
			$table->float('acquisition_leasing_apport_initial', 10, 0)->nullable();
			$table->float('acquisition_leasing_loyer_mensuel', 10, 0)->nullable();
			$table->float('acquisition_leasing_valeur_rachat', 10, 0)->nullable();
			$table->float('acquisition_leasing_deja_paye', 10, 0)->nullable();
			$table->float('assurance_valeur_assuree_contrat', 10, 0)->nullable();
			$table->float('assurance_valeur_assuree_specifique', 10, 0)->nullable();
			$table->float('assurance_prime_annuelle_contrat', 10, 0)->nullable();
			$table->float('assurance_prime_annuelle_specifique', 10, 0)->nullable();
			$table->bigInteger('affectation_geographique_id')->unsigned()->nullable()->index('vehicules_affectation_geographique_id_foreign');
			$table->bigInteger('affectation_organisationnel_id')->unsigned()->nullable()->index('vehicules_affectation_organisationnel_id_foreign');
	
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicules');
	}

}
