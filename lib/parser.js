const babylon = require('babylon')
const fs = require('fs')

const UTF8 = 'utf8'
const parserOpt = {
  sourceType: 'module',
  plugins: [
    "jsx",
    "objectRestSpread",
  ]
}

function parse(code){
  return babylon.parse(code, parserOpt).program
}

module.exports = {
  parse,
}
