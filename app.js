const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-env')
const dynamicImport = require('babel-plugin-syntax-dynamic-import')
const react = require('babel-preset-react')
const pageId = require('spike-page-id')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  reshape: htmlStandards({
    locals: (ctx) => { return { pageId: pageId(ctx), foo: 'bar' } }
  }),
  postcss: cssStandards(),
  babel: { presets: [[jsStandards, { modules: false }], react], plugins: [dynamicImport] }
}
