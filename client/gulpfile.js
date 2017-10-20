var gulp = require('gulp');
var merge = require('merge-stream');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return merge(
      gulp.src('scripts/vendor')
        .pipe(clean()),

      gulp.src('content/styles/vendor')
        .pipe(clean()),

      gulp.src('tests/scripts/vendor')
        .pipe(clean())
    );
});

gulp.task('jshint', function () {
    return gulp.src('scripts/app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('bundle', ['jshint'], function () {
  return merge(
		makeBundleJs([
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'node_modules/angular/angular.min.js',
			'node_modules/angular-route/angular-route.min.js',
			'node_modules/angular-animate/angular-animate.min.js',
			'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
		], 'all.min.js', 'scripts/vendor'),
    makeBundleJs('node_modules/angular-mocks/angular-mocks.js',
        'angular-mocks.js',
        'tests/scripts/vendor')
	);

  function makeBundleJs(src, dest, path) {
    return gulp.src(src)
  		.pipe(gulpif(src.indexOf('.min.js') < 0, uglify()))
  		.pipe(concat(dest))
  		.pipe(gulp.dest(path)
    );
  }
});

gulp.task('minify-css', function () {
  return merge(
		merge(
			gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css'),
			gulp.src('node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css')
				.pipe(cleanCss({ compatibility: 'ie8' }))
		)
			.pipe(concat('vendor.min.css'))
			.pipe(gulp.dest('content/styles/vendor')),

		gulp.src('node_modules/bootstrap/dist/fonts/*.*')
			.pipe(gulp.dest('content/styles/fonts'))
	);
});

gulp.task("default", function (cb) {
    return runSequence('clean', ['jshint', 'minify-css', 'bundle'], cb);
});
