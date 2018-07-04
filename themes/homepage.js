//by Michalis Tzikas
//thanks to www.webhoster.gr & www.michalistzikas.com
//27-04-2011
//v1.3
//web site: http://www.jquery.gr/introtzikas
/*
Copyright (C) 2011 by Michalis Tzikas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function( $ ){
  $.fn.introtzikas = function(options) {

		var defaults = {
			line   : '#F00',
			speedwidth	 : 2000,
			speedheight	 : 1000,
			speedopacity : 800,
			bg : '#333',
			lineheight : 2
		};
		var options = $.extend(defaults, options);

  		$('iframe').hide();
		$('body').css('overflow-y','hidden');
		$('<div class="introtzikas_bg" style="visibility:visible"><div class="introtzikas" style="visibility:visible"></div></div>').appendTo('body');

  		$('.introtzikas_bg').css('background-color',options.bg);
  		$('.introtzikas_bg').css('position','fixed');
  		$('.introtzikas_bg').css('height','100%');
  		$('.introtzikas_bg').css('width','100%');
  		$('.introtzikas_bg').css('top','0');
  		$('.introtzikas_bg').css('left','0');
  		$('.introtzikas_bg').css('visibility','visible');

		$('body').css('visibility','hidden');
		$('.introtzikas').css('background-color',options.line);
		$('.introtzikas').css('position','fixed');
		$('.introtzikas').css('top','50%');
		$('.introtzikas').css('height',options.lineheight+'px');
		$('.introtzikas').css('width','0%');
		$('.introtzikas').css('visibility','visible');
		$('.introtzikas').animate({
			width: '+=100%'
		  }, options.speedwidth, function() {
				$('.introtzikas').animate({
					height: '+=100%',
					top: '-=50%'
				  }, options.speedheight, function() {
					  	$('body').attr('style','');
						$('body').css('visibility','visible');
						$('.introtzikas_bg').css('visibility','hidden');
						$('.introtzikas').animate({
							opacity: 0
						  }, options.speedopacity, function(){
							  $('.introtzikas_bg').remove();
							  $('iframe').show();
							  $('body').css('overflow-y','visible');

						  });

				  });

		  });
  };
})( jQuery );


var height, width, color; // setting up variable to work with HTML tags


// When size is submitted by the user, call makeGrid()
$('#sizePicker').submit(function (event) {

	event.preventDefault();

	height = $('#inputHeight').val(); // it will draw user's input vertically
	width = $('#inputWeight').val();  // it will draw user's input  horizontally
	makeGrid(height, width);
	// console.log('Height ' + height + 'and width: ' + width); // this is how we can test code using console before calling function

});

function makeGrid(x, y) {
	$('tr').remove(); // once we hit submit button we can now remove previous grid targeting any table rows

// Your code goes here!

            for (var i = 1; i <=x; i ++) {     // building square figure formation using nested for loop
            	$('#pixelCanvas').append('<tr id=table' + i + '></tr>');
            	for (var j = 1; j <=y; j++){
            		$('#table' +i).append('<td></td>')
            	}
            }


// Adding color which gets applied into cell based on user's interaction
	$('td').click(function addColor(){
		color = $('#colorPicker').val();

		if ($(this).attr('style')){
		    $(this).removeAttr('style')
		}else {
			$(this).attr('style', 'background-color:' + color);
		}
	})
}

// opening page animation
$().introtzikas({
   line: '#C80000',
   speedwidth: 2000,
   speedheight: 1000,
   bg: ' #181818',
   lineheight: 2
});


// animating letter
var $a = $('h1');

$a.blast({
      delimiter: "letter"
   })
   .velocity("transition.fadeIn", {
      display: null,
      stagger: 400,
      delay: 800,
      duration: 1000,
      complete: function() {
         $a.blast(false),
            $a.css({
               'color':  '#a50b5e '
            }, 100);
      }
   });






       	 //CLOCK
       	var myVar = setInterval(function(){ myTimer() }, 1000);
       	function myTimer() {
       	    var d = new Date();
       	    var t = d.toLocaleTimeString();
       	    document.getElementById("ftime").innerHTML = t;
       	}
       	function myStopFunction() {
       	    clearInterval(myVar);
       	}
