const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const plugins = gulpLoadPlugins();

const cssPath = { 
    cssSrc: [ 
        "./public/stylesheets/*.css", 
        "!*.min.css", 
        "!/**/*/*.min.css"
    ],
    cssDest: "public"
};

gulp.task("css", () => {
    return gulp.src(cssPath.cssSrc)
        .pipe(plugins.concat("styles.css"))
        .pipe(plugins.autoprefixer("last 2 versions"))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(gulp.dest(cssPath.cssDest));
});

const jsPath = {
    jsSrc: [ 
        "./public/javascripts/jquery.js", 
        "./public/javascripts/bootstrap.js", 
        "!*.min.js", 
        "!/**/*/*.min.js"
    ],
    jsDest: "public"
};

gulp.task("js", () => {
    return gulp.src(jsPath.jsSrc)
        .pipe(plugins.concat("scripts.js"))
        .pipe(plugins.stripDebug())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(gulp.dest(jsPath.jsDest));
});

gulp.task('watch', gulp.series(() => {
    gulp.watch(
        [ cssPath.cssSrc[0], jsPath.jsSrc[0] ], 
        gulp.parallel( ["js", "css"] ));
}));

gulp.task("default", gulp.series( ["js", "css"] ));