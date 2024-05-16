# React-Rails v3

[![Gem](https://img.shields.io/gem/v/react-rails.svg?style=flat-square)](http://rubygems.org/gems/react-rails)
[![npm](https://img.shields.io/npm/v/react_ujs.svg?style=flat-square)](https://www.npmjs.com/package/react_ujs)
[![Ruby](https://github.com/reactjs/react-rails/actions/workflows/ruby.yml/badge.svg)](https://github.com/reactjs/react-rails/actions/workflows/ruby.yml)

For version 2.7 documentation, visit the [2.7-stable](https://github.com/reactjs/react-rails/tree/2.7-stable) branch.

## Summary
React-Rails is a flexible tool to use [React](http://facebook.github.io/react/) with Rails. The benefits:
* Automatically renders React server-side and client-side
* Supports [Shakapacker](https://github.com/shakacode/shakapacker) v7
* Supports Sprockets 4.x, 3.x
* Lets you use [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html), [ES6](http://es6-features.org/), [TypeScript](https://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/)

---

While ShakaCode will continue to support this gem, you might consider migrating to [React on Rails](https://github.com/shakacode/react_on_rails) or [React on Rails Pro with proper Node rendering](https://www.shakacode.com/react-on-rails-pro/).

Why? React on Rails code receives much more active development and testing. For example, consider the [ReactRailsUJS](https://github.com/reactjs/react-rails/blob/master/react_ujs/index.js) implementation compared to the [ReactOnRails Node package](https://github.com/shakacode/react_on_rails/tree/master/node_package) which is written in TypeScript. For another example, React on Rails has work underway to support the latest React features, such as [React Server Components](https://react.dev/reference/rsc/server-components).

You can find [migration to React on Rails steps here](https://github.com/reactjs/react-rails/blob/master/docs/migrating-from-react-rails-to-react_on_rails.md).

---
## ShakaCode Support

[ShakaCode](https://www.shakacode.com) focuses on helping Ruby on Rails teams use React and Webpack better. We can upgrade your project and improve your development and customer experiences, allowing you to focus on building new features or fixing bugs instead. 

For an overview of working with us, see our [Client Engagement Model](https://www.shakacode.com/blog/client-engagement-model/) article and [how we bill for time](https://www.shakacode.com/blog/shortcut-jira-trello-github-toggl-time-and-task-tracking/).

We also specialize in helping development teams lower infrastructure and CI costs. Check out our project [Control Plane Flow](https://github.com/shakacode/control-plane-flow/), which can allow you to get the ease of Heroku with the power of Kubernetes and big cost savings.

If you think ShakaCode can help your project, [click here](https://meetings.hubspot.com/justingordon/30-minute-consultation) to book a call with [Justin Gordon](mailto:justin@shakacode.com), the creator of React on Rails and Shakapacker.

Here's a testimonial of how ShakaCode can help from [Florian Gößler](https://github.com/FGoessler) of [Blinkist](https://www.blinkist.com/), January 2, 2023:
> Hey Justin 👋
>
> I just wanted to let you know that we today shipped the webpacker to shakapacker upgrades and it all seems to be running smoothly! Thanks again for all your support and your teams work! 😍
>
> On top of your work, it was now also very easy for me to upgrade Tailwind and include our external node_module based web component library which we were using for our other (more modern) apps already. That work is going to be shipped later this week though as we are polishing the last bits of it. 😉
>
> Have a great 2023 and maybe we get to work together again later in the year! 🙌

Read the [full review here](https://clutch.co/profile/shakacode#reviews?sort_by=date_DESC#review-2118154).

## Resources
* [Click to join **React + Rails Slack**](https://reactrails.slack.com/join/shared_invite/enQtNjY3NTczMjczNzYxLTlmYjdiZmY3MTVlMzU2YWE0OWM0MzNiZDI0MzdkZGFiZTFkYTFkOGVjODBmOWEyYWQ3MzA2NGE1YWJjNmVlMGE). Then join the channel `#react-rails`.
* If upgrading, consider migrating to the [react_on_rails](https://github.com/shakacode/react_on_rails) gem.
* Source code example utilizing React-Rails: https://github.com/BookOfGreg/react-rails-example-app

## Documentation

- [Get started](docs/get-started.md)
  - [Use with Shakapacker](docs/get-started.md#use-with-shakapacker)
    - [Component name](docs/get-started.md#component-name)
    - [File naming](docs/get-started.md#file-naming)
    - [Typescript support](docs/get-started.md#typescript-support)
    - [Test component](docs/get-started.md#test-component)
  - [Use with Asset Pipeline](docs/get-started.md#use-with-asset-pipeline)
    - [Custom JSX Transformer](docs/get-started.md#custom-jsx-transformer)
      - [Transform Plugin Options](docs/get-started.md#transform-plugin-options)
    - [React.js versions](docs/get-started.md#reactjs-versions)
- [View Helper](docs/view-helper.md)
  - [Custom View Helper](docs/view-helper.md#custom-view-helper)
- [UJS](docs/ujs.md)
  - [Mounting & Unmounting](docs/ujs.md#mounting--unmounting)
  - [Event Handling](docs/ujs.md#event-handling)
  - [`getConstructor`](docs/ujs.md#getconstructor)
- [Server-Side Rendering](docs/server-side-rendering.md)
  - [Configuration](docs/server-side-rendering.md#configuration)
  - [JavaScript State](docs/server-side-rendering.md#javascript-state)
  - [Custom Server Renderer](docs/server-side-rendering.md#custom-server-renderer)
- [Controller Actions](docs/controller-actions.md)
- [Component Generator](docs/component-generator.md)
  - [Use with JBuilder](docs/component-generator.md#use-with-jbuilder)
  - [Camelize Props](docs/component-generator.md#camelize-props)
  - [Changing Component Templates](docs/component-generator.md#changing-component-templates)
- [Upgrading](docs/upgrading.md)
  - [2.7 to 3.0](docs/upgrading.md#27-to-30)
  - [2.3 to 2.4](docs/upgrading.md#23-to-24)
- [Migrating from `react-rails` to `react_on_rails`](docs/migrating-from-react-rails-to-react_on_rails.md)
  - [Why migrate?](docs/migrating-from-react-rails-to-react_on_rails.md#why-migrate)
  - [Steps to migrate](docs/migrating-from-react-rails-to-react_on_rails.md#steps-to-migrate)
- [Common Errors](docs/common-errors.md)
  - [Getting warning for `Can't resolve 'react-dom/client'` in React < 18](docs/common-errors.md#getting-warning-for-cant-resolve-react-domclient-in-react--18)
  - [Undefined Set](docs/common-errors.md#undefined-set)
  - [Using TheRubyRacer](docs/common-errors.md#using-therubyracer)
  - [HMR](docs/common-errors.md#hmr)
  - [Tests in component directory](docs/common-errors.md#tests-in-component-directory)

After reading this README file, additional information about React-Rails can be found on the Wiki page:
https://github.com/reactjs/React-Rails/wiki
The Wiki page features a significant amount of additional information about React-Rails, including instructional articles and answers to the most frequently asked questions.

## Related Projects

- [react\_on\_rails](https://github.com/shakacode/react_on_rails): Integration of React with Rails utilizing Webpack, Redux, React-Router.
- [React on Rails Pro](https://www.shakacode.com/react-on-rails-pro/):React on Rails with Node rendering and many other performance enhancements.
- [react-rails-benchmark_renderer](https://github.com/pboling/react-rails-benchmark_renderer) adds performance instrumentation to server rendering.
- [Ruby Hyperstack](https://hyperstack.org/): Use Ruby to build reactive user interfaces with React.

## Contributing

🎉 Thanks for taking the time to contribute! 🎉 See [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

# Supporters

The following companies provide licenses to the ShakaCode team, supporting the development of this and other open-source projects maintained by ShakaCode. ShakaCode stands by the usefulness of these products!

<br />
<br />

<a href="https://www.jetbrains.com">
  <img src="https://user-images.githubusercontent.com/4244251/184881139-42e4076b-024b-4b30-8c60-c3cd0e758c0a.png" alt="JetBrains" height="120px">
</a>
<a href="https://scoutapp.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/4244251/184881147-0d077438-3978-40da-ace9-4f650d2efe2e.png">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/4244251/184881152-9f2d8fba-88ac-4ba6-873b-22387f8711c5.png">
    <img alt="ScoutAPM" src="https://user-images.githubusercontent.com/4244251/184881152-9f2d8fba-88ac-4ba6-873b-22387f8711c5.png" height="120px">
  </picture>
</a>
<a href="https://controlplane.com">
  <picture>
    <img alt="Control Plane" src="https://github.com/shakacode/.github/assets/20628911/90babd87-62c4-4de3-baa4-3d78ef4bec25" height="120px">
  </picture>
</a>
<br />
<a href="https://www.browserstack.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/4244251/184881122-407dcc29-df78-4b20-a9ad-f597b56f6cdb.png">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/4244251/184881129-e1edf4b7-3ae1-4ea8-9e6d-3595cf01609e.png">
    <img alt="BrowserStack" src="https://user-images.githubusercontent.com/4244251/184881129-e1edf4b7-3ae1-4ea8-9e6d-3595cf01609e.png" height="55px">
  </picture>
</a>

---

ShakaCode is [hiring](https://jobs.lever.co/shakacode/3bdbfdb3-4495-4611-a279-01dddddb351abe)!
