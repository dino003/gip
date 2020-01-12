<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToParametreGenerauxStocksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('parametre_generaux_stocks', function(Blueprint $table)
		{
			$table->foreign('entite_defaut', 'FK_parametrage_stock_entite')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('parametre_generaux_stocks', function(Blueprint $table)
		{
			$table->dropForeign('FK_parametrage_stock_entite');
		});
	}

}
