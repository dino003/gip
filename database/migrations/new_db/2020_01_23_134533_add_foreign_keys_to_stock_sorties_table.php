<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToStockSortiesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('stock_sorties', function(Blueprint $table)
		{
			$table->foreign('article_id', 'FK_sortie_article')->references('id')->on('stock_articles')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule_id', 'FK_sortie_vehicule')->references('id')->on('stock_articles')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('stock_sorties', function(Blueprint $table)
		{
			$table->dropForeign('FK_sortie_article');
			$table->dropForeign('FK_sortie_vehicule');
		});
	}

}
