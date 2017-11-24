const yargs = require('yargs')
  .usage('Usage: react-refactor [args] <filename>')
  .help('help')
  .alias('help', 'h')
  .version()

  .option('clipboard', {
    alias: 'c',
    describe: 'Copy output on clipboard',
    type: 'boolean'
  })

  .option('output', {
    alias: 'o',
    describe: 'Save output on file',
    type: 'string'
  })

const argv = yargs.argv

if (!argv._[0]) {
  yargs.showHelp();
  process.exit(-1)
}

export default argv
