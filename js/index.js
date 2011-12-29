$(function() {

  var $container = $("#container");

  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector : '.item',
      columnWidth : 240
    });
  });

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
     });

});
