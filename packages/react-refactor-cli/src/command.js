import fs from 'fs'
const write = message => console.log(message)

import {execRefactor} from 'react-refactor'

export default createCommand(write, fs);

export function createCommand(write, fs) {
  return function command(file, options) {
    const {
      output = null,
    } = options;

    let source = fs.readFileSync(file, 'utf8')
    let result = execRefactor(source)

    if (output) {
      fs.writeFileSync(output, result.output, 'utf8')
      write('Output saved on file')
      return
    }

    write(result.output)
  }
}

