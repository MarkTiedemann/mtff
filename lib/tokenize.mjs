'use strict'

import split_lines, { EMPTY_LINE } from './split_lines'
import print_char from './print_char'

function but_found(char, pos, line) {
  return `but found ${print_char(char)} (at position ${pos}, line ${line})`
}

const errors = {
  CommentIdentifierMustBeFollowedByASingleSpace: ({ char, pos, line }) =>
    'Comment identifier `~` must be followed by a single space ` `, ' +
    but_found(char, pos, line),
  CommentMayNotContainLeadingWhitespaces: ({ char, pos, line }) =>
    'Comment may not contain any leading whitespaces, ' +
    but_found(char, pos, line),
  CommentMayNotContainTrailingWhitespaces: ({ char, pos, line }) =>
    'Comment may not contain any trailing whitespaces, ' +
    but_found(char, pos, line),
  LineStartsWithUnknownIdentifier: ({ char, pos, line }) =>
    `Line starts with unknown identifier ${print_char(char)} ` +
    `(at position ${pos}, line ${line})`
}

export default function tokenize(input) {
  const lines = split_lines(input)
  const tokens = []

  const error = value => tokens.push({ type: 'error', value })
  const comment = value => tokens.push({ type: 'comment', value })

  for (let i = 0; i < lines.length; i++) {
    const chars = Array.from(lines[i])

    if (chars[0] === '!') {
      // Comment
      if (chars[1] !== ' ') {
        const e = { char: chars[1], pos: 2, line: i + 1 }
        error(errors.CommentIdentifierMustBeFollowedByASingleSpace(e))
      } else {
        if (/\s/.test(chars[2])) {
          const e = { char: chars[2], pos: 3, line: i + 1 }
          error(errors.CommentMayNotContainLeadingWhitespaces(e))
        } else {
          let j = chars.length - 1
          while (/\s/.test(chars[j])) j--
          if (j !== chars.length - 1) {
            const e = { char: chars[j + 1], pos: j + 2, line: i + 1 }
            error(errors.CommentMayNotContainTrailingWhitespaces(e))
          } else {
            comment(chars.slice(2).join(''))
          }
        }
      }
    } else {
      // Unknown
      const e = { char: chars[0], pos: 1, line: i + 1 }
      error(errors.LineStartsWithUnknownIdentifier(e))
    }
  }

  return tokens
}
