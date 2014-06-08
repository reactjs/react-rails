CJSXTransformer = {};
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/transformer').transform;

},{"./lib/transformer":9}],2:[function(require,module,exports){
// from esprima-fb/esprima.js

var XHTMLEntities = {
  quot: '\u0022',
  amp: '&',
  apos: "\u0027",
  lt: "<",
  gt: ">",
  nbsp: "\u00A0",
  iexcl: "\u00A1",
  cent: "\u00A2",
  pound: "\u00A3",
  curren: "\u00A4",
  yen: "\u00A5",
  brvbar: "\u00A6",
  sect: "\u00A7",
  uml: "\u00A8",
  copy: "\u00A9",
  ordf: "\u00AA",
  laquo: "\u00AB",
  not: "\u00AC",
  shy: "\u00AD",
  reg: "\u00AE",
  macr: "\u00AF",
  deg: "\u00B0",
  plusmn: "\u00B1",
  sup2: "\u00B2",
  sup3: "\u00B3",
  acute: "\u00B4",
  micro: "\u00B5",
  para: "\u00B6",
  middot: "\u00B7",
  cedil: "\u00B8",
  sup1: "\u00B9",
  ordm: "\u00BA",
  raquo: "\u00BB",
  frac14: "\u00BC",
  frac12: "\u00BD",
  frac34: "\u00BE",
  iquest: "\u00BF",
  Agrave: "\u00C0",
  Aacute: "\u00C1",
  Acirc: "\u00C2",
  Atilde: "\u00C3",
  Auml: "\u00C4",
  Aring: "\u00C5",
  AElig: "\u00C6",
  Ccedil: "\u00C7",
  Egrave: "\u00C8",
  Eacute: "\u00C9",
  Ecirc: "\u00CA",
  Euml: "\u00CB",
  Igrave: "\u00CC",
  Iacute: "\u00CD",
  Icirc: "\u00CE",
  Iuml: "\u00CF",
  ETH: "\u00D0",
  Ntilde: "\u00D1",
  Ograve: "\u00D2",
  Oacute: "\u00D3",
  Ocirc: "\u00D4",
  Otilde: "\u00D5",
  Ouml: "\u00D6",
  times: "\u00D7",
  Oslash: "\u00D8",
  Ugrave: "\u00D9",
  Uacute: "\u00DA",
  Ucirc: "\u00DB",
  Uuml: "\u00DC",
  Yacute: "\u00DD",
  THORN: "\u00DE",
  szlig: "\u00DF",
  agrave: "\u00E0",
  aacute: "\u00E1",
  acirc: "\u00E2",
  atilde: "\u00E3",
  auml: "\u00E4",
  aring: "\u00E5",
  aelig: "\u00E6",
  ccedil: "\u00E7",
  egrave: "\u00E8",
  eacute: "\u00E9",
  ecirc: "\u00EA",
  euml: "\u00EB",
  igrave: "\u00EC",
  iacute: "\u00ED",
  icirc: "\u00EE",
  iuml: "\u00EF",
  eth: "\u00F0",
  ntilde: "\u00F1",
  ograve: "\u00F2",
  oacute: "\u00F3",
  ocirc: "\u00F4",
  otilde: "\u00F5",
  ouml: "\u00F6",
  divide: "\u00F7",
  oslash: "\u00F8",
  ugrave: "\u00F9",
  uacute: "\u00FA",
  ucirc: "\u00FB",
  uuml: "\u00FC",
  yacute: "\u00FD",
  thorn: "\u00FE",
  yuml: "\u00FF",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  fnof: "\u0192",
  circ: "\u02C6",
  tilde: "\u02DC",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  bull: "\u2022",
  hellip: "\u2026",
  permil: "\u2030",
  prime: "\u2032",
  Prime: "\u2033",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  oline: "\u203E",
  frasl: "\u2044",
  euro: "\u20AC",
  image: "\u2111",
  weierp: "\u2118",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  "int": "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666"
};

module.exports = function decode(str) {
  return str
    .replace(/&#(\d+);?/g, function (_, code) {
      return String.fromCharCode(parseInt(code, 10));
    })
    .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    })
    .replace(/&([^;\W]+;?)/g, function (m, e) {
      var ee = e.replace(/;$/, '');
      var entity = XHTMLEntities[e]
        || (e.match(/;$/) && XHTMLEntities[ee])
      ;

      if (entity) {
        return entity;
      }
      else {
        return m;
      }
    })
}

},{}],3:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
var extend, flatten, last, repeat, syntaxErrorToString, _ref;

exports.starts = function(string, literal, start) {
  return literal === string.substr(start, literal.length);
};

