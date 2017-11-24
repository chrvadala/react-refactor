#!/usr/bin/env node
const argv = require('../build/argv').default
const command = require('../build/command').default

command(argv._[0], argv)
