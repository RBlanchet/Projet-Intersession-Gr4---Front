const path = require('path')
const conf = require('./config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

const plugins = [
    new webpack.DefinePlugin({
        'process.env.COMPONENT': JSON.stringify(process.env.COMPONENT),
        'process.env.PAGE': JSON.stringify(process.env.PAGE),
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false, // show a warning when there is a circular dependency
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new CopyPlugin([
        {from: 'source/images', to: 'images'}
    ]),
    // new CopyPlugin([
    //     {from: 'assets/fonts', to: '../fonts'}
    // ]),
    // new CopyPlugin([
    //     {from: 'assets/files', to: '../files'}
    // ])
]

module.exports = require('./base.config.babel')({
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    // Add development plugins
    plugins: plugins, // eslint-disable-line no-use-before-define

    // Emit a source map for easier debugging
    // See https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        inline: true,
        stats: "minimal",
        historyApiFallback: true,
    },
    performance: {
        hints: false,
    },
})