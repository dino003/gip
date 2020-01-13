<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypeEntite extends Model
{

    protected $table = 'parametrage_codification_types_entites';

    public $timestamps = false;

    protected $guarded = ['id'];

   public function entites()
   {
       return $this->hasMany(Entite::class, 'type_entite', 'id');
   }
}
