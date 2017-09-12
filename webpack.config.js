
module.exports = {
  entry: [
    './public/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: "eval",
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    // }
  }
};
