export default function checkToken (token, method, isAllowSpace = false) {
    let m = method || 'a method';
    if (typeof token !== 'string') {
        throw new TypeError(
            'Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided (\'' + token + '\') is not a string.'
        );
    }

    if (token === '') {
        throw new SyntaxError(
            'Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided must not be empty.'
        );
    }

    if (!isAllowSpace && /\s/.test(token)) {
        throw new Error(
            'Failed to execute \'' + method + '\' on \'TinyDOM\': ' +
            'the token provided (\'' + token + '\') contains HTML space ' +
            'characters, which are not valid in tokens.'
        );
    }
}
