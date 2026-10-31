# MiKi core API (Go)

```bash
go vet ./...
go test ./...
go run ./cmd/api          # listens on :8080 (set PORT to change)
curl http://localhost:8080/healthz
```

Settings come from environment variables: `PORT` (default 8080) and `APP_ENV` (default development).
Endpoints other than `/healthz` must verify the caller's Supabase token (see `docs/DECISIONS.md`, D16).
