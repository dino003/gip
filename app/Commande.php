<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Commande extends Model
{
    use UsesTenantConnection;
    
    protected $table = 'commandes';

    public $timestamps = false;

    protected $guarded = ['id'];

 
}
