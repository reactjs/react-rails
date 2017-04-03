appraise "rails-3.2" do
  gem 'rails', '~> 3.2.21'
  gem 'rack-cache', '~> 1.6.1'
  # Modern turbolinks depends on `Rails.application.assets` which no-worky
  gem 'turbolinks', '~> 2.0'
end

appraise "rails-4.0.5" do
  # Depends on sprockets-rails ~> 2.0.0. Support for
  # `Rails.application.assets_manifest` which is used by
  # `ServerRendering::ManifestContainer` has only been added in
  # sprockets-rails 2.2.2. Ensure that server rendering falls back to
  # `ServerRendering::EnvironmentContainer`.`
  gem 'rails', '4.0.5'
  gem "turbolinks"
end

appraise "rails-4.0-with-therubyracer" do
  gem 'rails', '~> 4.0.13'
  gem 'therubyracer', '0.12.0', :platform => :mri
  gem "turbolinks"
end

appraise "rails-4.1" do
  gem 'rails', '~> 4.1.10'
  # Just to make sure we support old Turbolinks:
  gem "turbolinks", "~> 2.3.0"
end

appraise "rails-4.2-sprockets_2" do
  gem 'rails', '~> 4.2.1'
  gem "sprockets", "~> 2.12"
  gem "turbolinks"
end

appraise "rails-4.2-sprockets_3" do
  gem 'rails', '~> 4.2.1'
  gem "sprockets", "~> 3.5"
  gem "turbolinks", "~> 2.5.0"
end

appraise "rails-4.2-sprockets_4" do
  gem 'rails', '~> 4.2.1'
  gem "sprockets", "~> 4.0.x"
  gem "turbolinks", "~> 2.5.0"
end

appraise "rails-5" do
  gem 'rails', '~> 5.0.0'
  gem "turbolinks", "~> 5.0.0"
end

appraise "rails-5-no_sprockets" do
  gem 'rails', '~> 5.0.0'
end

appraise "rails-5-sprockets_4" do
  gem "rails", "~> 5.0.0"
  gem "sprockets", "~> 4.0.x"
  gem "turbolinks", "~> 5.0.0"
end
