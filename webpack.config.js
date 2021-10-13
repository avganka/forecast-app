const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

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
        // path: path.resolve(__dirname, 'dist'),
        path: path.dirname("C:/OpenServer/domains/localhost/test"),
        // assetModuleFilename: 'assets/images/[name][ext]'
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
        new MiniCssExtractPlugin({
            filename: 'bundle[contenthash].css',
        }),
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // publicPath: "",
                        esModule: false
                    },
                }, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext]'
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