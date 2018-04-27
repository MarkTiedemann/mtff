'use strict'

export const EOL = 'EOL'

export default function print_char(char) {
  if (char === undefined) {
    return EOL
  } else if (char === '\\') {
    return '`\\`'
  } else if (char === '\t') {
    return '`\\t`' // tab
  } else if (char === '\v') {
    return '`\\v`' // vertical tab
  } else if (char === '\f') {
    return '`\\f`' // form feed
  } else if (char === '\r') {
    return '`\\r`' // carriage return
  } else {
    return '`' + char + '`'
  }
}
