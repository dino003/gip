<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class NatureReservationUtilisation extends Model
{
    use UsesTenantConnection;

    protected $table = 'parametrage_nature_reservations_utilisations';

    protected $guarded = ['id'];

    public $timestamps = false;

    // utilisation vehicule nature rreservation et utilisation

    public function nature_utilisations()
    {
        return $this->hasMany(VehiculeUtilisation::class, 'nature_utilisation', 'id');
    }


    // reservations vehicule
     public function reservations()
     {
         return $this->hasMany(VehiculeReservation::class, 'objet_reservation', 'id');
     }
}
