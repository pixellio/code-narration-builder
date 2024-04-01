

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 
// const nodeExternals = require('webpack-node-externals');

console.log("path", path.join(__dirname, "public"))
module.exports = [
    {
        name: "browser",
        entry: path.join(__dirname, "src/index.js"),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "bundle.js"
        },
        mode: "development",
        devServer: {
            static: path.join(__dirname, 'dist'), // Path to static assets
            port: 8000, // Port (you can adjust this)
            hot: true, // Enable HMR
            open: true
            // liveReload: true
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
                {
                    test: /\.svg$/,
                    oneOf: [
                        {
                            include: path.resolve(__dirname, '../node_modules/package-name/'),
                            use: 'svg-inline-loader'
                        },
                        {
                            exclude: path.resolve(__dirname, '../node_modules/package-name/'),
                            use: 'url-loader'
                        }
                    ]
                },
                {
                    test: /\.(woff|ttf|otf|eot|woff2)$/i,
                    loader: "file-loader"
                },
                {
                    test: /\.css$/,
                    include: [
                        path.join(__dirname, "/src"),
                        path.join(__dirname, "node_modules")
                    ],
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].css",
                                outputPath: "/",
                                esModule: false,
                            }
                        },
                        // {
                        //     loader: "extract-loader",
                        // },
                        // MiniCssExtractPlugin.loader,
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: 'dist', // Set the public path for the CSS file
                            },
                        },
                        {
                            loader: "css-loader",
                            options: { modules: { localIdentName: '[local]' }, esModule: false, }
                            // options: {
                            //   esModule: false,
                            // }
                        },
                        // { loader: "sass-loader" }
                    ]
                },
                {
                    test: /\.(jpg|png|gif)$/, // Matches jpg, png, and gif files
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // Preserves the original filename
                        },
                    },
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html", // to import index.html file inside index.js
              }),

            // new HtmlWebpackPlugin({
            //     title: "SSR title",
            // }),
            new webpack.DefinePlugin({
                __CONFIGS__: JSON.stringify({
                    service: 'React-ssr',
                    version: '0.2',
                    environment: process.env.BUILD_ENVIRONMENT || "http://localhost:3001"
                })
            }),
            new webpack.HotModuleReplacementPlugin(), // Enable HMR for client
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*hot-update*'],
            }),
            new MiniCssExtractPlugin({
                // path:  path.join(__dirname, "/.aws-sam/build/HelloWorldFunction"),
                filename: "styles.css"
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]
    }
]
