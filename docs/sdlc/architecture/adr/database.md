<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-17

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- SQLite
- MySQL

## Decision Outcome

Chosen option: PostgreSQL 16, because Roughly 80,000 read-only airport rows with codes, names, cities, countries, and coordinates store comfortably and re-import cleanly, and Postgres answers lookup-by-code queries without extra moving parts.

## Consequences

Typo-tolerant type-as-you-go search is delegated to the approved Meilisearch service rather than Postgres full-text, as required by NFR-001; Postgres remains the source of truth that Meilisearch mirrors.
<!-- sdlc:auto:end adr -->