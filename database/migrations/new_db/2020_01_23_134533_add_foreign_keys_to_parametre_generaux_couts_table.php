<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToParametreGenerauxCoutsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('parametre_generaux_couts', function(Blueprint $table)
		{
			$table->foreign('nature_DR_achat_vehicule', 'FK_achat_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_achat_materiel_vehicule', 'FK_achat_materiel_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_amende', 'FK_amende_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_assurance_vehicule', 'FK_assurance_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_carburant_vehicule', 'FK_carburant_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_divers', 'FK_divers_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_entretien_vehicule', 'FK_entretien_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_frais_vehicule', 'FK_frais_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_frais_peage_vehicule', 'FK_frais_peage_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_leasing_vehicule', 'FK_leasing_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_location_vehicule', 'FK_location_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_reparation_vehicule', 'FK_reparation_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_sinistre_assurance_vehicule', 'FK_sinistre_assurance_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_DR_taxe_vehicule', 'FK_taxe_dr')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('parametre_generaux_couts', function(Blueprint $table)
		{
			$table->dropForeign('FK_achat_dr');
			$table->dropForeign('FK_achat_materiel_dr');
			$table->dropForeign('FK_amende_dr');
			$table->dropForeign('FK_assurance_dr');
			$table->dropForeign('FK_carburant_dr');
			$table->dropForeign('FK_divers_dr');
			$table->dropForeign('FK_entretien_dr');
			$table->dropForeign('FK_frais_dr');
			$table->dropForeign('FK_frais_peage_dr');
			$table->dropForeign('FK_leasing_dr');
			$table->dropForeign('FK_location_dr');
			$table->dropForeign('FK_reparation_dr');
			$table->dropForeign('FK_sinistre_assurance_dr');
			$table->dropForeign('FK_taxe_dr');
		});
	}

}
