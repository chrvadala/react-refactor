#!/usr/bin/env node
const argv = require('../src/argv')
const execRefactorOnFile = require('../src/command')

execRefactorOnFile(argv._[0], argv)
