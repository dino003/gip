<?php

namespace App\Http\Controllers;

use App\AnneeBudgetaire;
use Illuminate\Http\Request;
use App\Repositories\Repository;


class AnneeBudgetaireController extends Controller
{
    protected $model;

    public function __construct(AnneeBudgetaire $anneeBudgetaire){
        $this->model = new Repository($anneeBudgetaire);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->model->all();
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
       
         return $this->model->create($request->only($this->model->getModel()->fillable));

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

    public function updateEncours(Request $request, $id)
    {
          // update model and only pass in the fillable fields
    //     $this->model->update($request->only($this->model->getModel()->fillable), $id);

    //    return $this->model->show($id);

       $annees = AnneeBudgetaire::get();
        
       foreach ($annees as $key => $value) {
            if($value->id !== $id){
                $value->encours = false;
            }else{
                $value->encours = true;

            }           
       }

    //    $this->model->update($request->only($this->model->getModel()->fillable), $id);

    //    // return response()->json(User::with(['autorisation'])->find($user->id) );
    //     return response()->json(Entite::with(['typeEntite', 'regroupement'])->find($id) );
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
