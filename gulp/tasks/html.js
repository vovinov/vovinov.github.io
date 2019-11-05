module.exports = function() {
    $.gulp.task('html', function() {
        return $.gulp.src('*.html')                              
                .pipe($.gulp.dest('*.html'))
                .on('change', $.browserSync.reload)                            
    });
};