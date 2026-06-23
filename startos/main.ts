import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { httpPort, sshPort, mountVolume } from './utils'
import { i18n } from './i18n'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Forgejo!'))

  const storeRaw = await storeJson.read((s) => s).const(effects)
  const store = storeRaw || {
    FORGEJO__server__ROOT_URL: '',
    FORGEJO__security__SECRET_KEY: '',
    FORGEJO__service__DISABLE_REGISTRATION: true,
    smtp: null,
  }

  // If store.json doesn't have a SECRET_KEY yet, we failed to seed
  // on install — create a warning message but don't crash
  if (!store.FORGEJO__security__SECRET_KEY) {
    console.warn(i18n('Store not found'))
  }

  const mounts = sdk.Mounts.of().mountVolume(mountVolume)

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'forgejo' },
    mounts,
    'forgejo-sub',
  )

  const env: Record<string, string> = {}

  env.FORGEJO__log__LEVEL = 'info'
  env.FORGEJO__server__HTTP_PORT = String(httpPort)
  env.FORGEJO__server__SSH_PORT = String(sshPort)
  env.FORGEJO__server__SSH_DOMAIN = 'forgejo.embassy'
  env.FORGEJO__security__SECRET_KEY = store.FORGEJO__security__SECRET_KEY
  env.FORGEJO__server__ROOT_URL = store.FORGEJO__server__ROOT_URL || ''
  env.FORGEJO__server__COOKIE_USER_NAME = 'i_like_forgejo'
  env.FORGEJO__server__LFS_START_SERVER = String(true)
  env.FORGEJO__service__DISABLE_REGISTRATION = String(
    store.FORGEJO__service__DISABLE_REGISTRATION,
  )

  const smtp = store.smtp
  if (smtp && smtp.selection !== 'disabled') {
    env.FORGEJO__mailer__ENABLED = String(true)

    if (smtp.selection === 'system') {
      // System SMTP — Atoll sets this up via StartOS system config
      env.FORGEJO__mailer__FROM = smtp.value.customFrom || 'forgejo@embassy'
    } else if (smtp.selection === 'custom') {
      const p = smtp.value.provider.value
      env.FORGEJO__mailer__SMTP_ADDR = p.host
      env.FORGEJO__mailer__SMTP_PORT = p.security.value.port
      env.FORGEJO__mailer__SMTP_PROTOCOL = p.security.selection
      env.FORGEJO__mailer__FROM = p.from
      if (p.username) env.FORGEJO__mailer__USER = p.username
      if (p.password) env.FORGEJO__mailer__PASSWD = p.password
    }
  }

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: sdk.useEntrypoint(),
      env,
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkWebUrl(
          effects,
          `http://127.0.0.1:${httpPort}/api/healthz`,
          {
            timeout: 60_000,
            successMessage: i18n('Forgejo is ready'),
            errorMessage: i18n(
              'Forgejo is still starting. If this persists, please check the logs.',
            ),
          },
        ),
    },
    requires: [],
  })
})
