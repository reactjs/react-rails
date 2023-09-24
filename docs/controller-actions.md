# Controller Actions

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


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
