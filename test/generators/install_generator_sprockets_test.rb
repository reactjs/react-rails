require 'test_helper'
require 'generators/react/install_generator'

# If webpacker is available, its setup is preferred
if !WebpackerHelpers.available?
  class InstallGeneratorSprocketsTest < Rails::Generators::TestCase
    destination File.join(Rails.root, 'tmp', 'generator_test_output')
    tests React::Generators::InstallGenerator
    setup :prepare_destination

    def copy_directory(dir)
      source = Rails.root.join(dir)
      dest = Rails.root.join(destination_root, File.dirname(dir))

      FileUtils.mkdir_p dest
      FileUtils.cp_r source, dest
    end

    test "adds requires to `application.js`" do
      run_generator
      assert_application_file_created
    end

    test "it modifes an existing 'application.js'" do
      copy_directory('app/assets/javascripts/application.js')
      run_generator
      assert_application_file_modified
    end

    test "creates `application.js` if it doesn't exist" do
      copy_directory('app/assets/javascripts/application.js')
      File.delete destination_root + '/app/assets/javascripts/application.js'

      run_generator
      assert_application_file_created
    end

    test "modifies `application.js` if it's empty" do
      init_application_js ''

      run_generator
      assert_application_file_created
    end

    test "updates `application.js` if require_tree is commented" do
      init_application_js <<-END
        //
        // require_tree .
        //
      END

      run_generator
      assert_application_file_modified
    end

    test "updates `application.js` if require turbolinks has extra spaces" do
      init_application_js <<-END
        //
        //#{"=  require  turbolinks  "}
        //
      END

      run_generator
      assert_application_file_modified
    end

    test "creates server_rendering.js with default requires" do
      run_generator
      server_rendering_file_path = "app/assets/javascripts/server_rendering.js"
      assert_file server_rendering_file_path, %r{//= require react-server\n}
      assert_file server_rendering_file_path, %r{//= require ./components\n}
    end

    test "creates server rendering initializer" do
      run_generator
      initializer_path = "config/initializers/react_server_rendering.rb"
      assert_file(initializer_path, %r{Rails.application.config.assets.precompile \+= \["server_rendering.js"\]})
    end

    test "skipping server rendering" do
      run_generator %w(--skip-server-rendering)
      assert_no_file "config/initializers/react_server_rendering.rb"
      assert_no_file "app/assets/javascripts/server_rendering.js"
    end

    def init_application_js(content)
      FileUtils.mkdir_p destination_root + '/app/assets/javascripts/'
      File.write destination_root + '/app/assets/javascripts/application.js', content
    end

    def assert_application_file_created
      assert_file 'app/assets/javascripts/application.js',
                  %r{//= require react\n//= require react_ujs\n//= require components\n}
    end

    def assert_application_file_modified
      assert_file 'app/assets/javascripts/application.js', %r{\n//= require react\n}
      assert_file 'app/assets/javascripts/application.js', %r{\n//= require react_ujs\n}
      assert_file 'app/assets/javascripts/application.js', %r{\n//= require components\n}
    end
  end
end
