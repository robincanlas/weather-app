const webpack = require('webpack');
const package = require('./package.json');
const path = require('path');
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, option) => {
  const isProduction = option.mode === 'production';
  console.log(
    `
		####### ##         ##       #####  ##   ##
		##      ##        ####     ##      ##   ##
		#####   ##       ##  ##     ####   ####### ` + option.mode + `
		##      ##      ########       ##  ##   ##
		##      ###### ##      ##  #####   ##   ##
		`
  );

  return {
    mode: option.mode,
    context: sourcePath,
    entry: {
      app: './index.tsx'
    },
    output: {
      publicPath: isProduction ? './' : '/',
      path: outPath,
      filename: isProduction ? '[contenthash].js' : '[hash].js',
      chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js'
    },
    // performance: {
    //   maxEntrypointSize: 512000,
    //   maxAssetSize: 512000
    // },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".js", ".ts", ".tsx"],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        app: path.resolve(__dirname, 'src/app/')
      }
    },
    module: {
      rules: [
        // .ts, .tsx
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [!isProduction && {
              loader: 'babel-loader',
              options: {
                plugins: ['react-hot-loader/babel']
              }
            },
            'ts-loader'
          ].filter(Boolean)
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                modules: {
                  localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')({ addDependencyTo: webpack }),
                  require('postcss-url')(),
                  require('postcss-preset-env')({
                    /* use stage 2 features (defaults) */
                    stage: 2
                  }),
                  require('postcss-reporter')(),
                  require('postcss-browser-reporter')({
                    disabled: isProduction
                  })
                ]
              }
            }
          ]
        },
        // static assets
        { test: /\.html$/, use: 'html-loader' },
        { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
        {
          test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
          use: 'file-loader'
        }
      ]
    },
    optimization: {
      splitChunks: {
          name: true,
          cacheGroups: {
              commons: {
                  chunks: 'initial',
                  minChunks: 2
              },
              vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  chunks: 'all',
                  filename: isProduction ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
                  priority: -10
              }
          }
      },
      runtimeChunk: true
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: option.mode,
        DEBUG: false,
        COUNTRY_SERVICE: 'https://robincanlas-server-typescript-docker.onrender.com/'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[hash].css',
        disable: !isProduction
      }),
      new HtmlWebpackPlugin({
        template: 'assets/index.html',
        minify: {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          useShortDoctype: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true
        },
        append: {
          head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
        },
        meta: {
          title: package.name,
          description: package.description,
          keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
        }
      })
    ],
    devServer: {
      host: 'localhost',
      port: 8000,
      contentBase: sourcePath,
      hot: true,
      inline: true,
      historyApiFallback: {
        disableDotRule: true
      },
      stats: 'minimal',
      clientLogLevel: 'warning'
    },
    // https://webpack.js.org/configuration/devtool/
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    node: {
      // workaround for webpack-dev-server issue
      // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
      fs: 'empty',
      net: 'empty'
    }
  }
};