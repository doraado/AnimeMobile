<?php 
	set_time_limit(0);
	require_once 'Zend/Loader.php'; 
	Zend_Loader::loadClass('Zend_Gdata_YouTube');
	Zend_Loader::loadClass('Zend_Gdata_AuthSub');

	$key = 'AIzaSyCxgPUZRCAc854zRs__tg6jYgqkm3OUADQ';

	session_start();

	if(isset($_SESSION['YouTubetoken'])){
		$token = $_SESSION['YouTubetoken'];
	}
	else{
		if(!isset($_GET['token'])){
			$next = "http://109.232.235.200/AnimeMobile/upload.php";
			$scope = "http://gdata.YouTube.com";
			$secure = false;
			$session = true;

			header('Location:'.Zend_Gdata_AuthSub::getAuthSubTokenUri($next, $scope, $secure, $session));
		}
		else{
			//$token = $_GET['token'];
			$token = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
			$_SESSION['YouTubetoken'] = $token;
		}	
	}

	$httpClient = Zend_Gdata_AuthSub::getHttpClient($token);
	
	$yt = new Zend_Gdata_YouTube($httpClient, 'Anime On Mobile', null, $key);

	$source = $yt->newMediaFileSource('video/009-1_01_vostfr_.mp4');
	$source->setContentType('video/mp4');
	$source->setSlug('009-1_01_vostfr_.mp4');

	$video = new Zend_Gdata_YouTube_VideoEntry();
	$video->setMediaSource($source);
	$video->setVideoTitle('009-1_01_vostfr_');
	$video->setVideoDescription('009-1_01_vostfr_ upload by Anime on Mobile');
	$video->setVideoCategory('Divertissement');
	$video->setVideoTags('anime, manga, 009-1, 01, vostfr');
	$video->setVideoPrivate();

	$url_upload = 'http://uploads.gdata.YouTube.com/feeds/api/users/default/uploads';

	try{
		$newEntry = $yt->insertEntry($video, $url_upload, 'Zend_Gdata_YouTube_VideoEntry');

		die($newEntry->getVideoId());
	}catch(Zend_Gdata_App_HttpException $e){
		die($e->getMessage());
	}catch(Zend_Gdata_App_Exception $e){
		die($e->getMessage());
	}

?>