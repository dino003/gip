<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageFamillePiecesDetachesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_famille_pieces_detaches', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('famille', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_famille_pieces_detaches');
	}

}
