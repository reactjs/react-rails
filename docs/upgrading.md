# Upgrading

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [2.7 to 3.0](#27-to-30)
- [2.3 to 2.4](#23-to-24)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 2.7 to 3.0
- Keep your `react_ujs` up to date: `yarn upgrade`
- **Drop support for Webpacker:** Before any ReactRails upgrade, make sure upgrading from Webpacker to Shakapacker 7. For more information check out Shakapacker  
- **SSR:** ReactRails 3.x requires separate compilations for server & client bundles. See [Webpack config](https://github.com/reactjs/react-rails/tree/main/test/dummy/config/webpack) directory in the dummy app to addapt the new implementation.

## 2.3 to 2.4

Keep your `react_ujs` up to date, `yarn upgrade`

React-Rails 2.4.x uses React 16+ which no longer has React Addons. Therefore the pre-bundled version of react no longer has an addons version, if you need addons still, there is the 2.3.1+ version of the gem that still has addons.

If you need to make changes in your components for the prebundled react, see the migration docs here:

- https://reactjs.org/blog/2016/11/16/react-v15.4.0.html
- https://reactjs.org/blog/2017/04/07/react-v15.5.0.html
- https://reactjs.org/blog/2017/06/13/react-v15.6.0.html


For the vast majority of cases this will get you most of the migration:
- global find+replace `React.Prop` -> `Prop`
- add `import PropTypes from 'prop-types'` (Webpacker only)
- re-run `bundle exec rails webpacker:install:react` to update npm packages (Webpacker only)
