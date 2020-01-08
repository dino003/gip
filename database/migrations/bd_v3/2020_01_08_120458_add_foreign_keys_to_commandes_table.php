<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCommandesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('commandes', function(Blueprint $table)
		{
			$table->foreign('livraison_entite', 'FK_commandes_entite')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('facturation_entite', 'FK_commandes_facturation_entite')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('fournisseur', 'FK_commandes_fournisseur')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('personne', 'FK_commandes_personne')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('commandes', function(Blueprint $table)
		{
			$table->dropForeign('FK_commandes_entite');
			$table->dropForeign('FK_commandes_facturation_entite');
			$table->dropForeign('FK_commandes_fournisseur');
			$table->dropForeign('FK_commandes_personne');
		});
	}

}
