'use strict';

(function() {
  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    }
    return array;
  };

  function toggleDisabled(tags) {
    tags.forEach(function(tag) {
      if (tag.hasAttribute('disabled')) {
        tag.removeAttribute('disabled');
      } else {
        tag.setAttribute('disabled', 'disabled');
      }
    });
  }

  window.utils = {
    randomInteger: randomInteger,
    shuffleArray: shuffleArray,
    toggleDisabled: toggleDisabled
  }
})()
