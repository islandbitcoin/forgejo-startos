import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '15.0.3:0',
  releaseNotes: {
    en_US: `**Initial Release**

- Forgejo -> 15.0.3
- SQLite storage in the main volume
- Web UI and SSH interfaces

**Internal**

- start-sdk -> 1.5.3`,
    es_ES: `**Version inicial**

- Forgejo -> 15.0.3
- Almacenamiento SQLite en el volumen principal
- Interfaces web y SSH

**Interno**

- start-sdk -> 1.5.3`,
    de_DE: `**Erstveroeffentlichung**

- Forgejo -> 15.0.3
- SQLite-Speicher im Hauptvolume
- Web-UI- und SSH-Schnittstellen

**Intern**

- start-sdk -> 1.5.3`,
    pl_PL: `**Pierwsze wydanie**

- Forgejo -> 15.0.3
- Pamiec SQLite w glownym woluminie
- Interfejs web i SSH

**Wewnetrzne**

- start-sdk -> 1.5.3`,
    fr_FR: `**Version initiale**

- Forgejo -> 15.0.3
- Stockage SQLite dans le volume principal
- Interfaces web et SSH

**Interne**

- start-sdk -> 1.5.3`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
