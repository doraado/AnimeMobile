jQuery(function($){
	/**
	* DOM vars
	*/
	var $content = $('#content');
	var $btn_navbar = $('#btn_navbar');
	var href;
	var type;

	var root = '/AnimeMobile/';

	/**
	* Buffers
	*/
	var o_animes = o_animes || [];

	//history.pushState({action : 'home'}, 'Liste des animes', '/AnimeMobile/');

	/**
	* Récupération des animes depuis un site distant
	*/
	type = 'all';
	href = 'http://www.anime-ultime.net/series-0-1/anime/0---#principal';

	if(typeof localStorage['Animes']=='undefined' ) {
		
		loader();
			
		$('#temp').load(root+"getAnimes.php", { href : href, type:type}, function(res) {	
			var $table = res;

			$(this).html($table);
			
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

				if( $('table tr').length - 1 == k ) {
					localStorage['Animes'] = JSON.stringify(o_animes);
					remove_loader();
				}
			});
		});		
	}
	else{
		o_animes = JSON.parse(localStorage['Animes']);
	//	localStorage.clear();
	}

	/**
	* Get Animes
	*/
	$('#btn_animes').click(function(){
		$btn_navbar.trigger('click');
		loader();

		$content.fadeOut(function(){
			print_list( o_animes );
			open_anime();

			remove_loader();
		});

		//history.pushState({action : 'liste_animes'}, 'Liste des animes', '/AnimeMobile/Liste_Animes/');
	});

	/**
	* Fonctions
	*/
	function loader(){
		$content.fadeOut();
		$content.before('<div id="loader"><p>Changement des données ...</p><img src="/AnimeMobile/img/loader.gif"></div>');
	}

	function remove_loader(){
		if($('#loader')) $('#loader').remove();
		$content.fadeIn();
	}

	function print_list(obj){
		//$content.html('').show();
		$.each(obj, function(k, elm){
			var new_elm = '<a class="vignette" href="'+elm.lien+'"><div class="v_titre">'+elm.titre+'</div></a>';
			$content.append( new_elm );
			$content.find('a:last').css('background-image', elm.img );
		});

	}

	function open_anime(){
		var o_anime = [];
		var img = false;

		$('a.vignette').on('click', function(e){
			$content.html('').show();
			loader();
			e.preventDefault();

			$content.html('<h3>'+$(this).text()+'</h3><hr>').show();

			//history.pushState({action : 'liste_episodes'}, 'Liste des animes', '/AnimeMobile/Liste_Animes/'+format_url($(this).text()));

			img = $(this).css('background-image');
			href = $(this).attr('href');
			type = 'anime';

			$('#temp').load(root+"getAnimes.php", { href : href, type:type}, function(res) {
		 		$(this).html(res).hide();
				$('table tr:first').remove();
				
				$('table tr').each(function(k, elm){
					var $elm = $(elm).children(':first').next();

					var lien = $(elm).children(':last').find('a:last').attr('href');
					var date = $elm.text();
					var titre = $elm.next().text();
					lien = 'http://www.anime-ultime.net/'+lien;

					o_anime.push({
						titre 	: titre,
						lien 	: lien,
						date 	: date,
						img 	: img,
					});
					
				});

				print_list(o_anime);
				remove_loader();

				$('a.vignette').on('click', function(e){
					loader();
					e.preventDefault();

					//history.pushState({action : 'episode'}, 'Liste des animes', '/AnimeMobile/Liste_Animes/Episode/'+format_url($(this).text()));

					titre = $(this).text();
					href = $(this).attr('href');
                    			type = 'episode';

					$content.load(root+"getAnimes.php", { href : href, type:type}, function(res) {
						$content.html('<h3>'+titre+'</h3><hr>');
						if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	      					$content.append('<div id="player">Loading the player...</div>');

							jwplayer("player").setup({
								file	: res,
								width	: '100%',
							});
						}
                       				else {
                       					var $player = '<video id="player" class="video-js vjs-default-skin" controls preload="auto" width="100%" data-setup="{}">';
  							$player	+= '<source src="'+res+'" type="video/mp4">';
							$player += '</video><script src="http://vjs.zencdn.net/c/video.js"></script>';

                        				$content.append($player);
                       				}

						remove_loader();
					});
				});
			});
		});
	}

	function format_url(str){
		var a = str.trim().split(' ');

		return a.join('-');
	}

	/**
	* Gestion de l'historique
	*/
/*	window.onpopstate = function(event){
		console.log(event);
		if( e.state != null ){
			
		}
	}*/

	/**
	* Recherche
	*/
	$('#search_input').keyup(function(){
	//	$('#news').parent().remove();

		var input = $(this);
		var val = input.val();

		var regexp = '\\b(.*)';
		for(var i in val){
			regexp +='('+val[i]+')(.*)';
		}
		regexp += '\\b';

		var res_animes = [];

		if(val.length > 1){
			$(this).parent().parent().find('p').remove();
			$(this).parent().parent().parent().siblings().remove();

			$.each(o_animes, function( k, v){
				var titre = v.titre;

				var resultats = titre.match(new RegExp(regexp, 'i'));
				
				if(resultats){
					res_animes.push(v);
				}
			});

			print_list(res_animes);
			open_anime();
		}
		else{
			$(this).parent().parent().find('p').remove();
			$(this).parent().after('<p>Saisis au moins 2 lettres</p>');
			$(this).parent().parent().parent().siblings().remove();
		}
		
		/**
		 * Main Menu
		 */
		$.('#main_menu item').click(function(event){
			event.preventDefault();
			
			var name = $(this).attr('href');
			var link = $(this).attr('data-href');
			
			switch(name){
				case 'news' : 
					$.get('news.php', function(res){
						$content.html(res);
					});
					break;
					
				case 'anime':
					
					break;
				
				case 'drama':
					
					break;
					
				case 'tokusatsu':
					
					break;
			}
		});
		 
	});

	
});
