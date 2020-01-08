<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeDepensesRecettesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_depenses_recettes', function(Blueprint $table)
		{
			$table->foreign('nature', 'FK_depense_recette_nature')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('tiers', 'FK_depense_recette_tiers')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('taux_tvaR', 'FK_depense_recette_tva')->references('id')->on('parametre_taux_tva')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_depense_recette_vehicule')->references('id')->on('vehicules')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_depenses_recettes', function(Blueprint $table)
		{
			$table->dropForeign('FK_depense_recette_nature');
			$table->dropForeign('FK_depense_recette_tiers');
			$table->dropForeign('FK_depense_recette_tva');
			$table->dropForeign('FK_depense_recette_vehicule');
		});
	}

}
