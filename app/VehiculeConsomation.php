<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehiculeConsomation extends Model
{

    protected $table = 'vehicule_consomations';

    protected $guarded = ['id'];

    public $timestamps = false;



    // protected $casts = [
    //     'date_conso' => 'date:d/m/Y',
    //     'date_chargement_integration' => 'date:d/m/Y',
    // ];

     //  vehicule
     public function vehicule()
     {
         return $this->belongsTo(Vehicule::class, 'vehicule');
     }

    // type de consomation
    public function type_consomation()
    {
        return $this->belongsTo(NatureConsomation::class, 'type_consomation');
    }

    // tiers 
    public function tiers()
    {
        return $this->belongsTo(Tier::class, 'tiers');
    }

    // conducteur
    public function conducteur()
    {
        return $this->belongsTo(Personnel::class, 'conducteur');
    }

    // consomable 
    public function consomable()
    {
        return $this->belongsTo(CoutConsomable::class, 'consomable');
    }
    
}
