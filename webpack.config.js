const os = require('os');
const path = require('path');
const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

if (process.env.NODE_ENV === 'travisci') {
  process.env.NODE_ENV = 'production';
}

const isProd = process.env.NODE_ENV === 'production';

const babelLoader = {
  loader: 'babel-loader',
};

const plugins = [
  new HappyPack({
    id: 'JavaScript',
    threads: Math.min(os.cpus().length, 4),
    loaders: [babelLoader],
  }),
  new ForceCaseSensitivityPlugin(),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module) {
      return module.context && module.context.indexOf('node_modules') !== -1;
    },
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    title: 'WebPurple Workshop blog',
    favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
    template: path.resolve(__dirname, 'public', 'index.html')
  }),
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

const config = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src', 'client', 'index.js'),
  ],
  output: {
    path: path.resolve(__dirname, '__build__'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=JavaScript'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },

  resolve: {
    enforceModuleExtension: false,
    extensions: ['.js', '.jsx'],
  },
  plugins,
  devtool: isProd ? 'source-map' : 'eval-source-map',
};

module.exports = config;
