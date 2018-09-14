const path = require('path');

module.exports = {
    contentBase: [path.resolve('./src')],
    port: '3000',
    historyApiFallback: {
        index: '/dev.html'
    },
    compress: true,
    host: '127.0.0.1',
    hot: true,
    open: true,
    inline: true,
    noInfo: true,
    quiet: true,
    clientLogLevel: 'none',
    overlay: {
        warnings: true,
        errors: true
    },
    // 代理设置
    // proxy: [{
    //         path: '/proxy/**',
    //         target: 'http://10.17.100.19:4012', 
    //         changeOrigin: true,
    //         secure: false,
    //         pathRewrite: {
    //             '^/proxy': '/'
    //         }
    //     },
    //     {
    //         context: '!/csp/**',
    //         target: 'http://192.168.104.104', 
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/$': ''
    //         },
    //         cookieDomainRewrite: '127.0.0.1'
    //     }
    // ]
};