<?php

namespace App\Http\Controllers;

use App\PlanBudgetaire;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class PlanBudgetaireController extends Controller
{
    protected $model;

    public function __construct(PlanBudgetaire $plan){
        $this->model = new Repository($plan);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // return $this->model->all();
        $plan_budgetaires = PlanBudgetaire::orderBy('id', 'asc')->with(['children.children.children.children.children.children.children.children.children.children', 'interventions', 'amendes', 'consommations', 'structure_budgetaire', 'budget'])->get();

        return response()->json($plan_budgetaires);
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
        $str = new PlanBudgetaire;

         $creation = $str->create($request->only($this->model->getModel()->fillable));

        return response()->json( PlanBudgetaire::with(['children.children.children.children.children.children.children.children.children.children', 'interventions', 'amendes', 'consommations', 'structure_budgetaire', 'budget'])->find($creation->id));

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
        $edit =  $this->model->update($request->only($this->model->getModel()->fillable), $id);

        // return response()->json(User::with(['autorisation'])->find($user->id) );
         return response()->json(PlanBudgetaire::with(['children.children.children.children.children.children.children.children.children.children', 'interventions', 'amendes', 'consommations', 'structure_budgetaire', 'budget'])->find($id) );
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
