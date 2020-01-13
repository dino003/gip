<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CoutConsomable extends Model
{
    protected $table = 'parametrage_cout_consomables';

    public $timestamps = false;

    protected $guarded = ['id'];

        // vehicules consommations
        public function consommations()
        {
            return $this->hasMany(VehiculeConsomation::class, 'consomable', 'id');
        }
    
}
