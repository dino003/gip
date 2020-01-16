<?php

namespace App;

use Illuminate\Database\Eloquent\Model;



class Entite extends Model
{
    protected $table = 'parametrage_entites';

    protected $guarded = ['id'];

    public $timestamps = false;
    

   public function typeEntite()
   {
       return $this->belongsTo(TypeEntite::class, 'type_entite');
   }

   public function regroupement()
   {
       return $this->belongsTo(StructureRegroupement::class, 'regroupement');
   }

   public function personnels()
   {
       return $this->hasMany(Personnel::class, 'entite_affectation', 'id');
   }

   // vehicule affectation comptable
   public function vehicule_comptas()
   {
       return $this->hasMany(Vehicule::class, 'entite_comptable', 'id');
   }

     // vehicule affectation physique
     public function vehicule_physiques()
     {
         return $this->hasMany(Vehicule::class, 'entite_physique', 'id');
     }

        // budget
     public function budgets_entites()
     {
         return $this->hasMany(BudgetEntite::class, 'entite', 'id');
     }

         // commandes 
         public function commandes_entite_livraison()
         {
             return $this->hasMany(Commande::class, 'livraison_entite', 'id');
         }

            // commandes 
            public function commandes_entites_facturation()
            {
                return $this->hasMany(Commande::class, 'facturation_entite', 'id');
            }

            public function responsable_entite()
            {
                return $this->belongsTo('App\Personnel', 'responsable');
            }

   
}
