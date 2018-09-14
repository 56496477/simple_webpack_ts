const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './src/index.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve('./src'),
                ],
                loader: "babel"
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file',
                options: {
                    name: 'assets/image/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'file',
                options: {
                    name: 'assets/media/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file',
                options: {
                    name: 'assets/font/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(xls|doc)(\?.*)?$/,
                loader: 'file',
                options: {
                    name: 'assets/file/[name].[ext]?[hash:7]'
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.js' , '.jsx' , '.scss' , '.css' ] ,
        alias: {
            'src': path.resolve('./src') ,
            'model': path.resolve('./src/model') ,
            'view': path.resolve('./src/view') ,
            'component': path.resolve('./src/view/component') ,
            'container': path.resolve('./src/view/container') ,
            'page': path.resolve('./src/view/page') ,
            'router': path.resolve('./src/router') ,
            'assets': path.resolve('./src/assets') ,
            'util': path.resolve('./src/util')
        }
    } ,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.IS_DEV': process.env.BUILD_ENV === 'dev' ,
            'process.env.IS_TEST': process.env.BUILD_ENV === 'test' ,
            'process.env.IS_PROD': process.env.BUILD_ENV === 'prod'
        }) ,
    ],
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',
        'react-redux': 'ReactRedux',
        'redux': 'Redux',
        'axios': 'axios'
    }
}