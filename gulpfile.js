require('dotenv').load();

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpacker = require('webpack-stream'),
    webpack = require('webpack'),
    sourcemaps = require('gulp-sourcemaps'),
    inlinesource = require('gulp-inline-source'),
    runSeq = require('run-sequence'),
    wait = require('gulp-wait'),
    replace = require('gulp-replace');

gulp.task('sass', function () {
    gulp.src('./resources/scss/**/*.scss')
        .pipe(replace('<%--assetUrl--%>', process.env.ASSET_DOMAIN))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./resources/public/assets'));
});

//gulp.task('webfront', function () {
//    return gulp.src('./resources/js/webfront/**/*.js')
//        .pipe(gulp.dest('./resources/public/assets'));
//});

gulp.task('img', function () {
    return gulp.src('./resources/assets/img/**/*')
        .pipe(gulp.dest('./resources/public/assets/img'));
});

gulp.task('fonts', function () {
    return gulp.src('./resources/assets/fonts/**/*')
        .pipe(gulp.dest('./resources/public/assets/fonts'));
});

gulp.task('vstb', function () {
    return gulp.src('./resources/js/vstb/debug.js')
        .pipe(gulp.dest('./resources/public/assets/js/vstb'));
});

gulp.task('webpack', function () {
    return gulp.src([])
        .pipe(webpacker({
            entry: {
                secret: './resources/js/webfront/SecretLogin.js',
                landing: './resources/js/webfront/landing.js',
                player: './resources/js/webfront/player.js',
                'player-extras': './resources/js/webfront/player-extras.js',
                popoutPlayer: './resources/js/webfront/popoutPlayer.js',
                masthead: './resources/js/webfront/masthead.js',
                carousel: './resources/js/webfront/carousel.js',
                titles: './resources/js/webfront/titles.js',
                channels: './resources/js/webfront/channels.js',
                genres: './resources/js/webfront/genres.js',
                receiver: './resources/js/chromecast/receiver.js',
                'cast-receiver': './resources/js/chromecast/CastReceiver.js',
                common: [ './resources/js/webfront/polyfill.js', './resources/js/webfront/ui.js', './resources/js/webfront/navbar.js' ]
            },
            output: {
                filename: '[name].js'
            },
            module: {
                loaders: [
                    {
                        exclude: /(node_modules|vendor)/,
                        loader: 'babel',
                        query: {
                            presets: ['react', 'es2015', 'stage-1', 'stage-2', 'stage-3']
                        }
                    }
                ]
            },
            externals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
                '__props': '__props'
            },
            plugins: process.env.NODE_ENV === 'production' ? [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
                }),
                new webpack.optimize.UglifyJsPlugin()
            ] : [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
                })
            ],
            devtool: 'source-map'
        }))
        //.pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulp.dest('./resources/public/dist'));
});

gulp.task('vendors', function () {
    return gulp.src([
            './resources/vendor/react/react.js',
            './resources/vendor/react/react-dom.js',
            './resources/vendor/vibrant/dist/Vibrant.min.js'
        ])
        .pipe(gulp.dest('./resources/public/vendor'));
});

gulp.task('preroll', function () {
    return gulp.src([
            './resources/assets/preroll.webm'
        ])
        .pipe(gulp.dest('./resources/public/assets'));
});

gulp.task('sass:chromecast', function (callback) {
    runSeq('sass', 'inline:chromecast', callback);
});

gulp.task('js:chromecast', function (callback) {
    runSeq('webpack', 'inline:chromecast', callback);
});

gulp.task('inline:chromecast', function () {
    return gulp.src(['./src/Views/chromecast/*.html'])
        .pipe(wait(1000))
        .pipe(inlinesource())
        .pipe(gulp.dest('./src/Views/chromecast/compiled'));
});

gulp.task('watch', function () {
    gulp.watch(['./resources/scss/**/*.scss', '!./resources/scss/receiver.scss'], ['sass']);
    //gulp.watch(['./resources/js/**/*', './src/Http/Components/**/*.js'], ['webfront', 'webpack']);
    gulp.watch(['./resources/js/**/*', './src/Http/Components/**/*.js', '!./resources/js/chromecast/receiver.js', '!./resources/js/chromecast/CastReceiver.js'], ['webpack']);
    gulp.watch(['./resources/scss/receiver.scss'], ['sass:chromecast']);
    gulp.watch(['./resources/js/chromecast/receiver.js', './resources/js/chromecast/CastReceiver.js'], ['js:chromecast']);
    gulp.watch(['./src/Views/chromecast/*.html'], ['inline:chromecast']);
});

//gulp.task('default', ['sass', 'webfront', 'vstb', 'webpack', 'vendors', 'fonts', 'preroll']);
//gulp.task('default', ['sass', 'vstb', 'webpack', 'vendors', 'fonts', 'preroll', 'inline:chromecast']);
gulp.task('default', function (callback) {
    runSeq(['vstb', 'vendors', 'img', 'fonts', 'preroll'], 'sass', 'webpack', 'inline:chromecast', callback);
});
