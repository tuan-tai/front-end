"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require("gulp-autoprefixer");
const del = require('del');

const paths = {
  styles: {
    src : "./public/common/scss/**/*.scss",
    dest : "./public/common/css/"
  }
}

function clean() {
  return del([paths.styles.dest]);
}

function watchStyles() {
  return gulp.src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest));
}

function buildStyles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 2 version"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch(paths.styles.src, watchStyles);
  // gulp.watch(paths.styles.src, watchStyles); Add more task. Ex: watchScripts()
}

exports.clean = clean;
exports.watchStyles = watchStyles;
exports.buildStyles = buildStyles;
exports.watch = watch;

const build = gulp.series(clean, gulp.parallel(buildStyles));

gulp.task("default", watch);

gulp.task("build", build);