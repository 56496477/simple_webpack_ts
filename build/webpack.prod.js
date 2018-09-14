const webpackMerge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const webpackBaseConfig = require('./webpack.common');
const HtmlPlugin = require('html-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const UglifyJs = require('uglifyjs-webpack-plugin');
const UglifyCss = require('optimize-css-assets-webpack-plugin');
const CssToFile = require('mini-css-extract-plugin');
const path = require('path');

const filename = 'assets/js/[name].[chunkhash:7].js';
const distPath = path.resolve('./dist');

const {loader: exLoader} = CssToFile;

module.exports = webpackMerge(
    webpackBaseConfig, {
        output: {
            filename,
            chunkFilename: filename,
            publicPath: '/' ,
            path: distPath
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    loaders: [exLoader, 'css']
                },
                {
                    test: /\.scss$/,
                    loaders: [exLoader, 'css', 'sass']
                }
            ]
        },
        plugins: [
            new CleanPlugin([ distPath ] , {allowExternal: true}) ,
            new HtmlPlugin({
                template: path.resolve('./template/dev.html'),
                filename: 'index.html',
                title: 'production',
                minify: {
                    removeComments: true ,
                    collapseWhitespace: true ,
                    removeScriptTypeAttributes: true ,
                    removeStyleLinkTypeAttributes: true
                } ,
            }),
            new CssToFile({
                filename: 'assets/style/[name].[contenthash:7].css' ,
                allChunks: true
            }) ,
            new NyanProgressPlugin(),
        ],
        optimization: {
            splitChunks: {
                name: 'vendors' ,
                chunks: 'initial'
            } ,
            runtimeChunk: {
                name: 'runtime'
            } ,
            minimizer: [
                new UglifyJs({
                    parallel: true ,
                    uglifyOptions: {
                        compress: {
                            warnings: false ,
                            drop_console: true ,
                            drop_debugger: true
                        } ,
                        output: {
                            comments: false
                        }
                    }
                }) ,
                new UglifyCss({
                    cssProcessorOptions: {
                        safe: true ,
                        discardComments: {removeAll: true}
                    }
                })
            ]
        },
        devtool: 'cheap-module-source-map',
        mode: 'production',
    })