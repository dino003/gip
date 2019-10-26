<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class UserFonction extends Model
{
   // use UsesTenantConnection;

    protected $table = 'utilisateurs_fonctions';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }
}
