import traverse from "traverse"
import {NotAReactComponent} from "./errors"
import {getOrThrow} from './treeUtils'
import {insert, remove} from "./stringUtils"

export function functionalToClass(source, functionalDeclaration) {

  //check if is a React component (has at least 1 comp)
  let isReactComponent = false;
  traverse(functionalDeclaration)
    .forEach(function () {
      let {node, path} = this
      let tail = path[path.length - 1]
      if (tail !== 'type') return
      if (node !== 'JSXElement') return
      isReactComponent = true;
    })
  if (!isReactComponent) throw NotAReactComponent

//detect component info
  let functionalName = getOrThrow(functionalDeclaration, ['id', 'name'], 'ReactComponent')
  let functionalStart = getOrThrow(functionalDeclaration, ['start'])
  let functionalEnd = getOrThrow(functionalDeclaration, ['end'])

  let hasParams = getOrThrow(functionalDeclaration, ['params']).length > 0;
  let paramsCode;
  if(hasParams) {
    let paramsStart = getOrThrow(functionalDeclaration, ['params', 0, 'start'])
    let paramsEnd = getOrThrow(functionalDeclaration, ['params', 0, 'end'])
    paramsCode = source.substring(paramsStart, paramsEnd)
  }

  let renderStart = getOrThrow(functionalDeclaration, ['body', 'start'])
  let renderEnd = getOrThrow(functionalDeclaration, ['body', 'end'])

  let patch = []
  patch.push(insert(functionalStart, `class ${functionalName} extends React.Component {`))
  patch.push(insert(functionalStart, `render()`))
  patch.push(remove(functionalStart, renderStart))
  if(hasParams) patch.push(insert(renderStart + 1, `\nlet ${paramsCode} = this.props;`))
  patch.push(insert(renderEnd, `}`))

  return patch
}

