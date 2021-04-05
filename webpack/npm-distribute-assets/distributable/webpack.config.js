const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: {
    distributable: './src/scss/distributable.scss'
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/scss/_production-assets-root.scss", to: "scss/_assets-root.scss" },
        { from: "src/scss/_asset-helpers.scss", to: "scss" },
        { from: "src/scss/_foo.scss", to: "scss" },
        { from: "src/scss/_bar.scss", to: "scss" },
        { from: "src/scss/images", to: "scss/images" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      }
    ],
  },
}
