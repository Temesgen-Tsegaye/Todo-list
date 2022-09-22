const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
    mode: 'development',
    entry: {
           index: './src/index.js',
            
         },
         devtool: 'inline-source-map',
         devServer: {
          static: {
            directory: path.resolve(__dirname, 'dist'),
          },
          port: 3000,
          open: true,
          hot: true,
          compress: true,
          historyApiFallback: true,
        },
         plugins: [
               new HtmlWebpackPlugin({
                  title: 'Todo',
                 filename:"index.html",
                 template:path.resolve(__dirname,'src/templet.html')
                }),
              ],
            
        
   output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
  module: {
   rules: [
     {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
       test: /\.(png|svg|jpg|jpeg|gif)$/i,
       type: 'asset/resource',
     },

    ],
  },
 };
