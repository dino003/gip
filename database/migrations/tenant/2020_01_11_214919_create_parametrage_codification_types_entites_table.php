<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageCodificationTypesEntitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_codification_types_entites', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('type_entite', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_codification_types_entites');
	}

}
