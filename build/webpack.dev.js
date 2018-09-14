const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.common');
const HtmlPlugin = require('html-webpack-plugin');
const devServer = require('./devServer.conf');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();
const path = require('path');

module.exports = webpackMerge(webpackBaseConfig, {
    output: {
        filename: 'assets/js/[name].js' ,
        publicPath: '/'
    } ,
    module: {
        rules: [
            {
                test: /\.css$/ ,
                loaders: [ 'style' , 'css' ]
            } ,
            {
                test: /\.scss$/ ,
                loaders: [ 'style' , 'css' , 'sass' ]
            }
        ]
    } ,
    plugins: [
        new webpack.HotModuleReplacementPlugin() ,
        new HtmlPlugin({
            template: path.resolve('./template/dev.html') ,
            filename: 'dev.html' ,
            title: 'dev'
        }) ,
        new DashboardPlugin(dashboard.setData) ,
    ] ,
    devtool: 'cheap-module-eval-source-map' ,
    mode: 'development' ,
    devServer
})