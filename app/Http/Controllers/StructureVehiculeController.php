<?php

namespace App\Http\Controllers;

use App\StructureVehicule;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class StructureVehiculeController extends Controller
{
    protected $model;

    public function __construct(StructureVehicule $structure){
        $this->model = new Repository($structure);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $strutures_organisationnels = StructureVehicule::with(['plan_vehicules'])
        ->orderBy('id', 'asc')->get();
            return response()->json($strutures_organisationnels);
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


         $amende = new StructureVehicule;
         $creation = $amende->create($request->only($amende->fillable));

         return response()->json(StructureVehicule::with(['plan_vehicules'])
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
        $this->model->update($request->only($this->model->getModel()->fillable), $id);

        return response()->json(StructureVehicule::with(['plan_vehicules'])->find($id));

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
