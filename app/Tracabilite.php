<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Tracabilite extends Model
{
    use UsesTenantConnection;

    protected $table = 'tracabilites';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function vehicule()
    {
        return $this->belongsTo('App\Vehicule', 'vehicule_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    
}
