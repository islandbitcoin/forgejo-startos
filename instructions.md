# Forgejo

Forgejo is a self-hosted Git forge for repositories, issues, pull requests, packages, and project collaboration.

## Documentation

- [Forgejo documentation](https://forgejo.org/docs/latest/) - upstream installation, administration, and user guides.
- [Forgejo configuration cheat sheet](https://forgejo.org/docs/latest/admin/config-cheat-sheet/) - supported configuration keys and environment variable format.

## What you get on StartOS

- A **Forgejo Web UI** interface on port 3000 for browser-based repository management.
- An **SSH** interface on port 2222 for Git operations over SSH.
- Persistent Forgejo data stored in the `main` volume at `/var/lib/gitea`.
- SQLite storage by default, created by Forgejo on first start.

## Getting set up

1. Start the service and open the **Forgejo Web UI** interface.
2. Complete the Forgejo installation wizard. The default database type is SQLite, and the data path is stored in the service volume.
3. Create the first user account. Forgejo grants site administration rights to the first registered user.
4. In Forgejo, add your SSH public key to your account before cloning or pushing over the **SSH** interface.

## Git access

Use the web interface for HTTPS clone URLs and the SSH interface for SSH clone URLs. The rootless Forgejo image listens for SSH on port 2222 inside the container, which StartOS exposes through the **SSH** interface.

## Configuration

Forgejo supports environment-based configuration in the form:

```
FORGEJO__[SECTION]__[KEY]=value
```

For example, upstream Forgejo settings from the `[server]` section can be supplied as `FORGEJO__server__ROOT_URL`, `FORGEJO__server__SSH_PORT`, and similar keys if this package is extended with user configuration in the future.

## Backups

The StartOS backup for this service includes the `main` volume. Backups include the SQLite database, repositories, attachments, avatars, and configuration files stored under `/var/lib/gitea`.
