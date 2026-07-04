import test from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import { mkdtemp, rm } from 'node:fs/promises'
import { createPoolLogStore } from './poolLogStore.mjs'

test('saves and lists entries', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'poollog-store-'))
  const filePath = path.join(dir, 'entries.json')
  const store = createPoolLogStore(filePath)

  const entry = {
    id: 'entry-1',
    timestamp: '2026-07-04 20:00',
    ph: 7.2,
    chlorinePpm: 1.2,
    saltPpm: 3200,
    temperature: 82,
    totalAlkalinity: null
  }

  await store.addEntry(entry)
  const entries = await store.listEntries()

  assert.equal(entries.length, 1)
  assert.deepEqual(entries[0], entry)

  await rm(dir, { recursive: true, force: true })
})
