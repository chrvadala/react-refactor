const path = require("path");
const {parseFile} = require('../src/parser')
const fixture = filename => path.join(__dirname, '__fixtures__', filename)

describe('parser', () => {
  it('should parse file', () => {
    let classComp = parseFile(fixture('ClassComp.jsx.txt'))
    let funcComp = parseFile(fixture('FuncComp.jsx.txt'))
    expect(classComp).toMatchSnapshot()
    expect(funcComp).toMatchSnapshot()
  })
})
