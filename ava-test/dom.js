import { JSDOM } from 'jsdom';

const domString = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Test</title>
            <style type="text/css">
                *{
                    box-sizing: border-box
                }
                .p {
                    margin: 10px;
                    padding: 10px
                }
                .test{
                    color: red;
                    width: 50px;
                    height: 100px;
                }
                .test2{
                    color: blue;
                    font-size: 14px
                }
                .span{
                    border: 1px solid red;
                    display: inline-block;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }
                .div{
                    position: relative;
                    height: 100px;
                    width: 100px;
                    background: blue
                }
                .abtest{
                    position: fixed;
                    height: 200px;
                    width: 200px;
                    background: red
                }
            </style>
        </head>
        <body>
            <h2>this is h2 element.</h2>
            this is a text node.
            <p class="test p">test content</p>
            this is a text node.
            <span class="span">this is a span element</span>
            <div class="div" id="div">
                <div>
                    <p>
                        <span id="hello"> hello, span</span>
                    </p>
                </div>
            </div>
            <p>
                <div class="abtest"></div>
            </p>
        </body>
    </html>
`;

const dom = new JSDOM(domString);
export const window = dom.window;
export const document = window.document;