exports.ends = function(string, literal, back) {
  var len;
  len = literal.length;
  return literal === string.substr(string.length - len - (back || 0), len);
};

exports.repeat = repeat = function(str, n) {
  var res;
  res = '';
  while (n > 0) {
    if (n & 1) {
      res += str;
    }
    n >>>= 1;
    str += str;
  }
  return res;
};

exports.compact = function(array) {
  var item, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = array.length; _i < _len; _i++) {
    item = array[_i];
    if (item) {
      _results.push(item);
    }
  }
  return _results;
};

exports.count = function(string, substr) {
  var num, pos;
  num = pos = 0;
  if (!substr.length) {
    return 1 / 0;
  }
  while (pos = 1 + string.indexOf(substr, pos)) {
    num++;
  }
  return num;
};

exports.merge = function(options, overrides) {
  return extend(extend({}, options), overrides);
};

extend = exports.extend = function(object, properties) {
  var key, val;
  for (key in properties) {
    val = properties[key];
    object[key] = val;
  }
  return object;
};

exports.flatten = flatten = function(array) {
  var element, flattened, _i, _len;
  flattened = [];
  for (_i = 0, _len = array.length; _i < _len; _i++) {
    element = array[_i];
    if (element instanceof Array) {
      flattened = flattened.concat(flatten(element));
    } else {
      flattened.push(element);
    }
  }
  return flattened;
};

exports.del = function(obj, key) {
  var val;
  val = obj[key];
  delete obj[key];
  return val;
};

exports.last = last = function(array, back) {
  return array[array.length - (back || 0) - 1];
};

exports.some = (_ref = Array.prototype.some) != null ? _ref : function(fn) {
  var e, _i, _len;
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    e = this[_i];
    if (fn(e)) {
      return true;
    }
  }
  return false;
};

exports.throwSyntaxError = function(message, location) {
  var error;
  error = new SyntaxError(message);
  error.location = location;
  error.toString = syntaxErrorToString;
  error.stack = error.toString();
  throw error;
};

exports.updateSyntaxError = function(error, code, filename) {
  if (error.toString === syntaxErrorToString) {
    error.code || (error.code = code);
    error.filename || (error.filename = filename);
    error.stack = error.toString();
  }
  return error;
};

syntaxErrorToString = function() {
  var codeLine, colorize, colorsEnabled, end, filename, first_column, first_line, last_column, last_line, marker, start, _ref1, _ref2;
  if (!(this.code && this.location)) {
    return Error.prototype.toString.call(this);
  }
  _ref1 = this.location, first_line = _ref1.first_line, first_column = _ref1.first_column, last_line = _ref1.last_line, last_column = _ref1.last_column;
  if (last_line == null) {
    last_line = first_line;
  }
  if (last_column == null) {
    last_column = first_column;
  }
  filename = this.filename || '[stdin]';
  codeLine = this.code.split('\n')[first_line];
  start = first_column;
  end = first_line === last_line ? last_column + 1 : codeLine.length;
  marker = repeat(' ', start) + repeat('^', end - start);
  if (typeof process !== "undefined" && process !== null) {
    colorsEnabled = process.stdout.isTTY && !process.env.NODE_DISABLE_COLORS;
  }
  if ((_ref2 = this.colorful) != null ? _ref2 : colorsEnabled) {
    colorize = function(str) {
      return "\x1B[1;31m" + str + "\x1B[0m";
    };
    codeLine = codeLine.slice(0, start) + colorize(codeLine.slice(start, end)) + codeLine.slice(end);
    marker = colorize(marker);
  }
  return "" + filename + ":" + (first_line + 1) + ":" + (first_column + 1) + ": error: " + this.message + "\n" + codeLine + "\n" + marker;
};

