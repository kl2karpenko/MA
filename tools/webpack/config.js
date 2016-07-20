const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs                = require("fs");
const precss            = require('precss');
const autoprefixer      = require('autoprefixer');
const postcss           = require("postcss");
const atImport          = require("postcss-import");

/**
 * ==========================================================
 * Post css all less files, add suffix
 * ==========================================================
 */
postcss()
  .use(atImport({
      path: ["src/css"],
      glob: true
  }))
  .process(
    fs.readFileSync("src/css/app.less", "utf8"),
    { from: "src/css" }
  );


/**
 * ==========================================================
 * Post css all less files, add suffix
 * ==========================================================
 */

/**
 * ==========================================================
 * Define environment variables
 *
 * ENVIRONMENT:
 *  * local: run on localhost in browser
 *  * dev: run on development server in browser
 *  * prod: run on production server on mobile
 * ==========================================================
 */

const ProcessInfo = require('../../env/process');
const ACTIVE_ENVIRONMENT = ProcessInfo.getActiveEnvironment();
const webpackConfig = require('./../env/config')[ACTIVE_ENVIRONMENT];

/**
 * ==========================================================
 * Define environment variables
 * ==========================================================
 */

console.log(" ================ are on >> "
  + ACTIVE_ENVIRONMENT.toUpperCase() +
  " << environment =====================");

/**
 * Set begin path for run
 */
const dirname = path.join(__dirname, '../../');

module.exports = {
    context: dirname,

    entry: {
        app: "./src/bootstrap.js"
    },

    output: {
        path: path.join(dirname, ProcessInfo.getDestinationDir()),
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
              'NODE_ENV': JSON.stringify(ACTIVE_ENVIRONMENT),
              'platformName': JSON.stringify(ProcessInfo.getActivePlatform())
            }
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html',
            inject: false,
            assets: {
                "scripts": webpackConfig.filesPath.scripts,
                "connect": webpackConfig.filesPath.connect,
                "modernizr": webpackConfig.filesPath.modernizr,
                "styles": webpackConfig.filesPath.styles
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
            "envConfig": "env/" + ACTIVE_ENVIRONMENT +  ".js",
            "images": 'src/img',
            "lib": 'src/app/lib',
            "modules": 'src/app/modules',
            "models": 'src/app/models',
            "core": 'src/app/modules/core',
            "schema": 'src/app/lib/schema',
            "dialogs": 'src/app/lib/dialogs',
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
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false}'
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

if (ProcessInfo.isProd()) {
    // module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    //     sourceMap: true,
    //     compress: {
    //         warnings: false,
    //         keep_fnames: true
    //     },
    //     mangle: {
    //         except: ['$super', '$', 'exports', 'require']
    //     }
    // }));
} else {
    module.exports.devtool = 'inline-source-map';
}
