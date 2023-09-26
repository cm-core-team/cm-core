# cong-manager

Manage a congregation with ease.

## Development

### To start

- In the project root (where the `docker-compose.yml` file is located), run:

```bash
docker compose up --build
```

This will run in watch mode, so any changes to the code will be reflected in the running container.

- Ensure you have a .env.secret. You can use the .env.example as a template.

### Seeder

- To seed the database, run in the `backend/` folder:

```bash
go run scripts/seed.go
```
