<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageNaturesConsomationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_natures_consomation', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('nature_consomation', 150)->nullable();
			$table->string('categorie', 80)->nullable();
			$table->string('unite_mesure', 80)->nullable();
			$table->string('carte_associe', 80)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_natures_consomation');
	}

}
