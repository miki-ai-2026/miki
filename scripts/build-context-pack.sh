#!/usr/bin/env bash
# Builds MIKI_CONTEXT_PACK.md: CLAUDE.md plus the docs in one file you can attach to an AI chat.
# Run from anywhere inside the repo:  bash scripts/build-context-pack.sh
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="${1:-MIKI_CONTEXT_PACK.md}"
FILES="CLAUDE.md structure.md docs/PROJECT_OVERVIEW.md docs/ARCHITECTURE.md docs/DATABASE.md docs/DECISIONS.md docs/ROADMAP.md docs/CHANGELOG.md docs/SETUP.md docs/OPEN_QUESTIONS.md docs/PARTNER_HANDOFF.md"
{
  echo "# MiKi context pack"
  echo
  echo "Generated on $(date +%F) from CLAUDE.md and docs/. If this disagrees with the repository, the repository wins."
  for f in $FILES; do
    if [ -f "$f" ]; then
      echo; echo "---"; echo; echo "<!-- FILE: $f -->"; echo
      cat "$f"
    fi
  done
} > "$OUT"
touch .gitignore
grep -q '^MIKI_CONTEXT_PACK.md$' .gitignore || printf '\nMIKI_CONTEXT_PACK.md\n' >> .gitignore
echo "Wrote $OUT ($(wc -c < "$OUT") bytes)"
