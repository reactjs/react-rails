/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var React = __webpack_require__(1);
	var ReactDOMServer = __webpack_require__(26);
	var createReactClass = __webpack_require__(14);
	var PropTypes = __webpack_require__(17);

	global.React = React;
	global.ReactDOMServer = ReactDOMServer;
	global.createReactClass = createReactClass;
	global.PropTypes = PropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	if (process.env.NODE_ENV === 'production') {
	  module.exports = __webpack_require__(3);
	} else {
	  module.exports = __webpack_require__(4);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * @license React
	 * react.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	'use strict';var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
	var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
	E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
	H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
	function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
	function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
	function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
	a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
	function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
	var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;
	exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;
	exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
	for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
	exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.");};
	exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};
	exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};
	exports.useTransition=function(){return U.current.useTransition()};exports.version="18.0.0-fc46dba67-20220329";


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, module) {/**
	 * @license React
	 * react.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	          'use strict';

	/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	if (
	  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
	  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
	    'function'
	) {
	  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
	}
	          var ReactVersion = '18.0.0-fc46dba67-20220329';

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	/**
	 * Keeps track of the current dispatcher.
	 */
	var ReactCurrentDispatcher = {
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	};

	/**
	 * Keeps track of the current batch's configuration such as how long an update
	 * should suspend for if it needs to.
	 */
	var ReactCurrentBatchConfig = {
	  transition: null
	};

	var ReactCurrentActQueue = {
	  current: null,
	  // Used to reproduce behavior of `batchedUpdates` in legacy mode.
	  isBatchingLegacy: false,
	  didScheduleLegacyUpdate: false
	};

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	var ReactCurrentOwner = {
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	};

	var ReactDebugCurrentFrame = {};
	var currentExtraStackFrame = null;
	function setExtraStackFrame(stack) {
	  {
	    currentExtraStackFrame = stack;
	  }
	}

	{
	  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
	    {
	      currentExtraStackFrame = stack;
	    }
	  }; // Stack implementation injected by the current renderer.


	  ReactDebugCurrentFrame.getCurrentStack = null;

	  ReactDebugCurrentFrame.getStackAddendum = function () {
	    var stack = ''; // Add an extra top frame while an element is being validated

	    if (currentExtraStackFrame) {
	      stack += currentExtraStackFrame;
	    } // Delegate to the injected renderer-specific implementation


	    var impl = ReactDebugCurrentFrame.getCurrentStack;

	    if (impl) {
	      stack += impl() || '';
	    }

	    return stack;
	  };
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var ReactSharedInternals = {
	  ReactCurrentDispatcher: ReactCurrentDispatcher,
	  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
	  ReactCurrentOwner: ReactCurrentOwner
	};

	{
	  ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
	  ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
	}

	// by calls to these methods by a Babel plugin.
	//
	// In PROD (or in packages without access to React internals),
	// they are left as they are instead.

	function warn(format) {
	  {
	    {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      printWarning('warn', format, args);
	    }
	  }
	}
	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	var didWarnStateUpdateForUnmountedComponent = {};

	function warnNoop(publicInstance, callerName) {
	  {
	    var _constructor = publicInstance.constructor;
	    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
	    var warningKey = componentName + "." + callerName;

	    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
	      return;
	    }

	    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

	    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
	  }
	}
	/**
	 * This is the abstract API for an update queue.
	 */


	var ReactNoopUpdateQueue = {
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} callerName name of the calling function in the public API.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance, callback, callerName) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} callerName name of the calling function in the public API.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
	    warnNoop(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @param {?function} callback Called after component is updated.
	   * @param {?string} Name of the calling function in the public API.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
	    warnNoop(publicInstance, 'setState');
	  }
	};

	var assign = Object.assign;

	var emptyObject = {};

	{
	  Object.freeze(emptyObject);
	}
	/**
	 * Base class helpers for the updating state of a component.
	 */


	function Component(props, context, updater) {
	  this.props = props;
	  this.context = context; // If a component has string refs, we will assign a different object later.

	  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
	  // renderer.

	  this.updater = updater || ReactNoopUpdateQueue;
	}

	Component.prototype.isReactComponent = {};
	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */

	Component.prototype.setState = function (partialState, callback) {
	  if (typeof partialState !== 'object' && typeof partialState !== 'function' && partialState != null) {
	    throw new Error('setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.');
	  }

	  this.updater.enqueueSetState(this, partialState, callback, 'setState');
	};
	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */


	Component.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
	};
	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */


	{
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };

	  var defineDeprecationWarning = function (methodName, info) {
	    Object.defineProperty(Component.prototype, methodName, {
	      get: function () {
	        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

	        return undefined;
	      }
	    });
	  };

	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	function ComponentDummy() {}

	ComponentDummy.prototype = Component.prototype;
	/**
	 * Convenience component with default shallow equality check for sCU.
	 */

	function PureComponent(props, context, updater) {
	  this.props = props;
	  this.context = context; // If a component has string refs, we will assign a different object later.

	  this.refs = emptyObject;
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = true;

	// an immutable object with a single mutable value
	function createRef() {
	  var refObject = {
	    current: null
	  };

	  {
	    Object.seal(refObject);
	  }

	  return refObject;
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

	{
	  didWarnAboutStringRefs = {};
	}

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function () {
	    {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    }
	  };

	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}

	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function () {
	    {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    }
	  };

	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}

	function warnIfStringRefCannotBeAutoConverted(config) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
	      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

	      if (!didWarnAboutStringRefs[componentName]) {
	        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);

	        didWarnAboutStringRefs[componentName] = true;
	      }
	    }
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://reactjs.org/docs/react-api.html#createelement
	 */

	function createElement(type, config, children) {
	  var propName; // Reserved names are extracted

	  var props = {};
	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;

	      {
	        warnIfStringRefCannotBeAutoConverted(config);
	      }
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  } // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.


	  var childrenLength = arguments.length - 2;

	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);

	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }

	    {
	      if (Object.freeze) {
	        Object.freeze(childArray);
	      }
	    }

	    props.children = childArray;
	  } // Resolve default props


	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;

	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }

	  {
	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }
	  }

	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	}
	function cloneAndReplaceKey(oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
	  return newElement;
	}
	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://reactjs.org/docs/react-api.html#cloneelement
	 */

	function cloneElement(element, config, children) {
	  if (element === null || element === undefined) {
	    throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
	  }

	  var propName; // Original props are copied

	  var props = assign({}, element.props); // Reserved names are extracted

	  var key = element.key;
	  var ref = element.ref; // Self is preserved since the owner is preserved.

	  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.

	  var source = element._source; // Owner will be preserved, unless ref is overridden

	  var owner = element._owner;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    } // Remaining properties override existing props


	    var defaultProps;

	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }

	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  } // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.


	  var childrenLength = arguments.length - 2;

	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);

	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }

	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */

	function isValidElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';
	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = key.replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });
	  return '$' + escapedString;
	}
	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */


	var didWarnAboutMaps = false;
	var userProvidedKeyEscapeRegex = /\/+/g;

	function escapeUserProvidedKey(text) {
	  return text.replace(userProvidedKeyEscapeRegex, '$&/');
	}
	/**
	 * Generate a key string that identifies a element within a set.
	 *
	 * @param {*} element A element that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */


	function getElementKey(element, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (typeof element === 'object' && element !== null && element.key != null) {
	    // Explicit key
	    {
	      checkKeyStringCoercion(element.key);
	    }

	    return escape('' + element.key);
	  } // Implicit key determined by the index in the set


	  return index.toString(36);
	}

	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  var invokeCallback = false;

	  if (children === null) {
	    invokeCallback = true;
	  } else {
	    switch (type) {
	      case 'string':
	      case 'number':
	        invokeCallback = true;
	        break;

	      case 'object':
	        switch (children.$$typeof) {
	          case REACT_ELEMENT_TYPE:
	          case REACT_PORTAL_TYPE:
	            invokeCallback = true;
	        }

	    }
	  }

	  if (invokeCallback) {
	    var _child = children;
	    var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows:

	    var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

	    if (isArray(mappedChild)) {
	      var escapedChildKey = '';

	      if (childKey != null) {
	        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
	      }

	      mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
	        return c;
	      });
	    } else if (mappedChild != null) {
	      if (isValidElement(mappedChild)) {
	        {
	          // The `if` statement here prevents auto-disabling of the safe
	          // coercion ESLint rule, so we must manually disable it below.
	          // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
	          if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
	            checkKeyStringCoercion(mappedChild.key);
	          }
	        }

	        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
	        // traverseAllChildren used to do for objects as children
	        escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
	        mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
	        // eslint-disable-next-line react-internal/safe-string-coercion
	        escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
	      }

	      array.push(mappedChild);
	    }

	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.

	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getElementKey(child, i);
	      subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);

	    if (typeof iteratorFn === 'function') {
	      var iterableChildren = children;

	      {
	        // Warn about using Maps as children
	        if (iteratorFn === iterableChildren.entries) {
	          if (!didWarnAboutMaps) {
	            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
	          }

	          didWarnAboutMaps = true;
	        }
	      }

	      var iterator = iteratorFn.call(iterableChildren);
	      var step;
	      var ii = 0;

	      while (!(step = iterator.next()).done) {
	        child = step.value;
	        nextName = nextNamePrefix + getElementKey(child, ii++);
	        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
	      }
	    } else if (type === 'object') {
	      // eslint-disable-next-line react-internal/safe-string-coercion
	      var childrenString = String(children);
	      throw new Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
	 *
	 * The provided mapFunction(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }

	  var result = [];
	  var count = 0;
	  mapIntoArray(children, result, '', '', function (child) {
	    return func.call(context, child, count++);
	  });
	  return result;
	}
	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#reactchildrencount
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */


	function countChildren(children) {
	  var n = 0;
	  mapChildren(children, function () {
	    n++; // Don't return anything
	  });
	  return n;
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  mapChildren(children, function () {
	    forEachFunc.apply(this, arguments); // Don't return anything.
	  }, forEachContext);
	}
	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
	 */


	function toArray(children) {
	  return mapChildren(children, function (child) {
	    return child;
	  }) || [];
	}
	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */


	function onlyChild(children) {
	  if (!isValidElement(children)) {
	    throw new Error('React.Children.only expected to receive a single React element child.');
	  }

	  return children;
	}

	function createContext(defaultValue) {
	  // TODO: Second argument used to be an optional `calculateChangedBits`
	  // function. Warn to reserve for future use?
	  var context = {
	    $$typeof: REACT_CONTEXT_TYPE,
	    // As a workaround to support multiple concurrent renderers, we categorize
	    // some renderers as primary and others as secondary. We only expect
	    // there to be two concurrent renderers at most: React Native (primary) and
	    // Fabric (secondary); React DOM (primary) and React ART (secondary).
	    // Secondary renderers store their context values on separate fields.
	    _currentValue: defaultValue,
	    _currentValue2: defaultValue,
	    // Used to track how many concurrent renderers this context currently
	    // supports within in a single renderer. Such as parallel server rendering.
	    _threadCount: 0,
	    // These are circular
	    Provider: null,
	    Consumer: null,
	    // Add these to use same hidden class in VM as ServerContext
	    _defaultValue: null,
	    _globalName: null
	  };
	  context.Provider = {
	    $$typeof: REACT_PROVIDER_TYPE,
	    _context: context
	  };
	  var hasWarnedAboutUsingNestedContextConsumers = false;
	  var hasWarnedAboutUsingConsumerProvider = false;
	  var hasWarnedAboutDisplayNameOnConsumer = false;

	  {
	    // A separate object, but proxies back to the original context object for
	    // backwards compatibility. It has a different $$typeof, so we can properly
	    // warn for the incorrect usage of Context as a Consumer.
	    var Consumer = {
	      $$typeof: REACT_CONTEXT_TYPE,
	      _context: context
	    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

	    Object.defineProperties(Consumer, {
	      Provider: {
	        get: function () {
	          if (!hasWarnedAboutUsingConsumerProvider) {
	            hasWarnedAboutUsingConsumerProvider = true;

	            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
	          }

	          return context.Provider;
	        },
	        set: function (_Provider) {
	          context.Provider = _Provider;
	        }
	      },
	      _currentValue: {
	        get: function () {
	          return context._currentValue;
	        },
	        set: function (_currentValue) {
	          context._currentValue = _currentValue;
	        }
	      },
	      _currentValue2: {
	        get: function () {
	          return context._currentValue2;
	        },
	        set: function (_currentValue2) {
	          context._currentValue2 = _currentValue2;
	        }
	      },
	      _threadCount: {
	        get: function () {
	          return context._threadCount;
	        },
	        set: function (_threadCount) {
	          context._threadCount = _threadCount;
	        }
	      },
	      Consumer: {
	        get: function () {
	          if (!hasWarnedAboutUsingNestedContextConsumers) {
	            hasWarnedAboutUsingNestedContextConsumers = true;

	            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
	          }

	          return context.Consumer;
	        }
	      },
	      displayName: {
	        get: function () {
	          return context.displayName;
	        },
	        set: function (displayName) {
	          if (!hasWarnedAboutDisplayNameOnConsumer) {
	            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);

	            hasWarnedAboutDisplayNameOnConsumer = true;
	          }
	        }
	      }
	    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

	    context.Consumer = Consumer;
	  }

	  {
	    context._currentRenderer = null;
	    context._currentRenderer2 = null;
	  }

	  return context;
	}

	var Uninitialized = -1;
	var Pending = 0;
	var Resolved = 1;
	var Rejected = 2;

	function lazyInitializer(payload) {
	  if (payload._status === Uninitialized) {
	    var ctor = payload._result;
	    var thenable = ctor(); // Transition to the next state.
	    // This might throw either because it's missing or throws. If so, we treat it
	    // as still uninitialized and try again next time. Which is the same as what
	    // happens if the ctor or any wrappers processing the ctor throws. This might
	    // end up fixing it if the resolution was a concurrency bug.

	    thenable.then(function (moduleObject) {
	      if (payload._status === Pending || payload._status === Uninitialized) {
	        // Transition to the next state.
	        var resolved = payload;
	        resolved._status = Resolved;
	        resolved._result = moduleObject;
	      }
	    }, function (error) {
	      if (payload._status === Pending || payload._status === Uninitialized) {
	        // Transition to the next state.
	        var rejected = payload;
	        rejected._status = Rejected;
	        rejected._result = error;
	      }
	    });

	    if (payload._status === Uninitialized) {
	      // In case, we're still uninitialized, then we're waiting for the thenable
	      // to resolve. Set it as pending in the meantime.
	      var pending = payload;
	      pending._status = Pending;
	      pending._result = thenable;
	    }
	  }

	  if (payload._status === Resolved) {
	    var moduleObject = payload._result;

	    {
	      if (moduleObject === undefined) {
	        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
	        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))\n\n" + 'Did you accidentally put curly braces around the import?', moduleObject);
	      }
	    }

	    {
	      if (!('default' in moduleObject)) {
	        error('lazy: Expected the result of a dynamic imp' + 'ort() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
	        'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
	      }
	    }

	    return moduleObject.default;
	  } else {
	    throw payload._result;
	  }
	}

	function lazy(ctor) {
	  var payload = {
	    // We use these fields to store the result.
	    _status: Uninitialized,
	    _result: ctor
	  };
	  var lazyType = {
	    $$typeof: REACT_LAZY_TYPE,
	    _payload: payload,
	    _init: lazyInitializer
	  };

	  {
	    // In production, this would just set it on the object.
	    var defaultProps;
	    var propTypes; // $FlowFixMe

	    Object.defineProperties(lazyType, {
	      defaultProps: {
	        configurable: true,
	        get: function () {
	          return defaultProps;
	        },
	        set: function (newDefaultProps) {
	          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

	          defaultProps = newDefaultProps; // Match production behavior more closely:
	          // $FlowFixMe

	          Object.defineProperty(lazyType, 'defaultProps', {
	            enumerable: true
	          });
	        }
	      },
	      propTypes: {
	        configurable: true,
	        get: function () {
	          return propTypes;
	        },
	        set: function (newPropTypes) {
	          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

	          propTypes = newPropTypes; // Match production behavior more closely:
	          // $FlowFixMe

	          Object.defineProperty(lazyType, 'propTypes', {
	            enumerable: true
	          });
	        }
	      }
	    });
	  }

	  return lazyType;
	}

	function forwardRef(render) {
	  {
	    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
	      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
	    } else if (typeof render !== 'function') {
	      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
	    } else {
	      if (render.length !== 0 && render.length !== 2) {
	        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
	      }
	    }

	    if (render != null) {
	      if (render.defaultProps != null || render.propTypes != null) {
	        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
	      }
	    }
	  }

	  var elementType = {
	    $$typeof: REACT_FORWARD_REF_TYPE,
	    render: render
	  };

	  {
	    var ownName;
	    Object.defineProperty(elementType, 'displayName', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	        return ownName;
	      },
	      set: function (name) {
	        ownName = name; // The inner component shouldn't inherit this display name in most cases,
	        // because the component may be used elsewhere.
	        // But it's nice for anonymous functions to inherit the name,
	        // so that our component-stack generation logic will display their frames.
	        // An anonymous function generally suggests a pattern like:
	        //   React.forwardRef((props, ref) => {...});
	        // This kind of inner function is not used elsewhere so the side effect is okay.

	        if (!render.name && !render.displayName) {
	          render.displayName = name;
	        }
	      }
	    });
	  }

	  return elementType;
	}

	var REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function memo(type, compare) {
	  {
	    if (!isValidElementType(type)) {
	      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
	    }
	  }

	  var elementType = {
	    $$typeof: REACT_MEMO_TYPE,
	    type: type,
	    compare: compare === undefined ? null : compare
	  };

	  {
	    var ownName;
	    Object.defineProperty(elementType, 'displayName', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	        return ownName;
	      },
	      set: function (name) {
	        ownName = name; // The inner component shouldn't inherit this display name in most cases,
	        // because the component may be used elsewhere.
	        // But it's nice for anonymous functions to inherit the name,
	        // so that our component-stack generation logic will display their frames.
	        // An anonymous function generally suggests a pattern like:
	        //   React.memo((props) => {...});
	        // This kind of inner function is not used elsewhere so the side effect is okay.

	        if (!type.name && !type.displayName) {
	          type.displayName = name;
	        }
	      }
	    });
	  }

	  return elementType;
	}

	function resolveDispatcher() {
	  var dispatcher = ReactCurrentDispatcher.current;

	  {
	    if (dispatcher === null) {
	      error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
	    }
	  } // Will result in a null access error if accessed outside render phase. We
	  // intentionally don't throw our own error because this is in a hot path.
	  // Also helps ensure this is inlined.


	  return dispatcher;
	}
	function useContext(Context) {
	  var dispatcher = resolveDispatcher();

	  {
	    // TODO: add a more generic warning for invalid values.
	    if (Context._context !== undefined) {
	      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
	      // and nobody should be using this in existing code.

	      if (realContext.Consumer === Context) {
	        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
	      } else if (realContext.Provider === Context) {
	        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
	      }
	    }
	  }

	  return dispatcher.useContext(Context);
	}
	function useState(initialState) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useState(initialState);
	}
	function useReducer(reducer, initialArg, init) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useReducer(reducer, initialArg, init);
	}
	function useRef(initialValue) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useRef(initialValue);
	}
	function useEffect(create, deps) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useEffect(create, deps);
	}
	function useInsertionEffect(create, deps) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useInsertionEffect(create, deps);
	}
	function useLayoutEffect(create, deps) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useLayoutEffect(create, deps);
	}
	function useCallback(callback, deps) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useCallback(callback, deps);
	}
	function useMemo(create, deps) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useMemo(create, deps);
	}
	function useImperativeHandle(ref, create, deps) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useImperativeHandle(ref, create, deps);
	}
	function useDebugValue(value, formatterFn) {
	  {
	    var dispatcher = resolveDispatcher();
	    return dispatcher.useDebugValue(value, formatterFn);
	  }
	}
	function useTransition() {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useTransition();
	}
	function useDeferredValue(value) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useDeferredValue(value);
	}
	function useId() {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useId();
	}
	function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
	  var dispatcher = resolveDispatcher();
	  return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	}

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher$1.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher$1.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      setExtraStackFrame(stack);
	    } else {
	      setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = getComponentNameFromType(ReactCurrentOwner.current.type);

	    if (name) {
	      return '\n\nCheck the render method of `' + name + '`.';
	    }
	  }

	  return '';
	}

	function getSourceInfoErrorAddendum(source) {
	  if (source !== undefined) {
	    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
	    var lineNumber = source.lineNumber;
	    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
	  }

	  return '';
	}

	function getSourceInfoErrorAddendumForProps(elementProps) {
	  if (elementProps !== null && elementProps !== undefined) {
	    return getSourceInfoErrorAddendum(elementProps.__source);
	  }

	  return '';
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();

	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	    if (parentName) {
	      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	    }
	  }

	  return info;
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }

	  element._store.validated = true;
	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	    return;
	  }

	  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.

	  var childOwner = '';

	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	  }

	  {
	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }

	  if (isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];

	      if (isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);

	    if (typeof iteratorFn === 'function') {
	      // Entry iterators used to provide implicit keys,
	      // but now we print a separate warning for them later.
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;

	        while (!(step = iterator.next()).done) {
	          if (isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}
	function createElementWithValidation(type, props, children) {
	  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	  // succeed and there will likely be errors in render.

	  if (!validType) {
	    var info = '';

	    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	    }

	    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

	    if (sourceInfo) {
	      info += sourceInfo;
	    } else {
	      info += getDeclarationErrorAddendum();
	    }

	    var typeString;

	    if (type === null) {
	      typeString = 'null';
	    } else if (isArray(type)) {
	      typeString = 'array';
	    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	      typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	      info = ' Did you accidentally export a JSX literal instead of a component?';
	    } else {
	      typeString = typeof type;
	    }

	    {
	      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }
	  }

	  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
	  // TODO: Drop this when these are no longer allowed as the type argument.

	  if (element == null) {
	    return element;
	  } // Skip key warning if the type isn't valid since our key validation logic
	  // doesn't expect a non-string/function type and can throw confusing errors.
	  // We don't want exception behavior to differ between dev and prod.
	  // (Rendering will throw with a helpful message and as soon as the type is
	  // fixed, the key warnings will appear.)


	  if (validType) {
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], type);
	    }
	  }

	  if (type === REACT_FRAGMENT_TYPE) {
	    validateFragmentProps(element);
	  } else {
	    validatePropTypes(element);
	  }

	  return element;
	}
	var didWarnAboutDeprecatedCreateFactory = false;
	function createFactoryWithValidation(type) {
	  var validatedFactory = createElementWithValidation.bind(null, type);
	  validatedFactory.type = type;

	  {
	    if (!didWarnAboutDeprecatedCreateFactory) {
	      didWarnAboutDeprecatedCreateFactory = true;

	      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
	    } // Legacy hook: remove it


	    Object.defineProperty(validatedFactory, 'type', {
	      enumerable: false,
	      get: function () {
	        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

	        Object.defineProperty(this, 'type', {
	          value: type
	        });
	        return type;
	      }
	    });
	  }

	  return validatedFactory;
	}
	function cloneElementWithValidation(element, props, children) {
	  var newElement = cloneElement.apply(this, arguments);

	  for (var i = 2; i < arguments.length; i++) {
	    validateChildKeys(arguments[i], newElement.type);
	  }

	  validatePropTypes(newElement);
	  return newElement;
	}

	function startTransition(scope, options) {
	  var prevTransition = ReactCurrentBatchConfig.transition;
	  ReactCurrentBatchConfig.transition = {};
	  var currentTransition = ReactCurrentBatchConfig.transition;

	  {
	    ReactCurrentBatchConfig.transition._updatedFibers = new Set();
	  }

	  try {
	    scope();
	  } finally {
	    ReactCurrentBatchConfig.transition = prevTransition;

	    {
	      if (prevTransition === null && currentTransition._updatedFibers) {
	        var updatedFibersCount = currentTransition._updatedFibers.size;

	        if (updatedFibersCount > 10) {
	          warn('Detected a large number of updates inside startTransition. ' + 'If this is due to a subscription please re-write it to use React provided hooks. ' + 'Otherwise concurrent mode guarantees are off the table.');
	        }

	        currentTransition._updatedFibers.clear();
	      }
	    }
	  }
	}

	var didWarnAboutMessageChannel = false;
	var enqueueTaskImpl = null;
	function enqueueTask(task) {
	  if (enqueueTaskImpl === null) {
	    try {
	      // read require off the module object to get around the bundlers.
	      // we don't want them to detect a require and bundle a Node polyfill.
	      var requireString = ('require' + Math.random()).slice(0, 7);
	      var nodeRequire = module && module[requireString]; // assuming we're in node, let's try to get node's
	      // version of setImmediate, bypassing fake timers if any.

	      enqueueTaskImpl = nodeRequire.call(module, 'timers').setImmediate;
	    } catch (_err) {
	      // we're in a browser
	      // we can't use regular timers because they may still be faked
	      // so we try MessageChannel+postMessage instead
	      enqueueTaskImpl = function (callback) {
	        {
	          if (didWarnAboutMessageChannel === false) {
	            didWarnAboutMessageChannel = true;

	            if (typeof MessageChannel === 'undefined') {
	              error('This browser does not have a MessageChannel implementation, ' + 'so enqueuing tasks via await act(async () => ...) will fail. ' + 'Please file an issue at https://github.com/facebook/react/issues ' + 'if you encounter this warning.');
	            }
	          }
	        }

	        var channel = new MessageChannel();
	        channel.port1.onmessage = callback;
	        channel.port2.postMessage(undefined);
	      };
	    }
	  }

	  return enqueueTaskImpl(task);
	}

	var actScopeDepth = 0;
	var didWarnNoAwaitAct = false;
	function act(callback) {
	  {
	    // `act` calls can be nested, so we track the depth. This represents the
	    // number of `act` scopes on the stack.
	    var prevActScopeDepth = actScopeDepth;
	    actScopeDepth++;

	    if (ReactCurrentActQueue.current === null) {
	      // This is the outermost `act` scope. Initialize the queue. The reconciler
	      // will detect the queue and use it instead of Scheduler.
	      ReactCurrentActQueue.current = [];
	    }

	    var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
	    var result;

	    try {
	      // Used to reproduce behavior of `batchedUpdates` in legacy mode. Only
	      // set to `true` while the given callback is executed, not for updates
	      // triggered during an async event, because this is how the legacy
	      // implementation of `act` behaved.
	      ReactCurrentActQueue.isBatchingLegacy = true;
	      result = callback(); // Replicate behavior of original `act` implementation in legacy mode,
	      // which flushed updates immediately after the scope function exits, even
	      // if it's an async function.

	      if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
	        var queue = ReactCurrentActQueue.current;

	        if (queue !== null) {
	          ReactCurrentActQueue.didScheduleLegacyUpdate = false;
	          flushActQueue(queue);
	        }
	      }
	    } catch (error) {
	      popActScope(prevActScopeDepth);
	      throw error;
	    } finally {
	      ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
	    }

	    if (result !== null && typeof result === 'object' && typeof result.then === 'function') {
	      var thenableResult = result; // The callback is an async function (i.e. returned a promise). Wait
	      // for it to resolve before exiting the current scope.

	      var wasAwaited = false;
	      var thenable = {
	        then: function (resolve, reject) {
	          wasAwaited = true;
	          thenableResult.then(function (returnValue) {
	            popActScope(prevActScopeDepth);

	            if (actScopeDepth === 0) {
	              // We've exited the outermost act scope. Recursively flush the
	              // queue until there's no remaining work.
	              recursivelyFlushAsyncActWork(returnValue, resolve, reject);
	            } else {
	              resolve(returnValue);
	            }
	          }, function (error) {
	            // The callback threw an error.
	            popActScope(prevActScopeDepth);
	            reject(error);
	          });
	        }
	      };

	      {
	        if (!didWarnNoAwaitAct && typeof Promise !== 'undefined') {
	          // eslint-disable-next-line no-undef
	          Promise.resolve().then(function () {}).then(function () {
	            if (!wasAwaited) {
	              didWarnNoAwaitAct = true;

	              error('You called act(async () => ...) without await. ' + 'This could lead to unexpected testing behaviour, ' + 'interleaving multiple act calls and mixing their ' + 'scopes. ' + 'You should - await act(async () => ...);');
	            }
	          });
	        }
	      }

	      return thenable;
	    } else {
	      var returnValue = result; // The callback is not an async function. Exit the current scope
	      // immediately, without awaiting.

	      popActScope(prevActScopeDepth);

	      if (actScopeDepth === 0) {
	        // Exiting the outermost act scope. Flush the queue.
	        var _queue = ReactCurrentActQueue.current;

	        if (_queue !== null) {
	          flushActQueue(_queue);
	          ReactCurrentActQueue.current = null;
	        } // Return a thenable. If the user awaits it, we'll flush again in
	        // case additional work was scheduled by a microtask.


	        var _thenable = {
	          then: function (resolve, reject) {
	            // Confirm we haven't re-entered another `act` scope, in case
	            // the user does something weird like await the thenable
	            // multiple times.
	            if (ReactCurrentActQueue.current === null) {
	              // Recursively flush the queue until there's no remaining work.
	              ReactCurrentActQueue.current = [];
	              recursivelyFlushAsyncActWork(returnValue, resolve, reject);
	            } else {
	              resolve(returnValue);
	            }
	          }
	        };
	        return _thenable;
	      } else {
	        // Since we're inside a nested `act` scope, the returned thenable
	        // immediately resolves. The outer scope will flush the queue.
	        var _thenable2 = {
	          then: function (resolve, reject) {
	            resolve(returnValue);
	          }
	        };
	        return _thenable2;
	      }
	    }
	  }
	}

	function popActScope(prevActScopeDepth) {
	  {
	    if (prevActScopeDepth !== actScopeDepth - 1) {
	      error('You seem to have overlapping act() calls, this is not supported. ' + 'Be sure to await previous act() calls before making a new one. ');
	    }

	    actScopeDepth = prevActScopeDepth;
	  }
	}

	function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
	  {
	    var queue = ReactCurrentActQueue.current;

	    if (queue !== null) {
	      try {
	        flushActQueue(queue);
	        enqueueTask(function () {
	          if (queue.length === 0) {
	            // No additional work was scheduled. Finish.
	            ReactCurrentActQueue.current = null;
	            resolve(returnValue);
	          } else {
	            // Keep flushing work until there's none left.
	            recursivelyFlushAsyncActWork(returnValue, resolve, reject);
	          }
	        });
	      } catch (error) {
	        reject(error);
	      }
	    } else {
	      resolve(returnValue);
	    }
	  }
	}

	var isFlushing = false;

	function flushActQueue(queue) {
	  {
	    if (!isFlushing) {
	      // Prevent re-entrance.
	      isFlushing = true;
	      var i = 0;

	      try {
	        for (; i < queue.length; i++) {
	          var callback = queue[i];

	          do {
	            callback = callback(true);
	          } while (callback !== null);
	        }

	        queue.length = 0;
	      } catch (error) {
	        // If something throws, leave the remaining callbacks on the queue.
	        queue = queue.slice(i + 1);
	        throw error;
	      } finally {
	        isFlushing = false;
	      }
	    }
	  }
	}

	var createElement$1 =  createElementWithValidation ;
	var cloneElement$1 =  cloneElementWithValidation ;
	var createFactory =  createFactoryWithValidation ;
	var Children = {
	  map: mapChildren,
	  forEach: forEachChildren,
	  count: countChildren,
	  toArray: toArray,
	  only: onlyChild
	};

	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
	exports.cloneElement = cloneElement$1;
	exports.createContext = createContext;
	exports.createElement = createElement$1;
	exports.createFactory = createFactory;
	exports.createRef = createRef;
	exports.forwardRef = forwardRef;
	exports.isValidElement = isValidElement;
	exports.lazy = lazy;
	exports.memo = memo;
	exports.startTransition = startTransition;
	exports.unstable_act = act;
	exports.useCallback = useCallback;
	exports.useContext = useContext;
	exports.useDebugValue = useDebugValue;
	exports.useDeferredValue = useDeferredValue;
	exports.useEffect = useEffect;
	exports.useId = useId;
	exports.useImperativeHandle = useImperativeHandle;
	exports.useInsertionEffect = useInsertionEffect;
	exports.useLayoutEffect = useLayoutEffect;
	exports.useMemo = useMemo;
	exports.useReducer = useReducer;
	exports.useRef = useRef;
	exports.useState = useState;
	exports.useSyncExternalStore = useSyncExternalStore;
	exports.useTransition = useTransition;
	exports.version = ReactVersion;
	          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	if (
	  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
	  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
	    'function'
	) {
	  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
	}
	        
	  })();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(5)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var React = __webpack_require__(1);
	var factory = __webpack_require__(15);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(16);

	// -- Inlined from fbjs --

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function _invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	var warning = function(){};

	if (process.env.NODE_ENV !== 'production') {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	// /-- Inlined from fbjs --

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillMount`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillMount: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillReceiveProps`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Replacement for (deprecated) `componentWillUpdate`.
	     *
	     * @optional
	     */
	    UNSAFE_componentWillUpdate: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Similar to ReactClassInterface but for static methods.
	   */
	  var ReactClassStaticInterface = {
	    /**
	     * This method is invoked after a component is instantiated and when it
	     * receives new props. Return an object to update state in response to
	     * prop changes. Return null to indicate no change to state.
	     *
	     * If an object is returned, its keys will be merged into the existing state.
	     *
	     * @return {object || null}
	     * @optional
	     */
	    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (process.env.NODE_ENV !== 'production') {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (process.env.NODE_ENV !== 'production') {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (process.env.NODE_ENV !== 'production') {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }

	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isAlreadyDefined = name in Constructor;
	      if (isAlreadyDefined) {
	        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
	          ? ReactClassStaticInterface[name]
	          : null;

	        _invariant(
	          specPolicy === 'DEFINE_MANY_MERGED',
	          'ReactClass: You are attempting to define ' +
	            '`%s` on your component more than once. This conflict may be ' +
	            'due to a mixin.',
	          name
	        );

	        Constructor[name] = createMergedResultFunction(Constructor[name], property);

	        return;
	      }

	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (process.env.NODE_ENV !== 'production') {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (process.env.NODE_ENV !== 'production') {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.UNSAFE_componentWillRecieveProps,
	        '%s has a method called UNSAFE_componentWillRecieveProps(). ' +
	          'Did you mean UNSAFE_componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var ReactIs = __webpack_require__(18);

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(21)(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(25)();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	if (process.env.NODE_ENV === 'production') {
	  module.exports = __webpack_require__(19);
	} else {
	  module.exports = __webpack_require__(20);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	/** @license React v16.13.1
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
	exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
	exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
	exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.13.1
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';



	if (process.env.NODE_ENV !== "production") {
	  (function() {
	'use strict';

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	exports.isValidElementType = isValidElementType;
	exports.typeOf = typeOf;
	  })();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactIs = __webpack_require__(18);
	var assign = __webpack_require__(16);

	var ReactPropTypesSecret = __webpack_require__(22);
	var has = __webpack_require__(23);
	var checkPropTypes = __webpack_require__(24);

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bigint: createPrimitiveTypeChecker('bigint'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message, data) {
	    this.message = message;
	    this.data = data && typeof data === 'object' ? data: {};
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error(
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            printWarning(
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError(
	          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
	          {expectedType: expectedType}
	        );
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (arguments.length > 1) {
	          printWarning(
	            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
	            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
	          );
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning(
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
	        );
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var expectedTypes = [];
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
	        if (checkerResult == null) {
	          return null;
	        }
	        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
	          expectedTypes.push(checkerResult.data.expectedType);
	        }
	      }
	      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function invalidValidatorError(componentName, location, propFullName, key, type) {
	    return new PropTypeError(
	      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
	      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
	    );
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (has(shapeTypes, key) && typeof checker !== 'function') {
	          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
	        }
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var printWarning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactPropTypesSecret = __webpack_require__(22);
	  var loggedTypeFailures = {};
	  var has = __webpack_require__(23);

	  printWarning = function(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) { /**/ }
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error(
	              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
	              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
	              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
	            );
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning(
	            (componentName || 'React class') + ': type specification of ' +
	            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
	            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
	            'You may have forgotten to pass an argument to the type checker ' +
	            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
	            'shape all require an argument).'
	          );
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning(
	            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
	          );
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function() {
	  if (process.env.NODE_ENV !== 'production') {
	    loggedTypeFailures = {};
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(22);

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bigint: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var l, s;
	if (process.env.NODE_ENV === 'production') {
	  l = __webpack_require__(27);
	  s = __webpack_require__(28);
	} else {
	  l = __webpack_require__(29);
	  s = __webpack_require__(30);
	}

	exports.version = l.version;
	exports.renderToString = l.renderToString;
	exports.renderToStaticMarkup = l.renderToStaticMarkup;
	exports.renderToNodeStream = l.renderToNodeStream;
	exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
	exports.renderToReadableStream = s.renderToReadableStream;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license React
	 * react-dom-server-legacy.browser.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	'use strict';var aa=__webpack_require__(1);function k(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ba=!1;function m(a,b){ba&&(ba=!1,"<"!==b[0]&&a.push("\x3c!-- --\x3e"));return"\x3c!-- --\x3e"===b?ba=!0:a.push(b)}
	var q=Object.prototype.hasOwnProperty,ca=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,da={},ea={};
	function fa(a){if(q.call(ea,a))return!0;if(q.call(da,a))return!1;if(ca.test(a))return ea[a]=!0;da[a]=!0;return!1}function r(a,b,c,d,f,e,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=f;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=e;this.removeEmptyString=g}var t={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){t[a]=new r(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];t[b]=new r(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){t[a]=new r(a,2,!1,a.toLowerCase(),null,!1,!1)});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){t[a]=new r(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){t[a]=new r(a,3,!1,a.toLowerCase(),null,!1,!1)});
	["checked","multiple","muted","selected"].forEach(function(a){t[a]=new r(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){t[a]=new r(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){t[a]=new r(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){t[a]=new r(a,5,!1,a.toLowerCase(),null,!1,!1)});var ha=/[\-:]([a-z])/g;function ia(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ha,
	ia);t[b]=new r(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ha,ia);t[b]=new r(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ha,ia);t[b]=new r(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){t[a]=new r(a,1,!1,a.toLowerCase(),null,!1,!1)});
	t.xlinkHref=new r("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){t[a]=new r(a,1,!1,a.toLowerCase(),null,!0,!0)});
	var u={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,
	fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ja=["Webkit","ms","Moz","O"];Object.keys(u).forEach(function(a){ja.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);u[b]=u[a]})});var ka=/["'&<>]/;
	function v(a){if("boolean"===typeof a||"number"===typeof a)return""+a;a=""+a;var b=ka.exec(a);if(b){var c="",d,f=0;for(d=b.index;d<a.length;d++){switch(a.charCodeAt(d)){case 34:b="&quot;";break;case 38:b="&amp;";break;case 39:b="&#x27;";break;case 60:b="&lt;";break;case 62:b="&gt;";break;default:continue}f!==d&&(c+=a.substring(f,d));f=d+1;c+=b}a=f!==d?c+a.substring(f,d):c}return a}var la=/([A-Z])/g,ma=/^ms-/,na=Array.isArray;function w(a,b){return{insertionMode:a,selectedValue:b}}
	function oa(a,b,c){switch(b){case "select":return w(1,null!=c.value?c.value:c.defaultValue);case "svg":return w(2,null);case "math":return w(3,null);case "foreignObject":return w(1,null);case "table":return w(4,null);case "thead":case "tbody":case "tfoot":return w(5,null);case "colgroup":return w(7,null);case "tr":return w(6,null)}return 4<=a.insertionMode||0===a.insertionMode?w(1,null):a}function pa(a,b){""!==b&&a.push(v(b),"\x3c!-- --\x3e")}var qa=new Map;
	function ra(a,b,c){if("object"!==typeof c)throw Error(k(62));b=!0;for(var d in c)if(q.call(c,d)){var f=c[d];if(null!=f&&"boolean"!==typeof f&&""!==f){if(0===d.indexOf("--")){var e=v(d);f=v((""+f).trim())}else{e=d;var g=qa.get(e);void 0!==g?e=g:(g=v(e.replace(la,"-$1").toLowerCase().replace(ma,"-ms-")),qa.set(e,g),e=g);f="number"===typeof f?0===f||q.call(u,d)?""+f:f+"px":v((""+f).trim())}b?(b=!1,a.push(' style="',e,":",f)):a.push(";",e,":",f)}}b||a.push('"')}
	function y(a,b,c,d){switch(c){case "style":ra(a,b,d);return;case "defaultValue":case "defaultChecked":case "innerHTML":case "suppressContentEditableWarning":case "suppressHydrationWarning":return}if(!(2<c.length)||"o"!==c[0]&&"O"!==c[0]||"n"!==c[1]&&"N"!==c[1])if(b=t.hasOwnProperty(c)?t[c]:null,null!==b){switch(typeof d){case "function":case "symbol":return;case "boolean":if(!b.acceptsBooleans)return}c=b.attributeName;switch(b.type){case 3:d&&a.push(" ",c,'=""');break;case 4:!0===d?a.push(" ",c,'=""'):
	!1!==d&&a.push(" ",c,'="',v(d),'"');break;case 5:isNaN(d)||a.push(" ",c,'="',v(d),'"');break;case 6:!isNaN(d)&&1<=d&&a.push(" ",c,'="',v(d),'"');break;default:b.sanitizeURL&&(d=""+d),a.push(" ",c,'="',v(d),'"')}}else if(fa(c)){switch(typeof d){case "function":case "symbol":return;case "boolean":if(b=c.toLowerCase().slice(0,5),"data-"!==b&&"aria-"!==b)return}a.push(" ",c,'="',v(d),'"')}}
	function A(a,b,c){if(null!=b){if(null!=c)throw Error(k(60));if("object"!==typeof b||!("__html"in b))throw Error(k(61));b=b.__html;null!==b&&void 0!==b&&a.push(""+b)}}function sa(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}
	function ta(a,b,c,d){a.push(B(c));var f=c=null,e;for(e in b)if(q.call(b,e)){var g=b[e];if(null!=g)switch(e){case "children":c=g;break;case "dangerouslySetInnerHTML":f=g;break;default:y(a,d,e,g)}}a.push(">");A(a,f,c);return"string"===typeof c?(a.push(v(c)),null):c}var ua=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,va=new Map;function B(a){var b=va.get(a);if(void 0===b){if(!ua.test(a))throw Error(k(65,a));b="<"+a;va.set(a,b)}return b}
	function wa(a,b,c,d,f){switch(b){case "select":a.push(B("select"));var e=null,g=null;for(n in c)if(q.call(c,n)){var h=c[n];if(null!=h)switch(n){case "children":e=h;break;case "dangerouslySetInnerHTML":g=h;break;case "defaultValue":case "value":break;default:y(a,d,n,h)}}a.push(">");A(a,g,e);return e;case "option":g=f.selectedValue;a.push(B("option"));var l=h=null,p=null;var n=null;for(e in c)if(q.call(c,e)&&(b=c[e],null!=b))switch(e){case "children":h=b;break;case "selected":p=b;break;case "dangerouslySetInnerHTML":n=
	b;break;case "value":l=b;default:y(a,d,e,b)}if(null!=g)if(c=null!==l?""+l:sa(h),na(g))for(d=0;d<g.length;d++){if(""+g[d]===c){a.push(' selected=""');break}}else""+g===c&&a.push(' selected=""');else p&&a.push(' selected=""');a.push(">");A(a,n,h);return h;case "textarea":a.push(B("textarea"));n=g=e=null;for(h in c)if(q.call(c,h)&&(l=c[h],null!=l))switch(h){case "children":n=l;break;case "value":e=l;break;case "defaultValue":g=l;break;case "dangerouslySetInnerHTML":throw Error(k(91));default:y(a,d,h,
	l)}null===e&&null!==g&&(e=g);a.push(">");if(null!=n){if(null!=e)throw Error(k(92));if(na(n)&&1<n.length)throw Error(k(93));e=""+n}"string"===typeof e&&"\n"===e[0]&&a.push("\n");null!==e&&a.push(v(""+e));return null;case "input":a.push(B("input"));l=n=h=e=null;for(g in c)if(q.call(c,g)&&(p=c[g],null!=p))switch(g){case "children":case "dangerouslySetInnerHTML":throw Error(k(399,"input"));case "defaultChecked":l=p;break;case "defaultValue":h=p;break;case "checked":n=p;break;case "value":e=p;break;default:y(a,
	d,g,p)}null!==n?y(a,d,"checked",n):null!==l&&y(a,d,"checked",l);null!==e?y(a,d,"value",e):null!==h&&y(a,d,"value",h);a.push("/>");return null;case "menuitem":a.push(B("menuitem"));for(var z in c)if(q.call(c,z)&&(e=c[z],null!=e))switch(z){case "children":case "dangerouslySetInnerHTML":throw Error(k(400));default:y(a,d,z,e)}a.push(">");return null;case "listing":case "pre":a.push(B(b));g=e=null;for(l in c)if(q.call(c,l)&&(h=c[l],null!=h))switch(l){case "children":e=h;break;case "dangerouslySetInnerHTML":g=
	h;break;default:y(a,d,l,h)}a.push(">");if(null!=g){if(null!=e)throw Error(k(60));if("object"!==typeof g||!("__html"in g))throw Error(k(61));c=g.__html;null!==c&&void 0!==c&&("string"===typeof c&&0<c.length&&"\n"===c[0]?a.push("\n",c):a.push(""+c))}"string"===typeof e&&"\n"===e[0]&&a.push("\n");return e;case "area":case "base":case "br":case "col":case "embed":case "hr":case "img":case "keygen":case "link":case "meta":case "param":case "source":case "track":case "wbr":a.push(B(b));for(var C in c)if(q.call(c,
	C)&&(e=c[C],null!=e))switch(C){case "children":case "dangerouslySetInnerHTML":throw Error(k(399,b));default:y(a,d,C,e)}a.push("/>");return null;case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return ta(a,c,b,d);case "html":return 0===f.insertionMode&&a.push("<!DOCTYPE html>"),ta(a,c,b,d);default:if(-1===b.indexOf("-")&&"string"!==typeof c.is)return ta(a,c,b,d);a.push(B(b));g=e=
	null;for(p in c)if(q.call(c,p)&&(h=c[p],null!=h))switch(p){case "children":e=h;break;case "dangerouslySetInnerHTML":g=h;break;case "style":ra(a,d,h);break;case "suppressContentEditableWarning":case "suppressHydrationWarning":break;default:fa(p)&&"function"!==typeof h&&"symbol"!==typeof h&&a.push(" ",p,'="',v(h),'"')}a.push(">");A(a,g,e);return e}}function xa(a,b,c){m(a,'\x3c!--$?--\x3e<template id="');if(null===c)throw Error(k(395));m(a,c);return m(a,'"></template>')}
	function ya(a,b,c,d){switch(c.insertionMode){case 0:case 1:return m(a,'<div hidden id="'),m(a,b.segmentPrefix),b=d.toString(16),m(a,b),m(a,'">');case 2:return m(a,'<svg aria-hidden="true" style="display:none" id="'),m(a,b.segmentPrefix),b=d.toString(16),m(a,b),m(a,'">');case 3:return m(a,'<math aria-hidden="true" style="display:none" id="'),m(a,b.segmentPrefix),b=d.toString(16),m(a,b),m(a,'">');case 4:return m(a,'<table hidden id="'),m(a,b.segmentPrefix),b=d.toString(16),m(a,b),m(a,'">');case 5:return m(a,
	'<table hidden><tbody id="'),m(a,b.segmentPrefix),b=d.toString(16),m(a,b),m(a,'">');case 6:return m(a,'<table hidden><tr id="'),m(a,b.segmentPrefix),b=d.toString(16),m(a,b),m(a,'">');case 7:return m(a,'<table hidden><colgroup id="'),m(a,b.segmentPrefix),b=d.toString(16),m(a,b),m(a,'">');default:throw Error(k(397));}}
	function za(a,b){switch(b.insertionMode){case 0:case 1:return m(a,"</div>");case 2:return m(a,"</svg>");case 3:return m(a,"</math>");case 4:return m(a,"</table>");case 5:return m(a,"</tbody></table>");case 6:return m(a,"</tr></table>");case 7:return m(a,"</colgroup></table>");default:throw Error(k(397));}}
	function Aa(a,b){b=void 0===b?"":b;return{bootstrapChunks:[],startInlineScript:"<script>",placeholderPrefix:b+"P:",segmentPrefix:b+"S:",boundaryPrefix:b+"B:",idPrefix:b,nextSuspenseID:0,sentCompleteSegmentFunction:!1,sentCompleteBoundaryFunction:!1,sentClientRenderFunction:!1,generateStaticMarkup:a}}
	var D=Object.assign,Ba=Symbol.for("react.element"),Ca=Symbol.for("react.portal"),Da=Symbol.for("react.fragment"),Ea=Symbol.for("react.strict_mode"),Fa=Symbol.for("react.profiler"),Ga=Symbol.for("react.provider"),Ha=Symbol.for("react.context"),Ia=Symbol.for("react.forward_ref"),Ja=Symbol.for("react.suspense"),Ka=Symbol.for("react.suspense_list"),La=Symbol.for("react.memo"),Ma=Symbol.for("react.lazy"),Na=Symbol.for("react.scope"),Oa=Symbol.for("react.debug_trace_mode"),Pa=Symbol.for("react.legacy_hidden"),
	Qa=Symbol.for("react.default_value"),Ra=Symbol.iterator;
	function Sa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Da:return"Fragment";case Ca:return"Portal";case Fa:return"Profiler";case Ea:return"StrictMode";case Ja:return"Suspense";case Ka:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ha:return(a.displayName||"Context")+".Consumer";case Ga:return(a._context.displayName||"Context")+".Provider";case Ia:var b=a.render;a=a.displayName;a||(a=b.displayName||
	b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case La:return b=a.displayName||null,null!==b?b:Sa(a.type)||"Memo";case Ma:b=a._payload;a=a._init;try{return Sa(a(b))}catch(c){}}return null}var Ta={};function Ua(a,b){a=a.contextTypes;if(!a)return Ta;var c={},d;for(d in a)c[d]=b[d];return c}var E=null;
	function F(a,b){if(a!==b){a.context._currentValue2=a.parentValue;a=a.parent;var c=b.parent;if(null===a){if(null!==c)throw Error(k(401));}else{if(null===c)throw Error(k(401));F(a,c)}b.context._currentValue2=b.value}}function Va(a){a.context._currentValue2=a.parentValue;a=a.parent;null!==a&&Va(a)}function Wa(a){var b=a.parent;null!==b&&Wa(b);a.context._currentValue2=a.value}
	function Xa(a,b){a.context._currentValue2=a.parentValue;a=a.parent;if(null===a)throw Error(k(402));a.depth===b.depth?F(a,b):Xa(a,b)}function Ya(a,b){var c=b.parent;if(null===c)throw Error(k(402));a.depth===c.depth?F(a,c):Ya(a,c);b.context._currentValue2=b.value}function G(a){var b=E;b!==a&&(null===b?Wa(a):null===a?Va(b):b.depth===a.depth?F(b,a):b.depth>a.depth?Xa(b,a):Ya(b,a),E=a)}
	var Za={isMounted:function(){return!1},enqueueSetState:function(a,b){a=a._reactInternals;null!==a.queue&&a.queue.push(b)},enqueueReplaceState:function(a,b){a=a._reactInternals;a.replace=!0;a.queue=[b]},enqueueForceUpdate:function(){}};
	function $a(a,b,c,d){var f=void 0!==a.state?a.state:null;a.updater=Za;a.props=c;a.state=f;var e={queue:[],replace:!1};a._reactInternals=e;var g=b.contextType;a.context="object"===typeof g&&null!==g?g._currentValue2:d;g=b.getDerivedStateFromProps;"function"===typeof g&&(g=g(c,f),f=null===g||void 0===g?f:D({},f,g),a.state=f);if("function"!==typeof b.getDerivedStateFromProps&&"function"!==typeof a.getSnapshotBeforeUpdate&&("function"===typeof a.UNSAFE_componentWillMount||"function"===typeof a.componentWillMount))if(b=
	a.state,"function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),b!==a.state&&Za.enqueueReplaceState(a,a.state,null),null!==e.queue&&0<e.queue.length)if(b=e.queue,g=e.replace,e.queue=null,e.replace=!1,g&&1===b.length)a.state=b[0];else{e=g?b[0]:a.state;f=!0;for(g=g?1:0;g<b.length;g++){var h=b[g];h="function"===typeof h?h.call(a,e,c,d):h;null!=h&&(f?(f=!1,e=D({},e,h)):D(e,h))}a.state=e}else e.queue=null}
	var ab={id:1,overflow:""};function bb(a,b,c){var d=a.id;a=a.overflow;var f=32-H(d)-1;d&=~(1<<f);c+=1;var e=32-H(b)+f;if(30<e){var g=f-f%5;e=(d&(1<<g)-1).toString(32);d>>=g;f-=g;return{id:1<<32-H(b)+f|c<<f|d,overflow:e+a}}return{id:1<<e|c<<f|d,overflow:a}}var H=Math.clz32?Math.clz32:cb,db=Math.log,eb=Math.LN2;function cb(a){a>>>=0;return 0===a?32:31-(db(a)/eb|0)|0}function fb(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}
	var gb="function"===typeof Object.is?Object.is:fb,I=null,hb=null,J=null,K=null,L=!1,M=!1,N=0,O=null,P=0;function Q(){if(null===I)throw Error(k(321));return I}function ib(){if(0<P)throw Error(k(312));return{memoizedState:null,queue:null,next:null}}function jb(){null===K?null===J?(L=!1,J=K=ib()):(L=!0,K=J):null===K.next?(L=!1,K=K.next=ib()):(L=!0,K=K.next);return K}function kb(){hb=I=null;M=!1;J=null;P=0;K=O=null}function lb(a,b){return"function"===typeof b?b(a):b}
	function mb(a,b,c){I=Q();K=jb();if(L){var d=K.queue;b=d.dispatch;if(null!==O&&(c=O.get(d),void 0!==c)){O.delete(d);d=K.memoizedState;do d=a(d,c.action),c=c.next;while(null!==c);K.memoizedState=d;return[d,b]}return[K.memoizedState,b]}a=a===lb?"function"===typeof b?b():b:void 0!==c?c(b):b;K.memoizedState=a;a=K.queue={last:null,dispatch:null};a=a.dispatch=nb.bind(null,I,a);return[K.memoizedState,a]}
	function ob(a,b){I=Q();K=jb();b=void 0===b?null:b;if(null!==K){var c=K.memoizedState;if(null!==c&&null!==b){var d=c[1];a:if(null===d)d=!1;else{for(var f=0;f<d.length&&f<b.length;f++)if(!gb(b[f],d[f])){d=!1;break a}d=!0}if(d)return c[0]}}a=a();K.memoizedState=[a,b];return a}function nb(a,b,c){if(25<=P)throw Error(k(301));if(a===I)if(M=!0,a={action:c,next:null},null===O&&(O=new Map),c=O.get(b),void 0===c)O.set(b,a);else{for(b=c;null!==b.next;)b=b.next;b.next=a}}function pb(){throw Error(k(394));}
	function R(){}
	var qb={readContext:function(a){return a._currentValue2},useContext:function(a){Q();return a._currentValue2},useMemo:ob,useReducer:mb,useRef:function(a){I=Q();K=jb();var b=K.memoizedState;return null===b?(a={current:a},K.memoizedState=a):b},useState:function(a){return mb(lb,a)},useInsertionEffect:R,useLayoutEffect:function(){},useCallback:function(a,b){return ob(function(){return a},b)},useImperativeHandle:R,useEffect:R,useDebugValue:R,useDeferredValue:function(a){Q();return a},useTransition:function(){Q();return[!1,
	pb]},useId:function(){var a=hb.treeContext;var b=a.overflow;a=a.id;a=(a&~(1<<32-H(a)-1)).toString(32)+b;var c=S;if(null===c)throw Error(k(404));b=N++;a=":"+c.idPrefix+"R"+a;0<b&&(a+="H"+b.toString(32));return a+":"},useMutableSource:function(a,b){Q();return b(a._source)},useSyncExternalStore:function(a,b,c){if(void 0===c)throw Error(k(407));return c()}},S=null,rb=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;function sb(a){console.error(a)}function T(){}
	function tb(a,b,c,d,f,e,g,h,l){var p=[],n=new Set;b={destination:null,responseState:b,progressiveChunkSize:void 0===d?12800:d,status:0,fatalError:null,nextSegmentId:0,allPendingTasks:0,pendingRootTasks:0,completedRootSegment:null,abortableTasks:n,pingedTasks:p,clientRenderedBoundaries:[],completedBoundaries:[],partialBoundaries:[],onError:void 0===f?sb:f,onAllReady:void 0===e?T:e,onShellReady:void 0===g?T:g,onShellError:void 0===h?T:h,onFatalError:void 0===l?T:l};c=U(b,0,null,c);c.parentFlushed=!0;
	a=ub(b,a,null,c,n,Ta,null,ab);p.push(a);return b}function ub(a,b,c,d,f,e,g,h){a.allPendingTasks++;null===c?a.pendingRootTasks++:c.pendingTasks++;var l={node:b,ping:function(){var b=a.pingedTasks;b.push(l);1===b.length&&vb(a)},blockedBoundary:c,blockedSegment:d,abortSet:f,legacyContext:e,context:g,treeContext:h};f.add(l);return l}function U(a,b,c,d){return{status:0,id:-1,index:b,parentFlushed:!1,chunks:[],children:[],formatContext:d,boundary:c}}function V(a,b){a=a.onError;a(b)}
	function W(a,b){var c=a.onShellError;c(b);c=a.onFatalError;c(b);null!==a.destination?(a.status=2,a.destination.destroy(b)):(a.status=1,a.fatalError=b)}function wb(a,b,c,d,f){I={};hb=b;N=0;for(a=c(d,f);M;)M=!1,N=0,P+=1,K=null,a=c(d,f);kb();return a}
	function xb(a,b,c,d){var f=c.render(),e=d.childContextTypes;if(null!==e&&void 0!==e){var g=b.legacyContext;if("function"!==typeof c.getChildContext)d=g;else{c=c.getChildContext();for(var h in c)if(!(h in e))throw Error(k(108,Sa(d)||"Unknown",h));d=D({},g,c)}b.legacyContext=d;X(a,b,f);b.legacyContext=g}else X(a,b,f)}function yb(a,b){if(a&&a.defaultProps){b=D({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}
	function zb(a,b,c,d,f){if("function"===typeof c)if(c.prototype&&c.prototype.isReactComponent){f=Ua(c,b.legacyContext);var e=c.contextType;e=new c(d,"object"===typeof e&&null!==e?e._currentValue2:f);$a(e,c,d,f);xb(a,b,e,c)}else{e=Ua(c,b.legacyContext);f=wb(a,b,c,d,e);var g=0!==N;if("object"===typeof f&&null!==f&&"function"===typeof f.render&&void 0===f.$$typeof)$a(f,c,d,e),xb(a,b,f,c);else if(g){d=b.treeContext;b.treeContext=bb(d,1,0);try{X(a,b,f)}finally{b.treeContext=d}}else X(a,b,f)}else if("string"===
	typeof c)switch(f=b.blockedSegment,e=wa(f.chunks,c,d,a.responseState,f.formatContext),g=f.formatContext,f.formatContext=oa(g,c,d),Ab(a,b,e),f.formatContext=g,c){case "area":case "base":case "br":case "col":case "embed":case "hr":case "img":case "input":case "keygen":case "link":case "meta":case "param":case "source":case "track":case "wbr":break;default:f.chunks.push("</",c,">")}else{switch(c){case Pa:case Oa:case Ea:case Fa:case Da:X(a,b,d.children);return;case Ka:X(a,b,d.children);return;case Na:throw Error(k(343));
	case Ja:a:{c=b.blockedBoundary;f=b.blockedSegment;e=d.fallback;d=d.children;g=new Set;var h={id:null,rootSegmentID:-1,parentFlushed:!1,pendingTasks:0,forceClientRender:!1,completedSegments:[],byteSize:0,fallbackAbortableTasks:g},l=U(a,f.chunks.length,h,f.formatContext);f.children.push(l);var p=U(a,0,null,f.formatContext);p.parentFlushed=!0;b.blockedBoundary=h;b.blockedSegment=p;try{if(Ab(a,b,d),p.status=1,Y(h,p),0===h.pendingTasks)break a}catch(n){p.status=4,V(a,n),h.forceClientRender=!0}finally{b.blockedBoundary=
	c,b.blockedSegment=f}b=ub(a,e,c,l,g,b.legacyContext,b.context,b.treeContext);a.pingedTasks.push(b)}return}if("object"===typeof c&&null!==c)switch(c.$$typeof){case Ia:d=wb(a,b,c.render,d,f);if(0!==N){c=b.treeContext;b.treeContext=bb(c,1,0);try{X(a,b,d)}finally{b.treeContext=c}}else X(a,b,d);return;case La:c=c.type;d=yb(c,d);zb(a,b,c,d,f);return;case Ga:f=d.children;c=c._context;d=d.value;e=c._currentValue2;c._currentValue2=d;g=E;E=d={parent:g,depth:null===g?0:g.depth+1,context:c,parentValue:e,value:d};
	b.context=d;X(a,b,f);a=E;if(null===a)throw Error(k(403));d=a.parentValue;a.context._currentValue2=d===Qa?a.context._defaultValue:d;a=E=a.parent;b.context=a;return;case Ha:d=d.children;d=d(c._currentValue2);X(a,b,d);return;case Ma:f=c._init;c=f(c._payload);d=yb(c,d);zb(a,b,c,d,void 0);return}throw Error(k(130,null==c?c:typeof c,""));}}
	function X(a,b,c){b.node=c;if("object"===typeof c&&null!==c){switch(c.$$typeof){case Ba:zb(a,b,c.type,c.props,c.ref);return;case Ca:throw Error(k(257));case Ma:var d=c._init;c=d(c._payload);X(a,b,c);return}if(na(c)){Bb(a,b,c);return}null===c||"object"!==typeof c?d=null:(d=Ra&&c[Ra]||c["@@iterator"],d="function"===typeof d?d:null);if(d&&(d=d.call(c))){c=d.next();if(!c.done){var f=[];do f.push(c.value),c=d.next();while(!c.done);Bb(a,b,f)}return}a=Object.prototype.toString.call(c);throw Error(k(31,"[object Object]"===
	a?"object with keys {"+Object.keys(c).join(", ")+"}":a));}"string"===typeof c?(b=b.blockedSegment.chunks,a.responseState.generateStaticMarkup?b.push(v(c)):pa(b,c)):"number"===typeof c&&(b=b.blockedSegment.chunks,c=""+c,a.responseState.generateStaticMarkup?b.push(v(c)):pa(b,c))}function Bb(a,b,c){for(var d=c.length,f=0;f<d;f++){var e=b.treeContext;b.treeContext=bb(e,d,f);try{Ab(a,b,c[f])}finally{b.treeContext=e}}}
	function Ab(a,b,c){var d=b.blockedSegment.formatContext,f=b.legacyContext,e=b.context;try{return X(a,b,c)}catch(l){if(kb(),"object"===typeof l&&null!==l&&"function"===typeof l.then){c=l;var g=b.blockedSegment,h=U(a,g.chunks.length,null,g.formatContext);g.children.push(h);a=ub(a,b.node,b.blockedBoundary,h,b.abortSet,b.legacyContext,b.context,b.treeContext).ping;c.then(a,a);b.blockedSegment.formatContext=d;b.legacyContext=f;b.context=e;G(e)}else throw b.blockedSegment.formatContext=d,b.legacyContext=
	f,b.context=e,G(e),l;}}function Cb(a){var b=a.blockedBoundary;a=a.blockedSegment;a.status=3;Db(this,b,a)}
	function Eb(a){var b=a.blockedBoundary;a.blockedSegment.status=3;null===b?(this.allPendingTasks--,2!==this.status&&(this.status=2,null!==this.destination&&this.destination.push(null))):(b.pendingTasks--,b.forceClientRender||(b.forceClientRender=!0,b.parentFlushed&&this.clientRenderedBoundaries.push(b)),b.fallbackAbortableTasks.forEach(Eb,this),b.fallbackAbortableTasks.clear(),this.allPendingTasks--,0===this.allPendingTasks&&(a=this.onAllReady,a()))}
	function Y(a,b){if(0===b.chunks.length&&1===b.children.length&&null===b.children[0].boundary){var c=b.children[0];c.id=b.id;c.parentFlushed=!0;1===c.status&&Y(a,c)}else a.completedSegments.push(b)}
	function Db(a,b,c){if(null===b){if(c.parentFlushed){if(null!==a.completedRootSegment)throw Error(k(389));a.completedRootSegment=c}a.pendingRootTasks--;0===a.pendingRootTasks&&(a.onShellError=T,b=a.onShellReady,b())}else b.pendingTasks--,b.forceClientRender||(0===b.pendingTasks?(c.parentFlushed&&1===c.status&&Y(b,c),b.parentFlushed&&a.completedBoundaries.push(b),b.fallbackAbortableTasks.forEach(Cb,a),b.fallbackAbortableTasks.clear()):c.parentFlushed&&1===c.status&&(Y(b,c),1===b.completedSegments.length&&
	b.parentFlushed&&a.partialBoundaries.push(b)));a.allPendingTasks--;0===a.allPendingTasks&&(a=a.onAllReady,a())}
	function vb(a){if(2!==a.status){var b=E,c=rb.current;rb.current=qb;var d=S;S=a.responseState;try{var f=a.pingedTasks,e;for(e=0;e<f.length;e++){var g=f[e];var h=a,l=g.blockedSegment;if(0===l.status){G(g.context);try{X(h,g,g.node),g.abortSet.delete(g),l.status=1,Db(h,g.blockedBoundary,l)}catch(x){if(kb(),"object"===typeof x&&null!==x&&"function"===typeof x.then){var p=g.ping;x.then(p,p)}else{g.abortSet.delete(g);l.status=4;var n=g.blockedBoundary,z=x;V(h,z);null===n?W(h,z):(n.pendingTasks--,n.forceClientRender||
	(n.forceClientRender=!0,n.parentFlushed&&h.clientRenderedBoundaries.push(n)));h.allPendingTasks--;if(0===h.allPendingTasks){var C=h.onAllReady;C()}}}finally{}}}f.splice(0,e);null!==a.destination&&Fb(a,a.destination)}catch(x){V(a,x),W(a,x)}finally{S=d,rb.current=c,c===qb&&G(b)}}}
	function Z(a,b,c){c.parentFlushed=!0;switch(c.status){case 0:var d=c.id=a.nextSegmentId++;a=a.responseState;m(b,'<template id="');m(b,a.placeholderPrefix);a=d.toString(16);m(b,a);return m(b,'"></template>');case 1:c.status=2;var f=!0;d=c.chunks;var e=0;c=c.children;for(var g=0;g<c.length;g++){for(f=c[g];e<f.index;e++)m(b,d[e]);f=Gb(a,b,f)}for(;e<d.length-1;e++)m(b,d[e]);e<d.length&&(f=m(b,d[e]));return f;default:throw Error(k(390));}}
	function Gb(a,b,c){var d=c.boundary;if(null===d)return Z(a,b,c);d.parentFlushed=!0;if(d.forceClientRender)return a.responseState.generateStaticMarkup||m(b,"\x3c!--$!--\x3e"),Z(a,b,c),a=a.responseState.generateStaticMarkup?!0:m(b,"\x3c!--/$--\x3e"),a;if(0<d.pendingTasks){d.rootSegmentID=a.nextSegmentId++;0<d.completedSegments.length&&a.partialBoundaries.push(d);var f=a.responseState;var e=f.nextSuspenseID++;f=f.boundaryPrefix+e.toString(16);d=d.id=f;xa(b,a.responseState,d);Z(a,b,c);return m(b,"\x3c!--/$--\x3e")}if(d.byteSize>
	a.progressiveChunkSize)return d.rootSegmentID=a.nextSegmentId++,a.completedBoundaries.push(d),xa(b,a.responseState,d.id),Z(a,b,c),m(b,"\x3c!--/$--\x3e");a.responseState.generateStaticMarkup||m(b,"\x3c!--$--\x3e");c=d.completedSegments;if(1!==c.length)throw Error(k(391));Gb(a,b,c[0]);a=a.responseState.generateStaticMarkup?!0:m(b,"\x3c!--/$--\x3e");return a}function Hb(a,b,c){ya(b,a.responseState,c.formatContext,c.id);Gb(a,b,c);return za(b,c.formatContext)}
	function Ib(a,b,c){for(var d=c.completedSegments,f=0;f<d.length;f++)Jb(a,b,c,d[f]);d.length=0;a=a.responseState;d=c.id;c=c.rootSegmentID;m(b,a.startInlineScript);a.sentCompleteBoundaryFunction?m(b,'$RC("'):(a.sentCompleteBoundaryFunction=!0,m(b,'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
	if(null===d)throw Error(k(395));c=c.toString(16);m(b,d);m(b,'","');m(b,a.segmentPrefix);m(b,c);return m(b,'")\x3c/script>')}
	function Jb(a,b,c,d){if(2===d.status)return!0;var f=d.id;if(-1===f){if(-1===(d.id=c.rootSegmentID))throw Error(k(392));return Hb(a,b,d)}Hb(a,b,d);a=a.responseState;m(b,a.startInlineScript);a.sentCompleteSegmentFunction?m(b,'$RS("'):(a.sentCompleteSegmentFunction=!0,m(b,'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'));m(b,a.segmentPrefix);f=f.toString(16);
	m(b,f);m(b,'","');m(b,a.placeholderPrefix);m(b,f);return m(b,'")\x3c/script>')}
	function Fb(a,b){try{var c=a.completedRootSegment;if(null!==c&&0===a.pendingRootTasks){Gb(a,b,c);a.completedRootSegment=null;var d=a.responseState.bootstrapChunks;for(c=0;c<d.length-1;c++)m(b,d[c]);c<d.length&&m(b,d[c])}var f=a.clientRenderedBoundaries,e;for(e=0;e<f.length;e++){d=b;var g=a.responseState,h=f[e].id;m(d,g.startInlineScript);g.sentClientRenderFunction?m(d,'$RX("'):(g.sentClientRenderFunction=!0,m(d,'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()};$RX("'));if(null===
	h)throw Error(k(395));m(d,h);if(!m(d,'")\x3c/script>')){a.destination=null;e++;f.splice(0,e);return}}f.splice(0,e);var l=a.completedBoundaries;for(e=0;e<l.length;e++)if(!Ib(a,b,l[e])){a.destination=null;e++;l.splice(0,e);return}l.splice(0,e);var p=a.partialBoundaries;for(e=0;e<p.length;e++){var n=p[e];a:{f=a;g=b;var z=n.completedSegments;for(h=0;h<z.length;h++)if(!Jb(f,g,n,z[h])){h++;z.splice(0,h);var C=!1;break a}z.splice(0,h);C=!0}if(!C){a.destination=null;e++;p.splice(0,e);return}}p.splice(0,e);
	var x=a.completedBoundaries;for(e=0;e<x.length;e++)if(!Ib(a,b,x[e])){a.destination=null;e++;x.splice(0,e);return}x.splice(0,e)}finally{0===a.allPendingTasks&&0===a.pingedTasks.length&&0===a.clientRenderedBoundaries.length&&0===a.completedBoundaries.length&&b.push(null)}}function Kb(a){try{var b=a.abortableTasks;b.forEach(Eb,a);b.clear();null!==a.destination&&Fb(a,a.destination)}catch(c){V(a,c),W(a,c)}}function Lb(){}
	function Mb(a,b,c){var d=!1,f=null,e="",g={push:function(a){null!==a&&(e+=a);return!0},destroy:function(a){d=!0;f=a}},h=!1;a=tb(a,Aa(c,b?b.identifierPrefix:void 0),{insertionMode:1,selectedValue:null},Infinity,Lb,void 0,function(){h=!0},void 0,void 0);vb(a);Kb(a);if(1===a.status)a.status=2,g.destroy(a.fatalError);else if(2!==a.status&&null===a.destination){a.destination=g;try{Fb(a,g)}catch(l){V(a,l),W(a,l)}}if(d)throw f;if(!h)throw Error(k(426));return e}
	exports.renderToNodeStream=function(){throw Error(k(207));};exports.renderToStaticMarkup=function(a,b){return Mb(a,b,!0)};exports.renderToStaticNodeStream=function(){throw Error(k(208));};exports.renderToString=function(a,b){return Mb(a,b,!1)};exports.version="18.0.0-fc46dba67-20220329";


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license React
	 * react-dom-server.browser.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	'use strict';var aa=__webpack_require__(1);function k(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var l=null,n=0;
	function p(a,b){if(0!==b.length)if(512<b.length)0<n&&(a.enqueue(new Uint8Array(l.buffer,0,n)),l=new Uint8Array(512),n=0),a.enqueue(b);else{var c=l.length-n;c<b.length&&(0===c?a.enqueue(l):(l.set(b.subarray(0,c),n),a.enqueue(l),b=b.subarray(c)),l=new Uint8Array(512),n=0);l.set(b,n);n+=b.length}}function t(a,b){p(a,b);return!0}function ba(a){l&&0<n&&(a.enqueue(new Uint8Array(l.buffer,0,n)),l=null,n=0)}var ca=new TextEncoder;function u(a){return ca.encode(a)}function v(a){return ca.encode(a)}
	function da(a,b){"function"===typeof a.error?a.error(b):a.close()}var w=Object.prototype.hasOwnProperty,ea=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,fa={},ha={};
	function ia(a){if(w.call(ha,a))return!0;if(w.call(fa,a))return!1;if(ea.test(a))return ha[a]=!0;fa[a]=!0;return!1}function x(a,b,c,d,f,e,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=f;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=e;this.removeEmptyString=g}var y={};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){y[a]=new x(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];y[b]=new x(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){y[a]=new x(a,2,!1,a.toLowerCase(),null,!1,!1)});
	["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){y[a]=new x(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){y[a]=new x(a,3,!1,a.toLowerCase(),null,!1,!1)});
	["checked","multiple","muted","selected"].forEach(function(a){y[a]=new x(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){y[a]=new x(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){y[a]=new x(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){y[a]=new x(a,5,!1,a.toLowerCase(),null,!1,!1)});var ja=/[\-:]([a-z])/g;function ka(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ja,
	ka);y[b]=new x(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ja,ka);y[b]=new x(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ja,ka);y[b]=new x(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){y[a]=new x(a,1,!1,a.toLowerCase(),null,!1,!1)});
	y.xlinkHref=new x("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){y[a]=new x(a,1,!1,a.toLowerCase(),null,!0,!0)});
	var z={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,
	fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},la=["Webkit","ms","Moz","O"];Object.keys(z).forEach(function(a){la.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);z[b]=z[a]})});var ma=/["'&<>]/;
	function A(a){if("boolean"===typeof a||"number"===typeof a)return""+a;a=""+a;var b=ma.exec(a);if(b){var c="",d,f=0;for(d=b.index;d<a.length;d++){switch(a.charCodeAt(d)){case 34:b="&quot;";break;case 38:b="&amp;";break;case 39:b="&#x27;";break;case 60:b="&lt;";break;case 62:b="&gt;";break;default:continue}f!==d&&(c+=a.substring(f,d));f=d+1;c+=b}a=f!==d?c+a.substring(f,d):c}return a}
	var na=/([A-Z])/g,oa=/^ms-/,pa=Array.isArray,qa=v("<script>"),ra=v("\x3c/script>"),sa=v('<script src="'),ta=v('<script type="module" src="'),ua=v('" async="">\x3c/script>');
	function va(a,b,c,d,f){a=void 0===a?"":a;b=void 0===b?qa:v('<script nonce="'+A(b)+'">');var e=[];void 0!==c&&e.push(b,u(A(c)),ra);if(void 0!==d)for(c=0;c<d.length;c++)e.push(sa,u(A(d[c])),ua);if(void 0!==f)for(d=0;d<f.length;d++)e.push(ta,u(A(f[d])),ua);return{bootstrapChunks:e,startInlineScript:b,placeholderPrefix:v(a+"P:"),segmentPrefix:v(a+"S:"),boundaryPrefix:a+"B:",idPrefix:a,nextSuspenseID:0,sentCompleteSegmentFunction:!1,sentCompleteBoundaryFunction:!1,sentClientRenderFunction:!1}}
	function B(a,b){return{insertionMode:a,selectedValue:b}}function wa(a){return B("http://www.w3.org/2000/svg"===a?2:"http://www.w3.org/1998/Math/MathML"===a?3:0,null)}
	function xa(a,b,c){switch(b){case "select":return B(1,null!=c.value?c.value:c.defaultValue);case "svg":return B(2,null);case "math":return B(3,null);case "foreignObject":return B(1,null);case "table":return B(4,null);case "thead":case "tbody":case "tfoot":return B(5,null);case "colgroup":return B(7,null);case "tr":return B(6,null)}return 4<=a.insertionMode||0===a.insertionMode?B(1,null):a}var ya=v("\x3c!-- --\x3e"),za=new Map,Aa=v(' style="'),Ba=v(":"),Ca=v(";");
	function Da(a,b,c){if("object"!==typeof c)throw Error(k(62));b=!0;for(var d in c)if(w.call(c,d)){var f=c[d];if(null!=f&&"boolean"!==typeof f&&""!==f){if(0===d.indexOf("--")){var e=u(A(d));f=u(A((""+f).trim()))}else{e=d;var g=za.get(e);void 0!==g?e=g:(g=v(A(e.replace(na,"-$1").toLowerCase().replace(oa,"-ms-"))),za.set(e,g),e=g);f="number"===typeof f?0===f||w.call(z,d)?u(""+f):u(f+"px"):u(A((""+f).trim()))}b?(b=!1,a.push(Aa,e,Ba,f)):a.push(Ca,e,Ba,f)}}b||a.push(D)}
	var G=v(" "),H=v('="'),D=v('"'),Ea=v('=""');
	function I(a,b,c,d){switch(c){case "style":Da(a,b,d);return;case "defaultValue":case "defaultChecked":case "innerHTML":case "suppressContentEditableWarning":case "suppressHydrationWarning":return}if(!(2<c.length)||"o"!==c[0]&&"O"!==c[0]||"n"!==c[1]&&"N"!==c[1])if(b=y.hasOwnProperty(c)?y[c]:null,null!==b){switch(typeof d){case "function":case "symbol":return;case "boolean":if(!b.acceptsBooleans)return}c=u(b.attributeName);switch(b.type){case 3:d&&a.push(G,c,Ea);break;case 4:!0===d?a.push(G,c,Ea):!1!==
	d&&a.push(G,c,H,u(A(d)),D);break;case 5:isNaN(d)||a.push(G,c,H,u(A(d)),D);break;case 6:!isNaN(d)&&1<=d&&a.push(G,c,H,u(A(d)),D);break;default:b.sanitizeURL&&(d=""+d),a.push(G,c,H,u(A(d)),D)}}else if(ia(c)){switch(typeof d){case "function":case "symbol":return;case "boolean":if(b=c.toLowerCase().slice(0,5),"data-"!==b&&"aria-"!==b)return}a.push(G,u(c),H,u(A(d)),D)}}var J=v(">"),Fa=v("/>");
	function K(a,b,c){if(null!=b){if(null!=c)throw Error(k(60));if("object"!==typeof b||!("__html"in b))throw Error(k(61));b=b.__html;null!==b&&void 0!==b&&a.push(u(""+b))}}function Ga(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}var Ha=v(' selected=""');
	function Ia(a,b,c,d){a.push(L(c));var f=c=null,e;for(e in b)if(w.call(b,e)){var g=b[e];if(null!=g)switch(e){case "children":c=g;break;case "dangerouslySetInnerHTML":f=g;break;default:I(a,d,e,g)}}a.push(J);K(a,f,c);return"string"===typeof c?(a.push(u(A(c))),null):c}var Ja=v("\n"),Ka=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,La=new Map;function L(a){var b=La.get(a);if(void 0===b){if(!Ka.test(a))throw Error(k(65,a));b=v("<"+a);La.set(a,b)}return b}var Ma=v("<!DOCTYPE html>");
	function Na(a,b,c,d,f){switch(b){case "select":a.push(L("select"));var e=null,g=null;for(r in c)if(w.call(c,r)){var h=c[r];if(null!=h)switch(r){case "children":e=h;break;case "dangerouslySetInnerHTML":g=h;break;case "defaultValue":case "value":break;default:I(a,d,r,h)}}a.push(J);K(a,g,e);return e;case "option":g=f.selectedValue;a.push(L("option"));var m=h=null,q=null;var r=null;for(e in c)if(w.call(c,e)&&(b=c[e],null!=b))switch(e){case "children":h=b;break;case "selected":q=b;break;case "dangerouslySetInnerHTML":r=
	b;break;case "value":m=b;default:I(a,d,e,b)}if(null!=g)if(c=null!==m?""+m:Ga(h),pa(g))for(d=0;d<g.length;d++){if(""+g[d]===c){a.push(Ha);break}}else""+g===c&&a.push(Ha);else q&&a.push(Ha);a.push(J);K(a,r,h);return h;case "textarea":a.push(L("textarea"));r=g=e=null;for(h in c)if(w.call(c,h)&&(m=c[h],null!=m))switch(h){case "children":r=m;break;case "value":e=m;break;case "defaultValue":g=m;break;case "dangerouslySetInnerHTML":throw Error(k(91));default:I(a,d,h,m)}null===e&&null!==g&&(e=g);a.push(J);
	if(null!=r){if(null!=e)throw Error(k(92));if(pa(r)&&1<r.length)throw Error(k(93));e=""+r}"string"===typeof e&&"\n"===e[0]&&a.push(Ja);null!==e&&a.push(u(A(""+e)));return null;case "input":a.push(L("input"));m=r=h=e=null;for(g in c)if(w.call(c,g)&&(q=c[g],null!=q))switch(g){case "children":case "dangerouslySetInnerHTML":throw Error(k(399,"input"));case "defaultChecked":m=q;break;case "defaultValue":h=q;break;case "checked":r=q;break;case "value":e=q;break;default:I(a,d,g,q)}null!==r?I(a,d,"checked",
	r):null!==m&&I(a,d,"checked",m);null!==e?I(a,d,"value",e):null!==h&&I(a,d,"value",h);a.push(Fa);return null;case "menuitem":a.push(L("menuitem"));for(var E in c)if(w.call(c,E)&&(e=c[E],null!=e))switch(E){case "children":case "dangerouslySetInnerHTML":throw Error(k(400));default:I(a,d,E,e)}a.push(J);return null;case "listing":case "pre":a.push(L(b));g=e=null;for(m in c)if(w.call(c,m)&&(h=c[m],null!=h))switch(m){case "children":e=h;break;case "dangerouslySetInnerHTML":g=h;break;default:I(a,d,m,h)}a.push(J);
	if(null!=g){if(null!=e)throw Error(k(60));if("object"!==typeof g||!("__html"in g))throw Error(k(61));c=g.__html;null!==c&&void 0!==c&&("string"===typeof c&&0<c.length&&"\n"===c[0]?a.push(Ja,u(c)):a.push(u(""+c)))}"string"===typeof e&&"\n"===e[0]&&a.push(Ja);return e;case "area":case "base":case "br":case "col":case "embed":case "hr":case "img":case "keygen":case "link":case "meta":case "param":case "source":case "track":case "wbr":a.push(L(b));for(var F in c)if(w.call(c,F)&&(e=c[F],null!=e))switch(F){case "children":case "dangerouslySetInnerHTML":throw Error(k(399,
	b));default:I(a,d,F,e)}a.push(Fa);return null;case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return Ia(a,c,b,d);case "html":return 0===f.insertionMode&&a.push(Ma),Ia(a,c,b,d);default:if(-1===b.indexOf("-")&&"string"!==typeof c.is)return Ia(a,c,b,d);a.push(L(b));g=e=null;for(q in c)if(w.call(c,q)&&(h=c[q],null!=h))switch(q){case "children":e=h;break;case "dangerouslySetInnerHTML":g=
	h;break;case "style":Da(a,d,h);break;case "suppressContentEditableWarning":case "suppressHydrationWarning":break;default:ia(q)&&"function"!==typeof h&&"symbol"!==typeof h&&a.push(G,u(q),H,u(A(h)),D)}a.push(J);K(a,g,e);return e}}var Oa=v("</"),Pa=v(">"),Qa=v('<template id="'),Ra=v('"></template>'),Sa=v("\x3c!--$--\x3e"),Ta=v('\x3c!--$?--\x3e<template id="'),Ua=v('"></template>'),Va=v("\x3c!--$!--\x3e"),Wa=v("\x3c!--/$--\x3e");
	function Xa(a,b,c){p(a,Ta);if(null===c)throw Error(k(395));p(a,c);return t(a,Ua)}
	var Ya=v('<div hidden id="'),Za=v('">'),$a=v("</div>"),ab=v('<svg aria-hidden="true" style="display:none" id="'),bb=v('">'),cb=v("</svg>"),db=v('<math aria-hidden="true" style="display:none" id="'),eb=v('">'),fb=v("</math>"),gb=v('<table hidden id="'),hb=v('">'),ib=v("</table>"),jb=v('<table hidden><tbody id="'),kb=v('">'),lb=v("</tbody></table>"),mb=v('<table hidden><tr id="'),nb=v('">'),ob=v("</tr></table>"),pb=v('<table hidden><colgroup id="'),qb=v('">'),rb=v("</colgroup></table>");
	function sb(a,b,c,d){switch(c.insertionMode){case 0:case 1:return p(a,Ya),p(a,b.segmentPrefix),p(a,u(d.toString(16))),t(a,Za);case 2:return p(a,ab),p(a,b.segmentPrefix),p(a,u(d.toString(16))),t(a,bb);case 3:return p(a,db),p(a,b.segmentPrefix),p(a,u(d.toString(16))),t(a,eb);case 4:return p(a,gb),p(a,b.segmentPrefix),p(a,u(d.toString(16))),t(a,hb);case 5:return p(a,jb),p(a,b.segmentPrefix),p(a,u(d.toString(16))),t(a,kb);case 6:return p(a,mb),p(a,b.segmentPrefix),p(a,u(d.toString(16))),t(a,nb);case 7:return p(a,
	pb),p(a,b.segmentPrefix),p(a,u(d.toString(16))),t(a,qb);default:throw Error(k(397));}}function tb(a,b){switch(b.insertionMode){case 0:case 1:return t(a,$a);case 2:return t(a,cb);case 3:return t(a,fb);case 4:return t(a,ib);case 5:return t(a,lb);case 6:return t(a,ob);case 7:return t(a,rb);default:throw Error(k(397));}}
	var ub=v('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'),vb=v('$RS("'),wb=v('","'),xb=v('")\x3c/script>'),yb=v('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'),
	zb=v('$RC("'),Ab=v('","'),Bb=v('")\x3c/script>'),Cb=v('function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()};$RX("'),Db=v('$RX("'),Eb=v('")\x3c/script>'),M=Object.assign,Fb=Symbol.for("react.element"),Gb=Symbol.for("react.portal"),Hb=Symbol.for("react.fragment"),Ib=Symbol.for("react.strict_mode"),Jb=Symbol.for("react.profiler"),Kb=Symbol.for("react.provider"),Lb=Symbol.for("react.context"),Mb=Symbol.for("react.forward_ref"),Nb=Symbol.for("react.suspense"),
	Ob=Symbol.for("react.suspense_list"),Pb=Symbol.for("react.memo"),Qb=Symbol.for("react.lazy"),Rb=Symbol.for("react.scope"),Sb=Symbol.for("react.debug_trace_mode"),Tb=Symbol.for("react.legacy_hidden"),Ub=Symbol.for("react.default_value"),Vb=Symbol.iterator;
	function Wb(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Hb:return"Fragment";case Gb:return"Portal";case Jb:return"Profiler";case Ib:return"StrictMode";case Nb:return"Suspense";case Ob:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Lb:return(a.displayName||"Context")+".Consumer";case Kb:return(a._context.displayName||"Context")+".Provider";case Mb:var b=a.render;a=a.displayName;a||(a=b.displayName||
	b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Pb:return b=a.displayName||null,null!==b?b:Wb(a.type)||"Memo";case Qb:b=a._payload;a=a._init;try{return Wb(a(b))}catch(c){}}return null}var Xb={};function Yb(a,b){a=a.contextTypes;if(!a)return Xb;var c={},d;for(d in a)c[d]=b[d];return c}var N=null;
	function O(a,b){if(a!==b){a.context._currentValue=a.parentValue;a=a.parent;var c=b.parent;if(null===a){if(null!==c)throw Error(k(401));}else{if(null===c)throw Error(k(401));O(a,c)}b.context._currentValue=b.value}}function Zb(a){a.context._currentValue=a.parentValue;a=a.parent;null!==a&&Zb(a)}function $b(a){var b=a.parent;null!==b&&$b(b);a.context._currentValue=a.value}
	function ac(a,b){a.context._currentValue=a.parentValue;a=a.parent;if(null===a)throw Error(k(402));a.depth===b.depth?O(a,b):ac(a,b)}function bc(a,b){var c=b.parent;if(null===c)throw Error(k(402));a.depth===c.depth?O(a,c):bc(a,c);b.context._currentValue=b.value}function P(a){var b=N;b!==a&&(null===b?$b(a):null===a?Zb(b):b.depth===a.depth?O(b,a):b.depth>a.depth?ac(b,a):bc(b,a),N=a)}
	var cc={isMounted:function(){return!1},enqueueSetState:function(a,b){a=a._reactInternals;null!==a.queue&&a.queue.push(b)},enqueueReplaceState:function(a,b){a=a._reactInternals;a.replace=!0;a.queue=[b]},enqueueForceUpdate:function(){}};
	function dc(a,b,c,d){var f=void 0!==a.state?a.state:null;a.updater=cc;a.props=c;a.state=f;var e={queue:[],replace:!1};a._reactInternals=e;var g=b.contextType;a.context="object"===typeof g&&null!==g?g._currentValue:d;g=b.getDerivedStateFromProps;"function"===typeof g&&(g=g(c,f),f=null===g||void 0===g?f:M({},f,g),a.state=f);if("function"!==typeof b.getDerivedStateFromProps&&"function"!==typeof a.getSnapshotBeforeUpdate&&("function"===typeof a.UNSAFE_componentWillMount||"function"===typeof a.componentWillMount))if(b=
	a.state,"function"===typeof a.componentWillMount&&a.componentWillMount(),"function"===typeof a.UNSAFE_componentWillMount&&a.UNSAFE_componentWillMount(),b!==a.state&&cc.enqueueReplaceState(a,a.state,null),null!==e.queue&&0<e.queue.length)if(b=e.queue,g=e.replace,e.queue=null,e.replace=!1,g&&1===b.length)a.state=b[0];else{e=g?b[0]:a.state;f=!0;for(g=g?1:0;g<b.length;g++){var h=b[g];h="function"===typeof h?h.call(a,e,c,d):h;null!=h&&(f?(f=!1,e=M({},e,h)):M(e,h))}a.state=e}else e.queue=null}
	var ec={id:1,overflow:""};function fc(a,b,c){var d=a.id;a=a.overflow;var f=32-Q(d)-1;d&=~(1<<f);c+=1;var e=32-Q(b)+f;if(30<e){var g=f-f%5;e=(d&(1<<g)-1).toString(32);d>>=g;f-=g;return{id:1<<32-Q(b)+f|c<<f|d,overflow:e+a}}return{id:1<<e|c<<f|d,overflow:a}}var Q=Math.clz32?Math.clz32:gc,hc=Math.log,ic=Math.LN2;function gc(a){a>>>=0;return 0===a?32:31-(hc(a)/ic|0)|0}function jc(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}
	var kc="function"===typeof Object.is?Object.is:jc,R=null,lc=null,mc=null,S=null,T=!1,nc=!1,U=0,V=null,oc=0;function W(){if(null===R)throw Error(k(321));return R}function pc(){if(0<oc)throw Error(k(312));return{memoizedState:null,queue:null,next:null}}function qc(){null===S?null===mc?(T=!1,mc=S=pc()):(T=!0,S=mc):null===S.next?(T=!1,S=S.next=pc()):(T=!0,S=S.next);return S}function rc(){lc=R=null;nc=!1;mc=null;oc=0;S=V=null}function sc(a,b){return"function"===typeof b?b(a):b}
	function tc(a,b,c){R=W();S=qc();if(T){var d=S.queue;b=d.dispatch;if(null!==V&&(c=V.get(d),void 0!==c)){V.delete(d);d=S.memoizedState;do d=a(d,c.action),c=c.next;while(null!==c);S.memoizedState=d;return[d,b]}return[S.memoizedState,b]}a=a===sc?"function"===typeof b?b():b:void 0!==c?c(b):b;S.memoizedState=a;a=S.queue={last:null,dispatch:null};a=a.dispatch=uc.bind(null,R,a);return[S.memoizedState,a]}
	function vc(a,b){R=W();S=qc();b=void 0===b?null:b;if(null!==S){var c=S.memoizedState;if(null!==c&&null!==b){var d=c[1];a:if(null===d)d=!1;else{for(var f=0;f<d.length&&f<b.length;f++)if(!kc(b[f],d[f])){d=!1;break a}d=!0}if(d)return c[0]}}a=a();S.memoizedState=[a,b];return a}function uc(a,b,c){if(25<=oc)throw Error(k(301));if(a===R)if(nc=!0,a={action:c,next:null},null===V&&(V=new Map),c=V.get(b),void 0===c)V.set(b,a);else{for(b=c;null!==b.next;)b=b.next;b.next=a}}
	function wc(){throw Error(k(394));}function xc(){}
	var zc={readContext:function(a){return a._currentValue},useContext:function(a){W();return a._currentValue},useMemo:vc,useReducer:tc,useRef:function(a){R=W();S=qc();var b=S.memoizedState;return null===b?(a={current:a},S.memoizedState=a):b},useState:function(a){return tc(sc,a)},useInsertionEffect:xc,useLayoutEffect:function(){},useCallback:function(a,b){return vc(function(){return a},b)},useImperativeHandle:xc,useEffect:xc,useDebugValue:xc,useDeferredValue:function(a){W();return a},useTransition:function(){W();
	return[!1,wc]},useId:function(){var a=lc.treeContext;var b=a.overflow;a=a.id;a=(a&~(1<<32-Q(a)-1)).toString(32)+b;var c=yc;if(null===c)throw Error(k(404));b=U++;a=":"+c.idPrefix+"R"+a;0<b&&(a+="H"+b.toString(32));return a+":"},useMutableSource:function(a,b){W();return b(a._source)},useSyncExternalStore:function(a,b,c){if(void 0===c)throw Error(k(407));return c()}},yc=null,Ac=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;function Bc(a){console.error(a)}
	function X(){}
	function Cc(a,b,c,d,f,e,g,h,m){var q=[],r=new Set;b={destination:null,responseState:b,progressiveChunkSize:void 0===d?12800:d,status:0,fatalError:null,nextSegmentId:0,allPendingTasks:0,pendingRootTasks:0,completedRootSegment:null,abortableTasks:r,pingedTasks:q,clientRenderedBoundaries:[],completedBoundaries:[],partialBoundaries:[],onError:void 0===f?Bc:f,onAllReady:void 0===e?X:e,onShellReady:void 0===g?X:g,onShellError:void 0===h?X:h,onFatalError:void 0===m?X:m};c=Dc(b,0,null,c);c.parentFlushed=!0;
	a=Ec(b,a,null,c,r,Xb,null,ec);q.push(a);return b}function Ec(a,b,c,d,f,e,g,h){a.allPendingTasks++;null===c?a.pendingRootTasks++:c.pendingTasks++;var m={node:b,ping:function(){var b=a.pingedTasks;b.push(m);1===b.length&&Fc(a)},blockedBoundary:c,blockedSegment:d,abortSet:f,legacyContext:e,context:g,treeContext:h};f.add(m);return m}function Dc(a,b,c,d){return{status:0,id:-1,index:b,parentFlushed:!1,chunks:[],children:[],formatContext:d,boundary:c}}function Y(a,b){a=a.onError;a(b)}
	function Gc(a,b){var c=a.onShellError;c(b);c=a.onFatalError;c(b);null!==a.destination?(a.status=2,da(a.destination,b)):(a.status=1,a.fatalError=b)}function Hc(a,b,c,d,f){R={};lc=b;U=0;for(a=c(d,f);nc;)nc=!1,U=0,oc+=1,S=null,a=c(d,f);rc();return a}
	function Ic(a,b,c,d){var f=c.render(),e=d.childContextTypes;if(null!==e&&void 0!==e){var g=b.legacyContext;if("function"!==typeof c.getChildContext)d=g;else{c=c.getChildContext();for(var h in c)if(!(h in e))throw Error(k(108,Wb(d)||"Unknown",h));d=M({},g,c)}b.legacyContext=d;Z(a,b,f);b.legacyContext=g}else Z(a,b,f)}function Jc(a,b){if(a&&a.defaultProps){b=M({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}
	function Kc(a,b,c,d,f){if("function"===typeof c)if(c.prototype&&c.prototype.isReactComponent){f=Yb(c,b.legacyContext);var e=c.contextType;e=new c(d,"object"===typeof e&&null!==e?e._currentValue:f);dc(e,c,d,f);Ic(a,b,e,c)}else{e=Yb(c,b.legacyContext);f=Hc(a,b,c,d,e);var g=0!==U;if("object"===typeof f&&null!==f&&"function"===typeof f.render&&void 0===f.$$typeof)dc(f,c,d,e),Ic(a,b,f,c);else if(g){d=b.treeContext;b.treeContext=fc(d,1,0);try{Z(a,b,f)}finally{b.treeContext=d}}else Z(a,b,f)}else if("string"===
	typeof c)switch(f=b.blockedSegment,e=Na(f.chunks,c,d,a.responseState,f.formatContext),g=f.formatContext,f.formatContext=xa(g,c,d),Lc(a,b,e),f.formatContext=g,c){case "area":case "base":case "br":case "col":case "embed":case "hr":case "img":case "input":case "keygen":case "link":case "meta":case "param":case "source":case "track":case "wbr":break;default:f.chunks.push(Oa,u(c),Pa)}else{switch(c){case Tb:case Sb:case Ib:case Jb:case Hb:Z(a,b,d.children);return;case Ob:Z(a,b,d.children);return;case Rb:throw Error(k(343));
	case Nb:a:{c=b.blockedBoundary;f=b.blockedSegment;e=d.fallback;d=d.children;g=new Set;var h={id:null,rootSegmentID:-1,parentFlushed:!1,pendingTasks:0,forceClientRender:!1,completedSegments:[],byteSize:0,fallbackAbortableTasks:g},m=Dc(a,f.chunks.length,h,f.formatContext);f.children.push(m);var q=Dc(a,0,null,f.formatContext);q.parentFlushed=!0;b.blockedBoundary=h;b.blockedSegment=q;try{if(Lc(a,b,d),q.status=1,Mc(h,q),0===h.pendingTasks)break a}catch(r){q.status=4,Y(a,r),h.forceClientRender=!0}finally{b.blockedBoundary=
	c,b.blockedSegment=f}b=Ec(a,e,c,m,g,b.legacyContext,b.context,b.treeContext);a.pingedTasks.push(b)}return}if("object"===typeof c&&null!==c)switch(c.$$typeof){case Mb:d=Hc(a,b,c.render,d,f);if(0!==U){c=b.treeContext;b.treeContext=fc(c,1,0);try{Z(a,b,d)}finally{b.treeContext=c}}else Z(a,b,d);return;case Pb:c=c.type;d=Jc(c,d);Kc(a,b,c,d,f);return;case Kb:f=d.children;c=c._context;d=d.value;e=c._currentValue;c._currentValue=d;g=N;N=d={parent:g,depth:null===g?0:g.depth+1,context:c,parentValue:e,value:d};
	b.context=d;Z(a,b,f);a=N;if(null===a)throw Error(k(403));d=a.parentValue;a.context._currentValue=d===Ub?a.context._defaultValue:d;a=N=a.parent;b.context=a;return;case Lb:d=d.children;d=d(c._currentValue);Z(a,b,d);return;case Qb:f=c._init;c=f(c._payload);d=Jc(c,d);Kc(a,b,c,d,void 0);return}throw Error(k(130,null==c?c:typeof c,""));}}
	function Z(a,b,c){b.node=c;if("object"===typeof c&&null!==c){switch(c.$$typeof){case Fb:Kc(a,b,c.type,c.props,c.ref);return;case Gb:throw Error(k(257));case Qb:var d=c._init;c=d(c._payload);Z(a,b,c);return}if(pa(c)){Nc(a,b,c);return}null===c||"object"!==typeof c?d=null:(d=Vb&&c[Vb]||c["@@iterator"],d="function"===typeof d?d:null);if(d&&(d=d.call(c))){c=d.next();if(!c.done){var f=[];do f.push(c.value),c=d.next();while(!c.done);Nc(a,b,f)}return}b=Object.prototype.toString.call(c);throw Error(k(31,"[object Object]"===
	b?"object with keys {"+Object.keys(c).join(", ")+"}":b));}"string"===typeof c?""!==c&&b.blockedSegment.chunks.push(u(A(c)),ya):"number"===typeof c&&(a=""+c,""!==a&&b.blockedSegment.chunks.push(u(A(a)),ya))}function Nc(a,b,c){for(var d=c.length,f=0;f<d;f++){var e=b.treeContext;b.treeContext=fc(e,d,f);try{Lc(a,b,c[f])}finally{b.treeContext=e}}}
	function Lc(a,b,c){var d=b.blockedSegment.formatContext,f=b.legacyContext,e=b.context;try{return Z(a,b,c)}catch(m){if(rc(),"object"===typeof m&&null!==m&&"function"===typeof m.then){c=m;var g=b.blockedSegment,h=Dc(a,g.chunks.length,null,g.formatContext);g.children.push(h);a=Ec(a,b.node,b.blockedBoundary,h,b.abortSet,b.legacyContext,b.context,b.treeContext).ping;c.then(a,a);b.blockedSegment.formatContext=d;b.legacyContext=f;b.context=e;P(e)}else throw b.blockedSegment.formatContext=d,b.legacyContext=
	f,b.context=e,P(e),m;}}function Oc(a){var b=a.blockedBoundary;a=a.blockedSegment;a.status=3;Pc(this,b,a)}
	function Qc(a){var b=a.blockedBoundary;a.blockedSegment.status=3;null===b?(this.allPendingTasks--,2!==this.status&&(this.status=2,null!==this.destination&&this.destination.close())):(b.pendingTasks--,b.forceClientRender||(b.forceClientRender=!0,b.parentFlushed&&this.clientRenderedBoundaries.push(b)),b.fallbackAbortableTasks.forEach(Qc,this),b.fallbackAbortableTasks.clear(),this.allPendingTasks--,0===this.allPendingTasks&&(a=this.onAllReady,a()))}
	function Mc(a,b){if(0===b.chunks.length&&1===b.children.length&&null===b.children[0].boundary){var c=b.children[0];c.id=b.id;c.parentFlushed=!0;1===c.status&&Mc(a,c)}else a.completedSegments.push(b)}
	function Pc(a,b,c){if(null===b){if(c.parentFlushed){if(null!==a.completedRootSegment)throw Error(k(389));a.completedRootSegment=c}a.pendingRootTasks--;0===a.pendingRootTasks&&(a.onShellError=X,b=a.onShellReady,b())}else b.pendingTasks--,b.forceClientRender||(0===b.pendingTasks?(c.parentFlushed&&1===c.status&&Mc(b,c),b.parentFlushed&&a.completedBoundaries.push(b),b.fallbackAbortableTasks.forEach(Oc,a),b.fallbackAbortableTasks.clear()):c.parentFlushed&&1===c.status&&(Mc(b,c),1===b.completedSegments.length&&
	b.parentFlushed&&a.partialBoundaries.push(b)));a.allPendingTasks--;0===a.allPendingTasks&&(a=a.onAllReady,a())}
	function Fc(a){if(2!==a.status){var b=N,c=Ac.current;Ac.current=zc;var d=yc;yc=a.responseState;try{var f=a.pingedTasks,e;for(e=0;e<f.length;e++){var g=f[e];var h=a,m=g.blockedSegment;if(0===m.status){P(g.context);try{Z(h,g,g.node),g.abortSet.delete(g),m.status=1,Pc(h,g.blockedBoundary,m)}catch(C){if(rc(),"object"===typeof C&&null!==C&&"function"===typeof C.then){var q=g.ping;C.then(q,q)}else{g.abortSet.delete(g);m.status=4;var r=g.blockedBoundary,E=C;Y(h,E);null===r?Gc(h,E):(r.pendingTasks--,r.forceClientRender||
	(r.forceClientRender=!0,r.parentFlushed&&h.clientRenderedBoundaries.push(r)));h.allPendingTasks--;if(0===h.allPendingTasks){var F=h.onAllReady;F()}}}finally{}}}f.splice(0,e);null!==a.destination&&Rc(a,a.destination)}catch(C){Y(a,C),Gc(a,C)}finally{yc=d,Ac.current=c,c===zc&&P(b)}}}
	function Sc(a,b,c){c.parentFlushed=!0;switch(c.status){case 0:var d=c.id=a.nextSegmentId++;a=a.responseState;p(b,Qa);p(b,a.placeholderPrefix);a=u(d.toString(16));p(b,a);return t(b,Ra);case 1:c.status=2;var f=!0;d=c.chunks;var e=0;c=c.children;for(var g=0;g<c.length;g++){for(f=c[g];e<f.index;e++)p(b,d[e]);f=Tc(a,b,f)}for(;e<d.length-1;e++)p(b,d[e]);e<d.length&&(f=t(b,d[e]));return f;default:throw Error(k(390));}}
	function Tc(a,b,c){var d=c.boundary;if(null===d)return Sc(a,b,c);d.parentFlushed=!0;if(d.forceClientRender)t(b,Va),Sc(a,b,c);else if(0<d.pendingTasks){d.rootSegmentID=a.nextSegmentId++;0<d.completedSegments.length&&a.partialBoundaries.push(d);var f=a.responseState;var e=f.nextSuspenseID++;f=v(f.boundaryPrefix+e.toString(16));d=d.id=f;Xa(b,a.responseState,d);Sc(a,b,c)}else if(d.byteSize>a.progressiveChunkSize)d.rootSegmentID=a.nextSegmentId++,a.completedBoundaries.push(d),Xa(b,a.responseState,d.id),
	Sc(a,b,c);else{t(b,Sa);c=d.completedSegments;if(1!==c.length)throw Error(k(391));Tc(a,b,c[0])}return t(b,Wa)}function Uc(a,b,c){sb(b,a.responseState,c.formatContext,c.id);Tc(a,b,c);return tb(b,c.formatContext)}
	function Vc(a,b,c){for(var d=c.completedSegments,f=0;f<d.length;f++)Wc(a,b,c,d[f]);d.length=0;a=a.responseState;d=c.id;c=c.rootSegmentID;p(b,a.startInlineScript);a.sentCompleteBoundaryFunction?p(b,zb):(a.sentCompleteBoundaryFunction=!0,p(b,yb));if(null===d)throw Error(k(395));c=u(c.toString(16));p(b,d);p(b,Ab);p(b,a.segmentPrefix);p(b,c);return t(b,Bb)}
	function Wc(a,b,c,d){if(2===d.status)return!0;var f=d.id;if(-1===f){if(-1===(d.id=c.rootSegmentID))throw Error(k(392));return Uc(a,b,d)}Uc(a,b,d);a=a.responseState;p(b,a.startInlineScript);a.sentCompleteSegmentFunction?p(b,vb):(a.sentCompleteSegmentFunction=!0,p(b,ub));p(b,a.segmentPrefix);f=u(f.toString(16));p(b,f);p(b,wb);p(b,a.placeholderPrefix);p(b,f);return t(b,xb)}
	function Rc(a,b){l=new Uint8Array(512);n=0;try{var c=a.completedRootSegment;if(null!==c&&0===a.pendingRootTasks){Tc(a,b,c);a.completedRootSegment=null;var d=a.responseState.bootstrapChunks;for(c=0;c<d.length-1;c++)p(b,d[c]);c<d.length&&t(b,d[c])}var f=a.clientRenderedBoundaries,e;for(e=0;e<f.length;e++){d=b;var g=a.responseState,h=f[e].id;p(d,g.startInlineScript);g.sentClientRenderFunction?p(d,Db):(g.sentClientRenderFunction=!0,p(d,Cb));if(null===h)throw Error(k(395));p(d,h);if(!t(d,Eb)){a.destination=
	null;e++;f.splice(0,e);return}}f.splice(0,e);var m=a.completedBoundaries;for(e=0;e<m.length;e++)if(!Vc(a,b,m[e])){a.destination=null;e++;m.splice(0,e);return}m.splice(0,e);ba(b);l=new Uint8Array(512);n=0;var q=a.partialBoundaries;for(e=0;e<q.length;e++){var r=q[e];a:{f=a;g=b;var E=r.completedSegments;for(h=0;h<E.length;h++)if(!Wc(f,g,r,E[h])){h++;E.splice(0,h);var F=!1;break a}E.splice(0,h);F=!0}if(!F){a.destination=null;e++;q.splice(0,e);return}}q.splice(0,e);var C=a.completedBoundaries;for(e=0;e<
	C.length;e++)if(!Vc(a,b,C[e])){a.destination=null;e++;C.splice(0,e);return}C.splice(0,e)}finally{ba(b),0===a.allPendingTasks&&0===a.pingedTasks.length&&0===a.clientRenderedBoundaries.length&&0===a.completedBoundaries.length&&b.close()}}function Xc(a){try{var b=a.abortableTasks;b.forEach(Qc,a);b.clear();null!==a.destination&&Rc(a,a.destination)}catch(c){Y(a,c),Gc(a,c)}}
	exports.renderToReadableStream=function(a,b){return new Promise(function(c,d){var f,e,g=new Promise(function(a,b){e=a;f=b}),h=Cc(a,va(b?b.identifierPrefix:void 0,b?b.nonce:void 0,b?b.bootstrapScriptContent:void 0,b?b.bootstrapScripts:void 0,b?b.bootstrapModules:void 0),wa(b?b.namespaceURI:void 0),b?b.progressiveChunkSize:void 0,b?b.onError:void 0,e,function(){var a=new ReadableStream({type:"bytes",pull:function(a){if(1===h.status)h.status=2,da(a,h.fatalError);else if(2!==h.status&&null===h.destination){h.destination=
	a;try{Rc(h,a)}catch(F){Y(h,F),Gc(h,F)}}},cancel:function(){Xc(h)}});a.allReady=g;c(a)},function(a){g.catch(function(){});d(a)},f);if(b&&b.signal){var m=b.signal,q=function(){Xc(h);m.removeEventListener("abort",q)};m.addEventListener("abort",q)}Fc(h)})};exports.version="18.0.0-fc46dba67-20220329";


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * @license React
	 * react-dom-server-legacy.browser.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== "production") {
	  (function() {
	'use strict';

	var React = __webpack_require__(1);

	var ReactVersion = '18.0.0-fc46dba67-20220329';

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	// by calls to these methods by a Babel plugin.
	//
	// In PROD (or in packages without access to React internals),
	// they are left as they are instead.

	function warn(format) {
	  {
	    {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      printWarning('warn', format, args);
	    }
	  }
	}
	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	function scheduleWork(callback) {
	  callback();
	}
	function beginWriting(destination) {}
	var prevWasCommentSegmenter = false;
	function writeChunk(destination, chunk) {
	  writeChunkAndReturn(destination, chunk);
	}
	function writeChunkAndReturn(destination, chunk) {
	  if (prevWasCommentSegmenter) {
	    prevWasCommentSegmenter = false;

	    if (chunk[0] !== '<') {
	      destination.push('<!-- -->');
	    }
	  }

	  if (chunk === '<!-- -->') {
	    prevWasCommentSegmenter = true;
	    return true;
	  }

	  return destination.push(chunk);
	}
	function completeWriting(destination) {}
	function close(destination) {
	  destination.push(null);
	}
	function stringToChunk(content) {
	  return content;
	}
	function stringToPrecomputedChunk(content) {
	  return content;
	}
	function closeWithError(destination, error) {
	  // $FlowFixMe: This is an Error object or the destination accepts other types.
	  destination.destroy(error);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}

	function checkAttributeStringCoercion(value, attributeName) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided `%s` attribute is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', attributeName, typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}
	function checkCSSPropertyStringCoercion(value, propName) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided `%s` CSS property is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', propName, typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}
	function checkHtmlStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided HTML markup uses a value of unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	// A reserved attribute.
	// It is handled by React separately and shouldn't be written to the DOM.
	var RESERVED = 0; // A simple string attribute.
	// Attributes that aren't in the filter are presumed to have this type.

	var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
	// "enumerated" attributes with "true" and "false" as possible values.
	// When true, it should be set to a "true" string.
	// When false, it should be set to a "false" string.

	var BOOLEANISH_STRING = 2; // A real boolean attribute.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.

	var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.
	// For any other value, should be present with that value.

	var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
	// When falsy, it should be removed.

	var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
	// When falsy, it should be removed.

	var POSITIVE_NUMERIC = 6;

	/* eslint-disable max-len */
	var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
	/* eslint-enable max-len */

	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
	var illegalAttributeNameCache = {};
	var validatedAttributeNameCache = {};
	function isAttributeNameSafe(attributeName) {
	  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
	    return true;
	  }

	  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
	    return false;
	  }

	  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
	    validatedAttributeNameCache[attributeName] = true;
	    return true;
	  }

	  illegalAttributeNameCache[attributeName] = true;

	  {
	    error('Invalid attribute name: `%s`', attributeName);
	  }

	  return false;
	}
	function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
	  if (propertyInfo !== null && propertyInfo.type === RESERVED) {
	    return false;
	  }

	  switch (typeof value) {
	    case 'function': // $FlowIssue symbol is perfectly valid here

	    case 'symbol':
	      // eslint-disable-line
	      return true;

	    case 'boolean':
	      {
	        if (isCustomComponentTag) {
	          return false;
	        }

	        if (propertyInfo !== null) {
	          return !propertyInfo.acceptsBooleans;
	        } else {
	          var prefix = name.toLowerCase().slice(0, 5);
	          return prefix !== 'data-' && prefix !== 'aria-';
	        }
	      }

	    default:
	      return false;
	  }
	}
	function getPropertyInfo(name) {
	  return properties.hasOwnProperty(name) ? properties[name] : null;
	}

	function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
	  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
	  this.attributeName = attributeName;
	  this.attributeNamespace = attributeNamespace;
	  this.mustUseProperty = mustUseProperty;
	  this.propertyName = name;
	  this.type = type;
	  this.sanitizeURL = sanitizeURL;
	  this.removeEmptyString = removeEmptyString;
	} // When adding attributes to this list, be sure to also add them to
	// the `possibleStandardNames` module to ensure casing and incorrect
	// name warnings.


	var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

	var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
	// elements (not just inputs). Now that ReactDOMInput assigns to the
	// defaultValue property -- do we need this?
	'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];

	reservedProps.forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // A few React string attributes have a different name.
	// This is a mapping from React prop names to the attribute names.

	[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
	  var name = _ref[0],
	      attributeName = _ref[1];
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" HTML attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).

	['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" SVG attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).
	// Since these are SVG attributes, their attribute names are case-sensitive.

	['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML boolean attributes.

	['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
	// on the client side because the browsers are inconsistent. Instead we call focus().
	'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'disableRemotePlayback', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
	'itemScope'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are the few React props that we set as DOM properties
	// rather than attributes. These are all booleans.

	['checked', // Note: `option.selected` is not updated if `select.multiple` is
	// disabled with `removeAttribute`. We have special logic for handling this.
	'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that are "overloaded booleans": they behave like
	// booleans, but can also accept a string value.

	['capture', 'download' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be positive numbers.

	['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be numbers.

	['rowSpan', 'start'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	});
	var CAMELIZE = /[\-\:]([a-z])/g;

	var capitalize = function (token) {
	  return token[1].toUpperCase();
	}; // This is a list of all SVG attributes that need special casing, namespacing,
	// or boolean value assignment. Regular attributes that just accept strings
	// and have the same names are omitted, just like in the HTML attribute filter.
	// Some of these attributes can be hard to find. This list was created by
	// scraping the MDN documentation.


	['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xlink namespace.

	['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/1999/xlink', false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xml namespace.

	['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/XML/1998/namespace', false, // sanitizeURL
	  false);
	}); // These attribute exists both in HTML and SVG.
	// The attribute name is case-sensitive in SVG so we can't just use
	// the React name like we do for attributes that exist only in HTML.

	['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These attributes accept URLs. These must not allow javascript: URLS.
	// These will also need to accept Trusted Types object in the future.

	var xlinkHref = 'xlinkHref';
	properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
	'xlink:href', 'http://www.w3.org/1999/xlink', true, // sanitizeURL
	false);
	['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  true, // sanitizeURL
	  true);
	});

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  animationIterationCount: true,
	  aspectRatio: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  columns: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridArea: true,
	  gridRow: true,
	  gridRowEnd: true,
	  gridRowSpan: true,
	  gridRowStart: true,
	  gridColumn: true,
	  gridColumnEnd: true,
	  gridColumnSpan: true,
	  gridColumnStart: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,
	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};
	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */

	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}
	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */


	var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.

	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	var hasReadOnlyValue = {
	  button: true,
	  checkbox: true,
	  image: true,
	  hidden: true,
	  radio: true,
	  reset: true,
	  submit: true
	};
	function checkControlledValueProps(tagName, props) {
	  {
	    if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
	      error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    }

	    if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
	      error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    }
	  }
	}

	function isCustomComponent(tagName, props) {
	  if (tagName.indexOf('-') === -1) {
	    return typeof props.is === 'string';
	  }

	  switch (tagName) {
	    // These are reserved SVG and MathML elements.
	    // We don't mind this list too much because we expect it to never grow.
	    // The alternative is to track the namespace in a few places which is convoluted.
	    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
	    case 'annotation-xml':
	    case 'color-profile':
	    case 'font-face':
	    case 'font-face-src':
	    case 'font-face-uri':
	    case 'font-face-format':
	    case 'font-face-name':
	    case 'missing-glyph':
	      return false;

	    default:
	      return true;
	  }
	}

	var ariaProperties = {
	  'aria-current': 0,
	  // state
	  'aria-description': 0,
	  'aria-details': 0,
	  'aria-disabled': 0,
	  // state
	  'aria-hidden': 0,
	  // state
	  'aria-invalid': 0,
	  // state
	  'aria-keyshortcuts': 0,
	  'aria-label': 0,
	  'aria-roledescription': 0,
	  // Widget Attributes
	  'aria-autocomplete': 0,
	  'aria-checked': 0,
	  'aria-expanded': 0,
	  'aria-haspopup': 0,
	  'aria-level': 0,
	  'aria-modal': 0,
	  'aria-multiline': 0,
	  'aria-multiselectable': 0,
	  'aria-orientation': 0,
	  'aria-placeholder': 0,
	  'aria-pressed': 0,
	  'aria-readonly': 0,
	  'aria-required': 0,
	  'aria-selected': 0,
	  'aria-sort': 0,
	  'aria-valuemax': 0,
	  'aria-valuemin': 0,
	  'aria-valuenow': 0,
	  'aria-valuetext': 0,
	  // Live Region Attributes
	  'aria-atomic': 0,
	  'aria-busy': 0,
	  'aria-live': 0,
	  'aria-relevant': 0,
	  // Drag-and-Drop Attributes
	  'aria-dropeffect': 0,
	  'aria-grabbed': 0,
	  // Relationship Attributes
	  'aria-activedescendant': 0,
	  'aria-colcount': 0,
	  'aria-colindex': 0,
	  'aria-colspan': 0,
	  'aria-controls': 0,
	  'aria-describedby': 0,
	  'aria-errormessage': 0,
	  'aria-flowto': 0,
	  'aria-labelledby': 0,
	  'aria-owns': 0,
	  'aria-posinset': 0,
	  'aria-rowcount': 0,
	  'aria-rowindex': 0,
	  'aria-rowspan': 0,
	  'aria-setsize': 0
	};

	var warnedProperties = {};
	var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
	var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

	function validateProperty(tagName, name) {
	  {
	    if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
	      return true;
	    }

	    if (rARIACamel.test(name)) {
	      var ariaName = 'aria-' + name.slice(4).toLowerCase();
	      var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null; // If this is an aria-* attribute, but is not listed in the known DOM
	      // DOM properties, then it is an invalid aria-* attribute.

	      if (correctName == null) {
	        error('Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.', name);

	        warnedProperties[name] = true;
	        return true;
	      } // aria-* attributes should be lowercase; suggest the lowercase version.


	      if (name !== correctName) {
	        error('Invalid ARIA attribute `%s`. Did you mean `%s`?', name, correctName);

	        warnedProperties[name] = true;
	        return true;
	      }
	    }

	    if (rARIA.test(name)) {
	      var lowerCasedName = name.toLowerCase();
	      var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null; // If this is an aria-* attribute, but is not listed in the known DOM
	      // DOM properties, then it is an invalid aria-* attribute.

	      if (standardName == null) {
	        warnedProperties[name] = true;
	        return false;
	      } // aria-* attributes should be lowercase; suggest the lowercase version.


	      if (name !== standardName) {
	        error('Unknown ARIA attribute `%s`. Did you mean `%s`?', name, standardName);

	        warnedProperties[name] = true;
	        return true;
	      }
	    }
	  }

	  return true;
	}

	function warnInvalidARIAProps(type, props) {
	  {
	    var invalidProps = [];

	    for (var key in props) {
	      var isValid = validateProperty(type, key);

	      if (!isValid) {
	        invalidProps.push(key);
	      }
	    }

	    var unknownPropString = invalidProps.map(function (prop) {
	      return '`' + prop + '`';
	    }).join(', ');

	    if (invalidProps.length === 1) {
	      error('Invalid aria prop %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
	    } else if (invalidProps.length > 1) {
	      error('Invalid aria props %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
	    }
	  }
	}

	function validateProperties(type, props) {
	  if (isCustomComponent(type, props)) {
	    return;
	  }

	  warnInvalidARIAProps(type, props);
	}

	var didWarnValueNull = false;
	function validateProperties$1(type, props) {
	  {
	    if (type !== 'input' && type !== 'textarea' && type !== 'select') {
	      return;
	    }

	    if (props != null && props.value === null && !didWarnValueNull) {
	      didWarnValueNull = true;

	      if (type === 'select' && props.multiple) {
	        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.', type);
	      } else {
	        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.', type);
	      }
	    }
	  }
	}

	// When adding attributes to the HTML or SVG allowed attribute list, be sure to
	// also add them to this module to ensure casing and incorrect name
	// warnings.
	var possibleStandardNames = {
	  // HTML
	  accept: 'accept',
	  acceptcharset: 'acceptCharset',
	  'accept-charset': 'acceptCharset',
	  accesskey: 'accessKey',
	  action: 'action',
	  allowfullscreen: 'allowFullScreen',
	  alt: 'alt',
	  as: 'as',
	  async: 'async',
	  autocapitalize: 'autoCapitalize',
	  autocomplete: 'autoComplete',
	  autocorrect: 'autoCorrect',
	  autofocus: 'autoFocus',
	  autoplay: 'autoPlay',
	  autosave: 'autoSave',
	  capture: 'capture',
	  cellpadding: 'cellPadding',
	  cellspacing: 'cellSpacing',
	  challenge: 'challenge',
	  charset: 'charSet',
	  checked: 'checked',
	  children: 'children',
	  cite: 'cite',
	  class: 'className',
	  classid: 'classID',
	  classname: 'className',
	  cols: 'cols',
	  colspan: 'colSpan',
	  content: 'content',
	  contenteditable: 'contentEditable',
	  contextmenu: 'contextMenu',
	  controls: 'controls',
	  controlslist: 'controlsList',
	  coords: 'coords',
	  crossorigin: 'crossOrigin',
	  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
	  data: 'data',
	  datetime: 'dateTime',
	  default: 'default',
	  defaultchecked: 'defaultChecked',
	  defaultvalue: 'defaultValue',
	  defer: 'defer',
	  dir: 'dir',
	  disabled: 'disabled',
	  disablepictureinpicture: 'disablePictureInPicture',
	  disableremoteplayback: 'disableRemotePlayback',
	  download: 'download',
	  draggable: 'draggable',
	  enctype: 'encType',
	  enterkeyhint: 'enterKeyHint',
	  for: 'htmlFor',
	  form: 'form',
	  formmethod: 'formMethod',
	  formaction: 'formAction',
	  formenctype: 'formEncType',
	  formnovalidate: 'formNoValidate',
	  formtarget: 'formTarget',
	  frameborder: 'frameBorder',
	  headers: 'headers',
	  height: 'height',
	  hidden: 'hidden',
	  high: 'high',
	  href: 'href',
	  hreflang: 'hrefLang',
	  htmlfor: 'htmlFor',
	  httpequiv: 'httpEquiv',
	  'http-equiv': 'httpEquiv',
	  icon: 'icon',
	  id: 'id',
	  imagesizes: 'imageSizes',
	  imagesrcset: 'imageSrcSet',
	  innerhtml: 'innerHTML',
	  inputmode: 'inputMode',
	  integrity: 'integrity',
	  is: 'is',
	  itemid: 'itemID',
	  itemprop: 'itemProp',
	  itemref: 'itemRef',
	  itemscope: 'itemScope',
	  itemtype: 'itemType',
	  keyparams: 'keyParams',
	  keytype: 'keyType',
	  kind: 'kind',
	  label: 'label',
	  lang: 'lang',
	  list: 'list',
	  loop: 'loop',
	  low: 'low',
	  manifest: 'manifest',
	  marginwidth: 'marginWidth',
	  marginheight: 'marginHeight',
	  max: 'max',
	  maxlength: 'maxLength',
	  media: 'media',
	  mediagroup: 'mediaGroup',
	  method: 'method',
	  min: 'min',
	  minlength: 'minLength',
	  multiple: 'multiple',
	  muted: 'muted',
	  name: 'name',
	  nomodule: 'noModule',
	  nonce: 'nonce',
	  novalidate: 'noValidate',
	  open: 'open',
	  optimum: 'optimum',
	  pattern: 'pattern',
	  placeholder: 'placeholder',
	  playsinline: 'playsInline',
	  poster: 'poster',
	  preload: 'preload',
	  profile: 'profile',
	  radiogroup: 'radioGroup',
	  readonly: 'readOnly',
	  referrerpolicy: 'referrerPolicy',
	  rel: 'rel',
	  required: 'required',
	  reversed: 'reversed',
	  role: 'role',
	  rows: 'rows',
	  rowspan: 'rowSpan',
	  sandbox: 'sandbox',
	  scope: 'scope',
	  scoped: 'scoped',
	  scrolling: 'scrolling',
	  seamless: 'seamless',
	  selected: 'selected',
	  shape: 'shape',
	  size: 'size',
	  sizes: 'sizes',
	  span: 'span',
	  spellcheck: 'spellCheck',
	  src: 'src',
	  srcdoc: 'srcDoc',
	  srclang: 'srcLang',
	  srcset: 'srcSet',
	  start: 'start',
	  step: 'step',
	  style: 'style',
	  summary: 'summary',
	  tabindex: 'tabIndex',
	  target: 'target',
	  title: 'title',
	  type: 'type',
	  usemap: 'useMap',
	  value: 'value',
	  width: 'width',
	  wmode: 'wmode',
	  wrap: 'wrap',
	  // SVG
	  about: 'about',
	  accentheight: 'accentHeight',
	  'accent-height': 'accentHeight',
	  accumulate: 'accumulate',
	  additive: 'additive',
	  alignmentbaseline: 'alignmentBaseline',
	  'alignment-baseline': 'alignmentBaseline',
	  allowreorder: 'allowReorder',
	  alphabetic: 'alphabetic',
	  amplitude: 'amplitude',
	  arabicform: 'arabicForm',
	  'arabic-form': 'arabicForm',
	  ascent: 'ascent',
	  attributename: 'attributeName',
	  attributetype: 'attributeType',
	  autoreverse: 'autoReverse',
	  azimuth: 'azimuth',
	  basefrequency: 'baseFrequency',
	  baselineshift: 'baselineShift',
	  'baseline-shift': 'baselineShift',
	  baseprofile: 'baseProfile',
	  bbox: 'bbox',
	  begin: 'begin',
	  bias: 'bias',
	  by: 'by',
	  calcmode: 'calcMode',
	  capheight: 'capHeight',
	  'cap-height': 'capHeight',
	  clip: 'clip',
	  clippath: 'clipPath',
	  'clip-path': 'clipPath',
	  clippathunits: 'clipPathUnits',
	  cliprule: 'clipRule',
	  'clip-rule': 'clipRule',
	  color: 'color',
	  colorinterpolation: 'colorInterpolation',
	  'color-interpolation': 'colorInterpolation',
	  colorinterpolationfilters: 'colorInterpolationFilters',
	  'color-interpolation-filters': 'colorInterpolationFilters',
	  colorprofile: 'colorProfile',
	  'color-profile': 'colorProfile',
	  colorrendering: 'colorRendering',
	  'color-rendering': 'colorRendering',
	  contentscripttype: 'contentScriptType',
	  contentstyletype: 'contentStyleType',
	  cursor: 'cursor',
	  cx: 'cx',
	  cy: 'cy',
	  d: 'd',
	  datatype: 'datatype',
	  decelerate: 'decelerate',
	  descent: 'descent',
	  diffuseconstant: 'diffuseConstant',
	  direction: 'direction',
	  display: 'display',
	  divisor: 'divisor',
	  dominantbaseline: 'dominantBaseline',
	  'dominant-baseline': 'dominantBaseline',
	  dur: 'dur',
	  dx: 'dx',
	  dy: 'dy',
	  edgemode: 'edgeMode',
	  elevation: 'elevation',
	  enablebackground: 'enableBackground',
	  'enable-background': 'enableBackground',
	  end: 'end',
	  exponent: 'exponent',
	  externalresourcesrequired: 'externalResourcesRequired',
	  fill: 'fill',
	  fillopacity: 'fillOpacity',
	  'fill-opacity': 'fillOpacity',
	  fillrule: 'fillRule',
	  'fill-rule': 'fillRule',
	  filter: 'filter',
	  filterres: 'filterRes',
	  filterunits: 'filterUnits',
	  floodopacity: 'floodOpacity',
	  'flood-opacity': 'floodOpacity',
	  floodcolor: 'floodColor',
	  'flood-color': 'floodColor',
	  focusable: 'focusable',
	  fontfamily: 'fontFamily',
	  'font-family': 'fontFamily',
	  fontsize: 'fontSize',
	  'font-size': 'fontSize',
	  fontsizeadjust: 'fontSizeAdjust',
	  'font-size-adjust': 'fontSizeAdjust',
	  fontstretch: 'fontStretch',
	  'font-stretch': 'fontStretch',
	  fontstyle: 'fontStyle',
	  'font-style': 'fontStyle',
	  fontvariant: 'fontVariant',
	  'font-variant': 'fontVariant',
	  fontweight: 'fontWeight',
	  'font-weight': 'fontWeight',
	  format: 'format',
	  from: 'from',
	  fx: 'fx',
	  fy: 'fy',
	  g1: 'g1',
	  g2: 'g2',
	  glyphname: 'glyphName',
	  'glyph-name': 'glyphName',
	  glyphorientationhorizontal: 'glyphOrientationHorizontal',
	  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
	  glyphorientationvertical: 'glyphOrientationVertical',
	  'glyph-orientation-vertical': 'glyphOrientationVertical',
	  glyphref: 'glyphRef',
	  gradienttransform: 'gradientTransform',
	  gradientunits: 'gradientUnits',
	  hanging: 'hanging',
	  horizadvx: 'horizAdvX',
	  'horiz-adv-x': 'horizAdvX',
	  horizoriginx: 'horizOriginX',
	  'horiz-origin-x': 'horizOriginX',
	  ideographic: 'ideographic',
	  imagerendering: 'imageRendering',
	  'image-rendering': 'imageRendering',
	  in2: 'in2',
	  in: 'in',
	  inlist: 'inlist',
	  intercept: 'intercept',
	  k1: 'k1',
	  k2: 'k2',
	  k3: 'k3',
	  k4: 'k4',
	  k: 'k',
	  kernelmatrix: 'kernelMatrix',
	  kernelunitlength: 'kernelUnitLength',
	  kerning: 'kerning',
	  keypoints: 'keyPoints',
	  keysplines: 'keySplines',
	  keytimes: 'keyTimes',
	  lengthadjust: 'lengthAdjust',
	  letterspacing: 'letterSpacing',
	  'letter-spacing': 'letterSpacing',
	  lightingcolor: 'lightingColor',
	  'lighting-color': 'lightingColor',
	  limitingconeangle: 'limitingConeAngle',
	  local: 'local',
	  markerend: 'markerEnd',
	  'marker-end': 'markerEnd',
	  markerheight: 'markerHeight',
	  markermid: 'markerMid',
	  'marker-mid': 'markerMid',
	  markerstart: 'markerStart',
	  'marker-start': 'markerStart',
	  markerunits: 'markerUnits',
	  markerwidth: 'markerWidth',
	  mask: 'mask',
	  maskcontentunits: 'maskContentUnits',
	  maskunits: 'maskUnits',
	  mathematical: 'mathematical',
	  mode: 'mode',
	  numoctaves: 'numOctaves',
	  offset: 'offset',
	  opacity: 'opacity',
	  operator: 'operator',
	  order: 'order',
	  orient: 'orient',
	  orientation: 'orientation',
	  origin: 'origin',
	  overflow: 'overflow',
	  overlineposition: 'overlinePosition',
	  'overline-position': 'overlinePosition',
	  overlinethickness: 'overlineThickness',
	  'overline-thickness': 'overlineThickness',
	  paintorder: 'paintOrder',
	  'paint-order': 'paintOrder',
	  panose1: 'panose1',
	  'panose-1': 'panose1',
	  pathlength: 'pathLength',
	  patterncontentunits: 'patternContentUnits',
	  patterntransform: 'patternTransform',
	  patternunits: 'patternUnits',
	  pointerevents: 'pointerEvents',
	  'pointer-events': 'pointerEvents',
	  points: 'points',
	  pointsatx: 'pointsAtX',
	  pointsaty: 'pointsAtY',
	  pointsatz: 'pointsAtZ',
	  prefix: 'prefix',
	  preservealpha: 'preserveAlpha',
	  preserveaspectratio: 'preserveAspectRatio',
	  primitiveunits: 'primitiveUnits',
	  property: 'property',
	  r: 'r',
	  radius: 'radius',
	  refx: 'refX',
	  refy: 'refY',
	  renderingintent: 'renderingIntent',
	  'rendering-intent': 'renderingIntent',
	  repeatcount: 'repeatCount',
	  repeatdur: 'repeatDur',
	  requiredextensions: 'requiredExtensions',
	  requiredfeatures: 'requiredFeatures',
	  resource: 'resource',
	  restart: 'restart',
	  result: 'result',
	  results: 'results',
	  rotate: 'rotate',
	  rx: 'rx',
	  ry: 'ry',
	  scale: 'scale',
	  security: 'security',
	  seed: 'seed',
	  shaperendering: 'shapeRendering',
	  'shape-rendering': 'shapeRendering',
	  slope: 'slope',
	  spacing: 'spacing',
	  specularconstant: 'specularConstant',
	  specularexponent: 'specularExponent',
	  speed: 'speed',
	  spreadmethod: 'spreadMethod',
	  startoffset: 'startOffset',
	  stddeviation: 'stdDeviation',
	  stemh: 'stemh',
	  stemv: 'stemv',
	  stitchtiles: 'stitchTiles',
	  stopcolor: 'stopColor',
	  'stop-color': 'stopColor',
	  stopopacity: 'stopOpacity',
	  'stop-opacity': 'stopOpacity',
	  strikethroughposition: 'strikethroughPosition',
	  'strikethrough-position': 'strikethroughPosition',
	  strikethroughthickness: 'strikethroughThickness',
	  'strikethrough-thickness': 'strikethroughThickness',
	  string: 'string',
	  stroke: 'stroke',
	  strokedasharray: 'strokeDasharray',
	  'stroke-dasharray': 'strokeDasharray',
	  strokedashoffset: 'strokeDashoffset',
	  'stroke-dashoffset': 'strokeDashoffset',
	  strokelinecap: 'strokeLinecap',
	  'stroke-linecap': 'strokeLinecap',
	  strokelinejoin: 'strokeLinejoin',
	  'stroke-linejoin': 'strokeLinejoin',
	  strokemiterlimit: 'strokeMiterlimit',
	  'stroke-miterlimit': 'strokeMiterlimit',
	  strokewidth: 'strokeWidth',
	  'stroke-width': 'strokeWidth',
	  strokeopacity: 'strokeOpacity',
	  'stroke-opacity': 'strokeOpacity',
	  suppresscontenteditablewarning: 'suppressContentEditableWarning',
	  suppresshydrationwarning: 'suppressHydrationWarning',
	  surfacescale: 'surfaceScale',
	  systemlanguage: 'systemLanguage',
	  tablevalues: 'tableValues',
	  targetx: 'targetX',
	  targety: 'targetY',
	  textanchor: 'textAnchor',
	  'text-anchor': 'textAnchor',
	  textdecoration: 'textDecoration',
	  'text-decoration': 'textDecoration',
	  textlength: 'textLength',
	  textrendering: 'textRendering',
	  'text-rendering': 'textRendering',
	  to: 'to',
	  transform: 'transform',
	  typeof: 'typeof',
	  u1: 'u1',
	  u2: 'u2',
	  underlineposition: 'underlinePosition',
	  'underline-position': 'underlinePosition',
	  underlinethickness: 'underlineThickness',
	  'underline-thickness': 'underlineThickness',
	  unicode: 'unicode',
	  unicodebidi: 'unicodeBidi',
	  'unicode-bidi': 'unicodeBidi',
	  unicoderange: 'unicodeRange',
	  'unicode-range': 'unicodeRange',
	  unitsperem: 'unitsPerEm',
	  'units-per-em': 'unitsPerEm',
	  unselectable: 'unselectable',
	  valphabetic: 'vAlphabetic',
	  'v-alphabetic': 'vAlphabetic',
	  values: 'values',
	  vectoreffect: 'vectorEffect',
	  'vector-effect': 'vectorEffect',
	  version: 'version',
	  vertadvy: 'vertAdvY',
	  'vert-adv-y': 'vertAdvY',
	  vertoriginx: 'vertOriginX',
	  'vert-origin-x': 'vertOriginX',
	  vertoriginy: 'vertOriginY',
	  'vert-origin-y': 'vertOriginY',
	  vhanging: 'vHanging',
	  'v-hanging': 'vHanging',
	  videographic: 'vIdeographic',
	  'v-ideographic': 'vIdeographic',
	  viewbox: 'viewBox',
	  viewtarget: 'viewTarget',
	  visibility: 'visibility',
	  vmathematical: 'vMathematical',
	  'v-mathematical': 'vMathematical',
	  vocab: 'vocab',
	  widths: 'widths',
	  wordspacing: 'wordSpacing',
	  'word-spacing': 'wordSpacing',
	  writingmode: 'writingMode',
	  'writing-mode': 'writingMode',
	  x1: 'x1',
	  x2: 'x2',
	  x: 'x',
	  xchannelselector: 'xChannelSelector',
	  xheight: 'xHeight',
	  'x-height': 'xHeight',
	  xlinkactuate: 'xlinkActuate',
	  'xlink:actuate': 'xlinkActuate',
	  xlinkarcrole: 'xlinkArcrole',
	  'xlink:arcrole': 'xlinkArcrole',
	  xlinkhref: 'xlinkHref',
	  'xlink:href': 'xlinkHref',
	  xlinkrole: 'xlinkRole',
	  'xlink:role': 'xlinkRole',
	  xlinkshow: 'xlinkShow',
	  'xlink:show': 'xlinkShow',
	  xlinktitle: 'xlinkTitle',
	  'xlink:title': 'xlinkTitle',
	  xlinktype: 'xlinkType',
	  'xlink:type': 'xlinkType',
	  xmlbase: 'xmlBase',
	  'xml:base': 'xmlBase',
	  xmllang: 'xmlLang',
	  'xml:lang': 'xmlLang',
	  xmlns: 'xmlns',
	  'xml:space': 'xmlSpace',
	  xmlnsxlink: 'xmlnsXlink',
	  'xmlns:xlink': 'xmlnsXlink',
	  xmlspace: 'xmlSpace',
	  y1: 'y1',
	  y2: 'y2',
	  y: 'y',
	  ychannelselector: 'yChannelSelector',
	  z: 'z',
	  zoomandpan: 'zoomAndPan'
	};

	var validateProperty$1 = function () {};

	{
	  var warnedProperties$1 = {};
	  var EVENT_NAME_REGEX = /^on./;
	  var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
	  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
	  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

	  validateProperty$1 = function (tagName, name, value, eventRegistry) {
	    if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
	      return true;
	    }

	    var lowerCasedName = name.toLowerCase();

	    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
	      error('React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');

	      warnedProperties$1[name] = true;
	      return true;
	    } // We can't rely on the event system being injected on the server.


	    if (eventRegistry != null) {
	      var registrationNameDependencies = eventRegistry.registrationNameDependencies,
	          possibleRegistrationNames = eventRegistry.possibleRegistrationNames;

	      if (registrationNameDependencies.hasOwnProperty(name)) {
	        return true;
	      }

	      var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;

	      if (registrationName != null) {
	        error('Invalid event handler property `%s`. Did you mean `%s`?', name, registrationName);

	        warnedProperties$1[name] = true;
	        return true;
	      }

	      if (EVENT_NAME_REGEX.test(name)) {
	        error('Unknown event handler property `%s`. It will be ignored.', name);

	        warnedProperties$1[name] = true;
	        return true;
	      }
	    } else if (EVENT_NAME_REGEX.test(name)) {
	      // If no event plugins have been injected, we are in a server environment.
	      // So we can't tell if the event name is correct for sure, but we can filter
	      // out known bad ones like `onclick`. We can't suggest a specific replacement though.
	      if (INVALID_EVENT_NAME_REGEX.test(name)) {
	        error('Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.', name);
	      }

	      warnedProperties$1[name] = true;
	      return true;
	    } // Let the ARIA attribute hook validate ARIA attributes


	    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
	      return true;
	    }

	    if (lowerCasedName === 'innerhtml') {
	      error('Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'aria') {
	      error('The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
	      error('Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.', typeof value);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'number' && isNaN(value)) {
	      error('Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.', name);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    var propertyInfo = getPropertyInfo(name);
	    var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED; // Known attributes should match the casing specified in the property config.

	    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
	      var standardName = possibleStandardNames[lowerCasedName];

	      if (standardName !== name) {
	        error('Invalid DOM property `%s`. Did you mean `%s`?', name, standardName);

	        warnedProperties$1[name] = true;
	        return true;
	      }
	    } else if (!isReserved && name !== lowerCasedName) {
	      // Unknown attributes should have lowercase casing since that's how they
	      // will be cased anyway with server rendering.
	      error('React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.', name, lowerCasedName);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
	      if (value) {
	        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.', value, name, name, value, name);
	      } else {
	        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
	      }

	      warnedProperties$1[name] = true;
	      return true;
	    } // Now that we've validated casing, do not validate
	    // data types for reserved props


	    if (isReserved) {
	      return true;
	    } // Warn when a known attribute is a bad type


	    if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
	      warnedProperties$1[name] = true;
	      return false;
	    } // Warn when passing the strings 'false' or 'true' into a boolean prop


	    if ((value === 'false' || value === 'true') && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
	      error('Received the string `%s` for the boolean attribute `%s`. ' + '%s ' + 'Did you mean %s={%s}?', value, name, value === 'false' ? 'The browser will interpret it as a truthy value.' : 'Although this works, it will not work as expected if you pass the string "false".', name, value);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    return true;
	  };
	}

	var warnUnknownProperties = function (type, props, eventRegistry) {
	  {
	    var unknownProps = [];

	    for (var key in props) {
	      var isValid = validateProperty$1(type, key, props[key], eventRegistry);

	      if (!isValid) {
	        unknownProps.push(key);
	      }
	    }

	    var unknownPropString = unknownProps.map(function (prop) {
	      return '`' + prop + '`';
	    }).join(', ');

	    if (unknownProps.length === 1) {
	      error('Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
	    } else if (unknownProps.length > 1) {
	      error('Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
	    }
	  }
	};

	function validateProperties$2(type, props, eventRegistry) {
	  if (isCustomComponent(type, props)) {
	    return;
	  }

	  warnUnknownProperties(type, props, eventRegistry);
	}

	var warnValidStyle = function () {};

	{
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
	  var msPattern = /^-ms-/;
	  var hyphenPattern = /-(.)/g; // style values shouldn't contain a semicolon

	  var badStyleValueWithSemicolonPattern = /;\s*$/;
	  var warnedStyleNames = {};
	  var warnedStyleValues = {};
	  var warnedForNaNValue = false;
	  var warnedForInfinityValue = false;

	  var camelize = function (string) {
	    return string.replace(hyphenPattern, function (_, character) {
	      return character.toUpperCase();
	    });
	  };

	  var warnHyphenatedStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;

	    error('Unsupported style property %s. Did you mean %s?', name, // As Andi Smith suggests
	    // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	    // is converted to lowercase `ms`.
	    camelize(name.replace(msPattern, 'ms-')));
	  };

	  var warnBadVendoredStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;

	    error('Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1));
	  };

	  var warnStyleValueWithSemicolon = function (name, value) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;

	    error("Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, ''));
	  };

	  var warnStyleValueIsNaN = function (name, value) {
	    if (warnedForNaNValue) {
	      return;
	    }

	    warnedForNaNValue = true;

	    error('`NaN` is an invalid value for the `%s` css style property.', name);
	  };

	  var warnStyleValueIsInfinity = function (name, value) {
	    if (warnedForInfinityValue) {
	      return;
	    }

	    warnedForInfinityValue = true;

	    error('`Infinity` is an invalid value for the `%s` css style property.', name);
	  };

	  warnValidStyle = function (name, value) {
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value);
	    }

	    if (typeof value === 'number') {
	      if (isNaN(value)) {
	        warnStyleValueIsNaN(name, value);
	      } else if (!isFinite(value)) {
	        warnStyleValueIsInfinity(name, value);
	      }
	    }
	  };
	}

	var warnValidStyle$1 = warnValidStyle;

	// code copied and modified from escape-html
	var matchHtmlRegExp = /["'&<>]/;
	/**
	 * Escapes special characters and HTML entities in a given html string.
	 *
	 * @param  {string} string HTML string to escape for later insertion
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  {
	    checkHtmlStringCoercion(string);
	  }

	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34:
	        // "
	        escape = '&quot;';
	        break;

	      case 38:
	        // &
	        escape = '&amp;';
	        break;

	      case 39:
	        // '
	        escape = '&#x27;'; // modified from escape-html; used to be '&#39'

	        break;

	      case 60:
	        // <
	        escape = '&lt;';
	        break;

	      case 62:
	        // >
	        escape = '&gt;';
	        break;

	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
	} // end code copied and modified from escape-html

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */


	function escapeTextForBrowser(text) {
	  if (typeof text === 'boolean' || typeof text === 'number') {
	    // this shortcircuit helps perf for types that we know will never have
	    // special characters, especially given that this function is used often
	    // for numeric dom ids.
	    return '' + text;
	  }

	  return escapeHtml(text);
	}

	var uppercasePattern = /([A-Z])/g;
	var msPattern$1 = /^ms-/;
	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 */

	function hyphenateStyleName(name) {
	  return name.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern$1, '-ms-');
	}

	// and any newline or tab are filtered out as if they're not part of the URL.
	// https://url.spec.whatwg.org/#url-parsing
	// Tab or newline are defined as \r\n\t:
	// https://infra.spec.whatwg.org/#ascii-tab-or-newline
	// A C0 control is a code point in the range \u0000 NULL to \u001F
	// INFORMATION SEPARATOR ONE, inclusive:
	// https://infra.spec.whatwg.org/#c0-control-or-space

	/* eslint-disable max-len */

	var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
	var didWarn = false;

	function sanitizeURL(url) {
	  {
	    if (!didWarn && isJavaScriptProtocol.test(url)) {
	      didWarn = true;

	      error('A future version of React will block javascript: URLs as a security precaution. ' + 'Use event handlers instead if you can. If you need to generate unsafe HTML try ' + 'using dangerouslySetInnerHTML instead. React was passed %s.', JSON.stringify(url));
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	var startInlineScript = stringToPrecomputedChunk('<script>');
	var endInlineScript = stringToPrecomputedChunk('</script>');
	var startScriptSrc = stringToPrecomputedChunk('<script src="');
	var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
	var endAsyncScript = stringToPrecomputedChunk('" async=""></script>'); // Allows us to keep track of what we've already written so we can refer back to it.

	function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
	  var idPrefix = identifierPrefix === undefined ? '' : identifierPrefix;
	  var inlineScriptWithNonce = nonce === undefined ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
	  var bootstrapChunks = [];

	  if (bootstrapScriptContent !== undefined) {
	    bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeTextForBrowser(bootstrapScriptContent)), endInlineScript);
	  }

	  if (bootstrapScripts !== undefined) {
	    for (var i = 0; i < bootstrapScripts.length; i++) {
	      bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
	    }
	  }

	  if (bootstrapModules !== undefined) {
	    for (var _i = 0; _i < bootstrapModules.length; _i++) {
	      bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
	    }
	  }

	  return {
	    bootstrapChunks: bootstrapChunks,
	    startInlineScript: inlineScriptWithNonce,
	    placeholderPrefix: stringToPrecomputedChunk(idPrefix + 'P:'),
	    segmentPrefix: stringToPrecomputedChunk(idPrefix + 'S:'),
	    boundaryPrefix: idPrefix + 'B:',
	    idPrefix: idPrefix,
	    nextSuspenseID: 0,
	    sentCompleteSegmentFunction: false,
	    sentCompleteBoundaryFunction: false,
	    sentClientRenderFunction: false
	  };
	} // Constants for the insertion mode we're currently writing in. We don't encode all HTML5 insertion
	// modes. We only include the variants as they matter for the sake of our purposes.
	// We don't actually provide the namespace therefore we use constants instead of the string.

	var ROOT_HTML_MODE = 0; // Used for the root most element tag.

	var HTML_MODE = 1;
	var SVG_MODE = 2;
	var MATHML_MODE = 3;
	var HTML_TABLE_MODE = 4;
	var HTML_TABLE_BODY_MODE = 5;
	var HTML_TABLE_ROW_MODE = 6;
	var HTML_COLGROUP_MODE = 7; // We have a greater than HTML_TABLE_MODE check elsewhere. If you add more cases here, make sure it
	// still makes sense

	function createFormatContext(insertionMode, selectedValue) {
	  return {
	    insertionMode: insertionMode,
	    selectedValue: selectedValue
	  };
	}
	function getChildFormatContext(parentContext, type, props) {
	  switch (type) {
	    case 'select':
	      return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);

	    case 'svg':
	      return createFormatContext(SVG_MODE, null);

	    case 'math':
	      return createFormatContext(MATHML_MODE, null);

	    case 'foreignObject':
	      return createFormatContext(HTML_MODE, null);
	    // Table parents are special in that their children can only be created at all if they're
	    // wrapped in a table parent. So we need to encode that we're entering this mode.

	    case 'table':
	      return createFormatContext(HTML_TABLE_MODE, null);

	    case 'thead':
	    case 'tbody':
	    case 'tfoot':
	      return createFormatContext(HTML_TABLE_BODY_MODE, null);

	    case 'colgroup':
	      return createFormatContext(HTML_COLGROUP_MODE, null);

	    case 'tr':
	      return createFormatContext(HTML_TABLE_ROW_MODE, null);
	  }

	  if (parentContext.insertionMode >= HTML_TABLE_MODE) {
	    // Whatever tag this was, it wasn't a table parent or other special parent, so we must have
	    // entered plain HTML again.
	    return createFormatContext(HTML_MODE, null);
	  }

	  if (parentContext.insertionMode === ROOT_HTML_MODE) {
	    // We've emitted the root and is now in plain HTML mode.
	    return createFormatContext(HTML_MODE, null);
	  }

	  return parentContext;
	}
	var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
	function assignSuspenseBoundaryID(responseState) {
	  var generatedID = responseState.nextSuspenseID++;
	  return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
	}
	function makeId(responseState, treeId, localId) {
	  var idPrefix = responseState.idPrefix;
	  var id = ':' + idPrefix + 'R' + treeId; // Unless this is the first id at this level, append a number at the end
	  // that represents the position of this useId hook among all the useId
	  // hooks for this fiber.

	  if (localId > 0) {
	    id += 'H' + localId.toString(32);
	  }

	  return id + ':';
	}

	function encodeHTMLTextNode(text) {
	  return escapeTextForBrowser(text);
	}

	var textSeparator = stringToPrecomputedChunk('<!-- -->');
	function pushTextInstance(target, text, responseState) {
	  if (text === '') {
	    // Empty text doesn't have a DOM node representation and the hydration is aware of this.
	    return;
	  } // TODO: Avoid adding a text separator in common cases.


	  target.push(stringToChunk(encodeHTMLTextNode(text)), textSeparator);
	}
	var styleNameCache = new Map();

	function processStyleName(styleName) {
	  var chunk = styleNameCache.get(styleName);

	  if (chunk !== undefined) {
	    return chunk;
	  }

	  var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
	  styleNameCache.set(styleName, result);
	  return result;
	}

	var styleAttributeStart = stringToPrecomputedChunk(' style="');
	var styleAssign = stringToPrecomputedChunk(':');
	var styleSeparator = stringToPrecomputedChunk(';');

	function pushStyle(target, responseState, style) {
	  if (typeof style !== 'object') {
	    throw new Error('The `style` prop expects a mapping from style properties to values, ' + "not a string. For example, style={{marginRight: spacing + 'em'}} when " + 'using JSX.');
	  }

	  var isFirst = true;

	  for (var styleName in style) {
	    if (!hasOwnProperty.call(style, styleName)) {
	      continue;
	    } // If you provide unsafe user data here they can inject arbitrary CSS
	    // which may be problematic (I couldn't repro this):
	    // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	    // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	    // This is not an XSS hole but instead a potential CSS injection issue
	    // which has lead to a greater discussion about how we're going to
	    // trust URLs moving forward. See #2115901


	    var styleValue = style[styleName];

	    if (styleValue == null || typeof styleValue === 'boolean' || styleValue === '') {
	      // TODO: We used to set empty string as a style with an empty value. Does that ever make sense?
	      continue;
	    }

	    var nameChunk = void 0;
	    var valueChunk = void 0;
	    var isCustomProperty = styleName.indexOf('--') === 0;

	    if (isCustomProperty) {
	      nameChunk = stringToChunk(escapeTextForBrowser(styleName));

	      {
	        checkCSSPropertyStringCoercion(styleValue, styleName);
	      }

	      valueChunk = stringToChunk(escapeTextForBrowser(('' + styleValue).trim()));
	    } else {
	      {
	        warnValidStyle$1(styleName, styleValue);
	      }

	      nameChunk = processStyleName(styleName);

	      if (typeof styleValue === 'number') {
	        if (styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName)) {
	          valueChunk = stringToChunk(styleValue + 'px'); // Presumes implicit 'px' suffix for unitless numbers
	        } else {
	          valueChunk = stringToChunk('' + styleValue);
	        }
	      } else {
	        {
	          checkCSSPropertyStringCoercion(styleValue, styleName);
	        }

	        valueChunk = stringToChunk(escapeTextForBrowser(('' + styleValue).trim()));
	      }
	    }

	    if (isFirst) {
	      isFirst = false; // If it's first, we don't need any separators prefixed.

	      target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
	    } else {
	      target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
	    }
	  }

	  if (!isFirst) {
	    target.push(attributeEnd);
	  }
	}

	var attributeSeparator = stringToPrecomputedChunk(' ');
	var attributeAssign = stringToPrecomputedChunk('="');
	var attributeEnd = stringToPrecomputedChunk('"');
	var attributeEmptyString = stringToPrecomputedChunk('=""');

	function pushAttribute(target, responseState, name, value) {
	  switch (name) {
	    case 'style':
	      {
	        pushStyle(target, responseState, value);
	        return;
	      }

	    case 'defaultValue':
	    case 'defaultChecked': // These shouldn't be set as attributes on generic HTML elements.

	    case 'innerHTML': // Must use dangerouslySetInnerHTML instead.

	    case 'suppressContentEditableWarning':
	    case 'suppressHydrationWarning':
	      // Ignored. These are built-in to React on the client.
	      return;
	  }

	  if ( // shouldIgnoreAttribute
	  // We have already filtered out null/undefined and reserved words.
	  name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
	    return;
	  }

	  var propertyInfo = getPropertyInfo(name);

	  if (propertyInfo !== null) {
	    // shouldRemoveAttribute
	    switch (typeof value) {
	      case 'function': // $FlowIssue symbol is perfectly valid here

	      case 'symbol':
	        // eslint-disable-line
	        return;

	      case 'boolean':
	        {
	          if (!propertyInfo.acceptsBooleans) {
	            return;
	          }
	        }
	    }

	    var attributeName = propertyInfo.attributeName;
	    var attributeNameChunk = stringToChunk(attributeName); // TODO: If it's known we can cache the chunk.

	    switch (propertyInfo.type) {
	      case BOOLEAN:
	        if (value) {
	          target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
	        }

	        return;

	      case OVERLOADED_BOOLEAN:
	        if (value === true) {
	          target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
	        } else if (value === false) ; else {
	          target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	        }

	        return;

	      case NUMERIC:
	        if (!isNaN(value)) {
	          target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	        }

	        break;

	      case POSITIVE_NUMERIC:
	        if (!isNaN(value) && value >= 1) {
	          target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	        }

	        break;

	      default:
	        if (propertyInfo.sanitizeURL) {
	          {
	            checkAttributeStringCoercion(value, attributeName);
	          }

	          value = '' + value;
	          sanitizeURL(value);
	        }

	        target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	    }
	  } else if (isAttributeNameSafe(name)) {
	    // shouldRemoveAttribute
	    switch (typeof value) {
	      case 'function': // $FlowIssue symbol is perfectly valid here

	      case 'symbol':
	        // eslint-disable-line
	        return;

	      case 'boolean':
	        {
	          var prefix = name.toLowerCase().slice(0, 5);

	          if (prefix !== 'data-' && prefix !== 'aria-') {
	            return;
	          }
	        }
	    }

	    target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	  }
	}

	var endOfStartTag = stringToPrecomputedChunk('>');
	var endOfStartTagSelfClosing = stringToPrecomputedChunk('/>');

	function pushInnerHTML(target, innerHTML, children) {
	  if (innerHTML != null) {
	    if (children != null) {
	      throw new Error('Can only set one of `children` or `props.dangerouslySetInnerHTML`.');
	    }

	    if (typeof innerHTML !== 'object' || !('__html' in innerHTML)) {
	      throw new Error('`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://reactjs.org/link/dangerously-set-inner-html ' + 'for more information.');
	    }

	    var html = innerHTML.__html;

	    if (html !== null && html !== undefined) {
	      {
	        checkHtmlStringCoercion(html);
	      }

	      target.push(stringToChunk('' + html));
	    }
	  }
	} // TODO: Move these to ResponseState so that we warn for every request.
	// It would help debugging in stateful servers (e.g. service worker).


	var didWarnDefaultInputValue = false;
	var didWarnDefaultChecked = false;
	var didWarnDefaultSelectValue = false;
	var didWarnDefaultTextareaValue = false;
	var didWarnInvalidOptionChildren = false;
	var didWarnInvalidOptionInnerHTML = false;
	var didWarnSelectedSetOnOption = false;

	function checkSelectProp(props, propName) {
	  {
	    var value = props[propName];

	    if (value != null) {
	      var array = isArray(value);

	      if (props.multiple && !array) {
	        error('The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.', propName);
	      } else if (!props.multiple && array) {
	        error('The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.', propName);
	      }
	    }
	  }
	}

	function pushStartSelect(target, props, responseState) {
	  {
	    checkControlledValueProps('select', props);
	    checkSelectProp(props, 'value');
	    checkSelectProp(props, 'defaultValue');

	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
	      error('Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');

	      didWarnDefaultSelectValue = true;
	    }
	  }

	  target.push(startChunkForTag('select'));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          // TODO: This doesn't really make sense for select since it can't use the controlled
	          // value in the innerHTML.
	          innerHTML = propValue;
	          break;

	        case 'defaultValue':
	        case 'value':
	          // These are set on the Context instead and applied to the nested options.
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);
	  return children;
	}

	function flattenOptionChildren(children) {
	  var content = ''; // Flatten children and warn if they aren't strings or numbers;
	  // invalid types are ignored.

	  React.Children.forEach(children, function (child) {
	    if (child == null) {
	      return;
	    }

	    content += child;

	    {
	      if (!didWarnInvalidOptionChildren && typeof child !== 'string' && typeof child !== 'number') {
	        didWarnInvalidOptionChildren = true;

	        error('Cannot infer the option value of complex children. ' + 'Pass a `value` prop or use a plain string as children to <option>.');
	      }
	    }
	  });
	  return content;
	}

	var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');

	function pushStartOption(target, props, responseState, formatContext) {
	  var selectedValue = formatContext.selectedValue;
	  target.push(startChunkForTag('option'));
	  var children = null;
	  var value = null;
	  var selected = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'selected':
	          // ignore
	          selected = propValue;

	          {
	            // TODO: Remove support for `selected` in <option>.
	            if (!didWarnSelectedSetOnOption) {
	              error('Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');

	              didWarnSelectedSetOnOption = true;
	            }
	          }

	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;
	        // eslint-disable-next-line-no-fallthrough

	        case 'value':
	          value = propValue;
	        // We intentionally fallthrough to also set the attribute on the node.
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  if (selectedValue != null) {
	    var stringValue;

	    if (value !== null) {
	      {
	        checkAttributeStringCoercion(value, 'value');
	      }

	      stringValue = '' + value;
	    } else {
	      {
	        if (innerHTML !== null) {
	          if (!didWarnInvalidOptionInnerHTML) {
	            didWarnInvalidOptionInnerHTML = true;

	            error('Pass a `value` prop if you set dangerouslyInnerHTML so React knows ' + 'which value should be selected.');
	          }
	        }
	      }

	      stringValue = flattenOptionChildren(children);
	    }

	    if (isArray(selectedValue)) {
	      // multiple
	      for (var i = 0; i < selectedValue.length; i++) {
	        {
	          checkAttributeStringCoercion(selectedValue[i], 'value');
	        }

	        var v = '' + selectedValue[i];

	        if (v === stringValue) {
	          target.push(selectedMarkerAttribute);
	          break;
	        }
	      }
	    } else {
	      {
	        checkAttributeStringCoercion(selectedValue, 'select.value');
	      }

	      if ('' + selectedValue === stringValue) {
	        target.push(selectedMarkerAttribute);
	      }
	    }
	  } else if (selected) {
	    target.push(selectedMarkerAttribute);
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);
	  return children;
	}

	function pushInput(target, props, responseState) {
	  {
	    checkControlledValueProps('input', props);

	    if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
	      error('%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);

	      didWarnDefaultChecked = true;
	    }

	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
	      error('%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);

	      didWarnDefaultInputValue = true;
	    }
	  }

	  target.push(startChunkForTag('input'));
	  var value = null;
	  var defaultValue = null;
	  var checked = null;
	  var defaultChecked = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	        case 'dangerouslySetInnerHTML':
	          throw new Error('input' + " is a self-closing tag and must neither have `children` nor " + 'use `dangerouslySetInnerHTML`.');
	        // eslint-disable-next-line-no-fallthrough

	        case 'defaultChecked':
	          defaultChecked = propValue;
	          break;

	        case 'defaultValue':
	          defaultValue = propValue;
	          break;

	        case 'checked':
	          checked = propValue;
	          break;

	        case 'value':
	          value = propValue;
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  if (checked !== null) {
	    pushAttribute(target, responseState, 'checked', checked);
	  } else if (defaultChecked !== null) {
	    pushAttribute(target, responseState, 'checked', defaultChecked);
	  }

	  if (value !== null) {
	    pushAttribute(target, responseState, 'value', value);
	  } else if (defaultValue !== null) {
	    pushAttribute(target, responseState, 'value', defaultValue);
	  }

	  target.push(endOfStartTagSelfClosing);
	  return null;
	}

	function pushStartTextArea(target, props, responseState) {
	  {
	    checkControlledValueProps('textarea', props);

	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
	      error('Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');

	      didWarnDefaultTextareaValue = true;
	    }
	  }

	  target.push(startChunkForTag('textarea'));
	  var value = null;
	  var defaultValue = null;
	  var children = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'value':
	          value = propValue;
	          break;

	        case 'defaultValue':
	          defaultValue = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          throw new Error('`dangerouslySetInnerHTML` does not make sense on <textarea>.');
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  if (value === null && defaultValue !== null) {
	    value = defaultValue;
	  }

	  target.push(endOfStartTag); // TODO (yungsters): Remove support for children content in <textarea>.

	  if (children != null) {
	    {
	      error('Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
	    }

	    if (value != null) {
	      throw new Error('If you supply `defaultValue` on a <textarea>, do not pass children.');
	    }

	    if (isArray(children)) {
	      if (children.length > 1) {
	        throw new Error('<textarea> can only have at most one child.');
	      } // TODO: remove the coercion and the DEV check below because it will
	      // always be overwritten by the coercion several lines below it. #22309


	      {
	        checkHtmlStringCoercion(children[0]);
	      }

	      value = '' + children[0];
	    }

	    {
	      checkHtmlStringCoercion(children);
	    }

	    value = '' + children;
	  }

	  if (typeof value === 'string' && value[0] === '\n') {
	    // text/html ignores the first character in these tags if it's a newline
	    // Prefer to break application/xml over text/html (for now) by adding
	    // a newline specifically to get eaten by the parser. (Alternately for
	    // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	    // \r is normalized out by HTMLTextAreaElement#value.)
	    // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	    // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	    // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	    // See: Parsing of "textarea" "listing" and "pre" elements
	    //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	    target.push(leadingNewline);
	  } // ToString and push directly instead of recurse over children.
	  // We don't really support complex children in the value anyway.
	  // This also currently avoids a trailing comment node which breaks textarea.


	  if (value !== null) {
	    {
	      checkAttributeStringCoercion(value, 'value');
	    }

	    target.push(stringToChunk(encodeHTMLTextNode('' + value)));
	  }

	  return null;
	}

	function pushSelfClosing(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	        case 'dangerouslySetInnerHTML':
	          throw new Error(tag + " is a self-closing tag and must neither have `children` nor " + 'use `dangerouslySetInnerHTML`.');
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTagSelfClosing);
	  return null;
	}

	function pushStartMenuItem(target, props, responseState) {
	  target.push(startChunkForTag('menuitem'));

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	        case 'dangerouslySetInnerHTML':
	          throw new Error('menuitems cannot have `children` nor `dangerouslySetInnerHTML`.');
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  return null;
	}

	function pushStartGenericElement(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);

	  if (typeof children === 'string') {
	    // Special case children as a string to avoid the unnecessary comment.
	    // TODO: Remove this special case after the general optimization is in place.
	    target.push(stringToChunk(encodeHTMLTextNode(children)));
	    return null;
	  }

	  return children;
	}

	function pushStartCustomElement(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;

	        case 'style':
	          pushStyle(target, responseState, propValue);
	          break;

	        case 'suppressContentEditableWarning':
	        case 'suppressHydrationWarning':
	          // Ignored. These are built-in to React on the client.
	          break;

	        default:
	          if (isAttributeNameSafe(propKey) && typeof propValue !== 'function' && typeof propValue !== 'symbol') {
	            target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
	          }

	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);
	  return children;
	}

	var leadingNewline = stringToPrecomputedChunk('\n');

	function pushStartPreformattedElement(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag); // text/html ignores the first character in these tags if it's a newline
	  // Prefer to break application/xml over text/html (for now) by adding
	  // a newline specifically to get eaten by the parser. (Alternately for
	  // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	  // \r is normalized out by HTMLTextAreaElement#value.)
	  // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	  // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	  // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	  // See: Parsing of "textarea" "listing" and "pre" elements
	  //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	  // TODO: This doesn't deal with the case where the child is an array
	  // or component that returns a string.

	  if (innerHTML != null) {
	    if (children != null) {
	      throw new Error('Can only set one of `children` or `props.dangerouslySetInnerHTML`.');
	    }

	    if (typeof innerHTML !== 'object' || !('__html' in innerHTML)) {
	      throw new Error('`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://reactjs.org/link/dangerously-set-inner-html ' + 'for more information.');
	    }

	    var html = innerHTML.__html;

	    if (html !== null && html !== undefined) {
	      if (typeof html === 'string' && html.length > 0 && html[0] === '\n') {
	        target.push(leadingNewline, stringToChunk(html));
	      } else {
	        {
	          checkHtmlStringCoercion(html);
	        }

	        target.push(stringToChunk('' + html));
	      }
	    }
	  }

	  if (typeof children === 'string' && children[0] === '\n') {
	    target.push(leadingNewline);
	  }

	  return children;
	} // We accept any tag to be rendered but since this gets injected into arbitrary
	// HTML, we want to make sure that it's a safe tag.
	// http://www.w3.org/TR/REC-xml/#NT-Name


	var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset

	var validatedTagCache = new Map();

	function startChunkForTag(tag) {
	  var tagStartChunk = validatedTagCache.get(tag);

	  if (tagStartChunk === undefined) {
	    if (!VALID_TAG_REGEX.test(tag)) {
	      throw new Error("Invalid tag: " + tag);
	    }

	    tagStartChunk = stringToPrecomputedChunk('<' + tag);
	    validatedTagCache.set(tag, tagStartChunk);
	  }

	  return tagStartChunk;
	}

	var DOCTYPE = stringToPrecomputedChunk('<!DOCTYPE html>');
	function pushStartInstance(target, type, props, responseState, formatContext) {
	  {
	    validateProperties(type, props);
	    validateProperties$1(type, props);
	    validateProperties$2(type, props, null);

	    if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
	      error('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
	    }

	    if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
	      if (type.indexOf('-') === -1 && typeof props.is !== 'string' && type.toLowerCase() !== type) {
	        error('<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', type);
	      }
	    }
	  }

	  switch (type) {
	    // Special tags
	    case 'select':
	      return pushStartSelect(target, props, responseState);

	    case 'option':
	      return pushStartOption(target, props, responseState, formatContext);

	    case 'textarea':
	      return pushStartTextArea(target, props, responseState);

	    case 'input':
	      return pushInput(target, props, responseState);

	    case 'menuitem':
	      return pushStartMenuItem(target, props, responseState);
	    // Newline eating tags

	    case 'listing':
	    case 'pre':
	      {
	        return pushStartPreformattedElement(target, props, type, responseState);
	      }
	    // Omitted close tags

	    case 'area':
	    case 'base':
	    case 'br':
	    case 'col':
	    case 'embed':
	    case 'hr':
	    case 'img':
	    case 'keygen':
	    case 'link':
	    case 'meta':
	    case 'param':
	    case 'source':
	    case 'track':
	    case 'wbr':
	      {
	        return pushSelfClosing(target, props, type, responseState);
	      }
	    // These are reserved SVG and MathML elements, that are never custom elements.
	    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts

	    case 'annotation-xml':
	    case 'color-profile':
	    case 'font-face':
	    case 'font-face-src':
	    case 'font-face-uri':
	    case 'font-face-format':
	    case 'font-face-name':
	    case 'missing-glyph':
	      {
	        return pushStartGenericElement(target, props, type, responseState);
	      }

	    case 'html':
	      {
	        if (formatContext.insertionMode === ROOT_HTML_MODE) {
	          // If we're rendering the html tag and we're at the root (i.e. not in foreignObject)
	          // then we also emit the DOCTYPE as part of the root content as a convenience for
	          // rendering the whole document.
	          target.push(DOCTYPE);
	        }

	        return pushStartGenericElement(target, props, type, responseState);
	      }

	    default:
	      {
	        if (type.indexOf('-') === -1 && typeof props.is !== 'string') {
	          // Generic element
	          return pushStartGenericElement(target, props, type, responseState);
	        } else {
	          // Custom element
	          return pushStartCustomElement(target, props, type, responseState);
	        }
	      }
	  }
	}
	var endTag1 = stringToPrecomputedChunk('</');
	var endTag2 = stringToPrecomputedChunk('>');
	function pushEndInstance(target, type, props) {
	  switch (type) {
	    // Omitted close tags
	    // TODO: Instead of repeating this switch we could try to pass a flag from above.
	    // That would require returning a tuple. Which might be ok if it gets inlined.
	    case 'area':
	    case 'base':
	    case 'br':
	    case 'col':
	    case 'embed':
	    case 'hr':
	    case 'img':
	    case 'input':
	    case 'keygen':
	    case 'link':
	    case 'meta':
	    case 'param':
	    case 'source':
	    case 'track':
	    case 'wbr':
	      {
	        // No close tag needed.
	        break;
	      }

	    default:
	      {
	        target.push(endTag1, stringToChunk(type), endTag2);
	      }
	  }
	}
	function writeCompletedRoot(destination, responseState) {
	  var bootstrapChunks = responseState.bootstrapChunks;
	  var i = 0;

	  for (; i < bootstrapChunks.length - 1; i++) {
	    writeChunk(destination, bootstrapChunks[i]);
	  }

	  if (i < bootstrapChunks.length) {
	    return writeChunkAndReturn(destination, bootstrapChunks[i]);
	  }

	  return true;
	} // Structural Nodes
	// A placeholder is a node inside a hidden partial tree that can be filled in later, but before
	// display. It's never visible to users. We use the template tag because it can be used in every
	// type of parent. <script> tags also work in every other tag except <colgroup>.

	var placeholder1 = stringToPrecomputedChunk('<template id="');
	var placeholder2 = stringToPrecomputedChunk('"></template>');
	function writePlaceholder(destination, responseState, id) {
	  writeChunk(destination, placeholder1);
	  writeChunk(destination, responseState.placeholderPrefix);
	  var formattedID = stringToChunk(id.toString(16));
	  writeChunk(destination, formattedID);
	  return writeChunkAndReturn(destination, placeholder2);
	} // Suspense boundaries are encoded as comments.

	var startCompletedSuspenseBoundary = stringToPrecomputedChunk('<!--$-->');
	var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
	var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
	var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk('<!--$!-->');
	var endSuspenseBoundary = stringToPrecomputedChunk('<!--/$-->');
	function writeStartCompletedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
	}
	function writeStartPendingSuspenseBoundary(destination, responseState, id) {
	  writeChunk(destination, startPendingSuspenseBoundary1);

	  if (id === null) {
	    throw new Error('An ID must have been assigned before we can complete the boundary.');
	  }

	  writeChunk(destination, id);
	  return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
	}
	function writeStartClientRenderedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
	}
	function writeEndCompletedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, endSuspenseBoundary);
	}
	function writeEndPendingSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, endSuspenseBoundary);
	}
	function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, endSuspenseBoundary);
	}
	var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
	var startSegmentHTML2 = stringToPrecomputedChunk('">');
	var endSegmentHTML = stringToPrecomputedChunk('</div>');
	var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
	var startSegmentSVG2 = stringToPrecomputedChunk('">');
	var endSegmentSVG = stringToPrecomputedChunk('</svg>');
	var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
	var startSegmentMathML2 = stringToPrecomputedChunk('">');
	var endSegmentMathML = stringToPrecomputedChunk('</math>');
	var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
	var startSegmentTable2 = stringToPrecomputedChunk('">');
	var endSegmentTable = stringToPrecomputedChunk('</table>');
	var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
	var startSegmentTableBody2 = stringToPrecomputedChunk('">');
	var endSegmentTableBody = stringToPrecomputedChunk('</tbody></table>');
	var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
	var startSegmentTableRow2 = stringToPrecomputedChunk('">');
	var endSegmentTableRow = stringToPrecomputedChunk('</tr></table>');
	var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
	var startSegmentColGroup2 = stringToPrecomputedChunk('">');
	var endSegmentColGroup = stringToPrecomputedChunk('</colgroup></table>');
	function writeStartSegment(destination, responseState, formatContext, id) {
	  switch (formatContext.insertionMode) {
	    case ROOT_HTML_MODE:
	    case HTML_MODE:
	      {
	        writeChunk(destination, startSegmentHTML);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentHTML2);
	      }

	    case SVG_MODE:
	      {
	        writeChunk(destination, startSegmentSVG);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentSVG2);
	      }

	    case MATHML_MODE:
	      {
	        writeChunk(destination, startSegmentMathML);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentMathML2);
	      }

	    case HTML_TABLE_MODE:
	      {
	        writeChunk(destination, startSegmentTable);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentTable2);
	      }
	    // TODO: For the rest of these, there will be extra wrapper nodes that never
	    // get deleted from the document. We need to delete the table too as part
	    // of the injected scripts. They are invisible though so it's not too terrible
	    // and it's kind of an edge case to suspend in a table. Totally supported though.

	    case HTML_TABLE_BODY_MODE:
	      {
	        writeChunk(destination, startSegmentTableBody);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentTableBody2);
	      }

	    case HTML_TABLE_ROW_MODE:
	      {
	        writeChunk(destination, startSegmentTableRow);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentTableRow2);
	      }

	    case HTML_COLGROUP_MODE:
	      {
	        writeChunk(destination, startSegmentColGroup);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentColGroup2);
	      }

	    default:
	      {
	        throw new Error('Unknown insertion mode. This is a bug in React.');
	      }
	  }
	}
	function writeEndSegment(destination, formatContext) {
	  switch (formatContext.insertionMode) {
	    case ROOT_HTML_MODE:
	    case HTML_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentHTML);
	      }

	    case SVG_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentSVG);
	      }

	    case MATHML_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentMathML);
	      }

	    case HTML_TABLE_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentTable);
	      }

	    case HTML_TABLE_BODY_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentTableBody);
	      }

	    case HTML_TABLE_ROW_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentTableRow);
	      }

	    case HTML_COLGROUP_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentColGroup);
	      }

	    default:
	      {
	        throw new Error('Unknown insertion mode. This is a bug in React.');
	      }
	  }
	} // Instruction Set
	// The following code is the source scripts that we then minify and inline below,
	// with renamed function names that we hope don't collide:
	// const COMMENT_NODE = 8;
	// const SUSPENSE_START_DATA = '$';
	// const SUSPENSE_END_DATA = '/$';
	// const SUSPENSE_PENDING_START_DATA = '$?';
	// const SUSPENSE_FALLBACK_START_DATA = '$!';
	//
	// function clientRenderBoundary(suspenseBoundaryID) {
	//   // Find the fallback's first element.
	//   const suspenseIdNode = document.getElementById(suspenseBoundaryID);
	//   if (!suspenseIdNode) {
	//     // The user must have already navigated away from this tree.
	//     // E.g. because the parent was hydrated.
	//     return;
	//   }
	//   // Find the boundary around the fallback. This is always the previous node.
	//   const suspenseNode = suspenseIdNode.previousSibling;
	//   // Tag it to be client rendered.
	//   suspenseNode.data = SUSPENSE_FALLBACK_START_DATA;
	//   // Tell React to retry it if the parent already hydrated.
	//   if (suspenseNode._reactRetry) {
	//     suspenseNode._reactRetry();
	//   }
	// }
	//
	// function completeBoundary(suspenseBoundaryID, contentID) {
	//   // Find the fallback's first element.
	//   const suspenseIdNode = document.getElementById(suspenseBoundaryID);
	//   const contentNode = document.getElementById(contentID);
	//   // We'll detach the content node so that regardless of what happens next we don't leave in the tree.
	//   // This might also help by not causing recalcing each time we move a child from here to the target.
	//   contentNode.parentNode.removeChild(contentNode);
	//   if (!suspenseIdNode) {
	//     // The user must have already navigated away from this tree.
	//     // E.g. because the parent was hydrated. That's fine there's nothing to do
	//     // but we have to make sure that we already deleted the container node.
	//     return;
	//   }
	//   // Find the boundary around the fallback. This is always the previous node.
	//   const suspenseNode = suspenseIdNode.previousSibling;
	//
	//   // Clear all the existing children. This is complicated because
	//   // there can be embedded Suspense boundaries in the fallback.
	//   // This is similar to clearSuspenseBoundary in ReactDOMHostConfig.
	//   // TODO: We could avoid this if we never emitted suspense boundaries in fallback trees.
	//   // They never hydrate anyway. However, currently we support incrementally loading the fallback.
	//   const parentInstance = suspenseNode.parentNode;
	//   let node = suspenseNode.nextSibling;
	//   let depth = 0;
	//   do {
	//     if (node && node.nodeType === COMMENT_NODE) {
	//       const data = node.data;
	//       if (data === SUSPENSE_END_DATA) {
	//         if (depth === 0) {
	//           break;
	//         } else {
	//           depth--;
	//         }
	//       } else if (
	//         data === SUSPENSE_START_DATA ||
	//         data === SUSPENSE_PENDING_START_DATA ||
	//         data === SUSPENSE_FALLBACK_START_DATA
	//       ) {
	//         depth++;
	//       }
	//     }
	//
	//     const nextNode = node.nextSibling;
	//     parentInstance.removeChild(node);
	//     node = nextNode;
	//   } while (node);
	//
	//   const endOfBoundary = node;
	//
	//   // Insert all the children from the contentNode between the start and end of suspense boundary.
	//   while (contentNode.firstChild) {
	//     parentInstance.insertBefore(contentNode.firstChild, endOfBoundary);
	//   }
	//   suspenseNode.data = SUSPENSE_START_DATA;
	//   if (suspenseNode._reactRetry) {
	//     suspenseNode._reactRetry();
	//   }
	// }
	//
	// function completeSegment(containerID, placeholderID) {
	//   const segmentContainer = document.getElementById(containerID);
	//   const placeholderNode = document.getElementById(placeholderID);
	//   // We always expect both nodes to exist here because, while we might
	//   // have navigated away from the main tree, we still expect the detached
	//   // tree to exist.
	//   segmentContainer.parentNode.removeChild(segmentContainer);
	//   while (segmentContainer.firstChild) {
	//     placeholderNode.parentNode.insertBefore(
	//       segmentContainer.firstChild,
	//       placeholderNode,
	//     );
	//   }
	//   placeholderNode.parentNode.removeChild(placeholderNode);
	// }

	var completeSegmentFunction = 'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}';
	var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
	var clientRenderFunction = 'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()}';
	var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
	var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
	var completeSegmentScript2 = stringToPrecomputedChunk('","');
	var completeSegmentScript3 = stringToPrecomputedChunk('")</script>');
	function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
	  writeChunk(destination, responseState.startInlineScript);

	  if (!responseState.sentCompleteSegmentFunction) {
	    // The first time we write this, we'll need to include the full implementation.
	    responseState.sentCompleteSegmentFunction = true;
	    writeChunk(destination, completeSegmentScript1Full);
	  } else {
	    // Future calls can just reuse the same function.
	    writeChunk(destination, completeSegmentScript1Partial);
	  }

	  writeChunk(destination, responseState.segmentPrefix);
	  var formattedID = stringToChunk(contentSegmentID.toString(16));
	  writeChunk(destination, formattedID);
	  writeChunk(destination, completeSegmentScript2);
	  writeChunk(destination, responseState.placeholderPrefix);
	  writeChunk(destination, formattedID);
	  return writeChunkAndReturn(destination, completeSegmentScript3);
	}
	var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
	var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
	var completeBoundaryScript2 = stringToPrecomputedChunk('","');
	var completeBoundaryScript3 = stringToPrecomputedChunk('")</script>');
	function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
	  writeChunk(destination, responseState.startInlineScript);

	  if (!responseState.sentCompleteBoundaryFunction) {
	    // The first time we write this, we'll need to include the full implementation.
	    responseState.sentCompleteBoundaryFunction = true;
	    writeChunk(destination, completeBoundaryScript1Full);
	  } else {
	    // Future calls can just reuse the same function.
	    writeChunk(destination, completeBoundaryScript1Partial);
	  }

	  if (boundaryID === null) {
	    throw new Error('An ID must have been assigned before we can complete the boundary.');
	  }

	  var formattedContentID = stringToChunk(contentSegmentID.toString(16));
	  writeChunk(destination, boundaryID);
	  writeChunk(destination, completeBoundaryScript2);
	  writeChunk(destination, responseState.segmentPrefix);
	  writeChunk(destination, formattedContentID);
	  return writeChunkAndReturn(destination, completeBoundaryScript3);
	}
	var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
	var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
	var clientRenderScript2 = stringToPrecomputedChunk('")</script>');
	function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID) {
	  writeChunk(destination, responseState.startInlineScript);

	  if (!responseState.sentClientRenderFunction) {
	    // The first time we write this, we'll need to include the full implementation.
	    responseState.sentClientRenderFunction = true;
	    writeChunk(destination, clientRenderScript1Full);
	  } else {
	    // Future calls can just reuse the same function.
	    writeChunk(destination, clientRenderScript1Partial);
	  }

	  if (boundaryID === null) {
	    throw new Error('An ID must have been assigned before we can complete the boundary.');
	  }

	  writeChunk(destination, boundaryID);
	  return writeChunkAndReturn(destination, clientRenderScript2);
	}

	function createResponseState$1(generateStaticMarkup, identifierPrefix) {
	  var responseState = createResponseState(identifierPrefix, undefined);
	  return {
	    // Keep this in sync with ReactDOMServerFormatConfig
	    bootstrapChunks: responseState.bootstrapChunks,
	    startInlineScript: responseState.startInlineScript,
	    placeholderPrefix: responseState.placeholderPrefix,
	    segmentPrefix: responseState.segmentPrefix,
	    boundaryPrefix: responseState.boundaryPrefix,
	    idPrefix: responseState.idPrefix,
	    nextSuspenseID: responseState.nextSuspenseID,
	    sentCompleteSegmentFunction: responseState.sentCompleteSegmentFunction,
	    sentCompleteBoundaryFunction: responseState.sentCompleteBoundaryFunction,
	    sentClientRenderFunction: responseState.sentClientRenderFunction,
	    // This is an extra field for the legacy renderer
	    generateStaticMarkup: generateStaticMarkup
	  };
	}
	function createRootFormatContext() {
	  return {
	    insertionMode: HTML_MODE,
	    // We skip the root mode because we don't want to emit the DOCTYPE in legacy mode.
	    selectedValue: null
	  };
	}
	function pushTextInstance$1(target, text, responseState) {
	  if (responseState.generateStaticMarkup) {
	    target.push(stringToChunk(escapeTextForBrowser(text)));
	  } else {
	    pushTextInstance(target, text);
	  }
	}
	function writeStartCompletedSuspenseBoundary$1(destination, responseState) {
	  if (responseState.generateStaticMarkup) {
	    // A completed boundary is done and doesn't need a representation in the HTML
	    // if we're not going to be hydrating it.
	    return true;
	  }

	  return writeStartCompletedSuspenseBoundary(destination);
	}
	function writeStartClientRenderedSuspenseBoundary$1(destination, responseState) {
	  if (responseState.generateStaticMarkup) {
	    // A client rendered boundary is done and doesn't need a representation in the HTML
	    // since we'll never hydrate it. This is arguably an error in static generation.
	    return true;
	  }

	  return writeStartClientRenderedSuspenseBoundary(destination);
	}
	function writeEndCompletedSuspenseBoundary$1(destination, responseState) {
	  if (responseState.generateStaticMarkup) {
	    return true;
	  }

	  return writeEndCompletedSuspenseBoundary(destination);
	}
	function writeEndClientRenderedSuspenseBoundary$1(destination, responseState) {
	  if (responseState.generateStaticMarkup) {
	    return true;
	  }

	  return writeEndClientRenderedSuspenseBoundary(destination);
	}

	var assign = Object.assign;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_SCOPE_TYPE = Symbol.for('react.scope');
	var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
	var REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');
	var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for('react.default_value');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}

	function describeClassComponentFrame(ctor, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(ctor, true);
	  }
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var warnedAboutMissingGetChildContext;

	{
	  warnedAboutMissingGetChildContext = {};
	}

	var emptyContextObject = {};

	{
	  Object.freeze(emptyContextObject);
	}

	function getMaskedContext(type, unmaskedContext) {
	  {
	    var contextTypes = type.contextTypes;

	    if (!contextTypes) {
	      return emptyContextObject;
	    }

	    var context = {};

	    for (var key in contextTypes) {
	      context[key] = unmaskedContext[key];
	    }

	    {
	      var name = getComponentNameFromType(type) || 'Unknown';
	      checkPropTypes(contextTypes, context, 'context', name);
	    }

	    return context;
	  }
	}
	function processChildContext(instance, type, parentContext, childContextTypes) {
	  {
	    // TODO (bvaughn) Replace this behavior with an invariant() in the future.
	    // It has only been added in Fiber to match the (unintentional) behavior in Stack.
	    if (typeof instance.getChildContext !== 'function') {
	      {
	        var componentName = getComponentNameFromType(type) || 'Unknown';

	        if (!warnedAboutMissingGetChildContext[componentName]) {
	          warnedAboutMissingGetChildContext[componentName] = true;

	          error('%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
	        }
	      }

	      return parentContext;
	    }

	    var childContext = instance.getChildContext();

	    for (var contextKey in childContext) {
	      if (!(contextKey in childContextTypes)) {
	        throw new Error((getComponentNameFromType(type) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes.");
	      }
	    }

	    {
	      var name = getComponentNameFromType(type) || 'Unknown';
	      checkPropTypes(childContextTypes, childContext, 'child context', name);
	    }

	    return assign({}, parentContext, childContext);
	  }
	}

	var rendererSigil;

	{
	  // Use this to detect multiple renderers using the same context
	  rendererSigil = {};
	} // Used to store the parent path of all context overrides in a shared linked list.
	// Forming a reverse tree.


	var rootContextSnapshot = null; // We assume that this runtime owns the "current" field on all ReactContext instances.
	// This global (actually thread local) state represents what state all those "current",
	// fields are currently in.

	var currentActiveSnapshot = null;

	function popNode(prev) {
	  {
	    prev.context._currentValue2 = prev.parentValue;
	  }
	}

	function pushNode(next) {
	  {
	    next.context._currentValue2 = next.value;
	  }
	}

	function popToNearestCommonAncestor(prev, next) {
	  if (prev === next) ; else {
	    popNode(prev);
	    var parentPrev = prev.parent;
	    var parentNext = next.parent;

	    if (parentPrev === null) {
	      if (parentNext !== null) {
	        throw new Error('The stacks must reach the root at the same time. This is a bug in React.');
	      }
	    } else {
	      if (parentNext === null) {
	        throw new Error('The stacks must reach the root at the same time. This is a bug in React.');
	      }

	      popToNearestCommonAncestor(parentPrev, parentNext);
	    } // On the way back, we push the new ones that weren't common.


	    pushNode(next);
	  }
	}

	function popAllPrevious(prev) {
	  popNode(prev);
	  var parentPrev = prev.parent;

	  if (parentPrev !== null) {
	    popAllPrevious(parentPrev);
	  }
	}

	function pushAllNext(next) {
	  var parentNext = next.parent;

	  if (parentNext !== null) {
	    pushAllNext(parentNext);
	  }

	  pushNode(next);
	}

	function popPreviousToCommonLevel(prev, next) {
	  popNode(prev);
	  var parentPrev = prev.parent;

	  if (parentPrev === null) {
	    throw new Error('The depth must equal at least at zero before reaching the root. This is a bug in React.');
	  }

	  if (parentPrev.depth === next.depth) {
	    // We found the same level. Now we just need to find a shared ancestor.
	    popToNearestCommonAncestor(parentPrev, next);
	  } else {
	    // We must still be deeper.
	    popPreviousToCommonLevel(parentPrev, next);
	  }
	}

	function popNextToCommonLevel(prev, next) {
	  var parentNext = next.parent;

	  if (parentNext === null) {
	    throw new Error('The depth must equal at least at zero before reaching the root. This is a bug in React.');
	  }

	  if (prev.depth === parentNext.depth) {
	    // We found the same level. Now we just need to find a shared ancestor.
	    popToNearestCommonAncestor(prev, parentNext);
	  } else {
	    // We must still be deeper.
	    popNextToCommonLevel(prev, parentNext);
	  }

	  pushNode(next);
	} // Perform context switching to the new snapshot.
	// To make it cheap to read many contexts, while not suspending, we make the switch eagerly by
	// updating all the context's current values. That way reads, always just read the current value.
	// At the cost of updating contexts even if they're never read by this subtree.


	function switchContext(newSnapshot) {
	  // The basic algorithm we need to do is to pop back any contexts that are no longer on the stack.
	  // We also need to update any new contexts that are now on the stack with the deepest value.
	  // The easiest way to update new contexts is to just reapply them in reverse order from the
	  // perspective of the backpointers. To avoid allocating a lot when switching, we use the stack
	  // for that. Therefore this algorithm is recursive.
	  // 1) First we pop which ever snapshot tree was deepest. Popping old contexts as we go.
	  // 2) Then we find the nearest common ancestor from there. Popping old contexts as we go.
	  // 3) Then we reapply new contexts on the way back up the stack.
	  var prev = currentActiveSnapshot;
	  var next = newSnapshot;

	  if (prev !== next) {
	    if (prev === null) {
	      // $FlowFixMe: This has to be non-null since it's not equal to prev.
	      pushAllNext(next);
	    } else if (next === null) {
	      popAllPrevious(prev);
	    } else if (prev.depth === next.depth) {
	      popToNearestCommonAncestor(prev, next);
	    } else if (prev.depth > next.depth) {
	      popPreviousToCommonLevel(prev, next);
	    } else {
	      popNextToCommonLevel(prev, next);
	    }

	    currentActiveSnapshot = next;
	  }
	}
	function pushProvider(context, nextValue) {
	  var prevValue;

	  {
	    prevValue = context._currentValue2;
	    context._currentValue2 = nextValue;

	    {
	      if (context._currentRenderer2 !== undefined && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
	        error('Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.');
	      }

	      context._currentRenderer2 = rendererSigil;
	    }
	  }

	  var prevNode = currentActiveSnapshot;
	  var newNode = {
	    parent: prevNode,
	    depth: prevNode === null ? 0 : prevNode.depth + 1,
	    context: context,
	    parentValue: prevValue,
	    value: nextValue
	  };
	  currentActiveSnapshot = newNode;
	  return newNode;
	}
	function popProvider(context) {
	  var prevSnapshot = currentActiveSnapshot;

	  if (prevSnapshot === null) {
	    throw new Error('Tried to pop a Context at the root of the app. This is a bug in React.');
	  }

	  {
	    if (prevSnapshot.context !== context) {
	      error('The parent context is not the expected context. This is probably a bug in React.');
	    }
	  }

	  {
	    var _value = prevSnapshot.parentValue;

	    if (_value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
	      prevSnapshot.context._currentValue2 = prevSnapshot.context._defaultValue;
	    } else {
	      prevSnapshot.context._currentValue2 = _value;
	    }

	    {
	      if (context._currentRenderer2 !== undefined && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
	        error('Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.');
	      }

	      context._currentRenderer2 = rendererSigil;
	    }
	  }

	  return currentActiveSnapshot = prevSnapshot.parent;
	}
	function getActiveContext() {
	  return currentActiveSnapshot;
	}
	function readContext(context) {
	  var value =  context._currentValue2;
	  return value;
	}

	/**
	 * `ReactInstanceMap` maintains a mapping from a public facing stateful
	 * instance (key) and the internal representation (value). This allows public
	 * methods to accept the user facing instance as an argument and map them back
	 * to internal methods.
	 *
	 * Note that this module is currently shared and assumed to be stateless.
	 * If this becomes an actual Map, that will break.
	 */
	function get(key) {
	  return key._reactInternals;
	}
	function set(key, value) {
	  key._reactInternals = value;
	}

	var didWarnAboutNoopUpdateForComponent = {};
	var didWarnAboutDeprecatedWillMount = {};
	var didWarnAboutUninitializedState;
	var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
	var didWarnAboutLegacyLifecyclesAndDerivedState;
	var didWarnAboutUndefinedDerivedState;
	var warnOnUndefinedDerivedState;
	var warnOnInvalidCallback;
	var didWarnAboutDirectlyAssigningPropsToState;
	var didWarnAboutContextTypeAndContextTypes;
	var didWarnAboutInvalidateContextType;

	{
	  didWarnAboutUninitializedState = new Set();
	  didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
	  didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
	  didWarnAboutDirectlyAssigningPropsToState = new Set();
	  didWarnAboutUndefinedDerivedState = new Set();
	  didWarnAboutContextTypeAndContextTypes = new Set();
	  didWarnAboutInvalidateContextType = new Set();
	  var didWarnOnInvalidCallback = new Set();

	  warnOnInvalidCallback = function (callback, callerName) {
	    if (callback === null || typeof callback === 'function') {
	      return;
	    }

	    var key = callerName + '_' + callback;

	    if (!didWarnOnInvalidCallback.has(key)) {
	      didWarnOnInvalidCallback.add(key);

	      error('%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
	    }
	  };

	  warnOnUndefinedDerivedState = function (type, partialState) {
	    if (partialState === undefined) {
	      var componentName = getComponentNameFromType(type) || 'Component';

	      if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
	        didWarnAboutUndefinedDerivedState.add(componentName);

	        error('%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', componentName);
	      }
	    }
	  };
	}

	function warnNoop(publicInstance, callerName) {
	  {
	    var _constructor = publicInstance.constructor;
	    var componentName = _constructor && getComponentNameFromType(_constructor) || 'ReactClass';
	    var warningKey = componentName + '.' + callerName;

	    if (didWarnAboutNoopUpdateForComponent[warningKey]) {
	      return;
	    }

	    error('%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);

	    didWarnAboutNoopUpdateForComponent[warningKey] = true;
	  }
	}

	var classComponentUpdater = {
	  isMounted: function (inst) {
	    return false;
	  },
	  enqueueSetState: function (inst, payload, callback) {
	    var internals = get(inst);

	    if (internals.queue === null) {
	      warnNoop(inst, 'setState');
	    } else {
	      internals.queue.push(payload);

	      {
	        if (callback !== undefined && callback !== null) {
	          warnOnInvalidCallback(callback, 'setState');
	        }
	      }
	    }
	  },
	  enqueueReplaceState: function (inst, payload, callback) {
	    var internals = get(inst);
	    internals.replace = true;
	    internals.queue = [payload];

	    {
	      if (callback !== undefined && callback !== null) {
	        warnOnInvalidCallback(callback, 'setState');
	      }
	    }
	  },
	  enqueueForceUpdate: function (inst, callback) {
	    var internals = get(inst);

	    if (internals.queue === null) {
	      warnNoop(inst, 'forceUpdate');
	    } else {
	      {
	        if (callback !== undefined && callback !== null) {
	          warnOnInvalidCallback(callback, 'setState');
	        }
	      }
	    }
	  }
	};

	function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
	  var partialState = getDerivedStateFromProps(nextProps, prevState);

	  {
	    warnOnUndefinedDerivedState(ctor, partialState);
	  } // Merge the partial state and the previous state.


	  var newState = partialState === null || partialState === undefined ? prevState : assign({}, prevState, partialState);
	  return newState;
	}

	function constructClassInstance(ctor, props, maskedLegacyContext) {
	  var context = emptyContextObject;
	  var contextType = ctor.contextType;

	  {
	    if ('contextType' in ctor) {
	      var isValid = // Allow null for conditional declaration
	      contextType === null || contextType !== undefined && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === undefined; // Not a <Context.Consumer>

	      if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
	        didWarnAboutInvalidateContextType.add(ctor);
	        var addendum = '';

	        if (contextType === undefined) {
	          addendum = ' However, it is set to undefined. ' + 'This can be caused by a typo or by mixing up named and default imports. ' + 'This can also happen due to a circular dependency, so ' + 'try moving the createContext() call to a separate file.';
	        } else if (typeof contextType !== 'object') {
	          addendum = ' However, it is set to a ' + typeof contextType + '.';
	        } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
	          addendum = ' Did you accidentally pass the Context.Provider instead?';
	        } else if (contextType._context !== undefined) {
	          // <Context.Consumer>
	          addendum = ' Did you accidentally pass the Context.Consumer instead?';
	        } else {
	          addendum = ' However, it is set to an object with keys {' + Object.keys(contextType).join(', ') + '}.';
	        }

	        error('%s defines an invalid contextType. ' + 'contextType should point to the Context object returned by React.createContext().%s', getComponentNameFromType(ctor) || 'Component', addendum);
	      }
	    }
	  }

	  if (typeof contextType === 'object' && contextType !== null) {
	    context = readContext(contextType);
	  } else {
	    context = maskedLegacyContext;
	  }

	  var instance = new ctor(props, context);

	  {
	    if (typeof ctor.getDerivedStateFromProps === 'function' && (instance.state === null || instance.state === undefined)) {
	      var componentName = getComponentNameFromType(ctor) || 'Component';

	      if (!didWarnAboutUninitializedState.has(componentName)) {
	        didWarnAboutUninitializedState.add(componentName);

	        error('`%s` uses `getDerivedStateFromProps` but its initial state is ' + '%s. This is not recommended. Instead, define the initial state by ' + 'assigning an object to `this.state` in the constructor of `%s`. ' + 'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.', componentName, instance.state === null ? 'null' : 'undefined', componentName);
	      }
	    } // If new component APIs are defined, "unsafe" lifecycles won't be called.
	    // Warn about these lifecycles if they are present.
	    // Don't warn about react-lifecycles-compat polyfilled methods though.


	    if (typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function') {
	      var foundWillMountName = null;
	      var foundWillReceivePropsName = null;
	      var foundWillUpdateName = null;

	      if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
	        foundWillMountName = 'componentWillMount';
	      } else if (typeof instance.UNSAFE_componentWillMount === 'function') {
	        foundWillMountName = 'UNSAFE_componentWillMount';
	      }

	      if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
	        foundWillReceivePropsName = 'componentWillReceiveProps';
	      } else if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
	        foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
	      }

	      if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
	        foundWillUpdateName = 'componentWillUpdate';
	      } else if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
	        foundWillUpdateName = 'UNSAFE_componentWillUpdate';
	      }

	      if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
	        var _componentName = getComponentNameFromType(ctor) || 'Component';

	        var newApiName = typeof ctor.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';

	        if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
	          didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);

	          error('Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + '%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n' + 'The above lifecycles should be removed. Learn more about this warning here:\n' + 'https://reactjs.org/link/unsafe-component-lifecycles', _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : '', foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : '', foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : '');
	        }
	      }
	    }
	  }

	  return instance;
	}

	function checkClassInstance(instance, ctor, newProps) {
	  {
	    var name = getComponentNameFromType(ctor) || 'Component';
	    var renderPresent = instance.render;

	    if (!renderPresent) {
	      if (ctor.prototype && typeof ctor.prototype.render === 'function') {
	        error('%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
	      } else {
	        error('%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
	      }
	    }

	    if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
	      error('getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name);
	    }

	    if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name);
	    }

	    if (instance.propTypes) {
	      error('propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name);
	    }

	    if (instance.contextType) {
	      error('contextType was defined as an instance property on %s. Use a static ' + 'property to define contextType instead.', name);
	    }

	    {
	      if (instance.contextTypes) {
	        error('contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name);
	      }

	      if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
	        didWarnAboutContextTypeAndContextTypes.add(ctor);

	        error('%s declares both contextTypes and contextType static properties. ' + 'The legacy contextTypes property will be ignored.', name);
	      }
	    }

	    if (typeof instance.componentShouldUpdate === 'function') {
	      error('%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name);
	    }

	    if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
	      error('%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentNameFromType(ctor) || 'A pure component');
	    }

	    if (typeof instance.componentDidUnmount === 'function') {
	      error('%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name);
	    }

	    if (typeof instance.componentDidReceiveProps === 'function') {
	      error('%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name);
	    }

	    if (typeof instance.componentWillRecieveProps === 'function') {
	      error('%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name);
	    }

	    if (typeof instance.UNSAFE_componentWillRecieveProps === 'function') {
	      error('%s has a method called ' + 'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?', name);
	    }

	    var hasMutatedProps = instance.props !== newProps;

	    if (instance.props !== undefined && hasMutatedProps) {
	      error('%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name);
	    }

	    if (instance.defaultProps) {
	      error('Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name);
	    }

	    if (typeof instance.getSnapshotBeforeUpdate === 'function' && typeof instance.componentDidUpdate !== 'function' && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
	      didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);

	      error('%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). ' + 'This component defines getSnapshotBeforeUpdate() only.', getComponentNameFromType(ctor));
	    }

	    if (typeof instance.getDerivedStateFromProps === 'function') {
	      error('%s: getDerivedStateFromProps() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name);
	    }

	    if (typeof instance.getDerivedStateFromError === 'function') {
	      error('%s: getDerivedStateFromError() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name);
	    }

	    if (typeof ctor.getSnapshotBeforeUpdate === 'function') {
	      error('%s: getSnapshotBeforeUpdate() is defined as a static method ' + 'and will be ignored. Instead, declare it as an instance method.', name);
	    }

	    var _state = instance.state;

	    if (_state && (typeof _state !== 'object' || isArray(_state))) {
	      error('%s.state: must be set to an object or null', name);
	    }

	    if (typeof instance.getChildContext === 'function' && typeof ctor.childContextTypes !== 'object') {
	      error('%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', name);
	    }
	  }
	}

	function callComponentWillMount(type, instance) {
	  var oldState = instance.state;

	  if (typeof instance.componentWillMount === 'function') {
	    {
	      if ( instance.componentWillMount.__suppressDeprecationWarning !== true) {
	        var componentName = getComponentNameFromType(type) || 'Unknown';

	        if (!didWarnAboutDeprecatedWillMount[componentName]) {
	          warn( // keep this warning in sync with ReactStrictModeWarning.js
	          'componentWillMount has been renamed, and is not recommended for use. ' + 'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n' + '* Move code from componentWillMount to componentDidMount (preferred in most cases) ' + 'or the constructor.\n' + '\nPlease update the following components: %s', componentName);

	          didWarnAboutDeprecatedWillMount[componentName] = true;
	        }
	      }
	    }

	    instance.componentWillMount();
	  }

	  if (typeof instance.UNSAFE_componentWillMount === 'function') {
	    instance.UNSAFE_componentWillMount();
	  }

	  if (oldState !== instance.state) {
	    {
	      error('%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentNameFromType(type) || 'Component');
	    }

	    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
	  }
	}

	function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
	  if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
	    var oldQueue = internalInstance.queue;
	    var oldReplace = internalInstance.replace;
	    internalInstance.queue = null;
	    internalInstance.replace = false;

	    if (oldReplace && oldQueue.length === 1) {
	      inst.state = oldQueue[0];
	    } else {
	      var nextState = oldReplace ? oldQueue[0] : inst.state;
	      var dontMutate = true;

	      for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
	        var partial = oldQueue[i];
	        var partialState = typeof partial === 'function' ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;

	        if (partialState != null) {
	          if (dontMutate) {
	            dontMutate = false;
	            nextState = assign({}, nextState, partialState);
	          } else {
	            assign(nextState, partialState);
	          }
	        }
	      }

	      inst.state = nextState;
	    }
	  } else {
	    internalInstance.queue = null;
	  }
	} // Invokes the mount life-cycles on a previously never rendered instance.


	function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
	  {
	    checkClassInstance(instance, ctor, newProps);
	  }

	  var initialState = instance.state !== undefined ? instance.state : null;
	  instance.updater = classComponentUpdater;
	  instance.props = newProps;
	  instance.state = initialState; // We don't bother initializing the refs object on the server, since we're not going to resolve them anyway.
	  // The internal instance will be used to manage updates that happen during this mount.

	  var internalInstance = {
	    queue: [],
	    replace: false
	  };
	  set(instance, internalInstance);
	  var contextType = ctor.contextType;

	  if (typeof contextType === 'object' && contextType !== null) {
	    instance.context = readContext(contextType);
	  } else {
	    instance.context = maskedLegacyContext;
	  }

	  {
	    if (instance.state === newProps) {
	      var componentName = getComponentNameFromType(ctor) || 'Component';

	      if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
	        didWarnAboutDirectlyAssigningPropsToState.add(componentName);

	        error('%s: It is not recommended to assign props directly to state ' + "because updates to props won't be reflected in state. " + 'In most cases, it is better to use props directly.', componentName);
	      }
	    }
	  }

	  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;

	  if (typeof getDerivedStateFromProps === 'function') {
	    instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
	  } // In order to support react-lifecycles-compat polyfilled components,
	  // Unsafe lifecycles should not be invoked for components using the new APIs.


	  if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
	    callComponentWillMount(ctor, instance); // If we had additional state updates during this life-cycle, let's
	    // process them now.

	    processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
	  }
	}

	// Ids are base 32 strings whose binary representation corresponds to the
	// position of a node in a tree.
	// Every time the tree forks into multiple children, we add additional bits to
	// the left of the sequence that represent the position of the child within the
	// current level of children.
	//
	//      00101       00010001011010101
	//      ╰─┬─╯       ╰───────┬───────╯
	//   Fork 5 of 20       Parent id
	//
	// The leading 0s are important. In the above example, you only need 3 bits to
	// represent slot 5. However, you need 5 bits to represent all the forks at
	// the current level, so we must account for the empty bits at the end.
	//
	// For this same reason, slots are 1-indexed instead of 0-indexed. Otherwise,
	// the zeroth id at a level would be indistinguishable from its parent.
	//
	// If a node has only one child, and does not materialize an id (i.e. does not
	// contain a useId hook), then we don't need to allocate any space in the
	// sequence. It's treated as a transparent indirection. For example, these two
	// trees produce the same ids:
	//
	// <>                          <>
	//   <Indirection>               <A />
	//     <A />                     <B />
	//   </Indirection>            </>
	//   <B />
	// </>
	//
	// However, we cannot skip any node that materializes an id. Otherwise, a parent
	// id that does not fork would be indistinguishable from its child id. For
	// example, this tree does not fork, but the parent and child must have
	// different ids.
	//
	// <Parent>
	//   <Child />
	// </Parent>
	//
	// To handle this scenario, every time we materialize an id, we allocate a
	// new level with a single slot. You can think of this as a fork with only one
	// prong, or an array of children with length 1.
	//
	// It's possible for the size of the sequence to exceed 32 bits, the max
	// size for bitwise operations. When this happens, we make more room by
	// converting the right part of the id to a string and storing it in an overflow
	// variable. We use a base 32 string representation, because 32 is the largest
	// power of 2 that is supported by toString(). We want the base to be large so
	// that the resulting ids are compact, and we want the base to be a power of 2
	// because every log2(base) bits corresponds to a single character, i.e. every
	// log2(32) = 5 bits. That means we can lop bits off the end 5 at a time without
	// affecting the final result.
	var emptyTreeContext = {
	  id: 1,
	  overflow: ''
	};
	function getTreeId(context) {
	  var overflow = context.overflow;
	  var idWithLeadingBit = context.id;
	  var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
	  return id.toString(32) + overflow;
	}
	function pushTreeContext(baseContext, totalChildren, index) {
	  var baseIdWithLeadingBit = baseContext.id;
	  var baseOverflow = baseContext.overflow; // The leftmost 1 marks the end of the sequence, non-inclusive. It's not part
	  // of the id; we use it to account for leading 0s.

	  var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
	  var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
	  var slot = index + 1;
	  var length = getBitLength(totalChildren) + baseLength; // 30 is the max length we can store without overflowing, taking into
	  // consideration the leading 1 we use to mark the end of the sequence.

	  if (length > 30) {
	    // We overflowed the bitwise-safe range. Fall back to slower algorithm.
	    // This branch assumes the length of the base id is greater than 5; it won't
	    // work for smaller ids, because you need 5 bits per character.
	    //
	    // We encode the id in multiple steps: first the base id, then the
	    // remaining digits.
	    //
	    // Each 5 bit sequence corresponds to a single base 32 character. So for
	    // example, if the current id is 23 bits long, we can convert 20 of those
	    // bits into a string of 4 characters, with 3 bits left over.
	    //
	    // First calculate how many bits in the base id represent a complete
	    // sequence of characters.
	    var numberOfOverflowBits = baseLength - baseLength % 5; // Then create a bitmask that selects only those bits.

	    var newOverflowBits = (1 << numberOfOverflowBits) - 1; // Select the bits, and convert them to a base 32 string.

	    var newOverflow = (baseId & newOverflowBits).toString(32); // Now we can remove those bits from the base id.

	    var restOfBaseId = baseId >> numberOfOverflowBits;
	    var restOfBaseLength = baseLength - numberOfOverflowBits; // Finally, encode the rest of the bits using the normal algorithm. Because
	    // we made more room, this time it won't overflow.

	    var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
	    var restOfNewBits = slot << restOfBaseLength;
	    var id = restOfNewBits | restOfBaseId;
	    var overflow = newOverflow + baseOverflow;
	    return {
	      id: 1 << restOfLength | id,
	      overflow: overflow
	    };
	  } else {
	    // Normal path
	    var newBits = slot << baseLength;

	    var _id = newBits | baseId;

	    var _overflow = baseOverflow;
	    return {
	      id: 1 << length | _id,
	      overflow: _overflow
	    };
	  }
	}

	function getBitLength(number) {
	  return 32 - clz32(number);
	}

	function getLeadingBit(id) {
	  return 1 << getBitLength(id) - 1;
	} // TODO: Math.clz32 is supported in Node 12+. Maybe we can drop the fallback.


	var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback; // Count leading zeros.
	// Based on:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

	var log = Math.log;
	var LN2 = Math.LN2;

	function clz32Fallback(x) {
	  var asUint = x >>> 0;

	  if (asUint === 0) {
	    return 32;
	  }

	  return 31 - (log(asUint) / LN2 | 0) | 0;
	}

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
	  ;
	}

	var objectIs = typeof Object.is === 'function' ? Object.is : is;

	var currentlyRenderingComponent = null;
	var currentlyRenderingTask = null;
	var firstWorkInProgressHook = null;
	var workInProgressHook = null; // Whether the work-in-progress hook is a re-rendered hook

	var isReRender = false; // Whether an update was scheduled during the currently executing render pass.

	var didScheduleRenderPhaseUpdate = false; // Counts the number of useId hooks in this component

	var localIdCounter = 0; // Lazily created map of render-phase updates

	var renderPhaseUpdates = null; // Counter to prevent infinite loops.

	var numberOfReRenders = 0;
	var RE_RENDER_LIMIT = 25;
	var isInHookUserCodeInDev = false; // In DEV, this is the name of the currently executing primitive hook

	var currentHookNameInDev;

	function resolveCurrentlyRenderingComponent() {
	  if (currentlyRenderingComponent === null) {
	    throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
	  }

	  {
	    if (isInHookUserCodeInDev) {
	      error('Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' + 'You can only call Hooks at the top level of your React function. ' + 'For more information, see ' + 'https://reactjs.org/link/rules-of-hooks');
	    }
	  }

	  return currentlyRenderingComponent;
	}

	function areHookInputsEqual(nextDeps, prevDeps) {
	  if (prevDeps === null) {
	    {
	      error('%s received a final argument during this render, but not during ' + 'the previous render. Even though the final argument is optional, ' + 'its type cannot change between renders.', currentHookNameInDev);
	    }

	    return false;
	  }

	  {
	    // Don't bother comparing lengths in prod because these arrays should be
	    // passed inline.
	    if (nextDeps.length !== prevDeps.length) {
	      error('The final argument passed to %s changed size between renders. The ' + 'order and size of this array must remain constant.\n\n' + 'Previous: %s\n' + 'Incoming: %s', currentHookNameInDev, "[" + nextDeps.join(', ') + "]", "[" + prevDeps.join(', ') + "]");
	    }
	  }

	  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
	    if (objectIs(nextDeps[i], prevDeps[i])) {
	      continue;
	    }

	    return false;
	  }

	  return true;
	}

	function createHook() {
	  if (numberOfReRenders > 0) {
	    throw new Error('Rendered more hooks than during the previous render');
	  }

	  return {
	    memoizedState: null,
	    queue: null,
	    next: null
	  };
	}

	function createWorkInProgressHook() {
	  if (workInProgressHook === null) {
	    // This is the first hook in the list
	    if (firstWorkInProgressHook === null) {
	      isReRender = false;
	      firstWorkInProgressHook = workInProgressHook = createHook();
	    } else {
	      // There's already a work-in-progress. Reuse it.
	      isReRender = true;
	      workInProgressHook = firstWorkInProgressHook;
	    }
	  } else {
	    if (workInProgressHook.next === null) {
	      isReRender = false; // Append to the end of the list

	      workInProgressHook = workInProgressHook.next = createHook();
	    } else {
	      // There's already a work-in-progress. Reuse it.
	      isReRender = true;
	      workInProgressHook = workInProgressHook.next;
	    }
	  }

	  return workInProgressHook;
	}

	function prepareToUseHooks(task, componentIdentity) {
	  currentlyRenderingComponent = componentIdentity;
	  currentlyRenderingTask = task;

	  {
	    isInHookUserCodeInDev = false;
	  } // The following should have already been reset
	  // didScheduleRenderPhaseUpdate = false;
	  // localIdCounter = 0;
	  // firstWorkInProgressHook = null;
	  // numberOfReRenders = 0;
	  // renderPhaseUpdates = null;
	  // workInProgressHook = null;


	  localIdCounter = 0;
	}
	function finishHooks(Component, props, children, refOrContext) {
	  // This must be called after every function component to prevent hooks from
	  // being used in classes.
	  while (didScheduleRenderPhaseUpdate) {
	    // Updates were scheduled during the render phase. They are stored in
	    // the `renderPhaseUpdates` map. Call the component again, reusing the
	    // work-in-progress hooks and applying the additional updates on top. Keep
	    // restarting until no more updates are scheduled.
	    didScheduleRenderPhaseUpdate = false;
	    localIdCounter = 0;
	    numberOfReRenders += 1; // Start over from the beginning of the list

	    workInProgressHook = null;
	    children = Component(props, refOrContext);
	  }

	  resetHooksState();
	  return children;
	}
	function checkDidRenderIdHook() {
	  // This should be called immediately after every finishHooks call.
	  // Conceptually, it's part of the return value of finishHooks; it's only a
	  // separate function to avoid using an array tuple.
	  var didRenderIdHook = localIdCounter !== 0;
	  return didRenderIdHook;
	} // Reset the internal hooks state if an error occurs while rendering a component

	function resetHooksState() {
	  {
	    isInHookUserCodeInDev = false;
	  }

	  currentlyRenderingComponent = null;
	  currentlyRenderingTask = null;
	  didScheduleRenderPhaseUpdate = false;
	  firstWorkInProgressHook = null;
	  numberOfReRenders = 0;
	  renderPhaseUpdates = null;
	  workInProgressHook = null;
	}

	function readContext$1(context) {
	  {
	    if (isInHookUserCodeInDev) {
	      error('Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
	    }
	  }

	  return readContext(context);
	}

	function useContext(context) {
	  {
	    currentHookNameInDev = 'useContext';
	  }

	  resolveCurrentlyRenderingComponent();
	  return readContext(context);
	}

	function basicStateReducer(state, action) {
	  // $FlowFixMe: Flow doesn't like mixed types
	  return typeof action === 'function' ? action(state) : action;
	}

	function useState(initialState) {
	  {
	    currentHookNameInDev = 'useState';
	  }

	  return useReducer(basicStateReducer, // useReducer has a special case to support lazy useState initializers
	  initialState);
	}
	function useReducer(reducer, initialArg, init) {
	  {
	    if (reducer !== basicStateReducer) {
	      currentHookNameInDev = 'useReducer';
	    }
	  }

	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();

	  if (isReRender) {
	    // This is a re-render. Apply the new render phase updates to the previous
	    // current hook.
	    var queue = workInProgressHook.queue;
	    var dispatch = queue.dispatch;

	    if (renderPhaseUpdates !== null) {
	      // Render phase updates are stored in a map of queue -> linked list
	      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

	      if (firstRenderPhaseUpdate !== undefined) {
	        renderPhaseUpdates.delete(queue);
	        var newState = workInProgressHook.memoizedState;
	        var update = firstRenderPhaseUpdate;

	        do {
	          // Process this render phase update. We don't have to check the
	          // priority because it will always be the same as the current
	          // render's.
	          var action = update.action;

	          {
	            isInHookUserCodeInDev = true;
	          }

	          newState = reducer(newState, action);

	          {
	            isInHookUserCodeInDev = false;
	          }

	          update = update.next;
	        } while (update !== null);

	        workInProgressHook.memoizedState = newState;
	        return [newState, dispatch];
	      }
	    }

	    return [workInProgressHook.memoizedState, dispatch];
	  } else {
	    {
	      isInHookUserCodeInDev = true;
	    }

	    var initialState;

	    if (reducer === basicStateReducer) {
	      // Special case for `useState`.
	      initialState = typeof initialArg === 'function' ? initialArg() : initialArg;
	    } else {
	      initialState = init !== undefined ? init(initialArg) : initialArg;
	    }

	    {
	      isInHookUserCodeInDev = false;
	    }

	    workInProgressHook.memoizedState = initialState;

	    var _queue = workInProgressHook.queue = {
	      last: null,
	      dispatch: null
	    };

	    var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);

	    return [workInProgressHook.memoizedState, _dispatch];
	  }
	}

	function useMemo(nextCreate, deps) {
	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();
	  var nextDeps = deps === undefined ? null : deps;

	  if (workInProgressHook !== null) {
	    var prevState = workInProgressHook.memoizedState;

	    if (prevState !== null) {
	      if (nextDeps !== null) {
	        var prevDeps = prevState[1];

	        if (areHookInputsEqual(nextDeps, prevDeps)) {
	          return prevState[0];
	        }
	      }
	    }
	  }

	  {
	    isInHookUserCodeInDev = true;
	  }

	  var nextValue = nextCreate();

	  {
	    isInHookUserCodeInDev = false;
	  }

	  workInProgressHook.memoizedState = [nextValue, nextDeps];
	  return nextValue;
	}

	function useRef(initialValue) {
	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();
	  var previousRef = workInProgressHook.memoizedState;

	  if (previousRef === null) {
	    var ref = {
	      current: initialValue
	    };

	    {
	      Object.seal(ref);
	    }

	    workInProgressHook.memoizedState = ref;
	    return ref;
	  } else {
	    return previousRef;
	  }
	}

	function useLayoutEffect(create, inputs) {
	  {
	    currentHookNameInDev = 'useLayoutEffect';

	    error('useLayoutEffect does nothing on the server, because its effect cannot ' + "be encoded into the server renderer's output format. This will lead " + 'to a mismatch between the initial, non-hydrated UI and the intended ' + 'UI. To avoid this, useLayoutEffect should only be used in ' + 'components that render exclusively on the client. ' + 'See https://reactjs.org/link/uselayouteffect-ssr for common fixes.');
	  }
	}

	function dispatchAction(componentIdentity, queue, action) {
	  if (numberOfReRenders >= RE_RENDER_LIMIT) {
	    throw new Error('Too many re-renders. React limits the number of renders to prevent ' + 'an infinite loop.');
	  }

	  if (componentIdentity === currentlyRenderingComponent) {
	    // This is a render phase update. Stash it in a lazily-created map of
	    // queue -> linked list of updates. After this render pass, we'll restart
	    // and apply the stashed updates on top of the work-in-progress hook.
	    didScheduleRenderPhaseUpdate = true;
	    var update = {
	      action: action,
	      next: null
	    };

	    if (renderPhaseUpdates === null) {
	      renderPhaseUpdates = new Map();
	    }

	    var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

	    if (firstRenderPhaseUpdate === undefined) {
	      renderPhaseUpdates.set(queue, update);
	    } else {
	      // Append the update to the end of the list.
	      var lastRenderPhaseUpdate = firstRenderPhaseUpdate;

	      while (lastRenderPhaseUpdate.next !== null) {
	        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
	      }

	      lastRenderPhaseUpdate.next = update;
	    }
	  }
	}

	function useCallback(callback, deps) {
	  return useMemo(function () {
	    return callback;
	  }, deps);
	} // TODO Decide on how to implement this hook for server rendering.
	// If a mutation occurs during render, consider triggering a Suspense boundary
	// and falling back to client rendering.

	function useMutableSource(source, getSnapshot, subscribe) {
	  resolveCurrentlyRenderingComponent();
	  return getSnapshot(source._source);
	}

	function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
	  if (getServerSnapshot === undefined) {
	    throw new Error('Missing getServerSnapshot, which is required for ' + 'server-rendered content. Will revert to client rendering.');
	  }

	  return getServerSnapshot();
	}

	function useDeferredValue(value) {
	  resolveCurrentlyRenderingComponent();
	  return value;
	}

	function unsupportedStartTransition() {
	  throw new Error('startTransition cannot be called during server rendering.');
	}

	function useTransition() {
	  resolveCurrentlyRenderingComponent();
	  return [false, unsupportedStartTransition];
	}

	function useId() {
	  var task = currentlyRenderingTask;
	  var treeId = getTreeId(task.treeContext);
	  var responseState = currentResponseState;

	  if (responseState === null) {
	    throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component.');
	  }

	  var localId = localIdCounter++;
	  return makeId(responseState, treeId, localId);
	}

	function noop() {}

	var Dispatcher = {
	  readContext: readContext$1,
	  useContext: useContext,
	  useMemo: useMemo,
	  useReducer: useReducer,
	  useRef: useRef,
	  useState: useState,
	  useInsertionEffect: noop,
	  useLayoutEffect: useLayoutEffect,
	  useCallback: useCallback,
	  // useImperativeHandle is not run in the server environment
	  useImperativeHandle: noop,
	  // Effects are not run in the server environment.
	  useEffect: noop,
	  // Debugging effect
	  useDebugValue: noop,
	  useDeferredValue: useDeferredValue,
	  useTransition: useTransition,
	  useId: useId,
	  // Subscriptions are not setup in a server environment.
	  useMutableSource: useMutableSource,
	  useSyncExternalStore: useSyncExternalStore
	};

	var currentResponseState = null;
	function setCurrentResponseState(responseState) {
	  currentResponseState = responseState;
	}

	function getStackByComponentStackNode(componentStack) {
	  try {
	    var info = '';
	    var node = componentStack;

	    do {
	      switch (node.tag) {
	        case 0:
	          info += describeBuiltInComponentFrame(node.type, null, null);
	          break;

	        case 1:
	          info += describeFunctionComponentFrame(node.type, null, null);
	          break;

	        case 2:
	          info += describeClassComponentFrame(node.type, null, null);
	          break;
	      }

	      node = node.parent;
	    } while (node);

	    return info;
	  } catch (x) {
	    return '\nError generating stack: ' + x.message + '\n' + x.stack;
	  }
	}

	var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
	var PENDING = 0;
	var COMPLETED = 1;
	var FLUSHED = 2;
	var ABORTED = 3;
	var ERRORED = 4;
	var OPEN = 0;
	var CLOSING = 1;
	var CLOSED = 2;
	// This is a default heuristic for how to split up the HTML content into progressive
	// loading. Our goal is to be able to display additional new content about every 500ms.
	// Faster than that is unnecessary and should be throttled on the client. It also
	// adds unnecessary overhead to do more splits. We don't know if it's a higher or lower
	// end device but higher end suffer less from the overhead than lower end does from
	// not getting small enough pieces. We error on the side of low end.
	// We base this on low end 3G speeds which is about 500kbits per second. We assume
	// that there can be a reasonable drop off from max bandwidth which leaves you with
	// as little as 80%. We can receive half of that each 500ms - at best. In practice,
	// a little bandwidth is lost to processing and contention - e.g. CSS and images that
	// are downloaded along with the main content. So we estimate about half of that to be
	// the lower end throughput. In other words, we expect that you can at least show
	// about 12.5kb of content per 500ms. Not counting starting latency for the first
	// paint.
	// 500 * 1024 / 8 * .8 * 0.5 / 2
	var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;

	function defaultErrorHandler(error) {
	  console['error'](error); // Don't transform to our wrapper
	}

	function noop$1() {}

	function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
	  var pingedTasks = [];
	  var abortSet = new Set();
	  var request = {
	    destination: null,
	    responseState: responseState,
	    progressiveChunkSize: progressiveChunkSize === undefined ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
	    status: OPEN,
	    fatalError: null,
	    nextSegmentId: 0,
	    allPendingTasks: 0,
	    pendingRootTasks: 0,
	    completedRootSegment: null,
	    abortableTasks: abortSet,
	    pingedTasks: pingedTasks,
	    clientRenderedBoundaries: [],
	    completedBoundaries: [],
	    partialBoundaries: [],
	    onError: onError === undefined ? defaultErrorHandler : onError,
	    onAllReady: onAllReady === undefined ? noop$1 : onAllReady,
	    onShellReady: onShellReady === undefined ? noop$1 : onShellReady,
	    onShellError: onShellError === undefined ? noop$1 : onShellError,
	    onFatalError: onFatalError === undefined ? noop$1 : onFatalError
	  }; // This segment represents the root fallback.

	  var rootSegment = createPendingSegment(request, 0, null, rootFormatContext); // There is no parent so conceptually, we're unblocked to flush this segment.

	  rootSegment.parentFlushed = true;
	  var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
	  pingedTasks.push(rootTask);
	  return request;
	}

	function pingTask(request, task) {
	  var pingedTasks = request.pingedTasks;
	  pingedTasks.push(task);

	  if (pingedTasks.length === 1) {
	    scheduleWork(function () {
	      return performWork(request);
	    });
	  }
	}

	function createSuspenseBoundary(request, fallbackAbortableTasks) {
	  return {
	    id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
	    rootSegmentID: -1,
	    parentFlushed: false,
	    pendingTasks: 0,
	    forceClientRender: false,
	    completedSegments: [],
	    byteSize: 0,
	    fallbackAbortableTasks: fallbackAbortableTasks
	  };
	}

	function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
	  request.allPendingTasks++;

	  if (blockedBoundary === null) {
	    request.pendingRootTasks++;
	  } else {
	    blockedBoundary.pendingTasks++;
	  }

	  var task = {
	    node: node,
	    ping: function () {
	      return pingTask(request, task);
	    },
	    blockedBoundary: blockedBoundary,
	    blockedSegment: blockedSegment,
	    abortSet: abortSet,
	    legacyContext: legacyContext,
	    context: context,
	    treeContext: treeContext
	  };

	  {
	    task.componentStack = null;
	  }

	  abortSet.add(task);
	  return task;
	}

	function createPendingSegment(request, index, boundary, formatContext) {
	  return {
	    status: PENDING,
	    id: -1,
	    // lazily assigned later
	    index: index,
	    parentFlushed: false,
	    chunks: [],
	    children: [],
	    formatContext: formatContext,
	    boundary: boundary
	  };
	} // DEV-only global reference to the currently executing task


	var currentTaskInDEV = null;

	function getCurrentStackInDEV() {
	  {
	    if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
	      return '';
	    }

	    return getStackByComponentStackNode(currentTaskInDEV.componentStack);
	  }
	}

	function pushBuiltInComponentStackInDEV(task, type) {
	  {
	    task.componentStack = {
	      tag: 0,
	      parent: task.componentStack,
	      type: type
	    };
	  }
	}

	function pushFunctionComponentStackInDEV(task, type) {
	  {
	    task.componentStack = {
	      tag: 1,
	      parent: task.componentStack,
	      type: type
	    };
	  }
	}

	function pushClassComponentStackInDEV(task, type) {
	  {
	    task.componentStack = {
	      tag: 2,
	      parent: task.componentStack,
	      type: type
	    };
	  }
	}

	function popComponentStackInDEV(task) {
	  {
	    if (task.componentStack === null) {
	      error('Unexpectedly popped too many stack frames. This is a bug in React.');
	    } else {
	      task.componentStack = task.componentStack.parent;
	    }
	  }
	}

	function logRecoverableError(request, error) {
	  // If this callback errors, we intentionally let that error bubble up to become a fatal error
	  // so that someone fixes the error reporting instead of hiding it.
	  var onError = request.onError;
	  onError(error);
	}

	function fatalError(request, error) {
	  // This is called outside error handling code such as if the root errors outside
	  // a suspense boundary or if the root suspense boundary's fallback errors.
	  // It's also called if React itself or its host configs errors.
	  var onShellError = request.onShellError;
	  onShellError(error);
	  var onFatalError = request.onFatalError;
	  onFatalError(error);

	  if (request.destination !== null) {
	    request.status = CLOSED;
	    closeWithError(request.destination, error);
	  } else {
	    request.status = CLOSING;
	    request.fatalError = error;
	  }
	}

	function renderSuspenseBoundary(request, task, props) {
	  pushBuiltInComponentStackInDEV(task, 'Suspense');
	  var parentBoundary = task.blockedBoundary;
	  var parentSegment = task.blockedSegment; // Each time we enter a suspense boundary, we split out into a new segment for
	  // the fallback so that we can later replace that segment with the content.
	  // This also lets us split out the main content even if it doesn't suspend,
	  // in case it ends up generating a large subtree of content.

	  var fallback = props.fallback;
	  var content = props.children;
	  var fallbackAbortSet = new Set();
	  var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
	  var insertionIndex = parentSegment.chunks.length; // The children of the boundary segment is actually the fallback.

	  var boundarySegment = createPendingSegment(request, insertionIndex, newBoundary, parentSegment.formatContext);
	  parentSegment.children.push(boundarySegment); // This segment is the actual child content. We can start rendering that immediately.

	  var contentRootSegment = createPendingSegment(request, 0, null, parentSegment.formatContext); // We mark the root segment as having its parent flushed. It's not really flushed but there is
	  // no parent segment so there's nothing to wait on.

	  contentRootSegment.parentFlushed = true; // Currently this is running synchronously. We could instead schedule this to pingedTasks.
	  // I suspect that there might be some efficiency benefits from not creating the suspended task
	  // and instead just using the stack if possible.
	  // TODO: Call this directly instead of messing with saving and restoring contexts.
	  // We can reuse the current context and task to render the content immediately without
	  // context switching. We just need to temporarily switch which boundary and which segment
	  // we're writing to. If something suspends, it'll spawn new suspended task with that context.

	  task.blockedBoundary = newBoundary;
	  task.blockedSegment = contentRootSegment;

	  try {
	    // We use the safe form because we don't handle suspending here. Only error handling.
	    renderNode(request, task, content);
	    contentRootSegment.status = COMPLETED;
	    queueCompletedSegment(newBoundary, contentRootSegment);

	    if (newBoundary.pendingTasks === 0) {
	      // This must have been the last segment we were waiting on. This boundary is now complete.
	      // Therefore we won't need the fallback. We early return so that we don't have to create
	      // the fallback.
	      popComponentStackInDEV(task);
	      return;
	    }
	  } catch (error) {
	    contentRootSegment.status = ERRORED;
	    logRecoverableError(request, error);
	    newBoundary.forceClientRender = true; // We don't need to decrement any task numbers because we didn't spawn any new task.
	    // We don't need to schedule any task because we know the parent has written yet.
	    // We do need to fallthrough to create the fallback though.
	  } finally {
	    task.blockedBoundary = parentBoundary;
	    task.blockedSegment = parentSegment;
	  } // We create suspended task for the fallback because we don't want to actually work
	  // on it yet in case we finish the main content, so we queue for later.


	  var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);

	  {
	    suspendedFallbackTask.componentStack = task.componentStack;
	  } // TODO: This should be queued at a separate lower priority queue so that we only work
	  // on preparing fallbacks if we don't have any more main content to task on.


	  request.pingedTasks.push(suspendedFallbackTask);
	  popComponentStackInDEV(task);
	}

	function renderHostElement(request, task, type, props) {
	  pushBuiltInComponentStackInDEV(task, type);
	  var segment = task.blockedSegment;
	  var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
	  var prevContext = segment.formatContext;
	  segment.formatContext = getChildFormatContext(prevContext, type, props); // We use the non-destructive form because if something suspends, we still
	  // need to pop back up and finish this subtree of HTML.

	  renderNode(request, task, children); // We expect that errors will fatal the whole task and that we don't need
	  // the correct context. Therefore this is not in a finally.

	  segment.formatContext = prevContext;
	  pushEndInstance(segment.chunks, type);
	  popComponentStackInDEV(task);
	}

	function shouldConstruct$1(Component) {
	  return Component.prototype && Component.prototype.isReactComponent;
	}

	function renderWithHooks(request, task, Component, props, secondArg) {
	  var componentIdentity = {};
	  prepareToUseHooks(task, componentIdentity);
	  var result = Component(props, secondArg);
	  return finishHooks(Component, props, result, secondArg);
	}

	function finishClassComponent(request, task, instance, Component, props) {
	  var nextChildren = instance.render();

	  {
	    if (instance.props !== props) {
	      if (!didWarnAboutReassigningProps) {
	        error('It looks like %s is reassigning its own `this.props` while rendering. ' + 'This is not supported and can lead to confusing bugs.', getComponentNameFromType(Component) || 'a component');
	      }

	      didWarnAboutReassigningProps = true;
	    }
	  }

	  {
	    var childContextTypes = Component.childContextTypes;

	    if (childContextTypes !== null && childContextTypes !== undefined) {
	      var previousContext = task.legacyContext;
	      var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
	      task.legacyContext = mergedContext;
	      renderNodeDestructive(request, task, nextChildren);
	      task.legacyContext = previousContext;
	      return;
	    }
	  }

	  renderNodeDestructive(request, task, nextChildren);
	}

	function renderClassComponent(request, task, Component, props) {
	  pushClassComponentStackInDEV(task, Component);
	  var maskedContext =  getMaskedContext(Component, task.legacyContext) ;
	  var instance = constructClassInstance(Component, props, maskedContext);
	  mountClassInstance(instance, Component, props, maskedContext);
	  finishClassComponent(request, task, instance, Component, props);
	  popComponentStackInDEV(task);
	}

	var didWarnAboutBadClass = {};
	var didWarnAboutModulePatternComponent = {};
	var didWarnAboutContextTypeOnFunctionComponent = {};
	var didWarnAboutGetDerivedStateOnFunctionComponent = {};
	var didWarnAboutReassigningProps = false;
	var didWarnAboutGenerators = false;
	var didWarnAboutMaps = false;
	var hasWarnedAboutUsingContextAsConsumer = false; // This would typically be a function component but we still support module pattern
	// components for some reason.

	function renderIndeterminateComponent(request, task, Component, props) {
	  var legacyContext;

	  {
	    legacyContext = getMaskedContext(Component, task.legacyContext);
	  }

	  pushFunctionComponentStackInDEV(task, Component);

	  {
	    if (Component.prototype && typeof Component.prototype.render === 'function') {
	      var componentName = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutBadClass[componentName]) {
	        error("The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);

	        didWarnAboutBadClass[componentName] = true;
	      }
	    }
	  }

	  var value = renderWithHooks(request, task, Component, props, legacyContext);
	  var hasId = checkDidRenderIdHook();

	  {
	    // Support for module components is deprecated and is removed behind a flag.
	    // Whether or not it would crash later, we want to show a good message in DEV first.
	    if (typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
	      var _componentName = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutModulePatternComponent[_componentName]) {
	        error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName, _componentName, _componentName);

	        didWarnAboutModulePatternComponent[_componentName] = true;
	      }
	    }
	  }

	  if ( // Run these checks in production only if the flag is off.
	  // Eventually we'll delete this branch altogether.
	   typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
	    {
	      var _componentName2 = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutModulePatternComponent[_componentName2]) {
	        error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName2, _componentName2, _componentName2);

	        didWarnAboutModulePatternComponent[_componentName2] = true;
	      }
	    }

	    mountClassInstance(value, Component, props, legacyContext);
	    finishClassComponent(request, task, value, Component, props);
	  } else {

	    {
	      validateFunctionComponentInDev(Component);
	    } // We're now successfully past this task, and we don't have to pop back to
	    // the previous task every again, so we can use the destructive recursive form.


	    if (hasId) {
	      // This component materialized an id. We treat this as its own level, with
	      // a single "child" slot.
	      var prevTreeContext = task.treeContext;
	      var totalChildren = 1;
	      var index = 0;
	      task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);

	      try {
	        renderNodeDestructive(request, task, value);
	      } finally {
	        task.treeContext = prevTreeContext;
	      }
	    } else {
	      renderNodeDestructive(request, task, value);
	    }
	  }

	  popComponentStackInDEV(task);
	}

	function validateFunctionComponentInDev(Component) {
	  {
	    if (Component) {
	      if (Component.childContextTypes) {
	        error('%s(...): childContextTypes cannot be defined on a function component.', Component.displayName || Component.name || 'Component');
	      }
	    }

	    if (typeof Component.getDerivedStateFromProps === 'function') {
	      var _componentName3 = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
	        error('%s: Function components do not support getDerivedStateFromProps.', _componentName3);

	        didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
	      }
	    }

	    if (typeof Component.contextType === 'object' && Component.contextType !== null) {
	      var _componentName4 = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
	        error('%s: Function components do not support contextType.', _componentName4);

	        didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
	      }
	    }
	  }
	}

	function resolveDefaultProps(Component, baseProps) {
	  if (Component && Component.defaultProps) {
	    // Resolve default props. Taken from ReactElement
	    var props = assign({}, baseProps);
	    var defaultProps = Component.defaultProps;

	    for (var propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }

	    return props;
	  }

	  return baseProps;
	}

	function renderForwardRef(request, task, type, props, ref) {
	  pushFunctionComponentStackInDEV(task, type.render);
	  var children = renderWithHooks(request, task, type.render, props, ref);
	  var hasId = checkDidRenderIdHook();

	  if (hasId) {
	    // This component materialized an id. We treat this as its own level, with
	    // a single "child" slot.
	    var prevTreeContext = task.treeContext;
	    var totalChildren = 1;
	    var index = 0;
	    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);

	    try {
	      renderNodeDestructive(request, task, children);
	    } finally {
	      task.treeContext = prevTreeContext;
	    }
	  } else {
	    renderNodeDestructive(request, task, children);
	  }

	  popComponentStackInDEV(task);
	}

	function renderMemo(request, task, type, props, ref) {
	  var innerType = type.type;
	  var resolvedProps = resolveDefaultProps(innerType, props);
	  renderElement(request, task, innerType, resolvedProps, ref);
	}

	function renderContextConsumer(request, task, context, props) {
	  // The logic below for Context differs depending on PROD or DEV mode. In
	  // DEV mode, we create a separate object for Context.Consumer that acts
	  // like a proxy to Context. This proxy object adds unnecessary code in PROD
	  // so we use the old behaviour (Context.Consumer references Context) to
	  // reduce size and overhead. The separate object references context via
	  // a property called "_context", which also gives us the ability to check
	  // in DEV mode if this property exists or not and warn if it does not.
	  {
	    if (context._context === undefined) {
	      // This may be because it's a Context (rather than a Consumer).
	      // Or it may be because it's older React where they're the same thing.
	      // We only want to warn if we're sure it's a new React.
	      if (context !== context.Consumer) {
	        if (!hasWarnedAboutUsingContextAsConsumer) {
	          hasWarnedAboutUsingContextAsConsumer = true;

	          error('Rendering <Context> directly is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
	        }
	      }
	    } else {
	      context = context._context;
	    }
	  }

	  var render = props.children;

	  {
	    if (typeof render !== 'function') {
	      error('A context consumer was rendered with multiple children, or a child ' + "that isn't a function. A context consumer expects a single child " + 'that is a function. If you did pass a function, make sure there ' + 'is no trailing or leading whitespace around it.');
	    }
	  }

	  var newValue = readContext(context);
	  var newChildren = render(newValue);
	  renderNodeDestructive(request, task, newChildren);
	}

	function renderContextProvider(request, task, type, props) {
	  var context = type._context;
	  var value = props.value;
	  var children = props.children;
	  var prevSnapshot;

	  {
	    prevSnapshot = task.context;
	  }

	  task.context = pushProvider(context, value);
	  renderNodeDestructive(request, task, children);
	  task.context = popProvider(context);

	  {
	    if (prevSnapshot !== task.context) {
	      error('Popping the context provider did not return back to the original snapshot. This is a bug in React.');
	    }
	  }
	}

	function renderLazyComponent(request, task, lazyComponent, props, ref) {
	  pushBuiltInComponentStackInDEV(task, 'Lazy');
	  var payload = lazyComponent._payload;
	  var init = lazyComponent._init;
	  var Component = init(payload);
	  var resolvedProps = resolveDefaultProps(Component, props);
	  renderElement(request, task, Component, resolvedProps, ref);
	  popComponentStackInDEV(task);
	}

	function renderElement(request, task, type, props, ref) {
	  if (typeof type === 'function') {
	    if (shouldConstruct$1(type)) {
	      renderClassComponent(request, task, type, props);
	      return;
	    } else {
	      renderIndeterminateComponent(request, task, type, props);
	      return;
	    }
	  }

	  if (typeof type === 'string') {
	    renderHostElement(request, task, type, props);
	    return;
	  }

	  switch (type) {
	    // TODO: LegacyHidden acts the same as a fragment. This only works
	    // because we currently assume that every instance of LegacyHidden is
	    // accompanied by a host component wrapper. In the hidden mode, the host
	    // component is given a `hidden` attribute, which ensures that the
	    // initial HTML is not visible. To support the use of LegacyHidden as a
	    // true fragment, without an extra DOM node, we would have to hide the
	    // initial HTML in some other way.
	    // TODO: Add REACT_OFFSCREEN_TYPE here too with the same capability.
	    case REACT_LEGACY_HIDDEN_TYPE:
	    case REACT_DEBUG_TRACING_MODE_TYPE:
	    case REACT_STRICT_MODE_TYPE:
	    case REACT_PROFILER_TYPE:
	    case REACT_FRAGMENT_TYPE:
	      {
	        renderNodeDestructive(request, task, props.children);
	        return;
	      }

	    case REACT_SUSPENSE_LIST_TYPE:
	      {
	        pushBuiltInComponentStackInDEV(task, 'SuspenseList'); // TODO: SuspenseList should control the boundaries.

	        renderNodeDestructive(request, task, props.children);
	        popComponentStackInDEV(task);
	        return;
	      }

	    case REACT_SCOPE_TYPE:
	      {

	        throw new Error('ReactDOMServer does not yet support scope components.');
	      }
	    // eslint-disable-next-line-no-fallthrough

	    case REACT_SUSPENSE_TYPE:
	      {
	        {
	          renderSuspenseBoundary(request, task, props);
	        }

	        return;
	      }
	  }

	  if (typeof type === 'object' && type !== null) {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        {
	          renderForwardRef(request, task, type, props, ref);
	          return;
	        }

	      case REACT_MEMO_TYPE:
	        {
	          renderMemo(request, task, type, props, ref);
	          return;
	        }

	      case REACT_PROVIDER_TYPE:
	        {
	          renderContextProvider(request, task, type, props);
	          return;
	        }

	      case REACT_CONTEXT_TYPE:
	        {
	          renderContextConsumer(request, task, type, props);
	          return;
	        }

	      case REACT_LAZY_TYPE:
	        {
	          renderLazyComponent(request, task, type, props);
	          return;
	        }
	    }
	  }

	  var info = '';

	  {
	    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
	    }
	  }

	  throw new Error('Element type is invalid: expected a string (for built-in ' + 'components) or a class/function (for composite components) ' + ("but got: " + (type == null ? type : typeof type) + "." + info));
	}

	function validateIterable(iterable, iteratorFn) {
	  {
	    // We don't support rendering Generators because it's a mutation.
	    // See https://github.com/facebook/react/issues/12995
	    if (typeof Symbol === 'function' && // $FlowFixMe Flow doesn't know about toStringTag
	    iterable[Symbol.toStringTag] === 'Generator') {
	      if (!didWarnAboutGenerators) {
	        error('Using Generators as children is unsupported and will likely yield ' + 'unexpected results because enumerating a generator mutates it. ' + 'You may convert it to an array with `Array.from()` or the ' + '`[...spread]` operator before rendering. Keep in mind ' + 'you might need to polyfill these features for older browsers.');
	      }

	      didWarnAboutGenerators = true;
	    } // Warn about using Maps as children


	    if (iterable.entries === iteratorFn) {
	      if (!didWarnAboutMaps) {
	        error('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
	      }

	      didWarnAboutMaps = true;
	    }
	  }
	} // This function by it self renders a node and consumes the task by mutating it
	// to update the current execution state.


	function renderNodeDestructive(request, task, node) {
	  // Stash the node we're working on. We'll pick up from this task in case
	  // something suspends.
	  task.node = node; // Handle object types

	  if (typeof node === 'object' && node !== null) {
	    switch (node.$$typeof) {
	      case REACT_ELEMENT_TYPE:
	        {
	          var element = node;
	          var type = element.type;
	          var props = element.props;
	          var ref = element.ref;
	          renderElement(request, task, type, props, ref);
	          return;
	        }

	      case REACT_PORTAL_TYPE:
	        throw new Error('Portals are not currently supported by the server renderer. ' + 'Render them conditionally so that they only appear on the client render.');
	      // eslint-disable-next-line-no-fallthrough

	      case REACT_LAZY_TYPE:
	        {
	          {
	            var lazyNode = node;
	            var payload = lazyNode._payload;
	            var init = lazyNode._init;
	            var resolvedNode = init(payload);
	            renderNodeDestructive(request, task, resolvedNode);
	            return;
	          }
	        }
	    }

	    if (isArray(node)) {
	      renderChildrenArray(request, task, node);
	      return;
	    }

	    var iteratorFn = getIteratorFn(node);

	    if (iteratorFn) {
	      {
	        validateIterable(node, iteratorFn);
	      }

	      var iterator = iteratorFn.call(node);

	      if (iterator) {
	        // We need to know how many total children are in this set, so that we
	        // can allocate enough id slots to acommodate them. So we must exhaust
	        // the iterator before we start recursively rendering the children.
	        // TODO: This is not great but I think it's inherent to the id
	        // generation algorithm.
	        var step = iterator.next(); // If there are not entries, we need to push an empty so we start by checking that.

	        if (!step.done) {
	          var children = [];

	          do {
	            children.push(step.value);
	            step = iterator.next();
	          } while (!step.done);

	          renderChildrenArray(request, task, children);
	          return;
	        }

	        return;
	      }
	    }

	    var childString = Object.prototype.toString.call(node);
	    throw new Error("Objects are not valid as a React child (found: " + (childString === '[object Object]' ? 'object with keys {' + Object.keys(node).join(', ') + '}' : childString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
	  }

	  if (typeof node === 'string') {
	    pushTextInstance$1(task.blockedSegment.chunks, node, request.responseState);
	    return;
	  }

	  if (typeof node === 'number') {
	    pushTextInstance$1(task.blockedSegment.chunks, '' + node, request.responseState);
	    return;
	  }

	  {
	    if (typeof node === 'function') {
	      error('Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.');
	    }
	  }
	}

	function renderChildrenArray(request, task, children) {
	  var totalChildren = children.length;

	  for (var i = 0; i < totalChildren; i++) {
	    var prevTreeContext = task.treeContext;
	    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);

	    try {
	      // We need to use the non-destructive form so that we can safely pop back
	      // up and render the sibling if something suspends.
	      renderNode(request, task, children[i]);
	    } finally {
	      task.treeContext = prevTreeContext;
	    }
	  }
	}

	function spawnNewSuspendedTask(request, task, x) {
	  // Something suspended, we'll need to create a new segment and resolve it later.
	  var segment = task.blockedSegment;
	  var insertionIndex = segment.chunks.length;
	  var newSegment = createPendingSegment(request, insertionIndex, null, segment.formatContext);
	  segment.children.push(newSegment);
	  var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);

	  {
	    if (task.componentStack !== null) {
	      // We pop one task off the stack because the node that suspended will be tried again,
	      // which will add it back onto the stack.
	      newTask.componentStack = task.componentStack.parent;
	    }
	  }

	  var ping = newTask.ping;
	  x.then(ping, ping);
	} // This is a non-destructive form of rendering a node. If it suspends it spawns
	// a new task and restores the context of this task to what it was before.


	function renderNode(request, task, node) {
	  // TODO: Store segment.children.length here and reset it in case something
	  // suspended partially through writing something.
	  // Snapshot the current context in case something throws to interrupt the
	  // process.
	  var previousFormatContext = task.blockedSegment.formatContext;
	  var previousLegacyContext = task.legacyContext;
	  var previousContext = task.context;
	  var previousComponentStack = null;

	  {
	    previousComponentStack = task.componentStack;
	  }

	  try {
	    return renderNodeDestructive(request, task, node);
	  } catch (x) {
	    resetHooksState();

	    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
	      spawnNewSuspendedTask(request, task, x); // Restore the context. We assume that this will be restored by the inner
	      // functions in case nothing throws so we don't use "finally" here.

	      task.blockedSegment.formatContext = previousFormatContext;
	      task.legacyContext = previousLegacyContext;
	      task.context = previousContext; // Restore all active ReactContexts to what they were before.

	      switchContext(previousContext);

	      {
	        task.componentStack = previousComponentStack;
	      }

	      return;
	    } else {
	      // Restore the context. We assume that this will be restored by the inner
	      // functions in case nothing throws so we don't use "finally" here.
	      task.blockedSegment.formatContext = previousFormatContext;
	      task.legacyContext = previousLegacyContext;
	      task.context = previousContext; // Restore all active ReactContexts to what they were before.

	      switchContext(previousContext);

	      {
	        task.componentStack = previousComponentStack;
	      } // We assume that we don't need the correct context.
	      // Let's terminate the rest of the tree and don't render any siblings.


	      throw x;
	    }
	  }
	}

	function erroredTask(request, boundary, segment, error) {
	  // Report the error to a global handler.
	  logRecoverableError(request, error);

	  if (boundary === null) {
	    fatalError(request, error);
	  } else {
	    boundary.pendingTasks--;

	    if (!boundary.forceClientRender) {
	      boundary.forceClientRender = true; // Regardless of what happens next, this boundary won't be displayed,
	      // so we can flush it, if the parent already flushed.

	      if (boundary.parentFlushed) {
	        // We don't have a preference where in the queue this goes since it's likely
	        // to error on the client anyway. However, intentionally client-rendered
	        // boundaries should be flushed earlier so that they can start on the client.
	        // We reuse the same queue for errors.
	        request.clientRenderedBoundaries.push(boundary);
	      }
	    }
	  }

	  request.allPendingTasks--;

	  if (request.allPendingTasks === 0) {
	    var onAllReady = request.onAllReady;
	    onAllReady();
	  }
	}

	function abortTaskSoft(task) {
	  // This aborts task without aborting the parent boundary that it blocks.
	  // It's used for when we didn't need this task to complete the tree.
	  // If task was needed, then it should use abortTask instead.
	  var request = this;
	  var boundary = task.blockedBoundary;
	  var segment = task.blockedSegment;
	  segment.status = ABORTED;
	  finishedTask(request, boundary, segment);
	}

	function abortTask(task) {
	  // This aborts the task and aborts the parent that it blocks, putting it into
	  // client rendered mode.
	  var request = this;
	  var boundary = task.blockedBoundary;
	  var segment = task.blockedSegment;
	  segment.status = ABORTED;

	  if (boundary === null) {
	    request.allPendingTasks--; // We didn't complete the root so we have nothing to show. We can close
	    // the request;

	    if (request.status !== CLOSED) {
	      request.status = CLOSED;

	      if (request.destination !== null) {
	        close(request.destination);
	      }
	    }
	  } else {
	    boundary.pendingTasks--;

	    if (!boundary.forceClientRender) {
	      boundary.forceClientRender = true;

	      if (boundary.parentFlushed) {
	        request.clientRenderedBoundaries.push(boundary);
	      }
	    } // If this boundary was still pending then we haven't already cancelled its fallbacks.
	    // We'll need to abort the fallbacks, which will also error that parent boundary.


	    boundary.fallbackAbortableTasks.forEach(abortTask, request);
	    boundary.fallbackAbortableTasks.clear();
	    request.allPendingTasks--;

	    if (request.allPendingTasks === 0) {
	      var onAllReady = request.onAllReady;
	      onAllReady();
	    }
	  }
	}

	function queueCompletedSegment(boundary, segment) {
	  if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
	    // This is an empty segment. There's nothing to write, so we can instead transfer the ID
	    // to the child. That way any existing references point to the child.
	    var childSegment = segment.children[0];
	    childSegment.id = segment.id;
	    childSegment.parentFlushed = true;

	    if (childSegment.status === COMPLETED) {
	      queueCompletedSegment(boundary, childSegment);
	    }
	  } else {
	    var completedSegments = boundary.completedSegments;
	    completedSegments.push(segment);
	  }
	}

	function finishedTask(request, boundary, segment) {
	  if (boundary === null) {
	    if (segment.parentFlushed) {
	      if (request.completedRootSegment !== null) {
	        throw new Error('There can only be one root segment. This is a bug in React.');
	      }

	      request.completedRootSegment = segment;
	    }

	    request.pendingRootTasks--;

	    if (request.pendingRootTasks === 0) {
	      // We have completed the shell so the shell can't error anymore.
	      request.onShellError = noop$1;
	      var onShellReady = request.onShellReady;
	      onShellReady();
	    }
	  } else {
	    boundary.pendingTasks--;

	    if (boundary.forceClientRender) ; else if (boundary.pendingTasks === 0) {
	      // This must have been the last segment we were waiting on. This boundary is now complete.
	      if (segment.parentFlushed) {
	        // Our parent segment already flushed, so we need to schedule this segment to be emitted.
	        // If it is a segment that was aborted, we'll write other content instead so we don't need
	        // to emit it.
	        if (segment.status === COMPLETED) {
	          queueCompletedSegment(boundary, segment);
	        }
	      }

	      if (boundary.parentFlushed) {
	        // The segment might be part of a segment that didn't flush yet, but if the boundary's
	        // parent flushed, we need to schedule the boundary to be emitted.
	        request.completedBoundaries.push(boundary);
	      } // We can now cancel any pending task on the fallback since we won't need to show it anymore.
	      // This needs to happen after we read the parentFlushed flags because aborting can finish
	      // work which can trigger user code, which can start flushing, which can change those flags.


	      boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
	      boundary.fallbackAbortableTasks.clear();
	    } else {
	      if (segment.parentFlushed) {
	        // Our parent already flushed, so we need to schedule this segment to be emitted.
	        // If it is a segment that was aborted, we'll write other content instead so we don't need
	        // to emit it.
	        if (segment.status === COMPLETED) {
	          queueCompletedSegment(boundary, segment);
	          var completedSegments = boundary.completedSegments;

	          if (completedSegments.length === 1) {
	            // This is the first time since we last flushed that we completed anything.
	            // We can schedule this boundary to emit its partially completed segments early
	            // in case the parent has already been flushed.
	            if (boundary.parentFlushed) {
	              request.partialBoundaries.push(boundary);
	            }
	          }
	        }
	      }
	    }
	  }

	  request.allPendingTasks--;

	  if (request.allPendingTasks === 0) {
	    // This needs to be called at the very end so that we can synchronously write the result
	    // in the callback if needed.
	    var onAllReady = request.onAllReady;
	    onAllReady();
	  }
	}

	function retryTask(request, task) {
	  var segment = task.blockedSegment;

	  if (segment.status !== PENDING) {
	    // We completed this by other means before we had a chance to retry it.
	    return;
	  } // We restore the context to what it was when we suspended.
	  // We don't restore it after we leave because it's likely that we'll end up
	  // needing a very similar context soon again.


	  switchContext(task.context);
	  var prevTaskInDEV = null;

	  {
	    prevTaskInDEV = currentTaskInDEV;
	    currentTaskInDEV = task;
	  }

	  try {
	    // We call the destructive form that mutates this task. That way if something
	    // suspends again, we can reuse the same task instead of spawning a new one.
	    renderNodeDestructive(request, task, task.node);
	    task.abortSet.delete(task);
	    segment.status = COMPLETED;
	    finishedTask(request, task.blockedBoundary, segment);
	  } catch (x) {
	    resetHooksState();

	    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
	      // Something suspended again, let's pick it back up later.
	      var ping = task.ping;
	      x.then(ping, ping);
	    } else {
	      task.abortSet.delete(task);
	      segment.status = ERRORED;
	      erroredTask(request, task.blockedBoundary, segment, x);
	    }
	  } finally {
	    {
	      currentTaskInDEV = prevTaskInDEV;
	    }
	  }
	}

	function performWork(request) {
	  if (request.status === CLOSED) {
	    return;
	  }

	  var prevContext = getActiveContext();
	  var prevDispatcher = ReactCurrentDispatcher$1.current;
	  ReactCurrentDispatcher$1.current = Dispatcher;
	  var prevGetCurrentStackImpl;

	  {
	    prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
	    ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
	  }

	  var prevResponseState = currentResponseState;
	  setCurrentResponseState(request.responseState);

	  try {
	    var pingedTasks = request.pingedTasks;
	    var i;

	    for (i = 0; i < pingedTasks.length; i++) {
	      var task = pingedTasks[i];
	      retryTask(request, task);
	    }

	    pingedTasks.splice(0, i);

	    if (request.destination !== null) {
	      flushCompletedQueues(request, request.destination);
	    }
	  } catch (error) {
	    logRecoverableError(request, error);
	    fatalError(request, error);
	  } finally {
	    setCurrentResponseState(prevResponseState);
	    ReactCurrentDispatcher$1.current = prevDispatcher;

	    {
	      ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
	    }

	    if (prevDispatcher === Dispatcher) {
	      // This means that we were in a reentrant work loop. This could happen
	      // in a renderer that supports synchronous work like renderToString,
	      // when it's called from within another renderer.
	      // Normally we don't bother switching the contexts to their root/default
	      // values when leaving because we'll likely need the same or similar
	      // context again. However, when we're inside a synchronous loop like this
	      // we'll to restore the context to what it was before returning.
	      switchContext(prevContext);
	    }
	  }
	}

	function flushSubtree(request, destination, segment) {
	  segment.parentFlushed = true;

	  switch (segment.status) {
	    case PENDING:
	      {
	        // We're emitting a placeholder for this segment to be filled in later.
	        // Therefore we'll need to assign it an ID - to refer to it by.
	        var segmentID = segment.id = request.nextSegmentId++;
	        return writePlaceholder(destination, request.responseState, segmentID);
	      }

	    case COMPLETED:
	      {
	        segment.status = FLUSHED;
	        var r = true;
	        var chunks = segment.chunks;
	        var chunkIdx = 0;
	        var children = segment.children;

	        for (var childIdx = 0; childIdx < children.length; childIdx++) {
	          var nextChild = children[childIdx]; // Write all the chunks up until the next child.

	          for (; chunkIdx < nextChild.index; chunkIdx++) {
	            writeChunk(destination, chunks[chunkIdx]);
	          }

	          r = flushSegment(request, destination, nextChild);
	        } // Finally just write all the remaining chunks


	        for (; chunkIdx < chunks.length - 1; chunkIdx++) {
	          writeChunk(destination, chunks[chunkIdx]);
	        }

	        if (chunkIdx < chunks.length) {
	          r = writeChunkAndReturn(destination, chunks[chunkIdx]);
	        }

	        return r;
	      }

	    default:
	      {
	        throw new Error('Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.');
	      }
	  }
	}

	function flushSegment(request, destination, segment) {
	  var boundary = segment.boundary;

	  if (boundary === null) {
	    // Not a suspense boundary.
	    return flushSubtree(request, destination, segment);
	  }

	  boundary.parentFlushed = true; // This segment is a Suspense boundary. We need to decide whether to
	  // emit the content or the fallback now.

	  if (boundary.forceClientRender) {
	    // Emit a client rendered suspense boundary wrapper.
	    // We never queue the inner boundary so we'll never emit its content or partial segments.
	    writeStartClientRenderedSuspenseBoundary$1(destination, request.responseState); // Flush the fallback.

	    flushSubtree(request, destination, segment);
	    return writeEndClientRenderedSuspenseBoundary$1(destination, request.responseState);
	  } else if (boundary.pendingTasks > 0) {
	    // This boundary is still loading. Emit a pending suspense boundary wrapper.
	    // Assign an ID to refer to the future content by.
	    boundary.rootSegmentID = request.nextSegmentId++;

	    if (boundary.completedSegments.length > 0) {
	      // If this is at least partially complete, we can queue it to be partially emitted early.
	      request.partialBoundaries.push(boundary);
	    } /// This is the first time we should have referenced this ID.


	    var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
	    writeStartPendingSuspenseBoundary(destination, request.responseState, id); // Flush the fallback.

	    flushSubtree(request, destination, segment);
	    return writeEndPendingSuspenseBoundary(destination, request.responseState);
	  } else if (boundary.byteSize > request.progressiveChunkSize) {
	    // This boundary is large and will be emitted separately so that we can progressively show
	    // other content. We add it to the queue during the flush because we have to ensure that
	    // the parent flushes first so that there's something to inject it into.
	    // We also have to make sure that it's emitted into the queue in a deterministic slot.
	    // I.e. we can't insert it here when it completes.
	    // Assign an ID to refer to the future content by.
	    boundary.rootSegmentID = request.nextSegmentId++;
	    request.completedBoundaries.push(boundary); // Emit a pending rendered suspense boundary wrapper.

	    writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id); // Flush the fallback.

	    flushSubtree(request, destination, segment);
	    return writeEndPendingSuspenseBoundary(destination, request.responseState);
	  } else {
	    // We can inline this boundary's content as a complete boundary.
	    writeStartCompletedSuspenseBoundary$1(destination, request.responseState);
	    var completedSegments = boundary.completedSegments;

	    if (completedSegments.length !== 1) {
	      throw new Error('A previously unvisited boundary must have exactly one root segment. This is a bug in React.');
	    }

	    var contentSegment = completedSegments[0];
	    flushSegment(request, destination, contentSegment);
	    return writeEndCompletedSuspenseBoundary$1(destination, request.responseState);
	  }
	}

	function flushClientRenderedBoundary(request, destination, boundary) {
	  return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id);
	}

	function flushSegmentContainer(request, destination, segment) {
	  writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
	  flushSegment(request, destination, segment);
	  return writeEndSegment(destination, segment.formatContext);
	}

	function flushCompletedBoundary(request, destination, boundary) {
	  var completedSegments = boundary.completedSegments;
	  var i = 0;

	  for (; i < completedSegments.length; i++) {
	    var segment = completedSegments[i];
	    flushPartiallyCompletedSegment(request, destination, boundary, segment);
	  }

	  completedSegments.length = 0;
	  return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
	}

	function flushPartialBoundary(request, destination, boundary) {
	  var completedSegments = boundary.completedSegments;
	  var i = 0;

	  for (; i < completedSegments.length; i++) {
	    var segment = completedSegments[i];

	    if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
	      i++;
	      completedSegments.splice(0, i); // Only write as much as the buffer wants. Something higher priority
	      // might want to write later.

	      return false;
	    }
	  }

	  completedSegments.splice(0, i);
	  return true;
	}

	function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
	  if (segment.status === FLUSHED) {
	    // We've already flushed this inline.
	    return true;
	  }

	  var segmentID = segment.id;

	  if (segmentID === -1) {
	    // This segment wasn't previously referred to. This happens at the root of
	    // a boundary. We make kind of a leap here and assume this is the root.
	    var rootSegmentID = segment.id = boundary.rootSegmentID;

	    if (rootSegmentID === -1) {
	      throw new Error('A root segment ID must have been assigned by now. This is a bug in React.');
	    }

	    return flushSegmentContainer(request, destination, segment);
	  } else {
	    flushSegmentContainer(request, destination, segment);
	    return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
	  }
	}

	function flushCompletedQueues(request, destination) {

	  try {
	    // The structure of this is to go through each queue one by one and write
	    // until the sink tells us to stop. When we should stop, we still finish writing
	    // that item fully and then yield. At that point we remove the already completed
	    // items up until the point we completed them.
	    // TODO: Emit preloading.
	    // TODO: It's kind of unfortunate to keep checking this array after we've already
	    // emitted the root.
	    var completedRootSegment = request.completedRootSegment;

	    if (completedRootSegment !== null && request.pendingRootTasks === 0) {
	      flushSegment(request, destination, completedRootSegment);
	      request.completedRootSegment = null;
	      writeCompletedRoot(destination, request.responseState);
	    } // We emit client rendering instructions for already emitted boundaries first.
	    // This is so that we can signal to the client to start client rendering them as
	    // soon as possible.


	    var clientRenderedBoundaries = request.clientRenderedBoundaries;
	    var i;

	    for (i = 0; i < clientRenderedBoundaries.length; i++) {
	      var boundary = clientRenderedBoundaries[i];

	      if (!flushClientRenderedBoundary(request, destination, boundary)) {
	        request.destination = null;
	        i++;
	        clientRenderedBoundaries.splice(0, i);
	        return;
	      }
	    }

	    clientRenderedBoundaries.splice(0, i); // Next we emit any complete boundaries. It's better to favor boundaries
	    // that are completely done since we can actually show them, than it is to emit
	    // any individual segments from a partially complete boundary.

	    var completedBoundaries = request.completedBoundaries;

	    for (i = 0; i < completedBoundaries.length; i++) {
	      var _boundary = completedBoundaries[i];

	      if (!flushCompletedBoundary(request, destination, _boundary)) {
	        request.destination = null;
	        i++;
	        completedBoundaries.splice(0, i);
	        return;
	      }
	    }

	    completedBoundaries.splice(0, i); // Allow anything written so far to flush to the underlying sink before
	    // we continue with lower priorities.

	    completeWriting(destination);
	    beginWriting(destination); // TODO: Here we'll emit data used by hydration.
	    // Next we emit any segments of any boundaries that are partially complete
	    // but not deeply complete.

	    var partialBoundaries = request.partialBoundaries;

	    for (i = 0; i < partialBoundaries.length; i++) {
	      var _boundary2 = partialBoundaries[i];

	      if (!flushPartialBoundary(request, destination, _boundary2)) {
	        request.destination = null;
	        i++;
	        partialBoundaries.splice(0, i);
	        return;
	      }
	    }

	    partialBoundaries.splice(0, i); // Next we check the completed boundaries again. This may have had
	    // boundaries added to it in case they were too larged to be inlined.
	    // New ones might be added in this loop.

	    var largeBoundaries = request.completedBoundaries;

	    for (i = 0; i < largeBoundaries.length; i++) {
	      var _boundary3 = largeBoundaries[i];

	      if (!flushCompletedBoundary(request, destination, _boundary3)) {
	        request.destination = null;
	        i++;
	        largeBoundaries.splice(0, i);
	        return;
	      }
	    }

	    largeBoundaries.splice(0, i);
	  } finally {

	    if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0 // We don't need to check any partially completed segments because
	    // either they have pending task or they're complete.
	    ) {
	        {
	          if (request.abortableTasks.size !== 0) {
	            error('There was still abortable task at the root when we closed. This is a bug in React.');
	          }
	        } // We're done.


	        close(destination);
	      }
	  }
	}

	function startWork(request) {
	  scheduleWork(function () {
	    return performWork(request);
	  });
	}
	function startFlowing(request, destination) {
	  if (request.status === CLOSING) {
	    request.status = CLOSED;
	    closeWithError(destination, request.fatalError);
	    return;
	  }

	  if (request.status === CLOSED) {
	    return;
	  }

	  if (request.destination !== null) {
	    // We're already flowing.
	    return;
	  }

	  request.destination = destination;

	  try {
	    flushCompletedQueues(request, destination);
	  } catch (error) {
	    logRecoverableError(request, error);
	    fatalError(request, error);
	  }
	} // This is called to early terminate a request. It puts all pending boundaries in client rendered state.

	function abort(request) {
	  try {
	    var abortableTasks = request.abortableTasks;
	    abortableTasks.forEach(abortTask, request);
	    abortableTasks.clear();

	    if (request.destination !== null) {
	      flushCompletedQueues(request, request.destination);
	    }
	  } catch (error) {
	    logRecoverableError(request, error);
	    fatalError(request, error);
	  }
	}

	function onError() {// Non-fatal errors are ignored.
	}

	function renderToStringImpl(children, options, generateStaticMarkup) {
	  var didFatal = false;
	  var fatalError = null;
	  var result = '';
	  var destination = {
	    push: function (chunk) {
	      if (chunk !== null) {
	        result += chunk;
	      }

	      return true;
	    },
	    destroy: function (error) {
	      didFatal = true;
	      fatalError = error;
	    }
	  };
	  var readyToStream = false;

	  function onShellReady() {
	    readyToStream = true;
	  }

	  var request = createRequest(children, createResponseState$1(generateStaticMarkup, options ? options.identifierPrefix : undefined), createRootFormatContext(), Infinity, onError, undefined, onShellReady, undefined, undefined);
	  startWork(request); // If anything suspended and is still pending, we'll abort it before writing.
	  // That way we write only client-rendered boundaries from the start.

	  abort(request);
	  startFlowing(request, destination);

	  if (didFatal) {
	    throw fatalError;
	  }

	  if (!readyToStream) {
	    // Note: This error message is the one we use on the client. It doesn't
	    // really make sense here. But this is the legacy server renderer, anyway.
	    // We're going to delete it soon.
	    throw new Error('A component suspended while responding to synchronous input. This ' + 'will cause the UI to be replaced with a loading indicator. To fix, ' + 'updates that suspend should be wrapped with startTransition.');
	  }

	  return result;
	}

	function renderToString(children, options) {
	  return renderToStringImpl(children, options, false);
	}

	function renderToStaticMarkup(children, options) {
	  return renderToStringImpl(children, options, true);
	}

	function renderToNodeStream() {
	  throw new Error('ReactDOMServer.renderToNodeStream(): The streaming API is not available ' + 'in the browser. Use ReactDOMServer.renderToString() instead.');
	}

	function renderToStaticNodeStream() {
	  throw new Error('ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available ' + 'in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.');
	}

	exports.renderToNodeStream = renderToNodeStream;
	exports.renderToStaticMarkup = renderToStaticMarkup;
	exports.renderToStaticNodeStream = renderToStaticNodeStream;
	exports.renderToString = renderToString;
	exports.version = ReactVersion;
	  })();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * @license React
	 * react-dom-server.browser.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (process.env.NODE_ENV !== "production") {
	  (function() {
	'use strict';

	var React = __webpack_require__(1);

	var ReactVersion = '18.0.0-fc46dba67-20220329';

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	// by calls to these methods by a Babel plugin.
	//
	// In PROD (or in packages without access to React internals),
	// they are left as they are instead.

	function warn(format) {
	  {
	    {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      printWarning('warn', format, args);
	    }
	  }
	}
	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	function scheduleWork(callback) {
	  callback();
	}
	var VIEW_SIZE = 512;
	var currentView = null;
	var writtenBytes = 0;
	function beginWriting(destination) {
	  currentView = new Uint8Array(VIEW_SIZE);
	  writtenBytes = 0;
	}
	function writeChunk(destination, chunk) {
	  if (chunk.length === 0) {
	    return;
	  }

	  if (chunk.length > VIEW_SIZE) {
	    // this chunk may overflow a single view which implies it was not
	    // one that is cached by the streaming renderer. We will enqueu
	    // it directly and expect it is not re-used
	    if (writtenBytes > 0) {
	      destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
	      currentView = new Uint8Array(VIEW_SIZE);
	      writtenBytes = 0;
	    }

	    destination.enqueue(chunk);
	    return;
	  }

	  var bytesToWrite = chunk;
	  var allowableBytes = currentView.length - writtenBytes;

	  if (allowableBytes < bytesToWrite.length) {
	    // this chunk would overflow the current view. We enqueue a full view
	    // and start a new view with the remaining chunk
	    if (allowableBytes === 0) {
	      // the current view is already full, send it
	      destination.enqueue(currentView);
	    } else {
	      // fill up the current view and apply the remaining chunk bytes
	      // to a new view.
	      currentView.set(bytesToWrite.subarray(0, allowableBytes), writtenBytes); // writtenBytes += allowableBytes; // this can be skipped because we are going to immediately reset the view

	      destination.enqueue(currentView);
	      bytesToWrite = bytesToWrite.subarray(allowableBytes);
	    }

	    currentView = new Uint8Array(VIEW_SIZE);
	    writtenBytes = 0;
	  }

	  currentView.set(bytesToWrite, writtenBytes);
	  writtenBytes += bytesToWrite.length;
	}
	function writeChunkAndReturn(destination, chunk) {
	  writeChunk(destination, chunk); // in web streams there is no backpressure so we can alwas write more

	  return true;
	}
	function completeWriting(destination) {
	  if (currentView && writtenBytes > 0) {
	    destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
	    currentView = null;
	    writtenBytes = 0;
	  }
	}
	function close(destination) {
	  destination.close();
	}
	var textEncoder = new TextEncoder();
	function stringToChunk(content) {
	  return textEncoder.encode(content);
	}
	function stringToPrecomputedChunk(content) {
	  return textEncoder.encode(content);
	}
	function closeWithError(destination, error) {
	  if (typeof destination.error === 'function') {
	    // $FlowFixMe: This is an Error object or the destination accepts other types.
	    destination.error(error);
	  } else {
	    // Earlier implementations doesn't support this method. In that environment you're
	    // supposed to throw from a promise returned but we don't return a promise in our
	    // approach. We could fork this implementation but this is environment is an edge
	    // case to begin with. It's even less common to run this in an older environment.
	    // Even then, this is not where errors are supposed to happen and they get reported
	    // to a global callback in addition to this anyway. So it's fine just to close this.
	    destination.close();
	  }
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}

	function checkAttributeStringCoercion(value, attributeName) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided `%s` attribute is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', attributeName, typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}
	function checkCSSPropertyStringCoercion(value, propName) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided `%s` CSS property is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', propName, typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}
	function checkHtmlStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided HTML markup uses a value of unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	// A reserved attribute.
	// It is handled by React separately and shouldn't be written to the DOM.
	var RESERVED = 0; // A simple string attribute.
	// Attributes that aren't in the filter are presumed to have this type.

	var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
	// "enumerated" attributes with "true" and "false" as possible values.
	// When true, it should be set to a "true" string.
	// When false, it should be set to a "false" string.

	var BOOLEANISH_STRING = 2; // A real boolean attribute.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.

	var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
	// When true, it should be present (set either to an empty string or its name).
	// When false, it should be omitted.
	// For any other value, should be present with that value.

	var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
	// When falsy, it should be removed.

	var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
	// When falsy, it should be removed.

	var POSITIVE_NUMERIC = 6;

	/* eslint-disable max-len */
	var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
	/* eslint-enable max-len */

	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
	var illegalAttributeNameCache = {};
	var validatedAttributeNameCache = {};
	function isAttributeNameSafe(attributeName) {
	  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
	    return true;
	  }

	  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
	    return false;
	  }

	  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
	    validatedAttributeNameCache[attributeName] = true;
	    return true;
	  }

	  illegalAttributeNameCache[attributeName] = true;

	  {
	    error('Invalid attribute name: `%s`', attributeName);
	  }

	  return false;
	}
	function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
	  if (propertyInfo !== null && propertyInfo.type === RESERVED) {
	    return false;
	  }

	  switch (typeof value) {
	    case 'function': // $FlowIssue symbol is perfectly valid here

	    case 'symbol':
	      // eslint-disable-line
	      return true;

	    case 'boolean':
	      {
	        if (isCustomComponentTag) {
	          return false;
	        }

	        if (propertyInfo !== null) {
	          return !propertyInfo.acceptsBooleans;
	        } else {
	          var prefix = name.toLowerCase().slice(0, 5);
	          return prefix !== 'data-' && prefix !== 'aria-';
	        }
	      }

	    default:
	      return false;
	  }
	}
	function getPropertyInfo(name) {
	  return properties.hasOwnProperty(name) ? properties[name] : null;
	}

	function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
	  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
	  this.attributeName = attributeName;
	  this.attributeNamespace = attributeNamespace;
	  this.mustUseProperty = mustUseProperty;
	  this.propertyName = name;
	  this.type = type;
	  this.sanitizeURL = sanitizeURL;
	  this.removeEmptyString = removeEmptyString;
	} // When adding attributes to this list, be sure to also add them to
	// the `possibleStandardNames` module to ensure casing and incorrect
	// name warnings.


	var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

	var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
	// elements (not just inputs). Now that ReactDOMInput assigns to the
	// defaultValue property -- do we need this?
	'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];

	reservedProps.forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // A few React string attributes have a different name.
	// This is a mapping from React prop names to the attribute names.

	[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
	  var name = _ref[0],
	      attributeName = _ref[1];
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" HTML attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).

	['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are "enumerated" SVG attributes that accept "true" and "false".
	// In React, we let users pass `true` and `false` even though technically
	// these aren't boolean attributes (they are coerced to strings).
	// Since these are SVG attributes, their attribute names are case-sensitive.

	['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML boolean attributes.

	['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
	// on the client side because the browsers are inconsistent. Instead we call focus().
	'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'disableRemotePlayback', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
	'itemScope'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are the few React props that we set as DOM properties
	// rather than attributes. These are all booleans.

	['checked', // Note: `option.selected` is not updated if `select.multiple` is
	// disabled with `removeAttribute`. We have special logic for handling this.
	'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that are "overloaded booleans": they behave like
	// booleans, but can also accept a string value.

	['capture', 'download' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be positive numbers.

	['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
	  name, // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These are HTML attributes that must be numbers.

	['rowSpan', 'start'].forEach(function (name) {
	  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
	  name.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	});
	var CAMELIZE = /[\-\:]([a-z])/g;

	var capitalize = function (token) {
	  return token[1].toUpperCase();
	}; // This is a list of all SVG attributes that need special casing, namespacing,
	// or boolean value assignment. Regular attributes that just accept strings
	// and have the same names are omitted, just like in the HTML attribute filter.
	// Some of these attributes can be hard to find. This list was created by
	// scraping the MDN documentation.


	['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xlink namespace.

	['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/1999/xlink', false, // sanitizeURL
	  false);
	}); // String SVG attributes with the xml namespace.

	['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
	// you'll need to set attributeName to name.toLowerCase()
	// instead in the assignment below.
	].forEach(function (attributeName) {
	  var name = attributeName.replace(CAMELIZE, capitalize);
	  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
	  attributeName, 'http://www.w3.org/XML/1998/namespace', false, // sanitizeURL
	  false);
	}); // These attribute exists both in HTML and SVG.
	// The attribute name is case-sensitive in SVG so we can't just use
	// the React name like we do for attributes that exist only in HTML.

	['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  false, // sanitizeURL
	  false);
	}); // These attributes accept URLs. These must not allow javascript: URLS.
	// These will also need to accept Trusted Types object in the future.

	var xlinkHref = 'xlinkHref';
	properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
	'xlink:href', 'http://www.w3.org/1999/xlink', true, // sanitizeURL
	false);
	['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
	  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
	  attributeName.toLowerCase(), // attributeName
	  null, // attributeNamespace
	  true, // sanitizeURL
	  true);
	});

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  animationIterationCount: true,
	  aspectRatio: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  columns: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridArea: true,
	  gridRow: true,
	  gridRowEnd: true,
	  gridRowSpan: true,
	  gridRowStart: true,
	  gridColumn: true,
	  gridColumnEnd: true,
	  gridColumnSpan: true,
	  gridColumnStart: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,
	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};
	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */

	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}
	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */


	var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.

	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	var hasReadOnlyValue = {
	  button: true,
	  checkbox: true,
	  image: true,
	  hidden: true,
	  radio: true,
	  reset: true,
	  submit: true
	};
	function checkControlledValueProps(tagName, props) {
	  {
	    if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
	      error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    }

	    if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
	      error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
	    }
	  }
	}

	function isCustomComponent(tagName, props) {
	  if (tagName.indexOf('-') === -1) {
	    return typeof props.is === 'string';
	  }

	  switch (tagName) {
	    // These are reserved SVG and MathML elements.
	    // We don't mind this list too much because we expect it to never grow.
	    // The alternative is to track the namespace in a few places which is convoluted.
	    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
	    case 'annotation-xml':
	    case 'color-profile':
	    case 'font-face':
	    case 'font-face-src':
	    case 'font-face-uri':
	    case 'font-face-format':
	    case 'font-face-name':
	    case 'missing-glyph':
	      return false;

	    default:
	      return true;
	  }
	}

	var ariaProperties = {
	  'aria-current': 0,
	  // state
	  'aria-description': 0,
	  'aria-details': 0,
	  'aria-disabled': 0,
	  // state
	  'aria-hidden': 0,
	  // state
	  'aria-invalid': 0,
	  // state
	  'aria-keyshortcuts': 0,
	  'aria-label': 0,
	  'aria-roledescription': 0,
	  // Widget Attributes
	  'aria-autocomplete': 0,
	  'aria-checked': 0,
	  'aria-expanded': 0,
	  'aria-haspopup': 0,
	  'aria-level': 0,
	  'aria-modal': 0,
	  'aria-multiline': 0,
	  'aria-multiselectable': 0,
	  'aria-orientation': 0,
	  'aria-placeholder': 0,
	  'aria-pressed': 0,
	  'aria-readonly': 0,
	  'aria-required': 0,
	  'aria-selected': 0,
	  'aria-sort': 0,
	  'aria-valuemax': 0,
	  'aria-valuemin': 0,
	  'aria-valuenow': 0,
	  'aria-valuetext': 0,
	  // Live Region Attributes
	  'aria-atomic': 0,
	  'aria-busy': 0,
	  'aria-live': 0,
	  'aria-relevant': 0,
	  // Drag-and-Drop Attributes
	  'aria-dropeffect': 0,
	  'aria-grabbed': 0,
	  // Relationship Attributes
	  'aria-activedescendant': 0,
	  'aria-colcount': 0,
	  'aria-colindex': 0,
	  'aria-colspan': 0,
	  'aria-controls': 0,
	  'aria-describedby': 0,
	  'aria-errormessage': 0,
	  'aria-flowto': 0,
	  'aria-labelledby': 0,
	  'aria-owns': 0,
	  'aria-posinset': 0,
	  'aria-rowcount': 0,
	  'aria-rowindex': 0,
	  'aria-rowspan': 0,
	  'aria-setsize': 0
	};

	var warnedProperties = {};
	var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
	var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

	function validateProperty(tagName, name) {
	  {
	    if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
	      return true;
	    }

	    if (rARIACamel.test(name)) {
	      var ariaName = 'aria-' + name.slice(4).toLowerCase();
	      var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null; // If this is an aria-* attribute, but is not listed in the known DOM
	      // DOM properties, then it is an invalid aria-* attribute.

	      if (correctName == null) {
	        error('Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.', name);

	        warnedProperties[name] = true;
	        return true;
	      } // aria-* attributes should be lowercase; suggest the lowercase version.


	      if (name !== correctName) {
	        error('Invalid ARIA attribute `%s`. Did you mean `%s`?', name, correctName);

	        warnedProperties[name] = true;
	        return true;
	      }
	    }

	    if (rARIA.test(name)) {
	      var lowerCasedName = name.toLowerCase();
	      var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null; // If this is an aria-* attribute, but is not listed in the known DOM
	      // DOM properties, then it is an invalid aria-* attribute.

	      if (standardName == null) {
	        warnedProperties[name] = true;
	        return false;
	      } // aria-* attributes should be lowercase; suggest the lowercase version.


	      if (name !== standardName) {
	        error('Unknown ARIA attribute `%s`. Did you mean `%s`?', name, standardName);

	        warnedProperties[name] = true;
	        return true;
	      }
	    }
	  }

	  return true;
	}

	function warnInvalidARIAProps(type, props) {
	  {
	    var invalidProps = [];

	    for (var key in props) {
	      var isValid = validateProperty(type, key);

	      if (!isValid) {
	        invalidProps.push(key);
	      }
	    }

	    var unknownPropString = invalidProps.map(function (prop) {
	      return '`' + prop + '`';
	    }).join(', ');

	    if (invalidProps.length === 1) {
	      error('Invalid aria prop %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
	    } else if (invalidProps.length > 1) {
	      error('Invalid aria props %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
	    }
	  }
	}

	function validateProperties(type, props) {
	  if (isCustomComponent(type, props)) {
	    return;
	  }

	  warnInvalidARIAProps(type, props);
	}

	var didWarnValueNull = false;
	function validateProperties$1(type, props) {
	  {
	    if (type !== 'input' && type !== 'textarea' && type !== 'select') {
	      return;
	    }

	    if (props != null && props.value === null && !didWarnValueNull) {
	      didWarnValueNull = true;

	      if (type === 'select' && props.multiple) {
	        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.', type);
	      } else {
	        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.', type);
	      }
	    }
	  }
	}

	// When adding attributes to the HTML or SVG allowed attribute list, be sure to
	// also add them to this module to ensure casing and incorrect name
	// warnings.
	var possibleStandardNames = {
	  // HTML
	  accept: 'accept',
	  acceptcharset: 'acceptCharset',
	  'accept-charset': 'acceptCharset',
	  accesskey: 'accessKey',
	  action: 'action',
	  allowfullscreen: 'allowFullScreen',
	  alt: 'alt',
	  as: 'as',
	  async: 'async',
	  autocapitalize: 'autoCapitalize',
	  autocomplete: 'autoComplete',
	  autocorrect: 'autoCorrect',
	  autofocus: 'autoFocus',
	  autoplay: 'autoPlay',
	  autosave: 'autoSave',
	  capture: 'capture',
	  cellpadding: 'cellPadding',
	  cellspacing: 'cellSpacing',
	  challenge: 'challenge',
	  charset: 'charSet',
	  checked: 'checked',
	  children: 'children',
	  cite: 'cite',
	  class: 'className',
	  classid: 'classID',
	  classname: 'className',
	  cols: 'cols',
	  colspan: 'colSpan',
	  content: 'content',
	  contenteditable: 'contentEditable',
	  contextmenu: 'contextMenu',
	  controls: 'controls',
	  controlslist: 'controlsList',
	  coords: 'coords',
	  crossorigin: 'crossOrigin',
	  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
	  data: 'data',
	  datetime: 'dateTime',
	  default: 'default',
	  defaultchecked: 'defaultChecked',
	  defaultvalue: 'defaultValue',
	  defer: 'defer',
	  dir: 'dir',
	  disabled: 'disabled',
	  disablepictureinpicture: 'disablePictureInPicture',
	  disableremoteplayback: 'disableRemotePlayback',
	  download: 'download',
	  draggable: 'draggable',
	  enctype: 'encType',
	  enterkeyhint: 'enterKeyHint',
	  for: 'htmlFor',
	  form: 'form',
	  formmethod: 'formMethod',
	  formaction: 'formAction',
	  formenctype: 'formEncType',
	  formnovalidate: 'formNoValidate',
	  formtarget: 'formTarget',
	  frameborder: 'frameBorder',
	  headers: 'headers',
	  height: 'height',
	  hidden: 'hidden',
	  high: 'high',
	  href: 'href',
	  hreflang: 'hrefLang',
	  htmlfor: 'htmlFor',
	  httpequiv: 'httpEquiv',
	  'http-equiv': 'httpEquiv',
	  icon: 'icon',
	  id: 'id',
	  imagesizes: 'imageSizes',
	  imagesrcset: 'imageSrcSet',
	  innerhtml: 'innerHTML',
	  inputmode: 'inputMode',
	  integrity: 'integrity',
	  is: 'is',
	  itemid: 'itemID',
	  itemprop: 'itemProp',
	  itemref: 'itemRef',
	  itemscope: 'itemScope',
	  itemtype: 'itemType',
	  keyparams: 'keyParams',
	  keytype: 'keyType',
	  kind: 'kind',
	  label: 'label',
	  lang: 'lang',
	  list: 'list',
	  loop: 'loop',
	  low: 'low',
	  manifest: 'manifest',
	  marginwidth: 'marginWidth',
	  marginheight: 'marginHeight',
	  max: 'max',
	  maxlength: 'maxLength',
	  media: 'media',
	  mediagroup: 'mediaGroup',
	  method: 'method',
	  min: 'min',
	  minlength: 'minLength',
	  multiple: 'multiple',
	  muted: 'muted',
	  name: 'name',
	  nomodule: 'noModule',
	  nonce: 'nonce',
	  novalidate: 'noValidate',
	  open: 'open',
	  optimum: 'optimum',
	  pattern: 'pattern',
	  placeholder: 'placeholder',
	  playsinline: 'playsInline',
	  poster: 'poster',
	  preload: 'preload',
	  profile: 'profile',
	  radiogroup: 'radioGroup',
	  readonly: 'readOnly',
	  referrerpolicy: 'referrerPolicy',
	  rel: 'rel',
	  required: 'required',
	  reversed: 'reversed',
	  role: 'role',
	  rows: 'rows',
	  rowspan: 'rowSpan',
	  sandbox: 'sandbox',
	  scope: 'scope',
	  scoped: 'scoped',
	  scrolling: 'scrolling',
	  seamless: 'seamless',
	  selected: 'selected',
	  shape: 'shape',
	  size: 'size',
	  sizes: 'sizes',
	  span: 'span',
	  spellcheck: 'spellCheck',
	  src: 'src',
	  srcdoc: 'srcDoc',
	  srclang: 'srcLang',
	  srcset: 'srcSet',
	  start: 'start',
	  step: 'step',
	  style: 'style',
	  summary: 'summary',
	  tabindex: 'tabIndex',
	  target: 'target',
	  title: 'title',
	  type: 'type',
	  usemap: 'useMap',
	  value: 'value',
	  width: 'width',
	  wmode: 'wmode',
	  wrap: 'wrap',
	  // SVG
	  about: 'about',
	  accentheight: 'accentHeight',
	  'accent-height': 'accentHeight',
	  accumulate: 'accumulate',
	  additive: 'additive',
	  alignmentbaseline: 'alignmentBaseline',
	  'alignment-baseline': 'alignmentBaseline',
	  allowreorder: 'allowReorder',
	  alphabetic: 'alphabetic',
	  amplitude: 'amplitude',
	  arabicform: 'arabicForm',
	  'arabic-form': 'arabicForm',
	  ascent: 'ascent',
	  attributename: 'attributeName',
	  attributetype: 'attributeType',
	  autoreverse: 'autoReverse',
	  azimuth: 'azimuth',
	  basefrequency: 'baseFrequency',
	  baselineshift: 'baselineShift',
	  'baseline-shift': 'baselineShift',
	  baseprofile: 'baseProfile',
	  bbox: 'bbox',
	  begin: 'begin',
	  bias: 'bias',
	  by: 'by',
	  calcmode: 'calcMode',
	  capheight: 'capHeight',
	  'cap-height': 'capHeight',
	  clip: 'clip',
	  clippath: 'clipPath',
	  'clip-path': 'clipPath',
	  clippathunits: 'clipPathUnits',
	  cliprule: 'clipRule',
	  'clip-rule': 'clipRule',
	  color: 'color',
	  colorinterpolation: 'colorInterpolation',
	  'color-interpolation': 'colorInterpolation',
	  colorinterpolationfilters: 'colorInterpolationFilters',
	  'color-interpolation-filters': 'colorInterpolationFilters',
	  colorprofile: 'colorProfile',
	  'color-profile': 'colorProfile',
	  colorrendering: 'colorRendering',
	  'color-rendering': 'colorRendering',
	  contentscripttype: 'contentScriptType',
	  contentstyletype: 'contentStyleType',
	  cursor: 'cursor',
	  cx: 'cx',
	  cy: 'cy',
	  d: 'd',
	  datatype: 'datatype',
	  decelerate: 'decelerate',
	  descent: 'descent',
	  diffuseconstant: 'diffuseConstant',
	  direction: 'direction',
	  display: 'display',
	  divisor: 'divisor',
	  dominantbaseline: 'dominantBaseline',
	  'dominant-baseline': 'dominantBaseline',
	  dur: 'dur',
	  dx: 'dx',
	  dy: 'dy',
	  edgemode: 'edgeMode',
	  elevation: 'elevation',
	  enablebackground: 'enableBackground',
	  'enable-background': 'enableBackground',
	  end: 'end',
	  exponent: 'exponent',
	  externalresourcesrequired: 'externalResourcesRequired',
	  fill: 'fill',
	  fillopacity: 'fillOpacity',
	  'fill-opacity': 'fillOpacity',
	  fillrule: 'fillRule',
	  'fill-rule': 'fillRule',
	  filter: 'filter',
	  filterres: 'filterRes',
	  filterunits: 'filterUnits',
	  floodopacity: 'floodOpacity',
	  'flood-opacity': 'floodOpacity',
	  floodcolor: 'floodColor',
	  'flood-color': 'floodColor',
	  focusable: 'focusable',
	  fontfamily: 'fontFamily',
	  'font-family': 'fontFamily',
	  fontsize: 'fontSize',
	  'font-size': 'fontSize',
	  fontsizeadjust: 'fontSizeAdjust',
	  'font-size-adjust': 'fontSizeAdjust',
	  fontstretch: 'fontStretch',
	  'font-stretch': 'fontStretch',
	  fontstyle: 'fontStyle',
	  'font-style': 'fontStyle',
	  fontvariant: 'fontVariant',
	  'font-variant': 'fontVariant',
	  fontweight: 'fontWeight',
	  'font-weight': 'fontWeight',
	  format: 'format',
	  from: 'from',
	  fx: 'fx',
	  fy: 'fy',
	  g1: 'g1',
	  g2: 'g2',
	  glyphname: 'glyphName',
	  'glyph-name': 'glyphName',
	  glyphorientationhorizontal: 'glyphOrientationHorizontal',
	  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
	  glyphorientationvertical: 'glyphOrientationVertical',
	  'glyph-orientation-vertical': 'glyphOrientationVertical',
	  glyphref: 'glyphRef',
	  gradienttransform: 'gradientTransform',
	  gradientunits: 'gradientUnits',
	  hanging: 'hanging',
	  horizadvx: 'horizAdvX',
	  'horiz-adv-x': 'horizAdvX',
	  horizoriginx: 'horizOriginX',
	  'horiz-origin-x': 'horizOriginX',
	  ideographic: 'ideographic',
	  imagerendering: 'imageRendering',
	  'image-rendering': 'imageRendering',
	  in2: 'in2',
	  in: 'in',
	  inlist: 'inlist',
	  intercept: 'intercept',
	  k1: 'k1',
	  k2: 'k2',
	  k3: 'k3',
	  k4: 'k4',
	  k: 'k',
	  kernelmatrix: 'kernelMatrix',
	  kernelunitlength: 'kernelUnitLength',
	  kerning: 'kerning',
	  keypoints: 'keyPoints',
	  keysplines: 'keySplines',
	  keytimes: 'keyTimes',
	  lengthadjust: 'lengthAdjust',
	  letterspacing: 'letterSpacing',
	  'letter-spacing': 'letterSpacing',
	  lightingcolor: 'lightingColor',
	  'lighting-color': 'lightingColor',
	  limitingconeangle: 'limitingConeAngle',
	  local: 'local',
	  markerend: 'markerEnd',
	  'marker-end': 'markerEnd',
	  markerheight: 'markerHeight',
	  markermid: 'markerMid',
	  'marker-mid': 'markerMid',
	  markerstart: 'markerStart',
	  'marker-start': 'markerStart',
	  markerunits: 'markerUnits',
	  markerwidth: 'markerWidth',
	  mask: 'mask',
	  maskcontentunits: 'maskContentUnits',
	  maskunits: 'maskUnits',
	  mathematical: 'mathematical',
	  mode: 'mode',
	  numoctaves: 'numOctaves',
	  offset: 'offset',
	  opacity: 'opacity',
	  operator: 'operator',
	  order: 'order',
	  orient: 'orient',
	  orientation: 'orientation',
	  origin: 'origin',
	  overflow: 'overflow',
	  overlineposition: 'overlinePosition',
	  'overline-position': 'overlinePosition',
	  overlinethickness: 'overlineThickness',
	  'overline-thickness': 'overlineThickness',
	  paintorder: 'paintOrder',
	  'paint-order': 'paintOrder',
	  panose1: 'panose1',
	  'panose-1': 'panose1',
	  pathlength: 'pathLength',
	  patterncontentunits: 'patternContentUnits',
	  patterntransform: 'patternTransform',
	  patternunits: 'patternUnits',
	  pointerevents: 'pointerEvents',
	  'pointer-events': 'pointerEvents',
	  points: 'points',
	  pointsatx: 'pointsAtX',
	  pointsaty: 'pointsAtY',
	  pointsatz: 'pointsAtZ',
	  prefix: 'prefix',
	  preservealpha: 'preserveAlpha',
	  preserveaspectratio: 'preserveAspectRatio',
	  primitiveunits: 'primitiveUnits',
	  property: 'property',
	  r: 'r',
	  radius: 'radius',
	  refx: 'refX',
	  refy: 'refY',
	  renderingintent: 'renderingIntent',
	  'rendering-intent': 'renderingIntent',
	  repeatcount: 'repeatCount',
	  repeatdur: 'repeatDur',
	  requiredextensions: 'requiredExtensions',
	  requiredfeatures: 'requiredFeatures',
	  resource: 'resource',
	  restart: 'restart',
	  result: 'result',
	  results: 'results',
	  rotate: 'rotate',
	  rx: 'rx',
	  ry: 'ry',
	  scale: 'scale',
	  security: 'security',
	  seed: 'seed',
	  shaperendering: 'shapeRendering',
	  'shape-rendering': 'shapeRendering',
	  slope: 'slope',
	  spacing: 'spacing',
	  specularconstant: 'specularConstant',
	  specularexponent: 'specularExponent',
	  speed: 'speed',
	  spreadmethod: 'spreadMethod',
	  startoffset: 'startOffset',
	  stddeviation: 'stdDeviation',
	  stemh: 'stemh',
	  stemv: 'stemv',
	  stitchtiles: 'stitchTiles',
	  stopcolor: 'stopColor',
	  'stop-color': 'stopColor',
	  stopopacity: 'stopOpacity',
	  'stop-opacity': 'stopOpacity',
	  strikethroughposition: 'strikethroughPosition',
	  'strikethrough-position': 'strikethroughPosition',
	  strikethroughthickness: 'strikethroughThickness',
	  'strikethrough-thickness': 'strikethroughThickness',
	  string: 'string',
	  stroke: 'stroke',
	  strokedasharray: 'strokeDasharray',
	  'stroke-dasharray': 'strokeDasharray',
	  strokedashoffset: 'strokeDashoffset',
	  'stroke-dashoffset': 'strokeDashoffset',
	  strokelinecap: 'strokeLinecap',
	  'stroke-linecap': 'strokeLinecap',
	  strokelinejoin: 'strokeLinejoin',
	  'stroke-linejoin': 'strokeLinejoin',
	  strokemiterlimit: 'strokeMiterlimit',
	  'stroke-miterlimit': 'strokeMiterlimit',
	  strokewidth: 'strokeWidth',
	  'stroke-width': 'strokeWidth',
	  strokeopacity: 'strokeOpacity',
	  'stroke-opacity': 'strokeOpacity',
	  suppresscontenteditablewarning: 'suppressContentEditableWarning',
	  suppresshydrationwarning: 'suppressHydrationWarning',
	  surfacescale: 'surfaceScale',
	  systemlanguage: 'systemLanguage',
	  tablevalues: 'tableValues',
	  targetx: 'targetX',
	  targety: 'targetY',
	  textanchor: 'textAnchor',
	  'text-anchor': 'textAnchor',
	  textdecoration: 'textDecoration',
	  'text-decoration': 'textDecoration',
	  textlength: 'textLength',
	  textrendering: 'textRendering',
	  'text-rendering': 'textRendering',
	  to: 'to',
	  transform: 'transform',
	  typeof: 'typeof',
	  u1: 'u1',
	  u2: 'u2',
	  underlineposition: 'underlinePosition',
	  'underline-position': 'underlinePosition',
	  underlinethickness: 'underlineThickness',
	  'underline-thickness': 'underlineThickness',
	  unicode: 'unicode',
	  unicodebidi: 'unicodeBidi',
	  'unicode-bidi': 'unicodeBidi',
	  unicoderange: 'unicodeRange',
	  'unicode-range': 'unicodeRange',
	  unitsperem: 'unitsPerEm',
	  'units-per-em': 'unitsPerEm',
	  unselectable: 'unselectable',
	  valphabetic: 'vAlphabetic',
	  'v-alphabetic': 'vAlphabetic',
	  values: 'values',
	  vectoreffect: 'vectorEffect',
	  'vector-effect': 'vectorEffect',
	  version: 'version',
	  vertadvy: 'vertAdvY',
	  'vert-adv-y': 'vertAdvY',
	  vertoriginx: 'vertOriginX',
	  'vert-origin-x': 'vertOriginX',
	  vertoriginy: 'vertOriginY',
	  'vert-origin-y': 'vertOriginY',
	  vhanging: 'vHanging',
	  'v-hanging': 'vHanging',
	  videographic: 'vIdeographic',
	  'v-ideographic': 'vIdeographic',
	  viewbox: 'viewBox',
	  viewtarget: 'viewTarget',
	  visibility: 'visibility',
	  vmathematical: 'vMathematical',
	  'v-mathematical': 'vMathematical',
	  vocab: 'vocab',
	  widths: 'widths',
	  wordspacing: 'wordSpacing',
	  'word-spacing': 'wordSpacing',
	  writingmode: 'writingMode',
	  'writing-mode': 'writingMode',
	  x1: 'x1',
	  x2: 'x2',
	  x: 'x',
	  xchannelselector: 'xChannelSelector',
	  xheight: 'xHeight',
	  'x-height': 'xHeight',
	  xlinkactuate: 'xlinkActuate',
	  'xlink:actuate': 'xlinkActuate',
	  xlinkarcrole: 'xlinkArcrole',
	  'xlink:arcrole': 'xlinkArcrole',
	  xlinkhref: 'xlinkHref',
	  'xlink:href': 'xlinkHref',
	  xlinkrole: 'xlinkRole',
	  'xlink:role': 'xlinkRole',
	  xlinkshow: 'xlinkShow',
	  'xlink:show': 'xlinkShow',
	  xlinktitle: 'xlinkTitle',
	  'xlink:title': 'xlinkTitle',
	  xlinktype: 'xlinkType',
	  'xlink:type': 'xlinkType',
	  xmlbase: 'xmlBase',
	  'xml:base': 'xmlBase',
	  xmllang: 'xmlLang',
	  'xml:lang': 'xmlLang',
	  xmlns: 'xmlns',
	  'xml:space': 'xmlSpace',
	  xmlnsxlink: 'xmlnsXlink',
	  'xmlns:xlink': 'xmlnsXlink',
	  xmlspace: 'xmlSpace',
	  y1: 'y1',
	  y2: 'y2',
	  y: 'y',
	  ychannelselector: 'yChannelSelector',
	  z: 'z',
	  zoomandpan: 'zoomAndPan'
	};

	var validateProperty$1 = function () {};

	{
	  var warnedProperties$1 = {};
	  var EVENT_NAME_REGEX = /^on./;
	  var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
	  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
	  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

	  validateProperty$1 = function (tagName, name, value, eventRegistry) {
	    if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
	      return true;
	    }

	    var lowerCasedName = name.toLowerCase();

	    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
	      error('React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');

	      warnedProperties$1[name] = true;
	      return true;
	    } // We can't rely on the event system being injected on the server.


	    if (eventRegistry != null) {
	      var registrationNameDependencies = eventRegistry.registrationNameDependencies,
	          possibleRegistrationNames = eventRegistry.possibleRegistrationNames;

	      if (registrationNameDependencies.hasOwnProperty(name)) {
	        return true;
	      }

	      var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;

	      if (registrationName != null) {
	        error('Invalid event handler property `%s`. Did you mean `%s`?', name, registrationName);

	        warnedProperties$1[name] = true;
	        return true;
	      }

	      if (EVENT_NAME_REGEX.test(name)) {
	        error('Unknown event handler property `%s`. It will be ignored.', name);

	        warnedProperties$1[name] = true;
	        return true;
	      }
	    } else if (EVENT_NAME_REGEX.test(name)) {
	      // If no event plugins have been injected, we are in a server environment.
	      // So we can't tell if the event name is correct for sure, but we can filter
	      // out known bad ones like `onclick`. We can't suggest a specific replacement though.
	      if (INVALID_EVENT_NAME_REGEX.test(name)) {
	        error('Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.', name);
	      }

	      warnedProperties$1[name] = true;
	      return true;
	    } // Let the ARIA attribute hook validate ARIA attributes


	    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
	      return true;
	    }

	    if (lowerCasedName === 'innerhtml') {
	      error('Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'aria') {
	      error('The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
	      error('Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.', typeof value);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'number' && isNaN(value)) {
	      error('Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.', name);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    var propertyInfo = getPropertyInfo(name);
	    var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED; // Known attributes should match the casing specified in the property config.

	    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
	      var standardName = possibleStandardNames[lowerCasedName];

	      if (standardName !== name) {
	        error('Invalid DOM property `%s`. Did you mean `%s`?', name, standardName);

	        warnedProperties$1[name] = true;
	        return true;
	      }
	    } else if (!isReserved && name !== lowerCasedName) {
	      // Unknown attributes should have lowercase casing since that's how they
	      // will be cased anyway with server rendering.
	      error('React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.', name, lowerCasedName);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
	      if (value) {
	        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.', value, name, name, value, name);
	      } else {
	        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
	      }

	      warnedProperties$1[name] = true;
	      return true;
	    } // Now that we've validated casing, do not validate
	    // data types for reserved props


	    if (isReserved) {
	      return true;
	    } // Warn when a known attribute is a bad type


	    if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
	      warnedProperties$1[name] = true;
	      return false;
	    } // Warn when passing the strings 'false' or 'true' into a boolean prop


	    if ((value === 'false' || value === 'true') && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
	      error('Received the string `%s` for the boolean attribute `%s`. ' + '%s ' + 'Did you mean %s={%s}?', value, name, value === 'false' ? 'The browser will interpret it as a truthy value.' : 'Although this works, it will not work as expected if you pass the string "false".', name, value);

	      warnedProperties$1[name] = true;
	      return true;
	    }

	    return true;
	  };
	}

	var warnUnknownProperties = function (type, props, eventRegistry) {
	  {
	    var unknownProps = [];

	    for (var key in props) {
	      var isValid = validateProperty$1(type, key, props[key], eventRegistry);

	      if (!isValid) {
	        unknownProps.push(key);
	      }
	    }

	    var unknownPropString = unknownProps.map(function (prop) {
	      return '`' + prop + '`';
	    }).join(', ');

	    if (unknownProps.length === 1) {
	      error('Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
	    } else if (unknownProps.length > 1) {
	      error('Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
	    }
	  }
	};

	function validateProperties$2(type, props, eventRegistry) {
	  if (isCustomComponent(type, props)) {
	    return;
	  }

	  warnUnknownProperties(type, props, eventRegistry);
	}

	var warnValidStyle = function () {};

	{
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
	  var msPattern = /^-ms-/;
	  var hyphenPattern = /-(.)/g; // style values shouldn't contain a semicolon

	  var badStyleValueWithSemicolonPattern = /;\s*$/;
	  var warnedStyleNames = {};
	  var warnedStyleValues = {};
	  var warnedForNaNValue = false;
	  var warnedForInfinityValue = false;

	  var camelize = function (string) {
	    return string.replace(hyphenPattern, function (_, character) {
	      return character.toUpperCase();
	    });
	  };

	  var warnHyphenatedStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;

	    error('Unsupported style property %s. Did you mean %s?', name, // As Andi Smith suggests
	    // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	    // is converted to lowercase `ms`.
	    camelize(name.replace(msPattern, 'ms-')));
	  };

	  var warnBadVendoredStyleName = function (name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;

	    error('Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1));
	  };

	  var warnStyleValueWithSemicolon = function (name, value) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;

	    error("Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, ''));
	  };

	  var warnStyleValueIsNaN = function (name, value) {
	    if (warnedForNaNValue) {
	      return;
	    }

	    warnedForNaNValue = true;

	    error('`NaN` is an invalid value for the `%s` css style property.', name);
	  };

	  var warnStyleValueIsInfinity = function (name, value) {
	    if (warnedForInfinityValue) {
	      return;
	    }

	    warnedForInfinityValue = true;

	    error('`Infinity` is an invalid value for the `%s` css style property.', name);
	  };

	  warnValidStyle = function (name, value) {
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value);
	    }

	    if (typeof value === 'number') {
	      if (isNaN(value)) {
	        warnStyleValueIsNaN(name, value);
	      } else if (!isFinite(value)) {
	        warnStyleValueIsInfinity(name, value);
	      }
	    }
	  };
	}

	var warnValidStyle$1 = warnValidStyle;

	// code copied and modified from escape-html
	var matchHtmlRegExp = /["'&<>]/;
	/**
	 * Escapes special characters and HTML entities in a given html string.
	 *
	 * @param  {string} string HTML string to escape for later insertion
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  {
	    checkHtmlStringCoercion(string);
	  }

	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34:
	        // "
	        escape = '&quot;';
	        break;

	      case 38:
	        // &
	        escape = '&amp;';
	        break;

	      case 39:
	        // '
	        escape = '&#x27;'; // modified from escape-html; used to be '&#39'

	        break;

	      case 60:
	        // <
	        escape = '&lt;';
	        break;

	      case 62:
	        // >
	        escape = '&gt;';
	        break;

	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
	} // end code copied and modified from escape-html

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */


	function escapeTextForBrowser(text) {
	  if (typeof text === 'boolean' || typeof text === 'number') {
	    // this shortcircuit helps perf for types that we know will never have
	    // special characters, especially given that this function is used often
	    // for numeric dom ids.
	    return '' + text;
	  }

	  return escapeHtml(text);
	}

	var uppercasePattern = /([A-Z])/g;
	var msPattern$1 = /^ms-/;
	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 */

	function hyphenateStyleName(name) {
	  return name.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern$1, '-ms-');
	}

	// and any newline or tab are filtered out as if they're not part of the URL.
	// https://url.spec.whatwg.org/#url-parsing
	// Tab or newline are defined as \r\n\t:
	// https://infra.spec.whatwg.org/#ascii-tab-or-newline
	// A C0 control is a code point in the range \u0000 NULL to \u001F
	// INFORMATION SEPARATOR ONE, inclusive:
	// https://infra.spec.whatwg.org/#c0-control-or-space

	/* eslint-disable max-len */

	var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
	var didWarn = false;

	function sanitizeURL(url) {
	  {
	    if (!didWarn && isJavaScriptProtocol.test(url)) {
	      didWarn = true;

	      error('A future version of React will block javascript: URLs as a security precaution. ' + 'Use event handlers instead if you can. If you need to generate unsafe HTML try ' + 'using dangerouslySetInnerHTML instead. React was passed %s.', JSON.stringify(url));
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	var startInlineScript = stringToPrecomputedChunk('<script>');
	var endInlineScript = stringToPrecomputedChunk('</script>');
	var startScriptSrc = stringToPrecomputedChunk('<script src="');
	var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
	var endAsyncScript = stringToPrecomputedChunk('" async=""></script>'); // Allows us to keep track of what we've already written so we can refer back to it.

	function createResponseState(identifierPrefix, nonce, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
	  var idPrefix = identifierPrefix === undefined ? '' : identifierPrefix;
	  var inlineScriptWithNonce = nonce === undefined ? startInlineScript : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser(nonce) + '">');
	  var bootstrapChunks = [];

	  if (bootstrapScriptContent !== undefined) {
	    bootstrapChunks.push(inlineScriptWithNonce, stringToChunk(escapeTextForBrowser(bootstrapScriptContent)), endInlineScript);
	  }

	  if (bootstrapScripts !== undefined) {
	    for (var i = 0; i < bootstrapScripts.length; i++) {
	      bootstrapChunks.push(startScriptSrc, stringToChunk(escapeTextForBrowser(bootstrapScripts[i])), endAsyncScript);
	    }
	  }

	  if (bootstrapModules !== undefined) {
	    for (var _i = 0; _i < bootstrapModules.length; _i++) {
	      bootstrapChunks.push(startModuleSrc, stringToChunk(escapeTextForBrowser(bootstrapModules[_i])), endAsyncScript);
	    }
	  }

	  return {
	    bootstrapChunks: bootstrapChunks,
	    startInlineScript: inlineScriptWithNonce,
	    placeholderPrefix: stringToPrecomputedChunk(idPrefix + 'P:'),
	    segmentPrefix: stringToPrecomputedChunk(idPrefix + 'S:'),
	    boundaryPrefix: idPrefix + 'B:',
	    idPrefix: idPrefix,
	    nextSuspenseID: 0,
	    sentCompleteSegmentFunction: false,
	    sentCompleteBoundaryFunction: false,
	    sentClientRenderFunction: false
	  };
	} // Constants for the insertion mode we're currently writing in. We don't encode all HTML5 insertion
	// modes. We only include the variants as they matter for the sake of our purposes.
	// We don't actually provide the namespace therefore we use constants instead of the string.

	var ROOT_HTML_MODE = 0; // Used for the root most element tag.

	var HTML_MODE = 1;
	var SVG_MODE = 2;
	var MATHML_MODE = 3;
	var HTML_TABLE_MODE = 4;
	var HTML_TABLE_BODY_MODE = 5;
	var HTML_TABLE_ROW_MODE = 6;
	var HTML_COLGROUP_MODE = 7; // We have a greater than HTML_TABLE_MODE check elsewhere. If you add more cases here, make sure it
	// still makes sense

	function createFormatContext(insertionMode, selectedValue) {
	  return {
	    insertionMode: insertionMode,
	    selectedValue: selectedValue
	  };
	}

	function createRootFormatContext(namespaceURI) {
	  var insertionMode = namespaceURI === 'http://www.w3.org/2000/svg' ? SVG_MODE : namespaceURI === 'http://www.w3.org/1998/Math/MathML' ? MATHML_MODE : ROOT_HTML_MODE;
	  return createFormatContext(insertionMode, null);
	}
	function getChildFormatContext(parentContext, type, props) {
	  switch (type) {
	    case 'select':
	      return createFormatContext(HTML_MODE, props.value != null ? props.value : props.defaultValue);

	    case 'svg':
	      return createFormatContext(SVG_MODE, null);

	    case 'math':
	      return createFormatContext(MATHML_MODE, null);

	    case 'foreignObject':
	      return createFormatContext(HTML_MODE, null);
	    // Table parents are special in that their children can only be created at all if they're
	    // wrapped in a table parent. So we need to encode that we're entering this mode.

	    case 'table':
	      return createFormatContext(HTML_TABLE_MODE, null);

	    case 'thead':
	    case 'tbody':
	    case 'tfoot':
	      return createFormatContext(HTML_TABLE_BODY_MODE, null);

	    case 'colgroup':
	      return createFormatContext(HTML_COLGROUP_MODE, null);

	    case 'tr':
	      return createFormatContext(HTML_TABLE_ROW_MODE, null);
	  }

	  if (parentContext.insertionMode >= HTML_TABLE_MODE) {
	    // Whatever tag this was, it wasn't a table parent or other special parent, so we must have
	    // entered plain HTML again.
	    return createFormatContext(HTML_MODE, null);
	  }

	  if (parentContext.insertionMode === ROOT_HTML_MODE) {
	    // We've emitted the root and is now in plain HTML mode.
	    return createFormatContext(HTML_MODE, null);
	  }

	  return parentContext;
	}
	var UNINITIALIZED_SUSPENSE_BOUNDARY_ID = null;
	function assignSuspenseBoundaryID(responseState) {
	  var generatedID = responseState.nextSuspenseID++;
	  return stringToPrecomputedChunk(responseState.boundaryPrefix + generatedID.toString(16));
	}
	function makeId(responseState, treeId, localId) {
	  var idPrefix = responseState.idPrefix;
	  var id = ':' + idPrefix + 'R' + treeId; // Unless this is the first id at this level, append a number at the end
	  // that represents the position of this useId hook among all the useId
	  // hooks for this fiber.

	  if (localId > 0) {
	    id += 'H' + localId.toString(32);
	  }

	  return id + ':';
	}

	function encodeHTMLTextNode(text) {
	  return escapeTextForBrowser(text);
	}

	var textSeparator = stringToPrecomputedChunk('<!-- -->');
	function pushTextInstance(target, text, responseState) {
	  if (text === '') {
	    // Empty text doesn't have a DOM node representation and the hydration is aware of this.
	    return;
	  } // TODO: Avoid adding a text separator in common cases.


	  target.push(stringToChunk(encodeHTMLTextNode(text)), textSeparator);
	}
	var styleNameCache = new Map();

	function processStyleName(styleName) {
	  var chunk = styleNameCache.get(styleName);

	  if (chunk !== undefined) {
	    return chunk;
	  }

	  var result = stringToPrecomputedChunk(escapeTextForBrowser(hyphenateStyleName(styleName)));
	  styleNameCache.set(styleName, result);
	  return result;
	}

	var styleAttributeStart = stringToPrecomputedChunk(' style="');
	var styleAssign = stringToPrecomputedChunk(':');
	var styleSeparator = stringToPrecomputedChunk(';');

	function pushStyle(target, responseState, style) {
	  if (typeof style !== 'object') {
	    throw new Error('The `style` prop expects a mapping from style properties to values, ' + "not a string. For example, style={{marginRight: spacing + 'em'}} when " + 'using JSX.');
	  }

	  var isFirst = true;

	  for (var styleName in style) {
	    if (!hasOwnProperty.call(style, styleName)) {
	      continue;
	    } // If you provide unsafe user data here they can inject arbitrary CSS
	    // which may be problematic (I couldn't repro this):
	    // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	    // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	    // This is not an XSS hole but instead a potential CSS injection issue
	    // which has lead to a greater discussion about how we're going to
	    // trust URLs moving forward. See #2115901


	    var styleValue = style[styleName];

	    if (styleValue == null || typeof styleValue === 'boolean' || styleValue === '') {
	      // TODO: We used to set empty string as a style with an empty value. Does that ever make sense?
	      continue;
	    }

	    var nameChunk = void 0;
	    var valueChunk = void 0;
	    var isCustomProperty = styleName.indexOf('--') === 0;

	    if (isCustomProperty) {
	      nameChunk = stringToChunk(escapeTextForBrowser(styleName));

	      {
	        checkCSSPropertyStringCoercion(styleValue, styleName);
	      }

	      valueChunk = stringToChunk(escapeTextForBrowser(('' + styleValue).trim()));
	    } else {
	      {
	        warnValidStyle$1(styleName, styleValue);
	      }

	      nameChunk = processStyleName(styleName);

	      if (typeof styleValue === 'number') {
	        if (styleValue !== 0 && !hasOwnProperty.call(isUnitlessNumber, styleName)) {
	          valueChunk = stringToChunk(styleValue + 'px'); // Presumes implicit 'px' suffix for unitless numbers
	        } else {
	          valueChunk = stringToChunk('' + styleValue);
	        }
	      } else {
	        {
	          checkCSSPropertyStringCoercion(styleValue, styleName);
	        }

	        valueChunk = stringToChunk(escapeTextForBrowser(('' + styleValue).trim()));
	      }
	    }

	    if (isFirst) {
	      isFirst = false; // If it's first, we don't need any separators prefixed.

	      target.push(styleAttributeStart, nameChunk, styleAssign, valueChunk);
	    } else {
	      target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
	    }
	  }

	  if (!isFirst) {
	    target.push(attributeEnd);
	  }
	}

	var attributeSeparator = stringToPrecomputedChunk(' ');
	var attributeAssign = stringToPrecomputedChunk('="');
	var attributeEnd = stringToPrecomputedChunk('"');
	var attributeEmptyString = stringToPrecomputedChunk('=""');

	function pushAttribute(target, responseState, name, value) {
	  switch (name) {
	    case 'style':
	      {
	        pushStyle(target, responseState, value);
	        return;
	      }

	    case 'defaultValue':
	    case 'defaultChecked': // These shouldn't be set as attributes on generic HTML elements.

	    case 'innerHTML': // Must use dangerouslySetInnerHTML instead.

	    case 'suppressContentEditableWarning':
	    case 'suppressHydrationWarning':
	      // Ignored. These are built-in to React on the client.
	      return;
	  }

	  if ( // shouldIgnoreAttribute
	  // We have already filtered out null/undefined and reserved words.
	  name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
	    return;
	  }

	  var propertyInfo = getPropertyInfo(name);

	  if (propertyInfo !== null) {
	    // shouldRemoveAttribute
	    switch (typeof value) {
	      case 'function': // $FlowIssue symbol is perfectly valid here

	      case 'symbol':
	        // eslint-disable-line
	        return;

	      case 'boolean':
	        {
	          if (!propertyInfo.acceptsBooleans) {
	            return;
	          }
	        }
	    }

	    var attributeName = propertyInfo.attributeName;
	    var attributeNameChunk = stringToChunk(attributeName); // TODO: If it's known we can cache the chunk.

	    switch (propertyInfo.type) {
	      case BOOLEAN:
	        if (value) {
	          target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
	        }

	        return;

	      case OVERLOADED_BOOLEAN:
	        if (value === true) {
	          target.push(attributeSeparator, attributeNameChunk, attributeEmptyString);
	        } else if (value === false) ; else {
	          target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	        }

	        return;

	      case NUMERIC:
	        if (!isNaN(value)) {
	          target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	        }

	        break;

	      case POSITIVE_NUMERIC:
	        if (!isNaN(value) && value >= 1) {
	          target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	        }

	        break;

	      default:
	        if (propertyInfo.sanitizeURL) {
	          {
	            checkAttributeStringCoercion(value, attributeName);
	          }

	          value = '' + value;
	          sanitizeURL(value);
	        }

	        target.push(attributeSeparator, attributeNameChunk, attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	    }
	  } else if (isAttributeNameSafe(name)) {
	    // shouldRemoveAttribute
	    switch (typeof value) {
	      case 'function': // $FlowIssue symbol is perfectly valid here

	      case 'symbol':
	        // eslint-disable-line
	        return;

	      case 'boolean':
	        {
	          var prefix = name.toLowerCase().slice(0, 5);

	          if (prefix !== 'data-' && prefix !== 'aria-') {
	            return;
	          }
	        }
	    }

	    target.push(attributeSeparator, stringToChunk(name), attributeAssign, stringToChunk(escapeTextForBrowser(value)), attributeEnd);
	  }
	}

	var endOfStartTag = stringToPrecomputedChunk('>');
	var endOfStartTagSelfClosing = stringToPrecomputedChunk('/>');

	function pushInnerHTML(target, innerHTML, children) {
	  if (innerHTML != null) {
	    if (children != null) {
	      throw new Error('Can only set one of `children` or `props.dangerouslySetInnerHTML`.');
	    }

	    if (typeof innerHTML !== 'object' || !('__html' in innerHTML)) {
	      throw new Error('`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://reactjs.org/link/dangerously-set-inner-html ' + 'for more information.');
	    }

	    var html = innerHTML.__html;

	    if (html !== null && html !== undefined) {
	      {
	        checkHtmlStringCoercion(html);
	      }

	      target.push(stringToChunk('' + html));
	    }
	  }
	} // TODO: Move these to ResponseState so that we warn for every request.
	// It would help debugging in stateful servers (e.g. service worker).


	var didWarnDefaultInputValue = false;
	var didWarnDefaultChecked = false;
	var didWarnDefaultSelectValue = false;
	var didWarnDefaultTextareaValue = false;
	var didWarnInvalidOptionChildren = false;
	var didWarnInvalidOptionInnerHTML = false;
	var didWarnSelectedSetOnOption = false;

	function checkSelectProp(props, propName) {
	  {
	    var value = props[propName];

	    if (value != null) {
	      var array = isArray(value);

	      if (props.multiple && !array) {
	        error('The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.', propName);
	      } else if (!props.multiple && array) {
	        error('The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.', propName);
	      }
	    }
	  }
	}

	function pushStartSelect(target, props, responseState) {
	  {
	    checkControlledValueProps('select', props);
	    checkSelectProp(props, 'value');
	    checkSelectProp(props, 'defaultValue');

	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
	      error('Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');

	      didWarnDefaultSelectValue = true;
	    }
	  }

	  target.push(startChunkForTag('select'));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          // TODO: This doesn't really make sense for select since it can't use the controlled
	          // value in the innerHTML.
	          innerHTML = propValue;
	          break;

	        case 'defaultValue':
	        case 'value':
	          // These are set on the Context instead and applied to the nested options.
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);
	  return children;
	}

	function flattenOptionChildren(children) {
	  var content = ''; // Flatten children and warn if they aren't strings or numbers;
	  // invalid types are ignored.

	  React.Children.forEach(children, function (child) {
	    if (child == null) {
	      return;
	    }

	    content += child;

	    {
	      if (!didWarnInvalidOptionChildren && typeof child !== 'string' && typeof child !== 'number') {
	        didWarnInvalidOptionChildren = true;

	        error('Cannot infer the option value of complex children. ' + 'Pass a `value` prop or use a plain string as children to <option>.');
	      }
	    }
	  });
	  return content;
	}

	var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');

	function pushStartOption(target, props, responseState, formatContext) {
	  var selectedValue = formatContext.selectedValue;
	  target.push(startChunkForTag('option'));
	  var children = null;
	  var value = null;
	  var selected = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'selected':
	          // ignore
	          selected = propValue;

	          {
	            // TODO: Remove support for `selected` in <option>.
	            if (!didWarnSelectedSetOnOption) {
	              error('Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');

	              didWarnSelectedSetOnOption = true;
	            }
	          }

	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;
	        // eslint-disable-next-line-no-fallthrough

	        case 'value':
	          value = propValue;
	        // We intentionally fallthrough to also set the attribute on the node.
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  if (selectedValue != null) {
	    var stringValue;

	    if (value !== null) {
	      {
	        checkAttributeStringCoercion(value, 'value');
	      }

	      stringValue = '' + value;
	    } else {
	      {
	        if (innerHTML !== null) {
	          if (!didWarnInvalidOptionInnerHTML) {
	            didWarnInvalidOptionInnerHTML = true;

	            error('Pass a `value` prop if you set dangerouslyInnerHTML so React knows ' + 'which value should be selected.');
	          }
	        }
	      }

	      stringValue = flattenOptionChildren(children);
	    }

	    if (isArray(selectedValue)) {
	      // multiple
	      for (var i = 0; i < selectedValue.length; i++) {
	        {
	          checkAttributeStringCoercion(selectedValue[i], 'value');
	        }

	        var v = '' + selectedValue[i];

	        if (v === stringValue) {
	          target.push(selectedMarkerAttribute);
	          break;
	        }
	      }
	    } else {
	      {
	        checkAttributeStringCoercion(selectedValue, 'select.value');
	      }

	      if ('' + selectedValue === stringValue) {
	        target.push(selectedMarkerAttribute);
	      }
	    }
	  } else if (selected) {
	    target.push(selectedMarkerAttribute);
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);
	  return children;
	}

	function pushInput(target, props, responseState) {
	  {
	    checkControlledValueProps('input', props);

	    if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
	      error('%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);

	      didWarnDefaultChecked = true;
	    }

	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
	      error('%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);

	      didWarnDefaultInputValue = true;
	    }
	  }

	  target.push(startChunkForTag('input'));
	  var value = null;
	  var defaultValue = null;
	  var checked = null;
	  var defaultChecked = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	        case 'dangerouslySetInnerHTML':
	          throw new Error('input' + " is a self-closing tag and must neither have `children` nor " + 'use `dangerouslySetInnerHTML`.');
	        // eslint-disable-next-line-no-fallthrough

	        case 'defaultChecked':
	          defaultChecked = propValue;
	          break;

	        case 'defaultValue':
	          defaultValue = propValue;
	          break;

	        case 'checked':
	          checked = propValue;
	          break;

	        case 'value':
	          value = propValue;
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  if (checked !== null) {
	    pushAttribute(target, responseState, 'checked', checked);
	  } else if (defaultChecked !== null) {
	    pushAttribute(target, responseState, 'checked', defaultChecked);
	  }

	  if (value !== null) {
	    pushAttribute(target, responseState, 'value', value);
	  } else if (defaultValue !== null) {
	    pushAttribute(target, responseState, 'value', defaultValue);
	  }

	  target.push(endOfStartTagSelfClosing);
	  return null;
	}

	function pushStartTextArea(target, props, responseState) {
	  {
	    checkControlledValueProps('textarea', props);

	    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
	      error('Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');

	      didWarnDefaultTextareaValue = true;
	    }
	  }

	  target.push(startChunkForTag('textarea'));
	  var value = null;
	  var defaultValue = null;
	  var children = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'value':
	          value = propValue;
	          break;

	        case 'defaultValue':
	          defaultValue = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          throw new Error('`dangerouslySetInnerHTML` does not make sense on <textarea>.');
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  if (value === null && defaultValue !== null) {
	    value = defaultValue;
	  }

	  target.push(endOfStartTag); // TODO (yungsters): Remove support for children content in <textarea>.

	  if (children != null) {
	    {
	      error('Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
	    }

	    if (value != null) {
	      throw new Error('If you supply `defaultValue` on a <textarea>, do not pass children.');
	    }

	    if (isArray(children)) {
	      if (children.length > 1) {
	        throw new Error('<textarea> can only have at most one child.');
	      } // TODO: remove the coercion and the DEV check below because it will
	      // always be overwritten by the coercion several lines below it. #22309


	      {
	        checkHtmlStringCoercion(children[0]);
	      }

	      value = '' + children[0];
	    }

	    {
	      checkHtmlStringCoercion(children);
	    }

	    value = '' + children;
	  }

	  if (typeof value === 'string' && value[0] === '\n') {
	    // text/html ignores the first character in these tags if it's a newline
	    // Prefer to break application/xml over text/html (for now) by adding
	    // a newline specifically to get eaten by the parser. (Alternately for
	    // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	    // \r is normalized out by HTMLTextAreaElement#value.)
	    // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	    // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	    // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	    // See: Parsing of "textarea" "listing" and "pre" elements
	    //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	    target.push(leadingNewline);
	  } // ToString and push directly instead of recurse over children.
	  // We don't really support complex children in the value anyway.
	  // This also currently avoids a trailing comment node which breaks textarea.


	  if (value !== null) {
	    {
	      checkAttributeStringCoercion(value, 'value');
	    }

	    target.push(stringToChunk(encodeHTMLTextNode('' + value)));
	  }

	  return null;
	}

	function pushSelfClosing(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	        case 'dangerouslySetInnerHTML':
	          throw new Error(tag + " is a self-closing tag and must neither have `children` nor " + 'use `dangerouslySetInnerHTML`.');
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTagSelfClosing);
	  return null;
	}

	function pushStartMenuItem(target, props, responseState) {
	  target.push(startChunkForTag('menuitem'));

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	        case 'dangerouslySetInnerHTML':
	          throw new Error('menuitems cannot have `children` nor `dangerouslySetInnerHTML`.');
	        // eslint-disable-next-line-no-fallthrough

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  return null;
	}

	function pushStartGenericElement(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);

	  if (typeof children === 'string') {
	    // Special case children as a string to avoid the unnecessary comment.
	    // TODO: Remove this special case after the general optimization is in place.
	    target.push(stringToChunk(encodeHTMLTextNode(children)));
	    return null;
	  }

	  return children;
	}

	function pushStartCustomElement(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;

	        case 'style':
	          pushStyle(target, responseState, propValue);
	          break;

	        case 'suppressContentEditableWarning':
	        case 'suppressHydrationWarning':
	          // Ignored. These are built-in to React on the client.
	          break;

	        default:
	          if (isAttributeNameSafe(propKey) && typeof propValue !== 'function' && typeof propValue !== 'symbol') {
	            target.push(attributeSeparator, stringToChunk(propKey), attributeAssign, stringToChunk(escapeTextForBrowser(propValue)), attributeEnd);
	          }

	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag);
	  pushInnerHTML(target, innerHTML, children);
	  return children;
	}

	var leadingNewline = stringToPrecomputedChunk('\n');

	function pushStartPreformattedElement(target, props, tag, responseState) {
	  target.push(startChunkForTag(tag));
	  var children = null;
	  var innerHTML = null;

	  for (var propKey in props) {
	    if (hasOwnProperty.call(props, propKey)) {
	      var propValue = props[propKey];

	      if (propValue == null) {
	        continue;
	      }

	      switch (propKey) {
	        case 'children':
	          children = propValue;
	          break;

	        case 'dangerouslySetInnerHTML':
	          innerHTML = propValue;
	          break;

	        default:
	          pushAttribute(target, responseState, propKey, propValue);
	          break;
	      }
	    }
	  }

	  target.push(endOfStartTag); // text/html ignores the first character in these tags if it's a newline
	  // Prefer to break application/xml over text/html (for now) by adding
	  // a newline specifically to get eaten by the parser. (Alternately for
	  // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
	  // \r is normalized out by HTMLTextAreaElement#value.)
	  // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
	  // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
	  // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
	  // See: Parsing of "textarea" "listing" and "pre" elements
	  //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
	  // TODO: This doesn't deal with the case where the child is an array
	  // or component that returns a string.

	  if (innerHTML != null) {
	    if (children != null) {
	      throw new Error('Can only set one of `children` or `props.dangerouslySetInnerHTML`.');
	    }

	    if (typeof innerHTML !== 'object' || !('__html' in innerHTML)) {
	      throw new Error('`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://reactjs.org/link/dangerously-set-inner-html ' + 'for more information.');
	    }

	    var html = innerHTML.__html;

	    if (html !== null && html !== undefined) {
	      if (typeof html === 'string' && html.length > 0 && html[0] === '\n') {
	        target.push(leadingNewline, stringToChunk(html));
	      } else {
	        {
	          checkHtmlStringCoercion(html);
	        }

	        target.push(stringToChunk('' + html));
	      }
	    }
	  }

	  if (typeof children === 'string' && children[0] === '\n') {
	    target.push(leadingNewline);
	  }

	  return children;
	} // We accept any tag to be rendered but since this gets injected into arbitrary
	// HTML, we want to make sure that it's a safe tag.
	// http://www.w3.org/TR/REC-xml/#NT-Name


	var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset

	var validatedTagCache = new Map();

	function startChunkForTag(tag) {
	  var tagStartChunk = validatedTagCache.get(tag);

	  if (tagStartChunk === undefined) {
	    if (!VALID_TAG_REGEX.test(tag)) {
	      throw new Error("Invalid tag: " + tag);
	    }

	    tagStartChunk = stringToPrecomputedChunk('<' + tag);
	    validatedTagCache.set(tag, tagStartChunk);
	  }

	  return tagStartChunk;
	}

	var DOCTYPE = stringToPrecomputedChunk('<!DOCTYPE html>');
	function pushStartInstance(target, type, props, responseState, formatContext) {
	  {
	    validateProperties(type, props);
	    validateProperties$1(type, props);
	    validateProperties$2(type, props, null);

	    if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
	      error('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
	    }

	    if (formatContext.insertionMode !== SVG_MODE && formatContext.insertionMode !== MATHML_MODE) {
	      if (type.indexOf('-') === -1 && typeof props.is !== 'string' && type.toLowerCase() !== type) {
	        error('<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', type);
	      }
	    }
	  }

	  switch (type) {
	    // Special tags
	    case 'select':
	      return pushStartSelect(target, props, responseState);

	    case 'option':
	      return pushStartOption(target, props, responseState, formatContext);

	    case 'textarea':
	      return pushStartTextArea(target, props, responseState);

	    case 'input':
	      return pushInput(target, props, responseState);

	    case 'menuitem':
	      return pushStartMenuItem(target, props, responseState);
	    // Newline eating tags

	    case 'listing':
	    case 'pre':
	      {
	        return pushStartPreformattedElement(target, props, type, responseState);
	      }
	    // Omitted close tags

	    case 'area':
	    case 'base':
	    case 'br':
	    case 'col':
	    case 'embed':
	    case 'hr':
	    case 'img':
	    case 'keygen':
	    case 'link':
	    case 'meta':
	    case 'param':
	    case 'source':
	    case 'track':
	    case 'wbr':
	      {
	        return pushSelfClosing(target, props, type, responseState);
	      }
	    // These are reserved SVG and MathML elements, that are never custom elements.
	    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts

	    case 'annotation-xml':
	    case 'color-profile':
	    case 'font-face':
	    case 'font-face-src':
	    case 'font-face-uri':
	    case 'font-face-format':
	    case 'font-face-name':
	    case 'missing-glyph':
	      {
	        return pushStartGenericElement(target, props, type, responseState);
	      }

	    case 'html':
	      {
	        if (formatContext.insertionMode === ROOT_HTML_MODE) {
	          // If we're rendering the html tag and we're at the root (i.e. not in foreignObject)
	          // then we also emit the DOCTYPE as part of the root content as a convenience for
	          // rendering the whole document.
	          target.push(DOCTYPE);
	        }

	        return pushStartGenericElement(target, props, type, responseState);
	      }

	    default:
	      {
	        if (type.indexOf('-') === -1 && typeof props.is !== 'string') {
	          // Generic element
	          return pushStartGenericElement(target, props, type, responseState);
	        } else {
	          // Custom element
	          return pushStartCustomElement(target, props, type, responseState);
	        }
	      }
	  }
	}
	var endTag1 = stringToPrecomputedChunk('</');
	var endTag2 = stringToPrecomputedChunk('>');
	function pushEndInstance(target, type, props) {
	  switch (type) {
	    // Omitted close tags
	    // TODO: Instead of repeating this switch we could try to pass a flag from above.
	    // That would require returning a tuple. Which might be ok if it gets inlined.
	    case 'area':
	    case 'base':
	    case 'br':
	    case 'col':
	    case 'embed':
	    case 'hr':
	    case 'img':
	    case 'input':
	    case 'keygen':
	    case 'link':
	    case 'meta':
	    case 'param':
	    case 'source':
	    case 'track':
	    case 'wbr':
	      {
	        // No close tag needed.
	        break;
	      }

	    default:
	      {
	        target.push(endTag1, stringToChunk(type), endTag2);
	      }
	  }
	}
	function writeCompletedRoot(destination, responseState) {
	  var bootstrapChunks = responseState.bootstrapChunks;
	  var i = 0;

	  for (; i < bootstrapChunks.length - 1; i++) {
	    writeChunk(destination, bootstrapChunks[i]);
	  }

	  if (i < bootstrapChunks.length) {
	    return writeChunkAndReturn(destination, bootstrapChunks[i]);
	  }

	  return true;
	} // Structural Nodes
	// A placeholder is a node inside a hidden partial tree that can be filled in later, but before
	// display. It's never visible to users. We use the template tag because it can be used in every
	// type of parent. <script> tags also work in every other tag except <colgroup>.

	var placeholder1 = stringToPrecomputedChunk('<template id="');
	var placeholder2 = stringToPrecomputedChunk('"></template>');
	function writePlaceholder(destination, responseState, id) {
	  writeChunk(destination, placeholder1);
	  writeChunk(destination, responseState.placeholderPrefix);
	  var formattedID = stringToChunk(id.toString(16));
	  writeChunk(destination, formattedID);
	  return writeChunkAndReturn(destination, placeholder2);
	} // Suspense boundaries are encoded as comments.

	var startCompletedSuspenseBoundary = stringToPrecomputedChunk('<!--$-->');
	var startPendingSuspenseBoundary1 = stringToPrecomputedChunk('<!--$?--><template id="');
	var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
	var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk('<!--$!-->');
	var endSuspenseBoundary = stringToPrecomputedChunk('<!--/$-->');
	function writeStartCompletedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
	}
	function writeStartPendingSuspenseBoundary(destination, responseState, id) {
	  writeChunk(destination, startPendingSuspenseBoundary1);

	  if (id === null) {
	    throw new Error('An ID must have been assigned before we can complete the boundary.');
	  }

	  writeChunk(destination, id);
	  return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
	}
	function writeStartClientRenderedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
	}
	function writeEndCompletedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, endSuspenseBoundary);
	}
	function writeEndPendingSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, endSuspenseBoundary);
	}
	function writeEndClientRenderedSuspenseBoundary(destination, responseState) {
	  return writeChunkAndReturn(destination, endSuspenseBoundary);
	}
	var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
	var startSegmentHTML2 = stringToPrecomputedChunk('">');
	var endSegmentHTML = stringToPrecomputedChunk('</div>');
	var startSegmentSVG = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="');
	var startSegmentSVG2 = stringToPrecomputedChunk('">');
	var endSegmentSVG = stringToPrecomputedChunk('</svg>');
	var startSegmentMathML = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="');
	var startSegmentMathML2 = stringToPrecomputedChunk('">');
	var endSegmentMathML = stringToPrecomputedChunk('</math>');
	var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
	var startSegmentTable2 = stringToPrecomputedChunk('">');
	var endSegmentTable = stringToPrecomputedChunk('</table>');
	var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
	var startSegmentTableBody2 = stringToPrecomputedChunk('">');
	var endSegmentTableBody = stringToPrecomputedChunk('</tbody></table>');
	var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
	var startSegmentTableRow2 = stringToPrecomputedChunk('">');
	var endSegmentTableRow = stringToPrecomputedChunk('</tr></table>');
	var startSegmentColGroup = stringToPrecomputedChunk('<table hidden><colgroup id="');
	var startSegmentColGroup2 = stringToPrecomputedChunk('">');
	var endSegmentColGroup = stringToPrecomputedChunk('</colgroup></table>');
	function writeStartSegment(destination, responseState, formatContext, id) {
	  switch (formatContext.insertionMode) {
	    case ROOT_HTML_MODE:
	    case HTML_MODE:
	      {
	        writeChunk(destination, startSegmentHTML);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentHTML2);
	      }

	    case SVG_MODE:
	      {
	        writeChunk(destination, startSegmentSVG);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentSVG2);
	      }

	    case MATHML_MODE:
	      {
	        writeChunk(destination, startSegmentMathML);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentMathML2);
	      }

	    case HTML_TABLE_MODE:
	      {
	        writeChunk(destination, startSegmentTable);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentTable2);
	      }
	    // TODO: For the rest of these, there will be extra wrapper nodes that never
	    // get deleted from the document. We need to delete the table too as part
	    // of the injected scripts. They are invisible though so it's not too terrible
	    // and it's kind of an edge case to suspend in a table. Totally supported though.

	    case HTML_TABLE_BODY_MODE:
	      {
	        writeChunk(destination, startSegmentTableBody);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentTableBody2);
	      }

	    case HTML_TABLE_ROW_MODE:
	      {
	        writeChunk(destination, startSegmentTableRow);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentTableRow2);
	      }

	    case HTML_COLGROUP_MODE:
	      {
	        writeChunk(destination, startSegmentColGroup);
	        writeChunk(destination, responseState.segmentPrefix);
	        writeChunk(destination, stringToChunk(id.toString(16)));
	        return writeChunkAndReturn(destination, startSegmentColGroup2);
	      }

	    default:
	      {
	        throw new Error('Unknown insertion mode. This is a bug in React.');
	      }
	  }
	}
	function writeEndSegment(destination, formatContext) {
	  switch (formatContext.insertionMode) {
	    case ROOT_HTML_MODE:
	    case HTML_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentHTML);
	      }

	    case SVG_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentSVG);
	      }

	    case MATHML_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentMathML);
	      }

	    case HTML_TABLE_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentTable);
	      }

	    case HTML_TABLE_BODY_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentTableBody);
	      }

	    case HTML_TABLE_ROW_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentTableRow);
	      }

	    case HTML_COLGROUP_MODE:
	      {
	        return writeChunkAndReturn(destination, endSegmentColGroup);
	      }

	    default:
	      {
	        throw new Error('Unknown insertion mode. This is a bug in React.');
	      }
	  }
	} // Instruction Set
	// The following code is the source scripts that we then minify and inline below,
	// with renamed function names that we hope don't collide:
	// const COMMENT_NODE = 8;
	// const SUSPENSE_START_DATA = '$';
	// const SUSPENSE_END_DATA = '/$';
	// const SUSPENSE_PENDING_START_DATA = '$?';
	// const SUSPENSE_FALLBACK_START_DATA = '$!';
	//
	// function clientRenderBoundary(suspenseBoundaryID) {
	//   // Find the fallback's first element.
	//   const suspenseIdNode = document.getElementById(suspenseBoundaryID);
	//   if (!suspenseIdNode) {
	//     // The user must have already navigated away from this tree.
	//     // E.g. because the parent was hydrated.
	//     return;
	//   }
	//   // Find the boundary around the fallback. This is always the previous node.
	//   const suspenseNode = suspenseIdNode.previousSibling;
	//   // Tag it to be client rendered.
	//   suspenseNode.data = SUSPENSE_FALLBACK_START_DATA;
	//   // Tell React to retry it if the parent already hydrated.
	//   if (suspenseNode._reactRetry) {
	//     suspenseNode._reactRetry();
	//   }
	// }
	//
	// function completeBoundary(suspenseBoundaryID, contentID) {
	//   // Find the fallback's first element.
	//   const suspenseIdNode = document.getElementById(suspenseBoundaryID);
	//   const contentNode = document.getElementById(contentID);
	//   // We'll detach the content node so that regardless of what happens next we don't leave in the tree.
	//   // This might also help by not causing recalcing each time we move a child from here to the target.
	//   contentNode.parentNode.removeChild(contentNode);
	//   if (!suspenseIdNode) {
	//     // The user must have already navigated away from this tree.
	//     // E.g. because the parent was hydrated. That's fine there's nothing to do
	//     // but we have to make sure that we already deleted the container node.
	//     return;
	//   }
	//   // Find the boundary around the fallback. This is always the previous node.
	//   const suspenseNode = suspenseIdNode.previousSibling;
	//
	//   // Clear all the existing children. This is complicated because
	//   // there can be embedded Suspense boundaries in the fallback.
	//   // This is similar to clearSuspenseBoundary in ReactDOMHostConfig.
	//   // TODO: We could avoid this if we never emitted suspense boundaries in fallback trees.
	//   // They never hydrate anyway. However, currently we support incrementally loading the fallback.
	//   const parentInstance = suspenseNode.parentNode;
	//   let node = suspenseNode.nextSibling;
	//   let depth = 0;
	//   do {
	//     if (node && node.nodeType === COMMENT_NODE) {
	//       const data = node.data;
	//       if (data === SUSPENSE_END_DATA) {
	//         if (depth === 0) {
	//           break;
	//         } else {
	//           depth--;
	//         }
	//       } else if (
	//         data === SUSPENSE_START_DATA ||
	//         data === SUSPENSE_PENDING_START_DATA ||
	//         data === SUSPENSE_FALLBACK_START_DATA
	//       ) {
	//         depth++;
	//       }
	//     }
	//
	//     const nextNode = node.nextSibling;
	//     parentInstance.removeChild(node);
	//     node = nextNode;
	//   } while (node);
	//
	//   const endOfBoundary = node;
	//
	//   // Insert all the children from the contentNode between the start and end of suspense boundary.
	//   while (contentNode.firstChild) {
	//     parentInstance.insertBefore(contentNode.firstChild, endOfBoundary);
	//   }
	//   suspenseNode.data = SUSPENSE_START_DATA;
	//   if (suspenseNode._reactRetry) {
	//     suspenseNode._reactRetry();
	//   }
	// }
	//
	// function completeSegment(containerID, placeholderID) {
	//   const segmentContainer = document.getElementById(containerID);
	//   const placeholderNode = document.getElementById(placeholderID);
	//   // We always expect both nodes to exist here because, while we might
	//   // have navigated away from the main tree, we still expect the detached
	//   // tree to exist.
	//   segmentContainer.parentNode.removeChild(segmentContainer);
	//   while (segmentContainer.firstChild) {
	//     placeholderNode.parentNode.insertBefore(
	//       segmentContainer.firstChild,
	//       placeholderNode,
	//     );
	//   }
	//   placeholderNode.parentNode.removeChild(placeholderNode);
	// }

	var completeSegmentFunction = 'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)}';
	var completeBoundaryFunction = 'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}}';
	var clientRenderFunction = 'function $RX(a){if(a=document.getElementById(a))a=a.previousSibling,a.data="$!",a._reactRetry&&a._reactRetry()}';
	var completeSegmentScript1Full = stringToPrecomputedChunk(completeSegmentFunction + ';$RS("');
	var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
	var completeSegmentScript2 = stringToPrecomputedChunk('","');
	var completeSegmentScript3 = stringToPrecomputedChunk('")</script>');
	function writeCompletedSegmentInstruction(destination, responseState, contentSegmentID) {
	  writeChunk(destination, responseState.startInlineScript);

	  if (!responseState.sentCompleteSegmentFunction) {
	    // The first time we write this, we'll need to include the full implementation.
	    responseState.sentCompleteSegmentFunction = true;
	    writeChunk(destination, completeSegmentScript1Full);
	  } else {
	    // Future calls can just reuse the same function.
	    writeChunk(destination, completeSegmentScript1Partial);
	  }

	  writeChunk(destination, responseState.segmentPrefix);
	  var formattedID = stringToChunk(contentSegmentID.toString(16));
	  writeChunk(destination, formattedID);
	  writeChunk(destination, completeSegmentScript2);
	  writeChunk(destination, responseState.placeholderPrefix);
	  writeChunk(destination, formattedID);
	  return writeChunkAndReturn(destination, completeSegmentScript3);
	}
	var completeBoundaryScript1Full = stringToPrecomputedChunk(completeBoundaryFunction + ';$RC("');
	var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
	var completeBoundaryScript2 = stringToPrecomputedChunk('","');
	var completeBoundaryScript3 = stringToPrecomputedChunk('")</script>');
	function writeCompletedBoundaryInstruction(destination, responseState, boundaryID, contentSegmentID) {
	  writeChunk(destination, responseState.startInlineScript);

	  if (!responseState.sentCompleteBoundaryFunction) {
	    // The first time we write this, we'll need to include the full implementation.
	    responseState.sentCompleteBoundaryFunction = true;
	    writeChunk(destination, completeBoundaryScript1Full);
	  } else {
	    // Future calls can just reuse the same function.
	    writeChunk(destination, completeBoundaryScript1Partial);
	  }

	  if (boundaryID === null) {
	    throw new Error('An ID must have been assigned before we can complete the boundary.');
	  }

	  var formattedContentID = stringToChunk(contentSegmentID.toString(16));
	  writeChunk(destination, boundaryID);
	  writeChunk(destination, completeBoundaryScript2);
	  writeChunk(destination, responseState.segmentPrefix);
	  writeChunk(destination, formattedContentID);
	  return writeChunkAndReturn(destination, completeBoundaryScript3);
	}
	var clientRenderScript1Full = stringToPrecomputedChunk(clientRenderFunction + ';$RX("');
	var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
	var clientRenderScript2 = stringToPrecomputedChunk('")</script>');
	function writeClientRenderBoundaryInstruction(destination, responseState, boundaryID) {
	  writeChunk(destination, responseState.startInlineScript);

	  if (!responseState.sentClientRenderFunction) {
	    // The first time we write this, we'll need to include the full implementation.
	    responseState.sentClientRenderFunction = true;
	    writeChunk(destination, clientRenderScript1Full);
	  } else {
	    // Future calls can just reuse the same function.
	    writeChunk(destination, clientRenderScript1Partial);
	  }

	  if (boundaryID === null) {
	    throw new Error('An ID must have been assigned before we can complete the boundary.');
	  }

	  writeChunk(destination, boundaryID);
	  return writeChunkAndReturn(destination, clientRenderScript2);
	}

	var assign = Object.assign;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_SCOPE_TYPE = Symbol.for('react.scope');
	var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
	var REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');
	var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for('react.default_value');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}

	function describeClassComponentFrame(ctor, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(ctor, true);
	  }
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var warnedAboutMissingGetChildContext;

	{
	  warnedAboutMissingGetChildContext = {};
	}

	var emptyContextObject = {};

	{
	  Object.freeze(emptyContextObject);
	}

	function getMaskedContext(type, unmaskedContext) {
	  {
	    var contextTypes = type.contextTypes;

	    if (!contextTypes) {
	      return emptyContextObject;
	    }

	    var context = {};

	    for (var key in contextTypes) {
	      context[key] = unmaskedContext[key];
	    }

	    {
	      var name = getComponentNameFromType(type) || 'Unknown';
	      checkPropTypes(contextTypes, context, 'context', name);
	    }

	    return context;
	  }
	}
	function processChildContext(instance, type, parentContext, childContextTypes) {
	  {
	    // TODO (bvaughn) Replace this behavior with an invariant() in the future.
	    // It has only been added in Fiber to match the (unintentional) behavior in Stack.
	    if (typeof instance.getChildContext !== 'function') {
	      {
	        var componentName = getComponentNameFromType(type) || 'Unknown';

	        if (!warnedAboutMissingGetChildContext[componentName]) {
	          warnedAboutMissingGetChildContext[componentName] = true;

	          error('%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
	        }
	      }

	      return parentContext;
	    }

	    var childContext = instance.getChildContext();

	    for (var contextKey in childContext) {
	      if (!(contextKey in childContextTypes)) {
	        throw new Error((getComponentNameFromType(type) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes.");
	      }
	    }

	    {
	      var name = getComponentNameFromType(type) || 'Unknown';
	      checkPropTypes(childContextTypes, childContext, 'child context', name);
	    }

	    return assign({}, parentContext, childContext);
	  }
	}

	var rendererSigil;

	{
	  // Use this to detect multiple renderers using the same context
	  rendererSigil = {};
	} // Used to store the parent path of all context overrides in a shared linked list.
	// Forming a reverse tree.


	var rootContextSnapshot = null; // We assume that this runtime owns the "current" field on all ReactContext instances.
	// This global (actually thread local) state represents what state all those "current",
	// fields are currently in.

	var currentActiveSnapshot = null;

	function popNode(prev) {
	  {
	    prev.context._currentValue = prev.parentValue;
	  }
	}

	function pushNode(next) {
	  {
	    next.context._currentValue = next.value;
	  }
	}

	function popToNearestCommonAncestor(prev, next) {
	  if (prev === next) ; else {
	    popNode(prev);
	    var parentPrev = prev.parent;
	    var parentNext = next.parent;

	    if (parentPrev === null) {
	      if (parentNext !== null) {
	        throw new Error('The stacks must reach the root at the same time. This is a bug in React.');
	      }
	    } else {
	      if (parentNext === null) {
	        throw new Error('The stacks must reach the root at the same time. This is a bug in React.');
	      }

	      popToNearestCommonAncestor(parentPrev, parentNext);
	    } // On the way back, we push the new ones that weren't common.


	    pushNode(next);
	  }
	}

	function popAllPrevious(prev) {
	  popNode(prev);
	  var parentPrev = prev.parent;

	  if (parentPrev !== null) {
	    popAllPrevious(parentPrev);
	  }
	}

	function pushAllNext(next) {
	  var parentNext = next.parent;

	  if (parentNext !== null) {
	    pushAllNext(parentNext);
	  }

	  pushNode(next);
	}

	function popPreviousToCommonLevel(prev, next) {
	  popNode(prev);
	  var parentPrev = prev.parent;

	  if (parentPrev === null) {
	    throw new Error('The depth must equal at least at zero before reaching the root. This is a bug in React.');
	  }

	  if (parentPrev.depth === next.depth) {
	    // We found the same level. Now we just need to find a shared ancestor.
	    popToNearestCommonAncestor(parentPrev, next);
	  } else {
	    // We must still be deeper.
	    popPreviousToCommonLevel(parentPrev, next);
	  }
	}

	function popNextToCommonLevel(prev, next) {
	  var parentNext = next.parent;

	  if (parentNext === null) {
	    throw new Error('The depth must equal at least at zero before reaching the root. This is a bug in React.');
	  }

	  if (prev.depth === parentNext.depth) {
	    // We found the same level. Now we just need to find a shared ancestor.
	    popToNearestCommonAncestor(prev, parentNext);
	  } else {
	    // We must still be deeper.
	    popNextToCommonLevel(prev, parentNext);
	  }

	  pushNode(next);
	} // Perform context switching to the new snapshot.
	// To make it cheap to read many contexts, while not suspending, we make the switch eagerly by
	// updating all the context's current values. That way reads, always just read the current value.
	// At the cost of updating contexts even if they're never read by this subtree.


	function switchContext(newSnapshot) {
	  // The basic algorithm we need to do is to pop back any contexts that are no longer on the stack.
	  // We also need to update any new contexts that are now on the stack with the deepest value.
	  // The easiest way to update new contexts is to just reapply them in reverse order from the
	  // perspective of the backpointers. To avoid allocating a lot when switching, we use the stack
	  // for that. Therefore this algorithm is recursive.
	  // 1) First we pop which ever snapshot tree was deepest. Popping old contexts as we go.
	  // 2) Then we find the nearest common ancestor from there. Popping old contexts as we go.
	  // 3) Then we reapply new contexts on the way back up the stack.
	  var prev = currentActiveSnapshot;
	  var next = newSnapshot;

	  if (prev !== next) {
	    if (prev === null) {
	      // $FlowFixMe: This has to be non-null since it's not equal to prev.
	      pushAllNext(next);
	    } else if (next === null) {
	      popAllPrevious(prev);
	    } else if (prev.depth === next.depth) {
	      popToNearestCommonAncestor(prev, next);
	    } else if (prev.depth > next.depth) {
	      popPreviousToCommonLevel(prev, next);
	    } else {
	      popNextToCommonLevel(prev, next);
	    }

	    currentActiveSnapshot = next;
	  }
	}
	function pushProvider(context, nextValue) {
	  var prevValue;

	  {
	    prevValue = context._currentValue;
	    context._currentValue = nextValue;

	    {
	      if (context._currentRenderer !== undefined && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
	        error('Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.');
	      }

	      context._currentRenderer = rendererSigil;
	    }
	  }

	  var prevNode = currentActiveSnapshot;
	  var newNode = {
	    parent: prevNode,
	    depth: prevNode === null ? 0 : prevNode.depth + 1,
	    context: context,
	    parentValue: prevValue,
	    value: nextValue
	  };
	  currentActiveSnapshot = newNode;
	  return newNode;
	}
	function popProvider(context) {
	  var prevSnapshot = currentActiveSnapshot;

	  if (prevSnapshot === null) {
	    throw new Error('Tried to pop a Context at the root of the app. This is a bug in React.');
	  }

	  {
	    if (prevSnapshot.context !== context) {
	      error('The parent context is not the expected context. This is probably a bug in React.');
	    }
	  }

	  {
	    var value = prevSnapshot.parentValue;

	    if (value === REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED) {
	      prevSnapshot.context._currentValue = prevSnapshot.context._defaultValue;
	    } else {
	      prevSnapshot.context._currentValue = value;
	    }

	    {
	      if (context._currentRenderer !== undefined && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
	        error('Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.');
	      }

	      context._currentRenderer = rendererSigil;
	    }
	  }

	  return currentActiveSnapshot = prevSnapshot.parent;
	}
	function getActiveContext() {
	  return currentActiveSnapshot;
	}
	function readContext(context) {
	  var value =  context._currentValue ;
	  return value;
	}

	/**
	 * `ReactInstanceMap` maintains a mapping from a public facing stateful
	 * instance (key) and the internal representation (value). This allows public
	 * methods to accept the user facing instance as an argument and map them back
	 * to internal methods.
	 *
	 * Note that this module is currently shared and assumed to be stateless.
	 * If this becomes an actual Map, that will break.
	 */
	function get(key) {
	  return key._reactInternals;
	}
	function set(key, value) {
	  key._reactInternals = value;
	}

	var didWarnAboutNoopUpdateForComponent = {};
	var didWarnAboutDeprecatedWillMount = {};
	var didWarnAboutUninitializedState;
	var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
	var didWarnAboutLegacyLifecyclesAndDerivedState;
	var didWarnAboutUndefinedDerivedState;
	var warnOnUndefinedDerivedState;
	var warnOnInvalidCallback;
	var didWarnAboutDirectlyAssigningPropsToState;
	var didWarnAboutContextTypeAndContextTypes;
	var didWarnAboutInvalidateContextType;

	{
	  didWarnAboutUninitializedState = new Set();
	  didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
	  didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
	  didWarnAboutDirectlyAssigningPropsToState = new Set();
	  didWarnAboutUndefinedDerivedState = new Set();
	  didWarnAboutContextTypeAndContextTypes = new Set();
	  didWarnAboutInvalidateContextType = new Set();
	  var didWarnOnInvalidCallback = new Set();

	  warnOnInvalidCallback = function (callback, callerName) {
	    if (callback === null || typeof callback === 'function') {
	      return;
	    }

	    var key = callerName + '_' + callback;

	    if (!didWarnOnInvalidCallback.has(key)) {
	      didWarnOnInvalidCallback.add(key);

	      error('%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
	    }
	  };

	  warnOnUndefinedDerivedState = function (type, partialState) {
	    if (partialState === undefined) {
	      var componentName = getComponentNameFromType(type) || 'Component';

	      if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
	        didWarnAboutUndefinedDerivedState.add(componentName);

	        error('%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', componentName);
	      }
	    }
	  };
	}

	function warnNoop(publicInstance, callerName) {
	  {
	    var _constructor = publicInstance.constructor;
	    var componentName = _constructor && getComponentNameFromType(_constructor) || 'ReactClass';
	    var warningKey = componentName + '.' + callerName;

	    if (didWarnAboutNoopUpdateForComponent[warningKey]) {
	      return;
	    }

	    error('%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);

	    didWarnAboutNoopUpdateForComponent[warningKey] = true;
	  }
	}

	var classComponentUpdater = {
	  isMounted: function (inst) {
	    return false;
	  },
	  enqueueSetState: function (inst, payload, callback) {
	    var internals = get(inst);

	    if (internals.queue === null) {
	      warnNoop(inst, 'setState');
	    } else {
	      internals.queue.push(payload);

	      {
	        if (callback !== undefined && callback !== null) {
	          warnOnInvalidCallback(callback, 'setState');
	        }
	      }
	    }
	  },
	  enqueueReplaceState: function (inst, payload, callback) {
	    var internals = get(inst);
	    internals.replace = true;
	    internals.queue = [payload];

	    {
	      if (callback !== undefined && callback !== null) {
	        warnOnInvalidCallback(callback, 'setState');
	      }
	    }
	  },
	  enqueueForceUpdate: function (inst, callback) {
	    var internals = get(inst);

	    if (internals.queue === null) {
	      warnNoop(inst, 'forceUpdate');
	    } else {
	      {
	        if (callback !== undefined && callback !== null) {
	          warnOnInvalidCallback(callback, 'setState');
	        }
	      }
	    }
	  }
	};

	function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
	  var partialState = getDerivedStateFromProps(nextProps, prevState);

	  {
	    warnOnUndefinedDerivedState(ctor, partialState);
	  } // Merge the partial state and the previous state.


	  var newState = partialState === null || partialState === undefined ? prevState : assign({}, prevState, partialState);
	  return newState;
	}

	function constructClassInstance(ctor, props, maskedLegacyContext) {
	  var context = emptyContextObject;
	  var contextType = ctor.contextType;

	  {
	    if ('contextType' in ctor) {
	      var isValid = // Allow null for conditional declaration
	      contextType === null || contextType !== undefined && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === undefined; // Not a <Context.Consumer>

	      if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
	        didWarnAboutInvalidateContextType.add(ctor);
	        var addendum = '';

	        if (contextType === undefined) {
	          addendum = ' However, it is set to undefined. ' + 'This can be caused by a typo or by mixing up named and default imports. ' + 'This can also happen due to a circular dependency, so ' + 'try moving the createContext() call to a separate file.';
	        } else if (typeof contextType !== 'object') {
	          addendum = ' However, it is set to a ' + typeof contextType + '.';
	        } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
	          addendum = ' Did you accidentally pass the Context.Provider instead?';
	        } else if (contextType._context !== undefined) {
	          // <Context.Consumer>
	          addendum = ' Did you accidentally pass the Context.Consumer instead?';
	        } else {
	          addendum = ' However, it is set to an object with keys {' + Object.keys(contextType).join(', ') + '}.';
	        }

	        error('%s defines an invalid contextType. ' + 'contextType should point to the Context object returned by React.createContext().%s', getComponentNameFromType(ctor) || 'Component', addendum);
	      }
	    }
	  }

	  if (typeof contextType === 'object' && contextType !== null) {
	    context = readContext(contextType);
	  } else {
	    context = maskedLegacyContext;
	  }

	  var instance = new ctor(props, context);

	  {
	    if (typeof ctor.getDerivedStateFromProps === 'function' && (instance.state === null || instance.state === undefined)) {
	      var componentName = getComponentNameFromType(ctor) || 'Component';

	      if (!didWarnAboutUninitializedState.has(componentName)) {
	        didWarnAboutUninitializedState.add(componentName);

	        error('`%s` uses `getDerivedStateFromProps` but its initial state is ' + '%s. This is not recommended. Instead, define the initial state by ' + 'assigning an object to `this.state` in the constructor of `%s`. ' + 'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.', componentName, instance.state === null ? 'null' : 'undefined', componentName);
	      }
	    } // If new component APIs are defined, "unsafe" lifecycles won't be called.
	    // Warn about these lifecycles if they are present.
	    // Don't warn about react-lifecycles-compat polyfilled methods though.


	    if (typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function') {
	      var foundWillMountName = null;
	      var foundWillReceivePropsName = null;
	      var foundWillUpdateName = null;

	      if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
	        foundWillMountName = 'componentWillMount';
	      } else if (typeof instance.UNSAFE_componentWillMount === 'function') {
	        foundWillMountName = 'UNSAFE_componentWillMount';
	      }

	      if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
	        foundWillReceivePropsName = 'componentWillReceiveProps';
	      } else if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
	        foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
	      }

	      if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
	        foundWillUpdateName = 'componentWillUpdate';
	      } else if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
	        foundWillUpdateName = 'UNSAFE_componentWillUpdate';
	      }

	      if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
	        var _componentName = getComponentNameFromType(ctor) || 'Component';

	        var newApiName = typeof ctor.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';

	        if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
	          didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);

	          error('Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + '%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n' + 'The above lifecycles should be removed. Learn more about this warning here:\n' + 'https://reactjs.org/link/unsafe-component-lifecycles', _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : '', foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : '', foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : '');
	        }
	      }
	    }
	  }

	  return instance;
	}

	function checkClassInstance(instance, ctor, newProps) {
	  {
	    var name = getComponentNameFromType(ctor) || 'Component';
	    var renderPresent = instance.render;

	    if (!renderPresent) {
	      if (ctor.prototype && typeof ctor.prototype.render === 'function') {
	        error('%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
	      } else {
	        error('%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
	      }
	    }

	    if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
	      error('getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name);
	    }

	    if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name);
	    }

	    if (instance.propTypes) {
	      error('propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name);
	    }

	    if (instance.contextType) {
	      error('contextType was defined as an instance property on %s. Use a static ' + 'property to define contextType instead.', name);
	    }

	    {
	      if (instance.contextTypes) {
	        error('contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name);
	      }

	      if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
	        didWarnAboutContextTypeAndContextTypes.add(ctor);

	        error('%s declares both contextTypes and contextType static properties. ' + 'The legacy contextTypes property will be ignored.', name);
	      }
	    }

	    if (typeof instance.componentShouldUpdate === 'function') {
	      error('%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name);
	    }

	    if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
	      error('%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentNameFromType(ctor) || 'A pure component');
	    }

	    if (typeof instance.componentDidUnmount === 'function') {
	      error('%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name);
	    }

	    if (typeof instance.componentDidReceiveProps === 'function') {
	      error('%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name);
	    }

	    if (typeof instance.componentWillRecieveProps === 'function') {
	      error('%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name);
	    }

	    if (typeof instance.UNSAFE_componentWillRecieveProps === 'function') {
	      error('%s has a method called ' + 'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?', name);
	    }

	    var hasMutatedProps = instance.props !== newProps;

	    if (instance.props !== undefined && hasMutatedProps) {
	      error('%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name);
	    }

	    if (instance.defaultProps) {
	      error('Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name);
	    }

	    if (typeof instance.getSnapshotBeforeUpdate === 'function' && typeof instance.componentDidUpdate !== 'function' && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
	      didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);

	      error('%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). ' + 'This component defines getSnapshotBeforeUpdate() only.', getComponentNameFromType(ctor));
	    }

	    if (typeof instance.getDerivedStateFromProps === 'function') {
	      error('%s: getDerivedStateFromProps() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name);
	    }

	    if (typeof instance.getDerivedStateFromError === 'function') {
	      error('%s: getDerivedStateFromError() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name);
	    }

	    if (typeof ctor.getSnapshotBeforeUpdate === 'function') {
	      error('%s: getSnapshotBeforeUpdate() is defined as a static method ' + 'and will be ignored. Instead, declare it as an instance method.', name);
	    }

	    var _state = instance.state;

	    if (_state && (typeof _state !== 'object' || isArray(_state))) {
	      error('%s.state: must be set to an object or null', name);
	    }

	    if (typeof instance.getChildContext === 'function' && typeof ctor.childContextTypes !== 'object') {
	      error('%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', name);
	    }
	  }
	}

	function callComponentWillMount(type, instance) {
	  var oldState = instance.state;

	  if (typeof instance.componentWillMount === 'function') {
	    {
	      if ( instance.componentWillMount.__suppressDeprecationWarning !== true) {
	        var componentName = getComponentNameFromType(type) || 'Unknown';

	        if (!didWarnAboutDeprecatedWillMount[componentName]) {
	          warn( // keep this warning in sync with ReactStrictModeWarning.js
	          'componentWillMount has been renamed, and is not recommended for use. ' + 'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n' + '* Move code from componentWillMount to componentDidMount (preferred in most cases) ' + 'or the constructor.\n' + '\nPlease update the following components: %s', componentName);

	          didWarnAboutDeprecatedWillMount[componentName] = true;
	        }
	      }
	    }

	    instance.componentWillMount();
	  }

	  if (typeof instance.UNSAFE_componentWillMount === 'function') {
	    instance.UNSAFE_componentWillMount();
	  }

	  if (oldState !== instance.state) {
	    {
	      error('%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentNameFromType(type) || 'Component');
	    }

	    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
	  }
	}

	function processUpdateQueue(internalInstance, inst, props, maskedLegacyContext) {
	  if (internalInstance.queue !== null && internalInstance.queue.length > 0) {
	    var oldQueue = internalInstance.queue;
	    var oldReplace = internalInstance.replace;
	    internalInstance.queue = null;
	    internalInstance.replace = false;

	    if (oldReplace && oldQueue.length === 1) {
	      inst.state = oldQueue[0];
	    } else {
	      var nextState = oldReplace ? oldQueue[0] : inst.state;
	      var dontMutate = true;

	      for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
	        var partial = oldQueue[i];
	        var partialState = typeof partial === 'function' ? partial.call(inst, nextState, props, maskedLegacyContext) : partial;

	        if (partialState != null) {
	          if (dontMutate) {
	            dontMutate = false;
	            nextState = assign({}, nextState, partialState);
	          } else {
	            assign(nextState, partialState);
	          }
	        }
	      }

	      inst.state = nextState;
	    }
	  } else {
	    internalInstance.queue = null;
	  }
	} // Invokes the mount life-cycles on a previously never rendered instance.


	function mountClassInstance(instance, ctor, newProps, maskedLegacyContext) {
	  {
	    checkClassInstance(instance, ctor, newProps);
	  }

	  var initialState = instance.state !== undefined ? instance.state : null;
	  instance.updater = classComponentUpdater;
	  instance.props = newProps;
	  instance.state = initialState; // We don't bother initializing the refs object on the server, since we're not going to resolve them anyway.
	  // The internal instance will be used to manage updates that happen during this mount.

	  var internalInstance = {
	    queue: [],
	    replace: false
	  };
	  set(instance, internalInstance);
	  var contextType = ctor.contextType;

	  if (typeof contextType === 'object' && contextType !== null) {
	    instance.context = readContext(contextType);
	  } else {
	    instance.context = maskedLegacyContext;
	  }

	  {
	    if (instance.state === newProps) {
	      var componentName = getComponentNameFromType(ctor) || 'Component';

	      if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
	        didWarnAboutDirectlyAssigningPropsToState.add(componentName);

	        error('%s: It is not recommended to assign props directly to state ' + "because updates to props won't be reflected in state. " + 'In most cases, it is better to use props directly.', componentName);
	      }
	    }
	  }

	  var getDerivedStateFromProps = ctor.getDerivedStateFromProps;

	  if (typeof getDerivedStateFromProps === 'function') {
	    instance.state = applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, initialState, newProps);
	  } // In order to support react-lifecycles-compat polyfilled components,
	  // Unsafe lifecycles should not be invoked for components using the new APIs.


	  if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
	    callComponentWillMount(ctor, instance); // If we had additional state updates during this life-cycle, let's
	    // process them now.

	    processUpdateQueue(internalInstance, instance, newProps, maskedLegacyContext);
	  }
	}

	// Ids are base 32 strings whose binary representation corresponds to the
	// position of a node in a tree.
	// Every time the tree forks into multiple children, we add additional bits to
	// the left of the sequence that represent the position of the child within the
	// current level of children.
	//
	//      00101       00010001011010101
	//      ╰─┬─╯       ╰───────┬───────╯
	//   Fork 5 of 20       Parent id
	//
	// The leading 0s are important. In the above example, you only need 3 bits to
	// represent slot 5. However, you need 5 bits to represent all the forks at
	// the current level, so we must account for the empty bits at the end.
	//
	// For this same reason, slots are 1-indexed instead of 0-indexed. Otherwise,
	// the zeroth id at a level would be indistinguishable from its parent.
	//
	// If a node has only one child, and does not materialize an id (i.e. does not
	// contain a useId hook), then we don't need to allocate any space in the
	// sequence. It's treated as a transparent indirection. For example, these two
	// trees produce the same ids:
	//
	// <>                          <>
	//   <Indirection>               <A />
	//     <A />                     <B />
	//   </Indirection>            </>
	//   <B />
	// </>
	//
	// However, we cannot skip any node that materializes an id. Otherwise, a parent
	// id that does not fork would be indistinguishable from its child id. For
	// example, this tree does not fork, but the parent and child must have
	// different ids.
	//
	// <Parent>
	//   <Child />
	// </Parent>
	//
	// To handle this scenario, every time we materialize an id, we allocate a
	// new level with a single slot. You can think of this as a fork with only one
	// prong, or an array of children with length 1.
	//
	// It's possible for the size of the sequence to exceed 32 bits, the max
	// size for bitwise operations. When this happens, we make more room by
	// converting the right part of the id to a string and storing it in an overflow
	// variable. We use a base 32 string representation, because 32 is the largest
	// power of 2 that is supported by toString(). We want the base to be large so
	// that the resulting ids are compact, and we want the base to be a power of 2
	// because every log2(base) bits corresponds to a single character, i.e. every
	// log2(32) = 5 bits. That means we can lop bits off the end 5 at a time without
	// affecting the final result.
	var emptyTreeContext = {
	  id: 1,
	  overflow: ''
	};
	function getTreeId(context) {
	  var overflow = context.overflow;
	  var idWithLeadingBit = context.id;
	  var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
	  return id.toString(32) + overflow;
	}
	function pushTreeContext(baseContext, totalChildren, index) {
	  var baseIdWithLeadingBit = baseContext.id;
	  var baseOverflow = baseContext.overflow; // The leftmost 1 marks the end of the sequence, non-inclusive. It's not part
	  // of the id; we use it to account for leading 0s.

	  var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
	  var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
	  var slot = index + 1;
	  var length = getBitLength(totalChildren) + baseLength; // 30 is the max length we can store without overflowing, taking into
	  // consideration the leading 1 we use to mark the end of the sequence.

	  if (length > 30) {
	    // We overflowed the bitwise-safe range. Fall back to slower algorithm.
	    // This branch assumes the length of the base id is greater than 5; it won't
	    // work for smaller ids, because you need 5 bits per character.
	    //
	    // We encode the id in multiple steps: first the base id, then the
	    // remaining digits.
	    //
	    // Each 5 bit sequence corresponds to a single base 32 character. So for
	    // example, if the current id is 23 bits long, we can convert 20 of those
	    // bits into a string of 4 characters, with 3 bits left over.
	    //
	    // First calculate how many bits in the base id represent a complete
	    // sequence of characters.
	    var numberOfOverflowBits = baseLength - baseLength % 5; // Then create a bitmask that selects only those bits.

	    var newOverflowBits = (1 << numberOfOverflowBits) - 1; // Select the bits, and convert them to a base 32 string.

	    var newOverflow = (baseId & newOverflowBits).toString(32); // Now we can remove those bits from the base id.

	    var restOfBaseId = baseId >> numberOfOverflowBits;
	    var restOfBaseLength = baseLength - numberOfOverflowBits; // Finally, encode the rest of the bits using the normal algorithm. Because
	    // we made more room, this time it won't overflow.

	    var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
	    var restOfNewBits = slot << restOfBaseLength;
	    var id = restOfNewBits | restOfBaseId;
	    var overflow = newOverflow + baseOverflow;
	    return {
	      id: 1 << restOfLength | id,
	      overflow: overflow
	    };
	  } else {
	    // Normal path
	    var newBits = slot << baseLength;

	    var _id = newBits | baseId;

	    var _overflow = baseOverflow;
	    return {
	      id: 1 << length | _id,
	      overflow: _overflow
	    };
	  }
	}

	function getBitLength(number) {
	  return 32 - clz32(number);
	}

	function getLeadingBit(id) {
	  return 1 << getBitLength(id) - 1;
	} // TODO: Math.clz32 is supported in Node 12+. Maybe we can drop the fallback.


	var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback; // Count leading zeros.
	// Based on:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

	var log = Math.log;
	var LN2 = Math.LN2;

	function clz32Fallback(x) {
	  var asUint = x >>> 0;

	  if (asUint === 0) {
	    return 32;
	  }

	  return 31 - (log(asUint) / LN2 | 0) | 0;
	}

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
	  ;
	}

	var objectIs = typeof Object.is === 'function' ? Object.is : is;

	var currentlyRenderingComponent = null;
	var currentlyRenderingTask = null;
	var firstWorkInProgressHook = null;
	var workInProgressHook = null; // Whether the work-in-progress hook is a re-rendered hook

	var isReRender = false; // Whether an update was scheduled during the currently executing render pass.

	var didScheduleRenderPhaseUpdate = false; // Counts the number of useId hooks in this component

	var localIdCounter = 0; // Lazily created map of render-phase updates

	var renderPhaseUpdates = null; // Counter to prevent infinite loops.

	var numberOfReRenders = 0;
	var RE_RENDER_LIMIT = 25;
	var isInHookUserCodeInDev = false; // In DEV, this is the name of the currently executing primitive hook

	var currentHookNameInDev;

	function resolveCurrentlyRenderingComponent() {
	  if (currentlyRenderingComponent === null) {
	    throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' + ' one of the following reasons:\n' + '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' + '2. You might be breaking the Rules of Hooks\n' + '3. You might have more than one copy of React in the same app\n' + 'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.');
	  }

	  {
	    if (isInHookUserCodeInDev) {
	      error('Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' + 'You can only call Hooks at the top level of your React function. ' + 'For more information, see ' + 'https://reactjs.org/link/rules-of-hooks');
	    }
	  }

	  return currentlyRenderingComponent;
	}

	function areHookInputsEqual(nextDeps, prevDeps) {
	  if (prevDeps === null) {
	    {
	      error('%s received a final argument during this render, but not during ' + 'the previous render. Even though the final argument is optional, ' + 'its type cannot change between renders.', currentHookNameInDev);
	    }

	    return false;
	  }

	  {
	    // Don't bother comparing lengths in prod because these arrays should be
	    // passed inline.
	    if (nextDeps.length !== prevDeps.length) {
	      error('The final argument passed to %s changed size between renders. The ' + 'order and size of this array must remain constant.\n\n' + 'Previous: %s\n' + 'Incoming: %s', currentHookNameInDev, "[" + nextDeps.join(', ') + "]", "[" + prevDeps.join(', ') + "]");
	    }
	  }

	  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
	    if (objectIs(nextDeps[i], prevDeps[i])) {
	      continue;
	    }

	    return false;
	  }

	  return true;
	}

	function createHook() {
	  if (numberOfReRenders > 0) {
	    throw new Error('Rendered more hooks than during the previous render');
	  }

	  return {
	    memoizedState: null,
	    queue: null,
	    next: null
	  };
	}

	function createWorkInProgressHook() {
	  if (workInProgressHook === null) {
	    // This is the first hook in the list
	    if (firstWorkInProgressHook === null) {
	      isReRender = false;
	      firstWorkInProgressHook = workInProgressHook = createHook();
	    } else {
	      // There's already a work-in-progress. Reuse it.
	      isReRender = true;
	      workInProgressHook = firstWorkInProgressHook;
	    }
	  } else {
	    if (workInProgressHook.next === null) {
	      isReRender = false; // Append to the end of the list

	      workInProgressHook = workInProgressHook.next = createHook();
	    } else {
	      // There's already a work-in-progress. Reuse it.
	      isReRender = true;
	      workInProgressHook = workInProgressHook.next;
	    }
	  }

	  return workInProgressHook;
	}

	function prepareToUseHooks(task, componentIdentity) {
	  currentlyRenderingComponent = componentIdentity;
	  currentlyRenderingTask = task;

	  {
	    isInHookUserCodeInDev = false;
	  } // The following should have already been reset
	  // didScheduleRenderPhaseUpdate = false;
	  // localIdCounter = 0;
	  // firstWorkInProgressHook = null;
	  // numberOfReRenders = 0;
	  // renderPhaseUpdates = null;
	  // workInProgressHook = null;


	  localIdCounter = 0;
	}
	function finishHooks(Component, props, children, refOrContext) {
	  // This must be called after every function component to prevent hooks from
	  // being used in classes.
	  while (didScheduleRenderPhaseUpdate) {
	    // Updates were scheduled during the render phase. They are stored in
	    // the `renderPhaseUpdates` map. Call the component again, reusing the
	    // work-in-progress hooks and applying the additional updates on top. Keep
	    // restarting until no more updates are scheduled.
	    didScheduleRenderPhaseUpdate = false;
	    localIdCounter = 0;
	    numberOfReRenders += 1; // Start over from the beginning of the list

	    workInProgressHook = null;
	    children = Component(props, refOrContext);
	  }

	  resetHooksState();
	  return children;
	}
	function checkDidRenderIdHook() {
	  // This should be called immediately after every finishHooks call.
	  // Conceptually, it's part of the return value of finishHooks; it's only a
	  // separate function to avoid using an array tuple.
	  var didRenderIdHook = localIdCounter !== 0;
	  return didRenderIdHook;
	} // Reset the internal hooks state if an error occurs while rendering a component

	function resetHooksState() {
	  {
	    isInHookUserCodeInDev = false;
	  }

	  currentlyRenderingComponent = null;
	  currentlyRenderingTask = null;
	  didScheduleRenderPhaseUpdate = false;
	  firstWorkInProgressHook = null;
	  numberOfReRenders = 0;
	  renderPhaseUpdates = null;
	  workInProgressHook = null;
	}

	function readContext$1(context) {
	  {
	    if (isInHookUserCodeInDev) {
	      error('Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
	    }
	  }

	  return readContext(context);
	}

	function useContext(context) {
	  {
	    currentHookNameInDev = 'useContext';
	  }

	  resolveCurrentlyRenderingComponent();
	  return readContext(context);
	}

	function basicStateReducer(state, action) {
	  // $FlowFixMe: Flow doesn't like mixed types
	  return typeof action === 'function' ? action(state) : action;
	}

	function useState(initialState) {
	  {
	    currentHookNameInDev = 'useState';
	  }

	  return useReducer(basicStateReducer, // useReducer has a special case to support lazy useState initializers
	  initialState);
	}
	function useReducer(reducer, initialArg, init) {
	  {
	    if (reducer !== basicStateReducer) {
	      currentHookNameInDev = 'useReducer';
	    }
	  }

	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();

	  if (isReRender) {
	    // This is a re-render. Apply the new render phase updates to the previous
	    // current hook.
	    var queue = workInProgressHook.queue;
	    var dispatch = queue.dispatch;

	    if (renderPhaseUpdates !== null) {
	      // Render phase updates are stored in a map of queue -> linked list
	      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

	      if (firstRenderPhaseUpdate !== undefined) {
	        renderPhaseUpdates.delete(queue);
	        var newState = workInProgressHook.memoizedState;
	        var update = firstRenderPhaseUpdate;

	        do {
	          // Process this render phase update. We don't have to check the
	          // priority because it will always be the same as the current
	          // render's.
	          var action = update.action;

	          {
	            isInHookUserCodeInDev = true;
	          }

	          newState = reducer(newState, action);

	          {
	            isInHookUserCodeInDev = false;
	          }

	          update = update.next;
	        } while (update !== null);

	        workInProgressHook.memoizedState = newState;
	        return [newState, dispatch];
	      }
	    }

	    return [workInProgressHook.memoizedState, dispatch];
	  } else {
	    {
	      isInHookUserCodeInDev = true;
	    }

	    var initialState;

	    if (reducer === basicStateReducer) {
	      // Special case for `useState`.
	      initialState = typeof initialArg === 'function' ? initialArg() : initialArg;
	    } else {
	      initialState = init !== undefined ? init(initialArg) : initialArg;
	    }

	    {
	      isInHookUserCodeInDev = false;
	    }

	    workInProgressHook.memoizedState = initialState;

	    var _queue = workInProgressHook.queue = {
	      last: null,
	      dispatch: null
	    };

	    var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);

	    return [workInProgressHook.memoizedState, _dispatch];
	  }
	}

	function useMemo(nextCreate, deps) {
	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();
	  var nextDeps = deps === undefined ? null : deps;

	  if (workInProgressHook !== null) {
	    var prevState = workInProgressHook.memoizedState;

	    if (prevState !== null) {
	      if (nextDeps !== null) {
	        var prevDeps = prevState[1];

	        if (areHookInputsEqual(nextDeps, prevDeps)) {
	          return prevState[0];
	        }
	      }
	    }
	  }

	  {
	    isInHookUserCodeInDev = true;
	  }

	  var nextValue = nextCreate();

	  {
	    isInHookUserCodeInDev = false;
	  }

	  workInProgressHook.memoizedState = [nextValue, nextDeps];
	  return nextValue;
	}

	function useRef(initialValue) {
	  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
	  workInProgressHook = createWorkInProgressHook();
	  var previousRef = workInProgressHook.memoizedState;

	  if (previousRef === null) {
	    var ref = {
	      current: initialValue
	    };

	    {
	      Object.seal(ref);
	    }

	    workInProgressHook.memoizedState = ref;
	    return ref;
	  } else {
	    return previousRef;
	  }
	}

	function useLayoutEffect(create, inputs) {
	  {
	    currentHookNameInDev = 'useLayoutEffect';

	    error('useLayoutEffect does nothing on the server, because its effect cannot ' + "be encoded into the server renderer's output format. This will lead " + 'to a mismatch between the initial, non-hydrated UI and the intended ' + 'UI. To avoid this, useLayoutEffect should only be used in ' + 'components that render exclusively on the client. ' + 'See https://reactjs.org/link/uselayouteffect-ssr for common fixes.');
	  }
	}

	function dispatchAction(componentIdentity, queue, action) {
	  if (numberOfReRenders >= RE_RENDER_LIMIT) {
	    throw new Error('Too many re-renders. React limits the number of renders to prevent ' + 'an infinite loop.');
	  }

	  if (componentIdentity === currentlyRenderingComponent) {
	    // This is a render phase update. Stash it in a lazily-created map of
	    // queue -> linked list of updates. After this render pass, we'll restart
	    // and apply the stashed updates on top of the work-in-progress hook.
	    didScheduleRenderPhaseUpdate = true;
	    var update = {
	      action: action,
	      next: null
	    };

	    if (renderPhaseUpdates === null) {
	      renderPhaseUpdates = new Map();
	    }

	    var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

	    if (firstRenderPhaseUpdate === undefined) {
	      renderPhaseUpdates.set(queue, update);
	    } else {
	      // Append the update to the end of the list.
	      var lastRenderPhaseUpdate = firstRenderPhaseUpdate;

	      while (lastRenderPhaseUpdate.next !== null) {
	        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
	      }

	      lastRenderPhaseUpdate.next = update;
	    }
	  }
	}

	function useCallback(callback, deps) {
	  return useMemo(function () {
	    return callback;
	  }, deps);
	} // TODO Decide on how to implement this hook for server rendering.
	// If a mutation occurs during render, consider triggering a Suspense boundary
	// and falling back to client rendering.

	function useMutableSource(source, getSnapshot, subscribe) {
	  resolveCurrentlyRenderingComponent();
	  return getSnapshot(source._source);
	}

	function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
	  if (getServerSnapshot === undefined) {
	    throw new Error('Missing getServerSnapshot, which is required for ' + 'server-rendered content. Will revert to client rendering.');
	  }

	  return getServerSnapshot();
	}

	function useDeferredValue(value) {
	  resolveCurrentlyRenderingComponent();
	  return value;
	}

	function unsupportedStartTransition() {
	  throw new Error('startTransition cannot be called during server rendering.');
	}

	function useTransition() {
	  resolveCurrentlyRenderingComponent();
	  return [false, unsupportedStartTransition];
	}

	function useId() {
	  var task = currentlyRenderingTask;
	  var treeId = getTreeId(task.treeContext);
	  var responseState = currentResponseState;

	  if (responseState === null) {
	    throw new Error('Invalid hook call. Hooks can only be called inside of the body of a function component.');
	  }

	  var localId = localIdCounter++;
	  return makeId(responseState, treeId, localId);
	}

	function noop() {}

	var Dispatcher = {
	  readContext: readContext$1,
	  useContext: useContext,
	  useMemo: useMemo,
	  useReducer: useReducer,
	  useRef: useRef,
	  useState: useState,
	  useInsertionEffect: noop,
	  useLayoutEffect: useLayoutEffect,
	  useCallback: useCallback,
	  // useImperativeHandle is not run in the server environment
	  useImperativeHandle: noop,
	  // Effects are not run in the server environment.
	  useEffect: noop,
	  // Debugging effect
	  useDebugValue: noop,
	  useDeferredValue: useDeferredValue,
	  useTransition: useTransition,
	  useId: useId,
	  // Subscriptions are not setup in a server environment.
	  useMutableSource: useMutableSource,
	  useSyncExternalStore: useSyncExternalStore
	};

	var currentResponseState = null;
	function setCurrentResponseState(responseState) {
	  currentResponseState = responseState;
	}

	function getStackByComponentStackNode(componentStack) {
	  try {
	    var info = '';
	    var node = componentStack;

	    do {
	      switch (node.tag) {
	        case 0:
	          info += describeBuiltInComponentFrame(node.type, null, null);
	          break;

	        case 1:
	          info += describeFunctionComponentFrame(node.type, null, null);
	          break;

	        case 2:
	          info += describeClassComponentFrame(node.type, null, null);
	          break;
	      }

	      node = node.parent;
	    } while (node);

	    return info;
	  } catch (x) {
	    return '\nError generating stack: ' + x.message + '\n' + x.stack;
	  }
	}

	var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
	var PENDING = 0;
	var COMPLETED = 1;
	var FLUSHED = 2;
	var ABORTED = 3;
	var ERRORED = 4;
	var OPEN = 0;
	var CLOSING = 1;
	var CLOSED = 2;
	// This is a default heuristic for how to split up the HTML content into progressive
	// loading. Our goal is to be able to display additional new content about every 500ms.
	// Faster than that is unnecessary and should be throttled on the client. It also
	// adds unnecessary overhead to do more splits. We don't know if it's a higher or lower
	// end device but higher end suffer less from the overhead than lower end does from
	// not getting small enough pieces. We error on the side of low end.
	// We base this on low end 3G speeds which is about 500kbits per second. We assume
	// that there can be a reasonable drop off from max bandwidth which leaves you with
	// as little as 80%. We can receive half of that each 500ms - at best. In practice,
	// a little bandwidth is lost to processing and contention - e.g. CSS and images that
	// are downloaded along with the main content. So we estimate about half of that to be
	// the lower end throughput. In other words, we expect that you can at least show
	// about 12.5kb of content per 500ms. Not counting starting latency for the first
	// paint.
	// 500 * 1024 / 8 * .8 * 0.5 / 2
	var DEFAULT_PROGRESSIVE_CHUNK_SIZE = 12800;

	function defaultErrorHandler(error) {
	  console['error'](error); // Don't transform to our wrapper
	}

	function noop$1() {}

	function createRequest(children, responseState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError) {
	  var pingedTasks = [];
	  var abortSet = new Set();
	  var request = {
	    destination: null,
	    responseState: responseState,
	    progressiveChunkSize: progressiveChunkSize === undefined ? DEFAULT_PROGRESSIVE_CHUNK_SIZE : progressiveChunkSize,
	    status: OPEN,
	    fatalError: null,
	    nextSegmentId: 0,
	    allPendingTasks: 0,
	    pendingRootTasks: 0,
	    completedRootSegment: null,
	    abortableTasks: abortSet,
	    pingedTasks: pingedTasks,
	    clientRenderedBoundaries: [],
	    completedBoundaries: [],
	    partialBoundaries: [],
	    onError: onError === undefined ? defaultErrorHandler : onError,
	    onAllReady: onAllReady === undefined ? noop$1 : onAllReady,
	    onShellReady: onShellReady === undefined ? noop$1 : onShellReady,
	    onShellError: onShellError === undefined ? noop$1 : onShellError,
	    onFatalError: onFatalError === undefined ? noop$1 : onFatalError
	  }; // This segment represents the root fallback.

	  var rootSegment = createPendingSegment(request, 0, null, rootFormatContext); // There is no parent so conceptually, we're unblocked to flush this segment.

	  rootSegment.parentFlushed = true;
	  var rootTask = createTask(request, children, null, rootSegment, abortSet, emptyContextObject, rootContextSnapshot, emptyTreeContext);
	  pingedTasks.push(rootTask);
	  return request;
	}

	function pingTask(request, task) {
	  var pingedTasks = request.pingedTasks;
	  pingedTasks.push(task);

	  if (pingedTasks.length === 1) {
	    scheduleWork(function () {
	      return performWork(request);
	    });
	  }
	}

	function createSuspenseBoundary(request, fallbackAbortableTasks) {
	  return {
	    id: UNINITIALIZED_SUSPENSE_BOUNDARY_ID,
	    rootSegmentID: -1,
	    parentFlushed: false,
	    pendingTasks: 0,
	    forceClientRender: false,
	    completedSegments: [],
	    byteSize: 0,
	    fallbackAbortableTasks: fallbackAbortableTasks
	  };
	}

	function createTask(request, node, blockedBoundary, blockedSegment, abortSet, legacyContext, context, treeContext) {
	  request.allPendingTasks++;

	  if (blockedBoundary === null) {
	    request.pendingRootTasks++;
	  } else {
	    blockedBoundary.pendingTasks++;
	  }

	  var task = {
	    node: node,
	    ping: function () {
	      return pingTask(request, task);
	    },
	    blockedBoundary: blockedBoundary,
	    blockedSegment: blockedSegment,
	    abortSet: abortSet,
	    legacyContext: legacyContext,
	    context: context,
	    treeContext: treeContext
	  };

	  {
	    task.componentStack = null;
	  }

	  abortSet.add(task);
	  return task;
	}

	function createPendingSegment(request, index, boundary, formatContext) {
	  return {
	    status: PENDING,
	    id: -1,
	    // lazily assigned later
	    index: index,
	    parentFlushed: false,
	    chunks: [],
	    children: [],
	    formatContext: formatContext,
	    boundary: boundary
	  };
	} // DEV-only global reference to the currently executing task


	var currentTaskInDEV = null;

	function getCurrentStackInDEV() {
	  {
	    if (currentTaskInDEV === null || currentTaskInDEV.componentStack === null) {
	      return '';
	    }

	    return getStackByComponentStackNode(currentTaskInDEV.componentStack);
	  }
	}

	function pushBuiltInComponentStackInDEV(task, type) {
	  {
	    task.componentStack = {
	      tag: 0,
	      parent: task.componentStack,
	      type: type
	    };
	  }
	}

	function pushFunctionComponentStackInDEV(task, type) {
	  {
	    task.componentStack = {
	      tag: 1,
	      parent: task.componentStack,
	      type: type
	    };
	  }
	}

	function pushClassComponentStackInDEV(task, type) {
	  {
	    task.componentStack = {
	      tag: 2,
	      parent: task.componentStack,
	      type: type
	    };
	  }
	}

	function popComponentStackInDEV(task) {
	  {
	    if (task.componentStack === null) {
	      error('Unexpectedly popped too many stack frames. This is a bug in React.');
	    } else {
	      task.componentStack = task.componentStack.parent;
	    }
	  }
	}

	function logRecoverableError(request, error) {
	  // If this callback errors, we intentionally let that error bubble up to become a fatal error
	  // so that someone fixes the error reporting instead of hiding it.
	  var onError = request.onError;
	  onError(error);
	}

	function fatalError(request, error) {
	  // This is called outside error handling code such as if the root errors outside
	  // a suspense boundary or if the root suspense boundary's fallback errors.
	  // It's also called if React itself or its host configs errors.
	  var onShellError = request.onShellError;
	  onShellError(error);
	  var onFatalError = request.onFatalError;
	  onFatalError(error);

	  if (request.destination !== null) {
	    request.status = CLOSED;
	    closeWithError(request.destination, error);
	  } else {
	    request.status = CLOSING;
	    request.fatalError = error;
	  }
	}

	function renderSuspenseBoundary(request, task, props) {
	  pushBuiltInComponentStackInDEV(task, 'Suspense');
	  var parentBoundary = task.blockedBoundary;
	  var parentSegment = task.blockedSegment; // Each time we enter a suspense boundary, we split out into a new segment for
	  // the fallback so that we can later replace that segment with the content.
	  // This also lets us split out the main content even if it doesn't suspend,
	  // in case it ends up generating a large subtree of content.

	  var fallback = props.fallback;
	  var content = props.children;
	  var fallbackAbortSet = new Set();
	  var newBoundary = createSuspenseBoundary(request, fallbackAbortSet);
	  var insertionIndex = parentSegment.chunks.length; // The children of the boundary segment is actually the fallback.

	  var boundarySegment = createPendingSegment(request, insertionIndex, newBoundary, parentSegment.formatContext);
	  parentSegment.children.push(boundarySegment); // This segment is the actual child content. We can start rendering that immediately.

	  var contentRootSegment = createPendingSegment(request, 0, null, parentSegment.formatContext); // We mark the root segment as having its parent flushed. It's not really flushed but there is
	  // no parent segment so there's nothing to wait on.

	  contentRootSegment.parentFlushed = true; // Currently this is running synchronously. We could instead schedule this to pingedTasks.
	  // I suspect that there might be some efficiency benefits from not creating the suspended task
	  // and instead just using the stack if possible.
	  // TODO: Call this directly instead of messing with saving and restoring contexts.
	  // We can reuse the current context and task to render the content immediately without
	  // context switching. We just need to temporarily switch which boundary and which segment
	  // we're writing to. If something suspends, it'll spawn new suspended task with that context.

	  task.blockedBoundary = newBoundary;
	  task.blockedSegment = contentRootSegment;

	  try {
	    // We use the safe form because we don't handle suspending here. Only error handling.
	    renderNode(request, task, content);
	    contentRootSegment.status = COMPLETED;
	    queueCompletedSegment(newBoundary, contentRootSegment);

	    if (newBoundary.pendingTasks === 0) {
	      // This must have been the last segment we were waiting on. This boundary is now complete.
	      // Therefore we won't need the fallback. We early return so that we don't have to create
	      // the fallback.
	      popComponentStackInDEV(task);
	      return;
	    }
	  } catch (error) {
	    contentRootSegment.status = ERRORED;
	    logRecoverableError(request, error);
	    newBoundary.forceClientRender = true; // We don't need to decrement any task numbers because we didn't spawn any new task.
	    // We don't need to schedule any task because we know the parent has written yet.
	    // We do need to fallthrough to create the fallback though.
	  } finally {
	    task.blockedBoundary = parentBoundary;
	    task.blockedSegment = parentSegment;
	  } // We create suspended task for the fallback because we don't want to actually work
	  // on it yet in case we finish the main content, so we queue for later.


	  var suspendedFallbackTask = createTask(request, fallback, parentBoundary, boundarySegment, fallbackAbortSet, task.legacyContext, task.context, task.treeContext);

	  {
	    suspendedFallbackTask.componentStack = task.componentStack;
	  } // TODO: This should be queued at a separate lower priority queue so that we only work
	  // on preparing fallbacks if we don't have any more main content to task on.


	  request.pingedTasks.push(suspendedFallbackTask);
	  popComponentStackInDEV(task);
	}

	function renderHostElement(request, task, type, props) {
	  pushBuiltInComponentStackInDEV(task, type);
	  var segment = task.blockedSegment;
	  var children = pushStartInstance(segment.chunks, type, props, request.responseState, segment.formatContext);
	  var prevContext = segment.formatContext;
	  segment.formatContext = getChildFormatContext(prevContext, type, props); // We use the non-destructive form because if something suspends, we still
	  // need to pop back up and finish this subtree of HTML.

	  renderNode(request, task, children); // We expect that errors will fatal the whole task and that we don't need
	  // the correct context. Therefore this is not in a finally.

	  segment.formatContext = prevContext;
	  pushEndInstance(segment.chunks, type);
	  popComponentStackInDEV(task);
	}

	function shouldConstruct$1(Component) {
	  return Component.prototype && Component.prototype.isReactComponent;
	}

	function renderWithHooks(request, task, Component, props, secondArg) {
	  var componentIdentity = {};
	  prepareToUseHooks(task, componentIdentity);
	  var result = Component(props, secondArg);
	  return finishHooks(Component, props, result, secondArg);
	}

	function finishClassComponent(request, task, instance, Component, props) {
	  var nextChildren = instance.render();

	  {
	    if (instance.props !== props) {
	      if (!didWarnAboutReassigningProps) {
	        error('It looks like %s is reassigning its own `this.props` while rendering. ' + 'This is not supported and can lead to confusing bugs.', getComponentNameFromType(Component) || 'a component');
	      }

	      didWarnAboutReassigningProps = true;
	    }
	  }

	  {
	    var childContextTypes = Component.childContextTypes;

	    if (childContextTypes !== null && childContextTypes !== undefined) {
	      var previousContext = task.legacyContext;
	      var mergedContext = processChildContext(instance, Component, previousContext, childContextTypes);
	      task.legacyContext = mergedContext;
	      renderNodeDestructive(request, task, nextChildren);
	      task.legacyContext = previousContext;
	      return;
	    }
	  }

	  renderNodeDestructive(request, task, nextChildren);
	}

	function renderClassComponent(request, task, Component, props) {
	  pushClassComponentStackInDEV(task, Component);
	  var maskedContext =  getMaskedContext(Component, task.legacyContext) ;
	  var instance = constructClassInstance(Component, props, maskedContext);
	  mountClassInstance(instance, Component, props, maskedContext);
	  finishClassComponent(request, task, instance, Component, props);
	  popComponentStackInDEV(task);
	}

	var didWarnAboutBadClass = {};
	var didWarnAboutModulePatternComponent = {};
	var didWarnAboutContextTypeOnFunctionComponent = {};
	var didWarnAboutGetDerivedStateOnFunctionComponent = {};
	var didWarnAboutReassigningProps = false;
	var didWarnAboutGenerators = false;
	var didWarnAboutMaps = false;
	var hasWarnedAboutUsingContextAsConsumer = false; // This would typically be a function component but we still support module pattern
	// components for some reason.

	function renderIndeterminateComponent(request, task, Component, props) {
	  var legacyContext;

	  {
	    legacyContext = getMaskedContext(Component, task.legacyContext);
	  }

	  pushFunctionComponentStackInDEV(task, Component);

	  {
	    if (Component.prototype && typeof Component.prototype.render === 'function') {
	      var componentName = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutBadClass[componentName]) {
	        error("The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);

	        didWarnAboutBadClass[componentName] = true;
	      }
	    }
	  }

	  var value = renderWithHooks(request, task, Component, props, legacyContext);
	  var hasId = checkDidRenderIdHook();

	  {
	    // Support for module components is deprecated and is removed behind a flag.
	    // Whether or not it would crash later, we want to show a good message in DEV first.
	    if (typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
	      var _componentName = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutModulePatternComponent[_componentName]) {
	        error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName, _componentName, _componentName);

	        didWarnAboutModulePatternComponent[_componentName] = true;
	      }
	    }
	  }

	  if ( // Run these checks in production only if the flag is off.
	  // Eventually we'll delete this branch altogether.
	   typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
	    {
	      var _componentName2 = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutModulePatternComponent[_componentName2]) {
	        error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName2, _componentName2, _componentName2);

	        didWarnAboutModulePatternComponent[_componentName2] = true;
	      }
	    }

	    mountClassInstance(value, Component, props, legacyContext);
	    finishClassComponent(request, task, value, Component, props);
	  } else {

	    {
	      validateFunctionComponentInDev(Component);
	    } // We're now successfully past this task, and we don't have to pop back to
	    // the previous task every again, so we can use the destructive recursive form.


	    if (hasId) {
	      // This component materialized an id. We treat this as its own level, with
	      // a single "child" slot.
	      var prevTreeContext = task.treeContext;
	      var totalChildren = 1;
	      var index = 0;
	      task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);

	      try {
	        renderNodeDestructive(request, task, value);
	      } finally {
	        task.treeContext = prevTreeContext;
	      }
	    } else {
	      renderNodeDestructive(request, task, value);
	    }
	  }

	  popComponentStackInDEV(task);
	}

	function validateFunctionComponentInDev(Component) {
	  {
	    if (Component) {
	      if (Component.childContextTypes) {
	        error('%s(...): childContextTypes cannot be defined on a function component.', Component.displayName || Component.name || 'Component');
	      }
	    }

	    if (typeof Component.getDerivedStateFromProps === 'function') {
	      var _componentName3 = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]) {
	        error('%s: Function components do not support getDerivedStateFromProps.', _componentName3);

	        didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3] = true;
	      }
	    }

	    if (typeof Component.contextType === 'object' && Component.contextType !== null) {
	      var _componentName4 = getComponentNameFromType(Component) || 'Unknown';

	      if (!didWarnAboutContextTypeOnFunctionComponent[_componentName4]) {
	        error('%s: Function components do not support contextType.', _componentName4);

	        didWarnAboutContextTypeOnFunctionComponent[_componentName4] = true;
	      }
	    }
	  }
	}

	function resolveDefaultProps(Component, baseProps) {
	  if (Component && Component.defaultProps) {
	    // Resolve default props. Taken from ReactElement
	    var props = assign({}, baseProps);
	    var defaultProps = Component.defaultProps;

	    for (var propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }

	    return props;
	  }

	  return baseProps;
	}

	function renderForwardRef(request, task, type, props, ref) {
	  pushFunctionComponentStackInDEV(task, type.render);
	  var children = renderWithHooks(request, task, type.render, props, ref);
	  var hasId = checkDidRenderIdHook();

	  if (hasId) {
	    // This component materialized an id. We treat this as its own level, with
	    // a single "child" slot.
	    var prevTreeContext = task.treeContext;
	    var totalChildren = 1;
	    var index = 0;
	    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, index);

	    try {
	      renderNodeDestructive(request, task, children);
	    } finally {
	      task.treeContext = prevTreeContext;
	    }
	  } else {
	    renderNodeDestructive(request, task, children);
	  }

	  popComponentStackInDEV(task);
	}

	function renderMemo(request, task, type, props, ref) {
	  var innerType = type.type;
	  var resolvedProps = resolveDefaultProps(innerType, props);
	  renderElement(request, task, innerType, resolvedProps, ref);
	}

	function renderContextConsumer(request, task, context, props) {
	  // The logic below for Context differs depending on PROD or DEV mode. In
	  // DEV mode, we create a separate object for Context.Consumer that acts
	  // like a proxy to Context. This proxy object adds unnecessary code in PROD
	  // so we use the old behaviour (Context.Consumer references Context) to
	  // reduce size and overhead. The separate object references context via
	  // a property called "_context", which also gives us the ability to check
	  // in DEV mode if this property exists or not and warn if it does not.
	  {
	    if (context._context === undefined) {
	      // This may be because it's a Context (rather than a Consumer).
	      // Or it may be because it's older React where they're the same thing.
	      // We only want to warn if we're sure it's a new React.
	      if (context !== context.Consumer) {
	        if (!hasWarnedAboutUsingContextAsConsumer) {
	          hasWarnedAboutUsingContextAsConsumer = true;

	          error('Rendering <Context> directly is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
	        }
	      }
	    } else {
	      context = context._context;
	    }
	  }

	  var render = props.children;

	  {
	    if (typeof render !== 'function') {
	      error('A context consumer was rendered with multiple children, or a child ' + "that isn't a function. A context consumer expects a single child " + 'that is a function. If you did pass a function, make sure there ' + 'is no trailing or leading whitespace around it.');
	    }
	  }

	  var newValue = readContext(context);
	  var newChildren = render(newValue);
	  renderNodeDestructive(request, task, newChildren);
	}

	function renderContextProvider(request, task, type, props) {
	  var context = type._context;
	  var value = props.value;
	  var children = props.children;
	  var prevSnapshot;

	  {
	    prevSnapshot = task.context;
	  }

	  task.context = pushProvider(context, value);
	  renderNodeDestructive(request, task, children);
	  task.context = popProvider(context);

	  {
	    if (prevSnapshot !== task.context) {
	      error('Popping the context provider did not return back to the original snapshot. This is a bug in React.');
	    }
	  }
	}

	function renderLazyComponent(request, task, lazyComponent, props, ref) {
	  pushBuiltInComponentStackInDEV(task, 'Lazy');
	  var payload = lazyComponent._payload;
	  var init = lazyComponent._init;
	  var Component = init(payload);
	  var resolvedProps = resolveDefaultProps(Component, props);
	  renderElement(request, task, Component, resolvedProps, ref);
	  popComponentStackInDEV(task);
	}

	function renderElement(request, task, type, props, ref) {
	  if (typeof type === 'function') {
	    if (shouldConstruct$1(type)) {
	      renderClassComponent(request, task, type, props);
	      return;
	    } else {
	      renderIndeterminateComponent(request, task, type, props);
	      return;
	    }
	  }

	  if (typeof type === 'string') {
	    renderHostElement(request, task, type, props);
	    return;
	  }

	  switch (type) {
	    // TODO: LegacyHidden acts the same as a fragment. This only works
	    // because we currently assume that every instance of LegacyHidden is
	    // accompanied by a host component wrapper. In the hidden mode, the host
	    // component is given a `hidden` attribute, which ensures that the
	    // initial HTML is not visible. To support the use of LegacyHidden as a
	    // true fragment, without an extra DOM node, we would have to hide the
	    // initial HTML in some other way.
	    // TODO: Add REACT_OFFSCREEN_TYPE here too with the same capability.
	    case REACT_LEGACY_HIDDEN_TYPE:
	    case REACT_DEBUG_TRACING_MODE_TYPE:
	    case REACT_STRICT_MODE_TYPE:
	    case REACT_PROFILER_TYPE:
	    case REACT_FRAGMENT_TYPE:
	      {
	        renderNodeDestructive(request, task, props.children);
	        return;
	      }

	    case REACT_SUSPENSE_LIST_TYPE:
	      {
	        pushBuiltInComponentStackInDEV(task, 'SuspenseList'); // TODO: SuspenseList should control the boundaries.

	        renderNodeDestructive(request, task, props.children);
	        popComponentStackInDEV(task);
	        return;
	      }

	    case REACT_SCOPE_TYPE:
	      {

	        throw new Error('ReactDOMServer does not yet support scope components.');
	      }
	    // eslint-disable-next-line-no-fallthrough

	    case REACT_SUSPENSE_TYPE:
	      {
	        {
	          renderSuspenseBoundary(request, task, props);
	        }

	        return;
	      }
	  }

	  if (typeof type === 'object' && type !== null) {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        {
	          renderForwardRef(request, task, type, props, ref);
	          return;
	        }

	      case REACT_MEMO_TYPE:
	        {
	          renderMemo(request, task, type, props, ref);
	          return;
	        }

	      case REACT_PROVIDER_TYPE:
	        {
	          renderContextProvider(request, task, type, props);
	          return;
	        }

	      case REACT_CONTEXT_TYPE:
	        {
	          renderContextConsumer(request, task, type, props);
	          return;
	        }

	      case REACT_LAZY_TYPE:
	        {
	          renderLazyComponent(request, task, type, props);
	          return;
	        }
	    }
	  }

	  var info = '';

	  {
	    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
	    }
	  }

	  throw new Error('Element type is invalid: expected a string (for built-in ' + 'components) or a class/function (for composite components) ' + ("but got: " + (type == null ? type : typeof type) + "." + info));
	}

	function validateIterable(iterable, iteratorFn) {
	  {
	    // We don't support rendering Generators because it's a mutation.
	    // See https://github.com/facebook/react/issues/12995
	    if (typeof Symbol === 'function' && // $FlowFixMe Flow doesn't know about toStringTag
	    iterable[Symbol.toStringTag] === 'Generator') {
	      if (!didWarnAboutGenerators) {
	        error('Using Generators as children is unsupported and will likely yield ' + 'unexpected results because enumerating a generator mutates it. ' + 'You may convert it to an array with `Array.from()` or the ' + '`[...spread]` operator before rendering. Keep in mind ' + 'you might need to polyfill these features for older browsers.');
	      }

	      didWarnAboutGenerators = true;
	    } // Warn about using Maps as children


	    if (iterable.entries === iteratorFn) {
	      if (!didWarnAboutMaps) {
	        error('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
	      }

	      didWarnAboutMaps = true;
	    }
	  }
	} // This function by it self renders a node and consumes the task by mutating it
	// to update the current execution state.


	function renderNodeDestructive(request, task, node) {
	  // Stash the node we're working on. We'll pick up from this task in case
	  // something suspends.
	  task.node = node; // Handle object types

	  if (typeof node === 'object' && node !== null) {
	    switch (node.$$typeof) {
	      case REACT_ELEMENT_TYPE:
	        {
	          var element = node;
	          var type = element.type;
	          var props = element.props;
	          var ref = element.ref;
	          renderElement(request, task, type, props, ref);
	          return;
	        }

	      case REACT_PORTAL_TYPE:
	        throw new Error('Portals are not currently supported by the server renderer. ' + 'Render them conditionally so that they only appear on the client render.');
	      // eslint-disable-next-line-no-fallthrough

	      case REACT_LAZY_TYPE:
	        {
	          {
	            var lazyNode = node;
	            var payload = lazyNode._payload;
	            var init = lazyNode._init;
	            var resolvedNode = init(payload);
	            renderNodeDestructive(request, task, resolvedNode);
	            return;
	          }
	        }
	    }

	    if (isArray(node)) {
	      renderChildrenArray(request, task, node);
	      return;
	    }

	    var iteratorFn = getIteratorFn(node);

	    if (iteratorFn) {
	      {
	        validateIterable(node, iteratorFn);
	      }

	      var iterator = iteratorFn.call(node);

	      if (iterator) {
	        // We need to know how many total children are in this set, so that we
	        // can allocate enough id slots to acommodate them. So we must exhaust
	        // the iterator before we start recursively rendering the children.
	        // TODO: This is not great but I think it's inherent to the id
	        // generation algorithm.
	        var step = iterator.next(); // If there are not entries, we need to push an empty so we start by checking that.

	        if (!step.done) {
	          var children = [];

	          do {
	            children.push(step.value);
	            step = iterator.next();
	          } while (!step.done);

	          renderChildrenArray(request, task, children);
	          return;
	        }

	        return;
	      }
	    }

	    var childString = Object.prototype.toString.call(node);
	    throw new Error("Objects are not valid as a React child (found: " + (childString === '[object Object]' ? 'object with keys {' + Object.keys(node).join(', ') + '}' : childString) + "). " + 'If you meant to render a collection of children, use an array ' + 'instead.');
	  }

	  if (typeof node === 'string') {
	    pushTextInstance(task.blockedSegment.chunks, node, request.responseState);
	    return;
	  }

	  if (typeof node === 'number') {
	    pushTextInstance(task.blockedSegment.chunks, '' + node, request.responseState);
	    return;
	  }

	  {
	    if (typeof node === 'function') {
	      error('Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.');
	    }
	  }
	}

	function renderChildrenArray(request, task, children) {
	  var totalChildren = children.length;

	  for (var i = 0; i < totalChildren; i++) {
	    var prevTreeContext = task.treeContext;
	    task.treeContext = pushTreeContext(prevTreeContext, totalChildren, i);

	    try {
	      // We need to use the non-destructive form so that we can safely pop back
	      // up and render the sibling if something suspends.
	      renderNode(request, task, children[i]);
	    } finally {
	      task.treeContext = prevTreeContext;
	    }
	  }
	}

	function spawnNewSuspendedTask(request, task, x) {
	  // Something suspended, we'll need to create a new segment and resolve it later.
	  var segment = task.blockedSegment;
	  var insertionIndex = segment.chunks.length;
	  var newSegment = createPendingSegment(request, insertionIndex, null, segment.formatContext);
	  segment.children.push(newSegment);
	  var newTask = createTask(request, task.node, task.blockedBoundary, newSegment, task.abortSet, task.legacyContext, task.context, task.treeContext);

	  {
	    if (task.componentStack !== null) {
	      // We pop one task off the stack because the node that suspended will be tried again,
	      // which will add it back onto the stack.
	      newTask.componentStack = task.componentStack.parent;
	    }
	  }

	  var ping = newTask.ping;
	  x.then(ping, ping);
	} // This is a non-destructive form of rendering a node. If it suspends it spawns
	// a new task and restores the context of this task to what it was before.


	function renderNode(request, task, node) {
	  // TODO: Store segment.children.length here and reset it in case something
	  // suspended partially through writing something.
	  // Snapshot the current context in case something throws to interrupt the
	  // process.
	  var previousFormatContext = task.blockedSegment.formatContext;
	  var previousLegacyContext = task.legacyContext;
	  var previousContext = task.context;
	  var previousComponentStack = null;

	  {
	    previousComponentStack = task.componentStack;
	  }

	  try {
	    return renderNodeDestructive(request, task, node);
	  } catch (x) {
	    resetHooksState();

	    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
	      spawnNewSuspendedTask(request, task, x); // Restore the context. We assume that this will be restored by the inner
	      // functions in case nothing throws so we don't use "finally" here.

	      task.blockedSegment.formatContext = previousFormatContext;
	      task.legacyContext = previousLegacyContext;
	      task.context = previousContext; // Restore all active ReactContexts to what they were before.

	      switchContext(previousContext);

	      {
	        task.componentStack = previousComponentStack;
	      }

	      return;
	    } else {
	      // Restore the context. We assume that this will be restored by the inner
	      // functions in case nothing throws so we don't use "finally" here.
	      task.blockedSegment.formatContext = previousFormatContext;
	      task.legacyContext = previousLegacyContext;
	      task.context = previousContext; // Restore all active ReactContexts to what they were before.

	      switchContext(previousContext);

	      {
	        task.componentStack = previousComponentStack;
	      } // We assume that we don't need the correct context.
	      // Let's terminate the rest of the tree and don't render any siblings.


	      throw x;
	    }
	  }
	}

	function erroredTask(request, boundary, segment, error) {
	  // Report the error to a global handler.
	  logRecoverableError(request, error);

	  if (boundary === null) {
	    fatalError(request, error);
	  } else {
	    boundary.pendingTasks--;

	    if (!boundary.forceClientRender) {
	      boundary.forceClientRender = true; // Regardless of what happens next, this boundary won't be displayed,
	      // so we can flush it, if the parent already flushed.

	      if (boundary.parentFlushed) {
	        // We don't have a preference where in the queue this goes since it's likely
	        // to error on the client anyway. However, intentionally client-rendered
	        // boundaries should be flushed earlier so that they can start on the client.
	        // We reuse the same queue for errors.
	        request.clientRenderedBoundaries.push(boundary);
	      }
	    }
	  }

	  request.allPendingTasks--;

	  if (request.allPendingTasks === 0) {
	    var onAllReady = request.onAllReady;
	    onAllReady();
	  }
	}

	function abortTaskSoft(task) {
	  // This aborts task without aborting the parent boundary that it blocks.
	  // It's used for when we didn't need this task to complete the tree.
	  // If task was needed, then it should use abortTask instead.
	  var request = this;
	  var boundary = task.blockedBoundary;
	  var segment = task.blockedSegment;
	  segment.status = ABORTED;
	  finishedTask(request, boundary, segment);
	}

	function abortTask(task) {
	  // This aborts the task and aborts the parent that it blocks, putting it into
	  // client rendered mode.
	  var request = this;
	  var boundary = task.blockedBoundary;
	  var segment = task.blockedSegment;
	  segment.status = ABORTED;

	  if (boundary === null) {
	    request.allPendingTasks--; // We didn't complete the root so we have nothing to show. We can close
	    // the request;

	    if (request.status !== CLOSED) {
	      request.status = CLOSED;

	      if (request.destination !== null) {
	        close(request.destination);
	      }
	    }
	  } else {
	    boundary.pendingTasks--;

	    if (!boundary.forceClientRender) {
	      boundary.forceClientRender = true;

	      if (boundary.parentFlushed) {
	        request.clientRenderedBoundaries.push(boundary);
	      }
	    } // If this boundary was still pending then we haven't already cancelled its fallbacks.
	    // We'll need to abort the fallbacks, which will also error that parent boundary.


	    boundary.fallbackAbortableTasks.forEach(abortTask, request);
	    boundary.fallbackAbortableTasks.clear();
	    request.allPendingTasks--;

	    if (request.allPendingTasks === 0) {
	      var onAllReady = request.onAllReady;
	      onAllReady();
	    }
	  }
	}

	function queueCompletedSegment(boundary, segment) {
	  if (segment.chunks.length === 0 && segment.children.length === 1 && segment.children[0].boundary === null) {
	    // This is an empty segment. There's nothing to write, so we can instead transfer the ID
	    // to the child. That way any existing references point to the child.
	    var childSegment = segment.children[0];
	    childSegment.id = segment.id;
	    childSegment.parentFlushed = true;

	    if (childSegment.status === COMPLETED) {
	      queueCompletedSegment(boundary, childSegment);
	    }
	  } else {
	    var completedSegments = boundary.completedSegments;
	    completedSegments.push(segment);
	  }
	}

	function finishedTask(request, boundary, segment) {
	  if (boundary === null) {
	    if (segment.parentFlushed) {
	      if (request.completedRootSegment !== null) {
	        throw new Error('There can only be one root segment. This is a bug in React.');
	      }

	      request.completedRootSegment = segment;
	    }

	    request.pendingRootTasks--;

	    if (request.pendingRootTasks === 0) {
	      // We have completed the shell so the shell can't error anymore.
	      request.onShellError = noop$1;
	      var onShellReady = request.onShellReady;
	      onShellReady();
	    }
	  } else {
	    boundary.pendingTasks--;

	    if (boundary.forceClientRender) ; else if (boundary.pendingTasks === 0) {
	      // This must have been the last segment we were waiting on. This boundary is now complete.
	      if (segment.parentFlushed) {
	        // Our parent segment already flushed, so we need to schedule this segment to be emitted.
	        // If it is a segment that was aborted, we'll write other content instead so we don't need
	        // to emit it.
	        if (segment.status === COMPLETED) {
	          queueCompletedSegment(boundary, segment);
	        }
	      }

	      if (boundary.parentFlushed) {
	        // The segment might be part of a segment that didn't flush yet, but if the boundary's
	        // parent flushed, we need to schedule the boundary to be emitted.
	        request.completedBoundaries.push(boundary);
	      } // We can now cancel any pending task on the fallback since we won't need to show it anymore.
	      // This needs to happen after we read the parentFlushed flags because aborting can finish
	      // work which can trigger user code, which can start flushing, which can change those flags.


	      boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request);
	      boundary.fallbackAbortableTasks.clear();
	    } else {
	      if (segment.parentFlushed) {
	        // Our parent already flushed, so we need to schedule this segment to be emitted.
	        // If it is a segment that was aborted, we'll write other content instead so we don't need
	        // to emit it.
	        if (segment.status === COMPLETED) {
	          queueCompletedSegment(boundary, segment);
	          var completedSegments = boundary.completedSegments;

	          if (completedSegments.length === 1) {
	            // This is the first time since we last flushed that we completed anything.
	            // We can schedule this boundary to emit its partially completed segments early
	            // in case the parent has already been flushed.
	            if (boundary.parentFlushed) {
	              request.partialBoundaries.push(boundary);
	            }
	          }
	        }
	      }
	    }
	  }

	  request.allPendingTasks--;

	  if (request.allPendingTasks === 0) {
	    // This needs to be called at the very end so that we can synchronously write the result
	    // in the callback if needed.
	    var onAllReady = request.onAllReady;
	    onAllReady();
	  }
	}

	function retryTask(request, task) {
	  var segment = task.blockedSegment;

	  if (segment.status !== PENDING) {
	    // We completed this by other means before we had a chance to retry it.
	    return;
	  } // We restore the context to what it was when we suspended.
	  // We don't restore it after we leave because it's likely that we'll end up
	  // needing a very similar context soon again.


	  switchContext(task.context);
	  var prevTaskInDEV = null;

	  {
	    prevTaskInDEV = currentTaskInDEV;
	    currentTaskInDEV = task;
	  }

	  try {
	    // We call the destructive form that mutates this task. That way if something
	    // suspends again, we can reuse the same task instead of spawning a new one.
	    renderNodeDestructive(request, task, task.node);
	    task.abortSet.delete(task);
	    segment.status = COMPLETED;
	    finishedTask(request, task.blockedBoundary, segment);
	  } catch (x) {
	    resetHooksState();

	    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
	      // Something suspended again, let's pick it back up later.
	      var ping = task.ping;
	      x.then(ping, ping);
	    } else {
	      task.abortSet.delete(task);
	      segment.status = ERRORED;
	      erroredTask(request, task.blockedBoundary, segment, x);
	    }
	  } finally {
	    {
	      currentTaskInDEV = prevTaskInDEV;
	    }
	  }
	}

	function performWork(request) {
	  if (request.status === CLOSED) {
	    return;
	  }

	  var prevContext = getActiveContext();
	  var prevDispatcher = ReactCurrentDispatcher$1.current;
	  ReactCurrentDispatcher$1.current = Dispatcher;
	  var prevGetCurrentStackImpl;

	  {
	    prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
	    ReactDebugCurrentFrame$1.getCurrentStack = getCurrentStackInDEV;
	  }

	  var prevResponseState = currentResponseState;
	  setCurrentResponseState(request.responseState);

	  try {
	    var pingedTasks = request.pingedTasks;
	    var i;

	    for (i = 0; i < pingedTasks.length; i++) {
	      var task = pingedTasks[i];
	      retryTask(request, task);
	    }

	    pingedTasks.splice(0, i);

	    if (request.destination !== null) {
	      flushCompletedQueues(request, request.destination);
	    }
	  } catch (error) {
	    logRecoverableError(request, error);
	    fatalError(request, error);
	  } finally {
	    setCurrentResponseState(prevResponseState);
	    ReactCurrentDispatcher$1.current = prevDispatcher;

	    {
	      ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
	    }

	    if (prevDispatcher === Dispatcher) {
	      // This means that we were in a reentrant work loop. This could happen
	      // in a renderer that supports synchronous work like renderToString,
	      // when it's called from within another renderer.
	      // Normally we don't bother switching the contexts to their root/default
	      // values when leaving because we'll likely need the same or similar
	      // context again. However, when we're inside a synchronous loop like this
	      // we'll to restore the context to what it was before returning.
	      switchContext(prevContext);
	    }
	  }
	}

	function flushSubtree(request, destination, segment) {
	  segment.parentFlushed = true;

	  switch (segment.status) {
	    case PENDING:
	      {
	        // We're emitting a placeholder for this segment to be filled in later.
	        // Therefore we'll need to assign it an ID - to refer to it by.
	        var segmentID = segment.id = request.nextSegmentId++;
	        return writePlaceholder(destination, request.responseState, segmentID);
	      }

	    case COMPLETED:
	      {
	        segment.status = FLUSHED;
	        var r = true;
	        var chunks = segment.chunks;
	        var chunkIdx = 0;
	        var children = segment.children;

	        for (var childIdx = 0; childIdx < children.length; childIdx++) {
	          var nextChild = children[childIdx]; // Write all the chunks up until the next child.

	          for (; chunkIdx < nextChild.index; chunkIdx++) {
	            writeChunk(destination, chunks[chunkIdx]);
	          }

	          r = flushSegment(request, destination, nextChild);
	        } // Finally just write all the remaining chunks


	        for (; chunkIdx < chunks.length - 1; chunkIdx++) {
	          writeChunk(destination, chunks[chunkIdx]);
	        }

	        if (chunkIdx < chunks.length) {
	          r = writeChunkAndReturn(destination, chunks[chunkIdx]);
	        }

	        return r;
	      }

	    default:
	      {
	        throw new Error('Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.');
	      }
	  }
	}

	function flushSegment(request, destination, segment) {
	  var boundary = segment.boundary;

	  if (boundary === null) {
	    // Not a suspense boundary.
	    return flushSubtree(request, destination, segment);
	  }

	  boundary.parentFlushed = true; // This segment is a Suspense boundary. We need to decide whether to
	  // emit the content or the fallback now.

	  if (boundary.forceClientRender) {
	    // Emit a client rendered suspense boundary wrapper.
	    // We never queue the inner boundary so we'll never emit its content or partial segments.
	    writeStartClientRenderedSuspenseBoundary(destination, request.responseState); // Flush the fallback.

	    flushSubtree(request, destination, segment);
	    return writeEndClientRenderedSuspenseBoundary(destination, request.responseState);
	  } else if (boundary.pendingTasks > 0) {
	    // This boundary is still loading. Emit a pending suspense boundary wrapper.
	    // Assign an ID to refer to the future content by.
	    boundary.rootSegmentID = request.nextSegmentId++;

	    if (boundary.completedSegments.length > 0) {
	      // If this is at least partially complete, we can queue it to be partially emitted early.
	      request.partialBoundaries.push(boundary);
	    } /// This is the first time we should have referenced this ID.


	    var id = boundary.id = assignSuspenseBoundaryID(request.responseState);
	    writeStartPendingSuspenseBoundary(destination, request.responseState, id); // Flush the fallback.

	    flushSubtree(request, destination, segment);
	    return writeEndPendingSuspenseBoundary(destination, request.responseState);
	  } else if (boundary.byteSize > request.progressiveChunkSize) {
	    // This boundary is large and will be emitted separately so that we can progressively show
	    // other content. We add it to the queue during the flush because we have to ensure that
	    // the parent flushes first so that there's something to inject it into.
	    // We also have to make sure that it's emitted into the queue in a deterministic slot.
	    // I.e. we can't insert it here when it completes.
	    // Assign an ID to refer to the future content by.
	    boundary.rootSegmentID = request.nextSegmentId++;
	    request.completedBoundaries.push(boundary); // Emit a pending rendered suspense boundary wrapper.

	    writeStartPendingSuspenseBoundary(destination, request.responseState, boundary.id); // Flush the fallback.

	    flushSubtree(request, destination, segment);
	    return writeEndPendingSuspenseBoundary(destination, request.responseState);
	  } else {
	    // We can inline this boundary's content as a complete boundary.
	    writeStartCompletedSuspenseBoundary(destination, request.responseState);
	    var completedSegments = boundary.completedSegments;

	    if (completedSegments.length !== 1) {
	      throw new Error('A previously unvisited boundary must have exactly one root segment. This is a bug in React.');
	    }

	    var contentSegment = completedSegments[0];
	    flushSegment(request, destination, contentSegment);
	    return writeEndCompletedSuspenseBoundary(destination, request.responseState);
	  }
	}

	function flushClientRenderedBoundary(request, destination, boundary) {
	  return writeClientRenderBoundaryInstruction(destination, request.responseState, boundary.id);
	}

	function flushSegmentContainer(request, destination, segment) {
	  writeStartSegment(destination, request.responseState, segment.formatContext, segment.id);
	  flushSegment(request, destination, segment);
	  return writeEndSegment(destination, segment.formatContext);
	}

	function flushCompletedBoundary(request, destination, boundary) {
	  var completedSegments = boundary.completedSegments;
	  var i = 0;

	  for (; i < completedSegments.length; i++) {
	    var segment = completedSegments[i];
	    flushPartiallyCompletedSegment(request, destination, boundary, segment);
	  }

	  completedSegments.length = 0;
	  return writeCompletedBoundaryInstruction(destination, request.responseState, boundary.id, boundary.rootSegmentID);
	}

	function flushPartialBoundary(request, destination, boundary) {
	  var completedSegments = boundary.completedSegments;
	  var i = 0;

	  for (; i < completedSegments.length; i++) {
	    var segment = completedSegments[i];

	    if (!flushPartiallyCompletedSegment(request, destination, boundary, segment)) {
	      i++;
	      completedSegments.splice(0, i); // Only write as much as the buffer wants. Something higher priority
	      // might want to write later.

	      return false;
	    }
	  }

	  completedSegments.splice(0, i);
	  return true;
	}

	function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
	  if (segment.status === FLUSHED) {
	    // We've already flushed this inline.
	    return true;
	  }

	  var segmentID = segment.id;

	  if (segmentID === -1) {
	    // This segment wasn't previously referred to. This happens at the root of
	    // a boundary. We make kind of a leap here and assume this is the root.
	    var rootSegmentID = segment.id = boundary.rootSegmentID;

	    if (rootSegmentID === -1) {
	      throw new Error('A root segment ID must have been assigned by now. This is a bug in React.');
	    }

	    return flushSegmentContainer(request, destination, segment);
	  } else {
	    flushSegmentContainer(request, destination, segment);
	    return writeCompletedSegmentInstruction(destination, request.responseState, segmentID);
	  }
	}

	function flushCompletedQueues(request, destination) {
	  beginWriting();

	  try {
	    // The structure of this is to go through each queue one by one and write
	    // until the sink tells us to stop. When we should stop, we still finish writing
	    // that item fully and then yield. At that point we remove the already completed
	    // items up until the point we completed them.
	    // TODO: Emit preloading.
	    // TODO: It's kind of unfortunate to keep checking this array after we've already
	    // emitted the root.
	    var completedRootSegment = request.completedRootSegment;

	    if (completedRootSegment !== null && request.pendingRootTasks === 0) {
	      flushSegment(request, destination, completedRootSegment);
	      request.completedRootSegment = null;
	      writeCompletedRoot(destination, request.responseState);
	    } // We emit client rendering instructions for already emitted boundaries first.
	    // This is so that we can signal to the client to start client rendering them as
	    // soon as possible.


	    var clientRenderedBoundaries = request.clientRenderedBoundaries;
	    var i;

	    for (i = 0; i < clientRenderedBoundaries.length; i++) {
	      var boundary = clientRenderedBoundaries[i];

	      if (!flushClientRenderedBoundary(request, destination, boundary)) {
	        request.destination = null;
	        i++;
	        clientRenderedBoundaries.splice(0, i);
	        return;
	      }
	    }

	    clientRenderedBoundaries.splice(0, i); // Next we emit any complete boundaries. It's better to favor boundaries
	    // that are completely done since we can actually show them, than it is to emit
	    // any individual segments from a partially complete boundary.

	    var completedBoundaries = request.completedBoundaries;

	    for (i = 0; i < completedBoundaries.length; i++) {
	      var _boundary = completedBoundaries[i];

	      if (!flushCompletedBoundary(request, destination, _boundary)) {
	        request.destination = null;
	        i++;
	        completedBoundaries.splice(0, i);
	        return;
	      }
	    }

	    completedBoundaries.splice(0, i); // Allow anything written so far to flush to the underlying sink before
	    // we continue with lower priorities.

	    completeWriting(destination);
	    beginWriting(destination); // TODO: Here we'll emit data used by hydration.
	    // Next we emit any segments of any boundaries that are partially complete
	    // but not deeply complete.

	    var partialBoundaries = request.partialBoundaries;

	    for (i = 0; i < partialBoundaries.length; i++) {
	      var _boundary2 = partialBoundaries[i];

	      if (!flushPartialBoundary(request, destination, _boundary2)) {
	        request.destination = null;
	        i++;
	        partialBoundaries.splice(0, i);
	        return;
	      }
	    }

	    partialBoundaries.splice(0, i); // Next we check the completed boundaries again. This may have had
	    // boundaries added to it in case they were too larged to be inlined.
	    // New ones might be added in this loop.

	    var largeBoundaries = request.completedBoundaries;

	    for (i = 0; i < largeBoundaries.length; i++) {
	      var _boundary3 = largeBoundaries[i];

	      if (!flushCompletedBoundary(request, destination, _boundary3)) {
	        request.destination = null;
	        i++;
	        largeBoundaries.splice(0, i);
	        return;
	      }
	    }

	    largeBoundaries.splice(0, i);
	  } finally {
	    completeWriting(destination);

	    if (request.allPendingTasks === 0 && request.pingedTasks.length === 0 && request.clientRenderedBoundaries.length === 0 && request.completedBoundaries.length === 0 // We don't need to check any partially completed segments because
	    // either they have pending task or they're complete.
	    ) {
	        {
	          if (request.abortableTasks.size !== 0) {
	            error('There was still abortable task at the root when we closed. This is a bug in React.');
	          }
	        } // We're done.


	        close(destination);
	      }
	  }
	}

	function startWork(request) {
	  scheduleWork(function () {
	    return performWork(request);
	  });
	}
	function startFlowing(request, destination) {
	  if (request.status === CLOSING) {
	    request.status = CLOSED;
	    closeWithError(destination, request.fatalError);
	    return;
	  }

	  if (request.status === CLOSED) {
	    return;
	  }

	  if (request.destination !== null) {
	    // We're already flowing.
	    return;
	  }

	  request.destination = destination;

	  try {
	    flushCompletedQueues(request, destination);
	  } catch (error) {
	    logRecoverableError(request, error);
	    fatalError(request, error);
	  }
	} // This is called to early terminate a request. It puts all pending boundaries in client rendered state.

	function abort(request) {
	  try {
	    var abortableTasks = request.abortableTasks;
	    abortableTasks.forEach(abortTask, request);
	    abortableTasks.clear();

	    if (request.destination !== null) {
	      flushCompletedQueues(request, request.destination);
	    }
	  } catch (error) {
	    logRecoverableError(request, error);
	    fatalError(request, error);
	  }
	}

	function renderToReadableStream(children, options) {
	  return new Promise(function (resolve, reject) {
	    var onFatalError;
	    var onAllReady;
	    var allReady = new Promise(function (res, rej) {
	      onAllReady = res;
	      onFatalError = rej;
	    });

	    function onShellReady() {
	      var stream = new ReadableStream({
	        type: 'bytes',
	        pull: function (controller) {
	          startFlowing(request, controller);
	        },
	        cancel: function (reason) {
	          abort(request);
	        }
	      }); // TODO: Move to sub-classing ReadableStream.

	      stream.allReady = allReady;
	      resolve(stream);
	    }

	    function onShellError(error) {
	      // If the shell errors the caller of `renderToReadableStream` won't have access to `allReady`.
	      // However, `allReady` will be rejected by `onFatalError` as well.
	      // So we need to catch the duplicate, uncatchable fatal error in `allReady` to prevent a `UnhandledPromiseRejection`.
	      allReady.catch(function () {});
	      reject(error);
	    }

	    var request = createRequest(children, createResponseState(options ? options.identifierPrefix : undefined, options ? options.nonce : undefined, options ? options.bootstrapScriptContent : undefined, options ? options.bootstrapScripts : undefined, options ? options.bootstrapModules : undefined), createRootFormatContext(options ? options.namespaceURI : undefined), options ? options.progressiveChunkSize : undefined, options ? options.onError : undefined, onAllReady, onShellReady, onShellError, onFatalError);

	    if (options && options.signal) {
	      var signal = options.signal;

	      var listener = function () {
	        abort(request);
	        signal.removeEventListener('abort', listener);
	      };

	      signal.addEventListener('abort', listener);
	    }

	    startWork(request);
	  });
	}

	exports.renderToReadableStream = renderToReadableStream;
	exports.version = ReactVersion;
	  })();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ]);