var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');
let karmaServer = require('karma').Server;

const config = {
  karmaConf: __dirname + '/tests/conf/'
};

gulp.task('cleanScriptsVendor', function() {
  return gulp.src('scripts/vendor')
    .pipe(clean());
});
gulp.task('cleanContentStylesVendor', function() {
  return gulp.src('content/styles/vendor')
    .pipe(clean());
});
gulp.task('cleanTestsScriptsVendor', function() {
  return gulp.src('tests/scripts/vendor')
    .pipe(clean());
});
gulp.task('cleanTestsStylesVendor', function() {
  return gulp.src('tests/styles/vendor')
    .pipe(clean());
});
gulp.task('cleanContentCoverage', function() {
  return gulp.src('content/coverage')
    .pipe(clean());
});

gulp.task('clean', [
  'cleanScriptsVendor',
  'cleanContentStylesVendor',
  'cleanTestsScriptsVendor',
  'cleanTestsStylesVendor',
  'cleanContentCoverage',
], function () {});

gulp.task('jshint', function () {
    return gulp.src('scripts/app/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

function makeBundleJs(src, dest, path) {
  return gulp.src(src)
    .pipe(gulpif(src.indexOf('.min.js') < 0, uglify()))
    .pipe(concat(dest))
    .pipe(gulp.dest(path)
  );
}

gulp.task('bundleVendor', function () {
  makeBundleJs([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'node_modules/angular-md5/angular-md5.min.js'
  ], 'all.min.js', 'scripts/vendor');
});

// DragDropTouch is with compilation error and cannot be uglyfied
gulp.task('polyfill', function() {
  return gulp.src('node_modules/drag-drop-touch-polyfill/DragDropTouch.js') //for drag and drop work on mobile
    .pipe(gulp.dest('scripts/vendor'));
});

gulp.task('bundleTestsVendor', function() {
  makeBundleJs([
    'node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
    'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
    'node_modules/jasmine-core/lib/jasmine-core/boot.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'node_modules/angular-md5/angular-md5.min.js'
  ], 'vendor.min.js', 'tests/scripts/vendor');
});

gulp.task('bundleTestsVendorWithoutJasmine', function() {
  makeBundleJs([
    'node_modules/angular-mocks/angular-mocks.js',
    'node_modules/angular-md5/angular-md5.min.js'
  ], 'vendor-without-jasmine.min.js', 'tests/scripts/vendor');
});

gulp.task('bundle', [
  'jshint',
  'bundleVendor',
  'polyfill',
  'bundleTestsVendor',
  'bundleTestsVendorWithoutJasmine'
], function () {});

gulp.task('cleanCss', function() {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
  ])
    .pipe(cleanCss({ compatibility: 'ie8' }));
});
gulp.task('cleanCss', function() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(cleanCss({ compatibility: 'ie8' }));
});
gulp.task('copyFonts', function() {
  return gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('content/styles/fonts'));
});
gulp.task('copyTestsStyles', function() {
  return gulp.src('node_modules/jasmine-core/lib/jasmine-core/jasmine.css')
    .pipe(gulp.dest('tests/styles/vendor'));
});

gulp.task('minify-css', ['copyFonts', 'copyTestsStyles', 'cleanCss'], function () {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
  ])
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('content/styles/vendor'));
});


// Test task (run Karma)
gulp.task('karma', function (done) {
  return new karmaServer({
    configFile: config.karmaConf + 'karma.conf.js',
    singleRun: true
  }, function() {
    done();
  }).start();
});

// Test task
gulp.task('test', function(){
  gulp.start('karma');
});

gulp.task("default", function (cb) {
    return runSequence('clean', ['jshint', 'minify-css', 'bundle'], 'karma', cb);
});
