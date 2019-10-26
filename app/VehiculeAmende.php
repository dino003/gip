<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class VehiculeAmende extends Model
{
   // use UsesTenantConnection;

    protected $table = 'vehicule_amendes';

    protected $guarded = ['id'];

    public $timestamps = false;


    protected $casts = [
        'date' => 'date:d/m/Y',
        'date_reception' => 'date:d/m/Y',
        'date_reglement' => 'date:d/m/Y'

    ];

       //  vehicule
       public function vehicule()
       {
           return $this->belongsTo(Vehicule::class, 'vehicule');
       }

          //  organisme
          public function organisme()
          {
              return $this->belongsTo(Tier::class, 'organisme');
          }

          // nature_amende
          public function nature_amende()
          {
              return $this->belongsTo(NatureAmende::class, 'nature_amende');
          }  

           // conducteur
           public function conducteur()
           {
               return $this->belongsTo(Personnel::class, 'conducteur');
           }  

}
