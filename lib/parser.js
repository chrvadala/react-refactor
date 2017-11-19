const babylon = require('babylon')
const beautifyJS = require('js-beautify');
const fs = require('fs')

function parse(code) {
  const parserOpt = {
    sourceType: 'module',
    plugins: [
      "jsx",
      "objectRestSpread",
    ]
  }
  return babylon.parse(code, parserOpt).program
}

function beautify(code) {
  const beautifyOpt = {
    indent_size: 2, e4x: true
  }
  return beautifyJS(code, beautifyOpt)
}

module.exports = {
  parse,
  beautify,
}
