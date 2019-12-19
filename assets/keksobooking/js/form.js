'use strict';
(function() {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var main = document.querySelector('main');
  var title = document.querySelector('#title');
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var options = capacity.querySelectorAll('option');
  var priceInput = document.querySelector('#price');
  var resetButton = document.querySelector('.ad-form__reset');
  var fieldset = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var selects = document.querySelector('.map__filters').querySelectorAll('select');

  var startCoords = {
    x: 570,
    y: 375
  };


  function resetForm() {
    form.querySelectorAll('fieldset input').forEach(function(field) {
      field.value = '';
    });
    roomNumber.selectedIndex = 0;
    capacity.selectedIndex = 0;
    mapModule.clearMap();
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    utils.toggleDisabled(fieldset);
    utils.toggleDisabled(selects);
    mainPin.classList.remove('hidden');
    mainPin.style.left = startCoords.x + 'px';
    mainPin.style.top = startCoords.y + 'px';
  };

  title.addEventListener('invalid', function () {
    console.log(title.validity);
    title.style.border = '5px solid red';
    if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное значение');
    } else if (title.validity.tooShort) {
      title.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Имя должно состоять максимум из 100 символов');
    } else {
      title.setCustomValidity('')
    }

    if (title.validity.valid) {
      title.style.border = '';
    }
  });

  priceInput.addEventListener('invalid', function() {
    priceInput.style.border = '5px solid red';

    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное значение');
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Цена не должна превышать 1000000');
    } else if (priceInput.validity.rangeUnderflow) {
        priceInput.setCustomValidity('Введеная цена ниже минимальной');
    } else {
      priceInput.setCustomValidity('')
    };

    if (priceInput.validity.valid) {
      priceInput.style.border = '';
    }
  });

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    backend.pushData(new FormData(form), onUpload, showErrorMessage);

    function onUpload(data) {
      console.log(data);
      showSuccessMessage();
      mapModule.resetForm();
    };
  });

  function showSuccessMessage() {
    var message = document.querySelector('#success').content.cloneNode(true);
    main.appendChild(message);
    var success = document.querySelector('.success')
    success.addEventListener('click', SuccessClickHandler);
    document.addEventListener('keydown', SuccessEscHandler);
  };

  function SuccessClickHandler() {
    var success = document.querySelector('.success');
    document.removeEventListener('keydown', SuccessEscHandler);
    main.removeChild(success);
  };

  function SuccessEscHandler(evt) {
    var success = document.querySelector('.success');
    console.log(evt);
    if (evt.keyCode === 27) {
      document.removeEventListener('keydown', SuccessEscHandler);
      main.removeChild(success);
    }
  };

  function showErrorMessage() {
    var template = document.querySelector('#error').content;
    var element = template.cloneNode(true);
    main.appendChild(element);
    var errorButton = document.querySelector('#error').content.querySelector('.error__button');
    var error = document.querySelector('.error');
    error.addEventListener('click', ErrorClickHandler);
    document.addEventListener('keydown', ErrorEscHandler);
    errorButton.addEventListener('click', ErrorButtonHandler);
  };

  function ErrorClickHandler() {
    var error = document.querySelector('.error');
    document.removeEventListener('keydown', ErrorEscHandler);
    main.removeChild(error);
  };

  function ErrorEscHandler(evt) {
    var error = document.querySelector('.error');
    console.log(evt);
    if (evt.keyCode === 27) {
      document.removeEventListener('keydown', ErrorEscHandler);
      main.removeChild(error);
    }
  };

  function ErrorButtonHandler(evt) {
    var error = document.querySelector('#error');
    evt.preventDefault();
    console.log(evt);
    document.removeEventListener('keydown', ErrorEscHandler);
    main.removeChild(error);
  };

  resetButton.addEventListener('click', function() {
    resetForm();
  })


  type.addEventListener('change', function() {
    var typeValue = document.querySelector('#type').value;

    var getPrice = function (type) {
      var price = '';
      switch (type) {
        case 'bungalo':
          price = '0';
          break;
        case 'flat':
          price = '1000';
          break;
        case 'house':
          price = '5000';
          break;
        case 'palace':
          price = '10000';
          break;
      }
      return price;
    };

    var price = getPrice(typeValue);
    priceInput.min = price;
    console.dir(priceInput.min);
    priceInput.placeholder = price;
  });

  timeIn.addEventListener('change', function() {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function() {
     timeIn.value = timeOut.value;
  });

  roomNumber.addEventListener('change', function() {
    var getCapacity = function(rooms) {
      var guest = '';
      switch (rooms) {
        case '1':
          guest = [options[2]];
          break;
        case '2':
          guest = [options[1], options[2]];
          break;
        case '3':
          guest = [options[0], options[1], options[2]];
          break;
        case '100':
          guest = [options[3]];
          break;
      }
      return guest;
    };

    var guests = getCapacity(roomNumber.value);
    capacity.innerHTML = '';
    for (var i = 0; i < guests.length; i++) {
      capacity.appendChild(guests[i]);
    };
  })

  window.formModule = {
    SuccessEscHandler: SuccessEscHandler,
    showErrorMessage: showErrorMessage,
    resetForm: resetForm
  }

})();
