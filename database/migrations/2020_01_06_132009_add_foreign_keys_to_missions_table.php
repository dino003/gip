<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('missions', function(Blueprint $table)
		{
			$table->foreign('beneficiaire1_id', 'FK_beneficiaire1')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire2_id', 'FK_beneficiaire2')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire3_id', 'FK_beneficiaire3')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire4_id', 'FK_beneficiaire4')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire5_id', 'FK_beneficiaire5')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire6_id', 'FK_beneficiaire6')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire7_id', 'FK_beneficiaire7')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire8_id', 'FK_beneficiaire8')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('beneficiaire_principal_id', 'FK_beneficiaire_principale')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('decideur_id', 'FK_decideur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('demandeur_id', 'FK_demandeur_mission')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('nature_mission_id', 'FK_nature_mission')->references('id')->on('parametrage_nature_reservations_utilisations')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('signataire_id', 'FK_signataire')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('tiers_prenant_en_charge_id', 'FK_tier_prise_en_charge')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('vehicule_id', 'FK_vehicule_mission')->references('id')->on('vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('missions', function(Blueprint $table)
		{
			$table->dropForeign('FK_beneficiaire1');
			$table->dropForeign('FK_beneficiaire2');
			$table->dropForeign('FK_beneficiaire3');
			$table->dropForeign('FK_beneficiaire4');
			$table->dropForeign('FK_beneficiaire5');
			$table->dropForeign('FK_beneficiaire6');
			$table->dropForeign('FK_beneficiaire7');
			$table->dropForeign('FK_beneficiaire8');
			$table->dropForeign('FK_beneficiaire_principale');
			$table->dropForeign('FK_decideur');
			$table->dropForeign('FK_demandeur_mission');
			$table->dropForeign('FK_nature_mission');
			$table->dropForeign('FK_signataire');
			$table->dropForeign('FK_tier_prise_en_charge');
			$table->dropForeign('FK_vehicule_mission');
		});
	}

}
