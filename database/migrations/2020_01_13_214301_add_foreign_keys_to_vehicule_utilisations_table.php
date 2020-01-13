<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeUtilisationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_utilisations', function(Blueprint $table)
		{
			$table->foreign('chauffeur', 'FK_utilisation_chauffeur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('entite_utilisateur', 'FK_utilisation_entite_utilisateur')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_utilisation', 'FK_utilisation_nature')->references('id')->on('parametrage_nature_reservations_utilisations')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('utilisateur', 'FK_utilisation_utilisateur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_utilisation_vehicule')->references('id')->on('vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_utilisations', function(Blueprint $table)
		{
			$table->dropForeign('FK_utilisation_chauffeur');
			$table->dropForeign('FK_utilisation_entite_utilisateur');
			$table->dropForeign('FK_utilisation_nature');
			$table->dropForeign('FK_utilisation_utilisateur');
			$table->dropForeign('FK_utilisation_vehicule');
		});
	}

}
