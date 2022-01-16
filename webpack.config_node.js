const path = require('path');

serverConfig = {
    target: 'node',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'osmindoor-node.js',
    },
};
clientConfig = {
    target: 'web',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'osmindoor.js',
    },
};
// module.exports = [serverConfig, clientConfig];
module.exports = [clientConfig];