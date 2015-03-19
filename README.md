[![Gem](https://img.shields.io/gem/v/react-rails.svg?style=flat-square)](http://rubygems.org/gems/react-rails)
[![Build Status](https://img.shields.io/travis/reactjs/react-rails/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-rails)
[![Gemnasium](https://img.shields.io/gemnasium/reactjs/react-rails.svg?style=flat-square)](https://gemnasium.com/reactjs/react-rails)
[![Code Climate](https://img.shields.io/codeclimate/github/reactjs/react-rails.svg?style=flat-square)](https://codeclimate.com/github/reactjs/react-rails)

* * *

# react-rails

> ## react-rails version disclaimer

> ***This README is for `1.x` branch which is still in development. Please switch to latest `0.x` branch for stable version.***

> ***Additionally: `0.x` branch directly follows React versions, `1.x` will not do so.***

`react-rails` makes it easy to use [React](http://facebook.github.io/react/) and [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) in your Ruby on Rails (3.1+) application. `react-rails` can:

- Provide [various `react` builds](#reactjs-builds) to your asset bundle
- Transform [`.jsx` in the asset pipeline](#jsx)
- [Render components into views and mount them](#rendering--mounting) via view helper & `react_ujs`
- [Render components server-side](#server-rendering) with `prerender: true`.
- [Generate components](#component-generator) with a Rails generator

## Installation

Add `react-rails` to your gemfile:

```ruby
# Gemfile
# If you missed a warning at the top of this README - this is still in development
# which means the latest is not pushed to rubygems.org or tagged as a version. Live
# on the bleeding edge and depend on master.

gem 'react-rails', github: 'reactjs/react-rails'
```

Next, run the installation script.

```bash
rails g react:install
```

This will:
- create a `components.js` manifest file and a `app/assets/javascripts/components/` directory, where you will put your components
- place the following in your `application.js`:

  ```js
  //= require react
  //= require react_ujs
  //= require components
  ```

## Usage

### React.js builds

You can pick which React.js build (development, production, with or without [add-ons]((http://facebook.github.io/react/docs/addons.html))) to serve in each environment by adding a config. Here are the defaults:

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

To include add-ons, use this config:

```ruby
MyApp::Application.configure do
  config.react.addons = true # defaults to false
end
```

After restarting your Rails server, `//= require react`  will provide the build of React.js which was specified by the configurations.

In a pinch, you can also provide your own copies of React.js and JSXTransformer. Just add `react.js` or `JSXTransformer.js` (case-sensitive) files to `app/vendor/assets/javascripts/react/` and restart your development server. If you need different versions of React in different environments, put them in directories that match `config.react.variant`. For example, if you set `config.react.variant = :development`, you could put a copy of `react.js` in `/vendor/assets/react/development/`.

### JSX

After installing `react-rails`, restart your server. Now, `.js.jsx` files will be transformed in the asset pipeline.

You can use JSX `--harmony` or `--strip-types` options by adding a configuration:

```ruby
  config.react.jsx_transform_options = {
      harmony: true,
      strip_types: true, # for removing Flow type annotations
    }
```

To use CoffeeScript, create `.js.jsx.coffee` files and embed JSX inside backticks, for example:

```coffee
Component = React.createClass
  render: ->
    `<ExampleComponent videos={this.props.videos} />`
```

### Rendering & mounting

`react-rails` includes a view helper (`react_component`) and an unobtrusive JavaScript driver (`react_ujs`) which work together to put React components on the page. You should require the UJS driver in your manifest after `react` (and after `turbolinks` if you use [Turbolinks](https://github.com/rails/turbolinks))

The __view helper__ puts a `div` on the page with the requested component class & props. For example:

```erb
<%= react_component('HelloMessage', name: 'John') %>
<!-- becomes: -->
<div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

On page load, the __`react_ujs` driver__ will scan the page and mount components using `data-react-class` and `data-react-props`. Before page unload, it will unmount components (if you want to disable this behavior, remove `data-react-class` attribute in `componentDidMount`).

`react_ujs` uses Turbolinks events if they're available, otherwise, it uses native events. __Turbolinks >= 2.4.0__ is recommended because it exposes better events.

The view helper's signature is

```ruby
react_component(component_class_name, props={}, html_options={})
```

- `component_class_name` is a string which names a globally-accessible component class. It may have dots (eg, `"MyApp.Header.MenuItem"`).
- `props` is either an object that responds to `#to_json` or an already-stringified JSON object (eg, made with Jbuilder, see note below)
- `html_options` may include:
  - `tag:` to use an element other than a `div` to embed `data-react-class` and `-props`.
  - `prerender: true` to render the component on the server.
  - `**other` Any other arguments (eg `class:`, `id:`) are passed through to [`content_tag`](http://api.rubyonrails.org/classes/ActionView/Helpers/TagHelper.html#method-i-content_tag).


### Server rendering

To render components on the server, pass `prerender: true` to `react_component`:

```erb
<%= react_component('HelloMessage', {name: 'John'}, {prerender: true}) %>
<!-- becomes: -->
<div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}">
  <h1>Hello, John!</h1>
</div>
```

_(It will be also be mounted by the UJS on page load.)_

There are some requirements for this to work:

- `react-rails` must load your code. By convention, it uses `components.js`, which was created by the install task. This file must include your components _and_ their dependencies (eg, Underscore.js).
- Your components must be accessible in the global scope. If you are using `.js.jsx.coffee` files then the wrapper function needs to be taken into account:

  ```coffee
  # @ is `window`:
  @Component = React.createClass
    render: ->
      `<ExampleComponent videos={this.props.videos} />`
  ```
- Your code can't reference `document`. Prerender processes don't have access to `document`, so jQuery and some other libs won't work in this environment :(

You can configure your pool of JS virtual machines and specify where it should load code:

```ruby
# config/environments/application.rb
# These are the defaults if you dont specify any yourself
MyApp::Application.configure do
  # renderer pool size:
  config.react.max_renderers = 10
  # prerender timeout, in seconds:
  config.react.timeout = 20
  # where to get React.js source:
  config.react.react_js = lambda { File.read(::Rails.application.assets.resolve('react.js')) }
  # array of filenames that will be requested from the asset pipeline
  # and concatenated:
  config.react.component_filenames = ['components.js']
  # server-side console.log, console.warn, and console.error messages will be replayed on the client
  # (you can set this to `true` in config/enviroments/development.rb to replay in development only)
  config.react.replay_console = false
end
```

### Component generator

react-rails ships with a Rails generator to help you get started with a simple component scaffold. You can run it using `rails generate react:component ComponentName`. The generator takes an optional list of arguments for default propTypes, which follow the conventions set in the [Reusable Components](http://facebook.github.io/react/docs/reusable-components.html) section of the React documentation.

For example:

```shell
rails generate react:component Post title:string body:string published:bool published_by:instanceOf{Person}
```

would generate the following in `app/assets/javascripts/components/post.js.jsx`:

```jsx
var Post = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    published: React.PropTypes.bool,
    publishedBy: React.PropTypes.instanceOf(Person)
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.title}</div>
        <div>Body: {this.props.body}</div>
        <div>Published: {this.props.published}</div>
        <div>Published By: {this.props.published_by}</div>
      </div>
    );
  }
});
```

The generator can use the following arguments to create basic propTypes:

  * any
  * array
  * bool
  * element
  * func
  * number
  * object
  * node
  * shape
  * string

The following additional arguments have special behavior:

  * `instanceOf` takes an optional class name in the form of {className}
  * `oneOf` behaves like an enum, and takes an optional list of strings in the form of `'name:oneOf{one,two,three}'`.
  * `oneOfType` takes an optional list of react and custom types in the form of `'model:oneOfType{string,number,OtherType}'`

Note that the arguments for `oneOf` and `oneOfType` must be enclosed in single quotes to prevent your terminal from expanding them into an argument list.

### Jbuilder & react-rails

If you use Jbuilder to pass JSON string to `react_component`, make sure your JSON is a stringified hash, not an array. This is not the Rails default -- you should add the root node yourself. For example:

```ruby
# BAD: returns a stringified array
json.array!(@messages) do |message|
  json.extract! message, :id, :name
  json.url message_url(message, format: :json)
end

# GOOD: returns a stringified hash
json.messages(@messages) do |message|
  json.extract! message, :id, :name
  json.url message_url(message, format: :json)
end
```

## CoffeeScript

It is possible to use JSX with CoffeeScript. The caveat is that you will still need to include the docblock. Since CoffeeScript doesn't allow `/* */` style comments, we need to do something a little different. We also need to embed JSX inside backticks so CoffeeScript ignores the syntax it doesn't understand. Here's an example:

```coffee
Component = React.createClass
  render: ->
    `<ExampleComponent videos={this.props.videos} />`
```
