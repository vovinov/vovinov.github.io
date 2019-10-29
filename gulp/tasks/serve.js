module.exports = function() {
    $.gulp.task('serve', function() {
        $.gulp.watch('sass/**/*.scss', $.gulp.series('sass'));           
    });
};