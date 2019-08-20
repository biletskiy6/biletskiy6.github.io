$(function() {

	var preloader = (function () {
		var percentsTotal = 0,
		preloader = $('.preloader-bg');

		var imgPath = $('*').map(function (ndx, element) {
			var background = $(element).css('background-image'),
			img = $(element).is('img'),
			path = '';

			if (background != 'none') {
				path = background.replace('url("', '').replace('")', '');
			}

			if (img) {
				path = $(element).attr('src');
			}

			if (path) return path

		});

		var setPercents = function (total, current) {
			var persents = Math.ceil(current / total * 100);

			// $('.preloader__percents').text(persents + '%');

			if (persents >= 100) {
				preloader.fadeOut();
			}
		}

		var loadImages = function (images) {

			if (!images.length) preloader.fadeOut();

			images.forEach(function (img, i, images) {
				var fakeImage = $('<img>', {
					attr: {
						src: img
					}
				});

				fakeImage.on('load error', function () {
					percentsTotal++;
					setPercents(images.length, percentsTotal);
				});
			});
		}

		return {
			init: function () {
				var imgs = imgPath.toArray();
				loadImages(imgs);
			}
		}
	}());

	var toggleGridProducts = function() {
		function swapProductsForAdaptive() {
			if($(".products-items").hasClass("products-items--gridding")) {
				$(".products__item").each(function(i, el) {
					var $productsTop = $(this)
					.find(".products__item-container")
					.find(".products__item-details")
					.find(".products-top");

					var $productsBottom = $(this)
					.find(".products__item-container")
					.find(".products-bottom")
					$($productsBottom).prepend($productsTop);
				});
			} else {
				$(".products__item").each(function(i, el) {
					var $productsTop = $(this)
					.find(".products__item-container")
					.find(".products-bottom")
					.find(".products-top");
					var $productsBottom = $(this)
					.find(".products__item-container")
					.find(".products__item-details")
					.find('.products__link')
					$($productsBottom).after($productsTop);
				});
			}
		}
		$(".change-layout--grid").on("click", function() {
			$(".products-items").removeClass("products-items--gridding");
			$(".filter-parametrs__reset").removeClass("margin-top-zero");
			swapProductsForAdaptive();
		});
		$(".change-layout--hamburger").on("click", function() {
			$(".products-items").addClass("products-items--gridding");
			$(".filter-parametrs__reset").addClass("margin-top-zero");
			swapProductsForAdaptive();


		});
	}

	var trimContent = function() {
		var size = 230;

		newsContent = $(".products-descr__about"),
		newsText = newsContent.text();


		if(newsText.length > size){
			newsContent.text(newsText.slice(0, size) + ' ...');
		}

	}

	var customRangeSlider = function() {
		$(".js-range-slider").ionRangeSlider({
			type: "double",
			min: 1.99,
			max: 5000,
			from: 1.99,
			to: 4200,
			step: 1
		});
	}

	var starsRaiting = function() {
		$(".stars__item").on("click", function() {
			$(".stars__item").removeClass("selected");
			$(this).addClass('selected');

			switch($(this).data("value")) {
				case 5: $(this).toggleClass("fill-all");
				break;
				case 4: $(this).toggleClass("fill-first-four");
				break;
				case 3: $(this).toggleClass("fill-first-three");
				break;
				case 2: $(this).toggleClass("fill-first-two");
				break;
				case 1: $(this).toggleClass("fill-first");
				break;

			}
		});
	}

	var customSelect = function() {

		$('select').each(function(){
			var $this = $(this), numberOfOptions = $(this).children('option').length;

			$this.addClass('select-hidden'); 
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');

			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option').eq(0).text());

			var $list = $('<ul />', {
				'class': 'select-options'
			}).insertAfter($styledSelect);

			for (var i = 0; i < numberOfOptions; i++) {
				$('<li/>', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val()
				}).appendTo($list);
			}

			var $listItems = $list.children('li');

			$styledSelect.click(function(e) {
				e.stopPropagation();
				$('div.select-styled.active').not(this).each(function(){
					$(this).removeClass('active').next('ul.select-options').hide();
				});
				$(this).toggleClass('active').next('ul.select-options').toggle();
			});

			$listItems.click(function(e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				$list.hide();
        //console.log($this.val());
      });

			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});

		});
	}

	var clickOutsideBlock = function() {
		$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".aside"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0 && div.hasClass("aside--opened") ) { // и не по его дочерним элементам
			div.removeClass('aside--opened');
		$("body").removeClass("shadow");
	}
});

	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".products-sidebar"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0 
			&& !$(".menu-toggle--filters").is(e.target.parentElement) 
		    && div.hasClass('products-sidebar--active')) { // и не по его дочерним элементам
			div.removeClass('products-sidebar--active' );
		$("body").removeClass("shadow");
	}
});
}

var changeLayout = function() {
	$(".change-layout").on("click", function() {
		$(".change-layout").removeClass("change-layout--active");
		$(this).addClass("change-layout--active");
	});
}


var asideToggle = function() {
	$(".aside-toggle").on("click", function() {
		$(".aside").toggleClass('aside--opened').promise().done(function() {
			$(".aside-toggle").toggleClass("aside-toggle--active");
		});

	});

}

var resetFilterParams = function() {
	$(".filter-parametrs__reset").on("click", function() {
		if($(".stars__item").hasClass("selected")) {
			$(".stars__item").removeClass(function(index, className) {
				return (className.match (/(^|\s)fill-\S+/g) || []).join(' ');
			});
		}
	});
}

preloader.init();
svg4everybody();
trimContent();
toggleGridProducts();
customRangeSlider();
starsRaiting();
clickOutsideBlock();
changeLayout();
asideToggle();
resetFilterParams();

$("select").niceSelect();

var lazyLoadInstace = new LazyLoad({
	elements_selector: ".lazy"
})

$(".aside-menu__link").on("click", function(e) {
	e.preventDefault();

	if($(this).parent().has(".aside-menu__accordion").length > 0) {
		$(this).parent().toggleClass("rotate90");
		$(this).parent().find(".aside-menu__accordion").slideToggle();
	}
});







$(".menu-toggle--sidebar").on("click", function() {
	$(".aside").addClass("aside--opened");
	$("body").addClass("shadow");
});





$(".menu-toggle--filters").on("click", function() {
	$(".products-sidebar").toggleClass("products-sidebar--active");

	$("body").toggleClass("shadow");
});

$(".aside-close").on("click", function() {
	$(".aside").removeClass("aside--opened");
	$("body").removeClass("shadow");
});

$(".filter-parametrs-i .slider-navigation").append($(".irs-single"));


$(".search-form").on("submit", function(e) {
	e.preventDefault();
});

$(window).resize(function() {
	var $window = $(window);
	// && !$(".aside").hasClass("aside--opened")
	if($window.width() > 1500) {
		$(".aside").removeClass("aside--opened");
		if(!$(".aside").hasClass("aside--opened") && $("body").hasClass("shadow")) {
			$("body").removeClass("shadow");
		}
		// $("body").removeClass("shadow");
	}
		if($window.width() > 1250 && $(window).width() < 1500) {
		$(".products-sidebar").removeClass("products-sidebar--active");
		if(!$(".products-sidebar").hasClass("products-sidebar--active") && $("body").hasClass("shadow")) {
			$("body").removeClass("shadow");
		}
		// $("body").removeClass("shadow");
	}

});

});



