<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NatureConsomation extends Model
{
    protected $table = 'parametrage_natures_consomation';

    protected $guarded = ['id'];

    public $timestamps = false;

    // vehicules consommations
    public function consommations()
    {
        return $this->hasMany(VehiculeConsomation::class, 'type_consomation', 'id');
    }
}
