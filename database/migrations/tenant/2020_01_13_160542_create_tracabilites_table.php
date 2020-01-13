<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTracabilitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tracabilites', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('vehicule_id')->unsigned()->nullable()->index('FK_tracabilite_vehicule');
			$table->string('type_evenement', 100)->nullable();
			$table->date('date')->nullable();
			$table->time('heure')->nullable();
			$table->bigInteger('user_id')->unsigned()->nullable()->index('FK_tracabilite_user');
			$table->string('libelle')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('tracabilites');
	}

}
