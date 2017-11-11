const {patchString} = require("../src/stringUtils");
const {removeSpaces} = require("./testUtils");
const {classToFunctional} = require('../src/classToFunctional')
const {parse} = require('../src/parser')

const classTemplate = `
class ClassComp extends React.Component {
  constructor(props) {
    super(props);
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

describe('classToFunctional', () => {
  it('should convert class to functional comp', () => {
    let classComp = parse(classTemplate)
    let patch = classToFunctional(classComp.body[0])
    expect(patch).toMatchSnapshot()
    let output = patchString(classTemplate, patch)
    expect(removeSpaces(output)).toBe(removeSpaces(output))
  })
})
