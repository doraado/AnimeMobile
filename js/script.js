jQuery(function($){
	/**
	* DOM vars
	*/
	var $content = $('#content');
	var $btn_navbar = $('#btn_navbar');
	var href;
	var type;

	var root = '/';

	var o_datas = [];

	// Nombres de vignettes à afficher
	var nb_resultats = get_max_vignette();

	/**
	 * Retour à l'acceuil 
	 */
	$('.brand').click(function(event){
		console.log($('#main_menu'));
		if($('#main_menu')!="undefined"){
			event.preventDefault();
			$('#main_menu').fadeIn();
			$('#form-search').hide();
			erase_result();
		}
	});
	
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
		else if(val.length == 0){
			erase_result();
			print_page(o_datas, 0, nb_resultats);
		}
		else{
			$(this).parent().parent().find('p').remove();
			$(this).parent().after('<p>Saisis au moins 2 lettres</p>');
		}
	});

	$('#btn_search_init').click(function(){
		$('#search_input').val('').trigger('keyup');
	});

	$('#btn_search').click(function(){
		var input = $('#search_input');
		var val = input.val();

		var regexp = '\\b(.*)('+val+')(.*)\\b';

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
		}
	});

	/**
	* Menu
	*/
	$('#clear').click(function(event){
		event.preventDefault();
		localStorage.clear();
		$('#btn_navbar').trigger('click');
	});
	
	$('#main_menu .item').click( function(event){
		event.preventDefault();
		
		var $item = $(this);
		var name = $(this).attr('data-action');
		var href = $(this).attr('data-href');

		$(this).parent().hide();
		$('#form-search').show();
		$('h3.titre').remove();

		switch(name){
			case 'News' : 
				$('.form_search').hide();
				loader();
				
				var o_news = [];

				$('#temp').load(root+"getLastest.php", function(res) {	
					var $table = res;
					$(this).html($table);
					$('table tr:first').remove();

					$('table tr').each(function(k,elm){
						var img = $(elm).find('a:first').attr('onmouseover');
						var titre = $(elm).find('a:first').text();
						var href = $(elm).find('a:first').attr('href');

						var type = $(elm).find('td:first').next().next().next().next().text();
						var number = $(elm).find('td:first').next().next().text();

						img = img.replace("montre('<img src=..", 'http://www.anime-ultime.net');
						img = img.replace("/>');", '');
						img = img.replace("></a>');", '');

						if(href!='undefined' && type!='OST'){
							var new_href = 'http://www.anime-ultime.net/'+href;
											
							o_news.push({
								'type' : type+' '+number,
								'titre' : titre,
								'lien' 	: new_href,
								'img' 	: 'url('+img+')',
							});	
						}
					});

					remove_loader();
					print_page(o_news, 0, 17);
				});
				break;
				
			case 'Animes':
			case 'Dramas':
			case 'Tokusatsus':
				$('.form_search').show();
				o_datas = [];

				/**
				* Récupération des animes depuis un site distant
				*/
				if(typeof localStorage[name]=='undefined' ) {
					
					loader();
						
					$('#temp').load(root+"getAnimes.php", { href : href, type:name}, function(res) {	
						var $table = res;

						$(this).html($table);
						
						$('.table tr:first').remove();

						var total = $('.table tr').length;

						$('.table tr').each(function(k,elm){
							$(this).find('td:first').remove();

							var img = $(elm).find('a').attr('onMouseOver');
							var titre = $(elm).find('a').text();
							var href = $(elm).find('a').attr('href');

							var type = $(elm).find('td:first').next().text();
							var avancement = $(elm).find('td:first').next().next().text();
	
							img = img.replace("montre('<img src=", '');
							img = img.replace("></a>');", '');

							if(href!='undefined'){
								var new_href = 'http://www.anime-ultime.net/'+href;
											
								o_datas.push({
									'type' : type+' '+avancement,
									'titre' : titre,
									'lien' 	: new_href,
									'img' 	: 'url('+img+')',
								});	
							}

							if( $('.table tr').length - 1 == k ) {
								localStorage[name] = JSON.stringify(o_datas);
								remove_loader();
							}

							/**
							* Calcul pourcentage
							*/
							var pourcentage = 100*k/total;
							$('#loader p span').remove();
							$('#loader p').append(' <span id="pourcentage">'+pourcentage+' %</span>');
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
			var new_elm = '<a class="vignette" href="'+elm.lien+'">';

			if(elm.type){
				new_elm += '<div class="type">'+elm.type+'</div>';
			} 

			new_elm += '<div class="v_titre">'+elm.titre+'</div></a>';

			if(elm.lien != 'http://www.anime-ultime.net/undefined') $('#search_result').append( new_elm );
			$('#search_result').find('a:last').css('background-image', elm.img );
		});
	}

	function load_modal(title, body, type){
		$('#modal-title').text(title);
		$('#modal-body').html(body);

		if(type == 'video'){
			$('#modal-footer').html('<p>Si la vidéo ne se lit pas <button class="btn btn-mini btn-inverse" id="btn_qt">Clicker ici </button> Bon visionnage !</p>');
		}
		else{
			$('#modal-footer').html('<a id ="access_video" class="item">Accéder aux vidéos</a><a id ="next_vignette" class="item">Suivant</a>');
		}

		$('#modal-body span').css({
			color : '#BBB',
		});

		$('#info_modal').modal();
	}

	function close_modal(){
		$('#info_modal').modal('hide');
	}

	function open_anime(){
		var o_anime = [];
		var img = false;

		$('a.vignette').on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			var anime_titre = $this.find('.v_titre').text();
			
			href = $this.attr('href');
			if(href=="undefined") return;

			img = $this.css('background-image');
			type = 'anime';

			$('#temp').load(root+"getAnimes.php", { href : href, type:type}, function(res) {
				o_anime = [];
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
			var synopsis = $('#synopsis').html();
			
			var s_img = '<img src='+img.replace('url(', '').replace(')', '')+' class="anime_img">';

			if(synopsis.length == 0) synopsis = '<br>Information non disponible.'; 
			
			load_modal(anime_titre, s_img+'<p>'+synopsis+'</p>', 'synopsis');

			/**
			* Bouton next anime
			*/
			$('#next_vignette').on('click', function(){
				var $next = $this.next();

				$next.trigger('click');
				
				if( $next.attr('href') == 'undefined') {
					$('a.vignette:first').trigger('click');
				}

			});

			$('#access_video').on('click', function(){
				erase_result();
				close_modal();

				$('.form_search').hide();
				loader();

				$('h3.titre').remove();
				$('#search_result').before('<h3 class="titre">'+anime_titre+'</h3>').show();

					print_list(o_anime);
					remove_loader();

					$('a.vignette').on('click', function(e){
						e.preventDefault();
						console.log($(this).hasClass('unselected').toString());
						if( $(this).hasClass('selected').toString() == 'false' ){
							loader();

							$(this).removeClass('unselected').addClass('selected').siblings().removeClass('selected').addClass('unselected');

							titre = $(this).text();
							href = $(this).attr('href');
		                    type = 'episode';

		                    $('#div_player').remove();

							$("#temp").load(root+"getAnimes.php", { href : href, type:type}, function(res) {
								var $player = '<div id="player">Chargement du lecteur...</div>';

								$.post('dl.php', {link : res, name : titre});

								load_modal(titre, $player, 'video');

								jwplayer("player").setup({
									file	: res,
									height	: '90%',
									width 	: '100%',
									provider  : 'http',
								});

								$('#btn_qt').on('click', function(){
									$player = '<EMBED id="player" src="'+res+'" allowfullscreen="true" scale="tofit" WIDTH="100%" HEIGHT="99%" AUTOPLAY="true" CONTROLLER="true" PLUGINSPAGE="http://www.apple.com/quicktime/download/"></EMBED>';
    
									load_modal(titre, $player, 'video');
								});
								

								remove_loader();
							});
						}
						else{
							$('#info_modal').modal();
						}
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

	function get_max_vignette(){
		var footer = $('footer').height();
		var navbar = $('.navbar').height();
		var form = $('.form_search').height();

		var max_vignette=6;

		var vignette = 106;

		if (document.body && document.body.offsetWidth) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
		if (document.compatMode=='CSS1Compat' &&
		    document.documentElement &&
		    document.documentElement.offsetWidth ) {
			winW = document.documentElement.offsetWidth;
			winH = document.documentElement.offsetHeight;
		}
		if (window.innerWidth && window.innerHeight) {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}

		winW -= (40+100);
		winH -= (footer+navbar+form);

		var res = (Math.floor(winH/vignette)-1) * Math.round(winW/vignette);

		if(max_vignette>res){
			res = max_vignette;
		}

		return res-1;
	}
});
	
