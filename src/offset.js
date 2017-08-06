import { ownerDocument, ownerWindow } from './helper';

/**
 * Get the size and position of the element's bounding box, relative to the document.
 * 
 * @param {HTMLElement} node 
 * @returns {object}
 * @memberof TinyDOM
 */
export default function offset (node) {
    let doc = ownerDocument(node);
    let win = ownerWindow(doc);
    let box = { top: 0, left: 0, height: 0, width: 0 };
    let docElem = doc && doc.documentElement;

    if (!doc || !docElem.contains(node) || !node || node.nodeType !== 1) {
        return box;
    }

    box = node.getBoundingClientRect();

    let scrollTop = win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
    let scrollLeft = win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
    let clientTop = doc.documentElement.clientTop || doc.body.clientTop;
    let clientLeft = doc.documentElement.clientLeft || doc.body.clientLeft;

    box = {
        top: box.top + (scrollTop || 0) - (clientTop || 0),
        left: box.left + (scrollLeft || 0) - (clientLeft || 0),
        width: (box.width ? box.width : node.offsetWidth) || 0,
        height: (box.height ? box.height : node.offsetHeight) || 0
    };

    return box;
}
