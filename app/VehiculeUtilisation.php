<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehiculeUtilisation extends Model
{

    protected $table = 'vehicule_utilisations';

    protected $guarded = ['id'];

    public $timestamps = false;


    //  protected $casts = [
    //     'date_debut_utilisation' => 'date:d/m/Y',
    //     'date_fin_utilisation' => 'date:d/m/Y',
    // ];

    //  vehicule

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class, 'vehicule');
    }

    // utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(Personnel::class, 'utilisateur');
    }

    // entite utilisateur
    public function entite_utilisateur()
    {
        return $this->belongsTo(Entite::class, 'entite_utilisateur');
    }

    // nature utilisation

    public function nature_utilisation()
    {
        return $this->belongsTo(NatureReservationUtilisation::class, 'nature_utilisation', 'id');
    }

    // chauffeur 
    public function chauffeur()
    {
        return $this->belongsTo(Personnel::class, 'chauffeur');
    }
}





