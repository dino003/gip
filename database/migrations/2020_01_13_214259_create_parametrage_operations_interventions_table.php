<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageOperationsInterventionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_operations_interventions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('nature_intervention')->unsigned()->nullable()->index('FK_operation_nature_intervention');
			$table->bigInteger('categorie_vehicule')->unsigned()->nullable()->index('FK_operation_categorie_vehicule');
			$table->string('categorie_operation', 100)->nullable();
			$table->string('nature_operation', 100)->nullable();
			$table->integer('temps_minute')->nullable();
			$table->float('cout_moyen', 10, 0)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_operations_interventions');
	}

}
