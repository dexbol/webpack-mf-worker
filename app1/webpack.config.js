import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ModuleFederationPlugin} from '@module-federation/enhanced/webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: './src/index',
    mode: 'development',
    devtool: false,
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers':
                'X-Requested-With, content-type, Authorization',
        },
        static: {
            directory: path.join(dirname, 'dist'),
        },
        port: 3001,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    output: {
        publicPath: 'auto',
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app1',
            remotes: {
                app2: 'app2@http://localhost:3002/mf-manifest.json',
            },
            shared: {
                shared: {requiredVersion: 'v1.0.0', singleton: true},
            },
            experiments: {
                federationRuntime: 'hoisted',
            },
        }),
        new HtmlWebpackPlugin({
            template: path.join(dirname, 'index.html'),
        }),
    ],
};
