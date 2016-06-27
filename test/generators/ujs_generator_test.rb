require 'test_helper'
require 'generators/react/ujs_generator'

class UjsGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, 'tmp', 'ujs_generator')
  tests React::Generators::UjsGenerator
  setup :prepare_destination

  test "it includes all event support by default" do
    run_generator %w(--output=custom/react_ujs.js)

    assert_file "custom/react_ujs.js" do |generated_js|
      assert_match /ReactRailsUJS\.Turbolinks =/, generated_js
      assert_match /ReactRailsUJS\.TurbolinksClassic =/, generated_js
      assert_match /ReactRailsUJS\.TurbolinksClassicDeprecated =/, generated_js
      assert_match /ReactRailsUJS\.pjax =/, generated_js
      assert_match /ReactRailsUJS\.Native =/, generated_js
    end
  end

  test "it can skip some event support" do
    run_generator %w(--output=custom/react_ujs_2.js --pjax=false --native=false --turbolinks_classic_deprecated=false)

    assert_file "custom/react_ujs_2.js" do |generated_js|
      assert_match /ReactRailsUJS\.Turbolinks =/, generated_js
      assert_match /ReactRailsUJS\.TurbolinksClassic =/, generated_js
      assert_no_match /ReactRailsUJS\.TurbolinksClassicDeprecated =/, generated_js
      assert_no_match /ReactRailsUJS\.pjax =/, generated_js
      assert_no_match /ReactRailsUJS\.Native =/, generated_js
    end
  end
end
