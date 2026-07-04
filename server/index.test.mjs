import test from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

async function waitForHealth(timeoutMs = 20000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/health')
      if (response.ok) {
        return
      }
    } catch {
      // Keep retrying until the timeout expires.
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error('Timed out waiting for the backend health endpoint')
}

test('npm run dev starts the backend API alongside the frontend', async () => {
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const child = spawn(command, ['run', 'dev'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, CI: '1' },
  })

  let output = ''
  child.stdout.on('data', (chunk) => {
    output += chunk.toString()
  })
  child.stderr.on('data', (chunk) => {
    output += chunk.toString()
  })

  try {
    await waitForHealth()

    const response = await fetch('http://127.0.0.1:3001/api/health')
    assert.equal(response.status, 200)
  } finally {
    child.kill('SIGTERM')
  }
})
