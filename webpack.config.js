const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const autoprefixer = require(`autoprefixer`);
const CleanCSSPlugin = require('less-plugin-clean-css');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
const IS_DEV = argv.mode  === 'development';
console.log(`BUILD IN -${argv.mode}- MODE`)
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
        sourceMap: IS_DEV
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
        javascriptEnabled: true,
        sourceMap: true,
        plugins: [
            new CleanCSSPlugin({ advanced: true })
        ]
    }
};


return {
    entry: {
        client: ['./src/index.js'],
        //vendor: ['react', 'react-dom'],
    },

    output: {
        filename: IS_DEV ? 'main.js' : '[name].[chunkhash].bundle.js',
        path: path.join(__dirname, "/dist"),
        chunkFilename: IS_DEV?'[name].bundle.js':'[name].[chunkhash].bundle.js',
        //publicPath: '/',
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
                    IS_DEV?"style-loader":cssExtractLoader,
                    cssLoader,
                    postCssLoader,
                    lessLoader
                ]
            },
            {
                test: /\.m\.less$/,
                use: [
                    IS_DEV?"style-loader":cssExtractLoader,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: {
                                mode: 'local',
                                ...(IS_DEV ? {
                                    localIdentName: '[path]_[name]_[local]--[hash:base64:3]',
                                } : {
                                    getLocalIdent: (context, localIdentName, localName) => (
                                        require('./utils/cssClassUniqueSmall')(localName, context.resourcePath)
                                    )
                                }
                                )
                            },
                            importLoaders: 2,
                            sourceMap: IS_DEV,
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
}