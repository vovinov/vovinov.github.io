'use strict';
(function() {
  var URL = {
    get: 'https://js.dump.academy/keksobooking/data',
    post: 'https://js.dump.academy/keksobooking'
  };

  var methods = {
    get: 'GET',
    post: 'POST'
  };

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s
    });

    xhr.open(methods.get, URL.get);
    xhr.send();
  };

  var pushData = function(data, onUpload, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 400) {
        onError();
      } else {
        onUpload(xhr.response);
      };
    });

    xhr.open(methods.post, URL.post);
    xhr.send(data);
  };

  window.backend = {
    getData: getData,
    pushData: pushData
  };

})()
