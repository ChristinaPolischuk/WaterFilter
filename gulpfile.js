let gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  pug = require("gulp-pug"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer");

gulp.task("clean", function () {
  del.sync("build");
});

gulp.task("scss", function () {
  return gulp
    .src("dev/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(
      autoprefixer({
        // overrideBrowserslist: ["last 8 versions"],
        cascade: false
      })
    )
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("cssLibs", function () {
  return gulp
    .src([
      "node_modules/normalize.css/normalize.css",
      "node_modules/slick-carousel/slick/slick.css",
      "node_modules/magnific-popup/dist/magnific-popup.css"
    ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("dev/scss"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("pug", function () {
  return gulp
    .src("dev/pug/index.pug")
    .pipe(pug())
    .pipe(gulp.dest("build/"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// gulp.task("script", function() {
//   return (
//     gulp
//       .src("dev/js/**/*.js")
//       .pipe(gulp.dest("build/"))
//       .pipe(
//         browserSync.reload({
//           stream: true
//         })
//       )
//   );
// });

gulp.task("js", function () {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/slick-carousel/slick/slick.js",
      "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
      "dev/js/main.js"
    ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "build/"
    }
  });
});

gulp.task("export", async function () {
  // let buildFonts = gulp.src("dev/fonts/**/*.*").pipe(gulp.dest("build/fonts"));
  gulp.src("dev/fonts/**/*.*").pipe(gulp.dest("build/fonts"));

  // let buildImg = gulp.src("dev/img/**/*.*").pipe(gulp.dest("build/img"));
  gulp.src("dev/img/**/*.*").pipe(gulp.dest("build/img"));
});

gulp.task("watch", function () {
  gulp.watch("dev/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("dev/pug/**/*.pug", gulp.parallel("pug"));
  gulp.watch("dev/js/**/*.js", gulp.parallel("js"));
  gulp.watch("dev/fonts/**/*.*", gulp.parallel("export"));
  gulp.watch("dev/img/**/*.*", gulp.parallel("export"));
});

gulp.task("build", gulp.series("clean", "export"));

gulp.task(
  "default",
  gulp.parallel("pug", "cssLibs", "scss", "js", "browser-sync", "watch")
);