<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehiculeAmende extends Model
{

    protected $table = 'vehicule_amendes';

    protected $guarded = ['id'];

    public $timestamps = false;

  //  protected $with = ['plan_budgetaire'];



    // protected $casts = [
    //     'date' => 'date:d/m/Y',
    //     'date_reception' => 'date:d/m/Y',
    //     'date_reglement' => 'date:d/m/Y'

    // ];

       //  vehicule
       public function vehicule()
       {
           return $this->belongsTo(Vehicule::class, 'vehicule');
       }

       //lieu amendes
       public function lieu_amende()
       {
           return $this->belongsTo(PlanGeographique::class, 'lieu_id');
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

              // plan budgetaire
          public function plan_budgetaire()
          {
              return $this->belongsTo('App\PlanBudgetaire', 'plan_budgetaire_id');
          }

}
