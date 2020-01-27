<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToStockCommandesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('stock_commandes', function(Blueprint $table)
		{
			$table->foreign('article', 'FK_commande_article')->references('id')->on('stock_articles')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('fournisseur', 'FK_commande_fournisseur')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_commande_vehicule')->references('id')->on('parametre_generaux_vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('stock_commandes', function(Blueprint $table)
		{
			$table->dropForeign('FK_commande_article');
			$table->dropForeign('FK_commande_fournisseur');
			$table->dropForeign('FK_commande_vehicule');
		});
	}

}
