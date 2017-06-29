const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const react = require('babel-preset-react')

module.exports = {
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  reshape: htmlStandards(),
  postcss: cssStandards(),
  babel: jsStandards({ appendPresets: [react] })
}
