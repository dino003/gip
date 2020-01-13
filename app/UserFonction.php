<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserFonction extends Model
{

    protected $table = 'utilisateurs_fonctions';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user');
    }
}
