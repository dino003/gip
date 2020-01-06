<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreTauxTvaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_taux_tva', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('code', 50)->nullable();
			$table->float('taux', 10, 0)->nullable();
			$table->string('libelle', 100)->nullable();
			$table->boolean('defaut')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_taux_tva');
	}

}
