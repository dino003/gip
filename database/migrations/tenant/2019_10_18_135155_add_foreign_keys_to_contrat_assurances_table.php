<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToContratAssurancesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('contrat_assurances', function(Blueprint $table)
		{
			$table->foreign('compagnie_assurance', 'FK_contrat_compagnie_assurance')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('courtier', 'FK_contrat_courtier')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_contrat_vehicule')->references('id')->on('vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('contrat_assurances', function(Blueprint $table)
		{
			$table->dropForeign('FK_contrat_compagnie_assurance');
			$table->dropForeign('FK_contrat_courtier');
			$table->dropForeign('FK_contrat_vehicule');
		});
	}

}
