const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    /* Punto de entrada de nuestro proyecto */
    entry: './src/index.js',
    /* destino del resultado preparado en webpack */
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', 
    },
    mode: 'development',
    watch: true,
    /* Extensiones de archivo necesarias */
    resolve: {
        extensions: ['.js'],
        alias:{
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
            {
            /* test para identificar extensiones utilizadas*/ 
            /*Utiliza cualquier extension mjs-modulos.js o js*/
                test: /\.m?js$/,
            /* Excepto aquellos de node modules */
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                type: "asset/resource", generator: { 
                    filename: "assets/fonts/[name][ext]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template:'./public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            /* Elementos necesarios */
            patterns:[
                {
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}