<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\StructureRegroupement;
use App\TypeEntite;
use App\Tier;
use App\Personnel;
use App\Entite;
use App\Theme;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;


use Hyn\Tenancy\Contracts\Repositories\HostnameRepository;
use Hyn\Tenancy\Contracts\Repositories\WebsiteRepository;
use Hyn\Tenancy\Models\Hostname;
use Hyn\Tenancy\Models\Website;
use Hyn\Tenancy\Environment;


use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rule;



class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/gestion_du_parc_automobile/parc';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function gg(){
       // $repository = app(WebsiteRepository::class);
      //  $websites = $repository->all();
      //  dd($repository);
      return response()->json(
          [
              'web' => Website::all(),
              'domaine' => Hostname::all()
          ]
      ) ;
    } 

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
       // $invalidSubdomains = config('app.invalid_subdomains');

        return Validator::make($data, [
           

            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users'],

            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        ini_set('max_execution_time', '300');

         
        $user =  User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'username' => $data['username'],
            'isAdmin' => true,
            'password' => Hash::make($data['password']),
            'periode_essai' => now()->addDays(config('app.free_trial_days')),

        ]);

        //  structure par  defaut
        $struc = new StructureRegroupement;

        $struc->code_regroupement = "SIEGE";
        $struc->nom_regroupement = "SIEGE";

        $struc->save();

        // fin structure par  defaut


        //  type entite par  defaut
        $ent = new TypeEntite;
        $ent->type_entite = "SIEGE";
        $ent->save();

    // fin type entite par  defaut


    //  fournisseur par  defaut

        $tier = new Tier;

        $tier->code = "FOURNISSEUR PAR DEFAUT";

        $tier->save();

    // fin fournisseur par  defaut


    // personne par Par defaut 
        $pers = new Personnel;

        $pers->nom = "PERSONNE PAR DEFAUT";
        $pers->default = 1;
        $pers->personne_prioritaire = 1;
      //  $pers->entite_affectation = $request->get('nom');
        $pers->save();

        // fin personne par par defaut

        // theme par defaut 
            $theme = new Theme;
            $theme->navbar = "app-header header-shadow bg-primary header-text-light";
            $theme->sidebar = "app-sidebar sidebar-shadow";
            $theme->save();


        // fin theme

        return $user;

         
    }



    public function register(Request $request) {
        // we'll add in our fqdn here
        $data = $request->all();
      

        // validate with the validator below
        $this->validator($request->all())->validate();

        // new registered user event
        event(new Registered($user = $this->create($request->all())));

        $port = $request->server('SERVER_PORT') == 8000 ? ':8000' : '';
        return redirect( ( $request->secure() ? 'https://' : 'http://' )  . $port . '/login?success=1' );

    }
}
