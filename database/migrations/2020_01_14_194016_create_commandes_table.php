<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommandesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('commandes', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->smallInteger('etat_commande')->default(0);
			$table->smallInteger('type_commande')->default(0);
			$table->string('libelle_commande', 150)->nullable();
			$table->bigInteger('fournisseur')->unsigned()->nullable()->index('FK_commandes_fournisseur');
			$table->date('date_expedition')->nullable();
			$table->smallInteger('mode_expedition')->default(0);
			$table->date('date_livraison_souhaite')->nullable();
			$table->date('date_livraison')->nullable();
			$table->float('montant_ht', 10, 0)->nullable();
			$table->float('cout_ttc_location_annuelle', 10, 0)->nullable();
			$table->float('cout_ttc_location_courte_duree', 10, 0)->nullable();
			$table->float('loyer_mensuel_leasing', 10, 0)->nullable();
			$table->float('tva', 10, 0)->nullable();
			$table->float('montant_ttc', 10, 0)->nullable();
			$table->string('numero_facture', 100)->nullable();
			$table->date('date_facture')->nullable();
			$table->date('date_facture_reglee')->nullable();
			$table->date('date')->nullable();
			$table->float('numero_commande', 10, 0)->nullable();
			$table->bigInteger('livraison_entite')->unsigned()->nullable()->index('FK_commandes_entite');
			$table->bigInteger('personne')->unsigned()->nullable()->index('FK_commandes_personne');
			$table->string('livraison_adresse1', 100)->nullable();
			$table->string('livraison_adresse2', 100)->nullable();
			$table->string('livraison_code_postal', 100)->nullable();
			$table->string('livraison_ville', 100)->nullable();
			$table->string('livraison_telephonne', 100)->nullable();
			$table->string('livraison_fax', 100)->nullable();
			$table->string('livraison_mail', 100)->nullable();
			$table->string('livraison_nom_interlocuteur', 100)->nullable();
			$table->string('livraison_potable', 100)->nullable();
			$table->bigInteger('facturation_entite')->unsigned()->nullable()->index('FK_commandes_facturation_entite');
			$table->string('facturation_adresse1', 50)->nullable();
			$table->string('facturation_adresse2', 50)->nullable();
			$table->string('facturation_code_postal', 50)->nullable();
			$table->string('facturation_ville', 50)->nullable();
			$table->string('facturation_telephonne', 50)->nullable();
			$table->string('facturation_fax', 50)->nullable();
			$table->string('facturation_mail', 100)->nullable();
			$table->string('facturation_interlocuteur', 150)->nullable();
			$table->string('facturation_interlocuteur_telephonne', 50)->nullable();
			$table->string('suivi_nom', 100)->nullable();
			$table->string('suivi_telephone', 20)->nullable();
			$table->string('suivi_fax', 100)->nullable();
			$table->string('suivi_messagerie', 100)->nullable();
			$table->string('suivi_entite_service', 100)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('commandes');
	}

}
