const path = require("path");
const fs = require('fs')
const {parse} = require('../lib/parser')
const fixture = filename => path.join(__dirname, '__fixtures__', filename)


let classComp;
beforeAll(done => {
  fs.readFile(fixture('ClassComp.jsx.txt'), 'utf8', (err, data) => {
    if (err) throw new Error()
    classComp = data
    done()
  })
})

let funcComp;
beforeAll(done => {
  fs.readFile(fixture('FuncComp.jsx.txt'), 'utf8', (err, data) => {
    if (err) throw new Error()
    funcComp = data
    done()
  })
})

describe('parser', () => {
  it('should parse Class file', () => {
    let parsedClass = parse(classComp)
    expect(parsedClass).toMatchSnapshot()
  })
  it('should parse Func file', () => {
    let parsedFunc = parse(funcComp)
    expect(parsedFunc).toMatchSnapshot()
  })
})
