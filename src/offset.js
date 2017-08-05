/**
 * Get the size and position of the element's bounding box, relative to the document.
 * 
 * @param {HTMLElement} node 
 * @returns {object}
 * @memberof TinyDOM
 */
export default function offset (node) {
    let doc = node.ownerDocument || document;
    let box = { top: 0, left: 0, height: 0, width: 0 };
    let docElem = doc && doc.documentElement;

    if (!doc || !docElem.contains(node)) {
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
