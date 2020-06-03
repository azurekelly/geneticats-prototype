const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    '/snap.svg-min.js'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // TODO make webpack ignore the script include of snap.svg in the html file
            // no image files are currently included directly in the html, so this isn't needed quite yet
            // {
            //     test: /\.html$/,
            //     use: ['html-loader']
            // },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'cheatsheet.html',
            template: 'src/cheatsheet.html',
            chunks: []
        }),
        new CopyPlugin({
            // snap.svg is copied rather than bundled due to an issue with the snap.svg library being imported in an eval statement (like webpack uses)
            patterns: ['src/snap.svg-min.js']
        })
    ]
};