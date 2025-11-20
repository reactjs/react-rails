# Migrating from `react-rails` to `react_on_rails`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Why migrate?](#why-migrate)
- [Steps to migrate](#steps-to-migrate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Why migrate?

[`react_on_rails`](https://github.com/shakacode/react_on_rails/) offers several additional features for a Rails + React application. The following is a table of features comparison.

| **Feature**             | **react-rails** | **react-on-rails** |
| ----------------------- |:---------------:|:------------------:|
| Sprockets               | ✅               | ❌                  |
| Shakapacker             | ✅               | ✅                  |
| SSR                     | ✅               | ✅                  |
| SSR with HMR            | ✅               | ✅                  |
| SSR with React-Router   | ❌               | ✅                  |
| SSR with Code Splitting | ❌               | ✅                  |
| Node SSR                | ❌               | ✅                  |
| Advanced Redux support  | ❌               | ✅                  |
| ReScript support        | ❌               | ✅                  |
| I18n support            | ❌               | ✅                  |

`react_on_rails` offers better performance and bundle optimizations, especially with the option of getting a subscription to `react_on_rails_pro`.

## Steps to migrate

In this guide, it is assumed that you have upgraded the `react-rails` project to use `shakapacker` version 7. To this end, check out [Shakapacker v7 upgrade guide](https://github.com/shakacode/shakapacker/tree/main/docs/v7_upgrade.md). Upgrading `react-rails` to version 3 can make the migration smoother but it is not required.

1. Update Deps

   1. Replace `react-rails` in `Gemfile` with the latest version of `react_on_rails` and run `bundle install`.
   2. Remove `react_ujs` from `package.json` and run `yarn install`.
   3. Commit changes!

2. Run `rails g react_on_rails:install` but do not commit the change. `react_on_rails` installs node dependencies and also creates sample react component, Rails view/controller, and update `config/routes.rb`.

3. Adapt the project: Check the changes and carefully accept, reject, or modify them as per your project's needs. Besides changes in `config/shakapacker` or `babel.config` which are project-specific, here are the most noticeable changes to address:

   1. Check webpack config files at `config/webpack/*`. If coming from `react-rails` v3, the changes are minor since you have already made separate configurations for client and server bundles. The most important change here is to notice the different names for the server bundle entry file. You may choose to stick with `server_rendering.js` or use `server-bundle.js` which is the default name in `react_on_rails`. The decision made here, affects the other steps.

   2. In `app/javascript` directory you may notice some changes.

      1. `react_on_rails` by default uses `bundles` directory for the React components. You may choose to rename `components` into `bundles` to follow the convention.

      2. `react_on_rails` uses `client-bundle.js` and  `server-bundle.js` instead of `application.js` and `server_rendering.js`. There is nothing special about these names. It can be set to use any other name (as mentioned above). If you too choose to follow the new names, consider updating the relevant `javascript_pack_tag` in your Rails views.

      3. Update the content of these files to register your React components for client or server-side rendering. Checking the generated files by `react_on_rails` installation process should give enough hints.

   3. Check Rails views. In `react_on_rails`, `react_component` view helper works slightly differently. It takes two arguments: the component name, and options. Props is one of the options. Take a look at the following example:

      ```diff
      - <%= react_component('Post', { title: 'New Post' }, { prerender: true }) %>
      + <%= react_component('Post', { props: { title: 'New Post' }, prerender: true }) %>
      ```

You can also check [react-rails-to-react-on-rails](https://github.com/shakacode/react-rails-example-app/tree/react-rails-to-react-on-rails) branch on [react-rails example app](https://github.com/shakacode/react-rails-example-app) for an example of migration from `react-rails` v3 to `react_on_rails` v13.4.

