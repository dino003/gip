<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPlanGeographiquesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('plan_geographiques', function(Blueprint $table)
		{
			$table->foreign('parent')->references('id')->on('plan_geographiques')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('structure_geographique_id')->references('id')->on('structure_geographiques')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('plan_geographiques', function(Blueprint $table)
		{
			$table->dropForeign('plan_geographiques_parent_foreign');
			$table->dropForeign('plan_geographiques_structure_geographique_id_foreign');
		});
	}

}
