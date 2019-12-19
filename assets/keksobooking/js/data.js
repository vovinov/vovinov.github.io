'use strict';
(function() {
  var widthPin = document.querySelector('.map__pin').offsetWidth / 2;

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var checkTime = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var featuresArray = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  utils.shuffleArray(featuresArray);
  featuresArray.length = utils.randomInteger(1, featuresArray.length);

  window.data = {
    titles: titles,
    types: types,
    featuresArray: featuresArray,
    checkTime: checkTime,
    photos: photos,
    widthPin: widthPin
  };
})();
