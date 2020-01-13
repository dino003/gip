<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculeReservationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicule_reservations', function(Blueprint $table)
		{
			$table->foreign('utilisateur', 'FK_reservatio_user')->references('id')->on('users')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('objet_reservation', 'FK_reservation_objet')->references('id')->on('parametrage_nature_reservations_utilisations')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('personne_reservant', 'FK_reservation_personne')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_reservation_vehicule')->references('id')->on('vehicules')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicule_reservations', function(Blueprint $table)
		{
			$table->dropForeign('FK_reservatio_user');
			$table->dropForeign('FK_reservation_objet');
			$table->dropForeign('FK_reservation_personne');
			$table->dropForeign('FK_reservation_vehicule');
		});
	}

}
