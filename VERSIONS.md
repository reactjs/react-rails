# Versions

There are three ways to control what version of React.js (and JSXTransformer) is used by `react-rails`:

- Use the [bundled version](#bundled-versions) that comes with the gem
- Specify a [react-source version](#react-source-version)
- [Drop in a copy](#drop-in-version) of React.js

## Bundled Versions

| Gem      | React.js |
|----------|----------|
| master   | ~> 0.13  |
| 1.0.0    | ~> 0.13  |
| 0.13.0.0 | 0.13.0   |
| 0.12.2.0 | 0.12.2   |
| 0.12.1.0 | 0.12.1   |
| 0.12.0.0 | 0.12.0   |


## React-Source Version

The [`react-source` gem](https://rubygems.org/gems/react-source) provides JS files to `react-rails`.

You can specify a React.js version by locking to a specific `react-source` in your Gemfile. For example:

```ruby
gem 'react-rails'
# always use React version 0.13.1:
gem 'react-source', '0.13.1'
```

## Drop-in Version

You can also provide your own copies of React.js and JSXTransformer. Just add `react.js` or `JSXTransformer.js` (case-sensitive) files in directories where `react-rails` expects to find them.

To use the _same version in all environments_, put files in `app/vendor/assets/react/`.

If you need _different versions in different environments_, put them in directories that match `config.react.variant`. For example, if you set `config.react.variant = :development`, you could put a copy of `react.js` in `app/vendor/assets/react/development/`.





