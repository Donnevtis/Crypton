const path = require('path')
module.exports = {
    devServer: {
        disableHostCheck: true
    },
    // publicPath: process.env.NODE_ENV === 'production' ?
    //     '/Crypton' : '/',
    configureWebpack: {
        resolve: {
            alias: {
                'utils': path.resolve(__dirname, 'src/utils')
            }
        }
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/scss/common.scss";`
            }
        }
    }
}