const get = require('lodash.get')
const traverse = require('traverse')
const {insert, remove} = require("./string-offset-patch");
const THIS_REPLACER = 'self'

function classToFunctional(classDeclaration) {
  if (get(classDeclaration, ['superClass', 'type']) !== 'MemberExpression') return false
  if (get(classDeclaration, ['superClass', 'object', 'name']) !== 'React') return false
  if (get(classDeclaration, ['superClass', 'property', 'name']) !== 'Component') return false

  let className = get(classDeclaration, ['id', 'name'], 'ReactComponent')
  let classStart = get(classDeclaration, ['start'])
  let classEnd = get(classDeclaration, ['end'])

  let classBody = get(classDeclaration, ['body'])

  let renderMethod;
  get(classBody, ['body']).forEach(node => {
    if (get(node, ['type']) !== 'ClassMethod') return
    if (get(node, ['key', 'name']) !== 'render') return

    renderMethod = node
  })

  if (!renderMethod) return false

  let renderStart = get(renderMethod, ['body', 'start'])
  let renderEnd = get(renderMethod, ['body', 'end'])

  let patch = []
  patch.push(insert(classStart, `function ${className}(props)`))
  patch.push(remove(classStart, renderStart))
  patch.push(insert(renderStart + 1, `\n\tlet ${THIS_REPLACER} = {props};\n`))

  traverse(classDeclaration).map(node => {
    if (get(node, ['type']) !== 'ThisExpression') return
    patch.push(insert(node.start, THIS_REPLACER))
    patch.push(remove(node.start, node.end))
  })

  return patch
}

module.exports = {
  classToFunctional
}
