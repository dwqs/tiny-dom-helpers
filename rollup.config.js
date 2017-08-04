import babel from 'rollup-plugin-babel';

export default {
    entry: './index.js',
    format: 'umd',
    moduleName: 'TinyDom',
    dest: 'dist/index.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            externalHelpers: false
        })
    ]
};
