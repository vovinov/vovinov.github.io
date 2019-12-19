global.$ = {
    gulp: require('gulp'), 
    gp: require('gulp-load-plugins')(),   
    browserSync: require('browser-sync').create(), 
    smartgrid: require('smart-grid'),
    path: {
        jquery: "./js/jquery.js",
        js: "./js/**/*.js",
        config: require('./gulp/config')
    }   
};


$.path.config.forEach(function (path) {
    require(path)();    
});