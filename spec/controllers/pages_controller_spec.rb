require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  describe 'assigns' do
    it do
      get :show , id: 1
      expect(assigns).to have_key :__react_component_helper
    end
  end
end
