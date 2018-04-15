var urlInput = $('#input_url');
var saveButton = $('#button_save');
var resetButton = $('#button_reset');

saveButton.click(function() {
  syncSave(CONFIG_URL_KEY, urlInput.val());
});

resetButton.click(function() {
  urlInput.val(DEFAULT_CONFIG_URL);
  syncSave(CONFIG_URL_KEY, DEFAULT_CONFIG_URL);
});

function refreshInput() {
  return getConfigUrl().then(function(url) {
    urlInput.val(url);
  });
}


// main
refreshInput();