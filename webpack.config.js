const webpack = require("webpack")
const path = require('path');

const ProvidePluginConfig = new webpack.ProvidePlugin({
  'React': 'react',
  'ReactDOM': 'react-dom',
  'classnames' : 'classnames'
});

const cssModulesLoader = [
  'css-loader?modules=true',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&')

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          cssModulesLoader,
          'sass-loader?sourceMap'
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [ProvidePluginConfig]
};
