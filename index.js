import checkToken from './check-token';

export default function tinyDOM (el) {
    if (!el || el.nodeType !== 1) {
        throw new Error('A DOM Element reference is required');
    }
    return new TinyDOM(el);
}

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
            }
        }

        if (!this.classList) {
            this.el.setAttribute('class', curClasses.join(' '));
        }

        return this;        
    }

    /**
     * Toggle the given class in the class list. Optionally force state via force.
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
            this.el.getAttribute(prop);
        } else {
            this.el.setAttribute(prop, value);
        }

        return this;
    }

    /**
     * Return the node name of the element.
     * 
     * @returns {String}
     * @memberof TinyDOM
     */
    getNodeName () {
        return this.el.nodeName && this.el.nodeName.toLowerCase();
    }

    /**
     * Return the width of the element.
     * 
     * @param {string}
     * @returns {String}
     * @memberof TinyDOM
     */
    width (pseudoEle) {
        if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
            pseudoEle = null;
        }
        return document.defaultView.getComputedStyle(this.el, pseudoEle).getPropertyValue('width');
    }

    /**
     * Return the height of the element.
     * 
     * @param {string}
     * @returns {String}
     * @memberof TinyDOM
     */
    height (pseudoEle) {
        if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
            pseudoEle = null;
        }
        return document.defaultView.getComputedStyle(this.el, pseudoEle).getPropertyValue('height');
    }

    /**
     * Return finally given node css property. 
     * 
     * @param {HTMLElement} node 
     * @param {string} property 
     * @returns null | string
     * @memberof TinyDOM
     */
    css (node, property, pseudoEle) {
        checkToken(property, 'css');

        if (!document.contains(node)) {
            return null;
        }

        if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
            pseudoEle = null;
        }
        return document.defaultView.getComputedStyle(node, pseudoEle).getPropertyValue(property);
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
     * Get the size and position of the element's bounding box, relative to the document.
     * 
     * @param {HTMLElement} node 
     * @returns {Object}
     * @memberof TinyDOM
     */
    offset (node) {
        let box = { top: 0, left: 0, height: 0, width: 0 };
        let docElem = document.documentElement;

        if (!document.contains(node)) {
            return box;
        }

        box = node.getBoundingClientRect();
        box = {
            top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
            width: (box.width ? box.width : node.offsetWidth) || 0,
            height: (box.height ? box.height : node.offsetHeight) || 0
        };

        return box;
    }

    /**
     * Get the size and position of the element's bounding box, relative to the offsetParent.
     * 
     * @returns {Object}
     * @memberof TinyDOM
     */
    positions () {
        let parentOffset = { top: 0, left: 0 };
        let offset = {};
        let offsetParent = this.offsetParent();

        if (this.css(this.el, 'position') === 'fixed') {
            offset = this.el.rect();
        } else {
            offset = this.offset(this.el);
            if (offsetParent.nodeName.toLocaleLowerCase() !== 'html') {
                parentOffset = this.offset(offsetParent);
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                parentOffset.top += (parseInt(this.css(offsetParent, 'borderTopWidth'), 10) - scrollTop) || 0;
                parentOffset.left += (parseInt(this.css(offsetParent, 'borderLeftWidth'), 10) - scrollLeft) || 0;
            }
        }

        return {
            ...offset,
            top: offset.top - parentOffset.top - (parseInt(this.css(this.el, 'marginTop'), 10) || 0),
            left: offset.left - parentOffset.left - (parseInt(this.css(this.el, 'marginLeft'), 10) || 0)
        };
    }
    
    /**
     * Return the previous HTMLElment of the element.
     * 
     * @returns {HTMLElment} or {null}
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
     * @returns {HTMLElment} or {null}
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
     * @returns {HTMLElment} or {null}
     * @memberof TinyDOM
     */
    parent () {
        if (this.el.parentElement) {
            return this.el.parentElement;
        }
        return this.el.parentNode ? this.el.parentNode : null;
    }

    /**
     * Return the object which is the closest (nearest in the containment hierarchy) positioned containing element
     * 
     * @returns object
     * @memberof TinyDOM
     */
    offsetParent () {
        let offsetParent = this.el.offsetParent;

        while (offsetParent && this.getNodeName() !== 'html' && this.css(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || document.documentElement;
    }

    /**
     * Check whether the element is a descendant of a given node or not.
     * 
     * @param {HTMLElement} childNode 
     * @returns  boolean
     * @memberof TinyDOM
     */
    contains (childNode) {
        return this.el.contains(childNode);
    }
}
