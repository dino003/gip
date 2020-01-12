<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCommandesContenuCommandesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('commandes_contenu_commandes', function(Blueprint $table)
		{
			$table->foreign('commande', 'FK_contenu_commande_commande')->references('id')->on('commandes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('energie', 'FK_contenu_commande_energie')->references('id')->on('parametrage_nature_energies')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('marque', 'FK_contenu_commande_marque')->references('id')->on('marques')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('commandes_contenu_commandes', function(Blueprint $table)
		{
			$table->dropForeign('FK_contenu_commande_commande');
			$table->dropForeign('FK_contenu_commande_energie');
			$table->dropForeign('FK_contenu_commande_marque');
		});
	}

}
