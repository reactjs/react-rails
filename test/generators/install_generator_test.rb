require 'test_helper'
require 'generators/react/install_generator'

class InstallGeneratorTest < Rails::Generators::TestCase
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
