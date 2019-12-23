<?php

namespace App\Http\Controllers;

use App\TauxTva;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class TauxTvaController extends Controller
{
    protected $model;

    public function __construct(TauxTva $tauxTva){
        $this->model = new Repository($tauxTva);
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
        $isEmptyTableTva = TauxTva::count() == 0;

       // $creation = $tva->create($request->only($tva->fillable));
        if($isEmptyTableTva ){
            $tva = new TauxTva;

            $tva->libelle = $request->get('libelle');
            $tva->taux = $request->get('taux');
            $tva->defaut = 1;
     
            $tva->save();
            return response()->json($tva);

        }else{
           // return $this->model->create($request->only($this->model->getModel()->fillable));

           $tva = new TauxTva;

           $tva->libelle = $request->get('libelle');
           $tva->taux = $request->get('taux');
           $tva->defaut = 0;

           $tva->save();
           return response()->json($tva);
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

    public function marquerTvaDefaut($tva_id){
        $tvas = TauxTva::get();

        foreach ($tvas as $key => $value) {
            if($value->defaut){
                $value->defaut = !$value->defaut;
             $value->save();
            }   
        }

        $tva = TauxTva::find($tva_id);
        $tva->defaut = !$tva->defaut;
        $tva->save();

       // return $this->model->show($tva->id);
        return $this->model->all();

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
