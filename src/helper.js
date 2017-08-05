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
