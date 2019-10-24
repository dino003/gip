<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateStocksEntreesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('stocks_entrees', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('article')->unsigned()->nullable()->index('FK_entree_article');
			$table->bigInteger('fournisseur')->unsigned()->nullable()->index('FK_entree_fournisseur');
			$table->date('date_entree_stock')->nullable();
			$table->integer('quantite_entree')->unsigned()->nullable();
			$table->float('prix_article', 10, 0)->nullable();
			$table->text('observation', 65535)->nullable();
			$table->string('utilisateur', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('stocks_entrees');
	}

}
