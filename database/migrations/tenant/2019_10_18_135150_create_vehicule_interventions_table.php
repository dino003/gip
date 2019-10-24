<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeInterventionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_interventions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_intervention_vehicule');
			$table->bigInteger('nature_intervention')->unsigned()->nullable()->index('FK_nature_interventions_intervention');
			$table->string('categorie', 150)->nullable();
			$table->string('libelle_complementaire', 150)->nullable();
			$table->bigInteger('tiers')->unsigned()->nullable()->index('FK_intervention_tiers');
			$table->boolean('preparation_devis')->nullable()->default(0);
			$table->boolean('preparation_BI')->nullable()->default(0);
			$table->string('numero_devis_BI', 50)->nullable();
			$table->string('numero_interne_document', 50)->nullable();
			$table->date('date_emission')->nullable();
			$table->date('date_fin_prevue')->nullable();
			$table->time('heure_fin_prevue')->nullable();
			$table->float('duree_immo_en_jour', 10, 0)->nullable();
			$table->float('kilometrage', 10, 0)->nullable();
			$table->date('date_reception_retour')->nullable();
			$table->float('cout_ttc_intervention', 10, 0)->nullable();
			$table->string('numero_facture_fournisseur', 100)->nullable();
			$table->date('date')->nullable();
			$table->date('date_debut')->nullable();
			$table->time('heure_debut')->nullable();
			$table->time('heur_fin')->nullable();
			$table->date('date_fin_reele')->nullable();
			$table->date('date_reglement')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_interventions');
	}

}
