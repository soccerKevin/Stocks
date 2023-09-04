import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
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
    path: path.resolve(__dirname, 'public'),
    clean: true,
    publicPath: '/',
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
      recoilStore: '/src/app/recoilStore',
    },
  },
};

export default config
