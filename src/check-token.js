export default function checkToken (token, method, isAllowSpace = false) {
    let m = method || 'a method';
    if (typeof token !== 'string') {
        throw new TypeError(
            '[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided (\'' + token + '\') is not a string.'
        );
    }

    if (token === '') {
        throw new SyntaxError(
            '[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided must not be empty.'
        );
    }

    if (!isAllowSpace && /\s/.test(token)) {
        throw new Error(
            '[tiny-dom-helpers]: Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided (\'' + token + '\') contains HTML space ' +
            'characters, which are not valid in tokens.'
        );
    }
}
