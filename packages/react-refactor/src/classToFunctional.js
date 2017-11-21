import {get, getOrThrow} from'./treeUtils'
import traverse from 'traverse'
import {NotAReactComponent} from "./errors"
import {insert, remove} from "./stringUtils"

const THIS_REPLACER = 'self'
const SUPER_COMPONENTS = ['Component', 'PureComponent']

export function classToFunctional(source, classDeclaration) {

  //check if is a React component
  let isReactComponent;
  switch (get(classDeclaration, ['superClass', 'type'])) {
    case 'MemberExpression':
      let superObject = get(classDeclaration, ['superClass', 'object', 'name'])
      let superProperty = get(classDeclaration, ['superClass', 'property', 'name'])

      isReactComponent = superObject
        && superProperty
        && superObject === "React"
        && SUPER_COMPONENTS.includes(superProperty)
      break;

    case 'Identifier':
      let superIdentifier = get(classDeclaration, ['superClass', 'name'])
      isReactComponent = superIdentifier
        && SUPER_COMPONENTS.includes(superIdentifier)
      break

    default:
      isReactComponent = false
  }
  if (!isReactComponent) throw NotAReactComponent;


  //detect component info
  let className = getOrThrow(classDeclaration, ['id', 'name'], 'ReactComponent')
  let classStart = getOrThrow(classDeclaration, ['start'])
  let classEnd = getOrThrow(classDeclaration, ['end'])
  let classBody = getOrThrow(classDeclaration, ['body'])


  //detect render method
  let renderMethod;
  getOrThrow(classBody, ['body']).forEach(node => {
    if (get(node, ['type']) !== 'ClassMethod') return
    if (get(node, ['key', 'name']) !== 'render') return
    renderMethod = node
  })
  if (!renderMethod) throw NotAReactComponent;
  let renderStart = getOrThrow(renderMethod, ['body', 'start'])
  let renderEnd = getOrThrow(renderMethod, ['body', 'end'])


  //generates patch to convert it from class to func
  let patch = []
  patch.push(insert(classStart, `function ${className}(props)`))
  patch.push(remove(classStart, renderStart))
  patch.push(insert(renderStart + 1, `\n\tlet ${THIS_REPLACER} = {props};\n`))
  traverse(classDeclaration).map(node => {
    if (get(node, ['type']) !== 'ThisExpression') return
    patch.push(insert(node.start, THIS_REPLACER))
    patch.push(remove(node.start, node.end))
  })
  patch.push(remove(renderEnd, classEnd))

  //patch
  return patch
}
