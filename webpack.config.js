const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'osmindoor-umd.js',
        library: {
            name: 'osmindoor',
            type: 'umd',
        },
        globalObject: 'this' // This line was missing
    },
    // externals: {
    //     lodash: {
    //         commonjs: 'lodash',
    //         commonjs2: 'lodash',
    //         amd: 'lodash',
    //         root: '_',
    //     },
    // },
};