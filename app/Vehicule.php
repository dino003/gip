<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{

    protected $table = 'vehicules';

    protected $guarded = ['id'];

    public $timestamps = false;

    // protected $with = ['entite_comptable', 'entite_physique',
    //  'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
    //   'chauffeur_atitre', 'contrat_assurance', 'energie'];

    // plan vehicule
    public function plan_vehicule() {
        return $this->belongsTo(PlanVehicule::class, 'plan_vehicule_id');
    }

    //plan Organisationnel
    public function affectation_organisationnel()
    {
        return $this->belongsTo(PlanOrganisationnel::class, 'affectation_organisationnel_id');
    }

        //plan Geographique
        public function affectation_geographique()
        {
            return $this->belongsTo(PlanGeographique::class, 'affectation_geographique_id');
        }

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
        return $this->hasMany(VehiculeUtilisation::class, 'vehicule_id', 'id');
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
        public function contrat_assurance()
        {
            return $this->belongsTo('App\ContratAssurance', 'contrat_assurance_id');
        }


         // reservations
         public function reservations()
         {
             return $this->hasMany(VehiculeReservation::class, 'vehicule', 'id');
         }

         // energie
         public function energie()
         {
             return $this->belongsTo('App\NatureEnergie', 'energie');
         }

           // budgets
           public function budgets()
           {
               return $this->hasMany('App\VehiculeBudgetDepenseRecette', 'vehicule');
           }



}
