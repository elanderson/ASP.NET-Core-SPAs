/// <binding AfterBuild='angular2:moveJs' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task("angular2:moveLibs", function () {
    return gulp.src([
            "node_modules/@angular/common/**/*",
            "node_modules/@angular/compiler/**/*",
            "node_modules/@angular/core/**/*",
            "node_modules/@angular/http/**/*",
            "node_modules/@angular/platform-browser/**/*",
            "node_modules/@angular/platform-browser-dynamic/**/*",
            "node_modules/@angular/router/**/*",
            "node_modules/@angular/router-deprecated/**/*",
            "node_modules/@angular/upgrade/**/*",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/rxjs/**/*",
            "node_modules/es6-shim/es6-shim.min.js",
            "node_modules/zone.js/dist/zone.js",
            "node_modules/reflect-metadata/Reflect.js"
    ],
        { base: "node_modules" })
        .pipe(gulp.dest(paths.webroot + "Angular/lib"));

});

gulp.task("angular2:moveJs", function () {
    return gulp.src(["Angular/**/*.js"])
        .pipe(gulp.dest(paths.webroot + "Angular/app/"));

});

gulp.task("angular2", ["angular2:moveLibs", "angular2:moveJs"])