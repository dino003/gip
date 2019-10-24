<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToStocksEntreesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('stocks_entrees', function(Blueprint $table)
		{
			$table->foreign('article', 'FK_entree_article')->references('id')->on('stock_articles')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('fournisseur', 'FK_entree_fournisseur')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('stocks_entrees', function(Blueprint $table)
		{
			$table->dropForeign('FK_entree_article');
			$table->dropForeign('FK_entree_fournisseur');
		});
	}

}
