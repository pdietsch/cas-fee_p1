var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var del         = require('del');
var ts 			= require('gulp-typescript');

// Remove build directory.
gulp.task('clean', function(cb) {
    return del(["dist"], cb);
});

// Static Server + watching scss/html files
gulp.task('serve', ['resources', 'sass','ts'], function() {

    browserSync.init({
        server: {
            baseDir: "./dist/app"
        }
    });

    gulp.watch(["./src/app/ts/**/*.ts"], ['ts']);
    gulp.watch(["./src/app/scss/**/*.scss"], ['sass']);
    gulp.watch(["./src/**/*.html", "./src/**/*.js"], ['resources']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/app/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./dist/app/css"))
        .pipe(browserSync.stream());
});

// Compile ts into js & auto-inject into browsers
gulp.task('ts', function () {
    return gulp.src('./src/app/ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('./dist/app/js'));
});

// Copy all resources that are not Sass files into build directory.
gulp.task("resources", function() {
    return gulp.src(["src/**/*", '!src/app/{scss,scss/**}', "!**/*.scss", "!src/app/{ts,ts/**}", "!**/*.ts"])
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream({once: true}));
});

// Build
gulp.task('build', ['resources', 'sass', 'ts'], function(){
    console.log("Building the project ...");
});

// Default task
gulp.task('default', ['serve'], function(){
    console.log("Building the project and start ...");
});