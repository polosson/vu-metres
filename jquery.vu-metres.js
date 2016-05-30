/*
Copyright ©2016 Polosson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

Créé le : 27 mai 2016, 11:36:42
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
