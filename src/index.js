import css from './css';
import offset from './offset';
import { ownerDocument, ownerWindow, checkToken } from './helper';

export { default as css } from './css';
export { default as offset } from './offset';

class TinyDOM {
    /**
     * Creates an instance of TinyDOM.
     * @param {HTMLElement} el 
     * @memberof TinyDOM
     */
    constructor (el) {
        this.el = el;
        this.classList = el.classList;
    }

    /**
     * Return an array of the class names on the element.
     * @returns {Array}
     * @memberof TinyDOM
     */
    toArray () {
        let str = (this.el.getAttribute('class') || '').replace(/^\s+|\s+$/g, '');
        let classes = str.split(/\s+/);
        if (classes[0] === '') {
            classes.shift();
        }
        return classes;
    }

    /**
     * Check whether the element has the given class.
     * 
     * @param {HTMLElement} el 
     * @param {string} cls 
     * @returns {Boolean}
     * @memberof TinyDOM
     */
    hasClass (cls) {
        checkToken(cls, 'hasClass', false);
        let curClasses = this.toArray();
        return curClasses.includes(cls);
    }

    /**
     * Add the given class in the class list if it doesn't exist.
     * @param {string} cls 
     * @returns {Object}
     * @memberof TinyDOM
     */
    addClass (cls) {
        checkToken(cls, 'addClass', true);

        let curClasses = this.toArray();
        let classes = cls.split(' ');

        for (let i = 0; i < classes.length; i++) {
            let clsName = classes[i];
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

    /**
     * Remove the given class in the class list if it's already exist.
     * 
     * @param {string|regexp} cls 
     * @returns {Object}
     * @memberof TinyDOM
     */
    removeClass (cls) {
        let _curClasses = [];

        if (Object.prototype.toString.call(cls) === '[object RegExp]') {
            let curClasses = this.toArray();
            for (let i = 0; i < curClasses.length; i++) {
                if (cls.test(curClasses[i])) {
                    this.removeClass(curClasses[i]);
                }
            }
        } else {
            checkToken(cls, 'removeClass', true);
            let curClasses = this.toArray();
            let classes = cls.split(' ');

            for (let i = 0; i < classes.length; i++) {
                let clsName = classes[i];
                if (!clsName) {
                    continue;
                }
                if (this.classList) {
                    this.classList.remove(clsName);
                } else {
                    if (this.hasClass(clsName)) {
                        curClasses.splice(curClasses.indexOf(clsName), 1);
                    }
                }
                _curClasses = curClasses;
            }
            _curClasses = curClasses;
        }

        if (!this.classList) {
            this.el.setAttribute('class', _curClasses.join(' '));
        }

        return this;        
    }

    /**
     * Toggle the given class in the class list.
     * 
     * @param {string} cls 
     * @param {boolean} force 
     * @returns {Object}
     * @memberof TinyDOM
     */
    toggle (cls) {
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

    /**
     * Replaces an existing class with a new class.
     * 
     * @param {string} oldClass 
     * @param {string} newClass 
     * @returns {Object}
     * @memberof TinyDOM
     */
    replaceClass (oldClass, newClass) {
        checkToken(oldClass, 'replaceClass');
        checkToken(newClass, 'replaceClass');

        if (!this.hasClass(oldClass)) {
            return this;  
        }

        let curClasses = this.toArray();
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

    /**
     * Attributes' getter/setter of the element. 
     * 
     * @param {string} prop 
     * @param {any} [value=''] 
     * @returns {Object}
     * @memberof TinyDOM
     */
    attr (prop, value = '') {
        checkToken(prop, 'attr');
        if (!value) {
            return this.el.getAttribute(prop);
        } 
        return value;
    }

    /**
     * Return the node name of the element.
     * 
     * @returns {String}
     * @memberof TinyDOM
     */
    getNodeName () {
        return this.el.nodeName && this.el.nodeName.toLocaleLowerCase();
    }

    /**
     * Return the width of the element or it's pseudo-elements.
     * 
     * @param {string} pseudoEle
     * @returns {String}
     * @memberof TinyDOM
     */
    width (pseudoEle) {
        if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
            pseudoEle = null;
        }
        return css(this.el, 'width', pseudoEle);
    }

    /**
     * Return the height of the element or it's pseudo-elements.
     * 
     * @param {string} pseudoEle
     * @returns {String}
     * @memberof TinyDOM
     */
    height (pseudoEle) {
        if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
            pseudoEle = null;
        }
        return css(this.el, 'height', pseudoEle);
    }

    /**
     * Get the size and position of the element's bounding box, relative to the viewport.
     * 
     * @returns {Object}
     * @memberof TinyDOM
     */
    rect () {
        return this.el.getBoundingClientRect();
    }

    /**
     * Return the object which is the closest (nearest in the containment hierarchy) positioned containing element
     * 
     * @returns object
     * @memberof TinyDOM
     */
    offsetParent () {
        let offsetParent = this.el.offsetParent;
        let doc = ownerDocument(this.el);

        while (offsetParent && this.getNodeName() !== 'body' && css(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || doc.body;
    }

    /**
     * Get the size and position of the element's bounding box, relative to the offsetParent.
     * 
     * @returns {object}
     * @memberof TinyDOM
     */
    positions () {
        let parentOffset = { top: 0, left: 0 };
        let position = {};
        let offsetParent = this.offsetParent();

        // get owner document & window.
        let doc = ownerDocument(this.el);
        let win = ownerWindow(doc);

        if (css(this.el, 'position') === 'fixed') {
            position = this.rect();
        } else {
            position = offset(this.el);
            if (offsetParent && offsetParent.nodeName.toLocaleLowerCase() !== 'body') {
                parentOffset = offset(offsetParent);
                let scrollTop = win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
                let scrollLeft = win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
                parentOffset.top += (parseInt(css(offsetParent, 'borderTopWidth'), 10) - scrollTop) || 0;
                parentOffset.left += (parseInt(css(offsetParent, 'borderLeftWidth'), 10) - scrollLeft) || 0;
            }
        }

        return {
            width: position.width,
            height: position.height,
            top: position.top - parentOffset.top - (parseInt(css(this.el, 'marginTop'), 10) || 0),
            left: position.left - parentOffset.left - (parseInt(css(this.el, 'marginLeft'), 10) || 0)
        };
    }
    
    /**
     * Return the previous HTMLElment of the element.
     * 
     * @returns {HTMLElment | null}
     * @memberof TinyDOM
     */
    previous () {
        let _el = this.el;
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

    /**
     * Return the next HTMLElment of the element.
     * 
     * @returns {HTMLElment | null}
     * @memberof TinyDOM
     */
    next () {
        let _el = this.el;
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

    /**
     * Return the parent HTMLElment of the element.
     * 
     * @returns {HTMLElment | null}
     * @memberof TinyDOM
     */
    parent () {
        if (this.el.parentElement) {
            return this.el.parentElement;
        }
        return this.el.parentNode ? this.el.parentNode : null;
    }

    /**
     * Check whether the element is a descendant of a given node or not.
     * 
     * @param {HTMLElement} childNode 
     * @returns  boolean
     * @memberof TinyDOM
     */
    contains (childNode) {
        if (!childNode || childNode.nodeType !== 1) {
            return false;
        }
        return this.el.contains(childNode);
    }
}

export const createTinyDOM = (el) => {
    if (!el || el.nodeType !== 1) {
        throw new Error('[tiny-dom-helpers]: A DOM Element reference is required');
    }
    return new TinyDOM(el);
};
