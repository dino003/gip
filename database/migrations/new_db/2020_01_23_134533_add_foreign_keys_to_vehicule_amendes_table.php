<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeAmendesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_amendes', function(Blueprint $table)
		{
			$table->foreign('organisme', 'FK_amendde_organisme')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('conducteur', 'FK_amende_conducteur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_amende', 'FK_amende_nature_amende')->references('id')->on('parametrage_natures_amendes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_amende_vehicule')->references('id')->on('vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_amendes', function(Blueprint $table)
		{
			$table->dropForeign('FK_amendde_organisme');
			$table->dropForeign('FK_amende_conducteur');
			$table->dropForeign('FK_amende_nature_amende');
			$table->dropForeign('FK_amende_vehicule');
		});
	}

}
