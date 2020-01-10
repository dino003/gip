<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Etablissement extends Model
{
    use UsesTenantConnection;

   protected $table = 'parametre_generaux_etablissements';

   public $timestamps = false;

   protected $guarded = ['id'];
}
