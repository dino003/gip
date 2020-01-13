<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToParametrageOperationsInterventionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('parametrage_operations_interventions', function(Blueprint $table)
		{
			$table->foreign('categorie_vehicule', 'FK_operation_categorie_vehicule')->references('id')->on('parametrage_codifications_categories_vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_intervention', 'FK_operation_nature_intervention')->references('id')->on('parametrage_nature_interventions')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('parametrage_operations_interventions', function(Blueprint $table)
		{
			$table->dropForeign('FK_operation_categorie_vehicule');
			$table->dropForeign('FK_operation_nature_intervention');
		});
	}

}
