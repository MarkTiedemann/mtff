'use strict'

import test from './test'
import tokenize from './tokenize'

function error_LineStartsWithUnknownIdentifier(eq) {
  eq(tokenize(''), [
    {
      type: 'error',
      value: 'Line starts with unknown identifier EOL (at position 1, line 1)'
    }
  ])
  eq(tokenize('>\n?'), [
    {
      type: 'error',
      value: 'Line starts with unknown identifier `>` (at position 1, line 1)'
    },
    {
      type: 'error',
      value: 'Line starts with unknown identifier `?` (at position 1, line 2)'
    }
  ])
}

test('tokenize', [error_LineStartsWithUnknownIdentifier])
