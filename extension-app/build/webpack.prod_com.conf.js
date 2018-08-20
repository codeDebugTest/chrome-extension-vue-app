'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const env = require('../config/prod.env')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = {
    entry: {
        'contentScript/cs': './src/contentScript/cs.js',
        'contentScript/runtime': './src/contentScript/runtime.js',
        'background/bg': './src/background/bg.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: './[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                options: {
                  formatter: require('eslint-friendly-formatter'),
                  emitWarning: !config.dev.showEslintErrorsInOverlay,
                  emitError: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '../src')]
            }
        ]
    },
    devtool: false,
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false
              }
            },
            sourceMap: false,
            parallel: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/assets/img/icon.png'),
                to: utils.assetsPath('../icons/icon.png'),
                toType: 'file'
            },
            {
                from: path.resolve(__dirname, '../src/assets/img/conan-hand.png'),
                to: utils.assetsPath('../icons/conan-hand.png'),
                toType: 'file'
            },
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.common.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
}

module.exports = webpackConfig
