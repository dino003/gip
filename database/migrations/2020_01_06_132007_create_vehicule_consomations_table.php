<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeConsomationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_consomations', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_consomation_vehicule');
			$table->bigInteger('type_consomation')->unsigned()->nullable()->index('FK_consommation_nature_consomation');
			$table->bigInteger('tiers')->unsigned()->nullable()->index('FK_consomation_tiers');
			$table->date('date_conso')->nullable();
			$table->string('libelle', 100)->nullable();
			$table->string('numero_carte', 100)->nullable();
			$table->string('numero_conducteur', 100)->nullable();
			$table->bigInteger('conducteur')->unsigned()->nullable()->index('FK_consomation_conducteur');
			$table->integer('kilometrage_au_compteur')->nullable();
			$table->float('quantite_consomee', 10, 0)->nullable();
			$table->string('unite_mesure', 15)->nullable();
			$table->bigInteger('consomable')->unsigned()->nullable()->index('FK_consomation_consomable');
			$table->float('prix_unitaire_ht', 10, 0)->nullable();
			$table->float('montant_ttc', 10, 0)->nullable();
			$table->float('montant_tva', 10, 0)->nullable();
			$table->float('montant_ht', 10, 0)->nullable();
			$table->date('date_chargement_integration')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_consomations');
	}

}
