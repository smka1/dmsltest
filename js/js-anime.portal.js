$(window).on('load',function(){
	YOUTUBE.play();
})
function _c(l){
	console.log(l);
}

$(window).on("load",function(){
	$("body").addClass("is_open");
	setTimeout(function(){
		NES.init();
	},1800)

////////////////////katanakaji
	$(".vis_slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
		fade:true,
		speed: 800,
		autoplaySpeed: 5000,
		 cssEase: 'cubic-bezier(0.5, 1, 0.89, 1)',
	});

	var num = Math.floor( Math.random() * 2 );
	$('.vis_slider').slick('slickGoTo', num, false);

})
$(window).on('scroll',function(){
	var st = $(window).scrollTop();
	if(st < 40){
		$(".header_contents").css({paddingTop:40-st});
	}
})

var NES = {
	timer: '',
	speed: 5,
	count : 1,
	init : function(){
		var _this = this;
		setInterval(function(){
			$(".news_area").find(".news_list__item").css({top: (_this.count%3) * -20 })
			_this.count++;
		},_this.speed * 1000)
	}
}

var YOUTUBE = {
	player: undefined,
	videoId: '',
	state: {
		playing: false
	},
	event: function event() {
		var _this = this;
		$(".movie_wrap").click(function(){
			_this.videoId = $(this).data("youtube");
			if(_this.videoId){
				$(this).addClass("is_play");
				if (_this.player != undefined) {
					_this.player.loadVideoById(_this.videoId )
				}
			}
		})
	},
	play: function play() {
		var _this = this;

		_this.player = new YT.Player('movie_player', {
			videoId: _this.videoId,
			playerVars: {
				playsinline: 1,
				autoplay: 1,
				enablejsapi: 1
			},
			events: {
				'onReady': _this.onPlayerReady,
				'onStateChange': _this.onStateChange,
			}
		});

		_this.event();
	},
	stop : function(){
		var _this = this;
		if (_this.player != undefined) {
			_this.player.stopVideo();
		}
	},
	onPlayerReady: function onPlayerReady(e) {
		e.target.playVideo();
	},
	onStateChange: function onStateChange(event) {
		var status = event.data;
		if(status == 0){
			$(".movie_wrap").removeClass("is_play");
		}
	}
};


var Cursor = {
	config: {
		area: '.js-cursor',
		point: '.js-cursor-point',
		bg: '.js-cursor-bg'
	},
	state: {
		pointer: {
			x: 0,
			y: 0
		},
		mouse: {
			x: 0,
			y: 0
		}
	},
	timer: undefined,
	set: function set() {
		var _this1 = this;
		window.requestAnimationFrame(function () {
			_this1.state.pointer.y += _this1.state.mouse.y - _this1.state.pointer.y;
			_this1.state.pointer.x += _this1.state.mouse.x - _this1.state.pointer.x;
			$(_this1.config.point).css({
				transform: "translate(".concat(_this1.state.pointer.x, "px,").concat(_this1.state.pointer.y, "px)")
			});
			$(_this1.config.bg).css({
				transform: "translate(".concat(_this1.state.pointer.x, "px,").concat(_this1.state.pointer.y, "px)")
			});
			_this1.set();
		});
	},
	event: function event() {
		var _this2 = this;

		$(window).on('mousemove', function (e) {
			clearTimeout(_this2.timer);
			$(_this2.config.area).removeClass('is-hide');
			_this2.state.mouse.x = e.clientX;
			_this2.state.mouse.y = e.clientY;
			_this2.timer = setTimeout(function () {
				$(_this2.config.area).addClass('is-hide');
			}, 10000);
		});
		$(document).on('mouseenter', '[data-pointer],[data-youtube],a', function () {
			$(_this2.config.area).addClass('is-scope');
		});
		$(document).on('mouseleave', '[data-pointer],[data-youtube],a', function () {
			$(_this2.config.area).removeClass('is-scope');
		});
		$(document).on('mouseenter', 'iframe', function () {
			$(_this2.config.area).addClass('is-on-iframe');
		});
		$(document).on('mouseleave', 'iframe', function () {
			$(_this2.config.area).removeClass('is-on-iframe');
		});
	},
	init: function init() {
		$(this.config.area).addClass('is-hide');
		this.set();
		this.event();
	}
};
Cursor.init();