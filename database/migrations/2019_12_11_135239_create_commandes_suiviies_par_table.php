<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommandesSuiviiesParTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('commandes_suiviies_par', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('nom')->unsigned()->nullable();
			$table->string('telephonne', 50)->nullable();
			$table->string('fax', 100)->nullable();
			$table->string('messagerie', 100)->nullable();
			$table->string('entite_service', 100)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('commandes_suiviies_par');
	}

}
