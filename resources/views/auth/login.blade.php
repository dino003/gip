@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Connexion') }}</div>
                @if( app('request')->input('success') == 1 )
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="alert alert-success" role="alert">
                        Votre compte à été créé avec succès. Connectez-vous à votre compte avec les identifiants saisis précédement.
                        </div>
                    </div>
                </div>
                @endif

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}" id="login_form">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('Nom d\'utilisateur ou Addresse E-Mail') }}</label>

                            <div class="col-md-6">
                                <input id="login" type="text" class="form-control{{ $errors->has('username') || $errors->has('email') ? ' is-invalid' : '' }}"
                                 name="login" value="{{ old('username') ?: old('email') }}"  autofocus>

                                 @if ($errors->has('username') || $errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('username') ?: $errors->first('email') }}</strong>

                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Mot de passe') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Restez connecté') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" id="connexion_butt"  class="btn btn-primary">
                                    {{ __('Connnexion') }}
                                </button>

                               

                                <div class="spinner-border text-primary" style="display: none;" id="patientez" role="status">
                                    <span class="sr-only">Patientez...</span>
                                </div>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Mot de passe oublié ?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
 
@endsection

@section('other_script')



  <script type="text/javascript">

    function logSubmit(){
        var patientez = document.getElementById('patientez');
        var connexion_butt = document.getElementById('connexion_butt');
        if(patientez.style.display === "none"){
            patientez.style.display = "block";
        }else{
            patientez.style.display = "none";

        }

        if(connexion_butt.style.display === "none"){
            connexion_butt.style.display = "block";
        }else{
            connexion_butt.style.display = "none";

        }
    }

    const form = document.getElementById('login_form');
     form.addEventListener('submit', logSubmit )

  </script>



@endsection




