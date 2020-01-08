<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToParametrageStructureRegroupementsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('parametrage_structure_regroupements', function(Blueprint $table)
		{
			$table->foreign('parent', 'FK_parent')->references('id')->on('parametrage_structure_regroupements')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('parametrage_structure_regroupements', function(Blueprint $table)
		{
			$table->dropForeign('FK_parent');
		});
	}

}
