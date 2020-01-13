<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommandesContenuCommandesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('commandes_contenu_commandes', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('contenu_libelle_commande', 100)->nullable();
			$table->string('contenu_modele_vehicule', 150)->nullable();
			$table->smallInteger('contenu_etat_commande')->default(0);
			$table->date('contenu_date_livraison_souhaite')->nullable();
			$table->date('contenu_date_livraison')->nullable();
			$table->bigInteger('marque')->unsigned()->nullable()->index('FK_contenu_commande_marque');
			$table->bigInteger('commande')->unsigned()->nullable()->index('FK_contenu_commande_commande');
			$table->bigInteger('energie')->unsigned()->nullable()->index('FK_contenu_commande_energie');
			$table->float('cv_fiscaux', 10, 0)->nullable();
			$table->float('places', 10, 0)->nullable();
			$table->string('couleur', 100)->nullable();
			$table->boolean('climatisation')->default(0);
			$table->boolean('pneu_neige')->default(0);
			$table->boolean('radio_cd')->default(0);
			$table->boolean('gps')->default(0);
			$table->float('contenu_quantite_commande', 10, 0)->nullable();
			$table->float('contenu_quantite_livree', 10, 0)->nullable();
			$table->float('contenu_montant_commande', 10, 0)->nullable();
			$table->float('contenu_taux_tva', 10, 0)->nullable();
			$table->float('contenu_montant_ttc', 10, 0)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('commandes_contenu_commandes');
	}

}
