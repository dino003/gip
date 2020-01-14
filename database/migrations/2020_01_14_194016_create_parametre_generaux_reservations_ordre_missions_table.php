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
			$table->boolean('vehicule_fonction_reservable')->default(0);
			$table->boolean('admin_seul_modif')->default(0);
			$table->boolean('admin_seul_supp')->default(0);
			$table->boolean('edition_automatique')->default(0);
			$table->boolean('interdire_chevauchement')->default(0);
			$table->integer('nombre_jour_a_ne_pas_depasser')->nullable()->default(0);
			$table->integer('jour_par_date')->nullable()->default(0);
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
