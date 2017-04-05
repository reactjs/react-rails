class PagesController < ApplicationController
  per_request_react_rails_prerenderer

  def show
    @prerender = !!params[:prerender]
    if @prerender
      js_context = react_rails_prerenderer.context
      # This isn't safe for production, we're just testing the render context:
      greeting_override = params[:greeting] || ""
      setup_code = "global.ctx = {}; global.ctx.greeting = '#{greeting_override}';"
      js_context.exec(setup_code)
    end
    @name = %w(Alice Bob)[params[:id].to_i % 2]
    render :show
    if @prerender
      js_context.exec("global.ctx = undefined;")
    end
  end
end
