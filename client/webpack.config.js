const { join } = require('node:path')

const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: ['./client/index.tsx'],
  output: {
    path: join(__dirname, '..', 'server', 'public'),
    filename: 'bundle.js',
  },
  mode: 'development',

  plugins: [
    new Dotenv({
      path: join(__dirname, '../.env'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}
