require 'rails_helper'

RSpec.describe 'pages/show.html.erb', type: :view do
  describe 'assigns' do
    it { expect(assigns).to have_key :__react_component_helper }
  end
  describe '#render' do
    it { expect { render }.not_to raise_error }
  end
end
