// All dynamic scripts are loaded from here.
var SCRIPT_HOST_PATH =
    'https://raw.githubusercontent.com/ChihChiu29/ContentScriptRunner/master/hosted_scripts/';

// Gets script host path URL.
function getScriptUrl(filename) {
  return SCRIPT_HOST_PATH + filename;
}

var CONFIG = [
  {
    description: 'Playground to try things out; will load for any page',
    urlRegExp: '.*',
    scripts: [
      getScriptUrl('playground.js'),
    ]
  },

  {
    description: 'Remove some ads from https://www.dnvod.tv/',
    urlRegExp: 'https://www[.]dnvod[.]tv/.*',
    scripts: [
      getScriptUrl('dnvod.js'),
    ]
  },

  {
    description: 'Prevents converting from pre-tax to Roth on Vanguard',
    urlRegExp: 'https://retirementplans[.]vanguard[.]com/.*irothconversion.*',
    scripts: [
      getScriptUrl('vanguard_conversion_protector.js'),
    ]
  },
];
