# frozen_string_literal: true

source "http://rubygems.org"

gemspec

# Keep development bundle compatible with both Ruby 2.7 CI and newer local Rubies.
# Nokogiri 1.19+ requires Ruby 3.2+, which breaks the repo's Ruby 2.7 matrix.
gem "nokogiri", "~> 1.15.7"
