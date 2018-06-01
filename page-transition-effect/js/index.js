$(function() {
   var w = $(window).width();
   var h = $(window).height();

   var duration = 2000,
      el = $(".contents"),
      elem = $(".contents .content");

   elem.eq(0).addClass("z-index");

   contentl = elem.length;
   el.css({
      width: w * contentl + "px",
      height: w * contentl + "px",
      "margin-left": "-" + ((w * contentl) / 2) + "px",
      "margin-top": "-" + ((h * 2) + (w * contentl) / 2) + "px",
      "-ms-transform": "rotate(-" + 0 + "deg)",
      "-webkit-transform": "rotate(-" + 0 + "deg)",
      "transform": "rotate(-" + 0 + "deg)"
   })

   elem.css({
      width: w + "px",
      height: h + "px",
      "margin-left": "-" + (w / 2) + "px",
      "margin-top": "-" + (h / 2) + "px"
   })

   for (var i = 0; i < contentl; i++) {
      elem.eq(i).css({
         "-ms-transform": "rotate(" + (i * (360 / contentl)) + "deg) translate(0px,200%)",
         "-webkit-transform": "rotate(" + (i * (360 / contentl)) + "deg) translate(0px,200%)",
         "transform": "rotate(" + (i * (360 / contentl)) + "deg) translate(0px,200%)"
      })
   }

   $("nav a").click(function() {
      var index = $(this).index();
      var d = index * (360 / contentl);

      $("nav a").removeClass("active");
      $(this).addClass("active");

      elem.removeClass("z-index");
      elem.eq(index).addClass("z-index");

      $(el).animate({
         deg: d
      }, {
         duration: duration,
         step: function(now) {
            el.css({
               "-ms-transform": "rotate(-" + now + "deg)",
               "-webkit-transform": "rotate(-" + now + "deg)",
               "transform": "rotate(-" + now + "deg)"
            });
         }
      });

   })

});