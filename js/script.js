jQuery(function($){
	/**
	* DOM vars
	*/
	var $content = $('#content');
	var $btn_navbar = $('#btn_navbar');
	var href;
	var type;

	/**
	* Buffers
	*/
	var $Animes = false;

	/**
	* Get Animes
	*/
	$('#btn_animes').click(function(){
		$btn_navbar.trigger('click');
		$content.fadeOut(function(){
			$(this).html('<img id="loader" src="img/loader.gif">');
			$(this).show();

			type = 'all';
			href = 'http://www.anime-ultime.net/series-0-1/anime/0---#principal';

			if( $Animes ){
				$(this).html('<img id="loader" src="img/loader.gif">');
				$(this).delay(2000).html($Animes);

				$('table a').on('click', function(e){
					e.preventDefault();
								
					href = $(this).attr('href');
					type = 'anime';
						
					$content.load("getAnimes.php", { href : href, type:type}, function(res) {
						console.log(res);
				 		$(this).html(res);

						$('table tr:first').remove();
					});
				});
			}
			else {
				$content.delay(2000).load("getAnimes.php", { href : href, type:type}, function(res) {
					$Animes = res;

					$(this).html($Animes);

					$('img.lazy').parent().parent().remove();
					$('table tr:first').remove();
					$('table a').each(function(k,elm){
						var href = 'http://www.anime-ultime.net/'+$(elm).attr('href');
						$(elm).attr('href', href);
					});

					$Animes = $(this).html();

					$('table a').on('click', function(e){
						e.preventDefault();
								
						href = $(this).attr('href');
						type = 'anime';
						
						$content.load("getAnimes.php", { href : href, type:type}, function(res) {
							console.log(res);
					 		$(this).html(res);

							$('table tr:first').remove();
						});
					});
				});	
			}


		});
	});


});