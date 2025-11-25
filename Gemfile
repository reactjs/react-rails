# frozen_string_literal: true

source "http://rubygems.org"

# Nokogiri version constraints for different Ruby versions
# Ruby 3.0+ can use nokogiri 1.17.x which provides better compatibility
# Ruby 2.7 uses gemfiles/ruby27.gemfile with nokogiri 1.15.x
gem "nokogiri", "~> 1.17.0" if RUBY_VERSION >= "3.0"

gemspec
