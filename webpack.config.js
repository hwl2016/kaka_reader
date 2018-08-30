const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: "web",
    entry: path.join(__dirname, './src/scripts/app.js'),
    output: {
        filename: './js/bundle.[hash:8].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        // alias: {
        //     vue: 'vue/dist/vue.js',
        // }
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|gif)$/,
                use:[
                    {
                        loader:'url-loader',   //把图片转base64  直接写在js里面  减少http请求
                        options: {
                            limit:1024,
                            name:'./images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|svg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options: {
                            name:'./font/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
    ]
}

if (isDev) {  //开发环境
    config.module.rules.push({
        test: /\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 9005,
        host: '127.0.0.1',
        overlay: {
            errors:true
        },
        open:true,
        hot: true
    },
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        )
}else{
    config.entry = {
        app: path.join(__dirname, './src/scripts/app.js'),
        vendor: ['vue']
    }
    config.output.filename = './js/[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl/,
        use:ExtractPlugin.extract({
            fallback: 'style-loader',
            use:[
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('./css/styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}
module.exports = config