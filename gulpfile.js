global.$ = {
    gulp: require('gulp'), 
    gp: require('gulp-load-plugins')(),     
    path: {
        jquery: "./js/jquery.js",
        js: "./js/**/*.js",
        config: require('./gulp/config')
    }   
};


$.path.config.forEach(function (path) {
    require(path)();    
});