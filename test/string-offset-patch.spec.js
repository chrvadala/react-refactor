const {patchString, INSERT, REMOVE, insert, remove} = require('../src/string-offset-patch');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe('patchString', () => {
  it('should insert a new part', () => {
    const patch = [
      {operation: INSERT, start: 5, payload: 'xxabcdxx'}
    ];
    expect(patchString(alphabet, patch)).toBe('ABCDExxabcdxxFGHIJKLMNOPQRSTUVWXYZ')
  });

  it('should remove a part', () => {
    const patch = [
      {operation: REMOVE, start: 5, end: 10}
    ];
    expect(patchString(alphabet, patch)).toBe('ABCDEKLMNOPQRSTUVWXYZ')
  });

  it('should apply differents patches (ir)', () => {
    const patch = [
      insert(0, 'xxabcdxx'),
      remove(2, 5), //CDE
    ];
    expect(patchString(alphabet, patch)).toBe('xxabcdxxABFGHIJKLMNOPQRSTUVWXYZ')
  })

  it('should apply differents patches (irir)', () => {
    const patch = [
      insert(0, 'xxabcdxx'),
      remove(2, 5), //CDE
      insert(5, 'yyefghyy'),
      remove(5, 9), //EFGH
    ];

    expect(patchString(alphabet, patch)).toBe('xxabcdxxAByyefghyyJKLMNOPQRSTUVWXYZ')
  })

  it('should apply differents patches (rrirri)', () => {
    let patch = []

    //rem AB
    patch.push(remove(0, 2))
    expect(patchString(alphabet, patch)).toBe('CDEFGHIJKLMNOPQRSTUVWXYZ')

    //rem FG
    patch.push(remove(5, 7))
    expect(patchString(alphabet, patch)).toBe('CDEHIJKLMNOPQRSTUVWXYZ')

    //ins yy123yy
    patch.push(insert(11, 'yy123yy'))
    expect(patchString(alphabet, patch)).toBe('CDEHIJKyy123yyLMNOPQRSTUVWXYZ')

    //rem L
    patch.push(remove(11, 12))
    expect(patchString(alphabet, patch)).toBe('CDEHIJKyy123yyMNOPQRSTUVWXYZ')

    //rem Z
    patch.push(remove(25, 26))
    expect(patchString(alphabet, patch)).toBe('CDEHIJKyy123yyMNOPQRSTUVWXY')

    //ins xx456xx
    patch.push(insert(26, 'xx456xx'))
    expect(patchString(alphabet, patch)).toBe('CDEHIJKyy123yyMNOPQRSTUVWXYxx456xx')
  })
});
