# frozen_string_literal: true

class CountersController < ApplicationController
  def index
    @counters = [{ name: "Counter 1" }]
  end

  def create
    @counter = { name: "Counter 2" }
  end
end
