import { FrontmatterWrapStr } from '@/constants'
import { StringValueObj } from '@/types/base'

const RemoveMdSuffixRegx = /\.md$/
export const removeMdSuffix = (p: string) => {
  return p.replace(RemoveMdSuffixRegx, '')
}

export const upperFirstChar = (s: string) => {
  return s[0].toUpperCase() + s.slice(1)
}

interface ThrottleOptions {
  ignoreFirst: boolean
}

export function throttle(
  fn: Function,
  wait = 300,
  { ignoreFirst = false }: ThrottleOptions,
) {
  let start = Date.now()

  return function (this: any, ...args: any[]) {
    const now = Date.now()
    if (now - start < wait) {
      if (ignoreFirst === true) {
        ignoreFirst = false
      } else {
        return
      }
    }
    start = now

    fn.apply(this, args)
  }
}

export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export function isNumber(x: unknown): x is number {
  return typeof x === 'number'
}

export function isFunction(x: unknown): x is Function {
  return typeof x === 'function'
}

export function isSymbol(x: unknown): x is Symbol {
  return typeof x === 'symbol'
}

export type FrontMatterKey = 'note' | 'life' | 'blog' | 'summary'
const frontmatterSet = new Set(['note', 'life', 'blog', 'summary'])
export function getCategory(urls: string | string[]) {
  if (isString(urls)) {
    urls = urls.split('/')
  }
  for (const url of urls) {
    if (frontmatterSet.has(url)) {
      return url as FrontMatterKey
    }
  }
  return 'blog'
}

export function getFirstLine(s: string) {
  let str = ''
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch === '\r' || ch === '\n') {
      return str
    }
    str += ch
  }
  return str
}

export const buildFiles = (code: string, startStr: string) => {
  if (!code?.startsWith(startStr)) {
    code = `/// ${startStr}\n${code}`
  }
  const tokens = code.split('///')
  const attrs: StringValueObj = {}
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token[0] === ' ') {
      const str = getFirstLine(tokens[i])
      const key = str.trim()
      attrs[key] = tokens[i].slice(str.length).trim()
    }
  }
  return attrs
}

const DescNumRegx = /^\d+$/
export function isLikeNum(s: string) {
  if (!s) {
    return false
  }
  return DescNumRegx.test(s)
}

export function removeFrontmatter(md: string) {
  const startIdx = md.indexOf(FrontmatterWrapStr)
  if (startIdx !== 0) {
    return md
  }
  const endIndex = md.indexOf(FrontmatterWrapStr, 1)
  return md.slice(endIndex + FrontmatterWrapStr.length)
}

export function joinFormatPaths(...args: string[]) {
  return args.join('/')
}

export function getYear(date: number) {
  return String(new Date(date).getFullYear())
}

export function isJsxFileLike(p: string) {
  return (
    p.endsWith('.js') ||
    p.endsWith('.jsx') ||
    p.endsWith('.ts') ||
    p.endsWith('.tsx')
  )
}

const Undefined = 'undefined'
const Null = 'null'
export function transfromNoneLogValue(value: any) {
  if (value === undefined) {
    return Undefined
  }
  return Null
}

export function transfromLogValue(value: any) {
  if (isString(value) || isNumber(value)) {
    return value
  }
  if (isFunction(value)) {
    return value.toString()
  }

  if (value == null) {
    return transfromLogValue(value)
  }

  return JSON.stringify(value)
}

export function getType(value: any) {
  const type = Object.prototype.toString.call(value)
  return type.slice(8, type.length - 1)
}

export function isTypeScript(lang: string) {
  lang = lang.toLowerCase()
  return lang === 'ts' || lang === 'typescript'
}

export function isJavaScript(lang: string) {
  lang = lang.toLowerCase()
  return lang === 'js' || lang === 'javascript'
}
