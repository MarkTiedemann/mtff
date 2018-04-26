'use strict'

// @ts-ignore
import test from './test'
// @ts-ignore
import split_lines, { EMPTY_LINE } from './split_lines'

function LF(eq) {
  eq(split_lines('a\nb'), ['a', 'b'])
}

function CR_LF(eq) {
  eq(split_lines('a\r\nb'), ['a', 'b'])
}

function LF_LF_empty_line(eq) {
  eq(split_lines('a\n\nb'), ['a', EMPTY_LINE, 'b'])
}

function CR_LF_CR_LF_empty_line(eq) {
  eq(split_lines('a\r\n\r\nb'), ['a', EMPTY_LINE, 'b'])
}

test('split_lines', [LF, CR_LF, LF_LF_empty_line, CR_LF_CR_LF_empty_line])
