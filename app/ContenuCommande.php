<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ContenuCommande extends Model
{
    use UsesTenantConnection;
    
    protected $table = 'commandes_contenu_commandes';

    public $timestamps = false;

    protected $guarded = ['id'];
}
