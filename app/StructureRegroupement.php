<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StructureRegroupement extends Model
{

    protected $table = 'parametrage_structure_regroupements';

    protected $guarded = ['id'];

    public $timestamps = false;
    

    public function entites()
    {
        return $this->hasMany(Entite::class, 'regroupement', 'id');
    }

    public function children()
    {
        return $this->hasMany('App\StructureRegroupement', 'regroupement_appartenance', 'id');
    }

    
}
