<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToHostnamesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('hostnames', function(Blueprint $table)
		{
			$table->foreign('website_id')->references('id')->on('websites')->onUpdate('RESTRICT')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('hostnames', function(Blueprint $table)
		{
			$table->dropForeign('hostnames_website_id_foreign');
		});
	}

}
