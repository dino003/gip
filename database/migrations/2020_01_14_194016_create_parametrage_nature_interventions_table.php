<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageNatureInterventionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_nature_interventions', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('nom_intervention', 150)->nullable();
			$table->string('categorie', 80)->nullable();
			$table->boolean('sinistre')->nullable()->default(0);
			$table->boolean('operation')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_nature_interventions');
	}

}
