const path = require('path');
const webpack = require('webpack');

// load plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// load plugins

module.exports = {
    context: __dirname,

    devtool: 'inline-source-map',

    entry: {
        app: './src/bootstrap.js',
        connect: './src/connect.js'
    },

    output: {
        path: path.join(__dirname, 'www'),
        filename: '[name].js'
    },

    // Step 2: Node environment
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
        }),

        new CopyWebpackPlugin([
            {
                from: 'src/index.html',
                to: 'index.html'
            },
            {
                from: 'src/connect.html',
                to: 'connect.html'
            }
        ]),

        new CleanWebpackPlugin([
            'www/*'
        ])
    ],

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
            }
        ]
    }
};