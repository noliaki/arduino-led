const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const conf = {
  context: path.resolve('./src'),
  entry: {
    index: './index.ts'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    })
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    // })
  ]
}

if (process.env.NODE_ENV !== 'production') {
  conf.watch = true
  conf.cache = true
  conf.devtool = 'source-map'
  conf.plugins = [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
}


module.exports = conf
