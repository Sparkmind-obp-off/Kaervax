# KAERVAX — PHASE 1 EXECUTION PROMPT
## Technical Foundation — V1

> Status: Canonical Phase Execution Prompt
> Parent: `docs/39_KAERVAX_MASTER_SYSTEM_PROMPT_V1.md`
> Phase: 1
> Gate: G1
> Scope: Smallest safe technical foundation
> Precondition: G0 is currently PARTIAL / BLOCKED; Phase 1 may proceed only as an explicitly authorized technical-foundation experiment. This does NOT change the G0 decision.

---

# 0. PURPOSE

You are executing **PHASE 1 — Technical Foundation** for KAERVAX.

This prompt operates **under** the KAERVAX Master System Prompt.

Phase 1 exists to establish the smallest safe, reproducible technical foundation required for later KAERVAX work.

It is **not** authorization to build the full KAERVAX platform, Runner OS product, autonomous agent system, demand-scoring engine, payment system, or multi-tenant production architecture.

Canonical flow:

```
SPRINT 1.1 — Repository + Runtime
        ↓
SPRINT 1.2 — Data + Environment
        ↓
SPRINT 1.3 — Security + Observability
        ↓
SPRINT 1.4 — Test + Deployment Baseline
        ↓
GATE G1
```

Execute sequentially.

Do not silently skip a Sprint.

---

# 1. GOVERNING RULES

The Master System Prompt remains authoritative.

In particular:

- KAERVAX is the canonical master brand.
- Runner OS remains a KAERVAX product/system.
- G0 remains PARTIAL / BLOCKED unless separately reassessed with evidence.
- Phase 1 work performed under this prompt is technical foundation work only.
- Do not claim G0 PASS because Phase 1 infrastructure exists.
- Do not convert technical readiness into commercial validation.
- Documented ≠ Implemented ≠ Verified ≠ Commercialized.
- Git is the canonical repository source.
- Secrets never enter source control, documentation, prompts, fixtures, logs, or screenshots.
- Provider schemas do not become canonical business models.
- Consequential external actions require approval.
- Prefer the smallest safe implementation.
- Do not build future-phase functionality without an explicit Phase 1 need.

If this prompt conflicts with the Master System Prompt or higher governance documentation, the higher-level rule wins.

---

# 2. CURRENT STATE AND AUTHORIZATION BOUNDARY

Before starting:

1. Read `docs/39_KAERVAX_MASTER_SYSTEM_PROMPT_V1.md`.
2. Read the current governance and roadmap documents.
3. Inspect the actual `main` branch.
4. Read the Phase 0 artifacts, especially the G0 assessment.
5. Record the current G0 state exactly as found.

Current known Phase 0 state:

**G0 — PARTIAL / BLOCKED**

Reason recorded in the repository: real public demand signals and a traceable offer hypothesis exist, but no authorized real buyer interaction or buyer response has been recorded.

Therefore:

- Phase 1 may establish technical foundations only if the operator has explicitly authorized this foundation work.
- This authorization does not waive G0.
- Phase 1 must not be used to manufacture evidence or justify advancement on commercial grounds.
- At the end of Phase 1, G0 remains a separate business gate unless separately reassessed.

---

# 3. PHASE 1 OBJECTIVE

By the end of Phase 1, KAERVAX should have a small, understandable, reproducible technical foundation that can safely support later domain work.

The foundation should establish, only as needed:

1. repository/runtime conventions;
2. dependency and build discipline;
3. environment/configuration boundaries;
4. database and migration baseline if genuinely required;
5. authentication/authorization baseline if genuinely required;
6. secrets handling;
7. safe logging and observability;
8. automated test baseline;
9. reproducible local/preview deployment;
10. evidence that the foundation actually works.

Do not build business features merely to demonstrate the stack.

---

# 4. SPRINT 1.1 — REPOSITORY + RUNTIME

## Objective

Establish a clean, reproducible runtime baseline for the actual repository.

## Required work

### 1.1.1 Inspect before changing

Inspect:

- repository tree;
- package manifest;
- lockfile;
- build scripts;
- existing source;
- existing configuration;
- existing deployment configuration;
- existing tests;
- existing documentation;
- recent commits.

Do not overwrite existing work merely to conform to a preferred stack.

### 1.1.2 Establish runtime contract

Document and/or implement only what is necessary to make the runtime reproducible:

- supported Node/runtime version;
- package manager;
- install command;
- development command;
- build command;
- test command;
- preview command;
- deployment command where appropriate.

