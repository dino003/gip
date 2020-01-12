<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Theme;
use App\Repositories\Repository;

class ThemeController extends Controller
{
    protected $model;

    public function __construct(Theme $param){
        $this->model = new Repository($param);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Theme::first(), 200);
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
           $paramReser = Theme::all();

            if($paramReser->isEmpty()){
                return $this->model->create($request->only($this->model->getModel()->fillable));

            }else{
                $value = Theme::first();
                $this->model->update($request->only($this->model->getModel()->fillable), $value->id);

                return $this->model->show($value->id);
            } 

     

    }
}
