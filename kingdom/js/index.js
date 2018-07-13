(function(){

  var jQ = jQuery.noConflict();

  // custom functions START
  jQ.fn.extend({


    // splash
    splashScreen: function(){
      var splashPage = jQ('#FCC-portfolio-splash'),
          splashH1 = jQ('#FCC-portfolio-splash-h1').children('h1'),
          winSizeX = jQ(window).width(),
          winSizeY = jQ(window).height(),
          allContent = jQ('#FCC-portfolio-nav, #FCC-portfolio-home, #FCC-portfolio-about, #FCC-portfolio-intro, #FCC-portfolio, #FCC-portfolio-contact, #FCC-portfolio-copyright');
      if (jQ(window).scrollTop() == 0){
        splashPage.css({
          width: winSizeX + 'px',
          height: (winSizeY + 150) + 'px'
        });
        splashH1.children('span').fadeOut(2200, function(){
          splashH1.children('span').text('art');
        }).fadeIn(1800, function(){
          splashPage.fadeOut(1000);
          allContent.animate({
            opacity: '1'
          },1000);
        });
      }
      else {
        splashPage.css('display', 'none');
        allContent.animate({
          opacity: '1'
        }, 600);
      }
    },


    // navigation
    pageFades: function(){
      jQ('.FCC-portfolio-menu-links').each(function(i){
        jQ(this).click(function(){
          var thisSelector = '.FCC-portfolio-menu-links:eq(' + i + ')',
              thisValue = jQ(thisSelector).attr('href'),
              linkOffset = jQ(thisValue).offset().top;
          // fade-out, scroll an fade-in
          jQ('body').fadeOut(0, function(){
            if (i = 0){
              jQ('html').scrollTop(0);
            }
            else {
              jQ('html').scrollTop(linkOffset);
            }
            jQ('body').fadeIn(900);
          });
        });
      });
    },

    // keypoints description fields fades
    keypointsDescriptions: function(){
      var section = jQ('.FCC-portfolio-keypoint'),
          sectionDescr = jQ('.FCC-portfolio-keypoint-description'),
          docWidth = jQ(window).width();
      if (docWidth < 1024){
        // set CSS for icon-hovering description fields on smaller screens and handheld
        jQ(sectionDescr).css({
          position: 'relative',
          display: 'block',
          margin: '0 auto'
        }).fadeIn();
        jQ('.FCC-portfolio-keypoint .glyphicon').mouseover(function(){
          jQ(this).css('cursor', 'default');
        });
      }

      if (docWidth >= 1024){
        jQ(section).each(function(){
          jQ(this).children('span').mouseenter(function(){
            var descr = jQ(this).siblings('.FCC-portfolio-keypoint-description'),
                sizeX = jQ(section).width();
            // set CSS for icon-hovering description fields
            descr.css({
              margin: '0',
              width: sizeX + 'px',
              zIndex: '500'
            }).fadeIn(600);
            // icon-hovering description fields fade-outs
            jQ(section).each(function(){
              var image = jQ(this).children('.glyphicon'),
                  descr = jQ(this).children('.FCC-portfolio-keypoint-description');
              jQ(image).mouseleave(function(){
                jQ(descr).fadeOut(600);
              });
            });

          });
        });
      }

    },

    // compute same height for bootstrap columns: needs columns custom CSS class as string parameter
    sameHeightCols: function(colClass){
      var allColsHeight = [];
      jQ(colClass).each(function(){
        allColsHeight.push(jQ(this).height());
      });
      var highestCol = Math.max(allColsHeight);
      jQ(colClass).each(function(){
        jQ(this).css('height', highestCol) + 'px';
      });
    },

    // content fade-ins: needs CSS 'opacity: 0' set in stylesheet and CSS selector as string parameter
    contentFadeIn: function(elClass){
      jQ(elClass).each(function(){
        if (jQ(this).css('opacity') == 0){
          var winHeight = jQ(window).height(),
              presentView = (jQ(window).scrollTop() + winHeight) - 50,
              elementView = jQ(this).offset().top;
          if (elementView <= presentView){
            jQ(this).animate({
              opacity: '1'
            }, 600);
          }
        }
      });
    },

    // assign images, links and animation to portfolio projects
    portfolioImgs: function(){
      var imgsLinks = [
            'http://i2.wp.com/marco.nouveausiteweb.fr/wp-content/uploads/2016/03/screenshot.png',
            'http://i2.wp.com/marco.nouveausiteweb.fr/wp-content/uploads/2016/03/fwp.jpg',
            'http://i2.wp.com/marco.nouveausiteweb.fr/wp-content/uploads/2016/03/tpammjc.jpg'
          ],
          pageLinks = [
            'https://wordpress.org/themes/handcraft-expo/',
            'http://www.freshwaterpirates.eu/',
            'http://touchepasama.mjc-chilly.org/',
          ],
          imgBoxes = jQ('.FCC-portfolio-single-image-box'),
          winSize = jQ(window).width();
      imgBoxes.each(function(i){
        jQ(this).css({
          backgroundImage: 'url(\'' + imgsLinks[i] + '\')'
        });
        if (winSize >= 1024){
          jQ(this).hover(function(){
            jQ(this).animate({
              backgroundPosition: '2400%'
              }, {
                duration: 300
              });
              jQ(this).children('.FCC-portfolio-single-description-container').fadeIn(600);
          }, function(){
              jQ(this).animate({
                 backgroundPosition: '100%'
              }, {
                duration: 300,
                complete: function(){
                  jQ(this).css('background-position', 'center center');
                }
              });
              jQ(this).children('.FCC-portfolio-single-description-container').fadeOut(50);
          });
        }
        jQ(this).children('div').children('a').attr('href', pageLinks[i]);
        jQ(this).parent('div').siblings('div').children('a').attr('href', pageLinks[i]);
        if (winSize < 1024){
          jQ(this).wrap('<a href="' + pageLinks[i] + '"target="_blank"></a>');
        }
      });
      if (winSize < 1024){
        jQ('.FCC-portfolio-single-description-alt').fadeIn();
        jQ('.FCC-portfolio-single-description-container').text('');
      }
    }

  });
  // custom functions END



  // document ready START
  jQ(document).ready(function(){

    // splash
    jQ(document).splashScreen();

    // menu navigation animations
    jQ(document).pageFades();

    // keypoints descriptions animations
    jQ(document).keypointsDescriptions();
    
  // same height columns
    // keypoints
    var keyPointsCol = jQ('.FCC-portfolio-keypoint');
    jQ(document).sameHeightCols(keyPointsCol);
    // portfolio projects
    var portfolioCol = jQ('.FCC-portfolio-single-container');
    jQ(document).sameHeightCols(portfolioCol);

    // content fades
    jQ(document).contentFadeIn('#FCC-portfolio-intro i');
    jQ(document).contentFadeIn('#FCC-portfolio-intro p');
    jQ(document).contentFadeIn('#FCC-portfolio-intro ul');

    // links CSS transitions
    jQ('a, p').not('.navbar-toggle').css('transition', '.6s');

    // portfolio images animation
    jQ(document).portfolioImgs();

  });
  // document ready END

  // window scroll START
  jQ(window).scroll(function(){

    // content fades
    jQ(document).contentFadeIn('#FCC-portfolio-intro i');
    jQ(document).contentFadeIn('#FCC-portfolio-intro p');
    jQ(document).contentFadeIn('#FCC-portfolio-intro ul');

    var splashCheck = jQ('#FCC-portfolio-splash').css('display');
    if (splashCheck != 'none'){
      jQ(window).scrollTop(0);
    }

  });
  // window scroll END

  // window resize START
  jQ(window).resize(function(){

  // same height columns
    // keypoints
    var keyPointsCol = jQ('.FCC-portfolio-keypoint');
    jQ(document).sameHeightCols(keyPointsCol);
    // portfolio projects
    var portfolioCol = jQ('.FCC-portfolio-single-container');
    jQ(document).sameHeightCols(portfolioCol);

    // content fades
    jQ(document).contentFadeIn('#FCC-portfolio-intro i');
    jQ(document).contentFadeIn('#FCC-portfolio-intro p');
    jQ(document).contentFadeIn('#FCC-portfolio-intro ul');

  });
  // window resize END


})();