(function() {

  var NUMBER_POSTS = 8;
  var containerX = document.querySelector('.map__overlay').offsetWidth;

  function getPost() {
    var post = {
      'author': {
        avatar: ''
      },
      'offer': {
        title: data.titles[Math.floor(Math.random() * data.titles.length)],
        address: '',
        price: utils.randomInteger(1000, 1000000),
        type: Object.keys(data.types)[Math.floor(Math.random() * Object.keys(data.types).length)],
        rooms: utils.randomInteger(1, 5),
        guests: utils.randomInteger(1, 10),
        checkin: data.checkTime[0],
        checkout: data.checkTime[0],
        features: data.featuresArray,
        description: '',
        photos: utils.shuffleArray(data.photos)
      },
      'location': {
        x: utils.randomInteger(0, containerX - data.widthPin),
        y: utils.randomInteger(130, 630)
      }
    };
    post.offer.address = post.location.x + ', ' + post.location.y;
    return post;
  };

  var getPosts = function() {
    var posts = [];
    for (var i = 0; i < NUMBER_POSTS; i++) {
      var post = getPost();
      post.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
      posts.push(post);
    }
    return posts
  }

  window.post = {
    getPosts: getPosts
  }

})();
