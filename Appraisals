appraise "rails-3.2" do
  gem 'rails', '~> 3.2.21'
  gem 'rack-cache', '~> 1.6.1'
end

appraise "rails-4.0" do
  gem 'rails', '~> 4.0.13'
end

appraise "rails-4.0-with-therubyracer" do
  gem 'rails', '~> 4.0.13'
  gem 'therubyracer', '0.12.0', :platform => :mri
end

appraise "rails-4.1" do
  gem 'rails', '~> 4.1.10'
  # Just to make sure we support old Turbolinks:
  gem "turbolinks", "~> 2.3.0"
end

appraise "rails-4.2-sprockets_2" do
  gem 'rails', '~> 4.2.1'
  gem "sprockets", "~> 2.12"
end

appraise "rails-4.2-sprockets_3" do
  gem 'rails', '~> 4.2.1'
  gem "sprockets", "~> 3.5"
  gem "turbolinks", "~> 2.5.0"
end

appraise "rails-5" do
  gem 'rails', '~> 5.0.0.beta2'
  gem "turbolinks", "~> 5.0.0.beta"
end
