module.exports = function() {
    $.gulp.task('sass', function() {
        return $.gulp.src('sass/style.scss') 
                .pipe($.gp.plumber())               
                .pipe($.gp.sass())
                .pipe($.gp.autoprefixer({
                    overrideBrowserslist: ['last 2 versions']
                }))
                .pipe($.gp.rename('style.min.css'))                
                .pipe($.gulp.dest('css')) 
                .pipe($.browserSync.stream())                       
    });
};