const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
  },
  mode: 'development',
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
      title: 'Odd',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};

module.exports = config;