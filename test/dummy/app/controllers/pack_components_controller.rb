# frozen_string_literal: true

class PackComponentsController < ApplicationController
  # make sure Sprockets application.js isn't loaded:
  layout false
  def show; end
end
