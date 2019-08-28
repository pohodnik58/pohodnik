const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const autoprefixer = require(`autoprefixer`);

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';


const htmlWebpackOptions = IS_DEV?{template: './src/index.html'}:{
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body',
    hash: true,
    minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
    }
};

const cssExtractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        hmr: IS_DEV
    }
};

const cssLoader = {
    loader: `css-loader`,
    options: {
        sourceMap: IS_DEV,
        minimize: !IS_DEV
    }
};

const postCssLoader = {
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
};

const lessLoader = {
    loader: `less-loader`,
    options: {
        javascriptEnabled: true
    }
};


module.exports = {
    entry: {
        client: ['./src/index.js'],
        //vendor: ['react', 'react-dom'],
    },

    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.join(__dirname, "/dist"),
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /.*node_modules.+/,
                use: {
                    loader: `babel-loader`,
                    query: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        presets: [
                            `@babel/preset-react`,
                            [`@babel/preset-env`, {
                                modules: false,
                                targets: {
                                    esmodules: false
                                }
                            }]
                        ],
                        plugins: [
                            [`@babel/plugin-proposal-class-properties`, { loose: true }],
                            `@babel/plugin-proposal-export-default-from`,
                            `@babel/plugin-syntax-dynamic-import`,
                            `@babel/plugin-proposal-optional-chaining`
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    cssExtractLoader,
                    cssLoader,
                    postCssLoader
                ]
            },
            {
                test: /(?!\.m)..\.less$/,
                use: [
                    cssExtractLoader,y
                    cssLoader,
                    postCssLoader,
                    lessLoader
                ]
            },
            {
                test: /\.m\.less$/,
                use: [
                    cssExtractLoader,
                    {
                        loader: `css-loader`,
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: `[name]_[local]_[hash:base64:3]`,
                            sourceMap: IS_DEV,
                            minimize: !IS_DEV
                        }
                    },
                    postCssLoader,
                    lessLoader
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(htmlWebpackOptions),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            // cacheGroups: {
            //     reactVendor: {
            //         test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            //         name: "reactvendor"
            //     },
            //     utilityVendor: {
            //         test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
            //         name: "utilityVendor"
            //     },
            //     bootstrapVendor: {
            //         test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
            //         name: "bootstrapVendor"
            //     },
            //     vendor: {
            //         test: /[\\/]node_modules[\\/](!react-bootstrap)(!lodash)(!moment)(!moment-timezone)[\\/]/,
            //         name: "vendor"
            //     },
            // },
        },
    },
};