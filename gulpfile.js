var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	//livereload = require('gulp-livereload'),
	notifier = require('node-notifier'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps')

var config = {
	paths: {
		sassCompile: './sass/styles.sass',
		sassWatch: ['./sass/**/*.sass'],
		css: './www/css/',
		html: './www/**/*.html'
	},
	sassIndented: true,
	production: false
}

gulp.task('sass', function() {
	if ( config.production ) {
		gulp.src(config.paths.sassCompile)
			.pipe(sass({
				indentedSyntax: config.sassIndented,
				outputStyle: 'compressed',
				onError: function(error) { errorHandler('Sass', error) }
			}))
			.pipe(autoprefixer())
			.pipe(gulp.dest(config.paths.css))
	} else {
		gulp.src(config.paths.sassCompile)
			//.pipe(sourcemaps.init())
			.pipe(sass({
				indentedSyntax: config.sassIndented,
				onError: function(error) { errorHandler('Sass', error) }
			}))
			.pipe(autoprefixer())
			//.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.paths.css))
			//.pipe(livereload())
	}
})

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(livereload())
})

gulp.task('watch', function() {
	//livereload.listen()
	//gulp.watch(config.paths.html, ['html'])
	gulp.watch(config.paths.sassWatch, ['sass'])
})

gulp.task('production', function() {
	config.production = true
	gulp.start('sass')
})

gulp.task('default', function() {
	gulp.start('sass', 'watch')
})

function errorHandler(title, error){
	if (typeof error.file === 'undefined') error.file = '?'
	if (typeof error.line === 'undefined') error.line = '?'
	if (typeof error.column === 'undefined') error.column = '?'
	notifier.notify({
		title: title + ' Error',
		message: "\n" + error.message + "\n\t\nFile: " + error.file + "\nLine: " + error.line + "\nColumn: " + error.column
	});
	console.log(color(title + ' Error: ' + error.message, 'red') + "\nFile: " + error.file + "\nLine: " + error.line + "\nColumn: " + error.column);
}

function color(string, color) {
	var prefix
	switch (color) {
		case 'red': prefix = '\033[1;31m'; break; // and bold
		case 'green': prefix = '\033[0;32m'; break;
	}
	return prefix + string + '\033[0m'
}
