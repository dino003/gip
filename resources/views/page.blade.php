<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ config('app.name', 'Laravel') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
    <meta name="description" content="Logiciel Professionnel de gestion du parc automobile.">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

  

    <!--
    =========================================================
    * ArchitectUI HTML Theme Dashboard - v1.0.0
    =========================================================
    * Product Page: https://dashboardpack.com
    * Copyright 2019 DashboardPack (https://dashboardpack.com)
    * Licensed under MIT (https://github.com/DashboardPack/architectui-html-theme-free/blob/master/LICENSE)
    =========================================================
    * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    -->
        <link href="{{asset('main.css')}}" rel="stylesheet">

       <style>
         html,body{ overflow-x:hidden; } 

       </style>
    </head>
    <body >

            <div id="react" data-user_id="{{Auth::user()->id}}" data-user_name="{{Auth::user()->name}}" data-username="{{Auth::user()->username}}"  >
            </div>
  

<script type="text/javascript" src="{{asset('js/app.js')}}"></script>

<script type="text/javascript" src="{{asset('assets/scripts/main.js')}}"></script>

<script type="text/javascript" src="{{asset('assets/scripts/jquery-3.3.1.min.js')}}"></script> -->


<script type="text/javascript" src="{{asset('assets/scripts/poper.min.js')}}"></script>


 <script type="text/javascript" src="{{asset('assets/scripts/bootstrap.min.js')}}"></script>

     

       
    </body>
</html>
