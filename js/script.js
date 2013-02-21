jQuery(function($){
	/**
	* DOM vars
	*/
	var $content = $('#content');
	var $btn_navbar = $('#btn_navbar');
	var href;
	var type;

	var root = '/AnimeMobile/';
	var nb_resultats = 7;

	/**
	* Buffers
	*/
	var o_datas = [];

	/**
	* Recherche
	*/
	$('#search_input').keyup(function(){
		$('h3.titre').remove();

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

			$.each(o_datas, function( k, v){
				var titre = v.titre;

				var resultats = titre.match(new RegExp(regexp, 'i'));
				
				if(resultats) res_animes.push(v);
			});

			erase_result();
			print_page(res_animes, 0, nb_resultats);
			//open_anime();
		}
		else{
			$(this).parent().parent().find('p').remove();
			$(this).parent().after('<p>Saisis au moins 2 lettres</p>');
		}
		 
	});

	/**
	* Main Menu
	*/
	$('#main_menu .item').click( function(event){
		event.preventDefault();
		
		var $item = $(this);
		var name = $(this).attr('data-action');
		var href = $(this).attr('data-href');
		
		switch(name){
			case 'News' : 
				$.get('news.php', function(res){
					$content.html(res);
				});
				break;
				
			case 'Animes':
			case 'Dramas':
			case 'Tokusatsus':
				$(this).siblings().hide();

				$('.form-search').show();
				$('#form-search').show();

				/**
				* Récupération des animes depuis un site distant
				*/
				if(typeof localStorage[name]=='undefined' ) {
					
					loader();
						
					$('#temp').load(root+"getAnimes.php", { href : href, type:name}, function(res) {	
						var $table = res;

						$(this).html($table);
						
						$('table tr:first').remove();

						$('table tr').each(function(k,elm){
							var img = $(elm).find('img').attr('data-href');
							var titre = $(elm).find('a').text();
							var new_href = 'http://www.anime-ultime.net/'+$(elm).find('a').attr('href');
										
							o_datas.push({
								'titre' : titre,
								'lien' 	: new_href,
								'img' 	: 'url('+img+')',
							});

							if( $('table tr').length - 1 == k ) {
								localStorage[name] = JSON.stringify(o_datas);
								remove_loader();
							}
						});
						$item.text(name+' ('+o_datas.length+')' );
						print_page(o_datas, 0, nb_resultats);
					});		
				}
				else{
					o_datas = JSON.parse(localStorage[name]);
					$item.text(name+' ('+o_datas.length+')' );
					print_page(o_datas, 0, nb_resultats);
				}

				break;
		}
	});

	/**
	* Fonctions
	*/
	function format_url(str){
		var a = str.trim().split(' ');

		return a.join('-');
	}

	function loader(){
		$content.fadeOut();
		$content.before('<div id="loader"><p>Chargement des données ...</p><img src="/AnimeMobile/img/loader.gif"></div>');
	}

	function remove_loader(){
		if($('#loader')) $('#loader').remove();
		$content.fadeIn();
	}

	function print_list(obj){
		$.each(obj, function(k, elm){
			var new_elm = '<a class="vignette" href="'+elm.lien+'"><div class="v_titre">'+elm.titre+'</div></a>';
			$('#search_result').append( new_elm );
			$('#search_result').find('a:last').css('background-image', elm.img );
		});
	}

	function open_anime(){
		var o_anime = [];
		var img = false;

		$('a.vignette').on('click', function(e){
			e.preventDefault();
			erase_result();
			href = $(this).attr('href');

			if(href=="undefined") return;
			
			$('.form-search').hide();
			loader();

			$('h3.titre').remove();
			$('#search_result').before('<h3 class="titre">'+$(this).text()+'</h3>').show();

			//history.pushState({action : 'liste_episodes'}, 'Liste des animes', '/AnimeMobile/Liste_Animes/'+format_url($(this).text()));

			img = $(this).css('background-image');
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

                    $('#div_player').remove();

					$("#temp").load(root+"getAnimes.php", { href : href, type:type}, function(res) {
						$('#search_result').append('<div id="div_player"><h3 class="titre">'+titre+'</h3><div id="player">Chargement du lecteur...</div></div>');

						jwplayer("player").setup({
							file	: res,
							width	: '100%',
						});

						remove_loader();
					});
				});
			});
		});
	}

	function erase_result(){
		$('#search_result').html('');
	}

	function print_page(obj, index, size){
		var obj_buffer = obj;
		var o_page = [];
		var next = index + size;

		o_page = slice_obj(obj_buffer, index, size);
		
		if(o_page.length == size) o_page.push({titre:'Suite...'});
		
		erase_result();

		print_list(o_page);
		open_anime();

		$('a[href="undefined"]').on('click', function(event){
			event.preventDefault();

			print_page(obj_buffer, next, size);
		});
	}

	function slice_obj(obj, index, size){
		return obj.slice(index, index+size);
	}
});
