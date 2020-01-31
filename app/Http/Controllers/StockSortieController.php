<?php

namespace App\Http\Controllers;

use App\StockSortie;
use App\StockArticle;

use Illuminate\Http\Request;
use App\Repositories\Repository;

class StockSortieController extends Controller
{
    protected $model;

    public function __construct(StockSortie $sortie){
        $this->model = new Repository($sortie);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sorties = StockSortie::with(['article', 'vehicule'])->orderBy('id', 'desc')->get();

        return response()->json($sorties);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         
        $sortie = new StockSortie;
        $creation = $sortie->create($request->only($sortie->fillable));
        
        $article = StockArticle::find($creation->article_id);
        $article->quantite_phisique_stock -= $creation->quantite_sortie;
        $article->quantite_disponible_stock -= $creation->quantite_sortie;
        $article->save();

        $articleF = StockArticle::find($article->id);
        $articleF->valorisation_hors_taxe = floatval($creation->prix_article) * floatval($articleF->quantite_disponible_stock);
        $articleF->save();

        $articleFa = StockArticle::find($articleF->id);
        $valeurTva = (floatval($articleFa->valorisation_hors_taxe) * floatval($articleFa->tva) ) / 100;
        $articleFa->valorisation_ttc = floatval($articleFa->valorisation_hors_taxe) + $valeurTva;
        $articleFa->save();
        
        $articleFinal = StockArticle::with(['famille', 'fournisseur', 'marque'])->find($articleFa->id);
        $sortieFinal = StockSortie::with(['article', 'vehicule'])->find($creation->id);

        return response()->json([
            'article' => $articleFinal,
            'sortie' => $sortieFinal
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->model->show($id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function edit(CoutConsomable $coutConsomable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $sortie1 = StockSortie::find($id);
        $article1 = StockArticle::find($sortie1->article_id);
        $article1->quantite_phisique_stock += $sortie1->quantite_sortie;
        $article1->quantite_disponible_stock += $sortie1->quantite_sortie;
        $article1->save();

         // update model and only pass in the fillable fields
            $this->model->update($request->only($this->model->getModel()->fillable), $id);

            $sortieModifiee = StockSortie::with(['article', 'vehicule'])->find($id);
   
            $article = StockArticle::find($sortieModifiee->article_id);
            $article->quantite_phisique_stock -= $sortieModifiee->quantite_sortie;
            $article->quantite_disponible_stock -= $sortieModifiee->quantite_sortie;
            $article->save();

            $articleF = StockArticle::find($article->id);
            $articleF->valorisation_hors_taxe = floatval($sortieModifiee->prix_article) * floatval($articleF->quantite_disponible_stock);
            $articleF->save();
    
            $articleFa = StockArticle::find($articleF->id);
            $valeurTva = (floatval($articleFa->valorisation_hors_taxe) * floatval($articleFa->tva) ) / 100;
            $articleFa->valorisation_ttc = floatval($articleFa->valorisation_hors_taxe) + $valeurTva;
            $articleFa->save();
            
            $articleFinal = StockArticle::with(['famille', 'fournisseur', 'marque'])->find($articleFa->id);
    
            return response()->json([
                'article' => $articleFinal,
                'sortie' => $sortieModifiee
            ], 200);
         
        

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        return $this->model->delete($id);

    }
}
