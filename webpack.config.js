module.exports = {
  mode : 'development',
  devtool : 'source-map',
  module : {
    rules : [
      {
        test : /\.ts$/,
        use : 'ts-loader',
      },
    ],
  },
  resolve : {
    extensions : ['.tsx','.ts','.js'],
  },
  output : {
    filename : 'index.js',
    libraryTarget : 'umd',
    globalObject : 'this',
  },
};