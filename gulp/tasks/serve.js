module.exports = function() {
    $.gulp.task('serve', function() {
        $.browserSync.init({
            server: {
                baseDir: "./"
            }
        });
        $.gulp.watch('sass/**/*.scss', $.gulp.series('sass'));
        $.gulp.watch('*.html').on('change', $.browserSync.reload);          
    });
};