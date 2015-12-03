# Chrome Extension generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-chrome-extension.svg?branch=master)](http://travis-ci.org/yeoman/generator-chrome-extension)

Maintainer: [Jimmy Moon](https://github.com/ragingwind)

> Chrome Extension generator that creates everything you need to get started with extension development. You can choose Browser UI(Browser,Page Action, Omnibox) type and select into permissions what you need.

## Getting Started

- Please make sure that `yo`, `gulp` and `bower` was installed on your system using this command: `npm install --global yo gulp bower`
- Install the generator: `npm install -g generator-chrome-extension`
- Make a new directory, and `cd` into it: `mkdir my-new-chrome-extension && cd $_`
- Run: `yo chrome-extension`, optionally passing an extension name: yo chrome-extension [extension-name]

Need more information about Chrome Extension? Please visit [Google Chrome Extension Development](http://developer.chrome.com/extensions/devguide.html)

## Generators

Available generators:

* [chrome-extension](#app) (aka [chrome-extension:app](#app))

### App

Sets up a new Chrome Extension, generating all the boilerplate you need to get started.

```bash
yo chrome-extension
```

## Test Chrome Extension

To test, go to: chrome://extensions, enable Developer mode and load app as an unpacked extension.

## ES2015

ES2015 is the default option in the generator that means you can use es2015 now for developing the Chrome extensions. However, at this moment, you need to execute `babel` task of gulp to compile to test and run your extension on Chrome, because [ES2015 is not full functionality on Chrome as yet](http://kangax.github.io/compat-table/es6/). sources written by es2015 is located at `scripts.babel` and runnable sources are will be created at `script` after compiling by gulp.

## Sass

This generator supports `sass` through `--sass` options and generate `scss` boilerplate files at `styles.scss` that those of `scss` files will be compiled to `styles` via `gulp style` task. To do this, `libsass` is featured in the generator. Please see [this](https://github.com/yeoman/generator-gulp-webapp#libsass) for further information.

```bash
gulp babel
```

If you would like to have a continuous compile by babel you can use `watch` task

```bash
gulp watch
```

## gulp tasks

### Watch

Watch task helps you reduce your efforts during development extensions. If the task detects your changes of source files, re-compile your sources automatically or Livereload([chromereload.js](https://github.com/yeoman/generator-chrome-extension/blob/master/app/templates/scripts/chromereload.js)) reloads your extension. If you would like to know more about Live-reload and preview of Yeoman? Please see [Getting started with Yeoman and generator-webapp](http://youtu.be/zBt2g9ekiug?t=3m51s) for your understanding.

```bash
gulp watch
```

### Build

By default, generators compress the file that was created by building a js/css/html/resource file. You can distribute the compressed file using the Chrome Developer Dashboard to publish to the Chrome Web Store.

Run this command to build your Chrome Extension project.

```bash
gulp build
```

## Options

* `--no-babel`

  If you wouldn't use [Babel](https://babeljs.io/) ES2015 transpiler.

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

* `--sass`

  Add support for [Sass](http://sass-lang.com/libsass).

* `--all-permissions`

  All of permissions of chrome extension will be shown.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
