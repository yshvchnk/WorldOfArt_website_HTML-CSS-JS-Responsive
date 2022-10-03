"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("autoprefixer");
const imgmin = require("gulp-imagemin");

const dist = "./dist/";

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-css", () => {
  return gulp.src("./src/assets/css/main.css")
              .pipe(rename({suffix: '.min', prefix: ''}))
              .pipe(postcss([autoprefixer()]))
              .pipe(cleanCSS({compatibility: 'ie8'}))
              .pipe(gulp.dest('dist/assets/css'))
              .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});


gulp.task("copy-assets", () => {
  gulp.src("./src/assets/fonts/*.*")
      .pipe(gulp.dest(dist + "/assets/fonts"));
  gulp.src("./src/assets/*.php")
    .pipe(gulp.dest(dist + "/assets"));
  gulp.src("./src/assets/*.json")
    .pipe(gulp.dest(dist + "/assets"));
  return gulp.src("./src/assets/img/**/*.*")
              .pipe(imgmin())
              .pipe(gulp.dest(dist + "/assets/img"))
              .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "build-css", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));