<?php

namespace App\Http\Controllers;

use App\VehiculeBudgetDepenseRecette;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class VehiculeBudgetDepenseRecetteController extends Controller
{
    protected $model;

    public function __construct(VehiculeBudgetDepenseRecette $vehiculeBudgetDepenseRecette){
        $this->model = new Repository($vehiculeBudgetDepenseRecette);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $budgetVehicules = VehiculeBudgetDepenseRecette::with(['vehicule', 'nature_ligne_budget'])
        ->orderBy('id', 'desc')->get();
        return response()->json($budgetVehicules);    
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
       
        $budgetVehicule = new VehiculeBudgetDepenseRecette;
        $creation = $budgetVehicule->create($request->only($budgetVehicule->fillable));
 
        return response()->json(VehiculeBudgetDepenseRecette::with(['vehicule', 'nature_ligne_budget'])
        ->find($creation->id));
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
         // update model and only pass in the fillable fields
         $this->model->update($request->only($this->model->getModel()->fillable), $id);

         return response()->json(VehiculeBudgetDepenseRecette::with(['vehicule', 'nature_ligne_budget'])->find($id));
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
