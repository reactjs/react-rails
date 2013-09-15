# react-rails [![Build Status](https://travis-ci.org/facebook/react-rails.png)](https://travis-ci.org/facebook/react-rails) [![Code Climate](https://codeclimate.com/github/facebook/react-rails.png)](https://codeclimate.com/github/facebook/react-rails)

react-rails is a ruby gem which makes it easier to use [React](http://facebook.github.io/react/) and [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) in your Ruby on Rails application.

This is done in 2 ways:

1. making it easy to include `react.js` as part of your dependencies in `application.js`.
2. transforming JSX into regular JS on request, or as part of asset precompilation.


## Installation

We're specifically targeting versions of Ruby on Rails which make use of the asset pipeline, which means Rails 3.1+.

As with all gem dependencies, we strongly recommend adding `react-rails` to your `Gemfile` and using `bundler` to manage your application's dependencies.

```ruby
# Gemfile

gem 'react-rails', '~> 0.8.0.0'
```


## Usage

### react.js

In order to use React client-side in your application, you must make sure the browser requests it. One way to do that is to drop `react.js` into `app/assets/javascript/` and by default your application manifest will pick it up. There are downsides to this approach, so we made it even easier. Once you have `react-rails` installed, you can just add a line into your config file (see Configuring) and require react directly in your manifest:

You can `require` it in your manifest:

```js
// app/assets/application.js

//= require react
```

Alternatively, you can include it directly as a separate script tag:

```erb
# app/views/layouts/application.erb.html

<%= javascript_include_tag "react" %>
```

### JSX

To transform your JSX into JS, simply create `.js.jsx` files, and ensure that the file has the `/** @jsx React.DOM */` docblock. These files will be transformed on request, or precompiled as part of the `assets:precompile` task.

### Unobtrusive javascript

`react_ujs` will call `React.renderComponent` for every element with `data-react-class` attribute. React properties can be specified by `data-react-props` attribute in JSON format. For example:

```erb
<!-- react_ujs will execute `React.renderComponent(HelloMessage({name:"Bob"}), element)` -->
<div data-react-class="HelloMessage" data-react-props="<%= {:name => 'Bob'}.to_json %>" />
```

`react_ujs` will also scan DOM elements and call `React.unmountComponentAtNode` on page unload. If you want to disable this behavior, remove `data-react-class` attribute in `componentDidMount`.

To use `react_ujs`, simply `require` it after `react` (and after `turbolinks` if [Turbolinks](https://github.com/rails/turbolinks) is used):

```js
// app/assets/application.js

//= require turbolinks
//= require react
//= require react_ujs
```

### Viewer helper

There is a viewer helper method `react_component`. It is designed to work with `react_ujs` and takes React class name, properties, HTML options as arguments:

```ruby
react_component('HelloMessage', :name => 'John')
# <div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

By default, a `<div>` element is used. Other tag and HTML attributes can be specified:

```ruby
react_component('HelloMessage', {:name => 'John'}, :span)
# <span data-...></span>

react_component('HelloMessage', {:name => 'John'}, {:id => 'hello', :class => 'foo', :tag => :span})
# <span class="foo" id="hello" data-...></span>
```


## Configuring

### Variants

There are 2 variants available. `:development` gives you the unminified version of React. This provides extra debugging and error prevention. `:production` gives you the minified version of React which strips out comments and helpful warnings, and minifies.

```ruby
# config/environments/development.rb
MyApp::Application.configure do
  config.react.variant = :development
end

# config/environments/production.rb
MyApp::Application.configure do
  config.react.variant = :production
end
```

### Add-ons

Beginning with React v0.5, there is another type of build. This build ships with some "add-ons" that might be useful - [take a look at the React documentation for details](http://facebook.github.io/react/docs/addons.html). In order to make these available, we've added another configuration (which defaults to `false`).

```ruby
MyApp::Application.configure do
  config.react.addons = true
end
```


## CoffeeScript

It is possible to use JSX with CoffeeScript. The caveat is that you will still need to include the docblock. Since CoffeeScript doesn't allow `/* */` style comments, we need to do something a little different. We also need to embed JSX inside backticks so CoffeeScript ignores the syntax it doesn't understand. Here's an example:

```coffee
###* @jsx React.DOM ###

Component = React.createClass
  render: ->
    `<ExampleComponent videos={this.props.videos} />`
```

### Changing react.js and JSXTransformer.js versions

Major, minor, and patch versions of this gem are based on react's version, e.g.
`0.4.1.1` means that react has version `0.4.1`. There may be fixes or improvements
introduced in say `0.5.0.0`, but you will still need react in version `0.4.1`.
If you needed to change JSXTransformer version it's possible too.

#### How to

Just put another version of react or JSXTransformer in your assets. Any place
you would put a javascript file will be fine, probably
`/vendor/javascripts/react.js` and `/vendor/javascripts/JSXTransformer.js`
would be best. (You don't have to replace both)

#### Things to remember

If you replace `JSXTransformer.js`, you have to restart your rails instance,
because the jsx compiler context is cached, name of the file is case-sensitive.

We provide different variants of `react.js` based on environment, but you will
need to provide the same file called `react.js` which will be used for both
production and development.
