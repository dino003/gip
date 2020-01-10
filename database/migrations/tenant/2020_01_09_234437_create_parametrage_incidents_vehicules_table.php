<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageIncidentsVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_incidents_vehicules', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('code', 100)->nullable();
			$table->string('libelle', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_incidents_vehicules');
	}

}
