require 'test_helper'
require 'generators/react/install_generator'

class InstallGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, 'tmp', 'generator_test_output')
  tests React::Generators::InstallGenerator

  def copy_directory(dir)
    source = Rails.root.join(dir)
    dest = Rails.root.join(destination_root, File.dirname(dir))

    FileUtils.mkdir_p dest
    FileUtils.cp_r source, dest
  end

  test "adds requires to `application.js`" do
    run_generator

    assert_application_file_modified
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

    assert_application_file_modified
  end

  test "modifies `application.js` it's empty" do
    File.write(destination_root + '/app/assets/javascripts/application.js', '')

    run_generator

    assert_application_file_modified
  end

  def assert_application_file_modified
    assert_file 'app/assets/javascripts/application.js', %r{//= require react}
    assert_file 'app/assets/javascripts/application.js', %r{//= require react_ujs}
    assert_file 'app/assets/javascripts/application.js', %r{//= require components}
  end
end
