<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



  
     // Landing Page Routes
     Route::get('/', function () {
         return view('welcome');
     })->name('welcome');

          // Login Routes
          Route::get('secure-authentication', 'Auth\LoginController@showLoginForm')->name('login');
          Route::post('secure-authentication', 'Auth\LoginController@login');
          Route::post('logout', 'Auth\LoginController@logout')->name('logout');
          
          // Password Reset Routes
          Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
          Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
          Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
          Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');
      
     //      // Email Verification Routes
     //      Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
     //      Route::get('email/verify/{id}', 'Auth\VerificationController@verify')->name('verification.verify');
     //      Route::get('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');
      
     Route::get('/gestion_du_parc_automobile/{path?}', 'HomeController@renderReactPage')->where('path', '.*')->name('parc.dashboard');

          Route::get('/home', 'HomeController@index')->name('home');



     
     // Catch All Route
     Route::any('{any}', function () {
         abort(404, 'Le lien que vous avez suivi est introuvable !');
     })->where('any', '.*');
 






