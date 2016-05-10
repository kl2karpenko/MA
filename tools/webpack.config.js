const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('./env/config');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// load plugins

const ENVIRONMENT = process.env.NODE_ENV && process.env.NODE_ENV === "production" ? "prod" : 'dev';
const dirname = path.join(__dirname, '../');

console.log(" ========================== Your are on >> " + ENVIRONMENT.toUpperCase() + " << environment ================================");

module.exports = {
    context: dirname,

    // devtool: ENVIRONMENT === "dev" ? 'inline-source-map' : null,
    devtool: 'inline-source-map',

    entry: {
        app: './src/bootstrap.js'
    },

    output: {
        path: path.join(dirname, 'www'),
        filename: '[name].js'
    },

    // Step 2: Node environment
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify(ENVIRONMENT)
            }
        }),

        new CleanWebpackPlugin([
            'www/*'
        ]),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html', // Load a custom template
            inject: false,
            assets: {
                "scripts": webpackConfig[ENVIRONMENT].filesPath.scripts,
                "additionalScripts": webpackConfig[ENVIRONMENT].filesPath.additionalScripts,
                "styles": webpackConfig[ENVIRONMENT].filesPath.styles
            }
        }),

        new ExtractTextPlugin("[name].css"),

        new webpack.optimize.UglifyJsPlugin()
    ],

    resolve: {
        root: path.resolve(dirname),
        alias: {
            "envConfig": "src/app/env/" + ENVIRONMENT +  ".js"
        }
    },

    module: {
        loaders: [
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
                    'file?hash=sha512&digest=hex&name=img/[hash].[ext]',
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