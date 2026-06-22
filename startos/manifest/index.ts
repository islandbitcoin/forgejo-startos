import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'forgejo',
  title: 'Forgejo',
  license: 'MIT',
  packageRepo: 'https://github.com/islandbitcoin/forgejo-startos',
  upstreamRepo: 'https://codeberg.org/forgejo/forgejo',
  marketingUrl: 'https://forgejo.org',
  donationUrl: null,
  description: i18n.description,
  volumes: ['main'],
  images: {
    forgejo: {
      source: { dockerTag: 'codeberg.org/forgejo/forgejo:15-rootless' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
