# frozen_string_literal: true

require 'English'

desc("Releases both the gem and node package using the given version.
  IMPORTANT: the gem version must be in valid rubygem format (no dashes).
  It will be automatically converted to a valid yarn semver by the rake task
  for the node package version. This only makes a difference for pre-release
  versions such as `3.0.0.beta.1` (yarn version would be `3.0.0-beta.1`).
  This task depends on the gem-release (ruby gem) and release-it (node package)
  which are installed via `bundle install` and `yarn global add release-it`

  1st argument: The new version in rubygem format (no dashes). Pass no argument to
                automatically perform a patch version bump.
  2nd argument: Perform a dry run by passing 'true' as a second argument.

  Note, accept defaults for npmjs options. Script will pause to get 2FA tokens.
  Example: `rake release[2.1.0,false]`")

task :create_release, %i[gem_version dry_run] do |_t, args|
  args_hash = args.to_hash
  is_dry_run = object_to_boolean(args_hash[:dry_run])

  gem_version = args_hash.fetch(:gem_version, '').strip
  npm_version = gem_version.empty? ? '' : convert_rubygem_to_npm_version(gem_version)
  gem_root = File.expand_path('..', __dir__)

  # Prepare for release
  Dir.chdir(gem_root)
  ensure_there_is_nothing_to_commit

  # Updating the pre-bundled react
  Rake::Task['react:update'].invoke

  # Updating ReactRailsUJS
  Rake::Task['ujs:update'].invoke

  # release npm version
  # Will bump the yarn version, commit, tag the commit, push to repo, and release on yarn
  release_it_command = +'release-it'
  release_it_command << " #{npm_version}" unless npm_version == ''
  release_it_command << ' --npm.publish --no-git.requireCleanWorkingDir'
  release_it_command << ' --dry-run --verbose' if is_dry_run
  puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
  puts 'Use the OTP for NPM!'
  puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'

  system(release_it_command)

  # release gem version
  # Update lib/react/rails/version.rb
  `gem bump --no-commit #{gem_version == '' ? '' : %(--version #{gem_version})}`

  puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
  puts 'Use the OTP for RubyGems!'
  puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'

  `gem release` unless is_dry_run
end

def object_to_boolean(value)
  [true, 'true', 'yes', 1, '1', 't'].include?(value.instance_of?(String) ? value.downcase : value)
end

def convert_rubygem_to_npm_version(gem_version)
  regex_match = gem_version.match(/(\d+\.\d+\.\d+)[.-]?(.+)?/)
  return "#{regex_match[1]}-#{regex_match[2]}" if regex_match[2]

  regex_match[1].to_s
end

def ensure_there_is_nothing_to_commit
  status = `git status --porcelain`

  return if $CHILD_STATUS.success? && status == ''

  error = if $CHILD_STATUS.success?
            'You have uncommitted code. Please commit or stash your changes before continuing'
          else
            'You do not have Git installed. Please install Git, and commit your changes before continuing'
          end
  raise(error)
end

def update_the_local_project
  puts 'Pulling latest commits from remote repository'

  `git pull --rebase`
  raise 'Failed in pulling latest changes from default remore repository.' unless $CHILD_STATUS.success?

  `bundle install`
rescue Errno::ENOENT
  raise 'Ensure you have Git and Bundler installed before continuing.'
end
