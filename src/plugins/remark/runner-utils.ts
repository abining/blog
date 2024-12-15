import { ComponentKey } from '../constant'
import { buildHandlerFunction } from '../utils'

export const RunCodeKey = `${ComponentKey}run-code`
export const handleRunCode = buildHandlerFunction(RunCodeKey)

export function isTypeScript(lang: string) {
  lang = lang.toLowerCase()
  return lang === 'ts' || lang === 'typescript'
}

export function isJavaScript(lang: string) {
  lang = lang.toLowerCase()
  return lang === 'js' || lang === 'javascript'
}

export const RunnerName = 'Run'

export function isRuner(props: any) {
  return props[ComponentKey] === RunnerName
}
