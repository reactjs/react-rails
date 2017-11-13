# Contributing to React-Rails

🎉 Thanks for taking the time to contribute! 🎉

With 2 Million+ downloads of the react-rails Gem and another 100k+ downloads of react_ujs on NPM, you're helping the biggest React + Rails community!

What follows is a set of guidelines for contributing to React-Rails, inside the [react-js Organization](https://github.com/reactjs), part of the wider [React Community](https://reactcommunity.org/)

By contributing to React-Rails, you agree to abide by the [code of conduct](https://github.com/reactjs/react-rails/blob/master/CODE_OF_CONDUCT.md).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
    - [Before Submitting A Bug Report](#before-submitting-a-bug-report)
    - [How Do I Submit A (Good) Bug Report?](#how-do-i-submit-a-good-bug-report)
  - [Your First Code Contribution](#your-first-code-contribution)
    - [Pull Requests](#pull-requests)
    - [Development](#development)
      - [Local dev](#local-dev)
      - [Running tests](#running-tests)
      - [Updating the pre-bundled react](#updating-the-pre-bundled-react)
      - [Updating ReactRailsUJS](#updating-reactrailsujs)
      - [Releasing the Gem](#releasing-the-gem)
- [Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [Ruby styleguide](#ruby-styleguide)
- [Issue and Pull Request Labels](#issue-and-pull-request-labels)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How Can I Contribute?

### Reporting Bugs

#### Before Submitting A Bug Report
* **Check the [wiki](https://github.com/reactjs/react-rails/wiki).** You might be able to find a guide on what you're experiencing. Most importantly, check if you can reproduce the problem [in the latest version of React-Rails with React_ujs](https://github.com/reactjs/react-rails/tree/master), sometimes we have already fixed the issue.
* **Perform a [cursory search](https://github.com/reactjs/react-rails/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one. If **the issue is closed** open a new issue with reproduction steps and reference the old one.
* **If the problem is with pre-rendering, turn off pre-rendering and look at Chrome's developer console**, that normally reveals more details about what the true error message is if it's a syntax error in a component or failing to require a component file.

#### How Do I Submit A (Good) Bug Report?
Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/).
Create an issue and provide the following information by filling in [the template](.github/ISSUE_TEMPLATE.md).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. When listing steps, **don't just say what you did, but explain how you did it**. For example, If you're using Browserify instead of Webpacker, how did you do it?
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, Gists, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.

Include details about your configuration and environment, React-Rails integrates many tools, versions of many things could be the culprit, though we try test as many as reasonable in our [Travis Build](.travis.yml)

* **Which version of React-Rails are you using?**
* **Which version of React_UJS are you using?**
* **Which version of Webpacker/Sprockets are you using?**
* **Which version of Rails are you using?**

### Your First Code Contribution

Unsure where to begin contributing to React-Rails? You can start by looking through these `help-wanted` issues:

* [Help wanted issues](https://github.com/reactjs/react-rails/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)

This issue list is sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Pull Requests

See [git commit message style](#git-commit-messages)

* Fill in [the required template](.github/PULL_REQUEST_TEMPLATE.md)
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [styleguides](#styleguides) where possible but readability is the most important!
* Include intention-revealing [Minitest](https://github.com/seattlerb/minitest) tests in the `./test` folder. It's important people know *why* a test exists by reading it more than *what* it does, we can read the source for the *what*.
* Document new code where you're able.

#### Development

##### Local dev

Clone down the [react-rails-example-app](https://github.com/bookofgreg/react-rails-example-app), it has several branches for different scenarios. It's designed to contain very simple examples of each feature of React-Rails.

To develop Ruby code, change the Gemfile to point to a local copy of react-rails.
```
gem 'react-rails', path: '../react-rails'
```

To develop the React_UJS NPM Package, make your changes and run `npm pack` to make a `.tgz` bundle, then in react-rails-example-app `yarn add ../react_ujs-<version>.tgz`

##### Running tests

`bundle exec appraisal install` to install gems on every gemfile Appraisal contains.
`rake test` or `bundle exec appraisal rake test` runs everything.
or run a specific suite using `bundle exec appraisal <appraisal name> rake test`
- Find appraisal names in [Appraisals](Appraisals)
- Integration tests run in Headless Chrome which is included in Chrome (59+ linux,OSX | 60+ Windows)
- ChromeDriver is included with `chromedriver-helper` gem so no need to manually install that 👍

##### Updating the pre-bundled react
- Update React with `rake react:update`
It outputs an ironically webpacked couple of files into `lib/assets/react-source/<environment>/react(-server).js` where it will be picked up by `sprockets` in `lib/react/rails/asset_variant.rb`

##### Updating ReactRailsUJS
- Update the UJS with `rake ujs:update`
- (For Maintainers) To release a new NPM version:
  - Update the version in `package.json`
  - Commit & push to master
  - `bundle exec rake ujs:publish` (runs `npm publish`)

##### Releasing the Gem
- (For Maintainers) To release a new RubyGems version:
  - Increment the version in `lib/react/rails/version.rb`
  - Add an entry to `VERSIONS.md`
  - Update the [changelog](CHANGELOG.md) (find recent changes on GitHub by listing commits or showing closed PRs)
  - Commit changes & push to master
  - `bundle exec rake release`: pushes a tag to GitHub, builds a `.gem`, and pushes to RubyGems

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* * When only changing documentation, include `[ci skip]` in the [commit description](https://docs.travis-ci.com/user/customizing-the-build/#Skipping-a-build) so we don't waste Travis's Open source resources.
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### Ruby styleguide

Ruby Style in this repo should attempt to follow the standard ruby styles as defined in `Rubocop`. This is more of a guide than a rule so use common sense, readability is more important than the style guide!

## Issue and Pull Request Labels

Todo

Finally, thanks to the [Atom Organization](https://github.com/atom) where this Contributing guide is based! :heart: :green_heart:
