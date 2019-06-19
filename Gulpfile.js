const gulp = require('gulp');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const clean = require('gulp-clean');
const fs = require('fs');
const loop = require('wait-loop');
const concat = require('gulp-concat');

var dist = 'dist/';
var appDirectory = 'app/'

gulp.task('clean-directory', function () {
    console.log("Cleaning old build files");
    return gulp.src(dist + '*', { read: false })
        .pipe(clean());
});

gulp.task('minify-css', function () {
    console.log("Minifying css files");
    return gulp.src('style/*.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest(dist + 'style'));
});

function getApps() {
    var apps = fs.readdirSync(appDirectory);
    return apps;
}

gulp.task('merge-js', function () {
    console.log("Merging javascritps");
    var stream;
    loop.each(getApps(), function (appName) {
        stream = gulp.src([
            'app/' + appName + '/controller/*.js',
            'app/' + appName + '/service/*.js'
        ])
            .pipe(concat(appName + '.js'))
            .pipe(gulp.dest(dist + 'app/' + appName + '/scripts/'))
        loop.next();
    });

    loop.on(err => {
        if (err) {
            console.log(err);
        }
    });
    return stream;
})

gulp.task('uglify-js', function () {
    console.log("Uglify javascritps");
    var stream;
    loop.each(getApps(), function (appName) {
        stream = gulp.src(dist + 'app/' + appName + '/' + appName + '*.js')
            .pipe(uglify())
            .pipe(gulp.dest(dist + 'app/' + appName + '/'))
        loop.next();
    });

    loop.on(err => {
        if (err) {
            console.log(err);
        }
    });
    return stream;
});

gulp.task('minify-html', function () {
    console.log("Uglify javascritps");
    var stream;
    loop.each(getApps(), function (appName) {
        stream = gulp.src('app/' + appName + '/view/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest(dist + 'app/' + appName + '/view/'))
        loop.next();
    });

    loop.on(err => {
        if (err) {
            console.log(err);
        }
    });
    return stream;
});

gulp.task('dependency-files', function () {
    return gulp.src('assets/*')
        .pipe(gulp.dest(dist + 'assets/'))
});

gulp.task('node-scripts', function () {
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/oclazyload/dist/ocLazyLoad.min.js'
    ])
        .pipe(gulp.dest(dist + 'scripts/'))
});

gulp.task('index-files', function () {
    return gulp.src([
        'index.js',
        'index.html'
    ])
        .pipe(gulp.dest(dist))
})

gulp.task('default', gulp.series('clean-directory', 'minify-css', 'merge-js', 'uglify-js', 'minify-html', 'dependency-files', 'node-scripts', 'index-files'));
// gulp.task('default', gulp.series('clean-directory', 'merge-js', 'uglify-js', 'minify-html'));