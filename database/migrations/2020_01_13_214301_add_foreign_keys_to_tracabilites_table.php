<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTracabilitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tracabilites', function(Blueprint $table)
		{
			$table->foreign('user_id', 'FK_tracabilite_user')->references('id')->on('users')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule_id', 'FK_tracabilite_vehicule')->references('id')->on('vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tracabilites', function(Blueprint $table)
		{
			$table->dropForeign('FK_tracabilite_user');
			$table->dropForeign('FK_tracabilite_vehicule');
		});
	}

}
