<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('missions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('numero_ordre_mission', 100)->nullable();
			$table->date('date_ordre_mission')->nullable();
			$table->bigInteger('demandeur_id')->unsigned()->nullable()->index('FK_demandeur_mission');
			$table->bigInteger('vehicule_id')->unsigned()->nullable()->index('FK_vehicule_mission');
			$table->string('identifiant_demandeur', 50)->nullable();
			$table->string('entite_demandeur', 100)->nullable();
			$table->date('date_demande')->nullable();
			$table->time('heure_demande')->nullable();
			$table->smallInteger('etat')->nullable();
			$table->string('marque_vehicule', 50)->nullable();
			$table->string('modele_vehicule', 50)->nullable();
			$table->smallInteger('puissance_vehicule')->nullable();
			$table->string('vehicule_personnel_immatriculation', 50)->nullable();
			$table->string('vehicule_personnel_marque', 50)->nullable();
			$table->string('vehicule_personnel_modele', 50)->nullable();
			$table->smallInteger('vehicule_personnel_cv')->nullable();
			$table->smallInteger('vehicule_personnel_nombre_place')->nullable();
			$table->smallInteger('urgence')->nullable();
			$table->bigInteger('nature_mission_id')->unsigned()->nullable()->index('FK_nature_mission');
			$table->smallInteger('moyen_transport')->nullable();
			$table->string('moyen_transport_si_autre', 100)->nullable();
			$table->bigInteger('decideur_id')->unsigned()->nullable()->index('FK_decideur');
			$table->bigInteger('signataire_id')->unsigned()->nullable()->index('FK_signataire');
			$table->bigInteger('beneficiaire_principal_id')->unsigned()->nullable()->index('FK_beneficiaire_principale');
			$table->bigInteger('beneficiaire1_id')->unsigned()->nullable()->index('FK_beneficiaire1');
			$table->bigInteger('beneficiaire2_id')->unsigned()->nullable()->index('FK_beneficiaire2');
			$table->bigInteger('beneficiaire3_id')->unsigned()->nullable()->index('FK_beneficiaire3');
			$table->bigInteger('beneficiaire4_id')->unsigned()->nullable()->index('FK_beneficiaire4');
			$table->bigInteger('beneficiaire5_id')->unsigned()->nullable()->index('FK_beneficiaire5');
			$table->bigInteger('beneficiaire6_id')->unsigned()->nullable()->index('FK_beneficiaire6');
			$table->bigInteger('beneficiaire7_id')->unsigned()->nullable()->index('FK_beneficiaire7');
			$table->bigInteger('beneficiaire8_id')->unsigned()->nullable()->index('FK_beneficiaire8');
			$table->string('entite_decideur', 100)->nullable();
			$table->string('entite_signataire', 100)->nullable();
			$table->string('entite_beneficiaire', 100)->nullable();
			$table->date('date_debut_misssion')->nullable();
			$table->date('date_fin_mission')->nullable();
			$table->time('heure_debut_mission')->nullable();
			$table->time('heure_fin_mission')->nullable();
			$table->string('destination_ville', 50)->nullable();
			$table->string('destination_departement', 50)->nullable();
			$table->string('destination_pays', 50)->nullable();
			$table->float('kilometrage_prevu', 10, 0)->nullable();
			$table->smallInteger('nombre_personne')->nullable();
			$table->text('description_mission', 65535)->nullable();
			$table->string('prise_en_charge_cout', 25)->nullable();
			$table->bigInteger('tiers_prenant_en_charge_id')->unsigned()->nullable()->index('FK_tier_prise_en_charge');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('missions');
	}

}
