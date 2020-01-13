<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marque extends Model
{
    protected $table = 'marques';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function modeles()
    {
        return $this->hasMany(ModeleVehicule::class, 'marque');
    }

    // contenu de commande
    public function contenu_commandes()
    {
        return $this->hasMany(ContenuCommande::class, 'marque', 'id');
    }
}