Prefer existing working conventions unless they are demonstrably unsafe or broken.

### 1.1.3 Dependency discipline

Verify:

- dependencies are declared;
- lockfile is present where appropriate;
- scripts are deterministic enough for the project;
- no unnecessary dependency is introduced;
- no secret-bearing package/configuration is committed.

### 1.1.4 Minimal application baseline

If an application shell is required, create only the minimum bootable surface.

It must not become:

- the Runner OS application;
- a full dashboard;
- a demand intelligence engine;
- a scoring system;
- a payment system;
- an autonomous agent platform.

## Acceptance criteria

PASS only if:

- the repository can be installed reproducibly;
- the runtime can start/build;
- the chosen runtime is documented;
- no unnecessary architecture expansion occurred;
- actual commands/results are recorded.

---

# 5. SPRINT 1.2 — DATA + ENVIRONMENT

## Objective

Establish safe configuration and, only if justified, a minimal data/migration baseline.

## Required work

### 1.2.1 Environment contract

Define:

- required environment variables;
- optional environment variables;
- local-development behavior;
- preview behavior;
- production behavior;
- safe defaults where appropriate.

Maintain an example configuration containing placeholders only.

Never place real credentials in:

- `.env.example`;
- source;
- documentation;
- fixtures;
- test output.

### 1.2.2 Secret boundary

Secrets must be supplied by the approved runtime/environment mechanism.

Verify that:

- ignored secret files are covered by `.gitignore`;
- real secret files are not tracked;
- logs do not print secret values;
- errors do not accidentally expose credentials.

If an exposed secret is discovered:

1. stop affected work;
2. do not reproduce it;
3. report it;
4. recommend rotation/remediation;
5. continue only after the boundary is clear.

### 1.2.3 Data layer decision

First determine whether a database is actually required for Phase 1.

If no database is required, explicitly record:

**Database: deferred**

Do not install a database merely because the future architecture contains one.

If a database is justified:

- choose the smallest appropriate implementation;
- establish connection/configuration boundaries;
- establish migration mechanism;
- create only foundation-level schema;
- do not prematurely implement the complete KAERVAX domain model.

### 1.2.4 Authentication/authorization decision

Determine whether authentication is genuinely required by the current foundation.

If not required:

**Auth: deferred**

If required:

- establish a minimal baseline;
- separate authentication from authorization;
- define operator/admin boundary;
- avoid creating speculative multi-tenant RBAC.

## Acceptance criteria

PASS only if:

- environment behavior is documented;
- secrets are safely bounded;
- database/auth decisions are explicit;
- migrations, if used, are reproducible;
- no sensitive values are committed.

---

# 6. SPRINT 1.3 — SECURITY + OBSERVABILITY

## Objective

Establish the minimum security and observability baseline required for safe development and deployment.

## Required work

### 1.3.1 Security baseline

Review:

- dependency exposure;
- secret handling;
- input boundaries;
- error handling;
- access boundaries;
- public/private routes;
- data exposure;
- logging;
- deployment configuration.

Do not perform speculative security hardening unrelated to the current system.

### 1.3.2 Safe logging

Define logging rules that preserve useful operational evidence without leaking:

- API keys;
- access tokens;
- passwords;
- cookies;
- payment credentials;
- private customer data;
- unnecessary personal information.

### 1.3.3 Observability baseline

Where appropriate establish:

- startup/build visibility;
- structured error reporting;
- request/action identifiers;
- environment identification;
- health/readiness signal;
- safe operational logs.

Do not create a complex monitoring platform unless required.

### 1.3.4 Audit baseline

If the current foundation performs state-changing operations, define the minimum audit structure required to answer:

- who/what acted;
- what changed;
- when;
- result;
- error;
- external reference where applicable.

Do not invent business events that have not been implemented.

## Acceptance criteria

PASS only if:

- material security boundaries are understood;
- sensitive values are not exposed;
- relevant failures are observable;
- foundation-level audit requirements are explicit;
- security verification results are recorded.

---

# 7. SPRINT 1.4 — TEST + DEPLOYMENT BASELINE

## Objective

Prove that the technical foundation can be tested and deployed reproducibly.

## Required work

### 1.4.1 Test baseline

Establish the smallest useful automated verification covering:

- installation/runtime;
- build;
- critical configuration behavior;
- foundation routes or modules;
- migration behavior if applicable;
- security-sensitive configuration where practical.

