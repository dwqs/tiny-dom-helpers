import test from 'ava';

import { window, document } from './dom';
import { css } from '../src/index';

const p = document.querySelector('.test');

test('should be return the width of element', (t) => {
    t.plan(1);

    t.is('50px', css(p, 'width', null));
});

test('should be return the height of element', (t) => {
    t.plan(1);

    t.is('100px', css(p, 'height', null));
});

test('should be return the color of element', (t) => {
    t.plan(1);

    t.is('red', css(p, 'color', null));
});
