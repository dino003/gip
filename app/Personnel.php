<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{

    protected $table = 'personnels';

    protected $guarded = ['id'];

    public $timestamps = false;
    
    public function entite_affectation()
    {
        return $this->belongsTo(Entite::class, 'entite_affectation');
    }

    //  demandeur vehicule
    public function vehicule_demandeurs()
    {
        return $this->hasMany(Vehicule::class, 'demandeur', 'id');
    }

    // vehicule detanteur
    public function vehicule_detenteurs()
    {
        return $this->hasMany(Vehicule::class, 'detenteur', 'id');
    }

    // chauffeur aattitré 
    public function vehicule_chauffeur_attitres()
    {
        return $this->hasMany(Vehicule::class, 'chauffeur_atitre', 'id');
    }

    // chauffeur pour utilisation
    public function chauffeur_utilisations()
    {
        return $this->hasMany(VehiculeUtilisation::class, 'chauffeur_id', 'id');
    }

      // utilisation vehicule
      public function utilisation_vehicules()
      {
          return $this->hasMany(VehiculeUtilisation::class, 'utilisateur', 'id');
      }

        // vehicules consommations
        public function consommations()
        {
            return $this->hasMany(VehiculeConsomation::class, 'conducteur', 'id');
        }

      // vehicules amendes
      public function vehicules_amendes()
      {
          return $this->hasMany(VehiculeAmende::class, 'conducteur', 'id');
      } 
      
        // commandes 
        public function commandes()
        {
            return $this->hasMany(Commande::class, 'personne', 'id');
        }

        // reservations vehicule
     public function reservations()
     {
         return $this->hasMany(VehiculeReservation::class, 'personne_reservant', 'id');
     }
    
    
}
