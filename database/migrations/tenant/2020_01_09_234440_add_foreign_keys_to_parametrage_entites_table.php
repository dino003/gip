<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToParametrageEntitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('parametrage_entites', function(Blueprint $table)
		{
			$table->foreign('regroupement', 'FK_entite_regroupement')->references('id')->on('parametrage_structure_regroupements')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('responsable', 'FK_entite_responsable')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('type_entite', 'FK_entite_type_entite')->references('id')->on('parametrage_codification_types_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('parametrage_entites', function(Blueprint $table)
		{
			$table->dropForeign('FK_entite_regroupement');
			$table->dropForeign('FK_entite_responsable');
			$table->dropForeign('FK_entite_type_entite');
		});
	}

}
