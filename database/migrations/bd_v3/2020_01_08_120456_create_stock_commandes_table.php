<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStockCommandesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stock_commandes', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->date('date_commande')->nullable();
			$table->string('commande_fournisseur', 50)->nullable();
			$table->bigInteger('article')->unsigned()->nullable()->index('FK_commande_article');
			$table->date('date_livraison_souhaitee')->nullable();
			$table->date('date_finale_livraison')->nullable();
			$table->date('date_expedition_commande')->nullable();
			$table->bigInteger('vehicule')->unsigned()->nullable()->index('FK_commande_vehicule');
			$table->smallInteger('etat_commande')->nullable()->default(0);
			$table->string('modele', 150)->nullable();
			$table->bigInteger('fournisseur')->unsigned()->nullable()->index('FK_commande_fournisseur');
			$table->float('prix_article', 10, 0)->nullable();
			$table->integer('nombre_commande')->nullable();
			$table->integer('en_cours_reception')->nullable();
			$table->text('observation', 65535)->nullable();
			$table->string('marque', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('stock_commandes');
	}

}
