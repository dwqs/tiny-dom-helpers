/**
 * Return node owner document
 * 
 * @param {HTMLElement} node 
 * @returns document
 */
export const ownerDocument = function ownerDocument (node) {
    return (node && node.ownerDocument) || document;
};

/**
 * Return node owner window
 * 
 * @param {HTMLElement} node 
 * @returns Window
 */
export const ownerWindow = function ownerDocument (node) {
    return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : window;
};

/**
 * Throw a error if not meet the condition
 * 
 * @param {string} token 
 * @param {string} method 
 * @param {boolean} isAllowSpace 
 */
export const checkToken = function checkToken (token, method, isAllowSpace = false) {
    let m = method || 'a method';

    if (typeof token !== 'string') {
        throw new TypeError(
            '[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided (\'' + token + '\') is not a string.'
        );
    }

    if (token === '') {
        throw new SyntaxError(
            '[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided must not be empty.'
        );
    }

    if (!isAllowSpace && /\s/.test(token)) {
        throw new Error(
            '[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided (\'' + token + '\') contains HTML space ' +
            'characters, which are not valid in tokens.'
        );
    }
};
