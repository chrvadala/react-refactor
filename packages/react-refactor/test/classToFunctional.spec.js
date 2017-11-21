const {NotAReactComponent} = require("../src/errors");
const {patchString} = require("../src/stringUtils");
const {removeSpaces} = require("./testUtils");
const {classToFunctional} = require('../src/classToFunctional')
const {parse} = require('../src/parser')

const classTemplate = `
class ClassComp extends React.Component {
  constructor(props) {
    super(props);
  }
  doSomething(){
    //doSomething()
  }
  render() {
    let {def} = this.props
    let {props: {ghi}} = this
    return (
      <div>{this.props.abc}</div>
    );
  }
}
`.trim()

const functionalTemplate = `
function ClassComp(props){
  let self = {props};
  
  let {def} = self.props
  let {props: {ghi}} = self
  return (
    <div>{self.props.abc}</div>
  );
}
`

const genericClassTemplate = `
class ClassComp extends React.Component {
  constructor(props) {
    super(props);
  }
  doSomething(){
    //doSomething()
  }
}
`.trim()

describe('classToFunctional', () => {
  it('should convert class to functional comp', () => {
    let classComp = parse(classTemplate)
    let patch = classToFunctional(classTemplate, classComp.body[0])
    expect(Array.isArray(patch)).toBe(true)
    expect(patch).toMatchSnapshot()
    let output = patchString(classTemplate, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(functionalTemplate))
  })
  it('should throw exception', () => {
    let classComp = parse(genericClassTemplate)
    expect(() => {
      classToFunctional(classTemplate, classComp.body[0])
    }).toThrow(NotAReactComponent)
  })

  describe('should supports different superclass', () => {
    [
      'React.PureComponent',
      'PureComponent',
      'Component',
    ].forEach(superClass => {
      it(`should support ${superClass}`, () => {
        let classCompVariant = classTemplate.replace('React.Component', superClass)
        let functionalCompVariant = functionalTemplate.replace('React.Component', superClass)
        let classComp = parse(classCompVariant)
        let patch = classToFunctional(classTemplate, classComp.body[0])
        expect(Array.isArray(patch)).toBe(true)
        expect(patch).toMatchSnapshot()
        let output = patchString(classCompVariant, patch)
        expect(removeSpaces(output)).toBe(removeSpaces(functionalCompVariant))
      })
    })
  })
})
