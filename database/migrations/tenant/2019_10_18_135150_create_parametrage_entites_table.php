<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametrageEntitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametrage_entites', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('entite', 50)->nullable();
			$table->string('nom_entite', 150)->nullable();
			$table->string('adresse1', 150)->nullable();
			$table->string('adresse2', 150)->nullable();
			$table->string('code_postal', 30)->nullable();
			$table->string('ville', 60)->nullable();
			$table->string('telephonne1', 60)->nullable();
			$table->string('telephonne2', 60)->nullable();
			$table->string('fax', 60)->nullable();
			$table->bigInteger('type_entite')->unsigned()->nullable()->index('FK_entite_type_entite');
			$table->bigInteger('regroupement')->unsigned()->nullable()->index('FK_entite_regroupement');
			$table->bigInteger('rattachement')->unsigned()->nullable();
			$table->bigInteger('responsable')->unsigned()->nullable()->index('FK_entite_responsable');
			$table->string('numero_siret_entite', 100)->nullable();
			$table->string('lieu_prise_en_charge', 100)->nullable();
			$table->string('lieu_restitution', 100)->nullable();
			$table->string('lieu_stockage_double_cle', 100)->nullable();
			$table->string('numero_centre_analytique', 100)->nullable();
			$table->string('numero_comptable', 100)->nullable();
			$table->string('fax_responsable', 100)->nullable();
			$table->string('telephonne_responsable', 100)->nullable();
			$table->string('adresse_email', 200)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametrage_entites');
	}

}
