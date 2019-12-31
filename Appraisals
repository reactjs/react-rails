appraise 'rails-5.2-sprockets_4' do
  gem 'rails', '~> 5.2.x'
  gem 'sprockets', '~> 4.0.x'
  gem 'turbolinks', '~> 5'
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5.2-sprockets_3' do
  gem 'rails', '~> 5.2.x'
  gem 'sprockets', '~> 3.5'
  gem 'turbolinks', '~> 5'
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5.2_no_sprockets_webpacker_3' do
  gem 'rails', '~> 5.2.x'
  gem 'webpacker', '~> 3.0'
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5.2_no_sprockets_webpacker_4' do
  gem 'rails', '~> 5.2.x'
  gem 'webpacker', '~> 4.0'
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5.2-no_sprockets' do
  # Appraisal adds `turbolinks` to this gemfile because it is
  # present in `./Gemfile`.
  # But it causes this gemfile to break, so it must be removed
  # from `./gemfiles/rails_5_no_sprockets.gemfile` manually.
  gem 'rails', '~> 5.2.x'
end
