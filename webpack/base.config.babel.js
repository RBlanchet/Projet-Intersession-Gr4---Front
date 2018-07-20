const path = require('path')
const conf = require('./config.js')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const dev_mode = (process.env.NODE_ENV !== 'production')


module.exports = (options) => ({
    ...options,
    entry: [

        './source/index.js',
    ],
    /// Add hot reloading in development
    output: Object.assign({
        path: conf.DIST,
        filename: conf.OUTPUT_JS_FILE
    }, options.output),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    localIdentName: '[sha1:hash:hex:4]',
                                    importLoaders: 2,
                                    // FIXME: properly solve the statics resolution problem
                                    // root: "http://0.0.0.0:5000"
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'resolve-url-loader',
                            {
                                loader: 'sass-loader',
                                options:
                                    {
                                        sourceMap: true,
                                        includePaths: [
                                            path.join(conf.ASSETS, 'styles'),
                                        ]
                                    }
                            },
                            'css-modules-flow-types-loader',
                        ]
                    }),
                )
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                        publicPath: '../'       // override the default path
                    }
                }]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: `dist/media/[name].[hash:8].[ext]`,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                    },
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
})
