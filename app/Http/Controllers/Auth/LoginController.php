<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\User;
use Illuminate\Http\Request;


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
    protected $redirectTo = '/home';

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
