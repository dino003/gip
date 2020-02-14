<?php

namespace App\Http\Controllers;

use App\StructureBudgetaire;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class StructureBudgetaireController extends Controller
{
    protected $model;

    public function __construct(StructureBudgetaire $structure){
        $this->model = new Repository($structure);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $structure_budgetaires = StructureBudgetaire::with(['plan_budgetaires'])
        ->orderBy('id', 'asc')->get();
            return response()->json($structure_budgetaires);
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


         $amende = new StructureBudgetaire;
         $creation = $amende->create($request->only($amende->fillable));

         return response()->json(StructureBudgetaire::with(['plan_budgetaires'])
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

        return response()->json(StructureBudgetaire::with(['plan_budgetaires'])->find($id));

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
