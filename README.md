# MiKi

MiKi AI is building an AI team for physical retail stores in Kenya. This repository holds the public
website (miki.si) and the private team console. The store product itself is in development.

- AI assistants and new developers: start with [`CLAUDE.md`](CLAUDE.md), then [`docs/`](docs).
- Run it locally: [`docs/SETUP.md`](docs/SETUP.md).
- Where files belong: [`structure.md`](structure.md).
- Stack: Next.js 16, React 19, Supabase, Vercel.

```bash
pnpm install
cp .env.example .env.local   # fill in the values; never commit this file
pnpm dev                     # http://localhost:3000
pnpm build
```
