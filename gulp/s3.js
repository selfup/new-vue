var gulp = require('gulp');
var fs = require('fs')
var config = JSON.parse(fs.readFileSync('secrets.json'));
var s3 = require('gulp-s3-upload')(config);

gulp.task("s3", function() {
 gulp.src(`./service-worker.js`)
     .pipe(s3({
         Bucket: 'vue-js-idea-box',
         ACL: 'public-read'},
         { maxRetries: 5 }));
  gulp.src(`./dist/*`)
      .pipe(s3({
          Bucket: 'vue-js-idea-box',
          ACL: 'public-read'},
          { maxRetries: 5 }));
  gulp.src(`./dist/**/*`)
      .pipe(s3({
          Bucket: 'vue-js-idea-box',
          ACL: 'public-read'},
          { maxRetries: 5 }));
});