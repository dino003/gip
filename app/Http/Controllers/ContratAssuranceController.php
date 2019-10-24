<?php

namespace App\Http\Controllers;

use App\ContratAssurance;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class ContratAssuranceController extends Controller
{
    protected $model;

    public function __construct(ContratAssurance $contrat_assurance){
        $this->model = new Repository($contrat_assurance);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contrat_assurances = ContratAssurance::with(['compagnie_assurance', 'courtier', 'vehicule.entite_physique'])
                                    ->get();

        return response()->json($contrat_assurances);    
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
       
        $contrat_assurance = new ContratAssurance;
        $creation = $contrat_assurance->create($request->only($contrat_assurance->fillable));
 
        return response()->json(ContratAssurance::with(['compagnie_assurance', 'courtier', 'vehicule.entite_physique'])
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

        return response()->json(ContratAssurance::with(['compagnie_assurance', 'courtier', 'vehicule.entite_physique'])->find($id));
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
