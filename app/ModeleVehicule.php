<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ModeleVehicule extends Model
{
    protected $table = 'parametrage_codifications_modele_vehicules';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function marque()
    {
        return $this->belongsTo(Marque::class, 'marque');
    }

    public function categorie()
    {
        return $this->belongsTo(CategorieVehicule::class, 'categorie');
    }

    public function fournisseur()
    {
        return $this->belongsTo(Tier::class, 'fournisseur');
    }

    
}
