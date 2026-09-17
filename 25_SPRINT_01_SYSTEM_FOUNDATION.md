# SPRINT 1 — SYSTEM FOUNDATION

**Project:** KAERVAX  
**Phase:** Phase 1 — Foundation  
**Execution Layer:** Genspark  
**Status:** READY FOR EXECUTION

## 1. Purpose

Sprint 1 establishes the smallest production-capable technical foundation for KAERVAX. It does not build the commercial domain or integrations yet. The objective is to make the application safe to start, testable, observable, authenticated, and ready for Sprint 2.

## 2. Source of Truth

Before changing code, inspect and follow these repository contracts:

- `09_IMPLEMENTATION_BLUEPRINT.md`
- `10_ENVIRONMENT_AND_SECRETS_CONTRACT.md`
- `11_TESTING_AND_DELIVERY_CONTRACT.md`
- `12_ROADMAP_AND_PHASE_GATES.md`
- `13_GENSPARK_MASTER_IMPLEMENTATION_CONTRACT.md`
- `24_UI_UX_DESIGN_SYSTEM.md`

Existing repository code and configuration take precedence over assumptions. Do not invent a stack when the repository already establishes one.

## 3. Sprint Objective

Build and verify:

`REPOSITORY → RUNTIME → ENVIRONMENT → DATABASE → MIGRATIONS → AUTH → AUTHORIZATION → ERROR MODEL → LOGGING → AUDIT → TEST HARNESS → HEALTH/READINESS`

Sprint 1 exits only when the foundation can run in development/test without production credentials and has automated evidence for its baseline behavior.

## 4. Execution Sessions

### Session 1 — Repository & Stack Discovery

- Inspect repository structure, package manifests, scripts, framework, runtime, database choices, existing tests, deployment configuration, and current conventions.
- Identify what already exists before adding dependencies or files.
- Preserve the established stack unless a documented blocker requires a change.

### Session 2 — Runtime + Environment

- Establish deterministic application bootstrap.
- Define typed/validated environment configuration where appropriate.
- Provide `.env.example` with placeholders only.
- Ensure local/test startup does not require production credentials.
- Ensure secrets are excluded from Git, logs, fixtures, prompts, and generated artifacts.
- Add health/readiness behavior appropriate to the actual stack.

### Session 3 — Database + Migration

- Establish the canonical relational database connection required by the chosen stack.
- Add a version-controlled migration mechanism if absent.
- Make migration execution reproducible in development/test.
- Do not create the full KAERVAX business domain yet.
- Do not introduce vector databases, warehouses, event sourcing, or microservices without evidence.

### Session 4 — Auth + Authorization

- Establish the minimum authentication foundation appropriate to the existing stack.
- Add authorization middleware/policy boundaries.
- Separate authentication from authorization.
- Deny protected operations by default when identity or permission is absent.
- Keep consequential-action approval architecture intact; Sprint 1 must not create an approval bypass.

### Session 5 — Audit + Logging + Test

- Add structured application logging.
- Propagate a request/correlation identifier where practical.
- Establish a consistent error model and safe client-facing error envelope.
- Establish audit-event infrastructure without exposing secrets or sensitive values.
- Add the foundation test harness.
- Cover startup/config validation, auth/authz baseline, error behavior, audit creation, and critical safety boundaries.

## 5. Explicit Non-Scope

Do NOT implement in Sprint 1:

- Duitku integration or live payment processing
- payment webhooks or reconciliation logic
- Threads/social search/scraping
- Make.com production integration
- canonical commercial entities such as DemandSignal, Opportunity, Offer, Action, Transaction, Delivery, or Learning beyond foundation needs
- AI workers or autonomous agents
- voice interface
- full product dashboard
- customer portal
- marketplace
- multi-tenant SaaS
- large-scale connector system
- microservices
- production credentials
- production data
- speculative dependencies or architecture rewrites

The UI/UX contract in `24_UI_UX_DESIGN_SYSTEM.md` is a shared design constraint. Do not turn Sprint 1 into a visual-product build.

## 6. Hard Constraints

1. **Inspect first.** Never overwrite or replace existing architecture blindly.
2. **No secrets.** Never request, print, commit, or embed production credentials.
3. **No invented identity.** Do not invent KAERVAX legal, payment, tax, or business identity values.
4. **Business truth stays inside KAERVAX.** External providers must remain adapters.
5. **No approval bypass.** Consequential operations remain approval-gated.
6. **No provider lock-in.** Keep external services behind replaceable boundaries.
7. **No fake validation.** Tests and fixtures must never be described as real commercial validation.
8. **Minimal dependency churn.** Add dependencies only when necessary and explain why.
9. **No architecture expansion.** Do not introduce microservices or infrastructure complexity without evidence.
10. **Stop on conflict.** If an existing repository decision conflicts with this prompt or the architecture contracts, stop that portion, document the conflict, and report it rather than silently redesigning the system.

## 7. Required Implementation Pattern

For foundation operations, prefer:

`REQUEST → VALIDATE → AUTHORIZE → EXECUTE → AUDIT → SAFE RESPONSE`

