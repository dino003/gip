<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateContratAssurancesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('contrat_assurances', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('numero_contrat_police', 100)->nullable();
			$table->date('date_contrat')->nullable();
			$table->date('periode_date_debut')->nullable();
			$table->date('periode_date_fin')->nullable();
			$table->date('date_prise_effet')->nullable();
			$table->bigInteger('compagnie_assurance_id')->unsigned()->nullable()->index('FK_contrat_compagnie_assurance');
			$table->bigInteger('courtier')->unsigned()->nullable()->index('FK_contrat_courtier');
			$table->float('valeur_assuree', 10, 0)->nullable();
			$table->float('montant_assuree', 10, 0)->nullable();
			$table->float('montant_prime', 10, 0)->nullable();
			$table->float('pourcentage_assiete', 10, 0)->nullable();
			$table->float('montant_franchise', 10, 0)->nullable();
			$table->boolean('defaut')->nullable()->default(0);
			$table->boolean('global')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('contrat_assurances');
	}

}
