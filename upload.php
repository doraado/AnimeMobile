<?php 
//	set_time_limit(0);
	require_once 'Zend/Loader.php'; 
	Zend_Loader::loadClass('Zend_Gdata_YouTube');
	Zend_Loader::loadClass('Zend_Gdata_AuthSub');

//	$key = 'AIzaSyCxgPUZRCAc854zRs__tg6jYgqkm3OUADQ';

	if(isset($_SESSION['ytToken'])){
		$token = $_SESSION['ytToken'];
	}
	else{
		if(!isset($_GET['token'])){
			$next = 'http://127.0.0.1/AnimeMobile/upload.php';
			$scope = 'http://gdata.youtube.com';
			$secure = false;
			$session = true;

			header('Location: '.Zend_Gdata_AuthSub::getAuthSubTokenUri($next, $scope, $secure, $session));		
		}
		else{
			echo $token = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
			$_SESSION['ytToken'] = $token;
		}		
	}

?>