const INSERT = 'insert';
const REMOVE = 'remove';

const insert = (start, payload) => ({operation: INSERT, start, payload})
const remove = (start, end) => ({operation: REMOVE, start, end})

const StartGTEndError = new Error('Start offset should be greater than end offset')
const StartGTLengthError = new Error('start offset should be lower than the size of the string')
const PatchesUnsortedError = new Error('Patches should be provided sorted by start offset')
const UnsupportedOperationError = new Error('Unsupported operation')

function patchString(string, patch) {
  let cur = 0;
  let out = '';

  for (let i = 0; i < patch.length; i++) {
    let {operation, start, end, payload} = patch[i];

    if (end && (start > end)) throw new StartGTEndError()
    if (start > string.length) throw new StartGTLengthError()
    if (cur > start) throw new PatchesUnsortedError()

    out += string.substring(cur, start);
    cur = start;

    switch (operation) {
      case INSERT:
        out += payload;
        break;

      case REMOVE:
        cur = end;
        break;

      default:
        throw new UnsupportedOperationError()
    }
  }

  out += string.substring(cur);

  return out
}

module.exports = {
  patchString,
  INSERT,
  REMOVE,
  insert,
  remove,
};
