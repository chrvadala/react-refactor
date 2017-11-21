import {patchString} from "./stringUtils"
import {parse, beautify} from "./parser"
import {classToFunctional} from "./classToFunctional"
import {functionalToClass} from "./functionalToClass"
import {getOrThrow, get} from "./treeUtils"
import {NotAProgram} from './errors'

export function execRefactor(source) {
  let programDeclaration = parse(source)
  let type = getOrThrow(programDeclaration, ['type'])
  let body = getOrThrow(programDeclaration, ['body'])

  if (type !== 'Program') throw NotAProgram

  let patch = []
  let skipped = []

  body.forEach(block => {
    let type = get(block, ['type'])
    if (!type) return

    switch (type) {
      case 'ExportDefaultDeclaration':
      case 'ExportNamedDeclaration':
        block = get(block, ['declaration'], block)
        type = get(block, ['type'])
    }

    let start = get(block, ['start']), end = get(block, ['end']);

    switch (type) {
      case 'FunctionDeclaration':
        try {
          let curPatch = functionalToClass(source, block)
          patch = patch.concat(curPatch)
        } catch (err) {
          skipped.push({type: 'FunctionDeclaration', start, end, message: err.message, stack: err})
        }
        break;


      case 'ClassDeclaration':
        try {
          let curPatch = classToFunctional(source, block)
          patch = patch.concat(curPatch)
        } catch (err) {
          skipped.push({type: 'FunctionDeclaration', start, end, message: err.message, stack: err})
        }
        break;
    }
  });

  let output = patchString(source, patch)

  try {
    output = beautify(output)
  } catch (err) {
    skipped.push({type: 'Beautify'})
  }

  return {patch, skipped, output}
}
