<?php

namespace App\Http\Controllers;

use App\StructureGeographique;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class StructureGeographiqueController extends Controller
{
    protected $model;

    public function __construct(StructureGeographique $structure){
        $this->model = new Repository($structure);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $structure_geographiques = StructureGeographique::with(['plan_geographiques'])
        ->orderBy('id', 'asc')->get();
            return response()->json($structure_geographiques);    
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
       

         $amende = new StructureGeographique;
         $creation = $amende->create($request->only($amende->fillable));
  
         return response()->json(StructureGeographique::with(['plan_geographiques'])
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

        return response()->json(StructureGeographique::with(['plan_geographiques'])->find($id));
     
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
