const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // Each one of these entry points gets its own chunk & chunkGroup
  // Translation: you can safely load & run each of these files on its own
  entry: {
    entry1: './entry1.js',
    entry2: './entry2.js',
    entry3: './entry3.js',
  },

  // Where the dev server should serve content from
  devServer: {
    contentBase: './dist',
  },

  // Tells the chunking plugin (SplitChunksPlugin) that it should optimise _all_ chunks, and
  // split them up as efficiently as it can.
  // By default, the plugin will only split up chunks that are loaded asynchronously.
  //
  // Concretely, if this option is reset to the default, webpack will only create three chunks:
  //    * entry1.js
  //    * entry2.js
  //    * entry3.js
  // Each of these chunks will have all of its dependencies "statically linked" -- accessible via
  // a simple __webpack_require__
  //
  // Each entry point chunk will have a deferred modules list like this:
  //
  //    /******/ 	// add entry module to deferred list
  //    /******/ 	deferredModules.push(["./entry1.js","vendors~entry1~entry2~entry3","vendors~entry1~entry2"]);
  //
  // Until all of these modules are loaded, the entry chunk won't run.
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    // Generates an HTML file that loads _all_ entries via <script /> tags
    new HtmlWebpackPlugin(),

    // Just copies files from one place to another
    new CopyWebpackPlugin([
      { from: './without-vendor-chunks.html' },
      { from: './with-vendor-chunks.html' },
    ]),
  ]
}