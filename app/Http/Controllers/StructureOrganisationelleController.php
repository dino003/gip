<?php

namespace App\Http\Controllers;

use App\StructureOrganisationelle;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class StructureOrganisationelleController extends Controller
{
    protected $model;

    public function __construct(StructureOrganisationelle $structure){
        $this->model = new Repository($structure);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $strutures_organisationnels = StructureOrganisationelle::with(['plan_organisationnels'])
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
       

         $amende = new StructureOrganisationelle;
         $creation = $amende->create($request->only($amende->fillable));
  
         return response()->json(StructureOrganisationelle::with(['plan_organisationnels'])
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

        return response()->json(StructureOrganisationelle::with(['plan_organisationnels'])->find($id));
     
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
