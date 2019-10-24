<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\UserFonction;
use App\Repositories\Repository;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{
     protected $model;

    public function __construct(User $user){
        $this->model = new Repository($user);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // return $this->model->all();
      // return $this->model->with(['autorisation'] )->get();

      $user = new User;

      dd($user);

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
     // $newUser =  $this->model->create($request->only($this->model->getModel()->fillable));
     $user = User::where('username', '=', $request->get('username'))
                    ->orWhere('email', '=', $request->get('email'))
                    ->first();
        if ($user === null) {
        // user doesn't exist
            $newUser = new User;
            $newUser->name = $request->get('name');
            $newUser->email = $request->get('email');
            $newUser->date_creation = $request->get('date_creation');
            $newUser->date_modification = $request->get('date_modification');
            $newUser->entite = $request->get('entite');
            $newUser->matricule = $request->get('matricule');
            $newUser->telephonne_bureau = $request->get('telephonne_bureau');
            $newUser->portable = $request->get('portable');
            $newUser->username = $request->get('username');
           // $newUser->password =  Hash::make($request->get('password'));
            $newUser->password =  $request->get('password');

            $newUser->save();
    
    
    
            $userFonction = new UserFonction;
            $userFonction->creation_vehicule = $request->get('creation_vehicule');
            $userFonction->modification_vehicule = $request->get('modification_vehicule');
            $userFonction->suppresion_vehicule = $request->get('suppresion_vehicule');
            $userFonction->commande_vehicule = $request->get('commande_vehicule');
            $userFonction->utilisation_vehicule = $request->get('utilisation_vehicule');
            $userFonction->reservations = $request->get('reservations');
            $userFonction->intervention = $request->get('intervention');
            $userFonction->contrat_assurance = $request->get('contrat_assurance');
            $userFonction->ordre_de_mission = $request->get('ordre_de_mission');
            $userFonction->consomation_vehicule = $request->get('consomation_vehicule');
            $userFonction->cout_vehicule = $request->get('cout_vehicule');
            $userFonction->gestion_stock_piece = $request->get('gestion_stock_piece');
            $userFonction->amende_vehicule = $request->get('amende_vehicule');
            $userFonction->module_des_commandes = $request->get('module_des_commandes');
            $userFonction->user = $newUser->id;
    
            $userFonction->save();
    
            return response()->json($newUser);

        }

        return response()->json('Ces identifiants existent déja');
   


         //return $this->model->create($request->only($this->model->getModel()->fillable));

    }

    public function verifUser(Request $request){
        $user = User::where('username', '=', $request->get('username'))
       // orWhere('email', '=', $request->get('email'))
        ->first();

        if($user === null){
            return response()->json(true);
        }

        return response()->json(false);

      //  return response()->json($user);
    }

    public function verifEditUser(Request $request, $id){
        $userVerif = User::find($id);
        $user = User::where('username', '=', $request->get('username'))
       // orWhere('email', '=', $request->get('email'))
        ->first();

        if($user === null){
            return response()->json(true);
        }else{
            if($userVerif->username == $request->get('username')){
                return response()->json(true);

            }

            return response()->json(false);

        }


      //  return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       // return $this->model->show($id);
        return response()->json(User::with(['autorisation'])->find($id) );


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

    public function updateFonction(Request $request, $id){
        $fonc = UserFonction::find($id);
        $fonc->update($request->only($fonc->fillable));
 
        //return response()->json(User::with(['autorisation'])->find($user->id) );
        return null;
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
     $user =  $this->model->update($request->only($this->model->getModel()->fillable), $id);

      // return response()->json(User::with(['autorisation'])->find($user->id) );
       return response()->json(User::with(['autorisation'])->find($id) );


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
