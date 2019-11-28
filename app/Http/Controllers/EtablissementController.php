<?php

namespace App\Http\Controllers;

use App\Etablissement;
use Illuminate\Http\Request;
use App\Repositories\Repository;
class EtablissementController extends Controller
{
    protected $model;

    public function __construct(Etablissement $etablissement){
        $this->model = new Repository($etablissement);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Etablissement::first(), 200);
    //    $etabs = Etablissement::all();

    //    return response()->json($etabs->isEmpty());
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
    public function storeOuUpdate(Request $request)
    {
           $etabs = Etablissement::all();

            if($etabs->isEmpty()){
                return $this->model->create($request->only($this->model->getModel()->fillable));

            }else{
                $etablissement = Etablissement::first();
                $this->model->update($request->only($this->model->getModel()->fillable), $etablissement->id);

                return $this->model->show($etablissement->id);
            } 

     

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

       return $this->model->show($id);
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
