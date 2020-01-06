<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeInterventionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_interventions', function(Blueprint $table)
		{
			$table->foreign('tiers', 'FK_intervention_tiers')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_intervention_vehicule')->references('id')->on('vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_intervention', 'FK_nature_interventions_intervention')->references('id')->on('parametrage_nature_interventions')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_interventions', function(Blueprint $table)
		{
			$table->dropForeign('FK_intervention_tiers');
			$table->dropForeign('FK_intervention_vehicule');
			$table->dropForeign('FK_nature_interventions_intervention');
		});
	}

}
