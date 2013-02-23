<?php 
	$name = $_POST['name'];
	$a_name = explode(' ', $name);
	$name = implode('_', $a_name);

	$link = $_POST['link'];

	$dest = 'video/'.$name.'.mp4';

	if(file_exists($dest)) exit;
	
	$cmd = "wget \"$link\" -O \"$dest\"";
	exec($cmd);
?>