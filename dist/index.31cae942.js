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
})({"4mTcU":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a87a9a1e31cae942";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
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
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
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
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
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
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"6fmNX":[function(require,module,exports) {
const form = document.querySelector("#regForm");
const idInput = document.querySelector("#txt-id");
const nameInput = document.querySelector("#txt-name");
const contactInput = document.querySelector("#txt-contact");
const btnNewUser = document.querySelector(".btn-new-user");
console.log(btnNewUser.innerHTML);
const btnSave = document.querySelector(".btn-success");
const btnClear = document.querySelector(".btn-warning");
const tableBody = document.querySelector(".userTableBody");
let isUpdateMode = false;
// const { API_URL } = process.env;
const API_URL = "http://localhost:8080"; // Set your API URL here
//Create user class
class User {
    static lastId = 0;
    name;
    contact;
    constructor(name, contact){
        this.name = name;
        this.contact = contact;
        User.lastId++;
    }
}
//Disable input fields on page load
idInput.disabled = true;
nameInput.disabled = true;
contactInput.disabled = true;
loadTeachers();
//Load all the details
async function loadTeachers() {
    try {
        const response = await fetch(`${API_URL}/teachers`);
        if (!response.ok) throw new Error("Failed to fetch teachers");
        const teachers = await response.json();
        console.log(teachers);
        displayTeachers(teachers);
    } catch (error) {
        console.error(error);
        alert("Failed to load teachers. Please try again.");
    }
}
function displayTeachers(teachers) {
    tableBody.innerHTML = "";
    if (teachers.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = '<td colspan="4" class="text-center py-5 no-data-found">No Data Found!</td>';
        tableBody.append(noDataRow);
        return;
    }
    teachers.forEach((teacher)=>{
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="d-flex justify-content-center">${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.contact}</td>
            <td class="d-flex justify-content-center">
                <i class="bi bi-pencil me-2" title="Edit"></i>
                <i class="bi bi-trash" title="Delete"></i>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
btnNewUser.addEventListener("click", async ()=>{
    try {
        // Fetch the last added teacher's ID from the backend
        const response = await fetch(`${API_URL}/teachers`);
        if (!response.ok) throw new Error("Failed to fetch teachers");
        const teachers = await response.json();
        // Find the maximum ID from the teachers array
        const maxId = teachers.reduce((max, teacher)=>Math.max(max, teacher.id), 0);
        // Set the new ID in the ID input field
        idInput.value = maxId + 1;
        // Enable the input fields when the button is clicked
        nameInput.disabled = false;
        contactInput.disabled = false;
    } catch (error) {
        console.error(error);
        alert("Failed to load teachers. Please try again.");
    }
});
//Validate the data inputs
//Event listners for input validation
nameInput.addEventListener("input", validateName);
contactInput.addEventListener("input", validateAddress);
function validateForm() {
    return validateName() && validateAddress();
}
//Validate the name input
function validateName() {
    const nameValue = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (nameValue === "") {
        showError(nameInput, "Name is required");
        return false;
    } else if (!nameRegex.test(nameValue)) {
        showError(nameInput, "Invalid Name! Only letters and white spaces are allowed");
        return false;
    } else {
        hideError(nameInput);
        return true;
    }
}
//Validate the address input
function validateAddress() {
    const contactValue = contactInput.value.trim();
    if (contactValue === "") {
        showError(contactInput, "Address is required");
        return false;
    } else if (contactValue.length < 4) {
        showError(contactInput, "Address must be at least 4 characters long");
        return false;
    } else {
        hideError(contactInput);
        return true;
    }
}
//Show error messages
function showError(inputField, errorMessage) {
    inputField.classList.add("is-invalid");
    const errorContainer = document.getElementById(`${inputField.id}-error`);
    errorContainer.textContent = errorMessage;
    errorContainer.style.display = "block";
}
//Hide error message
function hideError(inputField) {
    inputField.classList.remove("is-invalid");
    const errorContainer = document.getElementById(`${inputField.id}-error`);
    errorContainer.textContent = "";
    errorContainer.style.display = "none";
}
//Add teacher to table
btnSave.addEventListener("click", async ()=>{
    const name = nameInput.value.trim();
    const contact = contactInput.value.trim();
    const teacherData = {
        name: name,
        contact: contact
    };
    if (validateForm()) try {
        let response;
        if (isUpdateMode) {
            // If in update mode, send a PATCH request to update the teacher
            response = await fetch(`${API_URL}/teachers/${idInput.value}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teacherData)
            });
            if (!response.ok) throw new Error("Failed to update the teacher.");
            updateTeacherInTable();
            isUpdateMode = false;
        } else {
            response = await fetch(`${API_URL}/teachers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teacherData)
            });
            if (!response.ok) throw new Error("Failed to add the teacher.");
            // If the request is successful, update the frontend table
            const newTeacher = await response.json();
            addTeacherToTable(newTeacher);
            // Clear the form inputs
            form.reset();
            nameInput.disabled = true;
            contactInput.disabled = true;
            alert("Teacher added successfully!");
        }
    } catch (error) {
        console.error("Error:", error.message);
        alert("Something went wrong. Please try again.");
    }
});
// Function to add a teacher to the table
function addTeacherToTable(teacher) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${teacher.id}</td>
        <td>${teacher.name}</td>
        <td>${teacher.contact}</td>
        <td>
            <i class="bi bi-pencil me-2" title="Edit"></i>
            <i class="bi bi-trash" title="Delete"></i>
        </td>
    `;
    tableBody.appendChild(newRow);
    // If the "No Data Found" row exists, remove it
    const noDataRow = document.querySelector(".no-data");
    if (noDataRow) noDataRow.remove();
}
tableBody.addEventListener("click", (e)=>{
    if (e.target.classList.contains("bi-pencil")) {
        // Get the selected row
        const selectedRow = e.target.closest("tr");
        // Extract user details from the row
        const userId = selectedRow.querySelector("td:first-child").textContent;
        const userName = selectedRow.querySelector("td:nth-child(2)").textContent;
        const userAddress = selectedRow.querySelector("td:nth-child(3)").textContent;
        // Update form values
        idInput.value = userId;
        nameInput.value = userName;
        contactInput.value = userAddress;
        // Enable name and address fields
        nameInput.disabled = false;
        contactInput.disabled = false;
        // Change button text to 'Update'
        btnSave.textContent = "Update";
        // Set update mode to true
        isUpdateMode = true;
    }
});
//Update table function
function updateTeacherInTable() {
    const tableBody = document.querySelector(".userTableBody");
    const rows = tableBody.querySelectorAll("tr");
    for (const row of rows){
        const userId = row.cells[0].textContent;
        if (userId === idInput.value) {
            // Update the Name and Address in the table
            row.cells[1].textContent = nameInput.value.trim();
            row.cells[2].textContent = contactInput.value.trim();
            break; // Exit the loop once the row is updated
        }
    }
    // Reset the form and button text
    form.reset();
    btnSave.textContent = "Save";
    // Disable name and address fields
    nameInput.disabled = true;
    contactInput.disabled = true;
}
//Delete a teacher
tableBody.addEventListener("click", async (e)=>{
    if (e.target.classList.contains("bi-trash")) {
        // Get the selected row and remove it
        const selectedRow = e.target.closest("tr");
        const teacherId = selectedRow.querySelector("td:first-child").textContent;
        console.log(teacherId);
        try {
            const response = await fetch(`${API_URL}/teachers/${teacherId}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Failed to delete the teacher.");
            selectedRow.remove();
            // If no rows are left, show the "No Data Found" row
            if (tableBody.childElementCount < 1) {
                const newRow = document.createElement("tr");
                newRow.classList.add("no-data");
                const newCell = document.createElement("td");
                newCell.classList.add("text-center", "py-5", "no-data-found");
                newCell.setAttribute("colspan", "4");
                newCell.innerText = "No data found!";
                newRow.append(newCell);
                tableBody.append(newRow);
            }
        // alert('Teacher deleted successfully!');
        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to delete the teacher. Please try again.");
        }
    }
});
//Search teachers
const txtSearch = document.querySelector(".txt-search");
txtSearch.addEventListener("input", ()=>{
    const searchQueary = txtSearch.value.trim().toLowerCase();
    filterTableRows(searchQueary);
});
function filterTableRows(query) {
    const rows = document.querySelectorAll(".userTableBody tr:not(.no-data");
    rows.forEach((row)=>{
        const userId = row.querySelector("td:first-child").textContent.toLowerCase();
        console.log(userId);
        const userName = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const userContact = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
        if (userId.includes(query) || userName.includes(query) || userContact.includes(query)) row.style.display = "";
        else row.style.display = "none";
    });
}
// Handle the "Enter" key press event on the form
form.addEventListener("keydown", async (e)=>{
    if (e.key === "Enter") {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Trigger the "Save" button click event
        btnSave.click();
    }
});

},{}]},["4mTcU","6fmNX"], "6fmNX", "parcelRequire8d29")

//# sourceMappingURL=index.31cae942.js.map
