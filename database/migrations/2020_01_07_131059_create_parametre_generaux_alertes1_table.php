<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParametreGenerauxAlertes1Table extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('parametre_generaux_alertes1', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->smallInteger('jour_prevu_entretien_vehicule')->unsigned()->nullable();
			$table->boolean('date_entretien_vehicule_depasse')->default(0);
			$table->boolean('stock_minimun_article_depasse')->default(0);
			$table->boolean('stock_null_article')->default(0);
			$table->boolean('entretien_planifie_kilometrage_prevu_depasse')->default(0);
			$table->boolean('entretien_planifie_date_prevu_depasse')->default(0);
			$table->integer('entretien_planifie_prevu_x_kilometre')->unsigned()->nullable();
			$table->smallInteger('entretirn_planifie_prevu_x_jour')->unsigned()->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('parametre_generaux_alertes1');
	}

}
