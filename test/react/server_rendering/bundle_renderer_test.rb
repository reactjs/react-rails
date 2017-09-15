require 'test_helper'

if SprocketsHelpers.available? || WebpackerHelpers.available?
  class BundleRendererTest < ActiveSupport::TestCase
    CALLBACKS = [:before_render, :after_render]

    webpacker_compiled = false
    setup do
      if WebpackerHelpers.available? && !webpacker_compiled
        WebpackerHelpers.compile
        webpacker_compiled = true
      end
      @renderer = React::ServerRendering::BundleRenderer.new({})
    end

    CALLBACKS.each do |callback_name|
      test "#render should pass prerender options to ##{callback_name}" do
        mocked_method = Minitest::Mock.new
        mocked_method.expect :call, '', [
          'Todo',
          '{"todo":"write tests"}',
          { option: :value, render_function: 'renderToString' }
        ]

        @renderer.stub callback_name, mocked_method do
          @renderer.render('Todo', { todo: 'write tests' }, { option: :value })
        end

        mocked_method.verify
      end
    end

    test '#render returns HTML' do
      result = @renderer.render('Todo', { todo: 'write tests' }, nil)
      assert_match(/<li.*write tests<\/li>/, result)
      assert_match(/data-react-checksum/, result)
    end

    test '#render accepts strings' do
      result = @renderer.render('Todo', { todo: 'write more tests' }.to_json, nil)
      assert_match(/<li.*write more tests<\/li>/, result)
    end

    test '#render accepts :static pre-render option' do
      result = @renderer.render('Todo', { todo: 'write more tests' }, :static)
      assert_match(/<li>write more tests<\/li>/, result)
      assert_no_match(/data-react-checksum/, result)
    end

    test '#render replays console messages' do
      result = @renderer.render('TodoListWithConsoleLog', { todos: ['log some messages'] }, nil)
      assert_match(/<script class="react-rails-console-replay">$/, result)
      assert_match(/console.log.apply\(console, \["got initial state"\]\);$/, result)
      assert_match(/console.warn.apply\(console, \["mounted component"\]\);$/, result)
      assert_match(/console.error.apply\(console, \["rendered!","foo"\]\);$/, result)
    end

    test '#render console messages can be disabled' do
      no_log_renderer = React::ServerRendering::BundleRenderer.new({ replay_console: false })
      result = no_log_renderer.render('TodoListWithConsoleLog', { todos: ['log some messages'] }, nil)
      assert_no_match(/console.log.apply\(console, \["got initial state"\]\)/, result)
      assert_no_match(/console.warn.apply\(console, \["mounted component"\]\)/, result)
      assert_no_match(/console.error.apply\(console, \["rendered!","foo"\]\)/, result)
    end

    test '#render errors include stack traces' do
      err = assert_raises React::ServerRendering::PrerenderError do
        @renderer.render('NonExistentComponent', {}, nil)
      end

      if WebpackerHelpers.available?
        # require() failed:
        assert_match(/Invariant Violation:/, err.to_s)
      else
        # eval() failed:
        assert_match(/ReferenceError/, err.to_s)
      end
      assert_match(/NonExistentComponent/, err.to_s, 'it names the component')

      assert_match(/\n/, err.to_s, 'it includes the multi-line backtrace')
    end

    test '#render polyfills setTimeout and clearTimeout and warn about it' do
      result = @renderer.render('WithSetTimeout', {}, nil)

      assert_match(/I am rendered!<\/span>/, result)

      message = 'is not defined for execJS. See https://github.com/sstephenson/execjs#faq. Note babel-polyfill may call this.'
      assert_match(/console.error.apply\(console, \["clearTimeout #{message}"\]\);$/, result)
      assert_match(/console.error.apply\(console, \["setTimeout #{message}"\]\);$/, result)
    end

    if !WebpackerHelpers.available?
      # This doesn't work with webpacker since finding components is based on filename
      test '.new accepts additional code to add to the JS context' do
        additional_code = File.read(File.expand_path('../../../helper_files/WithoutSprockets.js', __FILE__))

        additional_renderer = React::ServerRendering::BundleRenderer.new(code: additional_code)

        assert_match(/drink more caffeine<\/span>/, additional_renderer.render('WithoutSprockets', { label: 'drink more caffeine' }, nil))
      end

      # These use cases don't apply to Webpacker since the require.context comes from a pack:
      test '.new accepts any filenames' do
        limited_renderer = React::ServerRendering::BundleRenderer.new(files: ['react-server.js', 'react_ujs.js', 'components/Todo.js'])
        assert_match(/get a real job<\/li>/, limited_renderer.render('Todo', { todo: 'get a real job' }, nil))
        err = assert_raises React::ServerRendering::PrerenderError do
          limited_renderer.render('TodoList', { todos: [] }, nil)
        end
        assert_match(/ReferenceError/, err.to_s, 'it doesnt load other files')
      end

      test '#render returns html when config.assets.compile is false' do
        begin
          legacy_rendering_files = ['react-server.js', 'react_ujs.js', 'components.js']
          Rails.application.config.assets.precompile += legacy_rendering_files

          SprocketsHelpers.precompile_assets

          Rails.application.config.assets.compile = false

          @renderer = React::ServerRendering::BundleRenderer.new(files: legacy_rendering_files)

          result = @renderer.render('Todo', { todo: 'write tests' }, nil)
          assert_match(/<li.*write tests<\/li>/, result)
          assert_match(/data-react-checksum/, result)
        ensure
          Rails.application.config.assets.compile = true

          SprocketsHelpers.clear_precompiled_assets
        end
      end
    end
  end
end
