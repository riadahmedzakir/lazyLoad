var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
const fs = require('fs');

var dist = 'dist/';
var appDirectory = 'app/'

// gulp.task('clean-directory', function () {
//     console.log("Cleaning old build files");
//     return gulp.src('dist', { read: false })
//         .pipe(clean());
// });

// gulp.task('minify-css', function () {
//     console.log("Minifying css files");
//     return gulp.src('style/*.css')
//         .pipe(csso({
//             restructure: false,
//             sourceMap: true,
//             debug: true
//         }))
//         .pipe(gulp.dest(dist + 'style'));
// });

function getApps() {
    var apps = fs.readdirSync(appDirectory);
    return apps;
}

gulp.task('uglify-js', function () {
    console.log(getApps());
    // return gulp.src('C:/Users/Riad.ahmed/Desktop/To-Do-List-master/javascript/*.js')
    //     .pipe(uglify())
    //     .pipe(gulp.dest('C:/Users/Riad.ahmed/Desktop/To-Do-List-master/dist/javascript'))
});

// gulp.task('minify-html', function () {
//     return gulp.src('C:/Users/Riad.ahmed/Desktop/To-Do-List-master/index.html')
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest('C:/Users/Riad.ahmed/Desktop/To-Do-List-master/dist/'))
// });

// gulp.task('dependency-files', function () {
//     return gulp.src('C:/Users/Riad.ahmed/Desktop/To-Do-List-master/assets/*')
//         .pipe(gulp.dest('C:/Users/Riad.ahmed/Desktop/To-Do-List-master/dist/assets/'))
// });

// gulp.task('default', gulp.series('clean-directory', 'minify-css', 'uglify-js', 'minify-html', 'dependency-files'));
gulp.task('default', gulp.series('uglify-js'));