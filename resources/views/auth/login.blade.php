
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">


    <div class="container-contact100">
		<div class="wrap-contact100">
            <form class="contact100-form " id="login_form" method="POST" action="{{ route('login') }}">
                        @csrf
            <!-- <div class="main-card mb-6 card"> -->
                                            <!-- <div class="card-body"> -->
                                                <h5 class="card-title">{{ __('Authentification') }}</h5>
                                                <div>

                                               
                                            
                                                    <br>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">{{ __('Nom d\'utilisateur ou  Email') }}</span></div>
                                                        <input  type="text"  class="form-control{{ $errors->has('username') || $errors->has('email') ? ' is-invalid' : '' }}" name="login" value="{{ old('username') ?: old('email') }}" required autofocus />
                                                    </div>
                                                    @if ($errors->has('email') || $errors->has('username'))
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $errors->first('username') ?: $errors->first('email') }}</strong>

                                                        </span>
                                                    @endif
                                                    <br>

                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">{{ __('Mot de Passe') }}</span></div>
                                                        <input  type="password" id="password" class="form-control @error('password') is-invalid @enderror" name="password" value="{{ old('password') }}" required  />
                                                        <div class="input-group-prepend" id="btn_show_register_password_react"></div>

                                                    </div>

                                                    @error('password')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                    <br>

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

                                                    @if (Route::has('password.request'))
                                                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                                            {{ __('Mot de passe oublié ?') }}
                                                        </a>
                                                    @endif
                                                    <br>
                                                  
                                                    
                                     <div class="form-group row mb-0">

                                     <div class="col-md-6" id="submit_button" >
                                        <button 
                                        type="submit" 
                                            class="btn btn-primary">
                                            Connexion
                                        </button> 

                                    </div>
                                     
                                     <div class="col-md-12" id="waiting_message" style="display: none;">
                                        <span >
                                            <em style="color: blue;"> Merci de patienter.</em>
                                            <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Chargement...</span>
                                                </div>
                                        </span>
                                     </div>
                                    
                                     </div>
    
                                                    <br /><br /><br /><br /><br /><br /><br />
                                                </div>
                                           
			</form>

			<div class="contact100-more flex-col-c-m accueil_form_image" id="accueil_form_image">
				

				<div class="dis-flex size1 p-b-47">
					<div class="txt1 p-r-25">
						<span class="lnr lnr-envelope"></span>
					</div>

					<div class="flex-col size2">
						<span class="txt1 p-b-20">
							 Support Général
						</span>

						<span class="txt3">
							agosoft@agosoftci.com
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>


   
    </div>
</div>
@endsection

@section('other_css')
<!--===============================================================================================-->
<link rel="stylesheet" type="text/css" href="{{asset('garde/vendor/bootstrap/css/bootstrap.min.css ')}}">
<!--===============================================================================================-->
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="{{asset('garde/fonts/Linearicons-Free-v1.0.0/icon-font.min.css ')}}">
<!--===============================================================================================-->

	<!-- <link rel="stylesheet" type="text/css" href="{{asset('garde/css/util.css ')}}"> -->
	<link rel="stylesheet" type="text/css" href="{{asset('garde/css/main.css ')}}">
<!--===============================================================================================-->
@endsection

@section('other_script')


<script src="https://unpkg.com/react@16/umd/react.developpement.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.developpement.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <!-- <script type="text/javascript" src="{{URL::asset('js/register.js')}}"></script> -->
  <script type="text/javascript" src="{{URL::asset('js/showPassword.js')}}"></script>

  <script type="text/javascript">

    function logSubmit(){
        var waiting = document.getElementById('waiting_message');
        var log = document.getElementById('submit_button');
        if(waiting.style.display === "none"){
            waiting.style.display = "block";
        }else{
            waiting.style.display = "none";

        }

        if(log.style.display === "none"){
            log.style.display = "block";
        }else{
            log.style.display = "none";

        }
    }

    const form = document.getElementById('login_form');
     form.addEventListener('submit', logSubmit )

  </script>



@endsection





