import { sdk } from './sdk'
import { httpPort, sshPort } from './utils'
import { i18n } from './i18n'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const apiMulti = sdk.MultiHost.of(effects, 'api-multi')
  const apiMultiOrigin = await apiMulti.bindPort(httpPort, {
    protocol: 'http',
  })
  const api = sdk.createInterface(effects, {
    name: i18n('Forgejo Web UI'),
    id: 'api',
    description: i18n('Web UI'),
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
    name: i18n('SSH'),
    id: 'ssh',
    description: i18n('SSH port for Git operations'),
    type: 'p2p',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const apiReceipt = await apiMultiOrigin.export([api])
  const sshReceipt = await sshMultiOrigin.export([ssh])

  return [apiReceipt, sshReceipt]
})
