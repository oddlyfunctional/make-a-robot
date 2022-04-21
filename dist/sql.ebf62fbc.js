// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"krH8c":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "c8d5566debf62fbc";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"9nbHs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "conf", ()=>conf
);
parcelHelpers.export(exports, "language", ()=>language
);
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/ // src/basic-languages/sql/sql.ts
var conf = {
    comments: {
        lineComment: "--",
        blockComment: [
            "/*",
            "*/"
        ]
    },
    brackets: [
        [
            "{",
            "}"
        ],
        [
            "[",
            "]"
        ],
        [
            "(",
            ")"
        ]
    ],
    autoClosingPairs: [
        {
            open: "{",
            close: "}"
        },
        {
            open: "[",
            close: "]"
        },
        {
            open: "(",
            close: ")"
        },
        {
            open: '"',
            close: '"'
        },
        {
            open: "'",
            close: "'"
        }
    ],
    surroundingPairs: [
        {
            open: "{",
            close: "}"
        },
        {
            open: "[",
            close: "]"
        },
        {
            open: "(",
            close: ")"
        },
        {
            open: '"',
            close: '"'
        },
        {
            open: "'",
            close: "'"
        }
    ]
};
var language = {
    defaultToken: "",
    tokenPostfix: ".sql",
    ignoreCase: true,
    brackets: [
        {
            open: "[",
            close: "]",
            token: "delimiter.square"
        },
        {
            open: "(",
            close: ")",
            token: "delimiter.parenthesis"
        }
    ],
    keywords: [
        "ABORT",
        "ABSOLUTE",
        "ACTION",
        "ADA",
        "ADD",
        "AFTER",
        "ALL",
        "ALLOCATE",
        "ALTER",
        "ALWAYS",
        "ANALYZE",
        "AND",
        "ANY",
        "ARE",
        "AS",
        "ASC",
        "ASSERTION",
        "AT",
        "ATTACH",
        "AUTHORIZATION",
        "AUTOINCREMENT",
        "AVG",
        "BACKUP",
        "BEFORE",
        "BEGIN",
        "BETWEEN",
        "BIT",
        "BIT_LENGTH",
        "BOTH",
        "BREAK",
        "BROWSE",
        "BULK",
        "BY",
        "CASCADE",
        "CASCADED",
        "CASE",
        "CAST",
        "CATALOG",
        "CHAR",
        "CHARACTER",
        "CHARACTER_LENGTH",
        "CHAR_LENGTH",
        "CHECK",
        "CHECKPOINT",
        "CLOSE",
        "CLUSTERED",
        "COALESCE",
        "COLLATE",
        "COLLATION",
        "COLUMN",
        "COMMIT",
        "COMPUTE",
        "CONFLICT",
        "CONNECT",
        "CONNECTION",
        "CONSTRAINT",
        "CONSTRAINTS",
        "CONTAINS",
        "CONTAINSTABLE",
        "CONTINUE",
        "CONVERT",
        "CORRESPONDING",
        "COUNT",
        "CREATE",
        "CROSS",
        "CURRENT",
        "CURRENT_DATE",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_USER",
        "CURSOR",
        "DATABASE",
        "DATE",
        "DAY",
        "DBCC",
        "DEALLOCATE",
        "DEC",
        "DECIMAL",
        "DECLARE",
        "DEFAULT",
        "DEFERRABLE",
        "DEFERRED",
        "DELETE",
        "DENY",
        "DESC",
        "DESCRIBE",
        "DESCRIPTOR",
        "DETACH",
        "DIAGNOSTICS",
        "DISCONNECT",
        "DISK",
        "DISTINCT",
        "DISTRIBUTED",
        "DO",
        "DOMAIN",
        "DOUBLE",
        "DROP",
        "DUMP",
        "EACH",
        "ELSE",
        "END",
        "END-EXEC",
        "ERRLVL",
        "ESCAPE",
        "EXCEPT",
        "EXCEPTION",
        "EXCLUDE",
        "EXCLUSIVE",
        "EXEC",
        "EXECUTE",
        "EXISTS",
        "EXIT",
        "EXPLAIN",
        "EXTERNAL",
        "EXTRACT",
        "FAIL",
        "FALSE",
        "FETCH",
        "FILE",
        "FILLFACTOR",
        "FILTER",
        "FIRST",
        "FLOAT",
        "FOLLOWING",
        "FOR",
        "FOREIGN",
        "FORTRAN",
        "FOUND",
        "FREETEXT",
        "FREETEXTTABLE",
        "FROM",
        "FULL",
        "FUNCTION",
        "GENERATED",
        "GET",
        "GLOB",
        "GLOBAL",
        "GO",
        "GOTO",
        "GRANT",
        "GROUP",
        "GROUPS",
        "HAVING",
        "HOLDLOCK",
        "HOUR",
        "IDENTITY",
        "IDENTITYCOL",
        "IDENTITY_INSERT",
        "IF",
        "IGNORE",
        "IMMEDIATE",
        "IN",
        "INCLUDE",
        "INDEX",
        "INDEXED",
        "INDICATOR",
        "INITIALLY",
        "INNER",
        "INPUT",
        "INSENSITIVE",
        "INSERT",
        "INSTEAD",
        "INT",
        "INTEGER",
        "INTERSECT",
        "INTERVAL",
        "INTO",
        "IS",
        "ISNULL",
        "ISOLATION",
        "JOIN",
        "KEY",
        "KILL",
        "LANGUAGE",
        "LAST",
        "LEADING",
        "LEFT",
        "LEVEL",
        "LIKE",
        "LIMIT",
        "LINENO",
        "LOAD",
        "LOCAL",
        "LOWER",
        "MATCH",
        "MATERIALIZED",
        "MAX",
        "MERGE",
        "MIN",
        "MINUTE",
        "MODULE",
        "MONTH",
        "NAMES",
        "NATIONAL",
        "NATURAL",
        "NCHAR",
        "NEXT",
        "NO",
        "NOCHECK",
        "NONCLUSTERED",
        "NONE",
        "NOT",
        "NOTHING",
        "NOTNULL",
        "NULL",
        "NULLIF",
        "NULLS",
        "NUMERIC",
        "OCTET_LENGTH",
        "OF",
        "OFF",
        "OFFSET",
        "OFFSETS",
        "ON",
        "ONLY",
        "OPEN",
        "OPENDATASOURCE",
        "OPENQUERY",
        "OPENROWSET",
        "OPENXML",
        "OPTION",
        "OR",
        "ORDER",
        "OTHERS",
        "OUTER",
        "OUTPUT",
        "OVER",
        "OVERLAPS",
        "PAD",
        "PARTIAL",
        "PARTITION",
        "PASCAL",
        "PERCENT",
        "PIVOT",
        "PLAN",
        "POSITION",
        "PRAGMA",
        "PRECEDING",
        "PRECISION",
        "PREPARE",
        "PRESERVE",
        "PRIMARY",
        "PRINT",
        "PRIOR",
        "PRIVILEGES",
        "PROC",
        "PROCEDURE",
        "PUBLIC",
        "QUERY",
        "RAISE",
        "RAISERROR",
        "RANGE",
        "READ",
        "READTEXT",
        "REAL",
        "RECONFIGURE",
        "RECURSIVE",
        "REFERENCES",
        "REGEXP",
        "REINDEX",
        "RELATIVE",
        "RELEASE",
        "RENAME",
        "REPLACE",
        "REPLICATION",
        "RESTORE",
        "RESTRICT",
        "RETURN",
        "RETURNING",
        "REVERT",
        "REVOKE",
        "RIGHT",
        "ROLLBACK",
        "ROW",
        "ROWCOUNT",
        "ROWGUIDCOL",
        "ROWS",
        "RULE",
        "SAVE",
        "SAVEPOINT",
        "SCHEMA",
        "SCROLL",
        "SECOND",
        "SECTION",
        "SECURITYAUDIT",
        "SELECT",
        "SEMANTICKEYPHRASETABLE",
        "SEMANTICSIMILARITYDETAILSTABLE",
        "SEMANTICSIMILARITYTABLE",
        "SESSION",
        "SESSION_USER",
        "SET",
        "SETUSER",
        "SHUTDOWN",
        "SIZE",
        "SMALLINT",
        "SOME",
        "SPACE",
        "SQL",
        "SQLCA",
        "SQLCODE",
        "SQLERROR",
        "SQLSTATE",
        "SQLWARNING",
        "STATISTICS",
        "SUBSTRING",
        "SUM",
        "SYSTEM_USER",
        "TABLE",
        "TABLESAMPLE",
        "TEMP",
        "TEMPORARY",
        "TEXTSIZE",
        "THEN",
        "TIES",
        "TIME",
        "TIMESTAMP",
        "TIMEZONE_HOUR",
        "TIMEZONE_MINUTE",
        "TO",
        "TOP",
        "TRAILING",
        "TRAN",
        "TRANSACTION",
        "TRANSLATE",
        "TRANSLATION",
        "TRIGGER",
        "TRIM",
        "TRUE",
        "TRUNCATE",
        "TRY_CONVERT",
        "TSEQUAL",
        "UNBOUNDED",
        "UNION",
        "UNIQUE",
        "UNKNOWN",
        "UNPIVOT",
        "UPDATE",
        "UPDATETEXT",
        "UPPER",
        "USAGE",
        "USE",
        "USER",
        "USING",
        "VACUUM",
        "VALUE",
        "VALUES",
        "VARCHAR",
        "VARYING",
        "VIEW",
        "VIRTUAL",
        "WAITFOR",
        "WHEN",
        "WHENEVER",
        "WHERE",
        "WHILE",
        "WINDOW",
        "WITH",
        "WITHIN GROUP",
        "WITHOUT",
        "WORK",
        "WRITE",
        "WRITETEXT",
        "YEAR",
        "ZONE"
    ],
    operators: [
        "ALL",
        "AND",
        "ANY",
        "BETWEEN",
        "EXISTS",
        "IN",
        "LIKE",
        "NOT",
        "OR",
        "SOME",
        "EXCEPT",
        "INTERSECT",
        "UNION",
        "APPLY",
        "CROSS",
        "FULL",
        "INNER",
        "JOIN",
        "LEFT",
        "OUTER",
        "RIGHT",
        "CONTAINS",
        "FREETEXT",
        "IS",
        "NULL",
        "PIVOT",
        "UNPIVOT",
        "MATCHED"
    ],
    builtinFunctions: [
        "AVG",
        "CHECKSUM_AGG",
        "COUNT",
        "COUNT_BIG",
        "GROUPING",
        "GROUPING_ID",
        "MAX",
        "MIN",
        "SUM",
        "STDEV",
        "STDEVP",
        "VAR",
        "VARP",
        "CUME_DIST",
        "FIRST_VALUE",
        "LAG",
        "LAST_VALUE",
        "LEAD",
        "PERCENTILE_CONT",
        "PERCENTILE_DISC",
        "PERCENT_RANK",
        "COLLATE",
        "COLLATIONPROPERTY",
        "TERTIARY_WEIGHTS",
        "FEDERATION_FILTERING_VALUE",
        "CAST",
        "CONVERT",
        "PARSE",
        "TRY_CAST",
        "TRY_CONVERT",
        "TRY_PARSE",
        "ASYMKEY_ID",
        "ASYMKEYPROPERTY",
        "CERTPROPERTY",
        "CERT_ID",
        "CRYPT_GEN_RANDOM",
        "DECRYPTBYASYMKEY",
        "DECRYPTBYCERT",
        "DECRYPTBYKEY",
        "DECRYPTBYKEYAUTOASYMKEY",
        "DECRYPTBYKEYAUTOCERT",
        "DECRYPTBYPASSPHRASE",
        "ENCRYPTBYASYMKEY",
        "ENCRYPTBYCERT",
        "ENCRYPTBYKEY",
        "ENCRYPTBYPASSPHRASE",
        "HASHBYTES",
        "IS_OBJECTSIGNED",
        "KEY_GUID",
        "KEY_ID",
        "KEY_NAME",
        "SIGNBYASYMKEY",
        "SIGNBYCERT",
        "SYMKEYPROPERTY",
        "VERIFYSIGNEDBYCERT",
        "VERIFYSIGNEDBYASYMKEY",
        "CURSOR_STATUS",
        "DATALENGTH",
        "IDENT_CURRENT",
        "IDENT_INCR",
        "IDENT_SEED",
        "IDENTITY",
        "SQL_VARIANT_PROPERTY",
        "CURRENT_TIMESTAMP",
        "DATEADD",
        "DATEDIFF",
        "DATEFROMPARTS",
        "DATENAME",
        "DATEPART",
        "DATETIME2FROMPARTS",
        "DATETIMEFROMPARTS",
        "DATETIMEOFFSETFROMPARTS",
        "DAY",
        "EOMONTH",
        "GETDATE",
        "GETUTCDATE",
        "ISDATE",
        "MONTH",
        "SMALLDATETIMEFROMPARTS",
        "SWITCHOFFSET",
        "SYSDATETIME",
        "SYSDATETIMEOFFSET",
        "SYSUTCDATETIME",
        "TIMEFROMPARTS",
        "TODATETIMEOFFSET",
        "YEAR",
        "CHOOSE",
        "COALESCE",
        "IIF",
        "NULLIF",
        "ABS",
        "ACOS",
        "ASIN",
        "ATAN",
        "ATN2",
        "CEILING",
        "COS",
        "COT",
        "DEGREES",
        "EXP",
        "FLOOR",
        "LOG",
        "LOG10",
        "PI",
        "POWER",
        "RADIANS",
        "RAND",
        "ROUND",
        "SIGN",
        "SIN",
        "SQRT",
        "SQUARE",
        "TAN",
        "APP_NAME",
        "APPLOCK_MODE",
        "APPLOCK_TEST",
        "ASSEMBLYPROPERTY",
        "COL_LENGTH",
        "COL_NAME",
        "COLUMNPROPERTY",
        "DATABASE_PRINCIPAL_ID",
        "DATABASEPROPERTYEX",
        "DB_ID",
        "DB_NAME",
        "FILE_ID",
        "FILE_IDEX",
        "FILE_NAME",
        "FILEGROUP_ID",
        "FILEGROUP_NAME",
        "FILEGROUPPROPERTY",
        "FILEPROPERTY",
        "FULLTEXTCATALOGPROPERTY",
        "FULLTEXTSERVICEPROPERTY",
        "INDEX_COL",
        "INDEXKEY_PROPERTY",
        "INDEXPROPERTY",
        "OBJECT_DEFINITION",
        "OBJECT_ID",
        "OBJECT_NAME",
        "OBJECT_SCHEMA_NAME",
        "OBJECTPROPERTY",
        "OBJECTPROPERTYEX",
        "ORIGINAL_DB_NAME",
        "PARSENAME",
        "SCHEMA_ID",
        "SCHEMA_NAME",
        "SCOPE_IDENTITY",
        "SERVERPROPERTY",
        "STATS_DATE",
        "TYPE_ID",
        "TYPE_NAME",
        "TYPEPROPERTY",
        "DENSE_RANK",
        "NTILE",
        "RANK",
        "ROW_NUMBER",
        "PUBLISHINGSERVERNAME",
        "OPENDATASOURCE",
        "OPENQUERY",
        "OPENROWSET",
        "OPENXML",
        "CERTENCODED",
        "CERTPRIVATEKEY",
        "CURRENT_USER",
        "HAS_DBACCESS",
        "HAS_PERMS_BY_NAME",
        "IS_MEMBER",
        "IS_ROLEMEMBER",
        "IS_SRVROLEMEMBER",
        "LOGINPROPERTY",
        "ORIGINAL_LOGIN",
        "PERMISSIONS",
        "PWDENCRYPT",
        "PWDCOMPARE",
        "SESSION_USER",
        "SESSIONPROPERTY",
        "SUSER_ID",
        "SUSER_NAME",
        "SUSER_SID",
        "SUSER_SNAME",
        "SYSTEM_USER",
        "USER",
        "USER_ID",
        "USER_NAME",
        "ASCII",
        "CHAR",
        "CHARINDEX",
        "CONCAT",
        "DIFFERENCE",
        "FORMAT",
        "LEFT",
        "LEN",
        "LOWER",
        "LTRIM",
        "NCHAR",
        "PATINDEX",
        "QUOTENAME",
        "REPLACE",
        "REPLICATE",
        "REVERSE",
        "RIGHT",
        "RTRIM",
        "SOUNDEX",
        "SPACE",
        "STR",
        "STUFF",
        "SUBSTRING",
        "UNICODE",
        "UPPER",
        "BINARY_CHECKSUM",
        "CHECKSUM",
        "CONNECTIONPROPERTY",
        "CONTEXT_INFO",
        "CURRENT_REQUEST_ID",
        "ERROR_LINE",
        "ERROR_NUMBER",
        "ERROR_MESSAGE",
        "ERROR_PROCEDURE",
        "ERROR_SEVERITY",
        "ERROR_STATE",
        "FORMATMESSAGE",
        "GETANSINULL",
        "GET_FILESTREAM_TRANSACTION_CONTEXT",
        "HOST_ID",
        "HOST_NAME",
        "ISNULL",
        "ISNUMERIC",
        "MIN_ACTIVE_ROWVERSION",
        "NEWID",
        "NEWSEQUENTIALID",
        "ROWCOUNT_BIG",
        "XACT_STATE",
        "TEXTPTR",
        "TEXTVALID",
        "COLUMNS_UPDATED",
        "EVENTDATA",
        "TRIGGER_NESTLEVEL",
        "UPDATE",
        "CHANGETABLE",
        "CHANGE_TRACKING_CONTEXT",
        "CHANGE_TRACKING_CURRENT_VERSION",
        "CHANGE_TRACKING_IS_COLUMN_IN_MASK",
        "CHANGE_TRACKING_MIN_VALID_VERSION",
        "CONTAINSTABLE",
        "FREETEXTTABLE",
        "SEMANTICKEYPHRASETABLE",
        "SEMANTICSIMILARITYDETAILSTABLE",
        "SEMANTICSIMILARITYTABLE",
        "FILETABLEROOTPATH",
        "GETFILENAMESPACEPATH",
        "GETPATHLOCATOR",
        "PATHNAME",
        "GET_TRANSMISSION_STATUS"
    ],
    builtinVariables: [
        "@@DATEFIRST",
        "@@DBTS",
        "@@LANGID",
        "@@LANGUAGE",
        "@@LOCK_TIMEOUT",
        "@@MAX_CONNECTIONS",
        "@@MAX_PRECISION",
        "@@NESTLEVEL",
        "@@OPTIONS",
        "@@REMSERVER",
        "@@SERVERNAME",
        "@@SERVICENAME",
        "@@SPID",
        "@@TEXTSIZE",
        "@@VERSION",
        "@@CURSOR_ROWS",
        "@@FETCH_STATUS",
        "@@DATEFIRST",
        "@@PROCID",
        "@@ERROR",
        "@@IDENTITY",
        "@@ROWCOUNT",
        "@@TRANCOUNT",
        "@@CONNECTIONS",
        "@@CPU_BUSY",
        "@@IDLE",
        "@@IO_BUSY",
        "@@PACKET_ERRORS",
        "@@PACK_RECEIVED",
        "@@PACK_SENT",
        "@@TIMETICKS",
        "@@TOTAL_ERRORS",
        "@@TOTAL_READ",
        "@@TOTAL_WRITE"
    ],
    pseudoColumns: [
        "$ACTION",
        "$IDENTITY",
        "$ROWGUID",
        "$PARTITION"
    ],
    tokenizer: {
        root: [
            {
                include: "@comments"
            },
            {
                include: "@whitespace"
            },
            {
                include: "@pseudoColumns"
            },
            {
                include: "@numbers"
            },
            {
                include: "@strings"
            },
            {
                include: "@complexIdentifiers"
            },
            {
                include: "@scopes"
            },
            [
                /[;,.]/,
                "delimiter"
            ],
            [
                /[()]/,
                "@brackets"
            ],
            [
                /[\w@#$]+/,
                {
                    cases: {
                        "@operators": "operator",
                        "@builtinVariables": "predefined",
                        "@builtinFunctions": "predefined",
                        "@keywords": "keyword",
                        "@default": "identifier"
                    }
                }
            ],
            [
                /[<>=!%&+\-*/|~^]/,
                "operator"
            ]
        ],
        whitespace: [
            [
                /\s+/,
                "white"
            ]
        ],
        comments: [
            [
                /--+.*/,
                "comment"
            ],
            [
                /\/\*/,
                {
                    token: "comment.quote",
                    next: "@comment"
                }
            ]
        ],
        comment: [
            [
                /[^*/]+/,
                "comment"
            ],
            [
                /\*\//,
                {
                    token: "comment.quote",
                    next: "@pop"
                }
            ],
            [
                /./,
                "comment"
            ]
        ],
        pseudoColumns: [
            [
                /[$][A-Za-z_][\w@#$]*/,
                {
                    cases: {
                        "@pseudoColumns": "predefined",
                        "@default": "identifier"
                    }
                }
            ]
        ],
        numbers: [
            [
                /0[xX][0-9a-fA-F]*/,
                "number"
            ],
            [
                /[$][+-]*\d*(\.\d*)?/,
                "number"
            ],
            [
                /((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/,
                "number"
            ]
        ],
        strings: [
            [
                /N'/,
                {
                    token: "string",
                    next: "@string"
                }
            ],
            [
                /'/,
                {
                    token: "string",
                    next: "@string"
                }
            ]
        ],
        string: [
            [
                /[^']+/,
                "string"
            ],
            [
                /''/,
                "string"
            ],
            [
                /'/,
                {
                    token: "string",
                    next: "@pop"
                }
            ]
        ],
        complexIdentifiers: [
            [
                /\[/,
                {
                    token: "identifier.quote",
                    next: "@bracketedIdentifier"
                }
            ],
            [
                /"/,
                {
                    token: "identifier.quote",
                    next: "@quotedIdentifier"
                }
            ]
        ],
        bracketedIdentifier: [
            [
                /[^\]]+/,
                "identifier"
            ],
            [
                /]]/,
                "identifier"
            ],
            [
                /]/,
                {
                    token: "identifier.quote",
                    next: "@pop"
                }
            ]
        ],
        quotedIdentifier: [
            [
                /[^"]+/,
                "identifier"
            ],
            [
                /""/,
                "identifier"
            ],
            [
                /"/,
                {
                    token: "identifier.quote",
                    next: "@pop"
                }
            ]
        ],
        scopes: [
            [
                /BEGIN\s+(DISTRIBUTED\s+)?TRAN(SACTION)?\b/i,
                "keyword"
            ],
            [
                /BEGIN\s+TRY\b/i,
                {
                    token: "keyword.try"
                }
            ],
            [
                /END\s+TRY\b/i,
                {
                    token: "keyword.try"
                }
            ],
            [
                /BEGIN\s+CATCH\b/i,
                {
                    token: "keyword.catch"
                }
            ],
            [
                /END\s+CATCH\b/i,
                {
                    token: "keyword.catch"
                }
            ],
            [
                /(BEGIN|CASE)\b/i,
                {
                    token: "keyword.block"
                }
            ],
            [
                /END\b/i,
                {
                    token: "keyword.block"
                }
            ],
            [
                /WHEN\b/i,
                {
                    token: "keyword.choice"
                }
            ],
            [
                /THEN\b/i,
                {
                    token: "keyword.choice"
                }
            ]
        ]
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gxGPR"}]},["krH8c"], null, "parcelRequiref6c0")

//# sourceMappingURL=sql.ebf62fbc.js.map