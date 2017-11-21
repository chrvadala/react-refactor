const {getOrThrow, get} = require('../src/treeUtils')

const obj = {
  a: 10,
  z: 0,
  b: {
    ba: 20,
    bb: {
      bba: 30,
      bbb: {
        bbba: 40
      }
    }
  }
}

describe('getOrThrow', () => {
  it('should get a data', () => {
    expect(getOrThrow(obj, ['z'])).toBe(0)
    expect(getOrThrow(obj, ['a'])).toBe(10)
    expect(getOrThrow(obj, ['b', 'ba'])).toBe(20)
    expect(getOrThrow(obj, ['b', 'bb', 'bba'])).toBe(30)
    expect(getOrThrow(obj, ['b', 'bb', 'bbb', 'bbba'])).toBe(40)
  })

  it('should throw an exception', () => {
    expect(() => getOrThrow(obj, ['c'])).toThrow()
    expect(() => getOrThrow(obj, ['b', 'c'])).toThrow()
    expect(() => getOrThrow(obj, ['b', 'bb', 'c'])).toThrow()
    expect(() => getOrThrow(obj, ['b', 'bb', 'bba', 'c'])).toThrow()
  })
})

describe('get', () => {
  it('should get a data', () => {
    expect(get(obj, ['z'])).toBe(0)
    expect(get(obj, ['a'])).toBe(10)
    expect(get(obj, ['b', 'ba'])).toBe(20)
    expect(get(obj, ['b', 'bb', 'bba'])).toBe(30)
    expect(get(obj, ['b', 'bb', 'bbb', 'bbba'])).toBe(40)
  })

  it('should return undefined', () => {
    expect(get(obj, ['c'])).toBeFalsy()
    expect(get(obj, ['b', 'c'])).toBeFalsy()
    expect(get(obj, ['b', 'bb', 'c'])).toBeFalsy()
    expect(get(obj, ['b', 'bb', 'bba', 'c'])).toBeFalsy()
  })

  it('should return defaultValue', () => {
    const defVal = '__DEFAULT__'
    expect(get(obj, ['c'], defVal)).toBe(defVal)
    expect(get(obj, ['b', 'c'], defVal)).toBe(defVal)
    expect(get(obj, ['b', 'bb', 'c'], defVal)).toBe(defVal)
    expect(get(obj, ['b', 'bb', 'bba', 'c'], defVal)).toBe(defVal)
  })
})
