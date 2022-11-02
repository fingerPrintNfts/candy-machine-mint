const path = require('path')
const webpack = require('webpack');

module.exports = {
 entry: './src/index.tsx',
 module: {
   rules: [
    {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    },
     {
       test: /\.(js|jsx|ts|tsx)$/,
       exclude: /node_modules/,
       use: ['babel-loader']
     },
     {
       test: /\.css$/,
       use: ["style-loader", "css-loader"]
     },
     {
       test: /\.(pdf|jpg|png|gif|svg|ico)$/,
       use: [
         {
           loader: 'url-loader'
         },
       ]
     },
     {  
       test: /\.(woff|woff2|eot|ttf|otf)$/,
       loader: "file-loader"
     }
   ]
 },
 resolve: {
   extensions: ['*', '.js', '.jsx','.ts', '.tsx'],
   fallback: {
    "fs": false,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "path": require.resolve("path-browserify")
   },
 },
 plugins: [
  new webpack.DefinePlugin({
    'process.env.REACT_APP_LOG_LEVEL': JSON.stringify('info'),
    'process.env.REACT_APP_SOLANA_NETWORK': JSON.stringify('devnet'),
    'process.env.REACT_APP_SOLANA_RPC_HOST': JSON.stringify('https://api.devnet.solana.com '),
    'process.env.REACT_APP_CANDY_MACHINE_ID': JSON.stringify('DUxixKUhFXHy8FDBYwqrh9AM37RMuqUyEmXg1SjrQiAE'),
  }),
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
  })
 ],
 output: {
   path: __dirname + '/dist',
   publicPath: '/',
   filename: 'bundle.js'
 },
 devServer: {
   static: {
     directory: path.join(__dirname, 'dist')
   }
 }
};