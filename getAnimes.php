<?php 
	require_once 'app/simple_html_dom.php';

 	$site = $_POST['href'];

 	ob_start();

 	include $site;

 	$html = ob_get_clean();

 	$a_html = explode('<body>', $html);
 	$a_html = explode('</body>', $a_html[1]);
	$a_html = explode('<table class="jtable" align="center" cellspacing="0"  cellpadding="1">', $a_html[0]);
	$a_html = explode('</table>', $a_html[1]);

 	$html = '<table class="jtable" align="center" cellspacing="0"  cellpadding="1">'.$a_html[0].'</table>';

 	$html = str_replace('<table', '<table class="table"', $html);
 	

 	echo $html;
 ?>