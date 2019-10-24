<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VehiculeDepenseRecette;
use App\Repositories\Repository;

class VehiculeDepenseRecetteController extends Controller
{
    protected $model;

    public function __construct(VehiculeDepenseRecette $vehiculeDepenseRecette){
        $this->model = new Repository($vehiculeDepenseRecette);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $depensesRecettes = VehiculeDepenseRecette::with(['vehicule.entite_physique', 'nature', 'tiers'])
                                                ->get();

        return response()->json($depensesRecettes);    
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
       
        $depenseRecette = new VehiculeDepenseRecette;
        $creation = $depenseRecette->create($request->only($depenseRecette->fillable));
 
        return response()->json(VehiculeDepenseRecette::with(['vehicule.entite_physique', 'nature', 'tiers'])
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

         return response()->json(VehiculeDepenseRecette::with(['vehicule.entite_physique', 'nature', 'tiers'])->find($id));
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
