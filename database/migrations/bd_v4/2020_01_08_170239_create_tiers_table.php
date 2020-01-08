<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTiersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tiers', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('code', 50)->nullable();
			$table->string('nom', 150)->nullable();
			$table->string('metier_principal', 150)->nullable();
			$table->string('autre_metier1', 150)->nullable();
			$table->string('adresse1', 150)->nullable();
			$table->string('adresse2', 150)->nullable();
			$table->string('code_postal', 30)->nullable();
			$table->string('telephonne', 30)->nullable();
			$table->string('fax', 80)->nullable();
			$table->string('adresse_messagerie', 80)->nullable();
			$table->string('numero_de_siret', 40)->nullable();
			$table->enum('fournisseur', array('Fournisseur Interne','Fournisseur Externe'))->default('Fournisseur Interne');
			$table->string('numero_client_etablissement', 50)->nullable();
			$table->string('numero_compte', 50)->nullable();
			$table->enum('mode_reglement', array('Virement','Chèque','Carte bancaire','Espèces','Traite'))->nullable()->default('Virement');
			$table->string('delai_reglement', 50)->nullable();
			$table->string('nom_banque', 50)->nullable();
			$table->string('rib', 50)->nullable();
			$table->string('ville', 60)->nullable();
			$table->string('pays', 60)->nullable();
			$table->string('autre_metier2', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('tiers');
	}

}
