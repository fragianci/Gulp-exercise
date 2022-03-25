const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat')
const watch = require('gulp-watch');

/*
  -- TOP LEVEL FUNTIONS --
  gulp.task  -  Define tasks
  gulp.src   -  Point to files to use
  gulp.dest  -  Points to folders to output
  gulp.watch -  Watch files and folders for changes
*/

// Logs Message
gulp.task('message', ()=>{
  return console.log('Gulp is running with message...')
});

// Copy all html files
gulp.task('copyHTML', ()=>{
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
});


// Optimizing images
gulp.task('imageMin', ()=>
gulp.src('src/images/*.png')
.pipe(imagemin())
.pipe(gulp.dest('dist/images'))
)

// Minifying JS
gulp.task('scripts', ()=>{
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
});

// Compile sass
gulp.task('sass', ()=>{
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('default', gulp.parallel('message', 'copyHTML', 'imageMin', 'scripts', 'sass'));

gulp.task('watch', ()=>{
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/images/*.png', gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHTML'));
})