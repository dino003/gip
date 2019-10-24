<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxEtablissementsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_etablissements', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('telephonne', 50)->default('0');
			$table->string('societe', 200)->nullable();
			$table->string('adresse1', 200)->nullable();
			$table->string('adresse2', 200)->nullable();
			$table->string('code_postal', 30)->nullable();
			$table->string('fax', 200)->nullable();
			$table->string('internet', 200)->nullable();
			$table->string('logo', 200)->nullable();
			$table->integer('ville')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_etablissements');
	}

}
