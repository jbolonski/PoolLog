import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export function createPoolLogStore(filePath) {
  const resolvedPath = path.resolve(filePath)

  async function ensureFile() {
    await mkdir(path.dirname(resolvedPath), { recursive: true })
    try {
      await readFile(resolvedPath, 'utf8')
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        await writeFile(resolvedPath, '[]', 'utf8')
      } else {
        throw error
      }
    }
  }

  async function listEntries() {
    await ensureFile()
    const content = await readFile(resolvedPath, 'utf8')
    return JSON.parse(content)
  }

  async function addEntry(entry) {
    await ensureFile()
    const entries = await listEntries()
    const nextEntries = [entry, ...entries].slice(0, 25)
    await writeFile(resolvedPath, JSON.stringify(nextEntries, null, 2), 'utf8')
    return entry
  }

  return { listEntries, addEntry }
}
