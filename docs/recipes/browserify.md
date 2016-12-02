# Add Browserify

If you want to use `require` or `import`, you will need [Browserify](https://github.com/substack/node-browserify) to bundle up the dependencies.

Follow this recipe to configure Browserify.

## Steps

1. Install dependencies

```
npm install --save-dev babelify browserify vinyl-source-stream
```

2. Configure ESLint by adding the following block under `eslintConfig` in `package.json`.

```
"parserOptions": {
  "ecmaVersion": 6,
  "sourceType": "module",
  "ecmaFeatures": {
    "modules": true
  }
}
```

3. Import dependencies in `gulpfile.babel.js`.

```
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import es from 'event-stream';
...
```

4. Change the `babel` task in `gulpfile.babel.js` as follows:

```js
gulp.task('babel', () => {
  let files = [
    'background.js',
    'chromereload.js'
  ];

  let tasks = files.map( file => {
      return browserify({
        entries: './app/scripts.babel/' + file,
        debug: true
      }).transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source(file))
        .pipe(gulp.dest('app/scripts'));
  });

  return es.merge.apply(null, tasks);
});
```

