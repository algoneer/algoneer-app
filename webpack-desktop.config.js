var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/desktop');
var PUBLIC_DIR = path.resolve(BUILD_DIR, 'public');
var SRC_DIR = path.resolve(__dirname, 'src');
var APP_ENV = process.env.APP_ENV || 'production';
var indexPath = 'index.jsx'

switch (APP_ENV) {
    case 'dev': indexPath = 'index_dev.jsx'; break;
    case 'staging': indexPath = 'index_staging.jsx';break;
    case 'test': indexPath = 'index_test.jsx';break;
  }

var sm = function(url){
    if (APP_ENV != 'production')
        return url+'?sourceMap'
    return url
}

//we collect static files from various places
var staticPaths = ['static/', '7s/src/static/']
var copyPlugins = staticPaths.map(function(path){
  return new CopyWebpackPlugin([{
    from: path,
    to: '../',
    toType: 'dir',
    flatten: false
  }])
})

var config = {
  target: 'electron-renderer',
    context: SRC_DIR,
    resolve: {
        symlinks: false,
        extensions: ['.js', '.jsx'],
        modules: [
            SRC_DIR,
            "node_modules"
        ],
        alias: {
            "7s": "7s/src"
        },
    },
    module: {
        loaders: [
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.scss|sass$/,
                loaders: ['style-loader', sm('css-loader'), sm('sass-loader')]
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', sm('css-loader')]
            },
            {
                test: /\.yaml|yml$/,
                loaders: ['json-loader', 'yaml-loader'],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.jsx?/,
                include: [SRC_DIR],
                exclude: [path.resolve('node_modules')],
                loader: 'babel-loader',
                query: {
                    presets: [["@babel/preset-env", { "modules": false }], '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        ]
    },
    output: {
        path: PUBLIC_DIR,
        filename: 'bundle.js',
        publicPath: '/public'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
    ]
};

if (APP_ENV == 'production') {
    console.warn("Production build...")
    config.entry = [
        SRC_DIR + '/desktop/' + indexPath
    ]
    config.plugins = config.plugins.concat(copyPlugins).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            COMMIT_SHA: JSON.stringify(process.env.CI_COMMIT_SHA || process.env.COMMIT_SHA || 'unknown'),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false,
            minimize: true,
            sourceMaps: false,
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ])
} else {
    config.devtool = 'inline-source-maps'
    config.entry = [
        'webpack/hot/only-dev-server',
        SRC_DIR + '/desktop/' + indexPath
    ]
    config.devServer = {
        hot: true,
        // enable HMR on the server
        contentBase: ['src/static', 'src/7s/static'],
        // match the output path

        publicPath: '/public',
        // match the output `publicPath`
        historyApiFallback: true,
        //always render index.html if the document does not exist (we need this for correct routing)

        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                secure: false
            }
        }
    }
    config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            COMMIT_SHA: JSON.stringify(process.env.CI_COMMIT_SHA || process.env.COMMIT_SHA || 'unknown'),
        }),

    ])
}

module.exports = config;
