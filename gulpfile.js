var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var del         = require('del');
var ts 			= require('gulp-typescript');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

// Remove build directory.
gulp.task('clean', function(cb) {
    return del(["dist"], cb);
});

// Static Server + watching scss/html files
gulp.task('serve', ['resources', 'sass','ts', 'templates'], function() {

    browserSync.init({
        server: {
            baseDir: "./dist/app"
        }
    });
    gulp.watch(["./src/app/templates/*.hbs"], ['templates'])
	  gulp.watch(["./src/app/ts/*.ts"], ['ts']);
    gulp.watch(["./src/**/*.scss"], ['sass']);
    gulp.watch(["./src/**/*.html", "./src/**/*.js"], ['resources']);
});

gulp.task('templates', function(){
  gulp.src('./src/app/templates/*.hbs')
  .pipe(handlebars())
  .pipe(wrap('Handlebars.template(<%= contents %>)'))
  .pipe(declare({
    namespace: 'P1.templates',
    noRedeclare: true, // Avoid duplicate declarations
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest('./dist/app/js/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/app/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./dist/app/css"))
        .pipe(browserSync.stream());
});


gulp.task('ts', function() {
  return gulp.src('./src/app/ts/main.ts').pipe(ts({
    noImplicitAny: true,
    target: 'ES5',
    out: 'output.js'

  }))
  .pipe(gulp.dest('./dist/app/js'));
});

// Copy all resources that are not Sass files into build directory.
gulp.task("resources", function() {
    return gulp.src(["src/**/*", '!src/app/{scss,scss/**}', "!**/*.scss","!**/*.ts","!**/*.hbs"])
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream({once: true}));
});

// Build
gulp.task('build', ['resources', 'sass'], function(){
    console.log("Building the project ...");
});

// Default task
gulp.task('default', ['serve'], function(){
    console.log("Building the project and start ...");
});