<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVehiculeAmendesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('vehicule_amendes', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_amende_vehicule');
			$table->date('date')->nullable();
			$table->date('date_reception')->nullable();
			$table->time('heure')->nullable();
			$table->bigInteger('nature_amende')->unsigned()->nullable()->index('FK_amende_nature_amende');
			$table->string('lieu', 150)->nullable();
			$table->bigInteger('conducteur')->unsigned()->nullable()->index('FK_amende_conducteur');
			$table->string('regle_par_conducteur_ou_etablissement', 50)->nullable();
			$table->date('date_reglement')->nullable();
			$table->float('montant_amende', 10, 0)->nullable();
			$table->boolean('vehicule_en_fouriere')->nullable();
			$table->float('montant_mise_en_fouriere', 10, 0)->nullable();
			$table->bigInteger('organisme')->unsigned()->nullable()->index('FK_amendde_organisme');
			$table->string('reference_officielle_amende', 150)->nullable();
			$table->text('observation', 65535)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('vehicule_amendes');
	}

}
