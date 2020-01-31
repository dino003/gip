<?php

namespace App\Http\Controllers;

use App\VehiculeConsomation;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class VehiculeConsomationController extends Controller
{
    protected $model;

    public function __construct(VehiculeConsomation $vehiculeConsomation){
        $this->model = new Repository($vehiculeConsomation);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $consommations = VehiculeConsomation::with(['vehicule',
        'type_consomation', 'tiers', 'conducteur', 'consomable'])->orderBy('id', 'desc')->get();

        return response()->json($consommations);
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
       
         $consommation = new VehiculeConsomation;
         $creation = $consommation->create($request->only($consommation->fillable));
  
         return response()->json(VehiculeConsomation::with(['vehicule',
         'type_consomation', 'tiers', 'conducteur', 'consomable'])
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

        return response()->json(VehiculeConsomation::with(['vehicule',
        'type_consomation', 'tiers', 'conducteur', 'consomable'])->find($id));
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