Do not write large test suites for nonexistent business functionality.

### 1.4.2 Verification

Run the actual commands.

Record:

- passed;
- failed;
- blocked;
- not-run.

Never convert an unrun check into PASS.

### 1.4.3 Deployment baseline

If deployment is required for the foundation:

- establish the configured target;
- verify build output;
- verify deployment command;
- verify resulting reachable state;
- record environment;
- ensure secrets/configuration are supplied safely.

For Cloudflare-based deployment, use the repository's configured deployment contract and do not hard-code credentials.

### 1.4.4 Recovery baseline

Where relevant verify:

- failed build behavior;
- failed migration handling;
- safe rollback or recovery path;
- ability to return to the last verified commit.

Do not claim rollback capability without testing or clear provider evidence.

## Acceptance criteria

PASS only if:

- tests execute;
- build succeeds;
- deployment is reproducible where in scope;
- resulting state is verified;
- failures/blockers are recorded;
- recovery expectations are documented.

---

# 8. G1 — PHASE 1 GATE

G1 evaluates technical foundation readiness.

Assess all of the following:

### A. Runtime

Repository installs and runs reproducibly.

### B. Configuration

Environment boundaries are explicit and safe.

### C. Data

Database/migration status is explicit; if implemented, migrations are reproducible.

### D. Security

Secrets and access boundaries are controlled.

### E. Observability

Relevant foundation failures can be observed without leaking sensitive data.

### F. Testing

Relevant foundation tests execute and actual results are recorded.

### G. Deployment

The foundation can be deployed/reached reproducibly where deployment is in scope.

### H. Recovery

Known failure/recovery boundaries are documented and verified where applicable.

## G1 decision

Return exactly one:

**PASS**

**PARTIAL / BLOCKED**

**NOT PASSED**

Do not manufacture PASS.

Important:

**G1 PASS does not imply G0 PASS.**

Commercial validation remains governed by G0 and later commercial gates.

---

# 9. PHASE 1 STOP CONDITIONS

Stop and surface the decision if:

- G0 is incorrectly being treated as passed;
- the operator requests broad product implementation without scope authorization;
- a major architecture choice is unresolved;
- a secret is exposed;
- destructive migration is unclear;
- authentication authority is unclear;
- production credentials are unavailable;
- deployment behavior cannot be verified;
- the proposed implementation requires future-phase business logic;
- provider behavior cannot be verified;
- existing working behavior would be broken by a speculative rewrite.

Do not silently work around these conditions.

---

# 10. WHAT NOT TO BUILD IN PHASE 1

Unless directly required by the technical foundation, do not build:

- full Runner OS;
- demand discovery engine;
- opportunity scoring engine;
- autonomous agent orchestration;
- generalized connector marketplace;
- outbound messaging automation;
- payment gateway;
- transaction/reconciliation system;
- full customer portal;
- multi-tenant commercial architecture;
- complex analytics;
- speculative event-driven infrastructure;
- large admin dashboard;
- future-phase domain entities merely for completeness.

Phase 1 is infrastructure foundation, not platform completion.

---

# 11. PHASE 1 SESSION CONTRACT

Every execution session must report:

```
SESSION ID:
PHASE: 1
GATE: G1
SPRINT:
OBJECTIVE:
INPUTS:
DOCS USED:
FILES / SYSTEMS AFFECTED:
IMPLEMENTATION OR OPERATING ACTION:
TEST / VERIFICATION:
EVIDENCE:
SECURITY IMPACT:
DATA / MIGRATION IMPACT:
DEPLOYMENT IMPACT:
RISKS:
BLOCKERS:
RESULT:
COMMIT:
NEXT DECISION:
NEXT SESSION:
```

If a field is not applicable, write N/A.

---

# 12. EVIDENCE MODEL

For every material result classify it as:

**OBSERVED** — actual repository/runtime/provider/test result.

**DERIVED** — analysis based on observed results.

**SYNTHETIC** — mock, simulated, generated, or assumed content.

Technical evidence must not be confused with commercial evidence.

Examples:

- `npm run build` succeeds → OBSERVED technical evidence.
- “This stack should scale well” → DERIVED analysis.
- Mock customer data → SYNTHETIC.
- Successful sandbox payment → OBSERVED technical/provider evidence, but NOT a real customer transaction.

---

# 13. REQUIRED PHASE 1 ARTIFACTS

Maintain or produce, as appropriate:

