@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">


    <div class="container-contact100">
		<div class="wrap-contact100">
            <form class="contact100-form " method="POST" action="{{ route('register') }}">
                        @csrf
            <!-- <div class="main-card mb-6 card"> -->
                                            <!-- <div class="card-body"> -->
                                                <h5 class="card-title">{{ __('CREATION DE COMPTE') }}</h5>
                                                <div>

                                                <div class="input-group ">
                                                
                                                 <input placeholder="Nom de votre structure" style="width: 270px;" type="text" class="form-control @error('account') is-invalid @enderror @error('fqdn') is-invalid @enderror" name="account" value="{{ old('account') }}" required autocomplete="account" autofocus >
                                    
                               
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">.{{ config('app.url_base') }}</span>
                                                        </div>
                                                    </div>

                                                 @error('account')  
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ $message }}</strong>
                                                </span>
                                            @enderror
                                            @error('fqdn')
                                                <span class="invalid-feedback" role="alert">
                                                    <strong>{{ str_replace('fqdn','account',$message) }}</strong>
                                                </span>
                                            @enderror
                                            
                                                    <br>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">{{ __('Nom et Prénoms') }}</span></div>
                                                        <input  type="text"  class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus />
                                                    </div>
                                                    @error('name')
                                                        <span class="invalid-feedback" role="alert">
                                                        
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                    <br>

                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">{{ __('Nom d\'utilisateur') }}</span></div>
                                                        <input  type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username">
                                                    </div>

                                                    @error('username')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                    <br>

                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">{{ __('Adresse email') }}</span></div>
                                                        <input  type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
                                                    </div>

                                                    @error('email')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                    <br>

                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">{{ __('Mot de passe') }}</span></div>
                                                        <input  type="password" class="password form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" id="password" />
                                                        <div class="input-group-append" id="btn_show_register_password_react"></div>

                                                    </div>

                                                    @error('password')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                    <br>

                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">{{ __('Confirmation') }}</span></div>
                                                        <input  type="password" class="form-control" name="password_confirmation" required autocomplete="new-password"  id="password-confirm" />
                                                    </div>
                                                    <br>
                                                  
                                                    
                                     <div class="form-group row mb-0" id="register_button_for_react"></div>
    
                                                    <br /><br /><br /><br /><br /><br /><br />
                                                </div>
                                           
			</form>

			<div class="contact100-more flex-col-c-m accueil_form_image" id="accueil_form_image">
				<!-- <div class="flex-w size1 p-b-47">
					<div class="txt1 p-r-25">
						<span class="lnr lnr-map-marker"></span>
					</div>

					<div class="flex-col size2">
						<span class="txt1 p-b-20">
							Address
						</span>

						<span class="txt2">
							Mada Center 8th floor, 379 Hudson St, New York, NY 10018 US
						</span>
					</div>
				</div> -->
<!-- 
				<div class="dis-flex size1 p-b-47">
					<div class="txt1 p-r-25">
						<span class="lnr lnr-phone-handset"></span>
					</div>

					<div class="flex-col size2">
						<span class="txt1 p-b-20">
							Lets Talk
						</span>

						<span class="txt3">
							+1 800 1236879
						</span>
					</div>
				</div> -->

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


    <!-- <div class="main-card mb-3 card">
                                            <div class="card-body">
                                                <h5 class="card-title">Input Groups</h5>
                                                <div>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">@</span></div>
                                                        <input placeholder="username" type="text" class="form-control"></div>
                                                    <br>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text"><input aria-label="Checkbox for following text input" type="checkbox" class=""></span></div>
                                                        <input placeholder="Check it out" type="text" class="form-control"></div>
                                                    <br>
                                                    <div class="input-group"><input placeholder="username" type="text" class="form-control">
                                                        <div class="input-group-append"><span class="input-group-text">@example.com</span></div>
                                                    </div>
                                                    <br>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">$</span><span class="input-group-text">$</span></div>
                                                        <input placeholder="Dolla dolla billz yo!" type="text" class="form-control">
                                                        <div class="input-group-append"><span class="input-group-text">$</span><span class="input-group-text">$</span></div>
                                                    </div>
                                                    <br>
                                                    <div class="input-group">
                                                        <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                                                        <input placeholder="Amount" step="1" type="number" class="form-control">
                                                        <div class="input-group-append"><span class="input-group-text">.00</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
        <!-- <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('CREATION DE COMPTE') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="account" class="col-md-4 col-form-label text-md-right">{{ __('Nom de votre Structure') }}</label>

                            <div class="col-md-3">
                                <input id="account" type="text" class="form-control text-right @error('account') is-invalid @enderror @error('fqdn') is-invalid @enderror" name="account" value="{{ old('account') }}" required autocomplete="account" autofocus>

                                @error('account')  
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                                @error('fqdn')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ str_replace('fqdn','account',$message) }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="col-md-5"><span class="sign-in-tld">.<em>{{ config('app.url_base') }}</em></span></div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Nom et Prénoms') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('Nom d\'utilisateur ou Pseudo') }}</label>

                            <div class="col-md-6">
                                <input id="username" type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="{{ old('username') }}" required autocomplete="username">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('Addresse Email') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Mot de passe') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="password form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="col-md-2" id="btn_show_register_password_react"></div>

                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="password col-md-4 col-form-label text-md-right">{{ __('Confirmation du Mot de passe') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="form-group row mb-0" id="register_button_for_react">
                          
                        </div>
                    </form>
                </div>
            </div>
        </div> -->
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


<script src="https://unpkg.com/react@16/umd/react.production.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

  <script type="text/javascript" src="{{URL::asset('js/register.js')}}"></script>
  <script type="text/javascript" src="{{URL::asset('js/showPassword.js')}}"></script>



@endsection
