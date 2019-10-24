<?php

namespace App\Http\Controllers;

use App\Marque;
use Illuminate\Http\Request;
use App\Repositories\Repository;


class MarqueController extends Controller
{

    protected $model;

    public function __construct(Marque $marque){
        $this->model = new Repository($marque);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $marques = $this->model->all();
        // return response()->json($marques);

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
     * @param  \App\Marque  $marque
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
    {
        return $this->model->show($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Marque  $marque
     * @return \Illuminate\Http\Response
     */
    public function edit(Marque $marque)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Marque  $marque
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->model->update($request->only($this->model->getModel()->fillable), $id);

        return $this->model->show($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Marque  $marque
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->model->delete($id);

    }
}
