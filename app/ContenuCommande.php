<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ContenuCommande extends Model
{
    //use UsesTenantConnection;
    
    protected $table = 'commandes_contenu_commandes';

    public $timestamps = false;

    protected $guarded = ['id'];

    protected $with = ['marque', 'energie'];

    // commande

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande');
    }

    // marque
    public function marque()
    {
        return $this->belongsTo(Marque::class, 'marque');
    }

    public function energie()
    {
        return $this->belongsTo(NatureEnergie::class, 'energie');
    }
}
