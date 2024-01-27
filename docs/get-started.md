# Get Started

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Use with Shakapacker](#use-with-shakapacker)
  - [Component name](#component-name)
  - [File naming](#file-naming)
  - [Typescript support](#typescript-support)
  - [Test component](#test-component)
- [Use with Asset Pipeline](#use-with-asset-pipeline)
  - [Custom JSX Transformer](#custom-jsx-transformer)
    - [Transform Plugin Options](#transform-plugin-options)
  - [React.js versions](#reactjs-versions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Use with Shakapacker

1. Create a new Rails app:
Prevent installing default javascript dependencies by using `--skip-javascript` option:

```bash
rails new my-app --skip-javascript
cd my-app
```

2. Install `shakapacker`:
```bash
bundle add shakapacker --strict
rails shakapacker:install
```

3. Install `react` and some other required npm packages:
```bash
yarn add react react-dom @babel/preset-react prop-types \
     css-loader style-loader mini-css-extract-plugin css-minimizer-webpack-plugin
```

Also update the Babel configuration in the `package.json` file:

```diff
"babel": {
  "presets": [
-   "./node_modules/shakapacker/package/babel/preset.js"
+   "./node_modules/shakapacker/package/babel/preset.js",
+   "@babel/preset-react"
  ]
},
```

4. Install `react-rails`:
```bash
$ bundle add 'react-rails' --strict
$ rails generate react:install
```

This gives you:

- `app/javascript/components/` directory for your React components
- [`ReactRailsUJS`](./ujs.md) setup in `app/javascript/packs/application.js`
- `app/javascript/packs/server_rendering.js` for [server-side rendering](#server-side-rendering)

5. Generate your first component:
```bash
$ rails g react:component HelloWorld greeting:string
```

You can also generate your component in a subdirectory:

```bash
$ rails g react:component my_subdirectory/HelloWorld greeting:string
```

Note: Your component is added to `app/javascript/components/` by default.

Note: If your component is in a subdirectory you will append the directory path to your erb component call.

Example:
```erb
<%= react_component("my_subdirectory/HelloWorld", { greeting: "Hello from react-rails." }) %>
```

6. [Render it in a Rails view](./view-helper.md):

```erb
<!-- erb: paste this in view -->
<%= react_component("HelloWorld", { greeting: "Hello from react-rails." }) %>
```

7. Lets Start the app:
```bash
$ rails s
```
Output: greeting: Hello from react-rails", inspect webpage in your browser to see the change in tag props.

8. Run dev server (optional)
In order to run dev server with HMR feature you need to parallely run:

```bash
$ ./bin/shakapacker-dev-server
```

Note: On Rails 6 you need to specify `webpack-dev-server` host. To this end, update `config/initializers/content_security_policy.rb` and uncomment relevant lines.

### Component name

The component name tells `react-rails` where to load the component. For example:

`react_component` call | component `require`
-----|-----
`react_component("Item")` | `require("Item")`
`react_component("items/index")` | `require("items/index")`
`react_component("items.Index")` | `require("items").Index`
`react_component("items.Index.Header")` | `require("items").Index.Header`

This way, you can access top-level, default, or named exports.

The `require.context` inserted into `packs/application.js` is used to load components. If you want to load components from a different directory, override it by calling `ReactRailsUJS.useContext`:

```js
var myCustomContext = require.context("custom_components", true)
var ReactRailsUJS = require("react_ujs")
// use `custom_components/` for <%= react_component(...) %> calls
ReactRailsUJS.useContext(myCustomContext)
```

If `require` fails to find your component, [`ReactRailsUJS`](./ujs.md) falls back to the global namespace, described in [Use with Asset Pipeline](#use-with-asset-pipeline).

In some cases, having multiple `require.context` entries may be desired. Examples of this include:

- Refactoring a typical Rails application into a Rails API with an (eventually) separate Single Page Application (SPA). For this use case, one can add a separate pack in addition to the typical `application` one. React components can be shared between the packs but the new pack can use a minimal Rails view layout, different default styling, etc.
- In a larger application, you might find it helpful to split your JavaScript by routes/controllers to avoid serving unused components and improve your site performance by keeping bundles smaller. For example, you might have separate bundles for homepage, search, and checkout routes. In that scenario, you can add an array of `require.context` component directory paths via `useContexts` to `server_rendering.js`, to allow for [Server-Side Rendering](./server-side-rendering.md) across your application:
 
```js
// server_rendering.js
var homepageRequireContext = require.context('homepage', true);
var searchRequireContext = require.context('search', true);
var checkoutRequireContext = require.context('checkout', true);

var ReactRailsUJS = require('react_ujs');
ReactRailsUJS.useContexts([
  homepageRequireContext,
  searchRequireContext,
  checkoutRequireContext
]);
```
### File naming

React-Rails supports plenty of file extensions such as: .js, .jsx.js, .js.jsx, .es6.js, .coffee, etcetera!
Sometimes this will cause a stumble when searching for filenames.

Component File Name | `react_component` call
-----|-----
`app/javascript/components/samplecomponent.js` | `react_component("samplecomponent")`
`app/javascript/components/sample_component.js` | `react_component("sample_component")`
`app/javascript/components/SampleComponent.js` | `react_component("SampleComponent")`
`app/javascript/components/SampleComponent.js.jsx` | Has to be renamed to SampleComponent.jsx, then use `react_component("SampleComponent")`

### Typescript support

```bash
yarn add typescript @babel/preset-typescript
```

Babel won’t perform any type-checking on TypeScript code. To optionally use type-checking run:

```bash
yarn add fork-ts-checker-webpack-plugin
```

Add `tsconfig.json` with the following content:

```json
{
  "compilerOptions": {
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es6", "dom"],
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "target": "es5",
    "jsx": "react",
    "noEmit": true
  },
  "exclude": ["**/*.spec.ts", "node_modules", "vendor", "public"],
  "compileOnSave": false
}
```

Then modify the webpack config to use it as a plugin:

```js
// config/webpack/webpack.config.js
const { webpackConfig, merge } = require("shakapacker");
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = merge(webpackConfig, {
  plugins: [new ForkTSCheckerWebpackPlugin()],
});
```

Doing this will allow React-Rails to support the .tsx extension. Additionally, it is recommended to add `ts` and `tsx` to the `server_renderer_extensions` in your application configuration:

```ruby
config.react.server_renderer_extensions = ["jsx", "js", "tsx", "ts"]
```

### Test component

You can use `assert_react_component` to test component render:

```erb
<!-- app/views/welcome/index.html.erb -->

<%= react_component("HelloWorld", { greeting: "Hello from react-rails.", info: { name: "react-rails" } }, { class: "hello-world" }) %>
```

```rb
class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test 'assert_react_component' do
    get "/welcome"
    assert_equal 200, response.status

    # assert rendered react component and check the props
    assert_react_component "HelloWorld" do |props|
      assert_equal "Hello from react-rails.", props[:greeting]
      assert_equal "react-rails", props[:info][:name]
      assert_select "[class=?]", "hello-world"
    end

    # or just assert component rendered
    assert_react_component "HelloWorld"
  end
end
```

## Use with Asset Pipeline

`react-rails` provides a pre-bundled React.js & a UJS driver to the Rails asset pipeline. Get started by adding the `react-rails` gem:

```ruby
gem 'react-rails'
```

And then install the react generator:

```
$ rails g react:install
```

Then restart your development server.

This will:

- add some `//= require`s to `application.js`
- add a `components/` directory for React components
- add `server_rendering.js` for [server-side rendering](./server-side-rendering.md)

Now, you can create React components in `.jsx` files:

```JSX
// app/assets/javascripts/components/post.jsx

window.Post = createReactClass({
  render: function() {
    return <h1>{this.props.title}</h1>
  }
})

// or, equivalent:
class Post extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>
  }
}
```

Then, you can render those [components in views](./view-helper.md):

```erb
<%= react_component("Post", {title: "Hello World"}) %>
```

Components must be accessible from the top level, but they may be namespaced, for example:

```erb
<%= react_component("Comments.NewForm", {post_id: @post.id}) %>
<!-- looks for `window.Comments.NewForm` -->
```

### Custom JSX Transformer

`react-rails` uses a transformer class to transform JSX in the asset pipeline. The transformer is initialized once, at boot. You can provide a custom transformer to `config.react.jsx_transformer_class`. The transformer must implement:

- `#initialize(options)`, where options is the value passed to `config.react.jsx_transform_options`
- `#transform(code_string)` to return a string of transformed code

`react-rails` provides two transformers, `React::JSX::BabelTransformer` (which uses [ruby-babel-transpiler](https://github.com/babel/ruby-babel-transpiler)) and `React::JSX::JSXTransformer` (which uses the deprecated `JSXTransformer.js`).

#### Transform Plugin Options

To supply additional transform plugins to your JSX Transformer, assign them to `config.react.jsx_transform_options`

`react-rails` uses the Babel version of the `babel-source` gem.

For example, to use `babel-plugin-transform-class-properties` :

    config.react.jsx_transform_options = {
      optional: ['es7.classProperties']
    }

### React.js versions

`//= require react` brings `React` into your project.

By default, React's [development version] is provided to `Rails.env.development`. You can override the React build with a config:

```ruby
# Here are the defaults:
# config/environments/development.rb
MyApp::Application.configure do
  config.react.variant = :development
end

# config/environments/production.rb
MyApp::Application.configure do
  config.react.variant = :production
end
```

Be sure to restart your Rails server after changing these files. See [VERSIONS.md](https://github.com/reactjs/react-rails/blob/main/VERSIONS.md) to learn which version of React.js is included with your `react-rails` version. In some edge cases you may need to bust the sprockets cache with `rake tmp:clear`
