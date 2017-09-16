const webpack = require('webpack');
const path = require('path');
var APP_DIR = path.resolve(__dirname, 'static/src/assets/');

module.exports = {
  entry: {
      app: './src/index.js',
      vendor: ["react", "react-dom"],
  },
  output: {
      filename: 'kumpul.app.js',
      path: path.resolve(__dirname, './build'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
        {
            test: /\.js/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },
        // { test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
        { test: /\.js$/, enforce: "pre", loader: "source-map-loader" },
        {
            test: /\.css$/,
            loaders: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' ,
            exclude: /node_modules/
        }
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          API_URL: JSON.stringify('http://localhost:3030/'),
          PORT: JSON.stringify(3030),
          PRODUCTION: JSON.stringify(false),
          VERSION: JSON.stringify("1.0"),
          BROWSER_SUPPORTS_HTML5: true,
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({name:"vendor", filename: "./kumpul.vendor.js"})
  ]
}

