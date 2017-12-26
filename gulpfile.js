//引入本地安装的gulp
var gulp = require('gulp');

//引入编译less的插件
var less = require('gulp-less');

//引入压缩css的插件
var cssmin = require('gulp-cssmin');

//引入压缩图片的插件
var imagemin = require('gulp-imagemin');

//引入压缩js的插件
var uglify = require('gulp-uglify');

//引入合并插件
var concat = require('gulp-concat');

//引入html压缩插件
var htmlmin = require('gulp-htmlmin');

//引入添加css私有前缀插件
var autoprefixer = require('gulp-autoprefixer');

// 添加版本号
var rev = require('gulp-rev');

//内容替换
var revCollector = require('gulp-rev-collector');

//
var useref = require('gulp-useref');

var gulpif = require('gulp-if');

//返回值gulp是一个对象，借助此对象，可以实现任务清单定制
// 通过一系列方法实现


//定义任务(将less转成css)
gulp.task('less', function () {
    // console.log("学习gulp");

    //借助gulp.src来指定less文件位置
    gulp.src('./public/less/*.less')
    //借助于gulp插件实现less 转 css 的操作
        .pipe(less())
        //添加私有前缀
        .pipe(autoprefixer())
        //压缩css
        .pipe(cssmin())
        .pipe(rev())
        //通过gulp.dest进行存储
        .pipe(gulp.dest('./release/public'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./release/rev'));


});

// //定义任务：压缩css
// gulp.task('cssmin',function () {
//     gulp.src('./release/public/*.css')
//         .pipe(cssmin())
//         .pipe(gulp.dest('./release/public/cssmin'))
// });

//图片压缩
gulp.task('imagemin', function () {
    //一个*表示当前目录下的所有文件，**表示当前目录下包括子目录内的所以问价
    gulp.src('./public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./release/public/images'))
});

//压缩js
gulp.task('js', function () {
    gulp.src('./scripts/*.js')
    //合并
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./release/scripts'))
});

//压缩html
gulp.task('html', function () {
    //保持index和其他文件的原有位置关系
    gulp.src(['./index.html', './views/*.html'], {base: './'})
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyJS: true}))
        .pipe(gulp.dest('./release'))
});

//替换操作
gulp.task('revCollector',function () {
    gulp.src(['./release/rev/*.json','./release/**/*.html'],{base:'./release'})
        .pipe(revCollector())
        .pipe(gulp.dest('./release'))
});

//
gulp.task('useref',function () {
    gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulpif('*.js',uglify()))
        .pipe(gulp.dest('./release'));
})



