<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToStockArticlesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('stock_articles', function(Blueprint $table)
		{
			$table->foreign('famille_id', 'FK_article_familles')->references('id')->on('parametrage_famille_pieces_detaches')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('fournisseur_id', 'FK_article_fournisseur')->references('id')->on('tiers')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('marque_id', 'FK_article_marque')->references('id')->on('marques')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('stock_articles', function(Blueprint $table)
		{
			$table->dropForeign('FK_article_familles');
			$table->dropForeign('FK_article_fournisseur');
			$table->dropForeign('FK_article_marque');
		});
	}

}
