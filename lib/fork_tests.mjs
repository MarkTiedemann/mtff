'use strict'

import fs from 'fs'
import path from 'path'
import cp from 'child_process'

const root = 'lib'

const tests = fs
  .readdirSync(root)
  .filter(file => file.endsWith('_test.mjs'))
  .map(file => path.join(root, file))

for (const test of tests) {
  const fork = cp.fork(test)
  const messages = []
  fork.on('message', message => {
    messages.push(message)
  })
  fork.on('close', () => {
    process.stdout.write(messages.join(''))
  })
}
