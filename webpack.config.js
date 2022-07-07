const path = require('path')

const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: path.resolve(__dirname, 'src/main.ts'),
  plugins: [new NodemonPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname),
      graphql$: path.resolve(__dirname, './node_modules/graphql/index.js')
    }
  }
}
