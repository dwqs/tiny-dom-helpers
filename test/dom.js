import { JSDOM } from 'jsdom';

const domString = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Test</title>
            <style type="text/css">
                .test{
                    color: red
                }
            </style>
        </head>
        <body>
            <p class="test">test content</p>
        </body>
    </html>
`;

const dom = new JSDOM(domString);
export const window = dom.window;
export const document = window.document;
