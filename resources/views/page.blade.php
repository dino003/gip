<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ config('app.name', 'Laravel') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
    <meta name="description" content="This is an example dashboard created using build-in elements and components.">
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
           .modalDynamique {
    width: 500px;
    background: white;
    border: 1px solid #ccc;
    transition: 1.1s ease-out;
    box-shadow: 
      -2rem 2rem 2rem rgba(black, 0.2);
    filter: blur(0);
    transform: scale(1);  
    opacity: 1;
    visibility: visible;
    &.off {
      opacity: 0;
      visibility: hidden;
      filter: blur(8px);
      transform: scale(0.33);
      box-shadow: 1rem 0 0 rgba(black, 0.2);
    }
    @supports (offset-rotate: 0deg) {
      // offset-rotation: 0deg;
      offset-rotate: 0deg;
      offset-path: path("M 250,100 S -300,500 -700,-200");
      &.off {
        offset-distance: 100%;
      }
    }
    @media (prefers-reduced-motion) {
      offset-path: none;
    }
    h2 {
      border-bottom: 1px solid #ccc;
      padding: 1rem;
      margin: 0;
    }
    .content {
      padding: 1rem;
    }
    .actions {
      border-top: 1px solid #ccc;
      background: #eee;
      padding: 0.5rem 1rem;
      button {
        border: 0;
        background: #78f89f;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
        line-height: 1;
      }
    }
  }

   html,body{ overflow-x:hidden; } 


       </style>
    </head>
    <body >

            <div id="react"></div>
  

<script type="text/javascript" src="{{asset('js/app.js')}}"></script>

<script type="text/javascript" src="{{asset('assets/scripts/main.js')}}"></script>

<script type="text/javascript" src="{{asset('assets/scripts/jquery-3.3.1.min.js')}}"></script> -->


<script type="text/javascript" src="{{asset('assets/scripts/poper.min.js')}}"></script>


 <script type="text/javascript" src="{{asset('assets/scripts/bootstrap.min.js')}}"></script>

     

       
    </body>
</html>
