// Strict Mode
"use strict";

var currentslide = 0;
var prevslide = 0;
var nbslides;
var timer;

// Window Load Event
$(window).on("load", function() {
	// Loader Fade Out
    $(".lx-loader").fadeOut();
    return false;
});

// Document Ready event
$(document).on("ready", function() {
	// Resize Youtube Iframe
	if($("iframe[allowfullscreen]").length){
		$("iframe[allowfullscreen]").height($("iframe[allowfullscreen]").width() * 0.6025);
	}
	// Mini Slide Init
	if($(".lx-mini-slide").length){
		for(var i=0;i<$(".lx-mini-slide").length;i++){
			if(typeof $(".lx-mini-slide").attr("data-width") !== typeof undefined && $(".lx-mini-slide").attr("data-width") !== false){
				if($(window).width() === 768){
					$(".lx-mini-slide:eq("+i+")").parent().css({"width":($(window).width() - 80) + "px"});
					$(".lx-mini-slide:eq("+i+") ul li").css({"width":($(window).width() - 80) + "px"});
					$(".lx-mini-slide:eq("+i+") ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+ ($(window).width() - 80) + "px"});					
				}
				else if($(window).width() < 768){
					$(".lx-mini-slide:eq("+i+")").parent().css({"width":($(window).width()) + "px"});
					$(".lx-mini-slide:eq("+i+") ul li").css({"width":($(window).width()) + "px"});
					$(".lx-mini-slide:eq("+i+") ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+ ($(window).width()) + "px"});					
				}
				else{
					$(".lx-mini-slide:eq("+i+") ul li").css({"width":$(".lx-mini-slide:eq("+i+")").attr("data-width")});
					$(".lx-mini-slide:eq("+i+") ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+$(".lx-mini-slide:eq("+i+")").attr("data-width")});					
				}		
			}
			else{
				$(".lx-mini-slide:eq("+i+") ul li").css({"width":$(".lx-mini-slide:eq("+i+")").outerWidth()+"px"});
				$(".lx-mini-slide:eq("+i+") ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+$(".lx-mini-slide:eq("+i+")").outerWidth()+"px"});					
			}
		}		
	}
	// Nb. Slides
	if($(".lx-home-slide").length){
		nbslides = $(".lx-home-slide").length;
	}
	return false;
});

// Show Mobile Menu
$(".lx-header-menu-mobile > a").on("click",function(){
	$(".lx-main-menu-mobile").fadeIn();
});
$(".lx-main-menu-mobile > i").on("click",function(){
	$(".lx-main-menu-mobile").fadeOut();
});

// Home Navigation
$(".lx-home-navigation-content ul li a").on("click",function(){
	var nb = $(this).attr("data-nb");
	$(".lx-home-navigation-content ul li a").removeClass("active");
	$(this).addClass("active");
	$(".lx-fade-lt").removeAttr("style").css({"top":"-40px","left":"-60px","opacity":"0.0"});
	$(".lx-fade-rb").removeAttr("style").css({"bottom":"-40px","right":"-60px","opacity":"0.0"});
	window.setTimeout(function(){
		$(".lx-home-slide").css("display","none");
		$(".lx-home-slide:eq("+nb+")").css("display","block");
		window.setTimeout(function(){
			$(".lx-home-slide:eq("+nb+") .lx-fade-lt").removeAttr("style").css("transition","all ease 0.3s");
			$(".lx-home-slide:eq("+nb+") .lx-fade-rb").removeAttr("style").css("transition","all ease 0.3s");
			if(typeof $(".lx-mini-slide").attr("data-width") !== typeof undefined && $(".lx-mini-slide").attr("data-width") !== false){
				if($(window).width() === 768){
					$(".lx-mini-slide").parent().css({"width":($(window).width() - 80) + "px"});				
				}
				else if($(window).width() < 768){
					$(".lx-mini-slide").parent().css({"width":($(window).width()) + "px"});				
				}
				else{
					$(".lx-mini-slide").parent().css({"width":$(".lx-mini-slide").attr("data-width")});						
				}		
			}
		},100);
	},600);
});

// Mini Slide Navigation
var lx_passed = "yes";
$(".lx-mini-slide-nav > .fa-angle-right").on("click",function(){
	if(lx_passed === "yes"){
		lx_passed = "no";
		var ul = $(this).parent().parent().find("ul")
		ul.css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"-"+(ul.find("li").outerWidth()*2)+"px"});
		window.setTimeout(function(){
			ul.css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+ul.find("li").outerWidth()+"px"});
			var item = "<li style='width:"+ul.find("li").outerWidth()+"px;'>"+ul.find("li:eq(0)").html()+"</li>";
			ul.append(item);
			ul.find("li:eq(0)").remove();
			lx_passed = "yes";
		},500);
	}
});
$(".lx-mini-slide-nav > .fa-angle-left").on("click",function(){
	if(lx_passed === "yes"){
		lx_passed = "no";
		var ul = $(this).parent().parent().find("ul")
		ul.css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"0px"});
		window.setTimeout(function(){
			ul.css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+(ul.find("li").outerWidth())+"px"});
			var item = "<li style='width:"+ul.find("li").outerWidth()+"px;'>"+ul.find("li:last-child").prev(".lx-mini-slide ul li").html()+"</li>";
			ul.prepend(item);
			ul.find("li:last-child").prev(".lx-mini-slide ul li").remove();
			lx_passed = "yes";
		},500);
	}
});

