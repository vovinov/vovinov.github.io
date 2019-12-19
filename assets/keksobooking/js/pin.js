'use strict';
(function() {

  var getPin = function(post) {
    var template = document.querySelector('#pin').content.querySelector('button');
    var element = template.cloneNode(true);
    element.style.left = post.location.x + 'px';
    element.style.top = post.location.y + 'px';
    element.children[0].src = post.author.avatar;
    element.children[0].alt = post.offer.title;
    return element
  };

  window.pin = {
    getPin: getPin
  };

})();
