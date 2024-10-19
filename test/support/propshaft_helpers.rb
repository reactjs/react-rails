# frozen_string_literal: true

module PropshaftHelpers
  module_function

  def available?
    !!defined?(Propshaft)
  end

  def when_propshaft_available
    return unless available?

    yield
  end
end
