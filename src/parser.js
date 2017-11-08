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

function parseFile(filename){
  let code = fs.readFileSync(filename, UTF8)
  return parse(code)
}

function parse(code){
  return babylon.parse(code, parserOpt).program
}

module.exports = {
  parseFile,
  parse,
}
