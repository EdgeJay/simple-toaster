/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Toaster = undefined;
	
	var _Toaster2 = __webpack_require__(1);
	
	var _Toaster3 = _interopRequireDefault(_Toaster2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Toaster = _Toaster3.default;
	
	window.Toaster = exports.Toaster;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _toaster = __webpack_require__(2);
	
	var _toaster2 = _interopRequireDefault(_toaster);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultConfig = {
	    offsetTop: 0
	};
	
	var Toaster = function () {
	    function Toaster() {
	        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, Toaster);
	
	        this.setConfig(config);
	        this._nodeContainer = null;
	        this._toasts = [];
	        this._onToastHidden = this._onToastHidden.bind(this);
	    }
	
	    _createClass(Toaster, [{
	        key: '_initContainer',
	        value: function _initContainer() {
	            if (!this._nodeContainer) {
	                this._nodeContainer = document.createElement('DIV');
	                this._nodeContainer.classList.add('toasts');
	                this._nodeContainer.style.top = this._config.offsetTop + 'px';
	                document.body.appendChild(this._nodeContainer);
	            }
	        }
	    }, {
	        key: 'setConfig',
	        value: function setConfig() {
	            var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	            this._config = Object.assign({}, config);
	            this._applyConfig();
	        }
	    }, {
	        key: '_applyConfig',
	        value: function _applyConfig() {}
	    }, {
	        key: 'createAlert',
	        value: function createAlert(message) {
	            var alertType = arguments.length <= 1 || arguments[1] === undefined ? Toaster.AlertTypes.INFO : arguments[1];
	
	            this._initContainer();
	
	            var toast = new Toast(message, alertType);
	            toast.onHidden = this._onToastHidden;
	
	            if (!this._nodeContainer.firstChild) {
	                this._nodeContainer.appendChild(toast.getNode());
	            } else {
	                this._nodeContainer.insertBefore(toast.getNode(), this._nodeContainer.firstChild);
	            }
	
	            this._toasts.push(toast);
	
	            return toast;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(toast) {
	            if (toast) {
	                this._nodeContainer.removeChild(toast.getNode());
	
	                if (this._toasts.indexOf(toast) !== -1) {
	                    this._toasts.splice(this._toasts.indexOf(toast), 1);
	                }
	            }
	        }
	    }, {
	        key: 'removeAll',
	        value: function removeAll() {
	            var idx = 0;
	            while (idx < this._toasts.length) {
	                this._nodeContainer.removeChild(toast.getNode());
	                idx++;
	            }
	
	            this._toasts = [];
	        }
	    }, {
	        key: '_onToastHidden',
	        value: function _onToastHidden(toast) {
	            this.remove(toast);
	        }
	    }]);
	
	    return Toaster;
	}();
	
	exports.default = Toaster;
	
	var Toast = function () {
	    function Toast(message, alertType) {
	        _classCallCheck(this, Toast);
	
	        this.hiding = false;
	        this._hideTimerId = -1;
	        this._alertType = alertType;
	        this.delay = 3000; // 3 seconds
	        this.onHidden = null; // should be a function
	
	        var alertNode = document.createElement('DIV');
	        alertNode.classList.add('toast');
	        alertNode.classList.add(alertType);
	
	        var p = document.createElement('P');
	        p.innerHTML = '' + message;
	        alertNode.appendChild(p);
	
	        /*
	        let a = document.createElement('A');
	        a.href = '#';
	        a.innerHTML = `&times;`;
	        a.addEventListener('click', evt => {
	            evt.preventDefault();
	            this.close();
	        });
	        alertNode.appendChild(a);
	        */
	
	        this._node = document.createElement('DIV');
	        this._node.classList.add('toast-wrapper');
	        this._node.appendChild(alertNode);
	
	        this._transitionEndEvent = this._findTransitionEvent();
	    }
	
	    _createClass(Toast, [{
	        key: 'close',
	        value: function close() {
	            if (this.hiding) {
	                return;
	            }
	
	            if (this._hideTimerId !== -1) {
	                clearTimeout(this._hideTimerId);
	                this._hideTimerId = -1;
	            }
	
	            this.hide();
	        }
	    }, {
	        key: 'hideAfterDelay',
	        value: function hideAfterDelay(delay) {
	            var _this = this;
	
	            this._hideTimerId = setTimeout(function (_) {
	                _this.hide();
	            }, delay ? delay : this.delay);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.hiding = true;
	            this._node.classList.add('hide');
	            this._onTransitionEnd = this._onTransitionEnd.bind(this);
	            this._node.addEventListener(this._transitionEndEvent, this._onTransitionEnd);
	        }
	    }, {
	        key: 'getAlertType',
	        value: function getAlertType() {
	            return this._alertType;
	        }
	    }, {
	        key: 'getNode',
	        value: function getNode() {
	            return this._node;
	        }
	    }, {
	        key: '_findTransitionEvent',
	        value: function _findTransitionEvent() {
	            if (this._node) {
	                var t = void 0;
	                var transitions = {
	                    'transition': 'transitionend',
	                    'OTransition': 'oTransitionEnd',
	                    'MozTransition': 'transitionend',
	                    'WebkitTransition': 'webkitTransitionEnd'
	                };
	
	                for (t in transitions) {
	                    if (this._node.style[t] !== undefined) {
	                        return transitions[t];
	                    }
	                }
	            }
	
	            return null;
	        }
	    }, {
	        key: '_onTransitionEnd',
	        value: function _onTransitionEnd(evt) {
	            if (evt.propertyName === 'opacity') {
	                this._node.removeEventListener(this._transitionEndEvent, this._onTransitionEnd);
	                if (typeof this.onHidden === 'function') {
	                    this.onHidden(this);
	                }
	            }
	        }
	    }]);
	
	    return Toast;
	}();
	
	Toaster.AlertTypes = {
	    SUCCESS: 'success',
	    INFO: 'info',
	    WARNING: 'warning',
	    DANGER: 'danger'
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if (typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if (content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if (false) {
		// When the styles change, update the <style> tags
		if (!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./toaster.css", function () {
				var newContent = require("!!./../node_modules/css-loader/index.js!./toaster.css");
				if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function () {
			update();
		});
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".toasts {\n  position: fixed;\n  z-index: 10000;\n  left: 50%;\n  top: 0;\n  text-align: center; }\n  .toasts .toast-wrapper {\n    margin-right: auto;\n    margin-bottom: 10px;\n    margin-left: auto;\n    transition: all 0.5s ease; }\n    .toasts .toast-wrapper.hide {\n      margin-top: -20px;\n      opacity: 0; }\n  .toasts .toast {\n    display: inline-block;\n    margin: 0 auto;\n    padding: 5px 10px;\n    border-radius: 14px;\n    padding: 15px;\n    border: 1px solid transparent;\n    border-radius: 5px; }\n    .toasts .toast p {\n      margin: 0; }\n    .toasts .toast > p,\n    .toasts .toast > ul {\n      margin-bottom: 0; }\n    .toasts .toast > p + p {\n      margin-top: 5px; }\n    .toasts .toast p, .toasts .toast a {\n      display: inline-block; }\n    .toasts .toast a {\n      text-decoration: none;\n      margin-left: 5px; }\n    .toasts .toast.success {\n      background-color: #dff0d8;\n      border-color: #d0e9c6;\n      color: #3c763d; }\n      .toasts .toast.success hr {\n        border-top-color: #c1e2b3; }\n      .toasts .toast.success .toast-link {\n        color: #2b542c; }\n    .toasts .toast.info {\n      background-color: #d9edf7;\n      border-color: #bcdff1;\n      color: #31708f; }\n      .toasts .toast.info hr {\n        border-top-color: #a6d5ec; }\n      .toasts .toast.info .toast-link {\n        color: #245269; }\n    .toasts .toast.warning {\n      background-color: #fcf8e3;\n      border-color: #faf2cc;\n      color: #8a6d3b; }\n      .toasts .toast.warning hr {\n        border-top-color: #f7ecb5; }\n      .toasts .toast.warning .toast-link {\n        color: #66512c; }\n    .toasts .toast.danger {\n      background-color: #f2dede;\n      border-color: #ebcccc;\n      color: #a94442; }\n      .toasts .toast.danger hr {\n        border-top-color: #e4b9b9; }\n      .toasts .toast.danger .toast-link {\n        color: #843534; }\n  .toasts .toast-link {\n    font-weight: bold; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0b2FzdGVyLmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIudG9hc3RzIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxMDAwMDtcbiAgbGVmdDogNTAlO1xuICB0b3A6IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxuICAudG9hc3RzIC50b2FzdC13cmFwcGVyIHtcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlOyB9XG4gICAgLnRvYXN0cyAudG9hc3Qtd3JhcHBlci5oaWRlIHtcbiAgICAgIG1hcmdpbi10b3A6IC0yMHB4O1xuICAgICAgb3BhY2l0eTogMDsgfVxuICAudG9hc3RzIC50b2FzdCB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gICAgcGFkZGluZzogMTVweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7IH1cbiAgICAudG9hc3RzIC50b2FzdCBwIHtcbiAgICAgIG1hcmdpbjogMDsgfVxuICAgIC50b2FzdHMgLnRvYXN0ID4gcCxcbiAgICAudG9hc3RzIC50b2FzdCA+IHVsIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7IH1cbiAgICAudG9hc3RzIC50b2FzdCA+IHAgKyBwIHtcbiAgICAgIG1hcmdpbi10b3A6IDVweDsgfVxuICAgIC50b2FzdHMgLnRvYXN0IHAsIC50b2FzdHMgLnRvYXN0IGEge1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XG4gICAgLnRvYXN0cyAudG9hc3QgYSB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBtYXJnaW4tbGVmdDogNXB4OyB9XG4gICAgLnRvYXN0cyAudG9hc3Quc3VjY2VzcyB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGZmMGQ4O1xuICAgICAgYm9yZGVyLWNvbG9yOiAjZDBlOWM2O1xuICAgICAgY29sb3I6ICMzYzc2M2Q7IH1cbiAgICAgIC50b2FzdHMgLnRvYXN0LnN1Y2Nlc3MgaHIge1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAjYzFlMmIzOyB9XG4gICAgICAudG9hc3RzIC50b2FzdC5zdWNjZXNzIC50b2FzdC1saW5rIHtcbiAgICAgICAgY29sb3I6ICMyYjU0MmM7IH1cbiAgICAudG9hc3RzIC50b2FzdC5pbmZvIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7XG4gICAgICBib3JkZXItY29sb3I6ICNiY2RmZjE7XG4gICAgICBjb2xvcjogIzMxNzA4ZjsgfVxuICAgICAgLnRvYXN0cyAudG9hc3QuaW5mbyBociB7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6ICNhNmQ1ZWM7IH1cbiAgICAgIC50b2FzdHMgLnRvYXN0LmluZm8gLnRvYXN0LWxpbmsge1xuICAgICAgICBjb2xvcjogIzI0NTI2OTsgfVxuICAgIC50b2FzdHMgLnRvYXN0Lndhcm5pbmcge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZjhlMztcbiAgICAgIGJvcmRlci1jb2xvcjogI2ZhZjJjYztcbiAgICAgIGNvbG9yOiAjOGE2ZDNiOyB9XG4gICAgICAudG9hc3RzIC50b2FzdC53YXJuaW5nIGhyIHtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2Y3ZWNiNTsgfVxuICAgICAgLnRvYXN0cyAudG9hc3Qud2FybmluZyAudG9hc3QtbGluayB7XG4gICAgICAgIGNvbG9yOiAjNjY1MTJjOyB9XG4gICAgLnRvYXN0cyAudG9hc3QuZGFuZ2VyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmRlZGU7XG4gICAgICBib3JkZXItY29sb3I6ICNlYmNjY2M7XG4gICAgICBjb2xvcjogI2E5NDQ0MjsgfVxuICAgICAgLnRvYXN0cyAudG9hc3QuZGFuZ2VyIGhyIHtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2U0YjliOTsgfVxuICAgICAgLnRvYXN0cyAudG9hc3QuZGFuZ2VyIC50b2FzdC1saW5rIHtcbiAgICAgICAgY29sb3I6ICM4NDM1MzQ7IH1cbiAgLnRvYXN0cyAudG9hc3QtbGluayB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cbiJdLCJmaWxlIjoidG9hc3Rlci5jc3MiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ== */\n", ""]);
	
	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=toaster.js.map