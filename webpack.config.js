import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

const config = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    port: 3000,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
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
                paths: ["/src/"],
              },
            },
          },
        ],
      },
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: '/public',
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
      api: '/src/api',
      app: '/src/app',
      components: '/src/app/components',
      conf: '/src/conf',
      images: '/src/app/images',
      pages: '/src/app/pages',
    },
  },
};

export default config
