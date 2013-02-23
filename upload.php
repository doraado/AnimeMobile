<?php 
	set_time_limit(0);
	require_once 'Zend/loader.php'; 
	Zend_Loader::loadClass('Zend_Gdata_Youtube');
	Zend_Loader::loadClass('Zend_Gdata_AuthSub');

	$key = 'AIzaSyCxgPUZRCAc854zRs__tg6jYgqkm3OUADQ';

	session_start();

	if(isset($_SESSION['youtubetoken'])){
		$token = $_SESSION['youtubetoken'];
	}
	else{
		if(!isset($_GET['token'])){
			$next = "http://127.0.0.1/AnimeMobile/upload.php";
			$scope = "http://gdata.youtube.com";
			$secure = false;
			$session = true;

			header('Location:'.Zend_Gdata_AuthSub::getAuthSubTokenUri($next, $scope, $secure, $session));
		}
		else{
			$token = $_GET['token'];
			//$token = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
			$_SESSION['youtubetoken'] = $token;
		}	
	}

	$httpClient = Zend_Gdata_AuthSub::getHttpClient($token);
	
	$yt = new Zend_Gdata_Youtube($httpClient, 'Anime On Mobile', null, $key);

	$source = $yt->newMediaFileSource('video/009-1_01_vostfr_.mp4');
	$source->setContentType('video/mp4');
	$source->setSlug('009-1_01_vostfr_.mp4');

	$video = new Zend_Gdata_Youtube_VideoEntry();
	$video->setMediaSource($source);
	$video->setVideoTitle('009-1_01_vostfr_');
	$video->setVideoDescription('009-1_01_vostfr_ upload by Anime on Mobile');
	$video->setVideoCategory('Divertissement');
	$video->setVideoTags('anime, manga, 009-1, 01, vostfr');
	$video->setVideoPrivate();

	$url_upload = 'http://uploads.gdata.youtube.com/feeds/api/users/default/uploads';

	try{
		$newEntry = $yt->insertEntry($video, $url_upload, 'Zend_Gdata_Youtube_VideoEntry');

		die($newEntry->getVideoId());
	}catch(Zend_Gdata_App_HttpException $e){
		die($e->getMessage());
	}catch(Zend_Gdata_App_Exception $e){
		die($e->getMessage());
	}

?>