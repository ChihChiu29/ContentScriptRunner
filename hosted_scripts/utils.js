/**
 * @fileoverview Collection of global utility functions.
 */

/*
 * Returns if two arrays contain the same content.
 */
compareArrays = function(array1, array2) {
  return (array1.length == array2.length) &&
      array1.every(function(element, index) {
        return element === array2[index];
      });
}
