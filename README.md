# react-rails

[![Gem](https://img.shields.io/gem/v/react-rails.svg?style=flat-square)](http://rubygems.org/gems/react-rails)
[![Build Status](https://img.shields.io/travis/reactjs/react-rails/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-rails)
[![Gemnasium](https://img.shields.io/gemnasium/reactjs/react-rails.svg?style=flat-square)](https://gemnasium.com/reactjs/react-rails)
[![Code Climate](https://img.shields.io/codeclimate/github/reactjs/react-rails.svg?style=flat-square)](https://codeclimate.com/github/reactjs/react-rails)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/reactjs/react-rails.svg?style=flat-square)](https://codeclimate.com/github/reactjs/react-rails/coverage)

Gem version 2.4.x onwards and master will no longer have React Addons.

If you need to make changes for the prebundled react, see the migration docs here:
https://reactjs.org/blog/2016/11/16/react-v15.4.0.html
https://reactjs.org/blog/2017/04/07/react-v15.5.0.html
https://reactjs.org/blog/2017/06/13/react-v15.6.0.html

`react-rails` makes it easy to use [React](http://facebook.github.io/react/) and [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) in your Ruby on Rails (3.2+) application. Learn more:

- React's [Getting Started guide](https://facebook.github.io/react/docs/getting-started.html)
- Use React & JSX [with Webpacker](#use-with-webpacker) or [with the asset pipeline](#use-with-asset-pipeline)
- Rendering [components in views](#view-helper) or [in controller actions](#controller-actions)
- [Server-side rendering](#server-side-rendering)
- [Generating components](#component-generator) in various formats
- [`ReactRailsUJS`](#ujs) for mounting and unmounting components
- Automatically [camelizing props](#camelize-props)
- [Related Projects](#related-projects)
- [Developing](#development) the gem

## Installation

Install from Rubygems as `react-rails`.

```ruby
gem "react-rails"
```

Get started with `rails g react:install`:

```
$ rails g react:install
```

## Use with Webpacker

[Webpacker](https://github.com/rails/webpacker) integrates modern JS tooling with Rails. `ReactRailsUJS` allows you to gradually migrate to Webpacker.

Get started by adding `webpacker` to your gemfile and installing `webpacker` and `react-rails`:

```
$ rails webpacker:install
$ rails webpacker:install:react
$ rails generate react:install
```

This gives you:

- `app/javascript/components/` directory for your React components
- [`ReactRailsUJS`](#ujs) setup in `app/javascript/packs/application.js`
- `app/javascript/packs/server_rendering.js` for [server-side rendering](#server-side-rendering)

When you add a component to `app/javascript/components/`, you can [render it in a Rails view](#view-helper):

```erb
<%= react_component("HelloWorld", { greeting: "Hello" }) %>
```

The component name tells `react-rails` where to load the component. For example:

`react_component` call | component `require`
-----|-----
`react_component("Item")` | `require("Item")`
`react_component("items/index")` | `require("items/index")`
`react_component("items.Index")` | `require("items").Index`
`react_component("items.Index.Header")` | `require("items").Index.Header`

This way, you can access top-level, default, or named exports.

If `require` fails, `react-rails` falls back to the global namespace approach described in [Use with Asset Pipeline](#use-with-asset-pipeline).

The `require.context` inserted into `packs/application.js` is used to load components. If you want to load components from a different directory, override it by calling `ReactRailsUJS.useContext`:

```js
var myCustomContext = require.context("custom_components", true)
var ReactRailsUJS = require("react_ujs")
// use `custom_components/` for <%= react_component(...) %> calls
ReactRailsUJS.useContext(myCustomContext)
```

### Gotcha: Capitalization

Component File Name | `react_component` call
-----|-----
`app/javascript/components/samplecomponent.js` | `react_component("samplecomponent")`
`app/javascript/components/sample_component.js` | `react_component("sample_component")`
`app/javascript/components/SampleComponent.js` | `react_component("SampleComponent")`
`app/javascript/components/SampleComponent.js.jsx` | Has to be renamed to SampleComponent.jsx, then use `react_component("SampleComponent")`


## Use with Asset Pipeline

`react-rails` provides React.js & a UJS driver to the Rails asset pipeline. Get started by installing:

```
$ rails g react:install
```

Then restart your development server.

This will:

- add some `//= require`s to `application.js`
- add a `components/` directory for React components
- add `server_rendering.js` for [server-side rendering](#server-side-rendering)

Now, you can create React components in `.jsx` files:

```js
// app/assets/javascripts/components/post.jsx

window.Post = createReactClass({
  render: function() {
    return <h1>{this.props.title}</h1>
  }
})

// or, equivalent:
class Post extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>
  }
}
```

Then, you can render those [components in views](#view-helper):

```erb
<%= react_component("Post", {title: "Hello World"}) %>
```

Components must be accessible from the top level, but they may be namespaced, for example:

```erb
<%= react_component("Comments.NewForm", {post_id: @post.id}) %>
<!-- looks for `window.Comments.NewForm` -->
```

### Custom JSX Transformer

`react-rails` uses a transformer class to transform JSX in the asset pipeline. The transformer is initialized once, at boot. You can provide a custom transformer to `config.react.jsx_transformer_class`. The transformer must implement:

- `#initialize(options)`, where options is the value passed to `config.react.jsx_transform_options`
- `#transform(code_string)` to return a string of transformed code

`react-rails` provides two transformers, `React::JSX::BabelTransformer` (which uses [ruby-babel-transpiler](https://github.com/babel/ruby-babel-transpiler)) and `React::JSX::JSXTransformer` (which uses the deprecated `JSXTransformer.js`).

### React.js versions

`//= require react` brings `React` into your project.

By default, React's [development version] is provided to `Rails.env.development`. You can override the React build with a config:

```ruby
# Here are the defaults:
# config/environments/development.rb
MyApp::Application.configure do
  config.react.variant = :development
end

# config/environments/production.rb
MyApp::Application.configure do
  config.react.variant = :production
end
```

Be sure to restart your Rails server after changing these files. See [VERSIONS.md](https://github.com/reactjs/react-rails/blob/master/VERSIONS.md) to learn which version of React.js is included with your `react-rails` version.


## View Helper

`react-rails` includes a view helper and an [unobtrusive JavaScript driver](#ujs) which work together to put React components on the page.

The view helper (`react_component`) puts a `div` on the page with the requested component class & props. For example:

```erb
<%= react_component('HelloMessage', name: 'John') %>
<!-- becomes: -->
<div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

On page load, the [`react_ujs` driver](#ujs) will scan the page and mount components using `data-react-class`
and `data-react-props`.

The view helper's signature is:

```ruby
react_component(component_class_name, props={}, html_options={})
```

- `component_class_name` is a string which identifies a component. See [getConstructor](#getconstructor) for details.
- `props` is either:
  - an object that responds to `#to_json`; or
  - an already-stringified JSON object (see [JBuilder note](#use-with-jbuilder) below).
- `html_options` may include:
  - `tag:` to use an element other than a `div` to embed `data-react-class` and `data-react-props`.
  - `prerender: true` to render the component on the server.
  - `camelize_props` to [transform a props hash](#camelize-props)
  - `**other` Any other arguments (eg `class:`, `id:`) are passed through to [`content_tag`](http://api.rubyonrails.org/classes/ActionView/Helpers/TagHelper.html#method-i-content_tag).


#### Custom View Helper

`react-rails` uses a "helper implementation" class to generate the output of the `react_component` helper. The helper is initialized once per request and used for each `react_component` call during that request. You can provide a custom helper class to `config.react.view_helper_implementation`. The class must implement:

- `#react_component(name, props = {}, options = {}, &block)` to return a string to inject into the Rails view
- `#setup(controller_instance)`, called when the helper is initialized at the start of the request
- `#teardown(controller_instance)`, called at the end of the request

`react-rails` provides one implementation, `React::Rails::ComponentMount`.

## UJS

`react-rails`'s JavaScript is available as `"react_ujs"` in the asset pipeline or from NPM. It attaches itself to the window as `ReactRailsUJS`.

### Mounting & Unmounting

Usually, `react-rails` mounts & unmounts components automatically as described in [Event Handling](#event-handling) below.

You can also mount & unmount components from `<%= react_component(...) %>` tags using UJS:

```js
// Mount all components on the page:
ReactRailsUJS.mountComponents()
// Mount components within a selector:
ReactRailsUJS.mountComponents(".my-class")
// Mount components within a specific node:
ReactRailsUJS.mountComponents(specificDOMnode)

// Unmounting works the same way:
ReactRailsUJS.unmountComponents()
ReactRailsUJS.unmountComponents(".my-class")
ReactRailsUJS.unmountComponents(specificDOMnode)
```

You can use this when the DOM is modified by AJAX calls or modal windows.

### Event Handling

`ReactRailsUJS` checks for various libraries to support their page change events:

- `Turbolinks`
- `pjax`
- `jQuery`
- Native DOM events

`ReactRailsUJS` will automatically mount components on `<%= react_component(...) %>` tags and unmount them when appropriate.

If you need to re-detect events, you can call `detectEvents`:

```js
// Remove previous event handlers and add new ones:
ReactRailsUJS.detectEvents()
```

For example, if `Turbolinks` is loaded _after_ `ReactRailsUJS`, you'll need to call this again. This function removes previous handlers before adding new ones, so it's safe to call as often as needed.

### `getConstructor`

Components are loaded with `ReactRailsUJS.getConstructor(className)`. This function has two built-in implementations:

- On the asset pipeline, it looks up `className` in the global namespace.
- On Webpacker, it `require`s files and accesses named exports, as described in [Use with Webpacker](#use-with-webpacker).

You can override this function to customize the mapping of name-to-constructor. [Server-side rendering](#server-side-rendering) also uses this function.

## Server-Side Rendering

You can render React components inside your Rails server with `prerender: true`:

```erb
<%= react_component('HelloMessage', {name: 'John'}, {prerender: true}) %>
<!-- becomes: -->
<div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}">
  <h1>Hello, John!</h1>
</div>
```

_(It will also be mounted by the [UJS](#ujs) on page load.)_

Server rendering is powered by [`ExecJS`](https://github.com/rails/execjs) and subject to some requirements:

- `react-rails` must load your code. By convention, it uses `server_rendering.js`, which was created
by the install task. This file must include your components _and_ their dependencies (eg, Underscore.js).
- Your code can't reference `document` or `window`. Prerender processes don't have access to `document` or `window`,
so jQuery and some other libs won't work in this environment :(

`ExecJS` supports many backends. CRuby users will get the best performance from [`mini_racer`](https://github.com/discourse/mini_racer#performance).

#### Configuration

Server renderers are stored in a pool and reused between requests. Threaded Rubies (eg jRuby) may see a benefit to increasing the pool size beyond the default `0`.

These are the default configurations:

```ruby
# config/environments/application.rb
# These are the defaults if you don't specify any yourself
MyApp::Application.configure do
  # Settings for the pool of renderers:
  config.react.server_renderer_pool_size  ||= 1  # ExecJS doesn't allow more than one on MRI
  config.react.server_renderer_timeout    ||= 20 # seconds
  config.react.server_renderer = React::ServerRendering::BundleRenderer
  config.react.server_renderer_options = {
    files: ["server_rendering.js"],       # files to load for prerendering
    replay_console: true,                 # if true, console.* will be replayed client-side
  }
  # Changing files matching these dirs/exts will cause the server renderer to reload:
  config.react.server_renderer_extensions = ["jsx", "js"]
  config.react.server_renderer_directories = ["/app/assets/javascripts", "/app/javascripts/"]
end
```

#### JavaScript State

Some of ExecJS's backends are stateful (eg, mini_racer, therubyracer). This means that any side-effects of a prerender will affect later renders with that renderer.

To manage state, you have a couple options:

- Make a custom renderer with `#before_render` / `#after_render` hooks as [described below](#custom-server-renderer)
- Use `per_request_react_rails_prerenderer` to manage state for a whole controller action.

To check out a renderer for the duration of a controller action, call the `per_request_react_rails_prerenderer` helper in the controller class:

```ruby
class PagesController < ApplicationController
  # Use the same React server renderer for the entire request:
  per_request_react_rails_prerenderer
end
```

Then, you can access the ExecJS context directly with `react_rails_prerenderer.context`:

```ruby
def show
  react_rails_prerenderer           # => #<React::ServerRendering::BundleRenderer>
  react_rails_prerenderer.context   # => #<ExecJS::Context>

  # Execute arbitrary JavaScript code
  # `self` is the global context
  react_rails_prerenderer.context.exec("self.Store.setup()")
  render :show
  react_rails_prerenderer.context.exec("self.Store.teardown()")
end
```

`react_rails_prerenderer` may also be accessed in before- or after-actions.

#### Custom Server Renderer

`react-rails` depends on a renderer class for rendering components on the server. You can provide a custom renderer class to `config.react.server_renderer`. The class must implement:

- `#initialize(options={})`, which accepts the hash from `config.react.server_renderer_options`
- `#render(component_name, props, prerender_options)` to return a string of HTML

`react-rails` provides two renderer classes: `React::ServerRendering::ExecJSRenderer` and `React::ServerRendering::BundleRenderer`.

`ExecJSRenderer` offers two other points for extension:

- `#before_render(component_name, props, prerender_options)` to return a string of JavaScript to execute _before_ calling `React.render`
- `#after_render(component_name, props, prerender_options)` to return a string of JavaScript to execute _after_ calling `React.render`

Any subclass of `ExecJSRenderer` may use those hooks (for example, `BundleRenderer` uses them to handle `console.*` on the server).

## Controller Actions

Components can also be server-rendered directly from a controller action with the custom `component` renderer. For example:

```ruby
class TodoController < ApplicationController
  def index
    @todos = Todo.all
    render component: 'TodoList', props: { todos: @todos }, tag: 'span', class: 'todo'
  end
end
```

You can also provide the "usual" `render` arguments: `content_type`, `layout`, `location` and `status`. By default, your current layout will be used and the component, rather than a view, will be rendered in place of `yield`. Custom data-* attributes can be passed like `data: {remote: true}`.

Prerendering is set to `true` by default, but can be turned off with `prerender: false`.

## Component Generator

You can generate a new component file with:

```sh
rails g react:component ComponentName prop1:type prop2:type ...
```

For example,

```sh
rails g react:component Post title:string published:bool published_by:instanceOf{Person}
```

would generate:

```js
var Post = createReactClass({
  propTypes: {
    title: PropTypes.string,
    published: PropTypes.bool,
    publishedBy: PropTypes.instanceOf(Person)
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.title}</div>
        <div>Published: {this.props.published}</div>
        <div>Published By: {this.props.publishedBy}</div>
      </div>
    );
  }
};
```

The generator also accepts options:

- `--es6`: use `class ComponentName extends React.Component`
- `--coffee`: use CoffeeScript

Accepted PropTypes are:

- Plain types: `any`, `array`, `bool`, `element`, `func`, `number`, `object`, `node`, `shape`, `string`
- `instanceOf` takes an optional class name in the form of `instanceOf{className}`.
- `oneOf` behaves like an enum, and takes an optional list of strings in the form of `'name:oneOf{one,two,three}'`.
- `oneOfType` takes an optional list of react and custom types in the form of `'model:oneOfType{string,number,OtherType}'`.

Note that the arguments for `oneOf` and `oneOfType` must be enclosed in single quotes
 to prevent your terminal from expanding them into an argument list.

#### Use with JBuilder

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

### Camelize Props

You can configure `camelize_props` option:

```ruby
MyApp::Application.configure do
  config.react.camelize_props = true # default false
end
```

Now, Ruby hashes given to `react_component(...)` as props will have their keys transformed from _underscore_- to _camel_-case, for example:

```ruby
{ all_todos: @todos, current_status: @status }
# becomes:
{ "allTodos" => @todos, "currentStatus" => @status }
```

You can also specify this option in `react_component`:

```erb
<%= react_component('HelloMessage', {name: 'John'}, {camelize_props: true}) %>
```

## Related Projects

- [react\_on\_rails Gem](https://github.com/shakacode/react_on_rails): Integration of React with Rails utilizing Webpack, Babel, React, Redux, React-Router.
- [Ruby Hyperloop](http://ruby-hyperloop.org/): Use Ruby to build reactive user interfaces with React.
- [react-rails-hot-loader](https://github.com/rmosolgo/react-rails-hot-loader) is a simple live-reloader for `react-rails`.
- [react-rails-benchmark_renderer](https://github.com/pboling/react-rails-benchmark_renderer) adds performance instrumentation to server rendering.
- [The Free React on Rails Course](https://learnetto.com/users/hrishio/courses/the-free-react-on-rails-5-course) A free video course which teaches the basics of React and how to get started using it in Rails with `react-rails`.

## Development

- Run tests with `rake test` or `appraisal rake test`
  - Integration tests run in Headless Chrome which is included in Chrome (59+ linux,OSX | 60+ Windows)
  - ChromeDriver is included with `chromedriver-helper` gem so no need to manually install that 👍
- Update React assets with `rake react:update`
- Update the UJS with `rake ujs:update`
- Releases:
  - To release a new RubyGems version:
    - Increment the version in `lib/react/rails/version.rb`
    - Add an entry to `VERSIONS.md`
    - Update the changelog (find recent changes on GitHub by listing commits or showing closed PRs)
    - Commit changes & push to master
    - `bundle exec rake release`: pushes a tag to GitHub, builds a `.gem`, and pushes to RubyGems
  - To release a new NPM version:
    - Update the version in `react_ujs/package.json`
    - Commit & push to master
    - `bundle exec rake ujs:publish` (runs `npm publish`)
