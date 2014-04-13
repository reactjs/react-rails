class ServerController < ApplicationController
  def show
    @todos = %w{todo1 todo2 todo3}
  end
end