if($(window).width() > 767){
	if($(".lx-home-slide").length){
		var myElement = document.getElementById('lx-home-slideup');
		var mc = new Hammer(myElement);
		mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		mc.on("swipeup",function(ev){
			if(currentslide < nbslides - 1){
				currentslide = parseInt(currentslide,10) + 1;
				$("a[data-nb='"+currentslide+"']").trigger("click");
			}
		});
		mc.on("swipedown",function(ev){
			if(currentslide > 0){
				currentslide = parseInt(currentslide,10) - 1;
				$("a[data-nb='"+currentslide+"']").trigger("click");
			}	
		});	
	}
	$(document).on("keyup", function(e) {
		if (e.keyCode === 38) {
			if(currentslide > 0){
				currentslide = parseInt(currentslide,10) - 1;
				$("a[data-nb='"+currentslide+"']").trigger("click");
			}	
		}	
		if (e.keyCode === 40) {
			if(currentslide < nbslides - 1){
				currentslide = parseInt(currentslide,10) + 1;
				$("a[data-nb='"+currentslide+"']").trigger("click");
			}	
		}	
		return false;
	});	
}

// Form Input Effect
$(".lx-textfield").on("click",function(){
	$(this).find("span").css({"top":"0px","left":"15px"});
	$(this).find("input").focus();
	$(this).find("textarea").focus();
});
$(".lx-textfield input,.lx-textfield textarea").on("blur",function(){
	if($(this).val() == ""){
		$(this).next("span").css({"top":"25px","left":"25px"});
	}
});

// Contact Form Errors
$(".lx-contact-form a").on("click", function() {
    var fullname = $(".lx-contact-form input[name='fullname']");
    var email = $(".lx-contact-form input[name='email']");
    var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    var subject = $(".lx-contact-form input[name='subject']");
    var txtarea = $(".lx-contact-form textarea");
	if(fullname.val() !== "" && patt.test(email.val()) && txtarea.val()){
		var url = "send-contact-form.php?fullname="+fullname.val()+"&email="+email.val()+"&subject="+subject.val()+"&message="+txtarea.val();
		var posting = $.post( url );
		posting.done(function( data ) {
			$(".lx-floating-response").remove();
			window.clearTimeout(timer);
			$("body").append('<div class="lx-floating-response"><p class="lx-succes"><i class="material-icons">error_outline</i> Thanks for contacting me <b>'+fullname.val()+'</b>. Your message was sent succesfully. I\'m going to get in touch with you as soon as possible<i class="material-icons">close</i></p></div>');
			$(".lx-floating-response").fadeIn();
			timer = window.setTimeout(function(){
				$(".lx-floating-response").fadeOut();
			},5000);			
			fullname.val("");
			email.val("");
			subject.val("");
			txtarea.val("");
		});	
	}	
	else{
		$(".lx-floating-response").remove();
		window.clearTimeout(timer);
		$("body").append('<div class="lx-floating-response"><p class="lx-error"><i class="material-icons">error_outline</i> Something went wrong<i class="material-icons">close</i></p></div>');
		$(".lx-floating-response").fadeIn();
		timer = window.setTimeout(function(){
			$(".lx-floating-response").fadeOut();
		},5000);		
	}
    return false;
});

// Remove Floating Message
$("body").delegate(".lx-floating-response","click",function(){
	$(".lx-floating-response").fadeOut();
});