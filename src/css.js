import { ownerDocument, checkToken } from './helper';

/**
 * Return finally given node css property. 
 * 
 * @param {HTMLElement} node 
 * @param {string} properyty 
 * @param {string} pseudoEle 
 * @returns any
 */
export default function css (node, properyty, pseudoEle = null) {
    checkToken(properyty, 'css');
    let doc = ownerDocument(node);

    if (!doc.contains(node)) {
        return null;
    }

    if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
        pseudoEle = null;
    }

    return doc.defaultView.getComputedStyle(node, pseudoEle).getPropertyValue(properyty);
}
