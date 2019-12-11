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
			$table->bigInteger('famille_id')->unsigned()->nullable()->index('FK_article_familles');
			$table->smallInteger('type_article')->nullable();
			$table->string('libelle_article', 150)->nullable();
			$table->bigInteger('marque_id')->unsigned()->nullable()->index('FK_article_marque');
			$table->string('modele', 150)->nullable();
			$table->bigInteger('fournisseur_id')->unsigned()->nullable()->index('FK_article_fournisseur');
			$table->string('numero_commande_fournisseur', 150)->nullable();
			$table->float('quantite_phisique_stock', 10, 0)->nullable();
			$table->float('seuil_alerte', 10, 0)->nullable();
			$table->float('maxi_stock', 10, 0)->nullable();
			$table->float('en_commande_ral', 10, 0)->nullable();
			$table->float('quantite_disponible_stock', 10, 0)->nullable();
			$table->float('en_cours_sortie', 10, 0)->nullable();
			$table->float('prix_article', 10, 0)->nullable();
			$table->float('tva', 10, 0)->nullable();
			$table->float('valorisation_hors_taxe', 10, 0)->nullable();
			$table->float('valorisation_ttc', 10, 0)->nullable();
			$table->string('numero_article', 50)->nullable();
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
