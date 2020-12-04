const { series, src, dest, watch } = require('gulp');

const htmlClean = require('gulp-htmlclean');

const less = require('gulp-less')
const cleanCss = require('gulp-clean-css');

const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');

const imageMin = require('gulp-imagemin');

const folder = {
    src: 'src/',
    dist: 'dist/'
}

function html() {
    return src(folder.src + 'html/*')
        .pipe(htmlClean())
        .pipe(dest(folder.dist+ 'html/'))
}

function css() {
    return src(folder.src + 'css/*')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(folder.dist + 'css/'))
}
function js() {
    return src(folder.src + 'js/*')
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(dest(folder.dist + 'js/'))
}

function images() {
    return src(folder.src + 'images/*')
        .pipe(imageMin())
        .pipe(dest(folder.dist + 'images/'))
}

function musics(){
    return src(folder.src + 'music/*')
    .pipe(dest(folder.dist + 'music/'))
}
function data(){
    return src(folder.src + 'data.json')
    .pipe(dest(folder.dist ))
}

exports.default = series(html, css, js, images,musics, data);