<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class VehiculeIntervention extends Model
{
    use UsesTenantConnection;

    protected $table = 'vehicule_interventions';

    protected $guarded = ['id'];

    public $timestamps = false;

  //  protected $dates = ['date_emission', 'date_fin_prevue', 'date_fin_prevue', 'date', 'date_debut', 'date_fin_reele', 'date_reglement'];

  protected $casts = [
      'date_emission' => 'date:d/m/Y',
      'date_fin_prevue' => 'date:d/m/Y',
      'date_fin_prevue' => 'date:d/m/Y',
      'date' => 'date:d/m/Y',
      'date_debut' => 'date:d/m/Y',
      'date_fin_reele' => 'date:d/m/Y',
      'date_reglement' => 'date:d/m/Y',

  ];

  // protected $dateFormat = 'd/m/Y';

       //  vehicule
       public function vehicule()
       {
           return $this->belongsTo(Vehicule::class, 'vehicule');
       }

       // tiers 
       public function tiers()
       {
           return $this->belongsTo(Tier::class, 'tiers');
       }

          // nature interventions 
          public function nature_intervention()
          {
              return $this->belongsTo(NatureIntervention::class, 'nature_intervention');
          }


}
