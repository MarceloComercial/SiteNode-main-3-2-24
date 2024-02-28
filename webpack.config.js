const path = require('path');
const webpack = require('webpack');  // Adicione esta linha

// Importe as bibliotecas que você precisa
const ProvidePlugin = webpack.ProvidePlugin;

module.exports = {
  mode: 'production',
  entry: './frontend/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js', 'jsx'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      }
    ]
  },
  plugins: [
    // Adicione um plugin ProvidePlugin para carregar automaticamente as bibliotecas
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      pdfmake: 'pdfmake',
      DataTable: 'datatables.net-dt',
      DataTableButtons: 'datatables.net-buttons-dt',
    }),
  ],
  devtool: 'source-map'
};