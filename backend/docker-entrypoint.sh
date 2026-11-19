#!/bin/sh
# Applies pending Alembic migrations before the server starts, so a fresh
# deploy against an empty (or behind) database gets its schema without a
# separate, easy-to-forget operator step. Idempotent: `alembic upgrade head`
# on an already-current database is a no-op.
set -e

alembic upgrade head

exec "$@"
