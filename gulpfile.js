require('dotenv').load();

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpacker = require('webpack-stream'),
    webpack = require('webpack'),
    sourcemaps = require('gulp-sourcemaps'),
    runSeq = require('run-sequence'),
    wait = require('gulp-wait'),
    replace = require('gulp-replace');

gulp.task('sass', function () {
    gulp.src('./src/**/*.scss')
        /*.pipe(replace('<%--assetUrl--%>', process.env.ASSET_DOMAIN))*/
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src'));
});

gulp.task('sass-webpack', function (callback) {
    runSeq('sass', 'webpack', callback);
});

gulp.task('webpack', function () {
    return gulp.src([])
        .pipe(webpacker({
            entry: {
                toaster: './index.js'
            },
            output: {
                filename: '[name].js'
            },
            module: {
                loaders: [{
                    exclude: /(node_modules|vendor)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-1', 'stage-2', 'stage-3']
                    }
                }, {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                }]
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
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.scss'], ['sass-webpack']);
    gulp.watch(['./src/**/*.js'], ['webpack']);
});

gulp.task('default', ['sass-webpack']);
