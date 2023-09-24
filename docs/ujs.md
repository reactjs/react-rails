# UJS

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Mounting & Unmounting](#mounting--unmounting)
- [Event Handling](#event-handling)
- [`getConstructor`](#getconstructor)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


`react-rails`'s JavaScript is available as `"react_ujs"` in the asset pipeline or from NPM. It attaches itself to the window as `ReactRailsUJS`.

## Mounting & Unmounting

Usually, `react-rails` mounts & unmounts components automatically as described in [Event Handling](#event-handling) below.

You can also mount & unmount components from `<%= react_component(...) %>` tags using UJS:

```js
// Mount all components on the page:
ReactRailsUJS.mountComponents()
// Mount components within a selector:
ReactRailsUJS.mountComponents(".my-class")
// Mount components within a specific node:
ReactRailsUJS.mountComponents(specificDOMnode)

// Unmounting works the same way:
ReactRailsUJS.unmountComponents()
ReactRailsUJS.unmountComponents(".my-class")
ReactRailsUJS.unmountComponents(specificDOMnode)
```

You can use this when the DOM is modified by AJAX calls or modal windows.

## Event Handling

`ReactRailsUJS` checks for various libraries to support their page change events:

- `Turbolinks`
- `pjax`
- `jQuery`
- Native DOM events

`ReactRailsUJS` will automatically mount components on `<%= react_component(...) %>` tags and unmount them when appropriate.

If you need to re-detect events, you can call `detectEvents`:

```js
// Remove previous event handlers and add new ones:
ReactRailsUJS.detectEvents()
```

For example, if `Turbolinks` is loaded _after_ `ReactRailsUJS`, you'll need to call this again. This function removes previous handlers before adding new ones, so it's safe to call as often as needed.

If `Turbolinks` is `import`ed via Shakapacker (and thus not available globally), `ReactRailsUJS` will be unable to locate it. To fix this, you can temporarily add it to the global namespace:

```js
// Order is particular. First start Turbolinks:
Turbolinks.start();
// Add Turbolinks to the global namespace:
window.Turbolinks = Turbolinks;
// Remove previous event handlers and add new ones:
ReactRailsUJS.detectEvents();
// (Optional) Clean up global namespace:
delete window.Turbolinks;
```

## `getConstructor`

Components are loaded with `ReactRailsUJS.getConstructor(className)`. This function has two default implementations, depending on if you're using the asset pipeline or Shakapacker:

- On the asset pipeline, it looks up `className` in the global namespace (`ReactUJS.constructorFromGlobal`).
- On Shakapacker, it `require`s files and accesses named exports, as described in [Use with Shakapacker](./get-started.md#use-with-shakapacker), falling back to the global namespace (`ReactUJS.constructorFromRequireContextWithGlobalFallback`).

You can override this function to customize the mapping of name-to-constructor. [Server-side rendering](./server-side-rendering.md) also uses this function.

For example, the fallback behavior of
`ReactUJS.constructorFromRequireContextWithGlobalFallback` can sometimes make
server-side rendering errors hard to debug as it will swallow the original error
(more info
[here](https://github.com/reactjs/react-rails/issues/264#issuecomment-552326663)).
`ReactUJS.constructorFromRequireContext` is provided for this reason. You can
use it like so:

```js
// Replaces calls to `ReactUJS.useContext`
ReactUJS.getConstructor = ReactUJS.constructorFromRequireContext(require.context('components', true));
```

