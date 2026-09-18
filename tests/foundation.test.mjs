import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(path, 'utf8')

test('runtime contract declares Node 22 and deterministic scripts', async () => {
  const pkg = JSON.parse(await read('package.json'))
  assert.equal(pkg.engines.node, '>=22')
  assert.equal(pkg.scripts.build, 'rm -rf dist && cp -R public dist && node scripts/verify-build.mjs')
  assert.equal(pkg.scripts.test, 'node --test')
})

test('public foundation status preserves the G0 boundary', async () => {
  const page = await read('public/index.html')
  assert.match(page, /PHASE 1/)
  assert.match(page, /G0 — PARTIAL \/ BLOCKED/)
  assert.match(page, /technical foundation/i)
})

test('health signal is public-safe and machine-readable', async () => {
  const health = JSON.parse(await read('public/health.json'))
  assert.deepEqual(health, {
    status: 'ready',
    service: 'kaervax-foundation',
    phase: 1,
    gate: 'G1',
    g0: 'PARTIAL / BLOCKED',
  })
})

test('secret-bearing local files are ignored', async () => {
  const gitignore = await read('.gitignore')
  for (const entry of ['.dev.vars', '.env', '.env.*', '*.pem', '*.key']) {
    assert.ok(gitignore.split('\n').includes(entry), `${entry} must be ignored`)
  }
})

test('security headers include minimum public-site protections', async () => {
  const headers = await read('public/_headers')
  for (const header of [
    'Content-Security-Policy',
    'Referrer-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Permissions-Policy',
  ]) {
    assert.match(headers, new RegExp(header))
  }
})
