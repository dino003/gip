<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUtilisateursFonctionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('utilisateurs_fonctions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->boolean('creation_vehicule')->default(1);
			$table->bigInteger('user')->unsigned()->index('FK_user_fonction');
			$table->boolean('info_detenteur_message')->default(1);
			$table->boolean('modification_vehicule')->default(1);
			$table->boolean('suppresion_vehicule')->default(1);
			$table->boolean('commande_vehicule')->default(1);
			$table->boolean('utilisation_vehicule')->default(1);
			$table->boolean('reservations')->default(1);
			$table->boolean('intervention')->default(1);
			$table->boolean('contrat_assurance')->default(1);
			$table->boolean('ordre_de_mission')->default(1);
			$table->boolean('autorisation_parking')->default(1);
			$table->boolean('consomation_vehicule')->default(1);
			$table->boolean('cout_vehicule')->default(1);
			$table->boolean('gestion_stock_piece')->default(1);
			$table->boolean('amende_vehicule')->default(1);
			$table->boolean('module_des_commandes')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('utilisateurs_fonctions');
	}

}
