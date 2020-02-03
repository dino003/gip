<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStructureGeographiqueIdToPlanGeographiques extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plan_geographiques', function (Blueprint $table) {
            $table->unsignedBigInteger('structure_geographique_id');

            $table->foreign('structure_geographique_id')->references('id')->on('structure_geographiques')->nullable();
            
            $table->unsignedBigInteger('parent');

            $table->foreign('parent')->references('id')->on('plan_geographiques')->nullable();
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_geographiques', function (Blueprint $table) {
            //
        });
    }
}
