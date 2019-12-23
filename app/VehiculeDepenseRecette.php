<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class VehiculeDepenseRecette extends Model
{
   // use UsesTenantConnection;

    protected $table = 'vehicule_depenses_recettes';

    protected $guarded = ['id'];

    public $timestamps = false;

 

    // protected $casts = [
    //     'date' => 'date:d/m/Y',
    //     'date_piece' => 'date:d/m/Y',
    // ];


       //  vehicule
       public function vehicule()
       {
           return $this->belongsTo(Vehicule::class, 'vehicule');
       }

         // nature
     public function nature()
     {
         return $this->belongsTo(DepenseRecette::class, 'nature');
     }

     
         // tiers
         public function tiers()
         {
             return $this->belongsTo(Tier::class, 'tiers');
         }


}
