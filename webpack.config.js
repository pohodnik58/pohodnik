const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const autoprefixer = require(`autoprefixer`);

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: `css-loader`,
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: require.resolve(`postcss-loader`),
                        options: {
                            ident: `postcss`,
                            plugins: () => [
                                require(`postcss-flexbugs-fixes`),
                                autoprefixer({
                                    flexbox: `no-2009`
                                })
                            ]
                        }
                    }
                    ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            hash: true,
            minify: IS_DEV ? false: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                removeComments: true,
                removeEmptyAttributes: true,
                minifyCSS: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })


    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
};