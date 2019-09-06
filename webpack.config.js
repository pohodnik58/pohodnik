/* eslint-disable global-require */
const webpack = require('webpack');
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CleanCSSPlugin = require('less-plugin-clean-css');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env, argv) => {
    const IS_DEV = argv.mode === 'development';
    const pakageJson = require('./package.json');
    const htmlWebpackOptions = IS_DEV ? { template: './src/index.html' } : {
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

    const pwaManifestConfig = {
        name: 'ПОХОДНИКИ',
        short_name: 'ПОХОДНИКИ',
        description: 'Сайт походников',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        icons: [
            {
                src: path.resolve('src/images/pohodnik_logo_512.png'),
                sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
            }
        ]
    };

    const cssExtractLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: IS_DEV
        }
    };

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: IS_DEV
        }
    };

    const postCssLoader = {
        loader: require.resolve('postcss-loader'),
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                    flexbox: 'no-2009'
                })
            ]
        }
    };

    const lessLoader = {
        loader: 'less-loader',
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
        // vendor: ['react', 'react-dom'],
        },

        output: {
            filename: IS_DEV ? 'main.js' : '[name].[chunkhash].bundle.js',
            path: path.join(__dirname, '/dist'),
            chunkFilename: IS_DEV ? '[name].bundle.js' : '[name].[chunkhash].bundle.js',
            // publicPath: '/',
            sourceMapFilename: '[file].map', // Default

            devtoolModuleFilenameTemplate:
            'webpack:///[resource-path]?[loaders]'
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /.*node_modules.+/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                            cacheDirectory: true
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        cssExtractLoader,
                        cssLoader,
                        postCssLoader
                    ]
                },
                {
                    test: /(?!\.m)..\.less$/,
                    use: [
                        IS_DEV ? 'style-loader' : cssExtractLoader,
                        cssLoader,
                        postCssLoader,
                        lessLoader
                    ]
                },
                {
                    test: /\.m\.less$/,
                    use: [
                        IS_DEV ? 'style-loader' : cssExtractLoader,
                        {
                            loader: 'css-loader',
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
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]',
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                optipng: {
                                    enabled: true,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        },
                    ],
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin(htmlWebpackOptions),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            new WebpackPwaManifest(pwaManifestConfig),
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(!IS_DEV),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                VERSION: JSON.stringify(pakageJson.version)
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
            //         test: /[\\/]node_modules[\\/](!lodash)(!moment)(!moment-timezone)[\\/]/,
            //         name: "vendor"
            //     },
            // },
            },
        },
        devServer: {
            historyApiFallback: true,
        },
    };
};
