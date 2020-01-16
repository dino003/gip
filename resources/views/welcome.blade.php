<!DOCTYPE html>
<html class="no-js" lang="zxx">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--=== Favicon ===-->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

    <title>{{ config('app.name', 'Laravel') }} - Logiciel de gestion de parc automobile</title>

    <!--=== Bootstrap CSS ===-->
    <link href="{{ asset('garde/assets/css/bootstrap.min.css ')}}" rel="stylesheet">
    <!--=== Vegas Min CSS ===-->
    <link href="{{ asset('garde/assets/css/plugins/vegas.min.css ')}}" rel="stylesheet">
    <!--=== Slicknav CSS ===-->
    <link href="{{ asset('garde/assets/css/plugins/slicknav.min.css ')}}" rel="stylesheet">
    <!--=== Magnific Popup CSS ===-->
    <link href="{{ asset('garde/assets/css/plugins/magnific-popup.css ')}}" rel="stylesheet">
    <!--=== Owl Carousel CSS ===-->
    <link href="{{ asset('garde/assets/css/plugins/owl.carousel.min.css ')}}" rel="stylesheet">
    <!--=== Gijgo CSS ===-->
    <link href="{{ asset('garde/assets/css/plugins/gijgo.css ')}}" rel="stylesheet">
    <!--=== FontAwesome CSS ===-->
    <link href="{{ asset('garde/assets/css/font-awesome.css ')}}" rel="stylesheet">
    <!--=== Theme Reset CSS ===-->
    <link href="{{ asset('garde/assets/css/reset.css ')}}" rel="stylesheet">
    <!--=== Main Style CSS ===-->
    <link href="{{ asset('garde/assets/style.css ')}}" rel="stylesheet ">
    <!--=== Responsive CSS ===-->
    <link href="{{ asset('garde/assets/css/responsive.css ')}}" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!--[if lt IE 9]>
        <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body class="loader-active">

    <!--== Preloader Area Start ==-->
    <!-- <div class="preloader">
        <div class="preloader-spinner">
            <div class="loader-content">
                <img src="{{ asset('garde/assets/img/preloader.gif ')}}" alt="JSOFT">
            </div>
        </div>
    </div> -->
    <!--== Preloader Area End ==-->

    <!--== Header Area Start ==-->
    <header id="header-area" class="fixed-top">
        <!--== Header Top Start ==-->
        <div id="header-top" class="d-none d-xl-block">
            <div class="container">
                <div class="row">
                    <!--== Single HeaderTop Start ==-->
                    <div class="col-lg-3 text-left">
                        <i class="fa fa-map-marker"></i> Cote D'Ivoire Abidjan, Cocody
                    </div>
                    <!--== Single HeaderTop End ==-->

                    <!--== Single HeaderTop Start ==-->
                    <div class="col-lg-3 text-center">
                        <i class="fa fa-mobile"></i> (+225) 22 52 42 69
                    </div>
                    <!--== Single HeaderTop End ==-->

                    <!--== Single HeaderTop Start ==-->
                    <div class="col-lg-3 text-center">
                        <i class="fa fa-clock-o"></i> Lun-Ven 08.00 - 18.00
                    </div>
                    <!--== Single HeaderTop End ==-->

                    <!--== Social Icons Start ==-->
                    <div class="col-lg-3 text-right">
                        <div class="header-social-icons">
                            <a href="#"><i class="fa fa-behance"></i></a>
                            <a href="#"><i class="fa fa-pinterest"></i></a>
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-linkedin"></i></a>
                        </div>
                    </div>
                    <!--== Social Icons End ==-->
                </div>
            </div>
        </div>
        <!--== Header Top End ==-->

        <!--== Header Bottom Start ==-->
        <div id="header-bottom">
            <div class="container">
                <div class="row">
                    <!--== Logo Start ==-->
                    <div class="col-lg-4">
                        <a href="#" class="logo">
                            <img src="{{ asset('assets/images/log_princip_blanc.png')}}" alt="JSOFT" />
                        </a>
                    </div>
                    <!--== Logo End ==-->

                    <!--== Main Menu Start ==-->
                    <div class="col-lg-8 d-none d-xl-block">
                        <nav class="mainmenu alignright">
                            <ul>
                                <!-- <li class="active"><a href="#">Acceuil</a>
                                    <ul>
                                        <li><a href="index.html">Home 1</a></li>
                                        <li><a href="index2.html">Home 2</a></li>
                                        <li><a href="index3.html">Home 3</a></li>
                                    </ul>
                                </li> -->
                                <li><a class="active" href="#">Acceuil</a></li>
                                <li><a href="#service-area">Services</a></li>
                                <li><a href="#pricing-area">Nos Offres</a></li>
                                @if (Route::has('login'))
                                    @auth
                                    <li> <a href="{{ url('/gestion_du_parc_automobile/parc') }}">Le Parc</a></li>

                                    @else
                                    <li> <a href="{{ route('login') }}">Connexion</a></li>
                                        
                                    @endauth
                                
                            @endif 

                                <!-- <li><a href="#">Cars</a>
                                    <ul>
                                        <li><a href="car-left-sidebar.html">Car Left Sidebar</a></li>
                                        <li><a href="car-right-sidebar.html">Car Right Sidebar</a></li>
                                        <li><a href="car-without-sidebar.html">Car Without Sidebar</a></li>
                                        <li><a href="car-details.html">Car Details</a></li>
                                    </ul>
                                </li> -->
                                <!-- <li><a href="index.html">Pages</a>
                                    <ul>
                                        <li><a href="package.html">Pricing</a></li>
                                        <li><a href="driver.html">Driver</a></li>
                                        <li><a href="faq.html">FAQ</a></li>
                                        <li><a href="gallery.html">Gallery</a></li>
                                        <li><a href="help-desk.html">Help Desk</a></li>
                                        <li><a href="login.html">Log In</a></li>
                                        <li><a href="register.html">Register</a></li>
                                        <li><a href="404.html">404</a></li>
                                    </ul>
                                </li> -->
                                <!-- <li><a href="#">Blog</a>
                                    <ul>
                                        <li><a href="article.html">Blog Page</a></li>
                                        <li><a href="article-details.html">Blog Details</a></li>
                                    </ul>
                                </li> -->
                                <!-- <li><a href="contact.html">Contact</a></li> -->
                            </ul>
                        </nav>
                    </div>
                    <!--== Main Menu End ==-->
                </div>
            </div>
        </div>
        <!--== Header Bottom End ==-->
    </header>
    <!--== Header Area End ==-->

    <!--== SlideshowBg Area Start ==-->
    <section id="slideslow-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="slideshowcontent">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <h1>AGOSOFTPARC</h1>
                                <p>LOGICIEL PROFESSIONEL DE <br> GESTION DU PARC AUTOMOBILE</p><br />

                                <form action="{{ route('import.data') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <input type="file" name="fichier" class="form-control">
                <br>
                <button class="btn btn-success">Import User Data</button>
                <a class="btn btn-warning" href="{{ url('/ex') }}">Export User Data</a>
            </form>
 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--== SlideshowBg Area End ==-->

    <!--== About Us Area Start ==-->
   
    <!--== About Us Area End ==-->

    <!--== Partner Area Start ==-->
  
    <!--== Partner Area End ==-->

    <!--== Services Area Start ==-->
    <section id="service-area" class="section-padding">
        <div class="container">
            <div class="row">
                <!-- Section Title Start -->
                <div class="col-lg-12">
                    <div class="section-title  text-center">
                        <h2>Nos Modules</h2>
                        <span class="title-line"><i class="fa fa-car"></i></span>
                        <p>Gestion complète des événements sur les véhiccules.</p>
                    </div>
                </div>
                <!-- Section Title End -->
            </div>

			<!-- Service Content Start -->
			<div class="row">
				<div class="col-lg-11 m-auto text-center">
					<div class="service-container-wrap">
						<!-- Single Service Start -->
						<div class="service-item">
							<i class="fa fa-taxi"></i>
							<h3>GESTION DES UTILISATIONS</h3>
							<p>Gérez les sorties et entrées de vos véhicules dans le temps.</p>
						</div>
						<!-- Single Service End -->

						<!-- Single Service Start -->
						<div class="service-item">
							<i class="fa fa-calendar"></i>
							<h3>GSTION DES RESERVATIONS</h3>
							<p>Gérez la reservations de vos véhicules.</p>
						</div>
						<!-- Single Service End -->

						<!-- Single Service Start -->
						<div class="service-item">
							<i class="fa fa-life-ring"></i>
							<h3>GESTION DES CONSOMMATIONS</h3>
							<p>Gérez la consommations de vos véhicules dans le parc.</p>
						</div>
						<!-- Single Service End -->

						<!-- Single Service Start -->
						<div class="service-item">
							<i class="fa fa-cog"></i>
							<h3>GESTION DES INTERVENTIONS</h3>
							<p>Gérez les interventions et les couts dans le parc.</p>
						</div>
						<!-- Single Service End -->

						<!-- Single Service Start -->
						<div class="service-item">
							<i class="fa fa-exclamation-triangle"></i>
							<h3>GESTION DES ALERTES</h3>
							<p>Récevez des notification es temps réeles sur les événements des véhicules.</p>
						</div>
						<!-- Single Service End -->

						<!-- Single Service Start -->
						<div class="service-item">
							<i class="fa fa-shopping-cart"></i>
							<h3>GESTION DE STOCK</h3>
							<p>Gérez en interne le stock de pièces détachées et concomables.</p>
						</div>
						<!-- Single Service End -->
					</div>
				</div>
			</div>
			<!-- Service Content End -->
        </div>
    </section>
    <!--== Services Area End ==-->

    <!--== Fun Fact Area Start ==-->
   
    <!--== Fun Fact Area End ==-->

    <!--== Choose Car Area Start ==-->
   
    <!--== Choose Car Area End ==-->

    <!--== Pricing Area Start ==-->
    <section id="pricing-area" class="section-padding overlay">
        <div class="container">
            <div class="row">
                <!-- Section Title Start -->
                <div class="col-lg-12">
                    <div class="section-title  text-center">
                        <h2>Découvrez nos offres</h2>
                        <span class="title-line"><i class="fa fa-car"></i></span>
                        <!-- <p>Découvrez nos offres.</p> -->
                    </div>
                </div>
                <!-- Section Title End -->
            </div>

            <!-- Pricing Table Conatent Start -->
            <div class="row">

               <!-- Single Pricing Table -->
               <div class="col-lg-4 col-md-6 text-center">
                    <div class="single-pricing-table">
                        <h3>EVALUATION</h3>
                        <h2>Gratuite</h2>
                        <h5>30 JOURS</h5>
                      

                        <ul class="package-list">
                             <li>20 VEHICULES</li>

                            <li>GESTION DES VEHICULES</li>
                            <li>GESTION DES RESERVATIONS</li>
                            <li>GESTION DES UTILISATIONS</li>
                            <li>GESTION DES CONSOMMATIONS</li>
                            <li>GESTION DES INTERVENTIONS</li>
                            <li>GESTION DES ALERTES</li>

                            <li>GESTION DE STOCK DE PIECES</li>
                            

                        </ul>
                    </div>
                </div>
                <!-- Single Pricing Table -->
                <!-- Single Pricing Table -->
                <div class="col-lg-4 col-md-6 text-center">
                    <div class="single-pricing-table">
                        <h3>STANDARD</h3>
                        <h2>XXX.XXX F CFA</h2>
                        <h5>PAR MOIS</h5>

                        <ul class="package-list">
                             <li>100 VEHICULES</li>

                            <li>GESTION DES VEHICULES</li>
                            <li>GESTION DES RESERVATIONS</li>
                            <li>GESTION DES UTILISATIONS</li>
                            <li>GESTION DES CONSOMMATIONS</li>
                            <li>GESTION DES INTERVENTIONS</li>
                            <li>GESTION DES ALERTES</li>

                            <li>GESTION DE STOCK DE PIECES</li>
                           
                        </ul>
                    </div>
                </div>
                <!-- Single Pricing Table -->

             

                <!-- Single Pricing Table -->
                <div class="col-lg-4 col-md-6 text-center">
                    <div class="single-pricing-table">
                        <h3>BUSINESS</h3>
                        <h2>XXX.XXX F CFA</h2>
                        <h5>PAR MOIS</h5>

                        <ul class="package-list">
                        <li> VEHICULES ILLIMITES</li>

                        <li>GESTION DES VEHICULES</li>
                        <li>GESTION DES RESERVATIONS</li>
                        <li>GESTION DES UTILISATIONS</li>
                        <li>GESTION DES CONSOMMATIONS</li>
                        <li>GESTION DES INTERVENTIONS</li>
                        <li>GESTION DES ALERTES</li>

                        <li>GESTION DE STOCK DE PIECES</li>
                        
                        </ul>
                    </div>
                </div>
                <!-- Single Pricing Table -->
            </div>
            <!-- Pricing Table Conatent End -->
        </div>
    </section>
    <!--== Pricing Area End ==-->

    <!--== Team Area Start ==-->
  
    <!--== Team Area End ==-->

    <!--== Mobile App Area Start ==-->
    <!-- <div id="mobileapp-video-bg"></div>
    <section id="mobile-app-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="mobile-app-content">
                        <h2>SAVE 30% WITH THE APP</h2>
                        <p>Easy &amp; Fast - Book a car in 60 seconds</p>
                        <div class="app-btns">
                            <a href="#"><i class="fa fa-android"></i> Android Store</a>
                            <a href="#"><i class="fa fa-apple"></i> Apple Store</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <!--== Mobile App Area End ==-->

    <!--== Articles Area Start ==-->
 
    <!--== Articles Area End ==-->

    <!--== Footer Area Start ==-->
    <section id="footer-area">
        <!-- Footer Widget Start -->
               <!-- Footer Widget End -->

        <!-- Footer Bottom Start -->
        <div class="footer-bottom-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> Tous droits réservés | AGOSOFTPARC <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">AGOSOFT</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer Bottom End -->
    </section>
    <!--== Footer Area End ==-->

    <!--== Scroll Top Area Start ==-->
    <div class="scroll-top">
        <img src="{{ asset('garde/assets/img/scroll-top.png ') }}" alt="JSOFT">
    </div>
    <!--== Scroll Top Area End ==-->

    <!--=======================Javascript============================-->
    <!--=== Jquery Min Js ===-->
    <script src="{{ asset('garde/assets/js/jquery-3.2.1.min.js ') }}"></script>
    <!--=== Jquery Migrate Min Js ===-->
    <script src="{{ asset('garde/assets/js/jquery-migrate.min.js ') }}"></script>
    <!--=== Popper Min Js ===-->
    <script src="{{ asset('garde/assets/js/popper.min.js ') }}"></script>
    <!--=== Bootstrap Min Js ===-->
    <script src="{{ asset('garde/assets/js/bootstrap.min.js ') }}"></script>
    <!--=== Gijgo Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/gijgo.js ') }}"></script>
    <!--=== Vegas Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/vegas.min.js ') }}"></script>
    <!--=== Isotope Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/isotope.min.js ') }}"></script>
    <!--=== Owl Caousel Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/owl.carousel.min.js ') }}"></script>
    <!--=== Waypoint Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/waypoints.min.js ') }}"></script>
    <!--=== CounTotop Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/counterup.min.js ') }}"></script>
    <!--=== YtPlayer Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/mb.YTPlayer.js ') }}"></script>
    <!--=== Magnific Popup Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/magnific-popup.min.js ') }}"></script>
    <!--=== Slicknav Min Js ===-->
    <script src="{{ asset('garde/assets/js/plugins/slicknav.min.js ') }}"></script>

    <!--=== Mian Js ===-->
    <script src="{{ asset('garde/assets/js/main.js ') }}"></script>

</body>

</html>