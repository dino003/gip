<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateHostnamesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('hostnames', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('fqdn')->unique();
			$table->string('redirect_to')->nullable();
			$table->boolean('force_https')->default(0);
			$table->dateTime('under_maintenance_since')->nullable();
			$table->bigInteger('website_id')->unsigned()->nullable()->index('hostnames_website_id_foreign');
			$table->timestamps();
			$table->softDeletes();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('hostnames');
	}

}
