const path = require('path')
module.exports = {
    devServer: {
        disableHostCheck: true
    },
    // publicPath: process.env.NODE_ENV === 'production' ?
    //     '/Crypton' : '/',
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
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