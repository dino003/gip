<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockSortie extends Model
{

        
      protected $table = 'stock_sorties';

      protected $guarded = ['id'];

      public $timestamps = false;

      public function vehicule()
      {
          return $this->belongsTo('App\Vehicule', 'vehicule_id');
      }

      public function article()
      {
          return $this->belongsTo('App\StockArticle', 'article_id');
      }


}
