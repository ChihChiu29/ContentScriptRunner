// Look up translations for novels on qidian.com.

function searchTranslation(query, callback_fn) {
  $.ajax({
    type: 'POST',
    url: 'https://www.novelupdates.com/wp-admin/admin-ajax.php',
    data: {
      action: "nd_ajaxsearchmain",
      strType: "desktop",
      strOne: query,
    },
    async: true,
  }).done(function(result) {
    var $resultElement = $($.parseHTML(result)[0]);
    callback_fn({
      name: $resultElement.find('.search_hl').text(),
      url: $resultElement.find('a').attr('href'),
    });
  });
}

function decoratePage() {
  $('.book-img-text .book-mid-info > h4').each(
    function(index, elem) {
      var $elem = $(elem);
      searchTranslation($elem.text(), function(result) {
        if (result.name) {
          var name_array = result.url.split('/');
          var translated_name = name_array[name_array.length - 2];
          $elem.append(
            $('<a>')
                .attr('href', result.url)
                .text(' (' + translated_name + ')'));
        }
      });
    });
}

decoratePage();
