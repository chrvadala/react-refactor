const {classToFunctional} = require("./classToFunctional");
const {functionalToClass} = require("./functionalToClass");
const {getOrThrow, get} = require("./treeUtils");
const {NotAProgram} = require('./errors')

function execRefactor(source, programDeclaration) {

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
  return {patch, skipped}
}

module.exports = {
  execRefactor,
}
