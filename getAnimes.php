
<?php 
	// Création d'un flux
	$opts = array(
  		'http'	=>	array(
    			'method'	=>	"GET",
    			'header'	=>	"Accept-language: en\r\n" 
  			)
	);

	$context = stream_context_create($opts);

	if(isset($_POST['href'])){
 		$site = $_POST['href'];
	}
	else{
		$site = 'http://www.anime-ultime.net/series-0-1/anime/0---#principal';
	}

	$html = file_get_contents( $site, false, $context ); 

	if( $_POST['type'] != 'episode'){

		$a_html = explode('<table class="jtable" align="center" cellspacing="0"  cellpadding="1">', $html);
		$a_html = explode('</table>', $a_html[1]);

	 	$res = '<table class="table">'.$a_html[0].'</table>';
	}
	else {
		$regex = "#/stream-(.*?).mp4#";

		preg_match($regex, $html, $out);

		$res = 'http://www.anime-ultime.net'.$out[0];
	}
	
?>

<html>
<head>
	<meta charset="utf-8">
</head>
<body>
<?php
	echo $res;
?>
</body>
</html>