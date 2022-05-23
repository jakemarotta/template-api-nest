import webpack from 'webpack'
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'

const { NODE_ENV = 'development' } = process.env

module.exports = {
  entry: ['webpack/hot/poll?100', './src/index.ts'],
  watch: NODE_ENV === 'development',
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: NODE_ENV,
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@/*': ['src/*'],
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new TsconfigPathsWebpackPlugin()],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
}
