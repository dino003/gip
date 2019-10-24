<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStockArticlesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stock_articles', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('famille')->unsigned()->nullable()->index('FK_article_familles');
			$table->boolean('piece_detacheou_consomable')->default(0);
			$table->string('libelle_article', 150)->nullable();
			$table->bigInteger('marque')->unsigned()->nullable()->index('FK_article_marque');
			$table->string('modele', 150)->nullable();
			$table->bigInteger('fournisseur')->unsigned()->nullable()->index('FK_article_fournisseur');
			$table->string('numero_commande_fournisseur', 150)->nullable();
			$table->float('quantite_phisique_stock', 10, 0)->nullable();
			$table->float('seuil_alerte', 10, 0)->nullable();
			$table->float('maxi_stock', 10, 0)->nullable();
			$table->float('en_commande_ral', 10, 0)->nullable();
			$table->float('disponible_stock', 10, 0)->nullable();
			$table->float('en_cours_sortie', 10, 0)->nullable();
			$table->float('prix_article', 10, 0)->nullable();
			$table->bigInteger('tva')->unsigned()->nullable();
			$table->float('prix_hors_taxe', 10, 0)->nullable();
			$table->float('prix_ttc', 10, 0)->nullable();
			$table->integer('numero_article')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('stock_articles');
	}

}