exports.nameWhitespaceCharacter = function(string) {
  switch (string) {
    case ' ':
      return 'space';
    case '\n':
      return 'newline';
    case '\r':
      return 'carriage return';
    case '\t':
      return 'tab';
    default:
      return string;
  }
};

}).call(this,require("0NpzKc"))
},{"0NpzKc":10}],4:[function(require,module,exports){
// from react-tools/vendor/fbtransform/transforms/xjs.js

module.exports = {
  a: true,
  abbr: true,
  address: true,
  applet: true,
  area: true,
  article: true,
  aside: true,
  audio: true,
  b: true,
  base: true,
  bdi: true,
  bdo: true,
  big: true,
  blockquote: true,
  body: true,
  br: true,
  button: true,
  canvas: true,
  caption: true,
  circle: true,
  cite: true,
  code: true,
  col: true,
  colgroup: true,
  command: true,
  data: true,
  datalist: true,
  dd: true,
  defs: true,
  del: true,
  details: true,
  dfn: true,
  dialog: true,
  div: true,
  dl: true,
  dt: true,
  ellipse: true,
  em: true,
  embed: true,
  fieldset: true,
  figcaption: true,
  figure: true,
  footer: true,
  form: true,
  g: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  head: true,
  header: true,
  hgroup: true,
  hr: true,
  html: true,
  i: true,
  iframe: true,
  img: true,
  input: true,
  ins: true,
  kbd: true,
  keygen: true,
  label: true,
  legend: true,
  li: true,
  line: true,
  linearGradient: true,
  link: true,
  main: true,
  map: true,
  mark: true,
  marquee: true,
  menu: true,
  menuitem: true,
  meta: true,
  meter: true,
  nav: true,
  noscript: true,
  object: true,
  ol: true,
  optgroup: true,
  option: true,
  output: true,
  p: true,
  param: true,
  path: true,
  polygon: true,
  polyline: true,
  pre: true,
  progress: true,
  q: true,
  radialGradient: true,
  rect: true,
  rp: true,
  rt: true,
  ruby: true,
  s: true,
  samp: true,
  script: true,
  section: true,
  select: true,
  small: true,
  source: true,
  span: true,
  stop: true,
  strong: true,
  style: true,
  sub: true,
  summary: true,
  sup: true,
  svg: true,
  table: true,
  tbody: true,
  td: true,
  text: true,
  textarea: true,
  tfoot: true,
  th: true,
  thead: true,
  time: true,
  title: true,
  tr: true,
  track: true,
  u: true,
  ul: true,
  'var': true,
  video: true,
  wbr: true
};
},{}],5:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
var $, BOM, CLOSING_TAG, COMMENT, HEREDOC, HEREGEX, JSTOKEN, OPENING_TAG, PRAGMA, Parser, REGEX, SIMPLESTR, TAG_ATTRIBUTES, TRAILING_SPACES, WHITESPACE, compact, count, last, parseTreeBranchNode, parseTreeLeafNode, repeat, starts, throwSyntaxError, _ref;

_ref = require('./helpers'), count = _ref.count, starts = _ref.starts, compact = _ref.compact, last = _ref.last, repeat = _ref.repeat, throwSyntaxError = _ref.throwSyntaxError;

$ = require('./symbols');

parseTreeLeafNode = function(type, value) {
  if (value == null) {
    value = null;
  }
  return {
    type: type,
    value: value
  };
};

parseTreeBranchNode = function(type, value, children) {
  if (value == null) {
    value = null;
  }
  if (children == null) {
    children = [];
  }
  return {
    type: type,
    value: value,
    children: children
  };
};

