###GULP

######Table of content
--------------------

1) What is gulp & Why we use gulp?
2) Workflow of gulp vs Grunt.
3) Installation of gulp.
4) Creating gulpfile.js,gulpfile.coffee
5) Gulp core functions.
6) Gulp task.
     a) How to create gulp task.
     b) Create default task.
     c) Define watch.
7) Task to concat and minify css.
8) Task to compile scss to css. 
9) Task to lint and minify js.
10) Task to minify image. 
11) Task to minify html.
12) Task to convert set of image into sprite image
13) Task to copy files
14) Task to inject file at runtime.
15) Pass a flag to Gulp to run task conditionally.
16) Using Browser Sync With gulp.

####1) What is gulp & Why we use gulp?
----------------------

Gulp is a JavaScript Task Runner that uses Node.js as a platform. Gulp purely uses the JavaScript code and helps to run front-end tasks and large-scale web applications. It builds system automated tasks like CSS and HTML minification, concatenating library files, and compiling the SASS files. These tasks can be run using Shell or Bash scripts on the command line.

Gulp is a javascript task runner that lets you automate tasks such as…

=> Bundling and minifying libraries and stylesheets.
=> Refreshing your browser when you save a file.
=> Quickly running unit tests
=> Running code analysis
=> Less/Sass to CSS compilation
=> Copying modified files to an output directory


####2) Workflow of gulp vs Grunt or Cakefile
----------------------

###### gulp workflow

a) We start by defining a task that we would like to accomplish.
b) Within that task, a desired set of files are loaded into the gulp stream to be processed. (Optional) Once files are in the stream, one or more modifications can be made to the files. Because the streams are processed in memory, no file - system writes to temporary directories between modifications are required.
c) Send the new (possibly modified) files to a specified destination.

###### grunt workflow

a) We start by defining a task that we would like to accomplish.
b) While Grunt use files to execute tasks, Gulp.js uses streams. It means that a typical Grunt workflow would be to execute a task that dumps a temporary file, than based on this file to execute another task that dumps another temporary file an so on…
c) Send the new (possibly modified) files to a specified destination.


####3) Installation of gulp.
-------------------------

=> Install Gulp Globally
``
sudo npm install -g gulp
``

=>Install Gulp In Locally (devDependencies)
``
npm install --save-dev gulp
``

####4) Creating gulpfile.js,gulpfile.coffee


####5) Gulp core API.
----------------------------

#####API	and It's Purpose

######gulp.task	         ==>  Define a task
######gulp.src	         ==>  Read files in
######gulp.dest	         ==>  Write files out
######gulp.watch         ==>  Watch files for changes


####6)Gulp task.
------------------

#####a) How to create gulp task.

Syntax:

``
gulp.task('task name',function(){});
``

Example:

``
gulp.task('scss',function(){
// do some stuff here.
});
``

#####b)Create default task.

Syntax:

``
gulp.task('default',[dependent-task],function(){});
``

Example:

``
gulp.task('default',['scss'],function(){
// do some stuff here.
});
``

#####c) Define watch.

Syntax:

``
gulp.watch('source', ['task-name']);
``

####7) Task for css linting and minifier
------------------------------------------

````
var gulp=require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

gulp.task('css',function(){
    gulp.src('./css/*.css')
    .pipe(concat('app.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./'));

});
````

####8) Task to compile scss to css 
-----------------------------------

````
var gulp=require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var sass   = require('gulp-sass');

gulp.task('scss',function(){
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./'));
});
````

##### css auto fixer.

````
var gulp=require('gulp');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var sass   = require('gulp-sass');
var autoprefixer=require('gulp-autoprefixer');

gulp.task('scss',function(){
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./'));
});
````

####9) Task to lint and minify js.
----------------------------------
````
var gulp=require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function(){
    gulp.src('./js/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));

});
````

##### using gulp-plumber

````
var gulp=require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('script',function(){
    gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));

});
````
##### ECMAScript 6 Compilation

````
var gulp=require('gulp');
var babel = require("gulp-babel");
var concat = require('gulp-concat');

// install babel-preset-es2015

gulp.task('es6',function(){
    gulp.src(['./js/*.js'])
    .pipe(babel({
        presets: ['es2015']
    }))
        .pipe(concat('app.js'))
    .pipe(gulp.dest('./'));

});
````

####10) Task to minify image. 
-----------------------------

````
var gulp=require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('image',function(){
    gulp.src(['./images/*.{jpg,png}'])
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest('./'));

});
````

####11) Task to minify html
-----------------------------

````
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
    return gulp.src('*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
});
````
####12) Task to convert set of image into sprite image
-------------------------------------------------------

````
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/images/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('./dist/images/'));
});
````


####13) Task to copy files
---------------------------

````
var gulp=require('gulp');

gulp.task('copy',function(){
    gulp.src(['./src/views/*.html'])
    .pipe(gulp.dest('./dist/views/'));

});
````

####14) Task to inject file at runtime.
---------------------------------------
````
var gulp=require('gulp');
var inject = require('gulp-inject');


gulp.task('injector',function(){
    var source=["./dist/css/app.css",
        "./dist/js/app.js"
    ];

    return gulp.src('index.html')
        .pipe(inject(gulp.src(source,{read: false, cwd: "" + "./", addRootSlash: true }),{relative: true}))
        .pipe(gulp.dest('./'));

});
````

#### create task to watch changes in files.

````
var gulp=require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function(){
    gulp.src('./src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));

});

gulp.task('watch',function(){

    gulp.watch('./src/js/*.js',['script']);

});

gulp.task('default',['script','watch'],function(){

});
````
#####gulp.watch do not detect any new file added at runtime.

````
var gulp=require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('script',function(){
    gulp.src('./src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));

});

gulp.task('watch',function(){
    
    watch('./src/js/*.js', function (events, done) {
        gulp.start('script');
    });

});

gulp.task('default',['script','watch'],function(){
    console.log("complete default")
});
````

####15) Pass a flag to Gulp to run task conditionally.
-------------------------------------------------------

#####By using node js process module.

````
var gulp=require('gulp');
var process=require('process');

console.log(process.argv);
var env=process.argv? process.argv[2].split('=')[1]:null;
console.log(env);

gulp.task('default',function(){
console.log("default")
});
````
##### By using gulp's yargs module.

````
var gulp = require('gulp');
var argv = require('yargs').argv;

console.log(argv);

gulp.task('default',function(){

});
````

####16) Using Browser Sync With gulp.
-------------------------------------

````
var gulp=require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();


var src={
    script:['./src/js/*.js'],
    scss:['./src/scss/*.scss']
};

var dist={
    script:'./dist/js/',
    css:'./dist/css/'
};

gulp.task('script', function() {
    return gulp.src(src.script)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.script))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', function() {
    return gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch',function(){
    watch(src.script, function (events, done) {
        gulp.start('script');
    });
    watch(src.scss, function (events, done) {
        gulp.start('scss');
    });
});

gulp.task('server',function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

});

gulp.task('default',['scss','script','watch'],function(){
    gulp.start('server');
});
````
