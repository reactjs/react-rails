require 'rails_helper'

RSpec.describe ServerController, type: :controller do
  describe 'console_example' do
    it do
      get :console_example
      [/Console Logged/,
       /console.log.apply\(console, \["got initial state"\]\)/,
       /console.warn.apply\(console, \["mounted component"\]\)/,
       /console.error.apply\(console, \["rendered!","foo"\]\)/].each do |regex|
        expect(response.body).to match regex
      end
    end
  end

  describe 'console_example_suppressed' do
    it do
      get :console_example_suppressed
      expect(response.body).to match(/Console Logged/)
      [/console.log/, /console.warn/, /console.error/].each do |regex|
        expect(response.body).not_to match regex
      end
    end
  end

  describe 'inline_component' do
    it do
      get :inline_component
      [/<span data-react-class=\"TodoList\"/,
       /Render this inline<\/span>/,
       /<title>Dummy<\/title>/].each do |regex|
        expect(response.body).to match regex
      end
    end
  end
end
