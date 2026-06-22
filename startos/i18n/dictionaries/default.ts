export const DEFAULT_LANG = 'en_US'

const dict = {
  'Starting Forgejo!': 0,
  'primary daemon': 1,
  'Web UI': 2,
  SSH: 3,
  'Forgejo is ready': 4,
  'Forgejo is not ready': 5,
  'Your Forgejo Git server': 6,
  'Forgejo Web UI': 7,
  'SSH port for Git operations': 8,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
