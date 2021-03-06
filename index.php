<?php require_once 'app/dm/Dailymotion.php'; ?>
<!DOCTYPE HTML>		
<html>
<head>
	<meta charset="utf-8">
	<meta name="author" content="Kelson KIEN">
	<meta name="description" content="Stream Mobile est site qui réuni tout les animes VOSTFR disponible sur internet.">
	<meta name="keywords" content="mobile, streaming, stream, animes, fansub, animés, mangas, dramas, japonais, vostfr">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes">
	
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.min.css">

	<link href="http://vjs.zencdn.net/c/video-js.css" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="css/style.css">

	<link rel="apple-touch-icon" href="img/iphone.png" />
	<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
	
	<title>Anime on Mobile</title>
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

          			<a class="brand" href="index.php">Stream Mobile</a>

          			<div class="nav-collapse collapse">
            			<ul class="nav">
			              	<li><a href="index.php?page=apropos">A propos</a></li>
			              	<li><a href="index.php?page=contact">Contact</a></li>
			              	<li class="divider-vertical"></li>
			              	<li><a id="clear" href="index.php">Resynchroniser</a></li>
			              	<li class="divider-vertical"></li>
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

      	<?php
			$page = (isset($_GET['page'])) ? $_GET['page'] : NULL;

			if($page) {
				switch ($page) {
					case 'apropos':
						?>
<h3 class="titre">A propos de Stream Mobile</h3>
<blockquote>
	Stream Mobile ? Késako ?!
</blockquote>
<p>
	Créer en 2013, Stream Mobile est très... high tech ^^'
</p>
<p>
	Par son nom, il est facile de cerner l'objectif de ce site, sans même être une machine en anglais ;)<br> 
	En effet, le site a été créer et penser pour les Smartphones. Stream Mobile, ou S.M. pour les intimes, se veut d'offrir un confort en terme de naviguation.
</p>

<blockquote>
	Et pourquoi avoir créé un tel site ?
</blockquote>
<p>
	Pour m'offrir ce confort ! Il faut savoir que de plus en plus de gens possèdent un smartphone ou/et une tablette. Un site en version classique, généralement, ça donne pas bien sur de petite résolutions.
	<br>
	Mais aussi, c'est pour pouvoir me faire la main dans le développement web orienté smartphone et tablette ^^
</p>
<blockquote>
	D'où proviennent les vidéos proposées en streaming ? Et pourquoi que du streaming d'ailleurs !
</blockquote>
<p>
	Toujours avoir les smartphones et tablettes en tête. Ces gadgets ne sont majoritairement utilisés que pour de la consultation. Et puis, ca évite de saturer vos mémoires internes =)
</p>
<p>
	Quant à la provenance des vidéos, les liens proviennent tout simplement de sites bien connus.
</p>
<blockquote>
	Qu'est-ce qu'on gagne à s'inscrire sur S.M. ?
</blockquote>
<p>
	Bonne question, je passe ...<br>
	Pon, plus sérieusement ? Des fonctionnalités génialissimes !!! ;)
</p>
<p>
	En fait, on verra tous ça ensemble au fur à mesure. Le site n'est pas terminé, et loin de là ;)
	<br>
	Donc n'hésiter à faire des demandes et à participer aux diverses questions tournant autours de ce sujet.
</p>

						<?php
						break;
					
					case 'contact':
						?>
						<form class="form" action="contacter.php">
							<input name="email" type="email" class="span12" placeholder="Votre email">
							<input name="sujet" type="text" class="span12" placeholder="A quel sujet ?">
							<textarea name="message" class="span12" rows="6" placeholder="Votre message"></textarea>    

							<div class="form-actions">
							    <button type="submit" class="btn btn-primary">Envoyer</button>
							    <button type="reset" class="btn">Annuler</button>
						    </div>
						</form>
						<?php
						break;
				}
			}
			else{
		?>
	    <div id="content">
			<div class="row-fluid">
				<div id="main_menu" class="span12">
					<a class="item" href="index?page=news" data-action="News" data-href="news">News</a>
					<a class="item" href="index?page=animes" data-action="Animes" data-href="http://www.anime-ultime.net/series-0-1/anime/0---#principal">Animes</a>
					<a class="item" href="index?page=dramas" data-action="Dramas" data-href="http://www.anime-ultime.net/series-0-1/drama/0---#principal">Dramas</a>
					<a class="item" href="index?page=tokusatsus" data-action="Tokusatsus" data-href="http://www.anime-ultime.net/series-0-1/tokusatsu/0---#principal">Tokusatsus</a>
				</div>
			</div>

			<div id="form-search" class="row-fluid">
				<form class="form_search">
					<div class="input-append">
						<input id="search_input" type="text" class="span12" placeholder="Taper un titre">
  						
						<button id="btn_search_init"type="button" class="btn"><i class="icon-refresh"></i></button>
						<button id="btn_search" type="button" class="btn"><i class="icon-search"></i></button>
						
					</div>
				</form>
			
				<div id="search_result"></div>
				
			</div>

		</div>
		<?php } ?>
	</div>

	<footer class="footer">
		2013 &copy; Stream Mobile
	</footer>

	<!-- Modal -->
	<div id="info_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	<h3 id="modal-title">Modal header</h3>
	</div>
	<div id="modal-body">
	<p>One fine body…</p>
	</div>
	<div id="modal-footer">
	</div>
	</div>

	<!-- Div pour le traitement des données temporaires -->
	<div id="temp"></div>
	<!-- 
		Loaded Javascript Files 
	-->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>

	<script src="http://vjs.zencdn.net/c/video.js"></script>
	<script type="text/javascript" src="jwplayer/jwplayer.js"></script>

	<script type="text/javascript" src="js/script.js"></script>

</body>
</html>
		
