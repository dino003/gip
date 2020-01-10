<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Validation\Rule;
use Hyn\Tenancy\Models\Hostname;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
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
        $this->middleware('guest')->except('logout');
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $messages = [
            'login.required' => 'Le nom d\'utilisateur ou l\'adresse email est réquis !',
            'email.exists' => 'Cette adresse email est déja utilisée',
            'username.exists' => 'Ce nom d\'utilisateur est déja utilisé',
            'password.required' => 'Le mot de passe est réquis',
        ];

        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
            'email' => 'string|exists:users',
            'username' => 'string|exists:users',
        ], $messages);
    }


    public function showDomainForm() {
        return view('auth.domain');
    }

    public function showLoginFormTenant() {
        return view('login_tenant');
    }

    public function routeToTenant( Request $request ) {        
        $invalidSubdomains = config( 'app.invalid_subdomains' );
        $validatedData = $request->validate([
            'account' => [
                'required', 
                'string',
                Rule::notIn( $invalidSubdomains ),
                'regex:/^[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])$/'
            ],
        ]);

        $fqdn = $validatedData['account'] . '.' . config( 'app.url_base' );
        $hostExists = Hostname::where( 'fqdn', $fqdn )->exists();
        $port = $request->server('SERVER_PORT') == 8000 ? ':8000' : '';
        if ( $hostExists ) {
            return redirect( ( $request->secure() ? 'https://' : 'http://' ) . $fqdn . $port . '/login' );
        } else {
            return redirect('register')
            ->withInput();
        }
    }

   

        /**
        * Get the login username to be used by the controller.
        *
        * @return string
        */
        public function username()
        {
            $login = request()->input('login');

            $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
            request()->merge([$field => $login]);

            return $field;
        }

    protected function credentials(Request $request)
    {
        if( !filter_var($request->get('login'), FILTER_VALIDATE_EMAIL) ){
            return [
                'username'=> $request->{$this->username()},
                'password'=> $request->get('password'),
                //'active' => 1

            ];
        }
        return [
            'email' => $request->{$this->username()},
            'password' => $request->password,
          //  'active' => 1,
        ];
    }

    public function text(){
        $user = User::first();
        //dd($user);
        if ($user->onTrial()) {
            // User is within their trial period...
            echo 'dans sa periode d\'essai';
        }else{
            echo 'periode terminée';

        }
    } 
}
