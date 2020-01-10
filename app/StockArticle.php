<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;


class StockArticle extends Model
{
    use UsesTenantConnection;

    protected $table = 'stock_articles';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function famille()
    {
        return $this->belongsTo('App\FamillePieceDetache', 'famille_id');
    }

    public function fournisseur()
    {
        return $this->belongsTo('App\Tier', 'fournisseur_id');
    }

    public function marque()
    {
        return $this->belongsTo('App\Marque', 'marque_id');
    }

    public function entrees_stock()
    {
        return $this->hasMany('App\StockEntree', 'article_id', 'id');
    }

    public function sorties_stock()
    {
        return $this->hasMany('App\StockSortie', 'article_id', 'id');
    }

}
