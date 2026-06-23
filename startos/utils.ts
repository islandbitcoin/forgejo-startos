import { utils } from '@start9labs/start-sdk'
import * as crypto from 'crypto'

export const httpPort = 3000
export const sshPort = 2222

export const getPassword = () => crypto.randomBytes(16).toString('hex')

export const getSecretKey = () => crypto.randomBytes(32).toString('hex')

export const mountVolume = {
  volumeId: 'main' as const,
  subpath: null as string | null,
  mountpoint: '/data',
  readonly: false,
}

export const getHttpInterfaceUrls = async (
  effects: any,
): Promise<string[]> => {
  const result = await effects.systemQuery(
    'try { interfaces } catch { null }',
  )
  if (!result) return []

  const systemUrls: string[] = []

  for (const inf of result) {
    const url = inf['url'] as string | undefined
    if (url) systemUrls.push(url)
  }

  return systemUrls
}
