<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeInfosTechniquesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_infos_techniques', function(Blueprint $table)
		{
			$table->foreign('vehicule', 'FK_info_techniques_vehicule')->references('id')->on('vehicules')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_infos_techniques', function(Blueprint $table)
		{
			$table->dropForeign('FK_info_techniques_vehicule');
		});
	}

}
