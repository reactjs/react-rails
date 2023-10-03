# View Helper

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Custom View Helper](#custom-view-helper)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


`react-rails` includes a view helper and an [unobtrusive JavaScript driver](./ujs.md) which work together to put React components on the page.

The view helper (`react_component`) puts a `div` on the page with the requested component class & props. For example:

```erb
<%= react_component('HelloMessage', name: 'John') %>
<!-- becomes: -->
<div data-react-class="HelloMessage" data-react-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

On page load, the [`react_ujs` driver](./ujs.md) will scan the page and mount components using `data-react-class`
and `data-react-props`.

The view helper's signature is:

```ruby
react_component(component_class_name, props={}, html_options={})
```

- `component_class_name` is a string which identifies a component. See [getConstructor](./ujs.md#getconstructor) for details.
- `props` is either:
  - an object that responds to `#to_json`; or
  - an already-stringified JSON object (see [JBuilder note](./component-generator.md#use-with-jbuilder) below).
- `html_options` may include:
  - `tag:` to use an element other than a `div` to embed `data-react-class` and `data-react-props`.
  - `prerender: true` to render the component on the server.
  - `camelize_props` to [transform a props hash](./component-generator.md#camelize-props)
  - `**other` Any other arguments (eg `class:`, `id:`) are passed through to [`content_tag`](http://api.rubyonrails.org/classes/ActionView/Helpers/TagHelper.html#method-i-content_tag).


## Custom View Helper

`react-rails` uses a "helper implementation" class to generate the output of the `react_component` helper. The helper is initialized once per request and used for each `react_component` call during that request. You can provide a custom helper class to `config.react.view_helper_implementation`. The class must implement:

- `#react_component(name, props = {}, options = {}, &block)` to return a string to inject into the Rails view
- `#setup(controller_instance)`, called when the helper is initialized at the start of the request
- `#teardown(controller_instance)`, called at the end of the request

`react-rails` provides one implementation, `React::Rails::ComponentMount`.
