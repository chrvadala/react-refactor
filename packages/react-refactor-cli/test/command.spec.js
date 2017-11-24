import path from 'path'
import fs from 'fs'
import {createCommand} from '../src/command'

const testfile = path.join(__dirname, './__fixture__/Func.jsx')

describe('command', () => {

  it('should generate output on console', () => {
    const writeMock = jest.fn()
    const fsMock = {
      readFileSync: jest.fn(fs.readFileSync),
      writeFileSync: jest.fn(),
    }

    const command = createCommand(writeMock, fsMock)
    const options = {}

    command(testfile, options)

    expect(fsMock.readFileSync).toBeCalledWith(testfile, 'utf8');
    expect(fsMock.writeFileSync).not.toBeCalled();
    expect(writeMock).toBeCalled();
    expect(writeMock.mock.calls[0][0]).toMatch(/class *Func/g)
  })

  it('should generate output on file', () => {
    const writeMock = jest.fn()
    const fsMock = {
      readFileSync: jest.fn(fs.readFileSync),
      writeFileSync: jest.fn(),
    }

    const command = createCommand(writeMock, fsMock)
    const options = {
      output: path.join(__dirname, './__fixture__/Output.jsx')
    }

    command(testfile, options)

    expect(fsMock.readFileSync).toBeCalledWith(testfile, 'utf8');
    expect(fsMock.writeFileSync).toBeCalled();
    expect(fsMock.writeFileSync.mock.calls[0][1]).toMatch(/class *Func/g)
    expect(writeMock).toBeCalledWith('Output saved on file');
  })
})



