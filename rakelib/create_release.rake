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

  is_dry_run = Release.object_to_boolean(args_hash[:dry_run])
  puts "is_dry_run: #{is_dry_run}" if is_dry_run

  gem_version = args_hash.fetch(:gem_version, '').strip
  npm_version = gem_version.empty? ? '' : Release.convert_rubygem_to_npm_version(gem_version)

  Release.update_the_local_project
  Release.ensure_there_is_nothing_to_commit

  # Preparing for release

  # Updating the pre-bundled react
  puts 'Updating react'
  Rake::Task['react:update'].invoke

  # Updating ReactRailsUJS
  puts 'Updating ujs:update'
  Rake::Task['ujs:update'].invoke

  Release.commit_the_changes('Update pre-bundled react and React ujs') unless is_dry_run

  Release.bump_gem_version(gem_version, is_dry_run)
  Release.release_the_new_npm_version(npm_version, is_dry_run)
  Release.release_the_new_gem_version(is_dry_run)

  Release.push
end

# A collection of helper functions for gem and npm release
module Release
  extend FileUtils
  class << self
    def gem_root
      File.expand_path('..', __dir__)
    end

    # Executes a string or an array of strings in a shell in the given directory in an unbundled environment
    def sh_in_dir(dir, *shell_commands)
      puts "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
      puts "sh_in_dir, shell_commands = #{shell_commands}"
      puts "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"

      shell_commands.flatten.compact.each { |shell_command| sh %(cd #{dir} && #{shell_command.strip}) }
    end

    def commit_the_changes(message)
      sh_in_dir(gem_root, "git commit -am #{message}") unless nothing_to_commit?
    end

    def nothing_to_commit?
      status = `git status --porcelain`
      $CHILD_STATUS.success? && status == ''
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

    def object_to_boolean(value)
      [true, 'true', 'yes', 1, '1', 't'].include?(value.instance_of?(String) ? value.downcase : value)
    end

    def convert_rubygem_to_npm_version(gem_version)
      regex_match = gem_version.match(/(\d+\.\d+\.\d+)[.-]?(.+)?/)
      return "#{regex_match[1]}-#{regex_match[2]}" if regex_match[2]

      regex_match[1].to_s
    end

    def update_the_local_project
      puts 'Pulling latest commits from remote repository'

      sh_in_dir(gem_root, 'git pull --rebase')
      sh_in_dir(gem_root, 'bundle')
      sh_in_dir(gem_root, 'yarn')
      sh_in_dir(File.join(gem_root, 'react-builds'), 'yarn')

      raise 'Failed in pulling latest changes from default remore repository.' unless $CHILD_STATUS.success?
    rescue Errno::ENOENT
      raise 'Ensure you have Git and Bundler installed before continuing.'
    end

    def bump_gem_version(gem_version, is_dry_run)
      puts 'Bumping gem version'
      Release.sh_in_dir(
        gem_root,
        "gem bump --no-commit #{gem_version == '' ? '' : %(--version #{gem_version})}",
        'bundle install',
        (is_dry_run ? nil: "git commit -am 'Bump version to #{gem_version}'")
      )
    end

    def release_the_new_gem_version(is_dry_run)
      puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      puts 'Use the OTP for RubyGems!'
      puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'

      sh_in_dir(gem_root, 'gem release --push --tag') unless is_dry_run
    end

    def release_the_new_npm_version(npm_version, is_dry_run)
      puts "Making npm release, #{is_dry_run ? 'dry run' : 'real run'}"
      # Will bump the yarn version, commit, tag the commit, push to repo, and release on yarn
      puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      puts 'Use the OTP for NPM!'
      puts 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      release_it_command = +'release-it'
      release_it_command << " #{npm_version}" unless npm_version == ''
      release_it_command << ' --npm.publish --no-git.requireCleanWorkingDir'
      release_it_command << ' --dry-run --verbose' if is_dry_run
      sh_in_dir(gem_root, release_it_command)
    end

    def push
      sh_in_dir(gem_root, 'git push')
    end
  end
end
