<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ContratAssurance extends Model
{
   // use UsesTenantConnection;
    
    protected $table = 'contrat_assurances';

    public $timestamps = false;

    protected $guarded = ['id'];

 

    // protected $casts = [
    //     'date_contrat' => 'date:d-m-Y',
    //     'periode_date_debut' => 'date:d/m/Y',
    //     'periode_date_fin' => 'date:d/m/Y',
    //     'date_prise_effet' => 'date:d/m/Y'
    // ];

   //compagnie_assurance
   public function compagnie_assurance()
   {
       return $this->belongsTo(Tier::class, 'compagnie_assurance_id');
   }

   //courtier
   public function courtier()
   {
       return $this->belongsTo(Tier::class, 'courtier');
   }

   //vehicule
   public function vehicules()
   {
       return $this->hasMany('App\Vehicule', 'contrat_assurance_id', 'id');
   }
}
