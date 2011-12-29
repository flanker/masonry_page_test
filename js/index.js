$(function() {

  var $container = $("#container");
  var isloading = false;

  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector : '.item',
      columnWidth : 240
    });
  });

  var load_photos = function() {
    isloading = true;
    $.getJSON(
      'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?',
       function(data) {
         $.each(data.items, function(i, item) {
           var $item = $("<img class='item' />").attr("src", item.media.m);
           $container.append($item);
           $item.imagesLoaded(function() {
             $container.masonry('appended', $item);
           });
         });
         isloading = false;
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
