# encoding: utf-8

$:.push File.expand_path('../lib', __FILE__)
require 'react/rails/version'

Gem::Specification.new do |s|
  s.name = 'react-rails'
  s.version = React::Rails::VERSION
  s.summary = 'React/JSX adapter for the Ruby on Rails asset pipeline.'
  s.description = 'Compile your JSX on demand or precompile for production.'
  s.homepage = 'https://github.com/reactjs/react-rails'
  s.license = 'APL 2.0'

  s.author = ['Paul O’Shannessy']
  s.email = ['paul@oshannessy.com']

  s.add_development_dependency 'appraisal'
  s.add_development_dependency 'bundler', '>= 1.2.2'
  s.add_development_dependency 'coffee-rails'
  s.add_development_dependency 'es5-shim-rails', '>= 2.0.5'
  s.add_development_dependency 'jbuilder'
  s.add_development_dependency 'poltergeist', '>= 0.3.3'
  s.add_development_dependency 'test-unit', '~> 2.5'
  s.add_development_dependency 'turbolinks', '>= 2.0.0'


  s.add_dependency 'coffee-script-source', '~>1.8'
  s.add_dependency 'connection_pool'
  s.add_dependency 'execjs'
  s.add_dependency 'rails', '>= 3.1'
  # If you change this, make sure to update VERSIONS.md:
  s.add_dependency 'react-source', '~> 0.13'
  s.add_dependency 'tilt'

  s.files = Dir[
    'lib/**/*',
    'README.md',
    'LICENSE'
  ]

  s.require_paths = ['lib']
end
