<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPersonnelsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('personnels', function(Blueprint $table)
		{
			$table->foreign('categorie', 'FK_personnel_categorie_vehicule')->references('id')->on('parametrage_codifications_categories_vehicules')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('entite_affectation', 'FK_personnel_entite_affectation')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('personnels', function(Blueprint $table)
		{
			$table->dropForeign('FK_personnel_categorie_vehicule');
			$table->dropForeign('FK_personnel_entite_affectation');
		});
	}

}
