import test from 'ava';

import { window, document } from './dom';
import { css, offset, createTinyDOM } from '../src/index';

const p = document.querySelector('.test');
const span = document.querySelector('.span');
const text = p.nextSibling;

let dom = createTinyDOM(p);
let s = createTinyDOM(span);

test.beforeEach(t => {
    p.className = 'test p';
    span.className = 'span';
});

test('The parameter of createTinyDOM must be a DOM Element', (t) => {
    t.plan(7);

    const error = t.throws(() => {
        createTinyDOM();
    }, Error);

    const error2 = t.throws(() => {
        createTinyDOM('test');
    }, Error);

    const error3 = t.throws(() => {
        createTinyDOM(text);
    }, Error);

    t.true(error2.message.includes('DOM Element'));
    t.true(error instanceof Error);
    t.true(error3.message.includes('DOM Element'));
    t.true(dom.el.nodeType === 1);
});

test('el property of instance', (t) => {
    t.plan(2);

    t.deepEqual(p, dom.el);
    t.deepEqual(span, s.el);
});

test('Return an array of the class names on the element', (t) => {
    t.plan(1);
    t.deepEqual([ 'test', 'p' ], dom.toArray());
});

test('Check whether the element has the given class', (t) => {
    t.plan(7);

    const error = t.throws(() => {
        dom.hasClass(2);
    }, Error);
    const error2 = t.throws(() => {
        dom.hasClass('');
    }, Error);

    t.false(dom.hasClass('ppp'));
    t.true(dom.hasClass('test'));
    t.true(dom.hasClass('p'));
    t.true(error.message.includes('not a string'));
    t.true(error2.message.includes('not be empty'));
});

test('Add the given class in the class list if it doesn\'t exist', (t) => {
    t.plan(8);

    t.true(dom.hasClass('test'));
    t.false(dom.hasClass('ppp'));

    let v = dom.addClass('test ppp');

    t.true(dom.hasClass('ppp'));
    t.deepEqual([ 'test', 'p', 'ppp' ], dom.toArray());
    t.deepEqual(dom, v);

    s.classList = null;

    t.false(s.hasClass('t'));
    t.true(s.hasClass('span'));

    s.addClass('t t1');

    t.deepEqual([ 'span', 't', 't1' ], s.toArray());
});

test('Remove the given class in the class list if it\'s already exist.', (t) => {
    t.plan(10);

    t.true(dom.hasClass('test'));
    t.false(dom.hasClass('ppp'));

    dom.addClass('ppp');

    t.true(dom.hasClass('ppp'));

    dom.removeClass('test ppp');

    t.false(dom.hasClass('test'));
    t.false(dom.hasClass('ppp'));

    s.classList = null;

    t.true(s.hasClass('span'));

    s.removeClass('span');

    t.false(s.hasClass('span'));

    let v = s.addClass('span1 span2 span3');

    t.deepEqual([ 'span1', 'span2', 'span3' ], s.toArray());

    s.removeClass(/span/);

    t.deepEqual([], s.toArray());
    t.deepEqual(s, v);
});

test('Toggle the given class in the class list. Optionally force state via force', (t) => {
    t.plan(5);

    t.true(dom.hasClass('test'));

    dom.toggle('test');

    t.false(dom.hasClass('test'));

    s.classList = null;

    t.false(s.hasClass('test'));

    let v = s.toggle('test');

    t.true(s.hasClass('test'));
    t.deepEqual(s, v);
});

test('Replaces an existing class with a new class', (t) => {
    t.plan(7);

    t.true(dom.hasClass('test'));
    t.false(dom.hasClass('pppp'));

    let v = dom.replaceClass('test', 'pppp');

    t.false(dom.hasClass('test'));
    t.true(dom.hasClass('pppp'));
    t.deepEqual(dom, v);

    s.classList = null;

    t.true(s.hasClass('span'));

    s.removeClass('span', 'span');

    t.false(s.hasClass('span'));
});

test('Attributes\' getter/setter of the element', (t) => {
    t.plan(3);

    t.is('span', s.el.getAttribute('class'));

    let v = s.attr('class', 't1 t2');

    t.is('t1 t2', s.el.getAttribute('class'));
    t.deepEqual(s, v);
});

test('Return the node name of the element', (t) => {
    t.plan(2);

    t.is('span', s.getNodeName());
    t.is('p', dom.getNodeName());
});

test('Return the element\'s bounding box', (t) => {
    t.plan(1);

    t.deepEqual(p.getBoundingClientRect(), dom.rect());
});

test('Return the previous element', (t) => {
    t.plan(1);

    let item = document.querySelector('h2');

    t.deepEqual(dom.previous(), item);
});

test('Return the next element', (t) => {
    t.plan(1);

    let item = document.querySelector('.span');

    t.deepEqual(dom.previous(), item);
});

test('Return the parent element', (t) => {
    t.plan(1);

    let span = document.querySelector('#hello');
    let p = document.querySelector('#div p');
    let s = createTinyDOM(span);

    t.deepEqual(s.parent(), p);
});

test('Check whether the element is a descendant of a given node or not', (t) => {
    t.plan(3);

    let span = document.querySelector('#hello');
    let div = document.querySelector('#div');
    let s = createTinyDOM(span);
    let d = createTinyDOM(div);

    t.false(s.contains(div));
    t.false(dom.contains(div));
    t.true(d.contains(span));
});
