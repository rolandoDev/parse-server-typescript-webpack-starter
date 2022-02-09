const path = require('path');
const nodeExternals = require('webpack-node-externals'); //Para quitar los packetes node modules
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const {
    NODE_ENV = 'production',
} = process.env;
const commonConfig = {
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [
                'ts-loader',
            ]
        }]
    },
    externals: [nodeExternals()], //Para quitar los paquetes node_modules
    watch: NODE_ENV === 'development',

}
const webpackInitConfig = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    ...commonConfig,
    plugins: [
        new WebpackShellPluginNext({
            onBuildStart: {
                scripts: ['echo "===> Starting packing index.ts"'],
                blocking: true,
                parallel: false
            },
        })
    ]
}

const webpackCloudCodeConfig = {
    entry: './src/cloud/main.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build/cloud'),
        filename: 'main.js'
    },
    ...commonConfig,
    plugins: [
        new WebpackShellPluginNext({
            onBuildStart: {
                scripts: ['echo "===> Starting packing cloud code "'],
                blocking: true,
                parallel: false
            },
            onBuildEnd: {
                scripts: NODE_ENV === 'development' ? ['npm run watch:dev'] : ['cp package.json build/package.json & cp .env build/.env'],
                blocking: false,
                parallel: true
            }
        })
    ]
}

module.exports = [webpackInitConfig, webpackCloudCodeConfig];