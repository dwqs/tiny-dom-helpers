import checkToken from './check-token';

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

    if (!document.contains(node)) {
        return null;
    }

    if (!pseudoEle || ![':after', '::after', ':before', '::before'].includes(pseudoEle)) {
        pseudoEle = null;
    }

    return document.defaultView.getComputedStyle(node, pseudoEle).getPropertyValue(property);
}
