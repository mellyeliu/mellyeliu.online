/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {
  var ZOOM = 1.1;
  /*----------------------------------------------------*/
  /* FitText Settings
------------------------------------------------------ */

  setTimeout(function () {
    $("h1.responsive-headline").fitText(1, {
      minFontSize: "40px",
      maxFontSize: "90px",
    });
  }, 100);

  /*----------------------------------------------------*/
  /* Smooth Scrolling
------------------------------------------------------ */

  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  /*----------------------------------------------------*/
  /* Highlight the current section in the navigation bar
------------------------------------------------------*/

  // var sections = $("section");
  // var navigation_links = $("#nav-wrap a");

  // sections.waypoint({

  //    handler: function(event, direction) {

  // 	   var active_section;

  // 		active_section = $(this);
  // 		if (direction === "up") active_section = active_section.prev();

  // 		var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

  //       navigation_links.parent().removeClass("current");
  // 		active_link.parent().addClass("current");

  // 	},
  // 	offset: '35%'

  // });

  /*----------------------------------------------------*/
  /*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */
  $(window).load(function () {
    var h = $(window).height() / ZOOM;
    $("img#headerpic").css({ "min-height": h * 0.95 - 80 });
  });

  $("header").css({ height: $(window).height() / ZOOM });
  //  $('img#headerpic').css({ 'min-height': $(window).height() });
  //  $('body').css({ 'width': $(window).width() })
  $(window).on("resize", function () {
    var w = $(window).width() / ZOOM;
    var h = $(window).height() / ZOOM * 0.95 - 80;
    $("header").css({ height: $(window).height() / ZOOM });
    // // $('.banner').css({ 'height': $(window).height() });
    // $('body').css({ 'width': $(window).width() })
    $("img#headerpic").css({ "min-height": h });
    // document.getElementById("headerpic").style.height = '900px';
  });

  /*----------------------------------------------------*/
  /*	Fade In/Out Primary Navigation
------------------------------------------------------*/

  $(window).on("scroll", function () {
    // $('img#headerpic').css({ 'min-height': $(window).height() });

    var h = $("header").height();
    var w = $(window).width() / ZOOM;
    var y = $(window).scrollTop();

    if (w > 1350 && h > 890 && y < h * 0.05) {
      document.getElementById("nav-wrap").style.height = "100px";
      document.getElementById("nav-wrap").style.padding = "25px 0px";
    } else if (y < h * 0.05) {
      document.getElementById("nav-wrap").style.height = "100px";
      document.getElementById("nav-wrap").style.padding = "23px 0px";
    } else {
      document.getElementById("nav-wrap").style.height = "70px";
      document.getElementById("nav-wrap").style.padding = "5px 0px";
    }
  });

  /*----------------------------------------------------*/
  /*	Modal Popup
------------------------------------------------------*/

  //  $('.item-wrap a').magnificPopup({

  //     type:'inline',
  //     fixedContentPos: false,
  //     removalDelay: 200,
  //     showCloseBtn: false,
  //     mainClass: 'mfp-fade'

  //  });

  //  $(document).on('click', '.popup-modal-dismiss', function (e) {
  //  		e.preventDefault();
  //  		$.magnificPopup.close();
  //  });

  /*----------------------------------------------------*/
  /*	Flexslider
/*----------------------------------------------------*/
  $(".flexslider").flexslider({
    namespace: "flex-",
    controlsContainer: ".flex-container",
    animation: "slide",
    controlNav: true,
    directionNav: false,
    smoothHeight: true,
    slideshowSpeed: 7000,
    animationSpeed: 600,
    randomize: false,
  });

  $(".rwt__tab[aria-selected='false']").hover(
    function () {
      $(".rwt__tab[aria-selected='true']").addClass("no-width");
    },
    function () {
      $(".rwt__tab[aria-selected='true']").removeClass("no-width");
    }
  );

  $(".rwt__tab[aria-selected='true']").hover(
    function () {
      $(".rwt__tab[aria-selected='true']").removeClass("no-width");
    },
    function () {
      $(".rwt__tab[aria-selected='true']").removeClass("no-width");
    }
  );

  //   $(".rwt__tab[aria-selected='false']").click(function () {
  //    $(".rwt__tab[aria-selected='true']").removeClass("no-width");
  // })
  //   $(".rwt__tab[aria-selected='false']").hover(function () {
  //    $(".rwt__tab[aria-selected='true']").append('<style>:before{width:0px !important;}</style>');
  // }, function () {
  //    $(".rwt__tab[aria-selected='true']").children('style').remove();
  // });

  /*----------------------------------------------------*/
  /*	contact form
------------------------------------------------------*/

  $("form#contactForm button.submit").click(function () {
    $("#image-loader").fadeIn();

    var contactName = $("#contactForm #contactName").val();
    var contactEmail = $("#contactForm #contactEmail").val();
    var contactSubject = $("#contactForm #contactSubject").val();
    var contactMessage = $("#contactForm #contactMessage").val();

    var data =
      "contactName=" +
      contactName +
      "&contactEmail=" +
      contactEmail +
      "&contactSubject=" +
      contactSubject +
      "&contactMessage=" +
      contactMessage;

    $.ajax({
      type: "POST",
      url: "inc/sendEmail.php",
      data: data,
      success: function (msg) {
        // Message was sent
        if (msg == "OK") {
          $("#image-loader").fadeOut();
          $("#message-warning").hide();
          $("#contactForm").fadeOut();
          $("#message-success").fadeIn();
        }
        // There was an error
        else {
          $("#image-loader").fadeOut();
          $("#message-warning").html(msg);
          $("#message-warning").fadeIn();
        }
      },
    });
    return false;
  });
});
