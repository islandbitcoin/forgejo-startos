# Contributing

## Keep these in sync

- **[`README.md`](./README.md)**: what this package is and how it's built (image, volumes, interfaces). Technical reference for developers and AI assistants.
- **[`instructions.md`](./instructions.md)**: the user-facing instructions packed into the `.s9pk` and shown on the **Instructions** tab in StartOS, for the person running the service.

**Read both before starting any work.** Any code change that affects user-visible behavior must update `README.md` and `instructions.md` in the same change. Content rules: [Writing READMEs](https://docs.start9.com/packaging/writing-readmes.html), [Writing Instructions](https://docs.start9.com/packaging/writing-instructions.html).

## Environment setup

See [Environment Setup](https://docs.start9.com/packaging/environment-setup.html)

## Building

```bash
npm ci    # install dependencies
make      # build the universal .s9pk
```

For a complete list of build options, see [Makefile](https://docs.start9.com/packaging/makefile.html).

## Updating the upstream version

1. Update `version` and `releaseNotes` in `startos/versions/current.ts` in place: the latest version always lives in `current.ts`; leave the `current` export and `index.ts` untouched. Add a _new_ version file under `startos/versions/` (and wire it into `index.ts`'s `other` array) only when the bump carries an `up`/`down` migration. See [Versions](https://docs.start9.com/packaging/versions.html).

## CI/CD

Three workflows under `.github/workflows/` wrap reusable workflows in [`start9labs/shared-workflows`](https://github.com/Start9Labs/shared-workflows):

- **`build.yml`**: on PR, builds the `.s9pk` and uploads per-arch artifacts for sideload testing.
- **`release.yml`**: on `v*` tag, builds per arch and publishes to the test registry.
- **`tagAndRelease.yml`**: on push to `main`, tags `v<version>` and runs `release.yml`, skipping if already in production.

Promotion to `beta` and `prod` is a separate, manual step.

## How to contribute

1. Fork the repository and create a branch from `main`.
2. Make your changes, including the doc updates above.
3. Open a pull request to `main`.
