import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'

const requiredFiles = ['dist/index.html', 'dist/health.json', 'dist/_headers']

for (const file of requiredFiles) {
  await access(file, constants.R_OK)
}

const health = JSON.parse(await readFile('dist/health.json', 'utf8'))
if (health.status !== 'ready' || health.service !== 'kaervax-foundation') {
  throw new Error('Build health artifact is invalid')
}

console.log(JSON.stringify({
  event: 'build_verified',
  service: health.service,
  environment: 'build',
  artifacts: requiredFiles,
}))
