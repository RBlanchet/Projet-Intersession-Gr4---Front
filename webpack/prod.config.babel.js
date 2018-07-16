const path = require('path')
const fs = require('fs')
const conf = require('./config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');



// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (process.env.NODE_ENV !== 'production') {
    throw new Error('Production builds must have NODE_ENV=production.')
}

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.COMPONENT': JSON.stringify(process.env.COMPONENT),
        'process.env.PAGE': JSON.stringify(process.env.PAGE),
    }),
    new CleanWebpackPlugin(conf.DIST, {global: conf.ROOT}),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        children: true,
        minChunks: 2,
        async: true,
    }),
    new UglifyJSPlugin({
        uglifyOptions: {
            output: {
                comments: false
            },
        },
        sourceMap: false
    }),
    new ManifestPlugin({
        fileName: 'build-manifest.json'
    }),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/
    }),
    new CopyPlugin([
        {from: 'source/images', to: 'images'}
    ]),
]

module.exports = require('./base.config.babel')({

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    plugins: plugins,

    devtool: 'cheap-module-source-map',

    performance: {
        assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
    },
})
