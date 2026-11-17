<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-17

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because AWS serves the static SPA (S3/CloudFront), runs the small FastAPI service and Meilisearch container, and hosts PostgreSQL (RDS), and it scales down cheaply when traffic is low - which matters for a free tool with no revenue.

## Consequences

Running Meilisearch as a Fargate task plus RDS adds a little fixed cost versus a pure serverless setup, but keeps search instant and the directory reliable under unpredictable public traffic.
<!-- sdlc:auto:end adr -->