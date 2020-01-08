<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxStocksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_stocks', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->bigInteger('entite_defaut')->unsigned()->nullable()->index('FK_parametrage_stock_entite');
			$table->boolean('gerer_numero_article_auto')->default(1);
			$table->string('nom_entite', 100)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_stocks');
	}

}