module.exports = Parser = (function() {
  function Parser() {}

  Parser.prototype.parse = function(code, opts) {
    var consumed, i, message, _ref1, _ref2;
    this.opts = opts != null ? opts : {};
    this.parseTree = parseTreeBranchNode(this.opts.root || $.ROOT);
    this.activeStates = [this.parseTree];
    this.chunkLine = 0;
    this.chunkColumn = 0;
    this.cjsxPragmaChecked = false;
    code = this.clean(code);
    i = 0;
    while ((this.chunk = code.slice(i))) {
      if (this.activeStates.length === 0) {
        break;
      }
      consumed = ((_ref1 = this.currentState()) !== $.CJSX_EL && _ref1 !== $.CJSX_ATTRIBUTES ? this.csComment() || this.csHeredoc() || this.csString() || this.csRegex() || this.jsEscaped() : void 0) || this.cjsxStart() || this.cjsxAttribute() || this.cjsxEscape() || this.cjsxUnescape() || this.cjsxEnd() || this.cjsxText() || this.coffeescriptCode();
      _ref2 = this.getLineAndColumnFromChunk(consumed), this.chunkLine = _ref2[0], this.chunkColumn = _ref2[1];
      i += consumed;
    }
    if ((this.activeBranchNode() != null) && this.activeBranchNode() !== this.parseTree) {
      message = "Unexpected end of input: unclosed " + (this.currentState());
      throwSyntaxError(message, {
        first_line: this.chunkLine,
        first_column: this.chunkColumn
      });
    }
    this.remainder = code.slice(i);
    if (!this.opts.recursive) {
      if (this.remainder.length) {
        throwSyntaxError("Unexpected return from root state", {
          first_line: this.chunkLine,
          first_column: this.chunkColumn
        });
      }
    }
    return this.parseTree;
  };

  Parser.prototype.csComment = function() {
    var comment, here, match, pragmaMatch, prefix;
    if (!(match = this.chunk.match(COMMENT))) {
      return 0;
    }
    comment = match[0], here = match[1];
    if (!this.cjsxPragmaChecked) {
      this.cjsxPragmaChecked = true;
      if (pragmaMatch = comment.match(PRAGMA)) {
        if (pragmaMatch && pragmaMatch[1] && pragmaMatch[1].length) {
          prefix = pragmaMatch[1];
        } else {
          prefix = 'React.DOM';
        }
        this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CJSX_PRAGMA, prefix));
        return comment.length;
      }
    }
    this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CS_COMMENT, comment));
    return comment.length;
  };

  Parser.prototype.csHeredoc = function() {
    var heredoc, match;
    if (!(match = HEREDOC.exec(this.chunk))) {
      return 0;
    }
    heredoc = match[0];
    this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CS_HEREDOC, heredoc));
    return heredoc.length;
  };

  Parser.prototype.csString = function() {
    var quote, string;
    switch (quote = this.chunk.charAt(0)) {
      case "'":
        string = SIMPLESTR.exec(this.chunk)[0];
        break;
      case '"':
        string = this.balancedString(this.chunk, '"');
    }
    if (!string) {
      return 0;
    }
    this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CS_STRING, string));
    return string.length;
  };

  Parser.prototype.csRegex = function() {
    var flags, length, match, regex, _ref1;
    if (this.chunk.charAt(0) !== '/') {
      return 0;
    }
    if (length = this.csHeregex()) {
      return length;
    }
    if (!(match = REGEX.exec(this.chunk))) {
      return 0;
    }
    _ref1 = match, match = _ref1[0], regex = _ref1[1], flags = _ref1[2];
    if (regex.indexOf("\n") > -1) {
      return 0;
    }
    if (regex === '//') {
      return 0;
    }
    this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CS_REGEX, match));
    return match.length;
  };

  Parser.prototype.csHeregex = function() {
    var body, flags, heregex, match;
    if (!(match = HEREGEX.exec(this.chunk))) {
      return 0;
    }
    heregex = match[0], body = match[1], flags = match[2];
    this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CS_HEREGEX, heregex));
    return heregex.length;
  };

  Parser.prototype.jsEscaped = function() {
    var match, script;
    if (!(this.chunk.charAt(0) === '`' && (match = JSTOKEN.exec(this.chunk)))) {
      return 0;
    }
    script = match[0];
    this.addLeafNodeToActiveBranch(parseTreeLeafNode($.JS_ESC, script));
    return script.length;
  };

  Parser.prototype.cjsxStart = function() {
    var attributesText, input, match, selfClosing, tagName;
    if (!(match = OPENING_TAG.exec(this.chunk))) {
      return 0;
    }
    input = match[0], tagName = match[1], attributesText = match[2], selfClosing = match[3];
    if (!(selfClosing || this.chunk.indexOf("</" + tagName + ">", input.length) > -1)) {
      return 0;
    }
    this.pushActiveBranchNode(parseTreeBranchNode($.CJSX_EL, tagName));
    this.pushActiveBranchNode(parseTreeBranchNode($.CJSX_ATTRIBUTES));
    return 1 + tagName.length;
  };

  Parser.prototype.cjsxAttribute = function() {
    var attrName, bareVal, cjsxEscVal, doubleQuotedVal, input, match, singleQuotedVal, whitespace;
    if (this.currentState() !== $.CJSX_ATTRIBUTES) {
      return 0;
    }
    if (this.chunk.charAt(0) === '/') {
      if (this.chunk.charAt(1) === '>') {
        this.popActiveBranchNode();
        this.popActiveBranchNode();
        return 2;
      } else {
        throwSyntaxError("/ without immediately following > in CJSX tag " + (this.peekActiveState(2).value), {
          first_line: this.chunkLine,
          first_column: this.chunkColumn
        });
      }
    }
    if (this.chunk.charAt(0) === '>') {
      this.popActiveBranchNode();
      return 1;
    }
    if (!(match = TAG_ATTRIBUTES.exec(this.chunk))) {
      return 0;
    }
    input = match[0], attrName = match[1], doubleQuotedVal = match[2], singleQuotedVal = match[3], cjsxEscVal = match[4], bareVal = match[5], whitespace = match[6];
    if (attrName) {
      if (doubleQuotedVal) {
        this.addLeafNodeToActiveBranch(parseTreeBranchNode($.CJSX_ATTR_PAIR, null, [parseTreeLeafNode($.CJSX_ATTR_KEY, "\"" + attrName + "\""), parseTreeLeafNode($.CJSX_ATTR_VAL, "\"" + doubleQuotedVal + "\"")]));
        return input.length;
      } else if (singleQuotedVal) {
        this.addLeafNodeToActiveBranch(parseTreeBranchNode($.CJSX_ATTR_PAIR, null, [parseTreeLeafNode($.CJSX_ATTR_KEY, "\"" + attrName + "\""), parseTreeLeafNode($.CJSX_ATTR_VAL, "'" + singleQuotedVal + "'")]));
        return input.length;
      } else if (cjsxEscVal) {
        this.pushActiveBranchNode(parseTreeBranchNode($.CJSX_ATTR_PAIR));
        this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CJSX_ATTR_KEY, "\"" + attrName + "\""));
        return input.indexOf('{');
      } else if (bareVal) {
        this.addLeafNodeToActiveBranch(parseTreeBranchNode($.CJSX_ATTR_PAIR, null, [parseTreeLeafNode($.CJSX_ATTR_KEY, "\"" + attrName + "\""), parseTreeLeafNode($.CJSX_ATTR_VAL, bareVal)]));
        return input.length;
      } else {
        this.addLeafNodeToActiveBranch(parseTreeBranchNode($.CJSX_ATTR_PAIR, null, [parseTreeLeafNode($.CJSX_ATTR_KEY, "\"" + attrName + "\""), parseTreeLeafNode($.CJSX_ATTR_VAL, 'true')]));
        return input.length;
      }
    } else if (whitespace) {
      this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CJSX_WHITESPACE, whitespace));
      return input.length;
    } else {
      return throwSyntaxError("Invalid attribute " + input + " in CJSX tag " + (this.peekActiveState(2).value), {
        first_line: this.chunkLine,
        first_column: this.chunkColumn
      });
    }
  };

  Parser.prototype.cjsxEscape = function() {
    var _ref1;
    if (!(this.chunk.charAt(0) === '{' && ((_ref1 = this.currentState()) === $.CJSX_EL || _ref1 === $.CJSX_ATTR_PAIR))) {
      return 0;
    }
    this.pushActiveBranchNode(parseTreeBranchNode($.CJSX_ESC));
    this.activeBranchNode().stack = 1;
    return 1;
  };

  Parser.prototype.cjsxUnescape = function() {
    if (!(this.currentState() === $.CJSX_ESC && this.chunk.charAt(0) === '}')) {
      return 0;
    }
    if (this.activeBranchNode().stack === 0) {
      this.popActiveBranchNode();
      if (this.currentState() === $.CJSX_ATTR_PAIR) {
        this.popActiveBranchNode();
      }
      return 1;
    } else {
      return 0;
    }
  };

  Parser.prototype.cjsxEnd = function() {
    var input, match, tagName;
    if (this.currentState() !== $.CJSX_EL) {
      return 0;
    }
    if (!(match = CLOSING_TAG.exec(this.chunk))) {
      return 0;
    }
    input = match[0], tagName = match[1];
    if (tagName !== this.activeBranchNode().value) {
      throwSyntaxError("opening CJSX tag " + (this.activeBranchNode().value) + " doesn't match closing CJSX tag " + tagName, {
        first_line: this.chunkLine,
        first_column: this.chunkColumn
      });
    }
    this.popActiveBranchNode();
    return input.length;
  };

  Parser.prototype.cjsxText = function() {
    if (this.currentState() !== $.CJSX_EL) {
      return 0;
    }
    if (this.newestNode().type !== $.CJSX_TEXT) {
      this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CJSX_TEXT, ''));
    }
    this.newestNode().value += this.chunk.charAt(0);
    return 1;
  };

  Parser.prototype.coffeescriptCode = function() {
    if (this.currentState() === $.CJSX_ESC) {
      if (this.chunk.charAt(0) === '{') {
        this.activeBranchNode().stack++;
      } else if (this.chunk.charAt(0) === '}') {
        this.activeBranchNode().stack--;
        if (this.activeBranchNode().stack === 0) {
          return 0;
        }
      }
    }
    if (this.newestNode().type !== $.CS) {
      this.addLeafNodeToActiveBranch(parseTreeLeafNode($.CS, ''));
    }
    this.newestNode().value += this.chunk.charAt(0);
    return 1;
  };

  Parser.prototype.activeBranchNode = function() {
    return last(this.activeStates);
  };

  Parser.prototype.peekActiveState = function(depth) {
    if (depth == null) {
      depth = 1;
    }
    return this.activeStates.slice(-depth)[0];
  };

  Parser.prototype.currentState = function() {
    return this.activeBranchNode().type;
  };

  Parser.prototype.newestNode = function() {
    return last(this.activeBranchNode().children) || this.activeBranchNode();
  };

  Parser.prototype.pushActiveBranchNode = function(node) {
    this.activeBranchNode().children.push(node);
    return this.activeStates.push(node);
  };

  Parser.prototype.popActiveBranchNode = function() {
    return this.activeStates.pop();
  };

  Parser.prototype.addLeafNodeToActiveBranch = function(node) {
    return this.activeBranchNode().children.push(node);
  };

  Parser.prototype.clean = function(code) {
    if (code.charCodeAt(0) === BOM) {
      code = code.slice(1);
    }
    code = code.replace(/\r/g, '');
    return code;
  };

  Parser.prototype.getLineAndColumnFromChunk = function(offset) {
    var column, lineCount, lines, string;
    if (offset === 0) {
      return [this.chunkLine, this.chunkColumn];
    }
    if (offset >= this.chunk.length) {
      string = this.chunk;
    } else {
      string = this.chunk.slice(0, +(offset - 1) + 1 || 9e9);
    }
    lineCount = count(string, '\n');
    column = this.chunkColumn;
    if (lineCount > 0) {
      lines = string.split('\n');
      column = last(lines).length;
    } else {
      column += string.length;
    }
    return [this.chunkLine + lineCount, column];
  };

  Parser.prototype.balancedString = function(str, end) {
    var continueCount, i, letter, match, prev, stack, _i, _ref1;
    continueCount = 0;
    stack = [end];
    for (i = _i = 1, _ref1 = str.length; 1 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 1 <= _ref1 ? ++_i : --_i) {
      if (continueCount) {
        --continueCount;
        continue;
      }
      switch (letter = str.charAt(i)) {
        case '\\':
          ++continueCount;
          continue;
        case end:
          stack.pop();
          if (!stack.length) {
            return str.slice(0, +i + 1 || 9e9);
          }
          end = stack[stack.length - 1];
          continue;
      }
      if (end === '}' && (letter === '"' || letter === "'")) {
        stack.push(end = letter);
      } else if (end === '}' && letter === '/' && (match = HEREGEX.exec(str.slice(i)) || REGEX.exec(str.slice(i)))) {
        continueCount += match[0].length - 1;
      } else if (end === '}' && letter === '{') {
        stack.push(end = '}');
      } else if (end === '"' && prev === '#' && letter === '{') {
        stack.push(end = '}');
      }
      prev = letter;
    }
    return this.error("missing " + (stack.pop()) + ", starting");
  };

  return Parser;

})();

