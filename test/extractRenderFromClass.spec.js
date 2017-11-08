const {removeSpaces} = require("./testUtils");
const {extractRendererFromClass} = require('../src/extractRenderFromClass')
const {parse} = require('../src/parser')


describe('extractRendererFromClass', () => {
  it('should extract info from class', () => {
    let template = `
    class ClassComp extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <div>hello!</div>
      );
      }
    }
  `.trim()
    let render = `
    { return (
          <div>hello!</div>
      ); }
    `

    let classComp = parse(template)
    let {name, start, end} = extractRendererFromClass(classComp.body[0])

    expect(removeSpaces(template.substring(start, end))).toBe(removeSpaces(render))
    expect(name).toBe('ClassComp')
  })
})
