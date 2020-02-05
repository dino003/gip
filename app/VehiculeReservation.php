<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehiculeReservation extends Model
{

    protected $table = 'vehicule_reservations';

    protected $guarded = ['id'];

    public $timestamps = false;

  //  protected $dates = ['date_emission', 'date_fin_prevue', 'date_fin_prevue', 'date', 'date_debut', 'date_fin_reele', 'date_reglement'];

//   protected $casts = [
//       'date_emission' => 'date:d/m/Y',
//       'date_fin_prevue' => 'date:d/m/Y',
//       'date_fin_prevue' => 'date:d/m/Y',
//       'date' => 'date:d/m/Y',
//       'date_debut' => 'date:d/m/Y',
//       'date_fin_reele' => 'date:d/m/Y',
//       'date_reglement' => 'date:d/m/Y',

//   ];

  // protected $dateFormat = 'd/m/Y';

       //  vehicule
       public function vehicule()
       {
           return $this->belongsTo(Vehicule::class, 'vehicule');
       }

       // tiers 
       public function personne_reservant()
       {
           return $this->belongsTo(Personnel::class, 'personne_reservant');
       }

          // nature interventions 
          public function objet_reservation()
          {
              return $this->belongsTo(NatureReservationUtilisation::class, 'objet_reservation');
          }


    // lieu de depart
    public function depart_reservation()
    {
        return $this->belongsTo(PlanGeographique::class, 'lieu_depart_id');
    }

      // lieu de destination
      public function destination_reservation()
      {
          return $this->belongsTo(PlanGeographique::class, 'destination_id');
      }
}
