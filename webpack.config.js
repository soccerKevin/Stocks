const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-react', 
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, "src/")],
              },
            },
          },
        ],
      },
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
    publicPath: '/',
  },
  watchOptions: {
    aggregateTimeout: 200,
    ignored: '**/node_modules/**',
    poll: 1000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Stocks',
      templateContent: "<div id='reactApp'></div>"
    }),
    new ESLintPlugin(),
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, './src/api'),
      app: path.resolve(__dirname, './src/app'),
      components: path.resolve(__dirname, './src/app/components'),
      conf: path.resolve(__dirname, './src/conf'),
      images: path.resolve(__dirname, './src/app/images'),
      pages: path.resolve(__dirname, './src/app/pages'),
    },
  },
};

module.exports = config;