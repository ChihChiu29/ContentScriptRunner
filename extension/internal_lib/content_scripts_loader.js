/**
 * @fileOverview Loads content scripts dynamically defined in a config file.
 *
 * The CONFIG variable has format:
 * [
 *   {
 *     urlRegExp: <string>,
 *     scripts: [
 *       <content_script>,
 *     ]
 *   },
 * ]
 *
 * @requires constants.js
 * @requires utils.js
 * @requires config_loader.js
 */

/**
 * Loads config from configFilePath, then updates it using the local storage under the key configStorageKey.
 * The update is in unit of module, meaning that if the same module is defined both in the default config and in
 * local storage, the one in local storage will replace the default one.
 * @param {string} configFilePath The relative path to the config file.
 * @param {type} configStorageKey The key for the config stored in local storage.
 * @returns {Promise} Argument: The loaded and updated CONFIG object.
 */
function loadConfig(url) {
  var CONFIG = null;
  return GET(url).then(function(content) {
    if (content !== '') {
      eval(content);  // Updates CONFIG.
      return CONFIG;
    }
  });
}

/**
 * Loads content scripts for a single module.
 * @param {object} module See comments in config.js for the format of a module object.
 * @return {Promise} Argument: none.
 */
function maybeLoadModule(module) {
  var match = window.location.href.match(module.urlRegExp);
  if (match === null || match[0] !== window.location.href) {
      return;
  }

  var promiseLock = Promise.resolve();
  for (var i = 0; i < module.scripts.length; i ++) {
    (function() {
      var j = i;
      promiseLock = promiseLock.then(function() {
        return GET(module.scripts[j]);
      }).then(function(content) {
        if (content !== '') {
          eval(content);
        }
      });
    }());
  }
  return promiseLock;
}

/**
 * Loads content scripts from all modules.
 */
function loadAllModulesFromUrl(/* string */ url) {
  if (url === null) {
    return Promise.resolve();
  }
  
  return loadConfig(url).then(function(config) {
    var loadModulePromises = [];
    for (var i = 0; i < config.length; i ++) {
        loadModulePromises.push(maybeLoadModule(config[i]));
    }
    return Promise.all(loadModulePromises);
  });
}

/**
 * Loads content scripts from all modules.
 */
function loadAllModules() {
  return getConfigUrl().then(function(url) {
    return loadAllModulesFromUrl(url);
  });
}
