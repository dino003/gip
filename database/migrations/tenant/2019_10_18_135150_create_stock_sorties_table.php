<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStockSortiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stock_sorties', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('article')->unsigned()->nullable()->index('FK_sortie_article');
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_sortie_vehicule');
			$table->date('date_sortie')->nullable();
			$table->integer('quantite_sortie')->unsigned()->nullable();
			$table->float('prix_article', 10, 0)->nullable();
			$table->text('observation', 65535)->nullable();
			$table->text('utilisateur', 65535)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('stock_sorties');
	}

}
