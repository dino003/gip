<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NatureAmende extends Model
{
    protected $table = 'parametrage_natures_amendes';
    protected $guarded = ['id'];

    public $timestamps = false;

    public function vehicules_amendes()
    {
        return $this->hasMany(VehiculeAmende::class, 'nature_amende', 'id');
    }
}
