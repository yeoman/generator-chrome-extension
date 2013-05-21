# Chrome Extension generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-chrome-extension.png?branch=master)](http://travis-ci.org/yeoman/generator-chrome-extension)

Maintainer: [Jimmy Moon](https://github.com/ragingwind)

## Getting Started
- First make a new directory, and `cd` into it: mkdir my-new-chrome-extension && cd $_
- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Install the generator: `npm install -g generator-chrome-extension`
- Run: `yo chrome-extension`, optionally passing an extension name: yo chrome-extension [extension-name]

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

## Generator
Chrome Extension generator that creates everything you need to get started with extension development. You can choose Browser UI(Browser,Page Action, Omnibox) type and select into permissions what you need.

If you need more information? Please visit [Google Chrome Extension Develpment](http://developer.chrome.com/extensions/devguide.html)

## Test
To test, go to: chrome://extensions, enable Developer mode and load app as an unpacked extension.

## Build & Package
By default, generators compress the file that was created by building a js/css/html/resource file. You can distribute the compressed file using the Chrome Developer Dashboard to publish to the Chrome Web Store.

Run this command to build your Chrome Extension project.

```grunt build```

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