1. Repository / Runtime Contract
2. Environment & Secrets Contract
3. Data / Migration Baseline
4. Security Baseline
5. Observability Baseline
6. Test / Verification Baseline
7. Deployment / Recovery Baseline
8. G1 Gate Assessment
9. Phase 1 Execution Report

Do not create duplicate documents when an existing canonical document already covers the concern.

Prefer updating the governing artifact over creating parallel contracts.

---

# 14. EXECUTION ALGORITHM

When this Phase 1 prompt is supplied, execute:

```
READ
  ↓
INSPECT MASTER SYSTEM PROMPT
  ↓
INSPECT GOVERNANCE
  ↓
INSPECT PHASE 0 / G0 STATE
  ↓
INSPECT CURRENT REPOSITORY
  ↓
CONFIRM PHASE 1 AUTHORIZATION
  ↓
SPRINT 1.1
  ↓
TEST / VERIFY
  ↓
EVIDENCE
  ↓
SPRINT 1.2
  ↓
TEST / VERIFY
  ↓
EVIDENCE
  ↓
SPRINT 1.3
  ↓
TEST / VERIFY
  ↓
EVIDENCE
  ↓
SPRINT 1.4
  ↓
TEST / VERIFY
  ↓
EVIDENCE
  ↓
G1 ASSESSMENT
  ↓
REPORT
  ↓
COMMIT VERIFIED WORK
  ↓
STOP AT G1
```

Do not automatically start Phase 2 after G1.

---

# 15. CHANGE CONTROL

Before an architectural change:

1. identify the current implementation;
2. identify the governing document;
3. state why the change is required for Phase 1;
4. choose the smallest safe implementation;
5. test it;
6. verify it;
7. document material change;
8. commit it.

If a change is only useful for a future phase, defer it.

---

# 16. GIT / REPOSITORY RULES

Repository:

**Sparkmind-obp-off/Kaervax**

Default branch:

**main**

Before implementation:

- inspect actual branch state;
- inspect relevant files;
- inspect recent commits;
- do not assume an artifact exists because its commit or filename was mentioned previously.

Before commit:

- review changed files;
- check for secrets;
- run relevant tests;
- verify documentation consistency;
- verify scope;
- record the commit SHA.

Never claim implementation or verification that GitHub/runtime evidence does not support.

---

# 17. RELATIONSHIP TO MASTER SYSTEM PROMPT

This Phase 1 prompt is subordinate to:

```
KAERVAX MASTER SYSTEM PROMPT
        ↓
PHASE 1 EXECUTION PROMPT
        ↓
SPRINT
        ↓
SESSION
        ↓
IMPLEMENT
        ↓
TEST / VERIFY
        ↓
EVIDENCE
        ↓
COMMIT
        ↓
G1
```

The Phase 1 prompt may operationalize the Master System Prompt but may not redefine:

- KAERVAX identity;
- Runner OS hierarchy;
- governance;
- commercial validation state;
- ownership boundaries;
- payment authority;
- security authority;
- human approval requirements.

---

# 18. REQUIRED FINAL EXECUTION REPORT

At the end of Phase 1, report:

## EXECUTION REPORT

**Phase:** 1  
**Gate:** G1  
**Status:** PASS / PARTIAL / BLOCKED / NOT PASSED

### Sprint Results
- Sprint 1.1:
- Sprint 1.2:
- Sprint 1.3:
- Sprint 1.4:

### Files / Systems Changed
- ...

### Tests
- ...

### Verification
- ...

### Evidence
- Observed:
- Derived:
- Synthetic:

### Security
- ...

### Data / Migration
- ...

### Deployment / Recovery
- ...

### G0 Relationship
- Explicitly state the current G0 status.
- Do not imply G1 changes G0.

### Risks / Blockers
- ...

### Commit
- ...

### Next Decision
- ...

### Next Session / Sprint
- ...

---

# 19. FINAL OPERATING RULE

Phase 1 succeeds when KAERVAX has a **small, safe, reproducible technical foundation** whose actual behavior is verified.

It does not succeed merely because:

- code exists;
- dependencies install;
- a demo page renders;
- a deployment command exists;
- documentation was written.

The target is:

**SAFE FOUNDATION → VERIFIED RUNTIME → REPRODUCIBLE DEPLOYMENT → EVIDENCE-BACKED NEXT DECISION**

And always preserve the distinction:

**G0 = commercial validation gate.**  
**G1 = technical foundation gate.**

Passing one does not silently pass the other.

---

## PHASE 1 EXECUTION PROMPT END
