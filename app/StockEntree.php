<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockEntree extends Model
{

   
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
