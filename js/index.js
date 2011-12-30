$(function() {

  var $container = $("#container");
  var $loading = $("#loading");
  var isloading = false;

  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector : '.item',
      columnWidth : 240
    });
  });

  var show_loading = function() {
    isloading = true;
    // $loading.height($(window).height());
    $loading.show();
  }

  var hide_loading = function() {
    isloading = false;
    $loading.hide();
  }

  var load_photos = function() {
    show_loading();
    $.getJSON(
      'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?',
       function(data) {
         var images = [];
         $.each(data.items, function(i, item) {
           images.push({image_url: item.media.m});
         });
         var images_dom = $($("#itemTemplate").render(images));
         images_dom.imagesLoaded(function() {
           $container.append(images_dom).masonry('appended', images_dom, true);
           hide_loading();
         });
       });
  };

  $(window).on('scroll', function() {
    if(isloading) {
      return;
    }
    var $window = $(window);
    var scroll_top = $window.scrollTop();
    var window_height = $window.height();

    var height = $container.offset().top + $container.height();

    if (height - (scroll_top + window_height) < 100) {
      load_photos();
    }
  });

  load_photos();
});
