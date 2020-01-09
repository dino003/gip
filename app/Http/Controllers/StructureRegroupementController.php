<?php

namespace App\Http\Controllers;

use App\StructureRegroupement;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class StructureRegroupementController extends Controller
{
    protected $model;

    public function __construct(StructureRegroupement $structureRegroupement){
        $this->model = new Repository($structureRegroupement);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // return $this->model->all();
        $structures = StructureRegroupement::orderBy('id', 'desc')->with('children.children.children.children.children.children.children.children.children.children')->get();
        
        return response()->json($structures);
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
        $str = new StructureRegroupement;

         $creation = $str->create($request->only($this->model->getModel()->fillable));
         
        return response()->json( StructureRegroupement::with(['children.children.children.children.children.children.children.children.children.children'])->find($creation->id));

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
        $user =  $this->model->update($request->only($this->model->getModel()->fillable), $id);

        // return response()->json(User::with(['autorisation'])->find($user->id) );
         return response()->json(StructureRegroupement::with('children.children.children.children.children.children.children.children.children.children')->find($id) );
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
