# React-Rails v3

[![Gem](https://img.shields.io/gem/v/react-rails.svg?style=flat-square)](http://rubygems.org/gems/react-rails)
[![npm](https://img.shields.io/npm/v/react_ujs.svg?style=flat-square)](https://www.npmjs.com/package/react_ujs)
[![Ruby](https://github.com/reactjs/react-rails/actions/workflows/ruby.yml/badge.svg)](https://github.com/reactjs/react-rails/actions/workflows/ruby.yml)

## News
V3.0.0 is released with Shakapacker v6 support, including SSR. Please try it out and report any issues. We'll try to address any critical issues ASAP.

For version 2.7 documentation checkout [2.7-stable](https://github.com/reactjs/react-rails/tree/2.7-stable) branch.

## Summary
React-Rails is a flexible tool to use [React](http://facebook.github.io/react/) with Rails. The benefits:
* Automatically renders React server-side and client-side
* Supports [Shakapacker](https://github.com/shakacode/shakapacker) v7
* Supports Sprockets 4.x, 3.x
* Lets you use [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html), [ES6](http://es6-features.org/), [TypeScript](https://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/)

---
## ShakaCode Support

[ShakaCode](https://www.shakacode.com) offers support for upgrading this gem, and related gems such as Webpacker and using Shakapacker. If interested, contact Justin Gordon, [justin@shakacode.com](mailto:justin@shakacode.com). We're also [hiring](https://jobs.lever.co/shakacode/3bdbfdb3-4495-4611-a279-01dddb351abe)!

Here's a testimonial of how ShakaCode can help, from [Florian Gößler](https://github.com/FGoessler) of [Blinkist](https://www.blinkist.com/), January 2, 2023:
> Hey Justin 👋
>
> I just wanted to let you know that we today shipped the webpacker to shakapacker upgrades and it all seems to be running smoothly! Thanks again for all your support and your teams work! 😍
>
> On top of your work, it was now also very easy for me to upgrade Tailwind and include our external node_module based web component library which we were using for our other (more modern) apps already. That work is going to be shipped later this week though as we are polishing the last bits of it. 😉
>
> Have a great 2023 and maybe we get to work together again later in the year! 🙌

Read the [full review here](https://clutch.co/profile/shakacode#reviews?sort_by=date_DESC#review-2118154). Here's [another review of a Shakapacker migration that led to more work](https://clutch.co/profile/shakacode#reviews?sort_by=date_DESC#review-2096078).

## Resources
* [Click to join **React + Rails Slack**](https://reactrails.slack.com/join/shared_invite/enQtNjY3NTczMjczNzYxLTlmYjdiZmY3MTVlMzU2YWE0OWM0MzNiZDI0MzdkZGFiZTFkYTFkOGVjODBmOWEyYWQ3MzA2NGE1YWJjNmVlMGE). Then join the channel `#react-rails`.
* If you are upgrading, you might consider migrating to the [react_on_rails](https://github.com/shakacode/react_on_rails) gem.
* Source code example utilizing React-Rails: https://github.com/BookOfGreg/react-rails-example-app

## Documentation
- [Get started](docs/get-started.md)
- [View Helper](docs/view-helper.md)
- [UJS](docs/ujs.md)
- [Server-Side Rendering](docs/server-side-rendering.md)
- [Controller Actions](docs/controller-actions.md)
- [Component Generator](docs/component-generator.md)
- [Upgrading](docs/upgrading.md)
- [Migrating from `react-rails` to `react_on_rails`](docs/migrating-from-react-rails-to-react_on_rails.md)
- [Common Errors](docs/common-errors.md)


After reading this README file, additional information about React-Rails can be found in the Wiki page:
https://github.com/reactjs/React-Rails/wiki
The Wiki page features a significant amount of additional information about React-Rails which includes instructional articles and answers to the most frequently asked questions.

## Related Projects

- [webpacker-react](https://github.com/renchap/webpacker-react): Integration of React with Rails utilizing Webpack with Hot Module Replacement (HMR).
- [The React on Rails Course](https://learnetto.com/users/hrishio/courses/the-free-react-on-rails-5-course) A video course which teaches the basics of React and how to get started using it in Rails with `react-rails`.
- [react\_on\_rails](https://github.com/shakacode/react_on_rails): Integration of React with Rails utilizing Webpack, Redux, React-Router.
- [react-rails-hot-loader](https://github.com/rmosolgo/react-rails-hot-loader) Simple live-reloader for `react-rails`.
- [react-rails-benchmark_renderer](https://github.com/pboling/react-rails-benchmark_renderer) adds performance instrumentation to server rendering.
- [Ruby Hyperstack](https://hyperstack.org/): Use Ruby to build reactive user interfaces with React.

## Contributing

🎉 Thanks for taking the time to contribute! 🎉

With 5 Million+ downloads of the react-rails Gem and another 2 Million+ downloads of react_ujs on NPM, you're helping the biggest React + Rails community!

By contributing to React-Rails, you agree to abide by the [code of conduct](https://github.com/reactjs/react-rails/blob/master/CODE_OF_CONDUCT.md).

You can always help by submitting patches or triaging issues. Even offering reproduction steps to issues is incredibly helpful!

# Supporters

The following companies support the development of this and other open-source projects maintained by ShakaCode by providing licenses to the ShakaCode team. ShakaCode stands by the usefulness of these products!

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

Please see our [Contribution guide](https://github.com/reactjs/react-rails/blob/master/CONTRIBUTING.md) for more info.
