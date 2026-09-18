# KAERVAX

Demand-first commercial business for digital products, services, and custom systems. Runner OS remains a KAERVAX product/system.

## Current Status

- **Phase:** 0 — Validation & Operating Setup
- **Gate:** G0
- **Decision:** **PARTIAL / BLOCKED**
- **Reason:** real public demand signals and a traceable offer hypothesis exist, but no authorized real buyer interaction or buyer response has been recorded.

## Completed Features / Artifacts

- Canonical governance and Phase 0 execution prompts
- Demand Discovery Evidence Pack with six public signals and provenance
- Offer & Delivery Hypothesis Pack
- Operating Trial Record with candidate qualification and an unsent offer draft
- G0 Gate Assessment
- Phase 0 Execution Report
- Minimal public-safe Phase 0 status page

## Functional Entry URIs

| Path | Purpose | Parameters |
|---|---|---|
| `/` | Public-safe Phase 0 status page | None |

No application API, authentication, payment endpoint, customer portal, or operational database is implemented in Phase 0.

## URLs

- **GitHub:** https://github.com/Sparkmind-obp-off/Kaervax
- **Production:** populated after Cloudflare BYOK deployment

## Phase 0 Artifacts

- `docs/phase-0/41_DEMAND_DISCOVERY_EVIDENCE_PACK.md`
- `docs/phase-0/42_OFFER_AND_DELIVERY_HYPOTHESIS_PACK.md`
- `docs/phase-0/43_OPERATING_TRIAL_RECORD.md`
- `docs/phase-0/44_G0_GATE_ASSESSMENT.md`
- `docs/phase-0/45_PHASE_0_EXECUTION_REPORT.md`

## Data Architecture

- **Current records:** version-controlled Markdown evidence artifacts
- **Storage:** Git repository only
- **Database:** none
- **Personal data:** minimized; public usernames omitted from the evidence pack
- **Evidence classes:** OBSERVED, DERIVED, SYNTHETIC

## User Guide

1. Read the G0 assessment before interpreting any artifact.
2. Review source references in the Demand Discovery Evidence Pack.
3. Use the Offer Pack only as an unvalidated V1 hypothesis.
4. Use the Operating Trial Record for the next authorized buyer experiment.
5. Do not claim acceptance, payment, delivery, or validation unless direct evidence is added.

## Local Build and Preview

```bash
npm install
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

## Deployment

- **Platform:** Cloudflare Pages (BYOK)
- **Build output:** `dist/`
- **Build command:** `npm run build`
- **Production branch:** `main`
- **Status:** pending deployment verification
- **Secrets:** none required for the static status page

## Not Yet Implemented

- authorized buyer outreach and response capture
- verified payment/refund authority path
- real delivery and customer acceptance
- G0 passage
- Phase 1 technical foundation
- Runner OS application

## Recommended Next Steps

1. Select one current candidate or legitimate existing business contact.
2. Approve the exact recipient, message, channel, and offer version.
3. Confirm the authorized payment account and commercial terms.
4. Execute one real interaction and record the strongest verified state.
5. Reassess G0; do not start Phase 1 automatically.

## Governance

Document precedence is defined by `37_KAERVAX_DOCUMENT_GOVERNANCE_AND_SINGLE_SOURCE_OF_TRUTH.md`. The execution contract is `docs/39_KAERVAX_MASTER_SYSTEM_PROMPT_V1.md` with `docs/40_KAERVAX_PHASE_0_EXECUTION_PROMPT_V1.md`.

**Last updated:** 2026-09-18
