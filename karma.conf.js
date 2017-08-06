let path = require('path');

module.exports = config => {
    config.set({
        frameworks: ['mocha', 'chai'],
        basePath: '',
        files: [
            'karma-test/*.html',
            'test.js'
        ],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-html2js-preprocessor'
        ],
        reporters: ['progress', 'mocha'],
        singleRun: true,
        autoRun: true,
        mochaReporter: {
            colors: {
                success: 'blue',
                info: 'bgGreen',
                warning: 'cyan',
                error: 'bgRed'
            },
            symbols: {
                success: '+',
                info: '#',
                warning: '!',
                error: 'x'
            }
        },
        preprocessors: {
            'test.js': ['webpack', 'sourcemap'],
            'karma-test/*.html': ['html2js']
        },
        logLevel: config.LOG_INFO,
        colors: true,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }
                ]
            },
            resolve: {
                extensions: ['.js'],
                modules: [path.join(__dirname, './node_modules')]
            }
        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};
