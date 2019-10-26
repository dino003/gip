<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class CoutConsomable extends Model
{
   // use UsesTenantConnection;
    protected $table = 'parametrage_cout_consomables';

    public $timestamps = false;

    protected $guarded = ['id'];

        // vehicules consommations
        public function consommations()
        {
            return $this->hasMany(VehiculeConsomation::class, 'consomable', 'id');
        }
    
}
