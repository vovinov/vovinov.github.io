'use strict';
(function() {

  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');

  var getCard = function(post) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var element = template.cloneNode(true);
    element.querySelector('.popup__avatar').src = post.author.avatar;
    element.querySelector('.popup__title').textContent = post.offer.title;
    element.querySelector('.popup__text--address').textContent = post.offer.address;
    element.querySelector('.popup__text--price').textContent = post.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = post.offer.type;
    element.querySelector('.popup__text--capacity').textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + post.offer.checkin + ', выезд до ' + post.offer.checkout;
    var featuresBlock = element.querySelector('.popup__features');
    var featureElement = element.querySelector('.popup__feature');
    featureElement.classList.remove('popup__feature--wifi');
    featuresBlock.innerHTML = '';
    for (var i = 0; i < post.offer.features.length; i++) {
      var feature = featureElement.cloneNode(true);
      feature.classList.add('popup__feature--' + post.offer.features[i]);
      featuresBlock.appendChild(feature);
    }
    map.insertBefore(element, mapFilter);

    element.querySelector('.popup__description').textContent = post.offer.description;
    var photos = element.querySelector('.popup__photos');
    var photoElement = element.querySelector('.popup__photo');
    photos.innerHTML = '';
    for (var i = 0; i < post.offer.photos.length; i++) {
      var photo = photoElement.cloneNode(true);
      photo.src = post.offer.photos[i];
      photos.appendChild(photo);
    }
    map.insertBefore(element, mapFilter);
  }

  window.card = {
    getCard: getCard
  }
})()

