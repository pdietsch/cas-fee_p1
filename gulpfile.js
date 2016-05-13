var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var del         = require('del');

// Remove build directory.
gulp.task('clean', function(cb) {
    return del(["dist"], cb);
});

// Static Server + watching scss/html files
gulp.task('serve', ['resources', 'sass'], function() {

    browserSync.init({
        server: "./dist/app"
    });

    gulp.watch(["./src/**/*.scss"], ['sass']);
    gulp.watch(["./src/**/*.html", "./src/**/*.js"], ['resources']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/app/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./dist/app/css"))
        .pipe(browserSync.stream());
});

// Copy all resources that are not Sass files into build directory.
gulp.task("resources", function() {
    return gulp.src(["src/**/*", "!**/*.scss"])
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream({once: true}));
});

// Default task
gulp.task('default', ['serve'], function(){
    console.log("Building the project ...");
});