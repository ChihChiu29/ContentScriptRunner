/**
 * @fileOverview Stores constants that are shared cross multiple files.
 */

var DEFAULT_CONFIG_URL = 'https://raw.githubusercontent.com/ChihChiu29/ContentScriptRunner/master/hosted_scripts/config.js';
var CONFIG_URL_KEY = 'CONFIG_URL_KEY';

function getConfigUrl() {
  return syncLoad(CONFIG_URL_KEY).then(function(url) {
    return url ? url : DEFAULT_CONFIG_URL;
  });
}