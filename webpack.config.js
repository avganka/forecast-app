const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CssExtPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_env === 'development';

module.exports = {
    mode: 'development',
    entry: {
        main: "./js/main.js",
    },
    devServer: {
        port: 8000,
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
    },
    output: {
        filename: 'bundle[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        // path: path.dirname("C:/openserver/domains/localhost/test"),  
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: !isDev
            },
            inject: 'body'
        }),
        new CleanWebpackPlugin(),
        new CssExtPlugin({
            filename: 'bundle[contenthash].css',
        }),
    ],
    module: {
        rules: [{
                test: /\.(scss|css)$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "",
                        esModule: false
                    },
                }, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'imgs/[hash][ext]'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                },
            },
        ]
    },
};