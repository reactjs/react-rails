# Common Errors

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting warning for `Can't resolve 'react-dom/client'` in React < 18](#getting-warning-for-cant-resolve-react-domclient-in-react--18)
- [Undefined Set](#undefined-set)
- [Using TheRubyRacer](#using-therubyracer)
- [HMR](#hmr)
- [Tests in component directory](#tests-in-component-directory)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting warning for `Can't resolve 'react-dom/client'` in React < 18

You may see a warning like this when building a Webpack bundle using any version of React below 18. This warning can be safely [suppressed](https://webpack.js.org/configuration/other-options/#ignorewarnings) in your Webpack configuration. The following is an example of this suppression in `config/webpack/webpack.config.js`:

```diff
- const { webpackConfig } = require('shakapacker')
+ const { webpackConfig, merge } = require('shakapacker')

+const ignoreWarningsConfig = {
+  ignoreWarnings: [/Module not found: Error: Can't resolve 'react-dom\/client'/],
+};

- module.exports = webpackConfig
+ module.exports = merge({}, webpackConfig, ignoreWarningsConfig)
```

## Undefined Set
```
ExecJS::ProgramError (identifier 'Set' undefined):

(execjs):1
```
If you see any variation of this issue, see [Using TheRubyRacer](#using-therubyracer)


## Using TheRubyRacer
TheRubyRacer [hasn't updated LibV8](https://github.com/cowboyd/therubyracer/blob/master/therubyracer.gemspec#L20) (The library that powers Node.js) from v3 in 2 years, any new features are unlikely to work.

LibV8 itself is already [beyond version 7](https://github.com/cowboyd/libv8/releases/tag/v7.3.492.27.1) therefore many serverside issues are caused by old JS engines and fixed by using an up to date one such as [MiniRacer](https://github.com/discourse/mini_racer) or [TheRubyRhino](https://github.com/cowboyd/therubyrhino) on JRuby.

## HMR

Check out [Enabling Hot Module Replacement (HMR)](https://github.com/shakacode/shakapacker/blob/master/docs/react.md#enabling-hot-module-replacement-hmr) in Shakapacker documentation.

One caveat is that currently you [cannot Server-Side Render along with HMR](https://github.com/reactjs/react-rails/issues/925#issuecomment-415469572).

## Tests in component directory

If your tests for react components reside alongside the component files in the `app/javascript/components` directory,
you will get `ModuleNotFoundError` in production environment
since test libraries are devDependencies.

To resolve this issue,
you need to specify a matching pattern in `appllication.js` and `server_rendering.js`.
For example, see the below code:

```js
const componentRequireContext = require.context('react_rails_components', true, /^(?!.*\.test)^\.\/.*$/)
const ReactRailsUJS = require('react_ujs')
ReactRailsUJS.useContext(componentRequireContext)
```
