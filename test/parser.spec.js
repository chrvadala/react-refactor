const path = require("path");
const {parseFile} = require('../src/parser')
const fixture = filename => path.join(__dirname, '__fixtures__', filename)

describe('parser', () => {
  it('should parse Class file', () => {
    let classComp = parseFile(fixture('ClassComp.jsx.txt'))
    expect(classComp).toMatchSnapshot()
  })
  it('should parse Func file', () => {
    let funcComp = parseFile(fixture('FuncComp.jsx.txt'))
    expect(funcComp).toMatchSnapshot()
  })
})
