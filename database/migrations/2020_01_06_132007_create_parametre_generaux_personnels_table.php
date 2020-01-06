<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxPersonnelsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_personnels', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->boolean('fonction')->default(0);
			$table->boolean('matricule_obligatoire')->default(0);
			$table->boolean('info_permis')->default(0);
			$table->boolean('boite_lettre')->default(0);
			$table->boolean('numero_conducteur')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_personnels');
	}

}
