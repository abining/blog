import fs from 'node:fs'
import path from 'node:path'

export function tryReadFileSync(p: string) {
  let content = ''
  try {
    content = fs.readFileSync(p, 'utf-8')
  } catch (error) {}

  return content
}

export function getAssetImagePath(url: string) {
  return path.join('public', 'images', url)
}
