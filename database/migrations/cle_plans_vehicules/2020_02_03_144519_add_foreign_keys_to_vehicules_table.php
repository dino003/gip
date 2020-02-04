<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicules', function(Blueprint $table)
		{
			$table->foreign('categorie', 'FK_vehicule_categorie')->references('id')->on('parametrage_codifications_categories_vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('chauffeur_atitre', 'FK_vehicule_chauffeur_atitre')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('contrat_assurance_id', 'FK_vehicule_contrat_assurance')->references('id')->on('contrat_assurances')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('detenteur', 'FK_vehicule_detenteur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('entite_comptable', 'FK_vehicule_entite_comptable')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('entite_physique', 'FK_vehicule_entite_physique')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('marque', 'FK_vehicule_marque')->references('id')->on('marques')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('tiers', 'FK_vehicule_tiers')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('energie', 'FK_véhicule_energie')->references('id')->on('parametrage_nature_energies')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('demandeur', 'FKvehicule_demandeur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('affectation_geographique_id')->references('id')->on('plan_geographiques')->onUpdate('CASCADE')->onDelete('SET NULL');
			$table->foreign('affectation_organisationnel_id')->references('id')->on('plan_organisationnels')->onUpdate('CASCADE')->onDelete('SET NULL');
		
		
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicules', function(Blueprint $table)
		{
			$table->dropForeign('FK_vehicule_categorie');
			$table->dropForeign('FK_vehicule_chauffeur_atitre');
			$table->dropForeign('FK_vehicule_contrat_assurance');
			$table->dropForeign('FK_vehicule_detenteur');
			$table->dropForeign('FK_vehicule_entite_comptable');
			$table->dropForeign('FK_vehicule_entite_physique');
			$table->dropForeign('FK_vehicule_marque');
			$table->dropForeign('FK_vehicule_tiers');
			$table->dropForeign('FK_véhicule_energie');
			$table->dropForeign('FKvehicule_demandeur');
			$table->dropForeign('vehicules_affectation_geographique_id_foreign');
			$table->dropForeign('vehicules_affectation_organisationnel_id_foreign');
		});
	}

}
