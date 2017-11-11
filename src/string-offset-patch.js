const INSERT = 'insert';
const REMOVE = 'remove';
const REPLACE = 'replace';

const insert = (start, payload) => ({operation: INSERT, start, payload})
const remove = (start, end) => ({operation: REMOVE, start, end})

function patchString(string, patch) {
  let cur = 0;
  let out = "";

  for (let i = 0; i < patch.length; i++) {
    let {operation, start, end, payload} = patch[i];
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
        throw new Error(`Unsupported operation ${operation}`)
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
