const path = require('path')

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