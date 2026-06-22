<p align="center">
  <img src="icon.svg" alt="Forgejo Logo" width="21%">
</p>

# Forgejo on StartOS

> **Upstream docs:** <https://forgejo.org/docs/latest/>
>
> Everything not listed in this document should behave the same as upstream
> Forgejo. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[Forgejo](https://forgejo.org) is a self-hosted lightweight Git forge for
repositories, issues, pull requests, packages, and project collaboration.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Image | `codeberg.org/forgejo/forgejo:15-rootless` (unmodified upstream) |
| Architectures | x86_64, aarch64 |
| Entrypoint | Upstream default entrypoint |

Forgejo runs as the `git` user (UID 1000) inside the container. The first-start
oneshot changes ownership of the data directory to this user.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/var/lib/gitea` | SQLite database, repositories, config, and all Forgejo data |

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Installation | Run Docker with compose | Install from marketplace or sideload `.s9pk` |
| First start | Open `http://localhost:3000` | Open the **Forgejo Web UI** interface |
| Initial config | Web installer (DB type, admin account) | Same upstream flow |

After first launch, open the **Forgejo Web UI** interface. Forgejo will show
its installation page where you choose:

- **Database**: SQLite (default) — no external DB needed
- **Admin account**: Create your initial administrator user
- **Server settings**: Leave defaults or customize

---

## Configuration Management

This package does not set any Forgejo environment variables by default.
Forgejo is configured through the web installer on first start and through
the `app.ini` configuration file at `/var/lib/gitea/app.ini` thereafter.

To set environment-based configuration, use StartOS's config management
to set variables like `FORGEJO__server__DOMAIN` or
`FORGEJO__database__DB_TYPE`. See the [configuration cheat sheet](https://forgejo.org/docs/latest/admin/config-cheat-sheet/)
for the full key mapping.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Type | Description |
|-----------|------|----------|------|-------------|
| Forgejo Web UI | 3000 | HTTP | ui | Repository browser, issue tracker, admin panel |
| SSH | 2222 | Raw TCP | raw | Git operations over SSH |

Forgejo clients should use the **Forgejo Web UI** URL for browser access and
the **SSH** host:port for `git remote` URLs.

---

## Actions (StartOS UI)

None. Administration is handled in the Forgejo web interface.

---

## Backups and Restore

**Included in backup:**

- `main` volume — SQLite database, repositories, SSH host keys, and all
  Forgejo data

**Restore behavior:**

- All data is restored from the `main` volume
- Repository `.git` directories are included automatically

---

## Health Checks

| Check | Display | Method | Messages |
|-------|---------|--------|----------|
| Primary daemon | "primary daemon" | Port listening (3000) | "Forgejo is ready" / "Forgejo is not ready" |

---

## Dependencies

None. Forgejo uses SQLite by default and does not require PostgreSQL or
another StartOS service.

---

## Limitations and Differences

1. **SQLite-first** — suitable for single-server use; PostgreSQL and MySQL
   are not wired as configurable options yet.
2. **Actions runners** — not pre-configured. You can add runners manually
   via the Forgejo admin UI after installation.
3. **No email** — SMTP is not configured by default. Set
   `FORGEJO__mailer__ENABLED=true` and related vars to enable email.
4. **SSH on 2222** — the rootless image uses port 2222 internally; the
   StartOS interface exports this so clients access it transparently.

---

## What Is Unchanged from Upstream

- Repository management (clone, push, pull over SSH and HTTP)
- Issue tracker and pull requests
- Package registry
- Organization and team management
- Web UI and admin panel
- Forgejo Actions (available but no built-in runners)
- LFS support (via upstream configuration)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions and development
workflow.

---

## Quick Reference for AI Consumers

```yaml
package_id: forgejo
image: codeberg.org/forgejo/forgejo:15-rootless
architectures:
  - x86_64
  - aarch64
volumes:
  main: /var/lib/gitea
ports:
  api: 3000
  ssh: 2222
dependencies: none
startos_managed_env_vars: none
actions: none
```
