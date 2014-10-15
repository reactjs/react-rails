require 'test_helper'
require 'fileutils'

class ServerRenderedHtmlTest  < ActionDispatch::IntegrationTest
  # Rails' asset pipeline has trouble picking up changes to files if they happen too fast.
  # By sleeping for a little bit at certain points, we can make sure that rails notices the
  # change in the file mtime, and calls our renderer setup functions appropriately
  def wait_to_ensure_asset_pipeline_detects_changes
    sleep(1)
  end

  test 'react server rendering reloads jsx after changes to the jsx files' do
    file_with_updates = File.expand_path('../helper_files/TodoListWithUpdates.js.jsx', __FILE__)
    file_without_updates = File.expand_path('../helper_files/TodoListWithoutUpdates.js.jsx', __FILE__)
    app_file = File.expand_path('../dummy/app/assets/javascripts/components/TodoList.js.jsx', __FILE__)

    FileUtils.cp app_file, file_without_updates
    FileUtils.touch app_file

    begin
      get '/server/1'
      refute_match 'Updated', response.body

      wait_to_ensure_asset_pipeline_detects_changes
      FileUtils.cp file_with_updates, app_file
      FileUtils.touch app_file

      get '/server/1'
      assert_match 'Updated', response.body
    ensure
      # if we have a test failure, we want to make sure that we revert the dummy file
      wait_to_ensure_asset_pipeline_detects_changes
      FileUtils.mv file_without_updates, app_file
      FileUtils.touch app_file
    end
  end

  test 'react server rendering picks up new files to reload' do
    helper_update_file = File.expand_path('../helper_files/todo-helper.js', __FILE__)
    helper_app_file = File.expand_path('../dummy/app/assets/javascripts/todo-helper.js', __FILE__)

    components_with_updates = File.expand_path('../helper_files/components_with_updates.js', __FILE__)
    components_without_updates = File.expand_path('../helper_files/components_without_updates.js', __FILE__)
    components_app_file = File.expand_path('../dummy/app/assets/javascripts/components.js', __FILE__)

    FileUtils.cp components_app_file, components_without_updates
    FileUtils.touch components_app_file

    begin
      get '/server/1'
      refute_match 'Updated', response.body

      wait_to_ensure_asset_pipeline_detects_changes

      FileUtils.cp components_with_updates, components_app_file
      FileUtils.cp helper_update_file, helper_app_file

      FileUtils.touch components_app_file

      get '/server/1'
      assert_match 'Injected Header', response.body
    ensure
      # if we have a test failure, we want to make sure that we revert the dummy file
      wait_to_ensure_asset_pipeline_detects_changes

      FileUtils.mv components_without_updates, components_app_file
      FileUtils.touch components_app_file

      FileUtils.rm helper_app_file
    end
  end
end
