<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToParametrageCodificationsModeleVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('parametrage_codifications_modele_vehicules', function(Blueprint $table)
		{
			$table->foreign('categorie', 'FK_modele_categorie')->references('id')->on('parametrage_codifications_categories_vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('fournisseur', 'FK_modele_fournisseur')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('marque', 'FK_modele_marque')->references('id')->on('marques')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('parametrage_codifications_modele_vehicules', function(Blueprint $table)
		{
			$table->dropForeign('FK_modele_categorie');
			$table->dropForeign('FK_modele_fournisseur');
			$table->dropForeign('FK_modele_marque');
		});
	}

}
