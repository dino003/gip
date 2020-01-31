<?php

namespace App\Http\Controllers;

use App\StockEntree;
use App\StockArticle;

use Illuminate\Http\Request;
use App\Repositories\Repository;

class StockEntreeController extends Controller
{
    protected $model;

    public function __construct(StockEntree $entree){
        $this->model = new Repository($entree);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $entrees = StockEntree::with(['article', 'fournisseur'])->orderBy('id', 'desc')->get();

        return response()->json($entrees);
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
         
        $entree = new StockEntree;
        $creation = $entree->create($request->only($entree->fillable));
        
        $article = StockArticle::find($creation->article_id);
        $article->quantite_phisique_stock += $creation->quantite_entree;
        $article->quantite_disponible_stock += $creation->quantite_entree;
        $article->save();

        $articleF = StockArticle::find($article->id);
        $articleF->valorisation_hors_taxe = floatval($creation->prix_article) * floatval($articleF->quantite_disponible_stock);
        $articleF->save();

        $articleFa = StockArticle::find($articleF->id);
        $valeurTva = (floatval($articleFa->valorisation_hors_taxe) * floatval($articleFa->tva) ) / 100;
        $articleFa->valorisation_ttc = floatval($articleFa->valorisation_hors_taxe) + $valeurTva;
        $articleFa->save();

        $articleFinal = StockArticle::with(['famille', 'fournisseur', 'marque'])->find($articleFa->id);
        $entreeFinal = StockEntree::with(['article', 'fournisseur'])->find($creation->id);

        return response()->json([
            'article' => $articleFinal,
            'entree' => $entreeFinal
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
        $entre1 = StockEntree::find($id);
        $article1 = StockArticle::find($entre1->article_id);
        $article1->quantite_phisique_stock -= $entre1->quantite_entree;
        $article1->quantite_disponible_stock -= $entre1->quantite_entree;
        $article1->save();

         // update model and only pass in the fillable fields
         $this->model->update($request->only($this->model->getModel()->fillable), $id);

         $entreeModifiee = StockEntree::with(['article', 'fournisseur'])->find($id);

         $article = StockArticle::find($entreeModifiee->article_id);
         $article->quantite_phisique_stock += $entreeModifiee->quantite_entree;
         $article->quantite_disponible_stock += $entreeModifiee->quantite_entree;
         $article->save();

         $articleF = StockArticle::find($article->id);
         $articleF->valorisation_hors_taxe = floatval($entreeModifiee->prix_article) * floatval($articleF->quantite_disponible_stock);
         $articleF->save();
 
         $articleFa = StockArticle::find($articleF->id);
         $valeurTva = (floatval($articleFa->valorisation_hors_taxe) * floatval($articleFa->tva) ) / 100;
         $articleFa->valorisation_ttc = floatval($articleFa->valorisation_hors_taxe) + $valeurTva;
         $articleFa->save();
         
         $articleFinal = StockArticle::with(['famille', 'fournisseur', 'marque'])->find($articleFa->id);
 
         return response()->json([
             'article' => $articleFinal,
             'entree' => $entreeModifiee
         ]);

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
