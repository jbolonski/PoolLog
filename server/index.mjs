import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createPoolLogStore } from './poolLogStore.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = Number(process.env.PORT || 3001)
const store = createPoolLogStore(process.env.POOLLOG_DATA_PATH || path.join(__dirname, 'data', 'entries.json'))
const frontendDistPath = process.env.POOLLOG_DIST_PATH || path.join(__dirname, '..', 'dist')

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/pool-logs', async (_req, res) => {
  try {
    const entries = await store.listEntries()
    res.json(entries)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to load pool log entries' })
  }
})

app.post('/api/pool-logs', async (req, res) => {
  try {
    const entry = await store.addEntry({
      id: req.body.id || `${Date.now()}`,
      timestamp: req.body.timestamp || new Date().toLocaleString(),
      ph: Number(req.body.ph),
      chlorinePpm: Number(req.body.chlorinePpm),
      saltPpm: Number(req.body.saltPpm),
      temperature: Number(req.body.temperature),
      totalAlkalinity: req.body.totalAlkalinity === '' ? null : Number(req.body.totalAlkalinity)
    })

    res.status(201).json(entry)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to save pool log entry' })
  }
})

app.use(express.static(frontendDistPath))

app.get(/.*/, (_req, res) => {
  const indexPath = path.join(frontendDistPath, 'index.html')

  if (!fs.existsSync(indexPath)) {
    res.status(404).send('Frontend assets are not available. The frontend container should serve them directly.')
    return
  }

  res.sendFile(indexPath)
})

app.listen(port, host, () => {
  console.log(`PoolLog server listening on ${host}:${port}`)
})
