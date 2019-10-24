<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxReservationsOrdreMissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_reservations_ordre_missions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_reservations_ordre_missions');
	}

}
