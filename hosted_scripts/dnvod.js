// Remove ads from https://www.dnvod.tv/

whenDOMIsStable(function() {
  // Banner ads
  $('.i-cp').remove();
  // Floating bottom-right
  $('#msg_title').remove();
  $('#msg_content').remove();
  // Play window; side ads.
  $('.bfq-l-2').remove();
});
