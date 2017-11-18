const {NotAReactComponent} = require("../lib/errors");
const {patchString} = require("../lib/stringUtils");
const {removeSpaces} = require("./testUtils");
const {parse} = require('../lib/parser')
const {functionalToClass} = require('../lib/functionalToClass')

const functionalTemplate1 = `
function FunctionalComp(props){
  return (
    <div>{props.abc}</div>
  );
}
`
const classTemplate1 = `
class FunctionalComp extends React.Component {
  render() {
    let props = this.props;
    return (
      <div>{props.abc}</div>
    );
  }
}
`.trim()

const functionalTemplate2 = `
function FunctionalComp({abc, cde}){
  return (
    <div>{abc}</div>
  );
}
`
const classTemplate2 = `
class FunctionalComp extends React.Component {
  render() {
    let {abc, cde} = this.props;
    return (
      <div>{abc}</div>
    );
  }
}
`.trim()

const genericFunction = `
function testFunc(props){
  return 'Saluti from Rome!'
}
`


describe('functionalToClass', () => {
  it('should convert functional to class comp', () => {
    let classComp = parse(functionalTemplate1)
    let patch = functionalToClass(functionalTemplate1, classComp.body[0])
    expect(Array.isArray(patch)).toBe(true)
    expect(patch).toMatchSnapshot()
    let output = patchString(functionalTemplate1, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(classTemplate1))
  })

  it('should convert functional to class comp with destructuring', () => {
    let classComp = parse(functionalTemplate2)
    let patch = functionalToClass(functionalTemplate2, classComp.body[0])
    expect(Array.isArray(patch)).toBe(true)
    expect(patch).toMatchSnapshot()
    let output = patchString(functionalTemplate2, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(classTemplate2))
  })

  it('should throw', () => {
    let parsedFunc = parse(genericFunction)
    expect(() => {
      functionalToClass(genericFunction, parsedFunc.body[0])
    }).toThrow(NotAReactComponent)
  })
})
