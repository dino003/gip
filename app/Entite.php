<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;



class Entite extends Model
{
    use UsesTenantConnection;
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

   
}
