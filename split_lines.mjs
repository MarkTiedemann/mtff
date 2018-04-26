'use strict'

export const EMPTY_LINE = Symbol('EMPTY_LINE')

export default function split_lines(input) {
  return input.split(/\r?\n/).map(line => {
    return line === '' ? EMPTY_LINE : line
  })
}
