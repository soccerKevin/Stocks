const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
 devtool: 'inline-source-map',
 devServer: {
    contentBase: './public',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
    publicPath: '/',
  },
};

module.exports = config;