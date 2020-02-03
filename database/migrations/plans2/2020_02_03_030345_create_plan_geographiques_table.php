<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePlanGeographiquesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('plan_geographiques', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('libelle', 150)->nullable();
			$table->bigInteger('structure_geographique_id')->unsigned()->nullable()->index('plan_geographiques_structure_geographique_id_foreign');
			$table->bigInteger('parent')->unsigned()->nullable()->index('plan_geographiques_parent_foreign');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('plan_geographiques');
	}

}
