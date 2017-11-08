const get = require('lodash.get')

function extractRendererFromClass(classDeclaration) {
  if (get(classDeclaration, ['superClass', 'type']) !== 'MemberExpression') return false
  if (get(classDeclaration, ['superClass', 'object', 'name']) !== 'React') return false
  if (get(classDeclaration, ['superClass', 'property', 'name']) !== 'Component') return false

  let name = get(classDeclaration, ['id', 'name'], 'ReactComponent')

  let renderMethod = get(classDeclaration, ['body', 'body'], [])
    .map(node => {
      if (get(node, ['type']) !== 'ClassMethod') return false
      if (get(node, ['key', 'name']) !== 'render') return false
      if (get(node, ['body', 'type']) !== 'BlockStatement') return false

      let start = get(node, ['body', 'start'])
      let end = get(node, ['body', 'end'])

      return {start, end}
    })
    .filter(value => !!value)

  if(renderMethod.length !== 1)return false

  return {start: renderMethod[0].start, end: renderMethod[0].end, name}
}

module.exports = {
  extractRendererFromClass
}
