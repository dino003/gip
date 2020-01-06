<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageNatureReservationsUtilisationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_nature_reservations_utilisations', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('libelle', 150)->nullable();
			$table->smallInteger('priorite')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_nature_reservations_utilisations');
	}

}
