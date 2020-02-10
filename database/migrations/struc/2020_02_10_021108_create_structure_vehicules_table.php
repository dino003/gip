<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStructureVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('structure_vehicules', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->integer('niveau')->nullable();
			$table->string('libelle', 200)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('structure_vehicules');
	}

}
