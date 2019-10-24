<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToBudgetsEntitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('budgets_entites', function(Blueprint $table)
		{
			$table->foreign('entite', 'FK_budget_entite')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_ligne_budget', 'FK_budget_nature')->references('id')->on('parametrage_natures_depenses_recettes')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule', 'FK_budget_vehicule')->references('id')->on('vehicules')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('budgets_entites', function(Blueprint $table)
		{
			$table->dropForeign('FK_budget_entite');
			$table->dropForeign('FK_budget_nature');
			$table->dropForeign('FK_budget_vehicule');
		});
	}

}
