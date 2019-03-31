appraise 'rails-5.2-sprockets_4' do
  gem 'rails', '~> 5.2.0'
  gem 'sprockets', '~> 4.0.x'
  gem 'turbolinks', '~> 5'
end

appraise 'rails-5.2_no_sprockets_webpacker_3' do
  gem 'rails', '~> 5.2.0'
  gem 'webpacker', '~> 3.0'
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5.2_no_sprockets_webpacker_4' do
  gem 'rails', '~> 5.2.0'
  gem 'webpacker', '~> 4.0'
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5.1-sprockets_4' do
  gem 'rails', '~> 5.1.0'
  gem 'sprockets', '~> 4.0.x'
  gem 'turbolinks', '~> 5.0.0'
end

# no_sprockets is a magical name from sprockets_helper.rb in test to
#   load in certain tests or not.
appraise 'rails-5_no_sprockets_webpacker_3' do
  gem 'rails', '~> 5.0.0'
  gem 'webpacker', '~> 3.0'
  # This ExecJS backend provides stateful context
  # which the default nodejs backend does not
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5_no_sprockets_webpacker_2' do
  gem 'rails', '~> 5.0.0'
  gem 'webpacker', '~> 2.0'
  # This ExecJS backend provides stateful context
  # which the default nodejs backend does not
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5_no_sprockets_webpacker_1_x' do
  gem 'rails', '~> 5.0.0'
  gem 'webpacker', '~> 1.2'
  # This ExecJS backend provides stateful context
  # which the default nodejs backend does not
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5_no_sprockets_webpacker_1_1' do
  gem 'rails', '~> 5.0.0'
  gem 'webpacker', '~> 1.1.0'
  # This ExecJS backend provides stateful context
  # which the default nodejs backend does not
  gem 'mini_racer', :platforms => :mri
  gem 'therubyrhino', :platforms => :jruby
end

appraise 'rails-5-no_sprockets' do
  # Appraisal adds `turbolinks` to this gemfile because it is
  # present in `./Gemfile`.
  # But it causes this gemfile to break, so it must be removed
  # from `./gemfiles/rails_5_no_sprockets.gemfile` manually.
  gem 'rails', '~> 5.0.0'
end

appraise 'rails-4.2-sprockets_4' do
  gem 'rails', '~> 4.2.1'
  gem 'sprockets', '~> 4.0.x'
  gem 'turbolinks', '~> 2.5.0'
  # This ExecJS backend provides stateful context
  # which the default nodejs backend does not
  gem 'mini_racer', :platforms => :mri
end

appraise 'rails-4.2-sprockets_3' do
  gem 'rails', '~> 4.2.1'
  gem 'sprockets', '~> 3.5'
  gem 'turbolinks', '~> 2.5.0'
end

appraise 'rails-4.2-sprockets_2' do
  gem 'rails', '~> 4.2.1'
  gem 'sprockets', '~> 2.12'
  gem 'turbolinks'
end
