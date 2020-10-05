// 使用html模板
let HtmlPlugin = require('html-webpack-plugin');
// 每次打包前先清空上一次打包的数据
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 独立打包css文件
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// vue插件
let VueLoaderPlugin = require('vue-loader/lib/plugin');
let path = require('path');

module.exports = {
    resolve: {
        // 后缀名
        extensions: ['.js', '.css', '.vue', '.styl'],
        // 别名
        alias: {
            "@common": path.resolve(__dirname,"src/common"),
            "@comp": path.resolve(__dirname,"src/components")
        }
    },
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: '[name]-[hash:6].js'
    },

    // loaders
    // 配置不同的loader来处理非js类型的文件
    module: {
        rules: [
            // 处理vue文件
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.(styl|stylus)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            // 处理图片
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    // 将图片保存在某个路径
                    // loader:'file-loader',
                    // 将图片转换成base64DataURL格式
                    loader: 'url-loader',
                    options: {
                        // 不使用默认的md5hash值，指定名称
                        name: '[name]-[hash:6].[ext]',
                        // 输出路径
                        outputPath: 'images/',
                        // 限制图片大小
                        limit: 30 * 1024,
                        esModule: false
                    }
                }],

            },
            // 字体文件
            {
                test:/\.(ttf|woff|eot|svg)$/,
                use:'file-loader'
            },
            // babel处理ES6
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    // 插件
    plugins: [
        new HtmlPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:6].css'
        }),
        new VueLoaderPlugin()
    ]
}