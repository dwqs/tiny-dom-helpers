[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![build pass](https://api.travis-ci.org/dwqs/tiny-dom-helpers.svg?branch=master)](https://travis-ci.org/dwqs/tiny-dom-helpers) ![npm-version](https://img.shields.io/npm/v/tiny-dom-helpers.svg) ![license](https://img.shields.io/npm/l/tiny-dom-helpers.svg) ![bower-license](https://img.shields.io/bower/l/tiny-dom-helpers.svg)

# tiny-dom-helpers
Tiny dom helpers, only supports IE9+.

## Installation
Install the pkg with npm:
```
npm install tiny-dom-helpers --save
```
or yarn
```
yarn add tiny-dom-helpers
```
or bower
```
bower install tiny-dom-helpers
```
You can also hot-link the CDN version: https://unpkg.com/tiny-dom-helpers/dist/index.js, `tinyDOM` is exposed to `window` object.

## Usage
If we have some dom elements as follows:

```html
<body>
    <div id="div" style="position: relative">
        <p>
            <div id="test">33333</div>
            11111
            <span id='span' class="test1 test2">Hello</span> 
            000
            <span id="span2">22222</span>    
        </p>    
    </div> 
</body>    
```

```
import { css, offset, createTinyDOM } from 'tiny-dom-helpers';

// get dom element
let span = document.getElementById('span');
let s = createTinyDOM(span);

s.toArray(); 
// => ['test1', 'test2']

s.addClass('tt t2')
s.toArray(); 
// => ['test1', 'test2', 'tt', 't2']

s.removeClass('test2 t2')
// or s.removeClass(/2/);
s.toArray(); 
// => ['test1', 'tt']

s.toggle('rr')
s.toggle('tt')
s.toArray(); 
// => ['test1', 'rr']

s.hasClass('rr')
// => true

s.next();
// => the next element of span, eg: span#test

s.parent();
// => the parent element of span, eg: p

s.offsetParent();
// => the closest positioned element of span, eg: div#div

s.previous();
// => the previous element of span, eg: div#div2

css(span, 'width', null)
// => span's width, eg: 20px

css(span, 'font-size', ":after")
// => eg: 10px

offset(span)
// => the position of span relative to ducument. eg: {top: 100, left: 100, width: 10, height: 20}
```

## API
#### css(node, properyty, pseudoEle = null)
Return the css properyty of node or node's pseudo-element.

#### offset(node)
Return the size and position of the element's bounding box, relative to the document.

#### createTinyDOM(node)
Return an instance of TinyDOM.

#### .toArray()
Return an array of the class names on the element.

#### .hasClass(class)
Check whether the element has the given class and return a boolean.

#### .addClass(class)
Add the given class in the class list if it doesn't exist and return the instance. 

#### .removeClass(class|regexp)
Remove the given class in the class list if it's already exist and return the instance.

#### .toggle(class)
Toggle the given class in the class list and return the instance.

#### .replaceClass(oldClass, newClass)
Replaces an existing class with a new class and return the instance.

#### .text(text = '')
Text's getter/setter of the element and return the text. 

#### .attr(prop, value = '')
Attributes' getter/setter of the element and return the prop value. 

#### .getNodeName()
Return the node name of the element.

#### .width(pseduo-element=null)
Return the width of the element or it's pseudo-elements.

#### .height(pseduo-element=null)
Return the height of the element or it's pseudo-elements.

#### .rect()
Return the size and position of the element's bounding box, relative to the viewport.

#### .offsetParent()
Return the object which is the closest positioned containing element.

#### .positions()
Return the size and position of the element's bounding box, relative to the offsetParent.

#### .previous()
Return the previous HTMLElment of the element.

#### .next()
Return the next HTMLElment of the element.

#### .parent()
Return the parent HTMLElment of the element.

#### .contains(node)
Check whether the given node is the element's children and return a boolean.

### LICENSE
MIT
