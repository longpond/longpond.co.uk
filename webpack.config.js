var path = require('path');
var env = process.env.NODE_ENV;
var isProduction = /^prod/.test(env);

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './js/main'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', getSCSSLoaders())
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: getPlugins(),
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.scss', '.json']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
};

function getSCSSLoaders() {
  return [
    'css-loader',
    'sass-loader?outputStyle=' + (isProduction ? 'compressed' : 'nested')
  ].join('!');
}

function getPlugins() {
  var plugins = [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ];

  if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  }

  return plugins;
}