For any future consequential action, preserve:

`INTENT → VALIDATE → PROPOSAL → APPROVAL → EXECUTION → VERIFY → RECORD`

Sprint 1 must prepare these boundaries, not weaken them.

## 8. Error Model

Use a consistent application error model appropriate to the chosen framework. At minimum support the architecture's categories where applicable:

- `VALIDATION_ERROR`
- `AUTHENTICATION_ERROR`
- `AUTHORIZATION_ERROR`
- `CONFLICT`
- `INTERNAL_ERROR`
- `TIMEOUT`
- `NETWORK_ERROR`

Do not return stack traces, secrets, internal credentials, or sensitive implementation details to clients.

## 9. Observability Baseline

Where applicable, structured logs should make it possible to correlate:

- request/correlation ID
- actor or authenticated principal reference
- operation
- object/resource reference
- duration
- result/status
- error code

Do not log passwords, tokens, API keys, payment credentials, or unnecessary personal data.

## 10. Acceptance Criteria — Sprint Gate 1

Sprint 1 is complete only when all applicable criteria are verified:

- [ ] Repository stack and existing architecture were inspected before implementation.
- [ ] Application starts deterministically in development/test.
- [ ] Production credentials are not required for local/test startup.
- [ ] Environment configuration is validated and documented.
- [ ] `.env.example` or equivalent placeholder configuration exists where appropriate.
- [ ] Secret-bearing environment files are ignored by Git.
- [ ] Database connection works in development/test.
- [ ] Migrations are version-controlled and reproducible.
- [ ] Health endpoint exists where appropriate.
- [ ] Readiness behavior exists where appropriate.
- [ ] Authentication baseline works.
- [ ] Authorization middleware/policy works.
- [ ] Protected operations fail safely without required authorization.
- [ ] Structured logging exists.
- [ ] Request/correlation IDs exist where appropriate.
- [ ] Consistent error responses exist.
- [ ] Audit infrastructure exists for important foundation operations.
- [ ] Test harness is operational.
- [ ] Unit/integration tests covering the foundation pass.
- [ ] No secrets are present in tracked files, fixtures, logs, screenshots, or generated artifacts.
- [ ] Existing architecture contracts remain intact.
- [ ] Build/typecheck/lint commands appropriate to the repository pass.
- [ ] Startup and verification steps are documented.

## 11. Verification Commands

Use the repository's existing scripts first. Do not invent commands when equivalent project scripts already exist. At minimum, run the applicable:

- dependency installation check
- typecheck
- lint
- unit tests
- integration tests
- build
- migration validation
- application startup/health check
- secret-leak scan or equivalent repository-safe check

Record the exact commands and results in the execution report.

## 12. Genspark Execution Protocol

Genspark MUST execute this sprint in the following order:

1. Read this document and all referenced contracts.
2. Inspect the actual repository tree and implementation.
3. Determine the existing stack and conventions.
4. Identify already-completed foundation pieces.
5. Create a minimal implementation plan.
6. Implement only Sprint 1 scope.
7. Run focused tests after each coherent increment.
8. Run the complete applicable verification suite.
9. Inspect the diff for accidental architecture expansion or secret exposure.
10. Update documentation only where implementation reality requires it.
11. Commit the completed coherent increment with a clear commit message.
12. Push according to repository branch conventions.
13. Report exact files changed, tests run, results, known issues, and commit SHA.

Do not claim a gate is passed without test or verification evidence.

## 13. Definition of Done

Sprint 1 is **DONE** only if the system has a verified technical foundation and can safely hand off to Sprint 2 — Canonical Domain.

The completion claim must distinguish:

- **implemented** — code/config exists
- **verified** — tests/checks passed
- **blocked** — an identified dependency or conflict prevents completion
- **not in scope** — intentionally deferred

Never equate technical foundation completion with market validation or commercial readiness.

## 14. Required Genspark Final Report

Return a concise execution report containing:

```text
SPRINT: 01 — SYSTEM FOUNDATION
STATUS: DONE / PARTIAL / BLOCKED

STACK CONFIRMED:
- ...

IMPLEMENTED:
- ...

FILES CHANGED:
- ...

VERIFICATION:
- command → PASS/FAIL
- command → PASS/FAIL

SECURITY CHECK:
- secret exposure → PASS/FAIL
- auth/authz baseline → PASS/FAIL

ARCHITECTURE CHECK:
- contracts preserved → PASS/FAIL

COMMIT:
- SHA: ...
- Message: ...

REMAINING ISSUES:
- ...

NEXT GATE:
SPRINT 2 — CANONICAL DOMAIN
```

## 15. Sprint Boundary

When Sprint 1 passes, stop. Do not automatically begin Sprint 2.

The next approved scope is:

`SPRINT 2 — CANONICAL DOMAIN`

which will establish KAERVAX-owned business entities and lifecycle rules on top of this foundation.

---

**Core rule:**

> Build the foundation that can safely hold the business. Do not build the whole business during Sprint 1.
