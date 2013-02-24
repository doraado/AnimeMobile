<?php 
	$name = $_POST['name'];
	$a_name = explode(' ', $name);
	$name = implode('_', $a_name);

	$tps = date('d-m-Y h:m');



	$link = $_POST['link'];

	$dest = 'video/'.$name.'.mp4';

	$fp = fopen('hist.txt', 'r+');
	$hist = stream_get_contents($fp);
	fclose($fp);

	$fp = fopen('hist.txt', 'w+');
	fwrite($fp, "$tps === $name\r\n$hist");
	fclose($fp);

	$videos = scandir('video/');

	if($videos > 21) exit;

	if(file_exists($dest)) exit;
	
	$cmd = "wget \"$link\" -O \"$dest\"";
	exec($cmd);
?>