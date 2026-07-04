import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')
const viteEntry = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js')
const backendEntry = path.join(projectRoot, 'server', 'index.mjs')

const children = []

function startChild(command, args) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env },
  })

  children.push(child)
  return child
}

function stopAll(signal = 'SIGTERM') {
  for (const child of children) {
    if (!child.killed) {
      child.kill(signal)
    }
  }
}

process.on('SIGINT', () => {
  stopAll('SIGINT')
  process.exit(0)
})

process.on('SIGTERM', () => {
  stopAll('SIGTERM')
  process.exit(0)
})

const backend = startChild(process.execPath, [backendEntry])

backend.on('exit', (code, signal) => {
  if (signal) {
    stopAll(signal)
    process.exit(0)
  }

  if (code !== 0) {
    stopAll('SIGTERM')
    process.exit(code ?? 1)
  }
})

const vite = startChild(process.execPath, [viteEntry])

vite.on('exit', (code, signal) => {
  if (signal) {
    stopAll(signal)
    process.exit(0)
  }

  if (code !== 0) {
    stopAll('SIGTERM')
    process.exit(code ?? 1)
  }
})
