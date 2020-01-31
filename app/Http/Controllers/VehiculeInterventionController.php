<?php

namespace App\Http\Controllers;

use App\VehiculeIntervention;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class VehiculeInterventionController extends Controller
{
    protected $model;

    public function __construct(VehiculeIntervention $vehiculeIntervention){
        $this->model = new Repository($vehiculeIntervention);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $interventions_par_vehicules = VehiculeIntervention::with(['vehicule', 'tiers', 'nature_intervention'])
                                                            ->orderBy('id', 'desc')->get();

        return response()->json($interventions_par_vehicules);
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
       
        $intervention = new VehiculeIntervention;
        $creation = $intervention->create($request->only($intervention->fillable));
 
        return response()->json(VehiculeIntervention::with(['vehicule',
        'tiers', 'nature_intervention'])
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

          return response()->json(VehiculeIntervention::with(['vehicule', 'tiers', 'nature_intervention'])->find($id));
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
