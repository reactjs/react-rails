appraise 'sprockets_4' do
  gem 'rails', '~> 7.0.x'
  gem 'sprockets', '~> 4.0.x'
  gem 'sprockets-rails'
  gem 'turbolinks', '~> 5'
  gem 'mini_racer', :platforms => :mri
end

appraise 'sprockets_3' do
  gem 'rails', '~> 7.0.x'
  gem 'sprockets', '~> 3.5'
  gem 'sprockets-rails'
  gem 'turbolinks', '~> 5'
  gem 'mini_racer', :platforms => :mri
end

appraise 'no_sprockets_shakapacker' do
  gem 'rails', '~> 7.0.x'
  gem 'shakapacker', '6.6.0'
end

appraise 'no_sprockets' do
  # Appraisal adds `turbolinks` to this gemfile because it is
  # present in `./Gemfile`.
  # But it causes this gemfile to break, so it must be removed
  # from `./gemfiles/rails_5_no_sprockets.gemfile` manually.
  gem 'rails', '~> 7.0.x'
end
