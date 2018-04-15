/*
 * Manipulate the Vanguard page.
 * @requires jquery.
 * @requires content_scripts_helpers.js.
 * @requires content_script_main.js.
 */

// Simplest example for a notification.

var Region = function(textBegin, textEnd) {
  this.textBegin = textBegin;  // Text that triggers the start of this region.
  this.textEnd = textEnd;      // Text that triggers the end of the region.
  this.inRegion =
      false;  // Bit to record whether the loop is inside such a region.
  this.regionFound =
      false;  // Bit to record whether we have found such a region.
};

whenDOMIsStable(function() {

  var cardContents = [];

  var afterTaxRegionFound = false;
  var afterTaxRegion = false;

  var preTaxRegionFound = false;
  var isPretaxRegion = false;

  var regionFinder =
      {
        afterTax: {
          textBegin: 'From after-tax sources',
          textEnd: 'Estimated after-tax total to convert',
          inRegion: false,
          regionFound: false
        },
        preTax: {
          textBegin: 'From pre-tax sources',  // Text that triggers the start of
                                              // this region.
          textEnd: 'Estimated after-tax total to convert',  // Text that
                                                            // triggers the end
                                                            // of the region.
          inRegion:
              false,  // Bit to record whether the loop is inside such a region.
          regionFound:
              false  // Bit to record whether we have found such a region.
        }


      }

      $('tr')
          .each(function(index, item) {
            var text = item.innerText;

            // Checks if we are in danger region.
            if (text.indexOf('PRE-TAX 401(K)') !== -1) {
              isPretaxRegion = true;
              preTaxRegionFound = true;
            } else if (
                text.indexOf('Estimated pre-tax total to convert') !== -1) {
              isPretaxRegion = false;
            }

            // Disables any possible inputs.
            if (isPretaxRegion) {
              $(item)
                  .find('input')
                  .prop('disabled', true)
                  .attr(
                      'title',
                      'This element is diabled purposely by Vanguard protector: http://google3/experimental/users/zhiqiu/chrome_extensions/content_script_runner/hosted_scripts/vanguard_conversion_protector.js.');
            }
          });
});
