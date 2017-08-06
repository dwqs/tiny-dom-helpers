import { css, offset, createTinyDOM } from '../src/index';

let dom = null;

describe('get pseudo-elements\' width & height', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['karma-test/dom.html'];
        let p = document.querySelector('.test');
        dom = createTinyDOM(p);
    });
    
    it('the width should be equal', () => {
        expect(dom.width(':after')).to.equal('40px');
        expect(dom.width('::after')).to.equal('40px');
        expect(dom.width('::before')).to.equal('20px');
        expect(dom.width(':before')).to.equal('20px');
    });

    it('the height should be equal', () => {
        expect(dom.height(':after')).to.equal('20px');
        expect(dom.height('::after')).to.equal('20px');
        expect(dom.height('::before')).to.equal('10px');
        expect(dom.height(':before')).to.equal('10px');
    });
});