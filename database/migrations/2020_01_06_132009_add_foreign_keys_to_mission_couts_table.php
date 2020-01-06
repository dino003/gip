<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMissionCoutsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('mission_couts', function(Blueprint $table)
		{
			$table->foreign('mission_id', 'FK_cout_mission')->references('id')->on('missions')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('mission_couts', function(Blueprint $table)
		{
			$table->dropForeign('FK_cout_mission');
		});
	}

}
