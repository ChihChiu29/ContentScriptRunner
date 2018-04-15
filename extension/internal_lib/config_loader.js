/**
 * @fileOverview Stores constants that are shared cross multiple files.
 */

var DEFAULT_CONFIG_URL = 'https://cs.corp.google.com/codesearch/f/piper///depot/google3/experimental/users/zhiqiu/chrome_extensions/content_script_runner/hosted_scripts/config.js';
var CONFIG_URL_KEY = 'CONFIG_URL_KEY';

function getConfigUrl() {
  return syncLoad(CONFIG_URL_KEY).then(function(url) {
    return url ? url : DEFAULT_CONFIG_URL;
  });
}