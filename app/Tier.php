<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Tier extends Model
{
    use UsesTenantConnection;

    protected $table = 'tiers';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function modeles()
    {
        return $this->hasMany(ModeleVehicule::class, 'fournisseur');
    }

    // interventions vehicules
    public function interventions()
    {
        return $this->hasMany(VehiculeIntervention::class, 'tiers', 'id');
    }

       // vehicules consommations
       public function consommations()
       {
           return $this->hasMany(VehiculeConsomation::class, 'tiers', 'id');
       }

       // vehicules amendes
       public function amendes()
       {
           return $this->hasMany(VehiculeAmende::class, 'organisme', 'id');
       }

       // contrat assurances
       public function contrat_assurances()
       {
           return $this->hasMany(ContratAssurance::class, 'compagnie_assurance_id', 'id');
       }

         // contrat courtiers
         public function contrat_courtiers()
         {
             return $this->hasMany(ContratAssurance::class, 'courtier', 'id');
         }

         // commandes 
         public function commandes()
         {
             return $this->hasMany(Commande::class, 'fournisseur', 'id');
         }
}