OPENING_TAG = /^<([-A-Za-z0-9_]+)((?:\s+[\w-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:{[\s\S]*?})|[^>\s]+))?)*?\s*)(\/?)>/;

CLOSING_TAG = /^<\/([-A-Za-z0-9_]+)[^>]*>/;

TAG_ATTRIBUTES = /(?:([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:{((?:\\.|[\s\S])*)})|([^>\s]+)))?)|([\s\n]+)/;

PRAGMA = /^\s*#\s*@cjsx\s+(\S*)/i;

BOM = 65279;

WHITESPACE = /^[^\n\S]+/;

COMMENT = /^###([^#][\s\S]*?)(?:###[^\n\S]*|###$)|^(?:\s*#(?!##[^#]).*)+/;

TRAILING_SPACES = /\s+$/;

HEREDOC = /^("""|''')((?:\\[\s\S]|[^\\])*?)(?:\n[^\n\S]*)?\1/;

SIMPLESTR = /^'[^\\']*(?:\\[\s\S][^\\']*)*'/;

JSTOKEN = /^`[^\\`]*(?:\\.[^\\`]*)*`/;

REGEX = /^(\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)([imgy]{0,4})(?!\w)/;

HEREGEX = /^\/{3}((?:\\?[\s\S])+?)\/{3}([imgy]{0,4})(?!\w)/;

},{"./helpers":3,"./symbols":8}],6:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
var $, HTML_ELEMENTS, SPACES_ONLY, TEXT_LEADING_WHITESPACE, TEXT_TRAILING_WHITESPACE, WHITESPACE_ONLY, containsNewlines, entityDecode, genericBranchSerialiser, genericLeafSerialiser, last, serialise, serialiseNode, serialisers, stringEscape;

last = require('./helpers').last;

$ = require('./symbols');

HTML_ELEMENTS = require('./htmlelements');

stringEscape = require('./stringescape');

entityDecode = require('./entitydecode');

module.exports = serialise = function(parseTree) {
  var env;
  env = {
    serialiseNode: serialiseNode
  };
  if (parseTree.children && parseTree.children.length && parseTree.children[0].type === $.CJSX_PRAGMA) {
    env.domObject = parseTree.children[0].value;
  } else {
    env.domObject = 'React.DOM';
  }
  return env.serialiseNode(parseTree);
};

serialiseNode = function(node) {
  var serialised;
  if (serialisers[node.type] == null) {
    throw new Error("unknown parseTree node type " + node.type);
  }
  serialised = serialisers[node.type](node, this);
  if (!(typeof serialised === 'string' || serialised === null)) {
    throw new Error("serialiser " + node.type + " didn\'t return a string");
  }
  return serialised;
};

genericBranchSerialiser = function(node, env) {
  return node.children.map(function(child) {
    return env.serialiseNode(child);
  }).join('');
};

genericLeafSerialiser = function(node, env) {
  return node.value;
};

serialise.serialisers = serialisers = {
  ROOT: genericBranchSerialiser,
  CJSX_PRAGMA: function() {
    return null;
  },
  CJSX_EL: function(node, env) {
    var accumulatedWhitespace, child, prefix, serialisedChild, serialisedChildren, _i, _len, _ref;
    serialisedChildren = [];
    accumulatedWhitespace = '';
    _ref = node.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      serialisedChild = env.serialiseNode(child);
      if (child != null) {
        if (WHITESPACE_ONLY.test(serialisedChild)) {
          accumulatedWhitespace += serialisedChild;
        } else {
          serialisedChildren.push(accumulatedWhitespace + serialisedChild);
          accumulatedWhitespace = '';
        }
      }
    }
    if (serialisedChildren.length) {
      serialisedChildren[serialisedChildren.length - 1] += accumulatedWhitespace;
      accumulatedWhitespace = '';
    }
    prefix = HTML_ELEMENTS[node.value] != null ? env.domObject + '.' : '';
    return prefix + node.value + '(' + serialisedChildren.join(', ') + ')';
  },
  CJSX_ESC: function(node, env) {
    var childrenSerialised;
    childrenSerialised = node.children.map(function(child) {
      return env.serialiseNode(child);
    }).join('');
    return '(' + childrenSerialised + ')';
  },
  CJSX_ATTRIBUTES: function(node, env) {
    var child, childIndex, indexOfLastSemanticChild, isBeforeLastSemanticChild, semanticChildren, serialisedChild, serialisedChildren, whitespaceChildren, _ref;
    _ref = node.children.reduce(function(partitionedChildren, child) {
      if (child.type === $.CJSX_WHITESPACE) {
        partitionedChildren[0].push(child);
      } else {
        partitionedChildren[1].push(child);
      }
      return partitionedChildren;
    }, [[], []]), whitespaceChildren = _ref[0], semanticChildren = _ref[1];
    indexOfLastSemanticChild = node.children.lastIndexOf(last(semanticChildren));
    isBeforeLastSemanticChild = function(childIndex) {
      return childIndex < indexOfLastSemanticChild;
    };
    if (semanticChildren.length) {
      serialisedChildren = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = node.children;
        _results = [];
        for (childIndex = _i = 0, _len = _ref1.length; _i < _len; childIndex = ++_i) {
          child = _ref1[childIndex];
          serialisedChild = env.serialiseNode(child);
          if (child.type === $.CJSX_WHITESPACE) {
            if (containsNewlines(serialisedChild)) {
              if (isBeforeLastSemanticChild(childIndex)) {
                _results.push(serialisedChild.replace('\n', ' \\\n'));
              } else {
                _results.push(serialisedChild);
              }
            } else {
              _results.push(null);
            }
          } else if (isBeforeLastSemanticChild(childIndex)) {
            _results.push(serialisedChild + ', ');
          } else {
            _results.push(serialisedChild);
          }
        }
        return _results;
      })();
      return '{' + serialisedChildren.join('') + '}';
    } else {
      return 'null';
    }
  },
  CJSX_ATTR_PAIR: function(node, env) {
    return node.children.map(function(child) {
      return env.serialiseNode(child);
    }).join(': ');
  },
  CS: genericLeafSerialiser,
  CS_COMMENT: genericLeafSerialiser,
  CS_HEREDOC: genericLeafSerialiser,
  CS_STRING: genericLeafSerialiser,
  CS_REGEX: genericLeafSerialiser,
  CS_HEREGEX: genericLeafSerialiser,
  JS_ESC: genericLeafSerialiser,
  CJSX_WHITESPACE: genericLeafSerialiser,
  CJSX_TEXT: function(node) {
    var escapedText, leftSpace, leftTrim, rightSpace, rightTrim, text, trimmedText;
    text = node.value;
    if (containsNewlines(text)) {
      if (WHITESPACE_ONLY.test(text)) {
        return text;
      } else {
        leftSpace = text.match(TEXT_LEADING_WHITESPACE);
        rightSpace = text.match(TEXT_TRAILING_WHITESPACE);
        if (leftSpace) {
          leftTrim = text.indexOf('\n');
        } else {
          leftTrim = 0;
        }
        if (rightSpace) {
          rightTrim = text.lastIndexOf('\n') + 1;
        } else {
          rightTrim = text.length;
        }
        trimmedText = text.substring(leftTrim, rightTrim);
        escapedText = stringEscape(entityDecode(trimmedText), {
          preserveNewlines: true
        });
        return '"""' + escapedText + '"""';
      }
    } else {
      if (text === '') {
        return null;
      } else {
        return '"' + stringEscape(entityDecode(text)) + '"';
      }
    }
  },
  CJSX_ATTR_KEY: genericLeafSerialiser,
  CJSX_ATTR_VAL: genericLeafSerialiser
};

containsNewlines = function(text) {
  return text.indexOf('\n') > -1;
};

SPACES_ONLY = /^\s+$/;

WHITESPACE_ONLY = /^[\n\s]+$/;

TEXT_LEADING_WHITESPACE = /^\s*?\n\s*/;

TEXT_TRAILING_WHITESPACE = /\s*?\n\s*?$/;

},{"./entitydecode":2,"./helpers":3,"./htmlelements":4,"./stringescape":7,"./symbols":8}],7:[function(require,module,exports){

var hex = '0123456789abcdef'.split('');

module.exports  =  function stringEncode(input, opts) {
  opts = opts || {};
  var escaped = "";

  for (var i = 0; i < input.length; i++) {
    escaped = escaped + encodeChar(input.charAt(i), opts.preserveNewlines);
  }

  return escaped;
}

function encodeChar(inputChar, preserveNewlines) {
  var character = inputChar.charAt(0);
  var characterCode = inputChar.charCodeAt(0);

  switch(character) {
    case '\n':
      if (!preserveNewlines) return "\\n";
      else return character;
    case '\r':
      if (!preserveNewlines) return "\\r";
      else return character;
    case '\'': return "\\'";
    case '"': return "\\\"";
    case '\&': return "\\&";
    case '\\': return "\\\\";
    case '\t': return "\\t";
    case '\b': return "\\b";
    case '\f': return "\\f";
    case '/': return "\\x2F";
    case '<': return "\\x3C";
    case '>': return "\\x3E";
  }

  if (characterCode > 127) {
    var c = characterCode;
    var a4 = c % 16;
    c = ~~(c/16);
    var a3 = c % 16;
    c = ~~(c/16);
    var a2 = c % 16;
    c = ~~(c/16);
    var a1 = c % 16;

    return ["\\u", hex[a1], hex[a2], hex[a3], hex[a4]].join('');
  } else {
    return inputChar;
  }
}

},{}],8:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
module.exports = {
  ROOT: 'ROOT',
  CJSX_EL: 'CJSX_EL',
  CJSX_ESC: 'CJSX_ESC',
  CJSX_ATTRIBUTES: 'CJSX_ATTRIBUTES',
  CJSX_ATTR_PAIR: 'CJSX_ATTR_PAIR',
  CS: 'CS',
  CS_COMMENT: 'CS_COMMENT',
  CS_HEREDOC: 'CS_HEREDOC',
  CS_STRING: 'CS_STRING',
  CS_REGEX: 'CS_REGEX',
  CS_HEREGEX: 'CS_HEREGEX',
  JS_ESC: 'JS_ESC',
  CJSX_WHITESPACE: 'CJSX_WHITESPACE',
  CJSX_TEXT: 'CJSX_TEXT',
  CJSX_ATTR_KEY: 'CJSX_ATTR_KEY',
  CJSX_ATTR_VAL: 'CJSX_ATTR_VAL',
  CJSX_START: 'CJSX_START',
  CJSX_END: 'CJSX_END',
  CJSX_ESC_START: 'CJSX_ESC_START',
  CJSX_ESC_END: 'CJSX_ESC_END',
  CJSX_PRAGMA: 'CJSX_PRAGMA'
};

},{}],9:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
var Parser, serialise;

Parser = require('./parser');

serialise = require('./serialiser');

CJSXTransformer.transform = function(code, opts) {
  return serialise(new Parser().parse(code, opts));
};

},{"./parser":5,"./serialiser":6}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[1])