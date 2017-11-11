const get = require('lodash.get')
const traverse = require('traverse')
const {insert, remove} = require("./stringUtils");
const THIS_REPLACER = 'self'

function classToFunctional(classDeclaration) {
  if (get(classDeclaration, ['superClass', 'type']) !== 'MemberExpression') return
  if (get(classDeclaration, ['superClass', 'object', 'name']) !== 'React') return
  if (get(classDeclaration, ['superClass', 'property', 'name']) !== 'Component') return

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

  if (!renderMethod) return

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
