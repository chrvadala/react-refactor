# react-refactor
[![Beerpay](https://beerpay.io/chrvadala/react-refactor/badge.svg?style=beer)](https://beerpay.io/chrvadala/react-refactor)

How many times have you converted a **React Class component** to a **React Functional component** and vice-versa? It’s a boring task, and we know...  "*developers don’t like boring tasks*".
Thanks to **React Refactor** you can convert any React component from and to Class component.

It's made with Babel Babylon and thanks to string replacing it’s able to instantly convert your component to the opposite kind of component that you provided.

**React Refactor** is available in three different packages: Library, CLI, Web Interface

## Library
[![npm](https://img.shields.io/npm/v/react-refactor.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-refactor)
[![Downloads](https://img.shields.io/npm/dm/react-refactor.svg)](https://www.npmjs.com/package/react-refactor)

The package *react-refactor* offers methods to programmatically convert a component. You can use it to make new useful utilities that integrate this ability.
````js
const {execRefactor} = require('react-refactor')
let {output} = execRefactor(source)
````


## CLI
[![npm](https://img.shields.io/npm/v/react-refactor-cli.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-refactor-cli)
[![Downloads](https://img.shields.io/npm/dm/react-refactor-cli.svg)](https://www.npmjs.com/package/react-refactor-cli)

You can globally install the package **react-refactor-cli** and use it to convert your component on the fly.
````
$ yarn global add react-refactor-cli
$ react-refactor [--output <filename>] <filename>
````

## Web interface
You can avoid installing anything and convert your component through the web interface available at [https://chrvadala.github.io/react-refactor/](https://chrvadala.github.io/react-refactor/)

## Changelog
- **v0.0** - Preview version

## Run tests
````
yarn install
yarn run bootstrap
yarn build
yarn test
yarn run clean
````

## Contributors
- [chrvadala](https://github.com/chrvadala) (author)
