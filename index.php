<!DOCTYPE HTML>		
<html>
<head>
	<meta charset="utf-8">
	<meta name="author" content="KelsDEV">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	
	<link rel="stylesheet" type="text/css" href="/AnimeMobile/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/AnimeMobile/css/bootstrap-responsive.min.css">

	<link href="http://vjs.zencdn.net/c/video-js.css" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="/AnimeMobile/css/style.css">

	<title></title>
</head>
<body>
	<div class="container-fluid">
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner">
        		<div class="container">
	          		<button id="btn_navbar" type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
	            		<span class="icon-bar"></span>
	            		<span class="icon-bar"></span>
	           	 		<span class="icon-bar"></span>
	          		</button>

          			<a class="brand" href="index.php">Anime Mobile</a>

          			<div class="nav-collapse collapse">
            			<ul class="nav">
			              	<li><a href="index.php?page=apropos">A propos</a></li>
			              	<li><a href="index.php?page=contact">Contact</a></li>
            			</ul>

            			<form class="navbar-form pull-right" method="post" action="connexion.php">
              				<input class="span2" placeholder="Email" type="email">
              				<input class="span2" placeholder="Password" type="password">
              				<button type="submit" class="btn btn-inverse">Sign in</button>
            			</form>
          			</div>
        		</div>
      		</div>
		</div>
      
	    <div id="content">
			<div class="row-fluid">
				<div id="main_menu" class="span12">
					<a class="item" href="index?page=news" data-action="News" data-href="news">News</a>
					<a class="item" href="index?page=animes" data-action="Anime" data-href="http://www.anime-ultime.net/series-0-1/anime/0---#principal">Anime</a>
					<a class="item" href="index?page=dramas" data-action="Drama" data-href="http://www.anime-ultime.net/series-0-1/drama/0---#principal">Drama</a>
					<a class="item" href="index?page=tokusatsus" data-action="Tokusatsu" data-href="http://www.anime-ultime.net/series-0-1/tokusatsu/0---#principal">Tokusatsu</a>
				</div>
			</div>

			<div id="form-search" class="row-fluid">
				<form class="form-search">
					<div class="input-append">
						<input id="search_input" type="text" class="span12 search-query" placeholder="Taper un titre">
						<button type="submit" class="btn"><i class="icon-search"></i></button>
					</div>
				</form>

				<div id="search_result"></div>
			</div>

		</div>

	</div>

	<footer class="footer">
		<p>2013 &copy; Anime Mobile</p>
		<p>Mention Légale | Contact</p>
	</footer>

	<div id="temp"></div>
	<!-- 
		Loaded Javascript Files 
	-->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="/AnimeMobile/js/bootstrap.min.js"></script>

	<script type="text/javascript" src="/AnimeMobile/jwplayer/jwplayer.js"></script>

	<script type="text/javascript" src="/AnimeMobile/js/script.js"></script>

</body>
</html>
		
