# React-Rails

[![Gem](https://img.shields.io/gem/v/react-rails.svg?style=flat-square)](http://rubygems.org/gems/react-rails)
[![npm](https://img.shields.io/npm/v/react_ujs.svg?style=flat-square)](https://www.npmjs.com/package/react_ujs)
[![Ruby](https://github.com/reactjs/react-rails/actions/workflows/ruby.yml/badge.svg)](https://github.com/reactjs/react-rails/actions/workflows/ruby.yml)

## News
v2.7.0.rc.2 is out on [Ruby Gems](https://rubygems.org/gems/react-rails/versions/2.7.0.rc.2) and [NPM v2.7.0-rc.2](https://www.npmjs.com/package/react_ujs/v/2.7.0-rc.2). Please try it out!

## Summary
React-Rails is a flexible tool to use [React](http://facebook.github.io/react/) with Rails. The benefits:
* Automatically renders React server-side and client-side
* Supports Webpacker 4.x, 3.x, 2.x, 1.1+ or Shakapacker v6+
* Supports Sprockets 4.x, 3.x, 2.x
* Lets you use [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html), [ES6](http://es6-features.org/), [TypeScript](https://www.typescriptlang.org/), [CoffeeScript](http://coffeescript.org/)

## Resouces
* [Click to join **React + Rails Slack**](https://reactrails.slack.com/join/shared_invite/enQtNjY3NTczMjczNzYxLTlmYjdiZmY3MTVlMzU2YWE0OWM0MzNiZDI0MzdkZGFiZTFkYTFkOGVjODBmOWEyYWQ3MzA2NGE1YWJjNmVlMGE). Then join the channel `#react-rails`.
* If you need help upgrading `react-rails`, `webpacker`, or JS packages, contact [justin@shakacode.com](mailto:justin@shakacode.com). The [ShakaCode.com](https://www.shakacode.com) team is helping to maintain this Ruby gem. Check out [this discussion](https://github.com/reactjs/react-rails/discussions/1200).
* If you are upgrading, you might consider migrating to the [react_on_rails](https://github.com/shakacode/react_on_rails) gem.
* Source code example utilizing React-Rails: https://github.com/BookOfGreg/react-rails-example-app

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Get started with Shakapacker](#get-started-with-shakapacker)
  - [File naming](#file-naming)
  - [Typescript support](#typescript-support)
- [Use with Asset Pipeline](#use-with-asset-pipeline)
  - [Custom JSX Transformer](#custom-jsx-transformer)
  - [React.js versions](#reactjs-versions)
- [View Helper](#view-helper)
    - [Custom View Helper](#custom-view-helper)
- [UJS](#ujs)
  - [Mounting & Unmounting](#mounting--unmounting)
  - [Event Handling](#event-handling)
  - [`getConstructor`](#getconstructor)
- [Server-Side Rendering](#server-side-rendering)
    - [Configuration](#configuration)
    - [JavaScript State](#javascript-state)
    - [Custom Server Renderer](#custom-server-renderer)
- [Controller Actions](#controller-actions)
- [Component Generator](#component-generator)
    - [Use with JBuilder](#use-with-jbuilder)
  - [Camelize Props](#camelize-props)
- [Upgrading](#upgrading)
  - [2.3 to 2.4](#23-to-24)
- [Common Errors](#common-errors)
  - [During installation](#during-installation)
  - [Undefined Set](#undefined-set)
  - [Using TheRubyRacer](#using-therubyracer)
  - [HMR](#hmr)
- [Related Projects](#related-projects)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


After reading this README file, additional information about React-Rails can be found in the Wiki page:
https://github.com/reactjs/React-Rails/wiki
The Wiki page features a significant amount of additional information about React-Rails which includes instructional articles and answers to the most frequently asked questions.


## Get started with Shakapacker

_Alternatively, get started with [Sprockets](#use-with-asset-pipeline)_

#### 1) Create a new Rails app:
Prevent installing default javascript dependencies by using `--skip-javascript` option:

```bash
$ rails new my-app --skip-javascript
$ cd my-app
```

#### 2) Install `shakapacker`:
```bash
$ bundle add shakapacker --strict
$ rails webpacker:install
```

#### 3) Install `react` and some other required npm packages:
```bash
$ yarn add react react-dom @babel/preset-react prop-types \
  css-loader style-loader mini-css-extract-plugin css-minimizer-webpack-plugin
```

Also update the Babel configuration in the `package.json` file:

```diff
"babel": {
  "presets": [
-   "./node_modules/shakapacker/package/babel/preset.js"
+   "./node_modules/shakapacker/package/babel/preset.js",
+   "@babel/preset-react"
  ]
},
```

#### 4) Install `react-rails`:
```bash
$ bundle add 'react-rails' --strict
$ rails generate react:install
```

This gives you:

- `app/javascript/components/` directory for your React components
- [`ReactRailsUJS`](#ujs) setup in `app/javascript/packs/application.js`
- `app/javascript/packs/server_rendering.js` for [server-side rendering](#server-side-rendering)

#### 5) Generate your first component:
```bash
$ rails g react:component HelloWorld greeting:string
```

You can also generate your component in a subdirectory:

```bash
$ rails g react:component my_subdirectory/HelloWorld greeting:string
```

Note: Your component is added to `app/javascript/components/` by default.

Note: If your component is in a subdirectory you will append the directory path to your erb component call.

Example:
```erb
<%= react_component("my_subdirectory/HelloWorld", { greeting: "Hello from react-rails." }) %>
```

#### 6) [Render it in a Rails view](#view-helper):

```erb
<!-- erb: paste this in view -->
<%= react_component("HelloWorld", { greeting: "Hello from react-rails." }) %>
```

##### 7) Lets Start the app:
```bash
$ rails s
```
Output: greeting: Hello from react-rails", inspect webpage in your browser to see the change in tag props.

##### 7) Run dev server (optional)
In order to run dev server with HMR feature you need to parallely run:

```bash
$ ./bin/webpacker-dev-server
```

Note: On Rails 6 you need to specify `webpack-dev-server` host. To this end, update `config/initializers/content_security_policy.rb` and uncomment relevant lines.

### Component name

The component name tells `react-rails` where to load the component. For example:

`react_component` call | component `require`
-----|-----
`react_component("Item")` | `require("Item")`
`react_component("items/index")` | `require("items/index")`
`react_component("items.Index")` | `require("items").Index`
`react_component("items.Index.Header")` | `require("items").Index.Header`

This way, you can access top-level, default, or named exports.

The `require.context` inserted into `packs/application.js` is used to load components. If you want to load components from a different directory, override it by calling `ReactRailsUJS.useContext`:

```js
var myCustomContext = require.context("custom_components", true)
var ReactRailsUJS = require("react_ujs")
// use `custom_components/` for <%= react_component(...) %> calls
ReactRailsUJS.useContext(myCustomContext)
```

If `require` fails to find your component, [`ReactRailsUJS`](#ujs) falls back to the global namespace, described in [Use with Asset Pipeline](#use-with-asset-pipeline).

In some cases, having multiple `require.context` entries may be desired. Examples of this include:

- Refactoring a typical Rails application into a Rails API with an (eventually) separate Single Page Application (SPA). For this use case, one can add a separate pack in addition to the typical `application` one. React components can be shared between the packs but the new pack can use a minimal Rails view layout, different default styling, etc.
- In a larger application, you might find it helpful to split your JavaScript by routes/controllers to avoid serving unused components and improve your site performance by keeping bundles smaller. For example, you might have separate bundles for homepage, search, and checkout routes. In that scenario, you can add an array of `require.context` component directory paths via `useContexts` to `server_rendering.js`, to allow for [Server-Side Rendering](#server-side-rendering) across your application:
 
```js
// server_rendering.js
var homepageRequireContext = require.context('homepage', true);
var searchRequireContext = require.context('search', true);
var checkoutRequireContext = require.context('checkout', true);

var ReactRailsUJS = require('react_ujs');
ReactRailsUJS.useContexts([
  homepageRequireContext,
  searchRequireContext,
  checkoutRequireContext
]);
```
### File naming

React-Rails supports plenty of file extensions such as: .js, .jsx.js, .js.jsx, .es6.js, .coffee, etcetera!
Sometimes this will cause a stumble when searching for filenames.

Component File Name | `react_component` call
-----|-----
`app/javascript/components/samplecomponent.js` | `react_component("samplecomponent")`
`app/javascript/components/sample_component.js` | `react_component("sample_component")`
`app/javascript/components/SampleComponent.js` | `react_component("SampleComponent")`
`app/javascript/components/SampleComponent.js.jsx` | Has to be renamed to SampleComponent.jsx, then use `react_component("SampleComponent")`

### Typescript support

```bash
yarn add typescript @babel/preset-typescript
```

Babel won’t perform any type-checking on TypeScript code. To optionally use type-checking run:

```bash
yarn add fork-ts-checker-webpack-plugin
```

Add `tsconfig.json` with the following content:

```json
{
  "compilerOptions": {
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es6", "dom"],
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "target": "es5",
    "jsx": "react",
    "noEmit": true
  },
  "exclude": ["**/*.spec.ts", "node_modules", "vendor", "public"],
  "compileOnSave": false
}
```

Then modify the webpack config to use it as a plugin:

```js
// config/webpack/webpack.config.js
const { webpackConfig, merge } = require("shakapacker");
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = merge(webpackConfig, {
  plugins: [new ForkTSCheckerWebpackPlugin()],
});
```

Doing this will allow React-Rails to support the .tsx extension. Additionally, it is recommended to add `ts` and `tsx` to the `server_renderer_extensions` in your application configuration:

```ruby
config.react.server_renderer_extensions = ["jsx", "js", "tsx", "ts"]
```

### Test component

You can use `assert_react_component` to test component render:

```erb
<!-- app/views/welcome/index.html.erb -->

<%= react_component("HelloWorld", { greeting: "Hello from react-rails.", info: { name: "react-rails" } }, { class: "hello-world" }) %>
```

```rb
class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test 'assert_react_component' do
    get "/welcome"
    assert_equal 200, response.status

    # assert rendered react component and check the props
    assert_react_component "HelloWorld" do |props|
      assert_equal "Hello from react-rails.", props[:greeting]
      assert_equal "react-rails", props[:info][:name]
      assert_select "[class=?]", "hello-world"
    end

    # or just assert component rendered
    assert_react_component "HelloWorld"
  end
end
```

## Use with Asset Pipeline

`react-rails` provides a pre-bundled React.js & a UJS driver to the Rails asset pipeline. Get started by adding the `react-rails` gem:

```ruby
gem 'react-rails'
```

And then install the react generator:

```
$ rails g react:install
```

Then restart your development server.

This will:

- add some `//= require`s to `application.js`
- add a `components/` directory for React components
- add `server_rendering.js` for [server-side rendering](#server-side-rendering)

Now, you can create React components in `.jsx` files:

```JSX
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

#### Transform Plugin Options

To supply additional transform plugins to your JSX Transformer, assign them to `config.react.jsx_transform_options`

`react-rails` uses the Babel version of the `babel-source` gem.

For example, to use `babel-plugin-transform-class-properties` :

    config.react.jsx_transform_options = {
      optional: ['es7.classProperties']
    }

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

Be sure to restart your Rails server after changing these files. See [VERSIONS.md](https://github.com/reactjs/react-rails/blob/master/VERSIONS.md) to learn which version of React.js is included with your `react-rails` version. In some edge cases you may need to bust the sprockets cache with `rake tmp:clear`


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

If `Turbolinks` is `import`ed via Webpacker (and thus not available globally), `ReactRailsUJS` will be unable to locate it. To fix this, you can temporarily add it to the global namespace:

```js
// Order is particular. First start Turbolinks:
Turbolinks.start();
// Add Turbolinks to the global namespace:
window.Turbolinks = Turbolinks;
// Remove previous event handlers and add new ones:
ReactRailsUJS.detectEvents();
// (Optional) Clean up global namespace:
delete window.Turbolinks;
```

### `getConstructor`

Components are loaded with `ReactRailsUJS.getConstructor(className)`. This function has two default implementations, depending on if you're using the asset pipeline or Shakapacker:

- On the asset pipeline, it looks up `className` in the global namespace (`ReactUJS.constructorFromGlobal`).
- On Shakapacker, it `require`s files and accesses named exports, as described in [Get started with Shakapacker](#get-started-with-shakapacker), falling back to the global namespace (`ReactUJS.constructorFromRequireContextWithGlobalFallback`).

You can override this function to customize the mapping of name-to-constructor. [Server-side rendering](#server-side-rendering) also uses this function.

For example, the fallback behavior of
`ReactUJS.constructorFromRequireContextWithGlobalFallback` can sometimes make
server-side rendering errors hard to debug as it will swallow the original error
(more info
[here](https://github.com/reactjs/react-rails/issues/264#issuecomment-552326663)).
`ReactUJS.constructorFromRequireContext` is provided for this reason. You can
use it like so:

```js
// Replaces calls to `ReactUJS.useContext`
ReactUJS.getConstructor = ReactUJS.constructorFromRequireContext(require.context('components', true));
```


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
# config/application.rb
# These are the defaults if you don't specify any yourself
module MyApp
  class Application < Rails::Application
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
    config.react.server_renderer_directories = ["/app/assets/javascripts", "/app/javascript/"]
  end
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

```JSX
var Post = createReactClass({
  propTypes: {
    title: PropTypes.string,
    published: PropTypes.bool,
    publishedBy: PropTypes.instanceOf(Person)
  },

  render: function() {
    return (
      <React.Fragment>
        Title: {this.props.title}
        Published: {this.props.published}
        Published By: {this.props.publishedBy}
      </React.Fragment>
    );
  }
});
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

### Changing Component Templates

To make simple changes to Component templates, copy the respective template file to your Rails project at `lib/templates/react/component/template_filename`.

For example, to change the [ES6 Component template](https://github.com/reactjs/react-rails/blob/master/lib/generators/templates/component.es6.jsx), copy it to `lib/templates/react/component/component.es6.jsx` and modify it.

## Upgrading

### 2.3 to 2.4

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

## Common Errors
### During installation
1) While using installers.(rails webpacker:install:react && rails webpacker:install)
Error:
```
public/packs/manifest.json. Possible causes:
1. You want to set webpacker.yml value of compile to true for your environment
   unless you are using the `webpack -w` or the webpack-dev-server.
2. webpack has not yet re-run to reflect updates.
3. You have misconfigured Webpacker's config/webpacker.yml file.
4. Your webpack configuration is not creating a manifest.
or
yarn: error: no such option: --dev
ERROR: [Errno 2] No such file or directory: 'add'
```
Fix: Try updating yarn package.
```
sudo apt remove cmdtest
sudo apt remove yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

yarn install
```
### Undefined Set
```
ExecJS::ProgramError (identifier 'Set' undefined):

(execjs):1
```
If you see any variation of this issue, see [Using TheRubyRacer](#using-therubyracer)


### Using TheRubyRacer
TheRubyRacer [hasn't updated LibV8](https://github.com/cowboyd/therubyracer/blob/master/therubyracer.gemspec#L20) (The library that powers Node.js) from v3 in 2 years, any new features are unlikely to work.

LibV8 itself is already [beyond version 7](https://github.com/cowboyd/libv8/releases/tag/v7.3.492.27.1) therefore many serverside issues are caused by old JS engines and fixed by using an up to date one such as [MiniRacer](https://github.com/discourse/mini_racer) or [TheRubyRhino](https://github.com/cowboyd/therubyrhino) on JRuby.

### HMR
Hot Module Replacement is [possible with this gem](https://stackoverflow.com/a/54846330/193785) as it does just pass through to Webpacker. Please open an issue to let us know tips and tricks for it to add to the wiki.

Sample repo that shows HMR working with `react-rails`: [https://github.com/edelgado/react-rails-hmr](https://github.com/edelgado/react-rails-hmr)

One caveat is that currently you [cannot Server-Side Render along with HMR](https://github.com/reactjs/react-rails/issues/925#issuecomment-415469572).

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

You can always help by submitting patches or triaging issues, even offering reproduction steps to issues is incredibly helpful!

Please see our [Contribution guide](https://github.com/reactjs/react-rails/blob/master/CONTRIBUTING.md) for more info.
