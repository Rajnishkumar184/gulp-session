var gulp = require('gulp');

var fs=require('fs');
gulp.task('script',function(){
    return gulp.src('index.html')
        .pipe(performChange)
        .pipe(gulp.dest('./'));

});

function performChange(val){
    console.log(val);

    return val;
}