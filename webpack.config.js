const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
}

module.exports = {

    externals: {
        paths: PATHS
    },

    entry: ["@babel/polyfill", `${PATHS.src}/index.js`],
    output: {
        filename: `[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    devServer: {
        contentBase: PATHS.dist,
        overlay: true,
        historyApiFallback: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `[name].css`,
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/assets/svg`, to: `assets/svg` },
            { from: `${PATHS.src}/assets/img`, to: `assets/img` }
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            inject: 'body'
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }
                ]
            },
            {
                test: /\.(sc|sa)ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    fallback: "file-loader"
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["@babel/preset-env"],
                        "plugins": [
                            "@babel/plugin-transform-react-jsx",
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        ]
                    }
                }
            }
        ]
    },

}