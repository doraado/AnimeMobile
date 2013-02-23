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
		$site = 'http://www.anime-ultime.net/index-0-1#principal';
	}

	$html = file_get_contents( $site, false, $context ); 
	$html = mb_convert_encoding( $html, 'utf-8', 'iso-8859-1');

	$a_html = explode('<table class="jtable" align="center" cellspacing="0" cellpadding="1" style="width:700px;">', $html);
	$a_html = explode('</table>', $a_html[1]);

	$res = '<html><head><meta charset="utf-8"></head><body>';
	$res .= '<table class="table">'.preg_replace('<img src="themes/V4/img/arrow-dl.jpg" />', '', $a_html[0]).'</table>';
	$res .= '</body></html>';
	
	echo $res;
?>
