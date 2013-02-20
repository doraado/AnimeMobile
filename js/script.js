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
	var o_animes = o_animes || [];

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

			if( o_animes.length > 1 ){
				$(this).html('<img id="loader" src="img/loader.gif">');

				print_list(o_animes);
				open_anime();
			}
			else {
				$content.load("getAnimes.php", { href : href, type:type}, function(res) {
					$(this).html(res).hide();

					$('table tr:first').remove();

					$('table tr').each(function(k,elm){
						var img = $(elm).find('img').attr('data-href');
						var titre = $(elm).find('a').text();
						var new_href = 'http://www.anime-ultime.net/'+$(elm).find('a').attr('href');
						
						o_animes.push({
							'titre' : titre,
							'lien' 	: new_href,
							'img' 	: 'url('+img+')',
						});
					});

					print_list(o_animes);
					open_anime();
				});	
			}



		});
	});

	function print_list(obj){
		$content.html('').show();
		$.each(obj, function(k, elm){
			var new_elm = '<a class="vignette" href="'+elm.lien+'"><div class="v_titre">'+elm.titre+'</div></a>';
			$content.append( new_elm );
			$content.find('a:last').css('background-image', elm.img );
		});

	}

	function open_anime(){
		var o_anime = o_anime || [];
		var img = false;

		$('a.vignette').on('click', function(e){
			e.preventDefault();
					
			img = $(this).css('background-image');
			href = $(this).attr('href');
			type = 'anime';

			$content.load("getAnimes.php", { href : href, type:type}, function(res) {
		 		$(this).html(res).hide();
				$('table tr:first').remove();
				
				$('table tr').each(function(k, elm){
					var $elm = $(elm).children(':first').next();

					var date = $elm.text();
					var titre = $elm.next().text();
					var lien = $(elm).children(':last').find('a:last').attr('href');
					lien = 'http://www.anime-ultime.net/'+lien;

					o_anime.push({
						titre 	: titre,
						lien 	: lien,
						date 	: date,
						img 	: img,
					});
				});

				print_list(o_anime);

				$('a.vignette').on('click', function(e){
					e.preventDefault();

					href = $(this).attr('href');
                    type = 'episode';

					$content.load("getAnimes.php", { href : href, type:type}, function(res) {
                        $content.html('<div id="myElement">Loading the player...</div>');

						jwplayer("myElement").setup({
							file	: res,
							width	: '100%',
						});

					});
				});
			});
		});
	}

});
