(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.tinyDom = {})));
}(this, (function (exports) { 'use strict';

var ownerDocument = function ownerDocument(node) {
    return node && node.ownerDocument || document;
};
var ownerWindow = function ownerDocument(node) {
    return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : window;
};
var checkToken = function checkToken(token, method) {
    var isAllowSpace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var m = method || 'a method';
    if (typeof token !== 'string') {
        throw new TypeError('[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' + 'the token provided (\'' + token + '\') is not a string.');
    }
    if (token === '') {
        throw new SyntaxError('[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' + 'the token provided must not be empty.');
    }
    if (!isAllowSpace && /\s/.test(token)) {
        throw new Error('[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' + 'the token provided (\'' + token + '\') contains HTML space ' + 'characters, which are not valid in tokens.');
    }
};

function css(node, properyty) {
    var pseudoEle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    checkToken(properyty, 'css');
    var doc = ownerDocument(node);
    if (!doc.contains(node)) {
        return null;
    }
    if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
        pseudoEle = null;
    }
    return doc.defaultView.getComputedStyle(node, pseudoEle).getPropertyValue(properyty);
}

function offset(node) {
    var doc = ownerDocument(node);
    var win = ownerWindow(doc);
    var box = { top: 0, left: 0, height: 0, width: 0 };
    var docElem = doc && doc.documentElement;
    if (!doc || !docElem.contains(node) || !node || node.nodeType !== 1) {
        return box;
    }
    box = node.getBoundingClientRect();
    var scrollTop = win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
    var scrollLeft = win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
    var clientTop = doc.documentElement.clientTop || doc.body.clientTop;
    var clientLeft = doc.documentElement.clientLeft || doc.body.clientLeft;
    box = {
        top: box.top + (scrollTop || 0) - (clientTop || 0),
        left: box.left + (scrollLeft || 0) - (clientLeft || 0),
        width: (box.width ? box.width : node.offsetWidth) || 0,
        height: (box.height ? box.height : node.offsetHeight) || 0
    };
    return box;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var TinyDOM = function () {
    function TinyDOM(el) {
        _classCallCheck(this, TinyDOM);
        this.el = el;
        this.classList = el.classList;
    }
    _createClass(TinyDOM, [{
        key: 'toArray',
        value: function toArray() {
            var str = (this.el.getAttribute('class') || '').replace(/^\s+|\s+$/g, '');
            var classes = str.split(/\s+/);
            if (classes[0] === '') {
                classes.shift();
            }
            return classes;
        }
    }, {
        key: 'hasClass',
        value: function hasClass(cls) {
            checkToken(cls, 'hasClass', false);
            var curClasses = this.toArray();
            return curClasses.includes(cls);
        }
    }, {
        key: 'addClass',
        value: function addClass(cls) {
            checkToken(cls, 'addClass', true);
            var curClasses = this.toArray();
            var classes = cls.split(' ');
            for (var i = 0; i < classes.length; i++) {
                var clsName = classes[i];
                if (!clsName) {
                    continue;
                }
                if (this.classList) {
                    this.classList.add(clsName);
                } else {
                    if (!this.hasClass(clsName)) {
                        curClasses.push(clsName);
                    }
                }
            }
            if (!this.classList) {
                this.el.setAttribute('class', curClasses.join(' '));
            }
            return this;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(cls) {
            var _curClasses = [];
            if (Object.prototype.toString.call(cls) === '[object RegExp]') {
                var curClasses = this.toArray();
                for (var i = 0; i < curClasses.length; i++) {
                    if (cls.test(curClasses[i])) {
                        this.removeClass(curClasses[i]);
                    }
                }
            } else {
                checkToken(cls, 'removeClass', true);
                var _curClasses2 = this.toArray();
                var classes = cls.split(' ');
                for (var _i = 0; _i < classes.length; _i++) {
                    var clsName = classes[_i];
                    if (!clsName) {
                        continue;
                    }
                    if (this.classList) {
                        this.classList.remove(clsName);
                    } else {
                        if (this.hasClass(clsName)) {
                            _curClasses2.splice(_curClasses2.indexOf(clsName), 1);
                        }
                    }
                    _curClasses = _curClasses2;
                }
                _curClasses = _curClasses2;
            }
            if (!this.classList) {
                this.el.setAttribute('class', _curClasses.join(' '));
            }
            return this;
        }
    }, {
        key: 'toggle',
        value: function toggle(cls) {
            checkToken(cls, 'toggle');
            if (this.classList) {
                this.classList.toggle(cls);
                return this;
            }
            if (this.hasClass(cls)) {
                this.removeClass(cls);
            } else {
                this.addClass(cls);
            }
            return this;
        }
    }, {
        key: 'replaceClass',
        value: function replaceClass(oldClass, newClass) {
            checkToken(oldClass, 'replaceClass');
            checkToken(newClass, 'replaceClass');
            if (!this.hasClass(oldClass)) {
                return this;
            }
            var curClasses = this.toArray();
            if (this.classList && typeof this.classList.replace === 'function') {
                this.classList.replace(oldClass, newClass);
            } else {
                if (this.hasClass(newClass)) {
                    curClasses.splice(curClasses.indexOf(oldClass), 1);
                } else {
                    curClasses.splice(curClasses.indexOf(oldClass), 1, newClass);
                }
            }
            if (!(this.classList && typeof this.classList.replace === 'function')) {
                this.el.setAttribute('class', curClasses.join(' '));
            }
            return this;
        }
    }, {
        key: 'attr',
        value: function attr(prop) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            checkToken(prop, 'attr');
            if (!value) {
                return this.el.getAttribute(prop);
            }
            this.el.setAttribute(prop, value);
            return value;
        }
    }, {
        key: 'text',
        value: function text() {
            var _text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            if (!_text || !['string', 'number', 'boolean'].includes(typeof _text === 'undefined' ? 'undefined' : _typeof(_text))) {
                return this.el.innerText;
            }
            this.el.innerText = _text;
            return _text;
        }
    }, {
        key: 'getNodeName',
        value: function getNodeName() {
            return this.el.nodeName && this.el.nodeName.toLocaleLowerCase();
        }
    }, {
        key: 'width',
        value: function width(pseudoEle) {
            if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
                pseudoEle = null;
            }
            return css(this.el, 'width', pseudoEle);
        }
    }, {
        key: 'height',
        value: function height(pseudoEle) {
            if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
                pseudoEle = null;
            }
            return css(this.el, 'height', pseudoEle);
        }
    }, {
        key: 'rect',
        value: function rect() {
            return this.el.getBoundingClientRect();
        }
    }, {
        key: 'offsetParent',
        value: function offsetParent() {
            var offsetParent = this.el.offsetParent;
            var doc = ownerDocument(this.el);
            while (offsetParent && this.getNodeName() !== 'body' && css(offsetParent, 'position') === 'static') {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || doc.body;
        }
    }, {
        key: 'positions',
        value: function positions() {
            var parentOffset = { top: 0, left: 0 };
            var position = {};
            var offsetParent = this.offsetParent();
            var doc = ownerDocument(this.el);
            var win = ownerWindow(doc);
            if (css(this.el, 'position') === 'fixed') {
                position = this.rect();
            } else {
                position = offset(this.el);
                if (offsetParent && offsetParent.nodeName.toLocaleLowerCase() !== 'body') {
                    parentOffset = offset(offsetParent);
                    var scrollTop = win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
                    var scrollLeft = win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
                    parentOffset.top += parseInt(css(offsetParent, 'borderTopWidth'), 10) - scrollTop || 0;
                    parentOffset.left += parseInt(css(offsetParent, 'borderLeftWidth'), 10) - scrollLeft || 0;
                }
            }
            return {
                width: position.width,
                height: position.height,
                top: position.top - parentOffset.top - (parseInt(css(this.el, 'marginTop'), 10) || 0),
                left: position.left - parentOffset.left - (parseInt(css(this.el, 'marginLeft'), 10) || 0)
            };
        }
    }, {
        key: 'previous',
        value: function previous() {
            var _el = this.el;
            if (_el.previousElementSibling) {
                return _el.previousElementSibling;
            }
            while (_el) {
                _el = _el.previousSibling;
                if (_el.nodeType === 1) {
                    return _el;
                }
            }
            return null;
        }
    }, {
        key: 'next',
        value: function next() {
            var _el = this.el;
            if (_el.nextElementSibling) {
                return _el.nextElementSibling;
            }
            while (_el) {
                _el = _el.nextSibling;
                if (_el.nodeType === 1) {
                    return _el;
                }
            }
            return null;
        }
    }, {
        key: 'parent',
        value: function parent() {
            if (this.el.parentElement) {
                return this.el.parentElement;
            }
            return this.el.parentNode ? this.el.parentNode : null;
        }
    }, {
        key: 'contains',
        value: function contains(childNode) {
            if (!childNode || childNode.nodeType !== 1) {
                return false;
            }
            return this.el.contains(childNode);
        }
    }]);
    return TinyDOM;
}();
var createTinyDOM = function createTinyDOM(el) {
    if (!el || el.nodeType !== 1) {
        throw new Error('[tiny-dom-helpers]: A DOM Element reference is required');
    }
    return new TinyDOM(el);
};

exports.createTinyDOM = createTinyDOM;
exports.css = css;
exports.offset = offset;

Object.defineProperty(exports, '__esModule', { value: true });

})));
