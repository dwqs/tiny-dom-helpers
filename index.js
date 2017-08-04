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
    ToArray () {
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
     * @returns {String}
     * @memberof TinyDOM
     */
    width () {
        return document.defaultView.getComputedStyle(this.el).width;
    }

    /**
     * Return the height of the element.
     * 
     * @returns {String}
     * @memberof TinyDOM
     */
    height () {
        return document.defaultView.getComputedStyle(this.el).height;
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
}
