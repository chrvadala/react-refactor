const path = require("path");
const fs = require("fs")
const {removeSpaces} = require("./testUtils");
const {patchString} = require("../src/stringUtils");
const {execRefactor} = require("../src/refactor");
const {parseFile} = require('../src/parser')
const fixture = filename => path.join(__dirname, '__fixtures__', filename)

let example, refactoredExample;

beforeAll(done => {
  fs.readFile(fixture('example.jsx.txt'), 'utf8', (err, data) => {
    if (err) throw new Error()
    example = data
    done()
  })
})

beforeAll(done => {
  fs.readFile(fixture('refactoredExample.jsx.txt'), 'utf8', (err, data) => {
    if (err) throw new Error()
    refactoredExample = data
    done()
  })
})


describe('refactor', () => {
  it.only('should convert', () => {
    let {patch, skipped, output} = execRefactor(example)

    expect(Array.isArray(patch)).toBe(true)
    expect(Array.isArray(skipped)).toBe(true)
    expect(patch).toMatchSnapshot()
    expect(skipped).toMatchSnapshot()

    expect(removeSpaces(output))
      .toBe(removeSpaces(refactoredExample))
  })
})
