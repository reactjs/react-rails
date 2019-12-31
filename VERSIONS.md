# Versions

You can control what version of React.js (and JSXTransformer) is used by `react-rails`:

- Use the [bundled version](#bundled-versions) that comes with the gem
- [Drop in a copy](#drop-in-version) of React.js

## Bundled Versions

| Gem      | React.js |
|----------|----------|
| master   | 16.9.0   |
| 2.6.1    | 16.9.0   |
| 2.6.0    | 16.8.6   |
| 2.5.0    | 16.8.6   |
| 2.4.7    | 16.4.2   |
| 2.4.6    | 16.4.1   |
| 2.4.5    | 16.3.2   |
| 2.4.4    | 16.2.0   |
| 2.4.3    | 16.1.1   |
| 2.4.2    | 16.1.1   |
| 2.4.1    | 16.0.0   |
| 2.4.0    | 16.0.0   |
| 2.3.1    | 15.6.2   | Updated Addons
| 2.3.0    | 15.6.2   |
| 2.2.1    | 15.4.2   |
| 2.2.0    | 15.4.2   |
| 2.1.0    | 15.4.2   |
| 2.0.2    | 15.4.2   |
| 2.0.0    | 15.4.2   |
| 1.11.0   | 15.4.2   |
| 1.10.0   | 15.4.1   |
| 1.9.0    | 15.3.0   |
| 1.8.2    | 15.3.0   |
| 1.8.1    | 15.2.1   |
| 1.8.0    | 15.0.2   |
| 1.7.2    | 15.0.2   |
| 1.7.1    | 15.0.2   |
| 1.7.0    | 15.0.1   |
| 1.6.2    | 0.14.6   |
| 1.6.1    | 0.14.6   |
| 1.6.0    | 0.14.6   |
| 1.5.0    | 0.14.3   |
| 1.4.2    | 0.14.2   |
| 1.4.1    | 0.14.0   |
| 1.4.0    | 0.14.0   |
| 1.3.3    | 0.13.3   |
| 1.3.2    | 0.13.3   |
| 1.3.1    | 0.13.3   |
| 1.3.0    | 0.13.3   |
| 1.2.0    | 0.13.3   |
| 1.1.0    | 0.13.3   |
| 1.0.0    | ~> 0.13  |
| 0.13.0.0 | 0.13.0   |
| 0.12.2.0 | 0.12.2   |
| 0.12.1.0 | 0.12.1   |
| 0.12.0.0 | 0.12.0   |

## Drop-in Version

You can also provide your own copies of React.js and JSXTransformer. Just add a different version of `react.js` and `react-server.js` from this project or `JSXTransformer.js` (case-sensitive) files to the asset pipeline (eg,  `app/assets/vendor/`).
