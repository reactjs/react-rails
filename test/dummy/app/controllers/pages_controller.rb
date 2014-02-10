class PagesController < ApplicationController
  def show
    @name = %w(Alice Bob)[params[:id].to_i % 2]
  end
end
