# react-rails [![Build Status](https://travis-ci.org/reactjs/react-rails.png)](https://travis-ci.org/reactjs/react-rails) [![Code Climate](https://codeclimate.com/github/reactjs/react-rails.png)](https://codeclimate.com/github/reactjs/react-rails)

**react-rails version disclaimer**
*This README is for `1.x` branch which is still in development. Please switch to latest `0.x` branch for stable version.*

*Additionally: `0.x` branch directly follows React versions, `1.x` will not do so.*

react-rails is a ruby gem which makes it easier to use [React](http://facebook.github.io/react/) and [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) in your Ruby on Rails application.


1. Making it easy to include `react.js` as part of your dependencies in `application.js`.
2. Transforming JSX into regular JS on request, or as part of asset precompilation.
3. View helpers to render React components in an unobtrusive style and/or on the server.

## Installation

We're specifically targeting versions of Ruby on Rails which make use of the asset pipeline, which means Rails 3.1+.

As with all gem dependencies, we strongly recommend adding `react-rails` to your `Gemfile` and using `bundler` to manage your application's dependencies.

```ruby
# Gemfile
# If you missed a warning at the top of this README - this is still in development
# which means this version is not pushed to rubygems.org

gem 'react-rails', '~> 1.0.0.pre', github: 'reactjs/react-rails'
```

Next, run the installation script.

```bash
rails g react:install
```

This will require `react.js`, `react_ujs.js`, and a `components.js` manifest file in application.js, and create a directory named `app/assets/javascripts/components` for you to store React components in.

## Usage

### react.js

In order to use React client-side in your application, you must make sure the browser requests it. One way to do that is to drop `react.js` into `vendor/assets/javascript/` and by default your application manifest will pick it up. There are downsides to this approach, so we made it even easier. Once you have `react-rails` installed, you can just add a line into your config file (see Configuring) and require react directly in your manifest:

You can `require` it in your manifest:

```js
// app/assets/javascripts/application.js

//= require react
```

Alternatively, you can include it directly as a separate script tag:

```erb
# app/views/layouts/application.erb.html

<%= javascript_include_tag "react" %>
```

### JSX

To transform your JSX into JS, simply create `.js.jsx` files. These files will be transformed on request, or precompiled as part of the `assets:precompile` task.

CoffeeScript files can also be used, by creating `.js.jsx.coffee` files. We also need to embed JSX inside backticks so CoffeeScript ignores the syntax it doesn't understand. Here's an example:

```coffee
Component = React.createClass
  render: ->
    `<ExampleComponent videos={this.props.videos} />`
```

You can use the `--harmony` or `--strip-types` options by adding a configuration to `application.rb`:

```ruby
  config.react.jsx_transform_options = {
      harmony: true,
      strip_types: true, # for removing Flow type annotations
    }
```

### Unobtrusive JavaScript

`react_ujs` will call `React.render` for every element with `data-react-class` attribute. React properties can be specified by `data-react-props` attribute in JSON format. For example:

```erb
<!-- react_ujs will execute `React.render(HelloMessage({name:"Bob"}), element)` -->
<div data-react-class="HelloMessage" data-react-props="<%= {name: 'Bob'}.to_json %>" />
```

`react_ujs` will also scan DOM elements and call `React.unmountComponentAtNode` on page unload. If you want to disable this behavior, remove `data-react-class` attribute in `componentDidMount`.

To use `react_ujs`, simply `require` it after `react` (and after `turbolinks` if [Turbolinks](https://github.com/rails/turbolinks) is used):

```js
// app/assets/javascripts/application.js

//= require turbolinks
//= require react
//= require react_ujs
```

### View helper

There is a view helper method `react_component`. It is designed to work with `react_ujs` and takes a React class name, properties, and HTML options as arguments:

```ruby
react_component('HelloMessage', name: 'John')
# <div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

By default, a `<div>` element is used. Other tag and HTML attributes can be specified:

```ruby
react_component('HelloMessage', {name: 'John'}, :span)
# <span data-...></span>

react_component('HelloMessage', {name: 'John'}, {id: 'hello', class: 'foo', tag: :span})
# <span class="foo" id="hello" data-...></span>
```

#### With JSON and Jbuilder

You can pass prepared JSON directly to the helper, as well.

```ruby
react_component('HelloMessage', {name: 'John'}.to_json)
# <div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

This is especially helpful if you are already using a tool like Jbuilder in your project.

```ruby
# messages/show.json.jbuilder
json.name name
```

```ruby
react_component('HelloMessage', render(template: 'messages/show.json.jbuilder', locals: {name: 'John'}))
# <div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

##### Important Note

By default, the scaffolded Rails index jbuilder templates do not include a root-node. An example scaffolded index.json.jbuilder looks like this:

```ruby
json.array!(@messages) do |message|
  json.extract! message, :id, :name
  json.url message_url(message, format: :json)
end
```

which generates JSON like this:

```json
[{"id":1,"name":"hello","url":"http://localhost:3000/messages/1.json"},{"id":2,"name":"hello","url":"http://localhost:3000/messages/2.json"},{"id":3,"name":"hello","url":"http://localhost:3000/messages/3.json"}]
```

This is not suitable for ReactJS props, which is expected to be a key-value object. You will need to wrap your index.json.jbuilder node with a root node, like so:

```ruby
json.messages do |json|
  json.array!(@messages) do |message|
    json.extract! message, :id, :name
    json.url message_url(message, format: :json)
  end
end
```

Which will generate:

```json
{"messages":[{"id":1,"name":"hello","url":"http://localhost:3000/messages/1.json"},{"id":2,"name":"hello","url":"http://localhost:3000/messages/2.json"},{"id":3,"name":"hello","url":"http://localhost:3000/messages/3.json"}]}
```

### Server Rendering

React components can also use the same ExecJS mechanisms in Sprockets to execute JavaScript code on the server, and render React components to HTML to be delivered to the browser, and then the `react_ujs` script will cause the component to be mounted. In this way, users get fast initial page loads and search-engine-friendly pages.

#### ExecJS

By default, ExecJS will use node.js in an external process to run JS code. Because we will be executing JS on the server in production, an in-process, high-performance JS VM should be used. Simply add the proper one for your platform to your Gemfile:

```ruby
gem "therubyracer", :platforms => :ruby
gem "therubyrhino", :platforms => :jruby
```

#### components.js

In order for us to render your React components, we need to be able to find them and load them into the JS VM. By convention, we look for a `assets/javascripts/components.js` file through the asset pipeline, and load that. For example:

```sass
// app/assets/javascripts/components.js
//= require_tree ./components
```

This will bring in all files located in the `app/assets/javascripts/components` directory.  You can organize your code however you like, as long as a request for `/assets/javascripts/components.js` brings in a concatenated file containing all of your React components, and each one has to be available in the global scope (either `window` or `global` can be used). For `.js.jsx` files this is not a problem, but if you are using `.js.jsx.coffee` files then the wrapper function needs to be taken into account:

```coffee
Component = React.createClass
  render: ->
    `<ExampleComponent videos={this.props.videos} />`

window.Component = Component
```

#### View Helper

To take advantage of server rendering, use the same view helper `react_component`, and pass in `prerender: true` in the `options` hash.

```erb
react_component('HelloMessage', {name: 'John'}, {prerender: true})
```
This will return the fully rendered component markup, and as long as you have included the `react_ujs` script in your page, then the component will also be instantiated and mounted on the client.

### Component Generator

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

### Server Rendering

For performance and thread-safety reasons, a pool of JS VMs are spun up on application start, and the size of the pool and the timeout on requesting a VM from the pool are configurable. You can also say where you want to grab the `react.js` code from, and if you want to change the filenames for the components (this should be an array of filenames that will be requested from the asset pipeline and concatenated together.)

```ruby
# config/environments/application.rb
# These are the defaults if you dont specify any yourself
MyApp::Application.configure do
  config.react.max_renderers = 10
  config.react.timeout = 20 #seconds
  config.react.react_js = lambda {File.read(::Rails.application.assets.resolve('react.js'))}
  config.react.component_filenames = ['components.js']
end

```

## CoffeeScript

It is possible to use JSX with CoffeeScript. The caveat is that you will still need to include the docblock. Since CoffeeScript doesn't allow `/* */` style comments, we need to do something a little different. We also need to embed JSX inside backticks so CoffeeScript ignores the syntax it doesn't understand. Here's an example:

```coffee
Component = React.createClass
  render: ->
    `<ExampleComponent videos={this.props.videos} />`
```

### Changing react.js and JSXTransformer.js versions

In some cases you may want to have your `react.js` and `JSXTransformer.js` files come from a different release than the one, that is specified in the `react-rails.gemspec`. To achieve that, you have to manually replace them in your app.

#### Instructions

Just put another version of `react.js` or `JSXTransformer.js` under `/vendor/assets/react` directory.
If you need different versions of `react.js` for production and development, then use a subdirectory named
after `config.react.variant`, e.g. you set `config.react.variant = :development` so for this environment
`react.js` is expected to be in `/vendor/assets/react/development`

#### Things to remember

If you replace `JSXTransformer.js` in production environment, you have to restart your rails instance,
because the jsx compiler context is cached.

Name of the `JSXTransformer.js` file *is case-sensitive*.
