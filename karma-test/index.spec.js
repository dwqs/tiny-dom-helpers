import $ from 'jquery';

import { css, offset, createTinyDOM } from '../src/index';

let dom = null;

describe('text\'s getter/setter of the element', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['karma-test/dom.html'];
        let span = document.querySelector('.span');
        dom = createTinyDOM(span);
    });
    
    it('the text should be equal', () => {
        expect(dom.text()).to.equal('this is a span element');  
        expect(dom.text({})).to.equal('this is a span element');
        expect(dom.text('test text method')).to.equal('test text method');
        expect(dom.text(2222)).to.equal(2222);
        expect(dom.text(true)).to.equal(true);
    });
});

describe('width & height of the element', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['karma-test/dom.html'];
        let p = document.querySelector('.test');
        dom = createTinyDOM(p);
    });
    
    it('the width should be equal', () => {
        expect(dom.width()).to.equal('50px');
        expect(dom.width(':after')).to.equal('40px');
        expect(dom.width('::after')).to.equal('40px');
        expect(dom.width('::before')).to.equal('20px');
        expect(dom.width(':before')).to.equal('20px');
    });

    it('the height should be equal', () => {
        expect(dom.height()).to.equal('100px');
        expect(dom.height(':after')).to.equal('20px');
        expect(dom.height('::after')).to.equal('20px');
        expect(dom.height('::before')).to.equal('10px');
        expect(dom.height(':before')).to.equal('10px');
    });
});

describe('pseudo-elements', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['karma-test/dom.html'];
    });
    
    it('the content should be equal', () => {
        let p = document.querySelector('.test');

        expect(css(p, 'content', ':before')).to.equal('"before"');  
        expect(css(p, 'content', '::before')).to.equal('"before"');
        expect(css(p, 'content', ':after')).to.equal('"after"');
        expect(css(p, 'content', '::after')).to.equal('"after"');
    });
});

describe('offsetParent', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['karma-test/dom.html'];
        let p = document.querySelector('.test');
        dom = createTinyDOM(p);
    });
    
    it('should be handle default', () => {
        let closest = dom.offsetParent();

        expect(closest).to.equal(document.body);
    });

    it('should be handle relative', () => {
        let parent = document.querySelector('#div1');
        let span = document.querySelector('#hello');
        let s = createTinyDOM(span);
        let closest = s.offsetParent();

        expect(closest.id).to.equal('div1');
        expect(closest).to.equal(parent);
    });

    it('should be handle absolute', () => {
        let parent = document.querySelector('#div2');
        let p = parent.querySelector('#div2 p');
        let s = createTinyDOM(p);
        let closest = s.offsetParent();

        expect(closest.id).to.equal('div2');
        expect(closest).to.equal(parent);
    });

    it('should be handle fixed', () => {
        let span = document.querySelector('.abtest');
        let s = createTinyDOM(span);
        let closest = s.offsetParent();
        
        expect(closest).to.equal(document.body);
    });
});

describe('position relative to offsetParent', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['karma-test/dom.html'];
    });
    
    it('should be handle fixed position', () => {
        let span = document.querySelector('.abtest');
        let s = createTinyDOM(span);
        
        expect(s.positions()).to.deep.include($(span).position());
    });

    it('should be handle absolute position', () => {
        let item = document.getElementById('item-absolute');
        let s = createTinyDOM(item);

        expect(s.positions()).to.deep.include($(item).position());
    });
});

describe('offset', () => {
    beforeEach(() => {
        document.body.innerHTML = window.__html__['karma-test/dom.html'];
    });
    
    it('should be handle fixed position', () => {
        let span = document.querySelector('.abtest');
        let s = createTinyDOM(span);
        
        expect(offset(span)).to.deep.include($(span).position());
    });

    it('should be return zero when node is disconnected', () => {
        expect(offset(document.createElement('div')).top).to.be.equal(0);
        expect(offset(document.createElement('div')).left).to.be.equal(0);
        expect(offset(document.createElement('div')).width).to.be.equal(0);
        expect(offset(document.createElement('div')).height).to.be.equal(0);
    });

    it('should be handle absolute position', () => {
        let item = document.getElementById('offset');
        let pos = offset(item);

        expect(pos.top).to.be.equal(200);
        expect(pos.left).to.be.equal(150);
        expect(pos.width).to.be.equal(100);
        expect(pos.height).to.be.equal(50);
    });
});
