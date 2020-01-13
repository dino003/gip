<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NatureEnergie extends Model
{
    protected $table = 'parametrage_nature_energies';

    public $timestamps = false;

    protected $guarded = ['id'];

     // contenu de commande
     public function contenu_commandes()
     {
         return $this->hasMany(ContenuCommande::class, 'energie', 'id');
     }
}
