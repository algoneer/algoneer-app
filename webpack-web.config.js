/* eslint-env node */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build/web');
const PUBLIC_DIR = path.resolve(BUILD_DIR, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');
const APP_ENV = process.env.APP_ENV || 'production';
let indexPath = 'index.jsx';

switch (APP_ENV) {
    case 'dev': indexPath = 'index_dev.jsx'; break;
    case 'staging': indexPath = 'index_staging.jsx'; break;
    case 'test': indexPath = 'index_test.jsx'; break;
}

const withSourceMap = function (url) {
    return (APP_ENV !== 'production') ? (
        url+'?sourceMap'
    ) : (
        url
    );
};

//we collect static files from various places
const staticPaths = [
    'static/',
    '7s/src/static/',
];
const copyPlugins = staticPaths.map(function(path){
    return new CopyWebpackPlugin([{
        from: path,
        to: '../',
        toType: 'dir',
        flatten: false,
    }]);
});

let config = {
    context: SRC_DIR, // absolute base path that contains all entry files
    resolve: {
        symlinks: false,
        extensions: [ // if an import has no file ending, they will be resolved in this order
            '.tsx',
            '.ts',
            '.js',
            '.jsx',
        ],
        modules: [
            SRC_DIR,
            'node_modules',
        ],
        alias: { // You may use these aliases like packages in imports
            '7s': '7s/src',
            'worf': 'worf/src',
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    withSourceMap('css-loader'),
                    withSourceMap('sass-loader'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    withSourceMap('css-loader'),
                ],
            },
            {
                test: /\.yaml|yml$/,
                use: [
                    'json-loader',
                    'yaml-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'less-loader', // compiles Less to CSS
                ],
            },
            {
                test: /\.jsx?$/,
                include: [SRC_DIR],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.tsx?$/,
                include: [SRC_DIR],
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'ts-loader',
                ],
            },
        ],
    },
    output: {
        path: PUBLIC_DIR,
        filename: 'bundle.js',
        publicPath: '/public',
    },
    plugins: [
        ...copyPlugins,
        new webpack.NamedModulesPlugin(),
    ],
};

if (APP_ENV === 'production') {
    console.warn('Production build...');
    config = {
        ...config,
        mode: 'production',
        entry: [
            SRC_DIR + `/web/${indexPath}`,
        ],
    };
} else {
    config = {
        ...config,
        mode: 'development',
        devtool: 'inline-source-maps',
        entry: [
            //'webpack/hot/only-dev-server',
            SRC_DIR + '/web/' + indexPath,
        ],
        devServer: {
            // enable HMR on the server
            hot: true,
            // match the output path
            contentBase: ['src/static', 'src/7s/static'],

            // match the output `publicPath`
            publicPath: '/public',
            //always render index.html if the document does not exist (we need this for correct routing)
            historyApiFallback: true,

            proxy: {
                '/api': {
                    target: 'http://localhost:5000/',
                    secure: false,
                },
            },
        },
        plugins: [
            ...config.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"',
                COMMIT_SHA: JSON.stringify(process.env.CI_COMMIT_SHA || process.env.COMMIT_SHA || 'unknown'),
            }),
        ],
    };
}

module.exports = config;
