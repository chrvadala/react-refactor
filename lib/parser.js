const babylon = require('babylon')
const beautifyJS = require('js-beautify');
const fs = require('fs')

const parserOpt = {
  sourceType: 'module',
  plugins: [
    "jsx",
    "objectRestSpread",
  ]
}

function parse(code) {
  return babylon.parse(code, parserOpt).program
}

const beautifyOpt = {
  indent_size: 2, e4x: true
}

function beautify(code) {
  return beautifyJS(code, beautifyOpt)
}

module.exports = {
  parse,
  beautify,
}
