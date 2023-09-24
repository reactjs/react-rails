# Component Generator

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Use with JBuilder](#use-with-jbuilder)
- [Camelize Props](#camelize-props)
- [Changing Component Templates](#changing-component-templates)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


You can generate a new component file with:

```sh
rails g react:component ComponentName prop1:type prop2:type ... [options]
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

- `--es6`: generates a function component
- `--coffee`: use CoffeeScript

For example,

```sh
rails g react:component ButtonComponent title:string --es6
```

would generate:

```jsx
import React from "react"
import PropTypes from "prop-types"

function ButtonComponent(props) {
  return (
    <React.Fragment>
      Title: {this.props.title}
    </React.Fragment>
  );
}

ButtonComponent.propTypes = {
  title: PropTypes.string
};

export default ButtonComponent
```

**Note:** In a Shakapacker project, es6 template is the default template in the generator.

Accepted PropTypes are:

- Plain types: `any`, `array`, `bool`, `element`, `func`, `number`, `object`, `node`, `shape`, `string`
- `instanceOf` takes an optional class name in the form of `instanceOf{className}`.
- `oneOf` behaves like an enum, and takes an optional list of strings in the form of `'name:oneOf{one,two,three}'`.
- `oneOfType` takes an optional list of react and custom types in the form of `'model:oneOfType{string,number,OtherType}'`.

Note that the arguments for `oneOf` and `oneOfType` must be enclosed in single quotes
 to prevent your terminal from expanding them into an argument list.

## Use with JBuilder

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

## Camelize Props

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

## Changing Component Templates

To make simple changes to Component templates, copy the respective template file to your Rails project at `lib/templates/react/component/template_filename`.

For example, to change the [ES6 Component template](https://github.com/reactjs/react-rails/blob/master/lib/generators/templates/component.es6.jsx), copy it to `lib/templates/react/component/component.es6.jsx` and modify it.
