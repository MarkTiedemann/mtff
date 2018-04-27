'use strict'

import test from './test'
import tokenize from './tokenize'

function error_CommentIdentifierMustBeFollowedByASingleSpace(eq) {
  eq(tokenize('!'), [
    {
      type: 'error',
      value:
        'Comment identifier `~` must be followed by a single space ` `, but found EOL (at position 2, line 1)'
    }
  ])
  eq(tokenize('!a'), [
    {
      type: 'error',
      value:
        'Comment identifier `~` must be followed by a single space ` `, but found `a` (at position 2, line 1)'
    }
  ])
}

function error_CommentMayNotContainLeadingWhitespaces(eq) {
  eq(tokenize('!  '), [
    {
      type: 'error',
      value:
        'Comment may not contain any leading whitespaces, but found ` ` (at position 3, line 1)'
    }
  ])
}

function error_CommentMayNotContainTrailingWhitespaces(eq) {
  eq(tokenize('! a '), [
    {
      type: 'error',
      value:
        'Comment may not contain any trailing whitespaces, but found ` ` (at position 4, line 1)'
    }
  ])
  eq(tokenize('! a\t '), [
    {
      type: 'error',
      value:
        'Comment may not contain any trailing whitespaces, but found `\\t` (at position 4, line 1)'
    }
  ])
}

function valid(eq) {
  eq(tokenize('! a'), [{ type: 'comment', value: 'a' }])
  eq(tokenize('! a\n! b'), [
    { type: 'comment', value: 'a' },
    { type: 'comment', value: 'b' }
  ])
}

test('tokenize_comment', [
  error_CommentIdentifierMustBeFollowedByASingleSpace,
  error_CommentMayNotContainLeadingWhitespaces,
  error_CommentMayNotContainTrailingWhitespaces,
  valid
])
