<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class NatureConsomation extends Model
{
   // use UsesTenantConnection;
    protected $table = 'parametrage_natures_consomation';

    protected $guarded = ['id'];

    public $timestamps = false;

    // vehicules consommations
    public function consommations()
    {
        return $this->hasMany(VehiculeConsomation::class, 'type_consomation', 'id');
    }
}
