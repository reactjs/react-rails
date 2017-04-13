# Versions

You can control what version of React.js (and JSXTransformer) is used by `react-rails`:

- Use the [bundled version](#bundled-versions) that comes with the gem
- [Drop in a copy](#drop-in-version) of React.js

## Bundled Versions

| Gem      | React.js |
|----------|----------|
| master   | 15.4.2   |
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

You can also provide your own copies of React.js and JSXTransformer. Just add `react.js` or `JSXTransformer.js` (case-sensitive) files to the asset pipeline (eg,  `app/assets/vendor/`).
