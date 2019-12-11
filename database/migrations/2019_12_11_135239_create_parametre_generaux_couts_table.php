<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxCoutsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_couts', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->boolean('budget_ttc_ht')->default(0);
			$table->bigInteger('nature_DR_achat_vehicule')->unsigned()->nullable()->index('FK_achat_dr');
			$table->bigInteger('nature_DR_leasing_vehicule')->unsigned()->nullable()->index('FK_leasing_dr');
			$table->bigInteger('nature_DR_reparation_vehicule')->unsigned()->nullable()->index('FK_reparation_dr');
			$table->bigInteger('nature_DR_achat_materiel_vehicule')->unsigned()->nullable()->index('FK_achat_materiel_dr');
			$table->bigInteger('nature_DR_assurance_vehicule')->unsigned()->nullable()->index('FK_assurance_dr');
			$table->bigInteger('nature_DR_divers')->unsigned()->nullable()->index('FK_divers_dr');
			$table->bigInteger('nature_DR_amende')->unsigned()->nullable()->index('FK_amende_dr');
			$table->bigInteger('nature_DR_location_vehicule')->unsigned()->nullable()->index('FK_location_dr');
			$table->bigInteger('nature_DR_entretien_vehicule')->unsigned()->nullable()->index('FK_entretien_dr');
			$table->bigInteger('nature_DR_carburant_vehicule')->unsigned()->nullable()->index('FK_carburant_dr');
			$table->bigInteger('nature_DR_frais_peage_vehicule')->unsigned()->nullable()->index('FK_frais_peage_dr');
			$table->bigInteger('nature_DR_sinistre_assurance_vehicule')->unsigned()->nullable()->index('FK_sinistre_assurance_dr');
			$table->bigInteger('nature_DR_taxe_vehicule')->unsigned()->nullable()->index('FK_taxe_dr');
			$table->bigInteger('nature_DR_frais_vehicule')->unsigned()->nullable()->index('FK_frais_dr');
			$table->float('taux_prix_achat_remise', 10, 0)->nullable();
			$table->float('taux_loyer_annuel', 10, 0)->nullable();
			$table->boolean('dr_intervention')->nullable()->default(1);
			$table->boolean('dr_introduction_taxe')->nullable()->default(1);
			$table->boolean('dr_introduction_consomation')->nullable()->default(1);
			$table->boolean('dr_introduction_amende')->nullable()->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_couts');
	}

}
