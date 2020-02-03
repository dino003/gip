<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePlanOrganisationnelsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('plan_organisationnels', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('libelle', 200)->nullable();
			$table->bigInteger('structure_organisationnel_id')->unsigned()->nullable()->index('plan_organisationnels_structure_organisationnel_id_foreign');
			$table->bigInteger('parent')->unsigned()->nullable()->index('plan_organisationnels_parent_foreign');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('plan_organisationnels');
	}

}
