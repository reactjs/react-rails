class HelperController < ApplicationController
  def show
    @todos = %w{todo1 todo2 todo3}
    render_react_component "Foo", {:bar => 'value'}, layout: 'custom', status: 218
  end
end
