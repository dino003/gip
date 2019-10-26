<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class NatureAmende extends Model
{
   // use UsesTenantConnection;
    protected $table = 'parametrage_natures_amendes';
    protected $guarded = ['id'];

    public $timestamps = false;

    public function vehicules_amendes()
    {
        return $this->hasMany(VehiculeAmende::class, 'nature_amende', 'id');
    }
}
