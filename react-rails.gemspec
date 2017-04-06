# encoding: utf-8

$:.push File.expand_path('../lib', __FILE__)
require 'react/rails/version'

Gem::Specification.new do |s|
  s.name = 'react-rails'
  s.version = React::Rails::VERSION
  s.summary = 'React integration for Ruby on Rails'
  s.description = 'Render components in views or controller actions. Server-side rendering powered by ExecJS. Transform JSX in the asset pipeline or use Webpacker.'
  s.homepage = 'https://github.com/reactjs/react-rails'
  s.license = 'Apache-2.0'

  s.author = ['Paul O’Shannessy', 'Robert Mosolgo']
  s.email = ['paul@oshannessy.com', 'rmosolgo@gmail.com']

  s.add_development_dependency 'appraisal'
  s.add_development_dependency 'bundler', '>= 1.2.2'
  s.add_development_dependency 'codeclimate-test-reporter'
  s.add_development_dependency 'coffee-rails'
  s.add_development_dependency 'es5-shim-rails', '>= 2.0.5'
  s.add_development_dependency 'guard'
  s.add_development_dependency 'guard-minitest'
  s.add_development_dependency 'jbuilder'
  s.add_development_dependency 'listen', '~> 3.0.0' # support Ruby 2.1
  s.add_development_dependency 'poltergeist', '>= 0.3.3'
  s.add_development_dependency 'test-unit', '~> 2.5'
  s.add_development_dependency 'rails', '>= 3.2'

  s.add_dependency 'connection_pool'
  s.add_dependency 'execjs'
  s.add_dependency 'railties', '>= 3.2'
  s.add_dependency 'tilt'
  s.add_dependency 'babel-transpiler', '>=0.7.0'

  s.files = Dir[
    'lib/**/*',
    'README.md',
    'CHANGELOG.md',
    'LICENSE'
  ]

  s.require_paths = ['lib']
end
