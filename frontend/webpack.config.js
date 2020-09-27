  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: path.resolve(__dirname, 'src/index'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    resolve: {
      alias: {
        "jquery": path.join(__dirname, "./jquery-stub.js")
      }
    },
    module: {
      rules: 
        [{
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: ['babel-loader']
        },
          { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
          { test: /\.js$/, loader: "source-map-loader" },
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
      })
    ]
  };