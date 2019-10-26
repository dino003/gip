<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Commande extends Model
{
   // use UsesTenantConnection;
    
    protected $table = 'commandes';

    public $timestamps = false;

    protected $guarded = ['id'];

    // contenu commandes
    public function contenu_commandes()
    {
        return $this->hasMany(ContenuCommande::class, 'commande', 'id');
    }

    //fournisseur 
    public function fournisseur()
    {
        return $this->belongsTo(Tier::class, 'fournisseur');
    }

    // entite de livraison
    public function livraison_entite()
    {
        return $this->belongsTo(Entite::class, 'livraison_entite');
    }

    // personne
    public function personne()
    {
        return $this->belongsTo(Personnel::class, 'personne');
    }

    // entite de facturation
    public function facturation_entite()
    {
        return $this->belongsTo(Entite::class, 'facturation_entite');
    }



 
}
