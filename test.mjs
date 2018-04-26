'use strict'

// @ts-ignore
import assert from 'assert'
// @ts-ignore
import split_lines from './split_lines'

export default function test(suite, tests) {
  for (const test of tests) {
    const name = test.name.replace(/_/g, ' ')
    try {
      test(assert.deepStrictEqual)
      console.log(`${green('✔')} ${suite}: ${name}`)
    } catch (err) {
      const msg = split_lines(err.message)
        .slice(3)
        .join('\n')
      const log = `${red('✖')} ${suite}: ${name}\n\n${msg}\n`
      console.error(log)
    }
  }
}

function green(str) {
  return '\x1b[32m' + str + '\x1b[0m'
}

function red(str) {
  return '\x1b[31m' + str + '\x1b[0m'
}
