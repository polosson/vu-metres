/*
    Created on : 27 mai 2016, 11:36:43
    Author     : polosson
*/


(function($) {
	$.fn.vumetre = function(options, update){
		// Multiple element support
		if (this.length > 1){
			this.each(function(){
				$(this).vumetre(options);
			});
			return this;
		}

		var defaults = {
			"speed": 500,
			"withText": true,
			"height": "300px",
			"width": false
		};
		var opts = $.extend({}, defaults, options);

		var val  = $(this).attr('percent');
		var mask = $('<div class="vu-mask" />');

		$(this).html('').addClass("vu-metre").css("height", opts.height);
		$(this).parent().find('.vu-label').remove();
		if (opts.width)
			$(this).css('width', opts.width);

		$(this).append(mask);
		if (opts.withText)
			$(this).parent().append('<div class="vu-label">'+val+'%</div>');
		$(this).find('.vu-mask').animate({height: (100-val)+'%'}, opts.speed);

		return this;
	};
}(jQuery)); 
