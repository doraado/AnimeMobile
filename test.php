<?php require_once 'app/dm/Dailymotion.php'; ?>
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

          			<a class="brand" href="index.php">A.O.M.</a>

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

		<div class="row-fluid">
			<div class="span12">
				<?php 
					$apiKey = 'f98b7b889f80197eb269';
					$apiSecret = '6a10b98fec2d508608d602314c804aa97aeb91f8';
					$api = new Dailymotion();

					$api->setGrantType(Dailymotion::GRANT_TYPE_AUTHORIZATION, $apiKey, $apiSecret, null,
                       	array('username' => 'animeonmobile', 'password' => 'Tiger1986'));
dump($result);
dump($_GET);
try
{
    $result = $api->get('/videos', array('fields' => 'id,title,description'));
}
catch (DailymotionAuthRequiredException $e)
{
    // Redirect the user to the Dailymotion authorization page
    header('Location: ' . $api->getAuthorizationUrl());
    return;
}



				?>
			</div>
		</div>

	</div>

	<footer class="footer">
		<p>2013 &copy; Anime on Mobile</p>
		<p>Designé et Développé par KHub </p>
	</footer>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="/AnimeMobile/js/bootstrap.min.js"></script>

	<script type="text/javascript" src="/AnimeMobile/jwplayer/jwplayer.js"></script>

	<script type="text/javascript" src="/AnimeMobile/js/script.js"></script>

</body>
</html>
<?php 
function dump($var){
	echo '<pre>';
	var_dump($var);
	echo '</pre>';
}
?>
