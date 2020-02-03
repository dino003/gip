<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPlanOrganisationnelsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('plan_organisationnels', function(Blueprint $table)
		{
			$table->foreign('parent')->references('id')->on('plan_organisationnels')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('structure_organisationnel_id')->references('id')->on('structure_organisationelles')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('plan_organisationnels', function(Blueprint $table)
		{
			$table->dropForeign('plan_organisationnels_parent_foreign');
			$table->dropForeign('plan_organisationnels_structure_organisationnel_id_foreign');
		});
	}

}
