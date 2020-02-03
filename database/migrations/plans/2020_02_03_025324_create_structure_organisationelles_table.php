<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStructureOrganisationellesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('structure_organisationelles', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->smallInteger('niveau')->nullable();
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
		Schema::drop('structure_organisationelles');
	}

}
