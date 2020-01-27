<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageNatureEnergiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_nature_energies', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('nom_energie', 150)->nullable();
			$table->boolean('energie_propre')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_nature_energies');
	}

}
