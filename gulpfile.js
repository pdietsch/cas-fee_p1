var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var del         = require('del');
var ts 			= require('gulp-typescript');
var merge 		= require('merge2');

// Remove build directory.
gulp.task('clean', function(cb) {
    return del(["dist"], cb);
});

// Static Server + watching scss/html files
gulp.task('serve', ['resources', 'sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./dist/app"
        }
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

gulp.task('ts', function(){
	gulp.task('scripts', function() {
	var tsResult = gulp.src('lib/**/*.ts')
		.pipe(ts({
			declaration: true,
			noExternalResolve: true
		}));
 
	return merge([
		tsResult.dts.pipe(gulp.dest('./dist/app/ts/definitions')),
		tsResult.js.pipe(gulp.dest('.dist/app/js'))
	]);
});
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