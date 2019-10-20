module.exports = {

  /* Hotfix: serve all assets statically, instead of via Webpack's Copy plugin */
  /* This not only improves compilation performance by a lot, but also saves the SSD */
  devServer: {
    contentBase: ['src', '../tos-web-server/www'],
  },

};
