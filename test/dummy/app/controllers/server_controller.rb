class ServerController < ApplicationController
  def show
    @component_name = params[:component_name] || "TodoList"
    @todos = %w{todo1 todo2 todo3}
  end

  def console_example
    @todos = %w{todo1 todo2 todo3}
  end

  def inline_component_prerender_true
    render(component_options)
  end

  def inline_component_prerender_false
    render(component_options.merge(prerender: false))
  end

  def inline_component_with_camelize_props_prerender_true
    render component: 'TodoList', props: { test_camelize_props: true, todos: ['dummy'] }, camelize_props: true
  end

  def inline_component_with_camelize_props_prerender_false
    render component: 'TodoList', props: { test_camelize_props: true, todos: ['dummy'] }, camelize_props: true, prerender: false
  end

  private

  def component_options
    {
      component: 'TodoList',
      props: { todos: ['Render this inline'] },
      tag: 'span',
      class: 'custom-class',
      id: 'custom-id',
      data: { remote: true }
    }
  end
end
