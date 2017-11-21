import {parse as astParser}  from 'babylon'
import {js_beautify as codeBeautify} from "js-beautify"

export function parse(code) {
  const parserOpt = {
    sourceType: 'module',
    plugins: [
      "jsx",
      "objectRestSpread",
    ]
  }
  return astParser(code, parserOpt).program
}

export function beautify(code) {
  const beautifyOpt = {
    indent_size: 2, e4x: true
  }
  return codeBeautify(code, beautifyOpt)
}
