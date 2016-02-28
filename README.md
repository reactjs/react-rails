[![Gem](https://img.shields.io/gem/v/react-rails.svg?style=flat-square)](http://rubygems.org/gems/react-rails)
[![Build Status](https://img.shields.io/travis/reactjs/react-rails/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-rails)
[![Gemnasium](https://img.shields.io/gemnasium/reactjs/react-rails.svg?style=flat-square)](https://gemnasium.com/reactjs/react-rails)
[![Code Climate](https://img.shields.io/codeclimate/github/reactjs/react-rails.svg?style=flat-square)](https://codeclimate.com/github/reactjs/react-rails)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/reactjs/react-rails.svg?style=flat-square)](https://codeclimate.com/github/reactjs/react-rails/coverage)

* * *

# react-rails


`react-rails` makes it easy to use [React](http://facebook.github.io/react/) and [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html)
in your Ruby on Rails (3.2+) application. `react-rails` can:

- Provide [various `react` builds](#reactjs-builds) to your asset bundle
- Transform [`.jsx` in the asset pipeline](#jsx)
- [Render components into views and mount them](#rendering--mounting) via view helper & `react_ujs`
- [Render components server-side](#server-rendering) with `prerender: true`
- [Generate components](#component-generator) with a Rails generator
- [Be extended](#extending-react-rails) with custom renderers, transformers and view helpers

Just getting started with React? Make sure to check out the [Getting Started] (https://facebook.github.io/react/docs/getting-started.html) guide. Also, see [Related Projects](#related-projects) below.

## Installation

Add `react-rails` to your gemfile:

```ruby
gem 'react-rails', '~> 1.6.0'
```

And install:

```
bundle install
```

Next, run the installation script:

```bash
rails g react:install
```

This will:
- create a `components.js` manifest file and a `app/assets/javascripts/components/` directory,
where you will put your components
- place the following in your `application.js`:

  ```js
  //= require react
  //= require react_ujs
  //= require components
  ```

## Usage

### React.js builds

You can pick which React.js build (development, production, with or without [add-ons]((http://facebook.github.io/react/docs/addons.html)))
to serve in each environment by adding a config. Here are the defaults:

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

After restarting your Rails server, `//= require react`  will provide the build of React.js which
was specified by the configurations.

`react-rails` offers a few other options for versions & builds of React.js.
See [VERSIONS.md](https://github.com/reactjs/react-rails/blob/master/VERSIONS.md) for more info about
 using the `react-source` gem or dropping in your own copies of React.js.

### JSX

After installing `react-rails`, restart your server. Now, `.js.jsx` files will be transformed in the asset pipeline.

`react-rails` currently ships with two transformers, to convert jsx code -

* `BabelTransformer` using [Babel](http://babeljs.io), which is the default transformer.
* `JSXTransformer` using `JSXTransformer.js`

You can use the deprecated `JSXTransformer` by setting it in an application config:

```ruby
  config.react.jsx_transformer_class = React::JSX::JSXTransformer
```

#### BabelTransformer options

You can use babel's [transformers](http://babeljs.io/docs/advanced/transformers/) and [custom plugins](http://babeljs.io/docs/advanced/plugins/),
and pass [options](http://babeljs.io/docs/usage/options/) to the babel transpiler adding following configurations:

```ruby
config.react.jsx_transform_options = {
  blacklist: ['spec.functionName', 'validation.react', 'strict'], # default options
  optional: ["transformerName"],  # pass extra babel options
  whitelist: ["useStrict"] # even more options
}
```
Under the hood, `react-rails` uses [ruby-babel-transpiler](https://github.com/babel/ruby-babel-transpiler), for transformation.

#### JSXTransformer options

You can use JSX `--harmony` or `--strip-types` options by adding a configuration:

```ruby
config.react.jsx_transform_options = {
  harmony: true,
  strip_types: true, # for removing Flow type annotations
  asset_path: "path/to/JSXTransformer.js", # if your JSXTransformer is somewhere else
}
```

### Rendering & mounting

`react-rails` includes a view helper (`react_component`) and an unobtrusive JavaScript driver (`react_ujs`)
which work together to put React components on the page. You should require the UJS driver
 in your manifest after `react` (and after `turbolinks` if you use [Turbolinks](https://github.com/rails/turbolinks)).

The __view helper__ puts a `div` on the page with the requested component class & props. For example:

```erb
<%= react_component('HelloMessage', name: 'John') %>
<!-- becomes: -->
<div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

On page load, the __`react_ujs` driver__ will scan the page and mount components using `data-react-class`
and `data-react-props`.

If Turbolinks is present components are mounted on the `page:change` event, and unmounted on `page:before-unload`.
 __Turbolinks >= 2.4.0__ is recommended because it exposes better events.

The view helper's signature is:

```ruby
react_component(component_class_name, props={}, html_options={})
```

- `component_class_name` is a string which names a globally-accessible component class. It may have dots (eg, `"MyApp.Header.MenuItem"`).
- `props` is either an object that responds to `#to_json` or an already-stringified JSON object (eg, made with Jbuilder, see note below).
- `html_options` may include:
  - `tag:` to use an element other than a `div` to embed `data-react-class` and `data-react-props`.
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

_(It will also be mounted by the UJS on page load.)_

There are some requirements for this to work:

- `react-rails` must load your code. By convention, it uses `components.js`, which was created
by the install task. This file must include your components _and_ their dependencies (eg, Underscore.js).
- Your components must be accessible in the global scope.
If you are using `.js.jsx.coffee` files then the wrapper function needs to be taken into account:

  ```coffee
  # @ is `window`:
  @Component = React.createClass
    render: ->
      `<ExampleComponent videos={this.props.videos} />`
  ```
- Your code can't reference `document`. Prerender processes don't have access to `document`,
so jQuery and some other libs won't work in this environment :(

You can configure your pool of JS virtual machines and specify where it should load code:

```ruby
# config/environments/application.rb
# These are the defaults if you don't specify any yourself
MyApp::Application.configure do
  # Settings for the pool of renderers:
  config.react.server_renderer_pool_size  ||= 1  # ExecJS doesn't allow more than one on MRI
  config.react.server_renderer_timeout    ||= 20 # seconds
  config.react.server_renderer = React::ServerRendering::SprocketsRenderer
  config.react.server_renderer_options = {
    files: ["react-server.js", "components.js"], # files to load for prerendering
    replay_console: true,                 # if true, console.* will be replayed client-side
  }
end
```

- On MRI, use `therubyracer` for the best performance (see [discussion](https://github.com/reactjs/react-rails/pull/290))
- On MRI, you'll get a deadlock with `pool_size` > 1
- If you're using JRuby, you can increase `pool_size` to have real multi-threaded rendering.

You can configure camelize_props option and pass props with an underscored hash from rails but get a camelized hash in jsx :

```ruby
MyApp::Application.configure do
  config.react.camelize_props = true #default false
end
```

### Rendering components instead of views

Components can also be prerendered directly from a controller action with the custom `component` renderer. For example:

```ruby
class TodoController < ApplicationController
  def index
    @todos = Todo.all
    render component: 'TodoList', props: { todos: @todos }, tag: 'span', class: 'todo'
  end
end
```

This custom renderer behaves the same as a normal view renderer and accepts the usual arguments - `content_type`, `layout`, `location` and `status`.
By default, your current layout will be used and the component, rather than a view, will be rendered in place of `yield`. Custom data-* attributes
can be passed like `data: {remote: true}`.

### Component generator

`react-rails` ships with a Rails generator to help you get started with a simple component scaffold.
You can run it using `rails generate react:component ComponentName (--es6)`.
The generator takes an optional list of arguments for default propTypes,
which follow the conventions set in the [Reusable Components](http://facebook.github.io/react/docs/reusable-components.html)
section of the React documentation.

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
        <div>Published By: {this.props.publishedBy}</div>
      </div>
    );
  }
});
```

#### Options

**--es6** : Generate the same component but using cutting edge es6 class

For example:

```shell
rails generate react:component Label label:string --es6
```

**--coffee** : Generate the component using CoffeeScript syntax

For example:

```shell
rails generate react:component Label label:string --coffee
```

#### Arguments

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

  * `instanceOf` takes an optional class name in the form of {className}.
  * `oneOf` behaves like an enum, and takes an optional list of strings in the form of `'name:oneOf{one,two,three}'`.
  * `oneOfType` takes an optional list of react and custom types in the form of `'model:oneOfType{string,number,OtherType}'`.

Note that the arguments for `oneOf` and `oneOfType` must be enclosed in single quotes
 to prevent your terminal from expanding them into an argument list.

### Jbuilder & react-rails

If you use Jbuilder to pass a JSON string to `react_component`, make sure your JSON is a stringified hash,
not an array. This is not the Rails default -- you should add the root node yourself. For example:

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

It is possible to use JSX with CoffeeScript. To use CoffeeScript, create files with an extension `.js.jsx.coffee`.
We also need to embed JSX code inside backticks so that CoffeeScript ignores the syntax it doesn't understand.
Here's an example:

```coffee
Component = React.createClass
  render: ->
    `<ExampleComponent videos={this.props.videos} />`
```

Alternatively, the newer ES6 style class based syntax can be used like this:

```coffee
class Component extends React.Component
  render: ->
    `<ExampleComponent videos={this.props.videos} />`
```

## Extending `react-rails`

You can extend some of the core functionality of `react-rails` by injecting new implementations during configuration.

### Custom Server Renderer

`react-rails` depends on a renderer class for rendering components on the server. You can provide a custom renderer class to `config.react.server_renderer`. The class must implement:

- `#initialize(options={})`, which accepts the hash from `config.react.server_renderer_options`
- `#render(component_name, props, prerender_options)` to return a string of HTML

`react-rails` provides two renderer classes: `React::ServerRendering::ExecJSRenderer` and `React::ServerRendering::SprocketsRenderer`.

`ExecJSRenderer` offers two other points for extension:

- `#before_render(component_name, props, prerender_options)` to return a string of JavaScript to execute _before_ calling `React.render`
- `#after_render(component_name, props, prerender_options)` to return a string of JavaScript to execute _after_ calling `React.render`

Any subclass of `ExecJSRenderer` may use those hooks (for example, `SprocketsRenderer` uses them to handle `console.*` on the server).

### Custom View Helper

`react-rails` uses a "helper implementation" class to generate the output of the `react_component` helper. The helper is initialized once per request and used for each `react_component` call during that request. You can provide a custom helper class to `config.react.view_helper_implementation`. The class must implement:

- `#react_component(name, props = {}, options = {}, &block)` to return a string to inject into the Rails view
- `#setup(controller_instance)`, called when the helper is initialized at the start of the request
- `#teardown(controller_instance)`, called at the end of the request

`react-rails` provides one implementation, `React::Rails::ComponentMount`.

### Custom JSX Transformer

`react-rails` uses a transformer class to transform JSX for the browser. The transformer is initialized once, at boot. You can provide a custom transformer to `config.react.jsx_transformer_class`. The transformer must implement:

- `#initialize(options)`, where options is the value passed to `config.react.jsx_transform_options`
- `#transform(code_string)` to return a string of transformed code

`react-rails` provides two transformers, `React::JSX::JSXTransformer` and `React::JSX::BabelTransformer`.

### Related Projects

- [react\_on\_rails Gem](https://github.com/shakacode/react_on_rails): Webpack Integration of React with Rails utilizing the modern JavaScript tooling and libraries, including Webpack, Babel, React, Redux, React-Router. You can an example of this live at [www.reactrails.com](http://www.reactrails.com).
- [React.rb](http://reactrb.org/): Use Ruby to build reactive user interfaces with React under the covers.[github source code here](https://github.com/zetachang/react.rb).
- [react-rails-hot-loader](https://github.com/rmosolgo/react-rails-hot-loader) is a simple live-reloader for `react-rails`.
- [react-rails-benchmark_renderer](https://github.com/pboling/react-rails-benchmark_renderer) adds performance instrumentation to server rendering.
