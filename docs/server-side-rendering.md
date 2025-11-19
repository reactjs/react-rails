# Server-Side Rendering

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Configuration](#configuration)
- [JavaScript State](#javascript-state)
- [Custom Server Renderer](#custom-server-renderer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


You can render React components inside your Rails server with `prerender: true`:

```erb
<%= react_component('HelloMessage', {name: 'John'}, {prerender: true}) %>
<!-- becomes: -->
<div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}">
  <h1>Hello, John!</h1>
</div>
```

_(It will also be mounted by the [UJS](./ujs.md) on page load.)_

Server rendering is powered by [`ExecJS`](https://github.com/rails/execjs) and subject to some requirements:

- `react-rails` must load your code. By convention, it uses `server_rendering.js`, which was created
by the install task. This file must include your components _and_ their dependencies (eg, Underscore.js).
- Requires separate compilations for server & client bundles (see [Webpack config](https://github.com/reactjs/react-rails/tree/master/test/dummy/config/webpack))
- Your code can't reference `document` or `window`. Prerender processes don't have access to `document` or `window`,
so jQuery and some other libs won't work in this environment :(

`ExecJS` supports many backends. CRuby users will get the best performance from [`mini_racer`](https://github.com/discourse/mini_racer#performance).

## Configuration

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

## JavaScript State

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

## Custom Server Renderer

`react-rails` depends on a renderer class for rendering components on the server. You can provide a custom renderer class to `config.react.server_renderer`. The class must implement:

- `#initialize(options={})`, which accepts the hash from `config.react.server_renderer_options`
- `#render(component_name, props, prerender_options)` to return a string of HTML

`react-rails` provides two renderer classes: `React::ServerRendering::ExecJSRenderer` and `React::ServerRendering::BundleRenderer`.

`ExecJSRenderer` offers two other points for extension:

- `#before_render(component_name, props, prerender_options)` to return a string of JavaScript to execute _before_ calling `React.render`
- `#after_render(component_name, props, prerender_options)` to return a string of JavaScript to execute _after_ calling `React.render`

Any subclass of `ExecJSRenderer` may use those hooks (for example, `BundleRenderer` uses them to handle `console.*` on the server).
