# KAERVAX

Demand-first commercial business for digital products, services, and custom systems. Runner OS remains a KAERVAX product/system.

## Current Status

- **Technical phase:** 2 — Canonical Domain
- **Technical gate:** G2 — **PASS**
- **Foundation gate:** G1 — **PASS**
- **Commercial gate:** G0 — **PARTIAL / BLOCKED**
- **G0 reason:** real public demand signals and a traceable offer hypothesis exist, but no authorized real buyer interaction or buyer response has been recorded.
- **Boundary:** G2 PASS proves canonical-domain readiness only. It does not mean G0 passed and does not authorize Phase 3 automatically.

## Completed Features / Artifacts

- Vendor-neutral domain kernel in `src/domain/index.js`
- 11 stateful canonical concepts plus `AuditEvent`
- KAERVAX-owned opaque identity and separate provider/evidence references
- Explicit lifecycle state and transition maps
- Relationship and record invariants
- Pure create/transition commands with immutable outcomes
- Human-only consequential `Action` approval with approval reference
- Explicit Phase 2 blocks for authoritative payment and connector execution transitions
- Reference-based audit events for every implemented state change
- Secret-shaped domain/audit value rejection
- 19 automated foundation/domain tests
- Deterministic static build, security headers, and public Phase 2 status/health signals

## Functional Entry URIs

| Path | Purpose | Parameters | Access |
|---|---|---|---|
| `/` | Public-safe Phase 2 and independent gate status | None | Public/read-only |
| `/health.json` | Machine-readable phase, gate, persistence, and external-action state | None | Public/read-only |

No public business API, authentication, payment endpoint, customer portal, mutation endpoint, connector runtime, or operational database is implemented.

## URLs

- **GitHub:** https://github.com/Sparkmind-obp-off/Kaervax
- **Production:** https://kaervax.pages.dev
- **Custom domain:** https://kaervax.biz.id
- **Verified Phase 2 deployment:** https://de591295.kaervax.pages.dev

## Domain Architecture

### Stateful concepts

`Source`, `DemandSignal`, `Opportunity`, `Offer`, `Action`, `Conversation`, `Transaction`, `Delivery`, `Learning`, `Connector`, and `ConnectorExecution`.

`AuditEvent` is append-oriented event semantics rather than a lifecycle entity.

### Ownership

- KAERVAX owns canonical IDs, records, lifecycle state, rules, and audit semantics.
- Providers own provider-native IDs/accounts/payloads/platform state.
- External references remain separate provenance/evidence fields and cannot replace canonical identity.

### Commands

- `createDemandSignal(command, context)`
- `createEntity(entityType, attributes, context)`
- `transitionEntity(entity, command, context)`

These functions are pure domain boundaries. They return a canonical entity and audit event; they do not persist data or execute an external action.

See `docs/phase-2/43_CANONICAL_DOMAIN_CONTRACT.md` for complete lifecycle, invariant, audit, and deferral rules.

## Data Architecture

- **Current persistent records:** version-controlled source, governance, and evidence documents.
- **Application database:** deferred; Phase 2 has no authorized operational stateful workflow.
- **Migrations:** deferred with persistence.
- **Durable audit storage:** deferred; commands currently produce audit descriptions for a future atomic persistence boundary.
- **Authentication/authorization:** deferred; no protected or mutating HTTP capability exists.
- **Production application secrets:** none required.
- **Deployment credentials:** supplied outside Git through approved BYOK/GitHub mechanisms.
- **Evidence classes:** `OBSERVED`, `DERIVED`, `SYNTHETIC`.

## Security Boundaries

- No secret may enter source, domain records, audit data, fixtures, or documentation.
- Consequential `Action` approval requires a `HUMAN_OPERATOR` and `approvalRef`.
- No action execution command exists.
- Payment `PAID`/`REFUNDED` transitions are blocked until later authoritative verification work.
- Connector execution transitions are blocked until the later connector runtime phase.
- Core identity/state/ownership/revision fields are caller-inaccessible.

## User Guide

1. Open `/` to inspect the public Phase 2 status.
2. Open `/health.json` for the machine-readable gate/scope signal.
3. Read `docs/phase-2/43_CANONICAL_DOMAIN_CONTRACT.md` for the canonical model.
4. Read `docs/phase-2/44_G2_GATE_ASSESSMENT.md` and `docs/phase-2/45_PHASE_2_EXECUTION_REPORT.md` for verified evidence and limitations.
5. Do not treat domain tests, deployment, or G2 PASS as buyer, payment, delivery, or commercial evidence.

## Development and Verification

```bash
npm ci
npm run verify
npm run preview
```

- **Node.js:** 22 or newer
- **Package manager:** npm
- **Build output:** `dist/`
- **Automated result at Phase 2 close:** 19 passed, 0 failed, 0 skipped
- **Dependency audit:** zero vulnerabilities at Phase 2 close

In the managed sandbox, build first and start `ecosystem.config.cjs` with PM2.

## Deployment

- **Platform:** Cloudflare Pages, operator-owned account via BYOK
- **Project:** `kaervax`
- **Production branch:** `main`
- **Status:** active and verified on 2026-09-18
- **Application secrets/bindings:** none
- **Database/migrations:** none
- **Release implementation commit:** `c6dad0a35c3a53973c1dad1f3d7ada93a431fd98`
- **Recovery unit:** known verified Git commit rebuilt and redeployed

## Not Yet Implemented

- authorized buyer outreach/response capture and G0 passage
- persistent application records or durable audit storage
- authenticated application API or protected operator capability
- demand ingestion, normalization, deduplication, or scoring
- opportunity intelligence or offer composition/version workflows
- outbound action execution or connector runtime/marketplace
- payment gateway, authoritative payment verification, or reconciliation
- customer portal, tenancy, or broad RBAC
- delivery or learning automation
- Runner OS application or autonomous agent orchestration

## Recommended Next Steps

1. Stop at G2; do not begin Phase 3 without separate authorization.
2. Independently address G0 through one approved real buyer interaction and verified payment-authority path.
3. If Phase 3 is later authorized, add only the minimum demand-intake boundary justified by actual evidence.
4. Introduce persistence/auth only when an authorized protected stateful capability creates a demonstrated requirement.

## Governance and Phase Artifacts

- Governance: `37_KAERVAX_DOCUMENT_GOVERNANCE_AND_SINGLE_SOURCE_OF_TRUTH.md`
- Roadmap: `38_KAERVAX_FULL_EXECUTION_ROADMAP.md`
- Master prompt: `docs/39_KAERVAX_MASTER_SYSTEM_PROMPT_V1.md`
- Phase 2 prompt: `docs/42_KAERVAX_PHASE_2_EXECUTION_PROMPT_V1.md`
- G0 assessment: `docs/phase-0/44_G0_GATE_ASSESSMENT.md`
- G1 assessment: `docs/phase-1/43_G1_GATE_ASSESSMENT.md`
- Phase 2 contract: `docs/phase-2/43_CANONICAL_DOMAIN_CONTRACT.md`
- G2 assessment: `docs/phase-2/44_G2_GATE_ASSESSMENT.md`
- Phase 2 report: `docs/phase-2/45_PHASE_2_EXECUTION_REPORT.md`

**Last updated:** 2026-09-18
