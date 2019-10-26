<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Vehicule extends Model
{
   // use UsesTenantConnection;

    protected $table = 'vehicules';

    protected $guarded = ['id'];

    public $timestamps = false;

    // entite comptable
    public function entite_comptable()
    {
        return $this->belongsTo(Entite::class, 'entite_comptable');
    }

    // entite physique
    public function entite_physique()
    {
        return $this->belongsTo(Entite::class, 'entite_physique');
    }

    // demandeur
    public function demandeur()
    {
        return $this->belongsTo(Personnel::class, 'demandeur');
    }

    // categorie
    public function categorie()
    {
        return $this->belongsTo(CategorieVehicule::class, 'categorie');
    }

    // marque
    public function marque()
    {
        return $this->belongsTo(Marque::class, 'marque');
    }

    // tiers
    public function tiers()
    {
        return $this->belongsTo(Tier::class, 'tiers');
    }

    // detenteur
    public function detenteur()
    {
        return $this->belongsTo(Personnel::class, 'detenteur');
    }

    // chauffeur_atitre
    public function chauffeur_atitre()
    {
        return $this->belongsTo(Personnel::class, 'chauffeur_atitre');
    }

    // utilisations
    public function utilisations()
    {
        return $this->hasMany(VehiculeUtilisation::class, 'vehicule', 'id');
    }
    
    // interventions
    public function interventions()
    {
        return $this->hasMany(VehiculeIntervention::class, 'vehicule', 'id');
    }
    
       // interventions
       public function consommations()
       {
           return $this->hasMany(VehiculeConsomation::class, 'vehicule', 'id');
       }

        // amendes
        public function amendes()
        {
            return $this->hasMany(VehiculeAmende::class, 'vehicule', 'id');
        }

         // contrat_assurances
         public function contrat_assurances()
         {
             return $this->hasMany(ContratAssurance::class, 'vehicule', 'id');
         }

  

}
