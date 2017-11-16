const get = require('lodash.get')
const traverse = require('traverse')
const {insert, remove} = require("./stringUtils");

function functionalToClass(source, functionalDeclaration) {

  //check if is a React component (has at least 1 comp)

//detect component info
  let functionalName = get(functionalDeclaration, ['id', 'name'], 'ReactComponent')
  let functionalStart = get(functionalDeclaration, ['start'])
  let functionalEnd = get(functionalDeclaration, ['end'])

  let paramsStart = get(functionalDeclaration, ['params', 0, 'start'])
  let paramsEnd = get(functionalDeclaration, ['params', 0, 'end'])
  let paramsCode = source.substring(paramsStart, paramsEnd)

  let renderStart = get(functionalDeclaration, ['body', 'start'])
  let renderEnd = get(functionalDeclaration, ['body', 'end'])

  let patch = []
  patch.push(insert(functionalStart, `class ${functionalName} extends React.Component {`))
  patch.push(insert(functionalStart, `render()`))
  patch.push(remove(functionalStart, renderStart))
  patch.push(insert(renderStart + 1, `\nlet ${paramsCode} = this.props;`))
  patch.push(insert(renderEnd, `}`))

  return patch
}

module.exports = {
  functionalToClass
}
