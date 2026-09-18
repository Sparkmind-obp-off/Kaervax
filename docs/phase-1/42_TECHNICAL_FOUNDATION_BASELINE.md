# KAERVAX — Technical Foundation Baseline

**Phase:** 1 — Technical Foundation
**Gate:** G1
**Authorization:** Operator-authorized technical-foundation experiment
**Commercial gate:** G0 remains **PARTIAL / BLOCKED**

## 1. Repository / Runtime Contract

| Concern | Contract |
|---|---|
| Repository | `Sparkmind-obp-off/Kaervax`, branch `main` |
| Runtime | Node.js 22 or newer (`.nvmrc`, `package.json#engines`) |
| Package manager | npm with committed lockfile |
| Reproducible install | `npm ci` |
| Build | `npm run build` |
| Automated test | `npm test` |
| Full verification | `npm run verify` |
| Preview | `npm run preview` |
| Production deploy | `npm run deploy` using approved Cloudflare BYOK authentication |
| Build output | `dist/` |

The implementation remains a static, public-safe Cloudflare Pages foundation. No Hono API, business domain, Runner OS surface, payment path, connector, scoring engine, or autonomous action is introduced.

## 2. Environment & Secrets Contract

### Application runtime

- Required variables: none.
- Optional variables: none.
- Local and preview behavior: static files are served from `dist/`.
- Production behavior: the same verified `dist/` output is deployed to Cloudflare Pages.
- `.env.example` contains guidance only and no credential.

### Deployment boundary

- Cloudflare authentication is supplied out-of-repository by the approved BYOK mechanism.
- Real credentials must not be added to `.env.example`, source, documentation, fixtures, logs, screenshots, or Git.
- `.env`, `.env.*` except `.env.example`, `.dev.vars`, private-key files, logs, Wrangler state, and build output are ignored.
- If secrets are required later, local values belong in ignored `.dev.vars`; production values belong in Cloudflare secrets.

## 3. Data / Migration Baseline

**Database: deferred**

Phase 1 has no state-changing business feature and no persistence need. No database or migration framework is installed. A later phase must justify storage before adding D1 or any schema.

## 4. Authentication / Authorization Baseline

**Auth: deferred**

All current routes are intentionally public and expose only the foundation status and machine-readable health state. There is no operator action, private record, customer data, or administrative capability. Authentication and authorization must be designed only when a protected capability is authorized.

## 5. Security Baseline

- Public input surface: no forms, query processing, API mutation, uploads, cookies, or client-side scripts.
- Access boundary: `/`, `/health.json`, and static artifacts are public.
- Security headers: CSP, no-referrer, MIME sniffing protection, framing denial, restrictive Permissions Policy, COOP, and CORP.
- Secret boundary: enforced by ignore rules, repository scan, and tests.
- Dependency scope: Wrangler is the only development dependency; no application runtime dependency exists.
- Error behavior: static 404/provider errors contain no application secrets because the application has no secret-bearing runtime.
- Consequential actions: none implemented.

## 6. Observability & Audit Baseline

- Build emits one structured JSON `build_verified` event after required artifacts and the health payload are validated.
- `/health.json` is the readiness signal and identifies service, phase, gate, and unchanged G0 state.
- Cloudflare response metadata, including provider request identifiers where supplied, is the request-level operational signal.
- No custom request logging is added because there is no Worker application logic and no state-changing route.
- Audit infrastructure is deferred because no state-changing operation exists. When introduced, the minimum record is actor, action, timestamp, target, result, error, approval reference, and external reference where applicable.
- Logs must never include credentials, cookies, private customer data, payment data, or unnecessary personal information.

## 7. Test / Verification Baseline

Automated tests cover:

1. runtime version and deterministic scripts;
2. preservation of the G0 `PARTIAL / BLOCKED` boundary;
3. machine-readable health content;
4. secret-file ignore rules;
5. required public security headers;
6. existence and validity of build artifacts.

Actual results are recorded in the Phase 1 execution report; an unrun check is never reported as passing.

## 8. Deployment / Recovery Baseline

- Target: Cloudflare Pages in the operator's own account through BYOK.
- Production branch: `main`.
- Project name: managed through project metadata and the verified Cloudflare project.
- Build and tests must pass before deployment.
- No production secret, database, or migration is required.
- Recovery unit: a verified Git commit. A prior commit can be rebuilt and redeployed; this is a documented recovery path, not a claim of instant provider rollback.
- Failed build: deployment stops because `npm run deploy` chains verification before Wrangler.
- Failed deployment: preserve the last reachable deployment, record the provider error, correct the smallest cause, rebuild, and retry.
- Failed migration: not applicable while the database is deferred.

## Scope Boundary

This baseline is technical evidence only. It does not establish buyer interaction, payment readiness, customer acceptance, delivery, or commercial validation. **G1 cannot change G0.**
