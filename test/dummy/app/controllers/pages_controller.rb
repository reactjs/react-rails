# frozen_string_literal: true

class PagesController < ApplicationController
  per_request_react_rails_prerenderer if WebpackerHelpers.available? || SprocketsHelpers.available?

  def show
    @prerender = !params[:prerender].nil?
    if @prerender
      js_context = react_rails_prerenderer.context
      # This isn't safe for production, we're just testing the render context:
      greeting_override = params[:greeting] || ""
      setup_code = "global.ctx = {}; global.ctx.greeting = '#{greeting_override}';"
      js_context.exec(setup_code)
    end
    @name = %w[Alice Bob][params[:id].to_i % 2]
    render :show
    return unless @prerender

    js_context.exec("global.ctx = undefined;")
  end

  def no_turbolinks
    @prerender = false
    render :show, layout: "app_no_turbolinks"
  end
end
