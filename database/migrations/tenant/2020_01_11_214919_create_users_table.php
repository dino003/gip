<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->bigInteger('id', true)->unsigned();
			$table->string('name');
			$table->string('email')->nullable()->unique();
			$table->date('date_limite_mot_de_passe')->nullable();
			$table->date('date_creation')->nullable();
			$table->date('date_modification')->nullable();
			$table->bigInteger('entite')->unsigned()->nullable()->index('FK_user_entite');
			$table->bigInteger('matricule')->unsigned()->nullable();
			$table->boolean('isAdmin')->default(0);

			$table->bigInteger('telephonne_bureau')->unsigned()->nullable();
			$table->bigInteger('portable')->unsigned()->nullable();
			$table->dateTime('email_verified_at')->nullable();
			$table->timestamp('periode_essai')->nullable();
			$table->timestamp('fin_abonnement')->nullable();

			$table->string('password');
			$table->string('remember_token', 100)->nullable();
			$table->string('username', 100)->nullable()->unique('username');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
