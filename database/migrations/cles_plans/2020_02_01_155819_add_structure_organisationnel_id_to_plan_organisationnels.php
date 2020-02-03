<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStructureOrganisationnelIdToPlanOrganisationnels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plan_organisationnels', function (Blueprint $table) {
            $table->unsignedBigInteger('structure_organisationnel_id');

            $table->foreign('structure_organisationnel_id')->references('id')->on('structure_organisationelles')->nullable();
        
            $table->unsignedBigInteger('parent');

            $table->foreign('parent')->references('id')->on('plan_organisationnels')->nullable();
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_organisationnels', function (Blueprint $table) {
            //
        });
    }
}
