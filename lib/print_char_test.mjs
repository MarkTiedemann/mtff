'use strict'

import test from './test'
import print_char, { EOL } from './print_char'

function end_of_line(eq) {
  eq(print_char(undefined), EOL)
}

function slash(eq) {
  eq(print_char('\\'), '`\\`')
}

function tab(eq) {
  eq(print_char('\t'), '`\\t`')
}

function vertical_tab(eq) {
  eq(print_char('\v'), '`\\v`')
}

function form_feed(eq) {
  eq(print_char('\f'), '`\\f`')
}

function carriage_return(eq) {
  eq(print_char('\r'), '`\\r`')
}

function simple_char(eq) {
  eq(print_char('a'), '`a`')
}

test('print_char', [
  end_of_line,
  slash,
  tab,
  vertical_tab,
  form_feed,
  carriage_return,
  simple_char
])
