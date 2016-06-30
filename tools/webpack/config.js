const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('./../env/config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var fs = require("fs");
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcss = require("postcss");
var atImport = require("postcss-import");

var less = fs.readFileSync("src/css/app.less", "utf8");

postcss()
  .use(atImport({
      path: ["src/css"],
      glob: true
  }))
  .process(less, { from: "src/css" });

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

        new webpack.optimize.DedupePlugin(),

        new ExtractTextPlugin("[name].css")
    ],

    postcss: function(webpack) {
        return [
            require('postcss-mixins'),
            require('postcss-import')({
                addDependencyTo: webpack
            }),
            require('autoprefixer'),
            require('precss')
        ]
    },

    resolve: {
        root: path.resolve(dirname),
        alias: {
            "envConfig": "src/app/env/" + ENVIRONMENT +  ".js",
            "images": 'src/img',
            "lib": 'src/app/lib',
            "modules": 'src/app/modules',
            "models": 'src/app/models',
            "core": 'src/app/modules/core',
            "schema": 'src/app/lib/schema',
            "messenger": 'src/app/lib/toastr',
            "rest-client": 'src/app/lib/vendor/jquery.rest',
            "imageLoader": 'lib/custom/imageLoader',
            "components": 'src/app/components',
            "Model": 'src/app/models/core/Model',
            "List": 'src/app/models/core/List'
        }
    },

    module: {
        loaders: [
            {
                test: /\.xml$/, loader: 'xml-loader'
            },

            {
                test: /modernizr-custom\.js$/,
                loader: "imports?this=>window!exports?window.Modernizr"
            },

            {
                test: require.resolve("jquery"),
                loader: "expose?$!expose?jQuery"
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
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            },

            {
                test: /\.rt$/,
                loader: 'babel-loader!react-templates-loader'
            }
        ]
    },

    postcss: function () {
        return [precss, autoprefixer];
    }
};

if (isProd) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false,
            keep_fnames: true
        },
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        }
    }));
} else {
    module.exports.devtool = 'inline-source-map';
}