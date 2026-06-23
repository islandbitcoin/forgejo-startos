import { sdk } from './sdk'
import { httpPort, sshPort, mountVolume } from './utils'
import { i18n } from './i18n'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const apiMulti = sdk.MultiHost.of(effects, 'api-multi')
  const apiMultiOrigin = await apiMulti.bindPort(httpPort, {
    protocol: 'http',
  })
  const api = sdk.createInterface(effects, {
    name: i18n('Web UI and git (HTTP)'),
    id: 'api',
    description: i18n('Web UI for Forgejo. Also used for git over HTTP'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const sshMulti = sdk.MultiHost.of(effects, 'ssh-multi')
  const sshMultiOrigin = await sshMulti.bindPort(sshPort, {
    protocol: 'ssh',
  })
  const ssh = sdk.createInterface(effects, {
    name: i18n('git (SSH)'),
    id: 'ssh',
    description: i18n('Used for git over SSH'),
    type: 'api',
    masked: false,
    schemeOverride: null,
    username: 'git',
    path: '',
    query: {},
  })

  const apiReceipt = await apiMultiOrigin.export([api])
  const sshReceipt = await sshMultiOrigin.export([ssh])

  return [apiReceipt, sshReceipt]
})
