'use strict';
(function() {

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var formAddress = document.querySelector('#address');
  var main = document.querySelector('main');
  var form = document.querySelector('.ad-form');
  var fieldset = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var selects = document.querySelector('.map__filters').querySelectorAll('select');

  var limits = {
    left: map.clientLeft,
    top: 130,
    right: map.clientWidth - mainPin.clientWidth,
    bottom: 630
  }

  utils.toggleDisabled(fieldset);
  utils.toggleDisabled(selects);

  backend.getData(onLoad, formModule.showErrorMessage);

  function onLoad(data) {
    var posts = Array.from(data);

    mainPin.addEventListener('mouseup', function() {
      utils.toggleDisabled(fieldset);
      utils.toggleDisabled(selects);
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
      renderPins(data);
      getAddress();
      mainPin.classList.add('hidden');
    });

    var renderPins = function(data) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(pin.getPin(data[i]));
      }
      pins.appendChild(fragment);
      var pinButtons = document.querySelectorAll('.map__pin[type=button]');
      for (var i = 0; i < pinButtons.length; i++) {
        renderCard(pinButtons[i], data[i]);
      };
    };

    var renderCard = function(pin, post) {
      pin.addEventListener('click', function() {
        showCard(post)
      })
    };

    var showCard = function(post) {
      if(document.querySelector('.map__card')) {
        map.removeChild(document.querySelector('.map__card'));
      }
      card.getCard(post);
      var close = document.querySelector('.popup__close');
      close.addEventListener('click', closeCard);
    };

    var filterHouse = document.querySelector('#housing-type');

    filterHouse.addEventListener('change', function() {
      clearMap();
      renderPins(posts.filter(function (post) {
        return post.offer.type === filterHouse.value
      }));
    })

    var filterPrice = document.querySelector('#housing-price');

    filterPrice.addEventListener('change', function() {
      clearMap();
      switch(filterPrice.value) {
        case 'middle':
          renderPins(posts.filter(function(post) {
            return post.offer.price > 10000 && post.offer.price < 50000
          }));
          break;
        case 'low':
          renderPins(posts.filter(function(post) {
            return post.offer.price < 10000
          }));
          break;
        case 'high':
          renderPins(posts.filter(function(post) {
            return post.offer.price > 50000
          }));
          break;
        case 'any':
          renderPins(posts);
          break;
        }
    });

    var filterRooms = document.querySelector('#housing-rooms');

    filterRooms.addEventListener('change', function() {
      clearMap();
      switch(filterRooms.value) {
        case 'any':
          renderPins(posts)
          break;
        case '1':
          renderPins(posts.filter(function(post) {
            return post.offer.rooms === 1;
          }));
          break;
        case '2':
          renderPins(posts.filter(function(post) {
            return post.offer.rooms === 2;
          }));
          break;
        case '3':
          renderPins(posts.filter(function(post) {
            return post.offer.rooms === 3;
          }));
          break;
        }
    });

    var filterGuests = document.querySelector('#housing-guests');

    filterGuests.addEventListener('change', function() {
      clearMap();
      switch(filterGuests.value) {
        case 'any':
          renderPins(posts)
          break;
        case '1':
          renderPins(posts.filter(function(post) {
            return post.offer.guests === 1;
          }));
          break;
        case '2':
          renderPins(posts.filter(function(post) {
            return post.offer.guests === 2;
          }));
          break;
        case '0':
          renderPins(posts.filter(function(post) {
            return post.offer.guests === 0;
          }));
          break;
        }
    })
  };

  function clearMap() {
    document.querySelectorAll('.map__pin[type=button]').forEach(function(button) {
      pins.removeChild(button)
    });
  }

  function closeCard() {
    map.removeChild(document.querySelector('.map__card'));
  }

  var getAddress = function() {
    formAddress.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
  };


  mainPin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      var newLocation = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (moveEvt.clientX < limits.left + data.widthPin) {
        newLocation.x = limits.left;
      } else if (moveEvt.clientX > limits.right - data.widthPin) {
        newLocation.x = limits.right;
      }

      if (moveEvt.clientY < limits.top) {
        newLocation.y = limits.top;
      } else if (moveEvt.clientY > limits.bottom) {
        newLocation.y = limits.bottom;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      relocate(newLocation);
    };

    var relocate = function(newLocation) {
      mainPin.style.left = newLocation.x + 'px';
      mainPin.style.top =  newLocation.y + 'px';
    }

    var mouseUpHandler = function(evt) {
      evt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.mapModule = {
    clearMap: clearMap
  }
})();



