<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Marque extends Model
{
    use UsesTenantConnection;
    protected $table = 'marques';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function modeles()
    {
        return $this->hasMany(ModeleVehicule::class, 'marque');
    }
}
