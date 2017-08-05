import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: 'tinyDom',
    dest: 'dist/index.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            externalHelpers: false
        })
    ]
};
