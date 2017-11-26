#!/usr/bin/env node

//version check
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
updateNotifier({pkg}).notify();

//command
const argv = require('../build/argv').default
const command = require('../build/command').default
command(argv._[0], argv)
