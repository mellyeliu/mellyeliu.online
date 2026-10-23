
jQuery(document).ready(function ($) {
  var ZOOM = 1.1;

  setTimeout(function () {
    $("h1.responsive-headline").fitText(1, {
      minFontSize: "40px",
      maxFontSize: "90px",
    });
  }, 100);


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











  function getZoom() {
    return $(window).width() <= 860 ? 1 : ZOOM;
  }

  $(window).load(function () {
    var z = getZoom();
    var h = $(window).height() / z;
    $("img#headerpic").css({ "min-height": h * 0.95 - 80 });
  });

  $("header").css({ height: $(window).height() / getZoom() });
  $(window).on("resize", function () {
    var z = getZoom();
    var h = $(window).height() / z * 0.95 - 80;
    $("header").css({ height: $(window).height() / z });
    $("img#headerpic").css({ "min-height": h });
  });


  $(window).on("scroll", function () {

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
        if (msg == "OK") {
          $("#image-loader").fadeOut();
          $("#message-warning").hide();
          $("#contactForm").fadeOut();
          $("#message-success").fadeIn();
        }
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
