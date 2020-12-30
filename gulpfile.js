var gulp        = require('gulp');
var flatten     = require('gulp-flatten');
var rename      = require('gulp-rename');
var replace     = require('gulp-replace');
var browserSync = require('browser-sync').create();

gulp.task('default', function(callback) {
    gulp.src(['**/*.htm', '!node_modules/**']).
    pipe(flatten()).
    pipe(rename('index.html')).
    pipe(replace(/tppabs="([^"]+)"/g, '')).
    pipe(replace(/<head(.*)>/g, '$&{{ head_includes|safe }} {{comebacker|safe}} <script src="http://ctr-localhost.ru/vlad/jq.js"></script>')).
    pipe(replace(/"javascript:(.*)This file was not retrieved by Teleport Pro(.*)%27"/g, '"#"')).
    pipe(replace(/href="(.*)\/(.*).css"/g, 'href="css/$2.css"')).
    pipe(replace(/src="(.*)\/(.*).jpg"/g, 'src="img/$2.jpg"')).
    pipe(replace(/src="(.*)\/(.*).jpeg"/g, 'src="img/$2.jpeg"')).
    pipe(replace(/src="(.*)\/(.*).png"/g, 'src="img/$2.png"')).
    pipe(replace(/src="(.*)\/(.*).ico"/g, 'src="img/$2.ico"')).
    pipe(replace(/src="(.*)\/(.*).gif"/g, 'src="img/$2.gif"')).
    pipe(gulp.dest(''));

    gulp.src(['**/*.css', '!node_modules/**']).
    pipe(flatten()).
    pipe(replace(/\/\*.+?\*\//g, '')).
    pipe(gulp.dest('css'));

    gulp.src(['**/*.js', '!node_modules/**']).
    pipe(flatten()).
    pipe(gulp.dest('js'));

    gulp.src(['**/*.{ttf,eot,woff,otf}', '!node_modules/**']).
    pipe(flatten()).
    pipe(gulp.dest('fonts'));

    gulp.src(['**/*.{png,jpg,gif,ico,jpeg}', '!node_modules/**']).
    pipe(flatten()).
    pipe(gulp.dest('img'));

    gulp.src(['**/*.htm', '!node_modules/**']).
    pipe(flatten()).
    pipe(replace(/tppabs="([^"]+)"/g, '')).
    pipe(replace(/<head>/g, '<head>{{ head_includes|safe }} {{comebacker|safe}}')).
    pipe(gulp.dest(''));


    console.log('task success!');

    callback();
});

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    browserSync.watch('**/*.*').on('change', browserSync.reload);
});
