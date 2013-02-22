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
	$html = mb_convert_encoding( $html, 'utf-8', 'iso-8859-1');

	if( $_POST['type'] != 'episode'){
		$regex = "#(Synopsis)(.*?)(Source)#";

		$a_html = explode('Synopsis:', $html);
		$a_html = explode('Source:', $a_html[1]);

		$info = '<div id="synopsis">'.str_replace('style="color: #0040FF"', '', str_replace('<strong>', '', $a_html[0])).'</div>';

		$a_html = explode('<table class="jtable" align="center" cellspacing="0"  cellpadding="1">', $html);
		$a_html = explode('</table>', $a_html[1]);
	
		$res = '<html><head><meta charset="utf-8"></head><body>';
	 	$res .= $info.'<table class="table">'.preg_replace('<img src="themes/V4/img/arrow-dl.jpg" />', '', $a_html[0]).'</table>';
	 	$res .= '</body></html>';
	}
	else {
		$regex = "#/stream-(.*?).mp4#";

		preg_match($regex, $html, $out);

		$res = 'http://www.anime-ultime.net'.$out[0];
	}
	
	echo $res;
?>
