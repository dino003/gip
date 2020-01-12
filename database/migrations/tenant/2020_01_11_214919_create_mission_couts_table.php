<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMissionCoutsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mission_couts', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('mission_id')->unsigned()->nullable()->index('FK_cout_mission');
			$table->smallInteger('nuitees')->unsigned()->nullable();
			$table->smallInteger('repas')->unsigned()->nullable();
			$table->smallInteger('peages')->unsigned()->nullable();
			$table->smallInteger('billet_de_train')->unsigned()->nullable();
			$table->smallInteger('billet_avion')->unsigned()->nullable();
			$table->smallInteger('taxis')->unsigned()->nullable();
			$table->smallInteger('billet_transport_commun')->unsigned()->nullable();
			$table->smallInteger('puissance_vehicule_cv')->unsigned()->nullable();
			$table->integer('kilometre_parcouru')->unsigned()->nullable();
			$table->float('cout_unitaire_kilometre', 10, 0)->unsigned()->nullable();
			$table->float('cout_total_kms', 10, 0)->unsigned()->nullable();
			$table->float('cout_nuitee', 10, 0)->unsigned()->nullable();
			$table->float('cout_repas', 10, 0)->unsigned()->nullable();
			$table->float('cout_peage', 10, 0)->unsigned()->nullable();
			$table->float('cout_billet_train', 10, 0)->unsigned()->nullable();
			$table->float('cout_billet_avion', 10, 0)->unsigned()->nullable();
			$table->float('cou_billet_taxis', 10, 0)->unsigned()->nullable();
			$table->float('cout_bilet_transport_commun', 10, 0)->unsigned()->nullable();
			$table->float('frais_divers', 10, 0)->unsigned()->nullable();
			$table->float('cout_total_mission', 10, 0)->unsigned()->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('mission_couts');
	}

}
