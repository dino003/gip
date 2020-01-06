<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeConsomationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_consomations', function(Blueprint $table)
		{
			$table->foreign('conducteur', 'FK_consomation_conducteur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('consomable', 'FK_consomation_consomable')->references('id')->on('parametrage_cout_consomables')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('tiers', 'FK_consomation_tiers')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_consomation_vehicule')->references('id')->on('vehicules')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_consomation', 'FK_consommation_nature_consomation')->references('id')->on('parametrage_natures_consomation')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_consomations', function(Blueprint $table)
		{
			$table->dropForeign('FK_consomation_conducteur');
			$table->dropForeign('FK_consomation_consomable');
			$table->dropForeign('FK_consomation_tiers');
			$table->dropForeign('FK_consomation_vehicule');
			$table->dropForeign('FK_consommation_nature_consomation');
		});
	}

}
