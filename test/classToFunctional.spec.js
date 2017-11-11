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
  let self = {props}
  
  let {def} = self.props
  let {props: {ghi}} = self
  return (
    <div>{self.props.abc}</div>
  )
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
    let patch = classToFunctional(classComp.body[0])
    expect(Array.isArray(patch)).toBe(true)
    expect(patch).toMatchSnapshot()
    let output = patchString(classTemplate, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(output))
  })
  it('should return false', () => {
    let classComp = parse(genericClassTemplate)
    let patch = classToFunctional(classComp.body[0])
    expect(patch).toBeFalsy()
  })
  it('should support React.PureComponent', () => {
    let classCompVariant = classTemplate.replace('React.Component', 'React.PureComponent')

    let classComp = parse(classCompVariant)
    let patch = classToFunctional(classComp.body[0])
    expect(Array.isArray(patch)).toBe(true)
    expect(patch).toMatchSnapshot()
    let output = patchString(classTemplate, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(output))
  })

  it('should support PureComponent', () => {
    let classCompVariant = classTemplate.replace('React.Component', 'PureComponent')

    let classComp = parse(classCompVariant)
    let patch = classToFunctional(classComp.body[0])
    expect(Array.isArray(patch)).toBe(true)
    expect(patch).toMatchSnapshot()
    let output = patchString(classTemplate, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(output))
  })

  it('should support Component', () => {
    let classCompVariant = classTemplate.replace('React.Component', 'Component')

    let classComp = parse(classCompVariant)
    let patch = classToFunctional(classComp.body[0])
    expect(Array.isArray(patch)).toBe(true)
    expect(patch).toMatchSnapshot()
    let output = patchString(classTemplate, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(output))
  })
})
