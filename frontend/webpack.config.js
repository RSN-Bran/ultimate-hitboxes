  const path = require('path');
  const Dotenv = require('dotenv-webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = env => {
    return {
      entry: path.resolve(__dirname, 'src/index'),
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
      },
      resolve: {
        alias: {
          "jquery": path.join(__dirname, "./jquery-stub.js")
        },
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    watchOptions: {
      poll: true
    },
      module: {
        rules: 
          [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: ['babel-loader']
          },
            { test: /\.js$/, loader: "source-map-loader" },
            { test: /\.tsx$/, include: path.resolve(__dirname, 'src'), loader: "ts-loader" },
            {
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                  }
                }
              ]
            },
          {
            test: /\.(png|svg|jpg|gif)$/,
            include: path.resolve(__dirname, 'src'),
            use: ['file-loader']
          },
          {
          test: /\.css$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        }
        ]
      },
      devServer: {
        contentBase:  path.resolve(__dirname, 'dist'),
        port: 8080,
        historyApiFallback: true
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "src/index.html" //source html
        }),
        new Dotenv({
          path: `./environments/.env`
        })
      ]
    }
  };