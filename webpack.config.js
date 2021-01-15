const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('config');
const packageJSON = require('./package.json');
const CssExtractPlugin = require('mini-css-extract-plugin');
const Fiber = require('fibers');

/*-------------------------------------------------*/

module.exports = {
    // webpack optimization mode
    mode: ( process.env.NODE_ENV ? process.env.NODE_ENV : 'development' ),

    // entry file(s)
    entry: {
      iou: ['./src/scss/iou.scss', './src/js/iou.js'],
    },

    // output file(s) and chunks
    output: {
        library: 'Iou',
        libraryTarget: 'umd',
        globalObject: '(typeof self !== "undefined" ? self : this)',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: config.get('publicPath')
    },

    // module/loaders configuration
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: CssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: process.env.APP_ENV === 'production',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    cascade: true
                                }),
                                require('postcss-discard-comments')(),
                                // new IconfontWebpackPlugin(loader)
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: true,
                            sassOptions: {
                                fiber: Fiber
                            }
                        }
                    }
                ]
            },
        ]
    },

    // development server configuration
    devServer: {
      allowedHosts: [
        'localhost',
        'localhost:3000'
      ],
        // must be `true` for SPAs
        historyApiFallback: true,

        // open browser on server start
        open: config.get('open')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        new CssExtractPlugin({
            filename: '[name].css'
        })
    ]

    // generate source map
    // devtool: ( 'production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map' ),
};
