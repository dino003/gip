<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageStructureRegroupementsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_structure_regroupements', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('code_regroupement', 50)->nullable();
			$table->string('nom_regroupement', 200)->nullable();
			$table->string('regroupement_appartenance', 100)->nullable()->default('SIEGE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_structure_regroupements');
	}

}
