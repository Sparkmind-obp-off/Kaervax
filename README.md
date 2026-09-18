# KAERVAX

Demand-first commercial business for digital products, services, and custom systems. Runner OS remains a KAERVAX product/system.

## Current Status

- **Technical phase:** 1 — Technical Foundation
- **Technical gate:** G1 — **PASS**
- **Commercial gate:** G0 — **PARTIAL / BLOCKED**
- **G0 reason:** real public demand signals and a traceable offer hypothesis exist, but no authorized real buyer interaction or buyer response has been recorded.
- **Authorization boundary:** Phase 1 is an operator-authorized technical-foundation experiment and does not waive or change G0.

## Completed Features / Artifacts

- Node.js 22 and npm runtime contract with committed lockfile
- Deterministic static build and automated build-artifact validation
- Automated foundation tests
- Public-safe Phase 1 status page
- Machine-readable health/readiness signal
- Security headers for the public static surface
- Explicit environment, secrets, database, auth, logging, audit, deployment, and recovery decisions
- Phase 0 evidence artifacts with unchanged G0 assessment

## Functional Entry URIs

| Path | Purpose | Parameters | Access |
|---|---|---|---|
| `/` | Public-safe technical foundation status | None | Public |
| `/health.json` | Machine-readable readiness and gate-boundary signal | None | Public |

No business API, authentication, payment endpoint, customer portal, state-changing action, or operational database is implemented.

## URLs

- **GitHub:** https://github.com/Sparkmind-obp-off/Kaervax
- **Production:** https://kaervax.pages.dev

## Runtime Contract

- **Node.js:** 22 or newer (`.nvmrc` and `package.json#engines`)
- **Package manager:** npm
- **Install:** `npm ci`
- **Build:** `npm run build`
- **Test:** `npm test`
- **Full verification:** `npm run verify`
- **Preview:** `npm run preview`
- **Deploy:** `npm run deploy` after approved Cloudflare BYOK authentication
- **Output:** `dist/`

## Data Architecture

- **Current records:** version-controlled Markdown governance and evidence artifacts
- **Application database:** deferred; not required by the static foundation
- **Migrations:** deferred with the database
- **Authentication / authorization:** deferred; no protected capability exists
- **Production secrets:** none required by the application
- **Deployment credentials:** supplied outside Git through the approved BYOK mechanism
- **Evidence classes:** OBSERVED, DERIVED, SYNTHETIC

See `docs/phase-1/42_TECHNICAL_FOUNDATION_BASELINE.md` for the complete foundation contract.

## User Guide

1. Open `/` to inspect the public technical-foundation state.
2. Open `/health.json` for the machine-readable readiness signal.
3. Read `docs/phase-0/44_G0_GATE_ASSESSMENT.md` before interpreting commercial readiness.
4. Do not treat a green test or successful deployment as buyer, payment, delivery, or commercial evidence.

## Development and Verification

```bash
npm ci
npm run verify
npm run preview
```

The preview command serves `dist/` on port 3000. In the managed sandbox, use `ecosystem.config.cjs` with PM2 after building.

## Deployment

- **Platform:** Cloudflare Pages (operator-owned account via BYOK)
- **Project:** `kaervax`
- **Production branch:** `main`
- **Status:** active and verified on 2026-09-18
- **Secrets:** no application secret required
- **Recovery unit:** last verified Git commit, rebuilt and redeployed

## Not Yet Implemented

- authorized buyer outreach and response capture
- verified payment/refund authority path
- real delivery and customer acceptance
- G0 passage
- KAERVAX canonical application domain
- Runner OS application
- demand intelligence, scoring, connectors, transaction, or autonomous action
- database, migrations, authentication, or multi-tenant authorization

## Recommended Next Steps

1. Stop at G1; do not begin Phase 2 automatically.
2. Separately run one authorized real buyer interaction to address the existing G0 blocker.
3. Reassess G0 only from new direct commercial evidence.
4. Decide explicitly whether and when Phase 2 may begin.

## Governance and Phase Artifacts

- Governance: `37_KAERVAX_DOCUMENT_GOVERNANCE_AND_SINGLE_SOURCE_OF_TRUTH.md`
- Roadmap: `38_KAERVAX_FULL_EXECUTION_ROADMAP.md`
- Master prompt: `docs/39_KAERVAX_MASTER_SYSTEM_PROMPT_V1.md`
- Phase 1 prompt: `docs/41_KAERVAX_PHASE_1_EXECUTION_PROMPT_V1.md`
- G0 assessment: `docs/phase-0/44_G0_GATE_ASSESSMENT.md`
- Phase 1 baseline: `docs/phase-1/42_TECHNICAL_FOUNDATION_BASELINE.md`

**Last updated:** 2026-09-18
