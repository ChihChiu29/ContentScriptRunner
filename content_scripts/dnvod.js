// Remove ads from https://www.dnvod.tv/

function createPlayPrevAndNextButtons() {
  var currentUrl = window.location.href;
  var videoLinkElements = $('.bfan-n > a');

  var previousVideoLinkElement = null;
  var currentVideoLinkElement = null;
  var nextVideoLinkElement = null;
  for (var i = 0; i < videoLinkElements.length; i++) {
    var elem = videoLinkElements.get(i);
    if (currentUrl == elem.href) {
      currentVideoLinkElement = elem;
    } else if (!currentVideoLinkElement) {
      previousVideoLinkElement = elem;
    } else if (!nextVideoLinkElement) {
      nextVideoLinkElement = elem;
    }
  }

  var playMenu = $('<div>');
  playMenu
    .css('position', 'absolute')
    .css('float', 'left')
    .css('top', $('#video').offset().top)
    .css('z-index', 99999);
  if (previousVideoLinkElement) {
    playMenu.append($('<button>').append(
      $('<a>')
        .text('previous: ' + previousVideoLinkElement.text)
        .attr('href', previousVideoLinkElement.href)));
  }
  playMenu.append('<hr/>');
  if (nextVideoLinkElement) {
    playMenu.append($('<button>').append(
      $('<a>')
        .text('next: ' + nextVideoLinkElement.text)
        .attr('href', nextVideoLinkElement.href)));
  }

  $('body').append(playMenu);
}

whenDOMIsStable(function() {
  // Banner ads
  $('.i-cp').remove();
  $('.i-cp3').remove();
  // Floating bottom-right
  $('#msg_title').remove();
  $('#msg_content').remove();
  // Play window; side ads.
  $('.bfq-l-2').remove();

  createPlayPrevAndNextButtons();
});
