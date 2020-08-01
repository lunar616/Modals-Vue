module.exports = {
  publicPath: process.env.NODE_ENV  === 'production'
    ? '/Modals-Vue/'
    : '/',
  assetsDir: 'assets',
  productionSourceMap: false,
}