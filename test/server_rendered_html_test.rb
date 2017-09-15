require 'test_helper'
require 'fileutils'

SprocketsHelpers.when_available do
  class ServerRenderedHtmlTest  < ActionDispatch::IntegrationTest
    # Rails' asset pipeline has trouble picking up changes to files if they happen too fast.
    # By sleeping for a little bit at certain points, we can make sure that rails notices the
    # change in the file mtime, and calls our renderer setup functions appropriately
    def wait_to_ensure_asset_pipeline_detects_changes
      sleep(1)
    end

    setup do
      if WebpackerHelpers.available?
        WebpackerHelpers.compile
      end
    end

    test 'react server rendering reloads jsx after changes to the jsx files' do
      if WebpackerHelpers.available?
        file_with_updates = File.expand_path('../helper_files/TodoListWithUpdates.js', __FILE__)
        file_without_updates = File.expand_path('../helper_files/TodoListWithoutUpdates.js', __FILE__)
        app_file = File.expand_path("../#{DUMMY_LOCATION}/app/javascript/components/TodoList.js", __FILE__)
      else
        file_with_updates = File.expand_path('../helper_files/TodoListWithUpdates.js.jsx', __FILE__)
        file_without_updates = File.expand_path('../helper_files/TodoListWithoutUpdates.js.jsx', __FILE__)
        app_file = File.expand_path("../#{DUMMY_LOCATION}/app/assets/javascripts/components/TodoList.js.jsx", __FILE__)
      end

      FileUtils.cp app_file, file_without_updates
      FileUtils.touch app_file
      wait_to_ensure_asset_pipeline_detects_changes

      begin
        get '/server/1'
        refute_match(/Updated/, response.body)

        FileUtils.cp file_with_updates, app_file
        FileUtils.touch app_file
        if WebpackerHelpers.available?
          WebpackerHelpers.compile
        else
          wait_to_ensure_asset_pipeline_detects_changes
        end

        get '/server/1'
        assert_match(/Updated/, response.body)
      ensure
        # if we have a test failure, we want to make sure that we revert the dummy file
        FileUtils.mv file_without_updates, app_file
        FileUtils.touch app_file
        wait_to_ensure_asset_pipeline_detects_changes
      end
    end

    test 'it reloads when new jsx files are added to the asset pipeline' do
      begin
        assert_raises(ActionView::Template::Error) {
          get '/server/1?component_name=NewList'
        }

        if WebpackerHelpers.available?
          new_file_path = "../#{DUMMY_LOCATION}/app/javascript/components/NewList.js"
          new_file_contents = <<-HEREDOC
var React = require("react")
module.exports = function() { return <span>"New List"</span> }
HEREDOC
        else
          new_file_path = "../#{DUMMY_LOCATION}/app/assets/javascripts/components/ZZ_NewComponent.js.jsx"
          new_file_contents = <<-HEREDOC
var NewList = function() { return <span>"New List"</span> }
HEREDOC
        end

        new_file_path = File.expand_path(new_file_path, __FILE__)
        File.write new_file_path, new_file_contents

        if WebpackerHelpers.available?
          WebpackerHelpers.compile
        else
          wait_to_ensure_asset_pipeline_detects_changes
        end

        get '/server/1?component_name=NewList'
        assert_match(/New List/, response.body)
      ensure
        FileUtils.rm_rf(new_file_path)
        wait_to_ensure_asset_pipeline_detects_changes
      end
    end

    test 'react server rendering shows console output as html comment' do
      # Make sure console messages are replayed when requested
      React::ServerRendering.renderer_options = { replay_console: true }
      React::ServerRendering.reset_pool
      get '/server/console_example'
      assert_match(/Console Logged/, response.body)
      assert_match(/console.log.apply\(console, \["got initial state"\]\)/, response.body)
      assert_match(/console.warn.apply\(console, \["mounted component"\]\)/, response.body)
      assert_match(/console.error.apply\(console, \["rendered!","foo"\]\)/, response.body)

      # Make sure they're not when we don't ask for them
      React::ServerRendering.renderer_options = { replay_console: false }
      React::ServerRendering.reset_pool

      get '/server/console_example'
      assert_match(/Console Logged/, response.body)
      assert_no_match(/console.log/, response.body)
      assert_no_match(/console.warn/, response.body)
      assert_no_match(/console.error/, response.body)
    end

    test 'react inline component rendering (pre-rendered)' do
      get '/server/inline_component_prerender_true'
      rendered_html = response.body
      assert_match(/<span.*data-react-class=\"TodoList\"/, rendered_html)
      # make sure that the items are prerendered
      assert_match(/Render this inline/, rendered_html)
      assert_match(/<\/ul><\/span>/, rendered_html, "it accepts a tag override")
      # make sure that the layout is rendered with the component
      assert_match(/<title>Dummy<\/title>/, rendered_html)
      # make sure that custom html attributes are rendered
      assert_match(/class=\"custom-class\"/, rendered_html)
      assert_match(/id=\"custom-id\"/, rendered_html)
      assert_match(/data-remote=\"true\"/, rendered_html)
    end

    test 'react inline component rendering (not pre-rendered)' do
      get '/server/inline_component_prerender_false'
      rendered_html = response.body
      # make sure the tag closes immediately:
      assert_match(/<span.*data-react-class=\"TodoList\"[^<]*><\/span>/, rendered_html)
    end
  end
end
