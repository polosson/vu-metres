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

Créé le : 27 mai 2016, 16:10:24
*/
'use strict';

var vumetres = angular.module('vumetres', []);

vumetres.directive('vumetre', ['$interval', function($interval){

	function link (scope, elem, attrs) {

		var opts = {
			speed: 400,
			withText: true,
			height: "300px",
			width: false,
			randomize: false
		}

		if (angular.isDefined(attrs.speed))
			opts.speed = parseInt(attrs.speed);
		if (angular.isDefined(attrs.withText))
			opts.withText = (attrs.withText === 'true');
		if (angular.isDefined(attrs.height))
			opts.height = attrs.height;
		if (angular.isDefined(attrs.width))
			opts.width = attrs.width;
		if (angular.isDefined(attrs.randomize))
			opts.randomize = (attrs.randomize === 'true');

		var title = (opts.randomize) ? 'title="click to randomize"' : '';

		elem.html('<div class="vu-metre" style="height: '+opts.height+';" '+title+'><div class="vu-mask"></div></div><div class="vu-label"></div>');

		var vu 		= angular.element((elem.children())[0]);
		var mask 	= vu.children();
		var label 	= angular.element((elem.children())[1]);

		if (opts.width)
			vu.css('width', opts.width);


		function changeVu(value) {
			if (typeof elem.animate === 'function')
				mask.animate({height: (100-value)+'%'}, opts.speed, 'linear');
			else
				mask.css('height', (100-value)+'%');

			if (opts.withText)
				label.text(value+'%');
		};


		// Special for Angular: animate the vu-metre value randomly by clicking it
		if (opts.randomize) {
	  		var itvId = null;
	  		elem.on('click', function() {
	  			if (itvId != null) {
	      			$interval.cancel(itvId);
	      			itvId = null;
	      			return;
	  			}
		  		itvId = $interval(function(){
					var rnd = Math.floor((Math.random() * 100) + 1);
					changeVu(rnd);
				}, opts.speed+10);
		  	});
	  	}

    	changeVu(attrs.percent);
	};

	return{
		restrict: 'E',
		link: link
	}
}]);