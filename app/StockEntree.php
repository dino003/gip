<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class StockEntree extends Model
{
    use UsesTenantConnection;

   
   protected $table = 'stocks_entrees';

   protected $guarded = ['id'];

   public $timestamps = false;

   public function fournisseur()
   {
       return $this->belongsTo('App\Tier', 'fournisseur_id');
   }

   public function article()
   {
       return $this->belongsTo('App\StockArticle', 'article_id');
   }

}
