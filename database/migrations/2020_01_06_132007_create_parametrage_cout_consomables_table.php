<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageCoutConsomablesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_cout_consomables', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('libelle', 150)->nullable();
			$table->float('cout_unitaire', 10, 0)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_cout_consomables');
	}

}
