const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('./../env/config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// load plugins

const ENVIRONMENT = process.env.NODE_ENV && process.env.NODE_ENV === "production" ? "prod" : 'dev';
const dirname = path.join(__dirname, '../../');

var isProd = ENVIRONMENT === "prod";

// if we have prod we will set all to ww dir if dev all to build dir
var distDir = isProd ? 'www' : 'build';

console.log(" ========================== Your are on >> " + ENVIRONMENT.toUpperCase() + " << environment ================================");

module.exports = {
    context: dirname,

    entry: {
        app: "./src/bootstrap.js"
    },

    output: {
        path: path.join(dirname, distDir),
        filename: "[name].js",
        library: "[name]"
    },

    // Step 2: Node environment
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery"
        }),

        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify(ENVIRONMENT)
            }
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html', // Load a custom template
            inject: false,
            assets: {
                "scripts": webpackConfig[ENVIRONMENT].filesPath.scripts,
                "connect": webpackConfig[ENVIRONMENT].filesPath.connect,
                "modernizr": webpackConfig[ENVIRONMENT].filesPath.modernizr,
                "styles": webpackConfig[ENVIRONMENT].filesPath.styles
            }
        }),

        new ExtractTextPlugin("[name].css")
    ],

    resolve: {
        root: path.resolve(dirname),
        alias: {
            "envConfig": "src/app/env/" + ENVIRONMENT +  ".js",
            "images": 'src/img',
            "lib": 'src/app/lib',
            "modules": 'src/app/mdls',
            "scope": 'src/app/lib/scope.jsx',
            "schema": 'src/app/lib/schema',
            "rest-client": 'src/app/vendor/jquery.rest',
            "components": 'src/app/lib/components'
        }
    },

    module: {
        loaders: [
            {
                test: /\.xml$/, loader: 'xml-loader'
            },

            {
                test: require.resolve("jquery"), loader: "expose?$!expose?jQuery"
            },

            {
                test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
                loader: "imports?this=>window"
            },

            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime']
                }
            },

            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=img/[name].[ext]',
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            },

            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },

            {
                test: /\.rt$/,
                loader: 'babel-loader!react-templates-loader'
            }
        ]
    }
};

if (isProd) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
    module.exports.devtool = 'inline-source-map';
}