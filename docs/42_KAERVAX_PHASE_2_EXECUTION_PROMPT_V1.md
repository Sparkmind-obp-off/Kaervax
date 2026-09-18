# KAERVAX PHASE 2 EXECUTION PROMPT V1

**Status:** Execution contract  
**Phase:** 2 — Canonical Domain  
**Gate:** G2 — Canonical Domain Gate  
**Repository:** `Sparkmind-obp-off/Kaervax`  
**Branch:** `main`

---

## 1. PURPOSE

This document authorizes and structures the execution of **Phase 2 — Canonical Domain** for KAERVAX.

The objective is to establish the **smallest safe, vendor-neutral canonical business domain model** required for the KAERVAX roadmap.

Phase 2 is technical/domain foundation work. It is **not** authorization to build the full KAERVAX product, Runner OS, demand engine, payment system, connector marketplace, autonomous agents, or future-phase capabilities.

The execution agent must optimize for:

> **Canonical clarity → explicit lifecycle rules → safe commands → traceable audit semantics → verified evidence.**

---

## 2. GOVERNING HIERARCHY

The execution agent must read and obey the following in order:

1. `docs/39_KAERVAX_MASTER_SYSTEM_PROMPT_V1.md`
2. Canonical governance / single-source-of-truth material that is actually present in the repository
3. KAERVAX execution roadmap material that is actually present in the repository
4. Phase 0 / G0 evidence
5. Phase 1 / G1 evidence
6. This Phase 2 execution prompt

If documents conflict, follow the higher-level source-of-truth rules and record the conflict rather than silently inventing a resolution.

Do not assume a historical document exists merely because it was referenced previously. Inspect the current repository.

---

## 3. CURRENT AUTHORITATIVE STATE

At the start of Phase 2:

- **G0 = PARTIAL / BLOCKED**
- **G1 = PASS**
- Phase 2 is authorized as **technical canonical-domain work**.
- G1 PASS proves technical foundation readiness; it does **not** mean commercial validation passed.
- Phase 2 must not claim or imply that a real buyer interaction, payment, delivery, customer acceptance, or complete commercial loop has occurred unless independently evidenced.
- Do not modify G0 status through technical implementation.

Independent gates remain:

```
G0 = Commercial Validation State
G1 = Technical Foundation State
G2 = Canonical Domain State
```

---

## 4. PHASE 2 FLOW

```
PHASE 2 — CANONICAL DOMAIN
        ↓
SPRINT 2.1 — DOMAIN MODEL
        ↓
SPRINT 2.2 — LIFECYCLE RULES
        ↓
SPRINT 2.3 — COMMANDS + AUDIT
        ↓
G2 — CANONICAL DOMAIN GATE
```

Execution must stop at G2 unless a separate authorization explicitly permits the next phase.

---

# 5. SPRINT 2.1 — DOMAIN MODEL

## Objective

Establish a minimal canonical domain model that represents KAERVAX business concepts without making any external provider, connector, payment platform, social platform, or vendor schema the canonical source of truth.

## Required actions

First inspect:

- current repository tree;
- current application/runtime implementation;
- current package manifest and scripts;
- existing data/configuration decisions;
- Phase 1 technical foundation;
- existing tests;
- existing production behavior;
- relevant KAERVAX governance and roadmap documents.

Then determine which domain concepts are actually required at this stage.

### Candidate canonical concepts

The roadmap identifies these concepts:

- `Source`
- `DemandSignal`
- `Opportunity`
- `Offer`
- `Action`
- `Conversation / Lead`
- `Transaction`
- `Delivery`
- `Learning`
- `Connector`
- `ConnectorExecution`
- `AuditEvent`

These are **domain targets, not an instruction to blindly create database tables or full application features for all of them**.

For every implemented or formally specified domain object, establish as appropriate:

- identity / identifier;
- purpose;
- ownership;
- required attributes;
- relationships;
- lifecycle/state;
- timestamps;
- provenance;
- evidence references where relevant;
- invariants;
- permitted mutation boundaries.

## Domain rules

1. The canonical domain must be **vendor-neutral**.
2. Provider response schemas must not become the canonical business model.
3. External IDs may be retained as integration references, but must not replace canonical ownership.
4. Domain ownership must be explicit.
5. Avoid speculative fields and speculative abstractions.
6. Do not create persistent infrastructure merely because a future phase may eventually need it.
7. If persistence is not yet required, document the decision instead of inventing a database.
8. If persistence is required, implement the minimum safe baseline consistent with Phase 1 decisions.
9. Do not introduce multi-tenant architecture, complex RBAC, or customer isolation models without an actual Phase 2 requirement.
10. Preserve compatibility with the existing production foundation.

---

# 6. SPRINT 2.2 — LIFECYCLE RULES

## Objective

Define and, where implemented, enforce explicit lifecycle/state transitions for canonical domain objects.

The lifecycle must support the business loop without prematurely implementing future commercial systems.

Canonical commercial loop:

```
DEMAND
→ QUALIFICATION
→ OFFER
→ TRANSACTION
→ DELIVERY
→ EVIDENCE
→ LEARNING
→ REPEAT / REFERRAL
```

## Required actions

For every domain object actually implemented or formally modeled:

- identify meaningful states;
- define valid transitions;
- define transition preconditions/invariants;
- define invalid transitions;
- define who/what may initiate a transition;
- preserve relevant provenance/evidence;
- define terminal states where applicable.

Invalid transitions must be rejected or otherwise prevented by the domain boundary.

Lifecycle rules must not depend on undocumented vendor behavior.

## Important boundaries

Phase 2 must **not** prematurely implement:

- payment gateway behavior;
- payment reconciliation;
- external outbound messaging;
- autonomous external actions;
- connector marketplace behavior;
- demand ingestion;
- scoring;
- customer portal;
- delivery automation;
- learning automation.

Payment and external-action states may be modeled only where necessary to establish a vendor-neutral domain boundary. Their full operational behavior belongs to later phases.

No AI or worker may bypass an approval boundary merely because a domain command exists.

---

# 7. SPRINT 2.3 — COMMANDS + AUDIT

## Objective

Define safe domain commands/use cases and the audit semantics required for state-changing operations.

## Commands

For every implemented state-changing capability:

- define the command/use-case intent;
- validate inputs;
- enforce domain invariants;
- enforce allowed lifecycle transitions;
- identify actor/source;
- produce deterministic or explainable outcomes;
- avoid direct coupling to provider schemas.

Do not build a command framework merely for architectural aesthetics. Implement only what the current domain foundation requires.

## Audit semantics

Where state-changing operations exist, establish an audit model containing, as appropriate:

- event identifier;
- event type;
- actor / initiating authority;
- source;
- action/command;
- target entity/reference;
- previous state where relevant;
- resulting state where relevant;
- reason/context where relevant;
- timestamp;
- correlation/request identifier where relevant;
- provenance/evidence reference where relevant.

If there are no persistent state-changing domain operations requiring durable audit storage yet, document the decision and do not invent an unnecessary audit database.

Audit records must never contain secrets.

---

# 8. EVIDENCE MODEL

All Phase 2 findings must distinguish:

### OBSERVED

Directly verified from:

- repository state;
- source code;
- executed tests;
- runtime behavior;
- deployment behavior;
- configuration inspection;
- actual provider responses.

### DERIVED

Reasoned conclusions based on observed evidence.

### SYNTHETIC

Mocked, generated, simulated, assumed, or illustrative content.

Synthetic examples must never be presented as real commercial evidence.

Technical evidence must not be confused with commercial evidence.

---

# 9. G2 ACCEPTANCE CRITERIA

G2 may be assessed as **PASS** only when the evidence supports all applicable criteria:

### Domain model
- canonical domain boundaries are explicit;
- ownership is clear;
- required domain concepts are documented and/or minimally implemented;
- vendor schemas are not canonical;
- unnecessary speculative entities are deferred.

### Lifecycle
- valid lifecycle states/transitions are defined for implemented domain objects;
- invalid transitions are rejected or otherwise prevented;
- relevant invariants are tested;
- provenance/evidence semantics are preserved where applicable.

### Commands
- implemented state-changing commands have explicit intent;
- inputs and invariants are validated;
- lifecycle rules cannot be bypassed through the supported domain path.

### Audit
- audit semantics are defined for applicable state-changing operations;
- actor/source/reference/timestamp semantics are clear;
- secrets are excluded.

### Safety and scope
- no future-phase functionality has been smuggled into Phase 2;
- existing production foundation remains intact;
- no unjustified DB/auth/tenancy architecture has been introduced;
- tests and verification actually ran;
- G0 remains PARTIAL / BLOCKED unless independent commercial evidence changes it.

G2 decision must be exactly one of:

- **PASS**
- **PARTIAL / BLOCKED**
- **NOT PASSED**

A G2 PASS does not authorize Phase 3 automatically.

---

# 10. STOP CONDITIONS

Stop and escalate rather than guessing if any of the following occurs:

- canonical domain ownership is ambiguous;
- a provider schema is being promoted to canonical business truth;
- a database is being introduced without demonstrated need;
- destructive migration behavior is unclear;
- authentication or tenancy authority is invented without requirement;
- payment behavior is implemented prematurely;
- external action execution is implemented prematurely;
- approval boundaries are bypassed;
- future-phase business logic is required to complete the current task;
- secrets are exposed;
- existing production behavior would be broken by speculative changes;
- tests cannot be executed or verified;
- evidence is missing or contradictory;
- an architecture change materially exceeds Phase 2 scope.

When uncertain:

> **Prefer less implementation + more evidence over more implementation + less evidence.**

---

# 11. WHAT NOT TO BUILD IN PHASE 2

Do not build unless a documented Phase 2 requirement makes a minimal part directly necessary:

- full Runner OS;
- demand discovery/ingestion engine;
- demand scoring engine;
- opportunity intelligence engine;
- connector marketplace;
- outbound messaging automation;
- payment gateway;
- payment reconciliation;
- customer portal;
- full multi-tenant RBAC;
- autonomous agent orchestration;
- complex analytics;
- delivery workflow automation;
- learning automation;
- speculative event-driven infrastructure;
- speculative microservices;
- broad admin dashboard;
- production-scale infrastructure for future phases.

---

# 12. SECURITY AND OWNERSHIP

The execution agent must preserve Phase 1 security boundaries.

Rules:

- secrets never enter source code;
- secrets never enter domain records;
- secrets never enter prompts or committed documentation;
- customer/private data must remain isolated from public/canonical commercial documentation;
- provider credentials must remain outside business records;
- external action authority must remain explicitly bounded;
- audit data must not become a secret-storage mechanism.

Private/custom KAERVAX systems may exist in later architecture, but private customer identity, data, credentials, configuration, and secrets must remain isolated and must not become an undocumented commercial dependency.

---

# 13. SESSION CONTRACT

Every meaningful Phase 2 execution session must be reported using:

```
SESSION ID:
PHASE: 2
GATE: G2
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

A session without a measurable implementation, operating result, verification result, or evidence outcome is planning—not execution.

---

# 14. EXECUTION ALGORITHM

The execution agent must follow:

```
READ
  ↓
INSPECT MASTER SYSTEM PROMPT
  ↓
INSPECT GOVERNANCE / SSOT
  ↓
INSPECT ROADMAP
  ↓
INSPECT G0 STATE
  ↓
INSPECT G1 EVIDENCE
  ↓
INSPECT CURRENT REPOSITORY
  ↓
CONFIRM PHASE 2 AUTHORIZATION
  ↓
SPRINT 2.1 — DOMAIN MODEL
  ↓
TEST / VERIFY
  ↓
EVIDENCE
  ↓
SPRINT 2.2 — LIFECYCLE RULES
  ↓
TEST / VERIFY
  ↓
EVIDENCE
  ↓
SPRINT 2.3 — COMMANDS + AUDIT
  ↓
TEST / VERIFY
  ↓
EVIDENCE
  ↓
G2 ASSESSMENT
  ↓
REPORT
  ↓
COMMIT VERIFIED WORK
  ↓
STOP AT G2
```

Do not skip inspection because a historical plan appears to already specify the answer.

Do not claim verification for tests or deployments that were not actually executed.

---

# 15. REQUIRED FINAL EXECUTION REPORT

At the end of Phase 2 execution, produce a report containing:

1. Phase 2 status;
2. G2 decision;
3. Sprint 2.1 result;
4. Sprint 2.2 result;
5. Sprint 2.3 result;
6. canonical domain artifacts created/updated;
7. files changed;
8. tests executed and actual results;
9. security impact;
10. data/migration impact;
11. deployment impact;
12. OBSERVED evidence;
13. DERIVED conclusions;
14. SYNTHETIC examples, if any;
15. blockers and unresolved decisions;
16. confirmation that G0 remains unchanged;
17. exact commit SHA;
18. next decision.

If G2 is PARTIAL / BLOCKED or NOT PASSED, state the blocking evidence precisely.

If G2 is PASS, state explicitly:

> **G2 PASS = canonical-domain readiness only. It does not mean G0 passed and it does not authorize Phase 3 automatically.**

---

# 16. G0 / G1 / G2 INDEPENDENCE

The following must remain visible throughout execution:

```
G0 — COMMERCIAL VALIDATION
Real demand
→ real buyer interaction
→ offer response
→ transaction
→ delivery
→ outcome
→ learning

G1 — TECHNICAL FOUNDATION
Runtime
→ configuration
→ security
→ observability
→ tests
→ deployment/recovery baseline

G2 — CANONICAL DOMAIN
Domain model
→ lifecycle
→ commands
→ invariants
→ audit semantics
```

A technical gate cannot substitute for a commercial gate.

A domain model cannot be presented as proof of market demand.

A passing test cannot be presented as proof of customer value.

---

# 17. GIT AND CHANGE CONTROL

Before modifying files:

- inspect the current branch/ref;
- inspect recent commits;
- inspect the relevant existing files;
- preserve working behavior;
- avoid duplicate canonical documents.

After implementation:

- run the relevant verification;
- inspect the resulting diff/state;
- commit only verified work;
- report the exact commit SHA.

Do not create a parallel document when an existing canonical artifact should be updated.

Do not rewrite unrelated areas merely to make the architecture look complete.

---

# 18. FINAL OPERATING RULE

The purpose of Phase 2 is not to make KAERVAX look architecturally complete.

The purpose is to establish a **small, explicit, vendor-neutral, testable domain foundation** that can safely support later execution.

Therefore:

> **REAL DOMAIN RULES → REAL TESTS → REAL EVIDENCE → G2 DECISION**

And after G2:

> **STOP. DO NOT AUTOMATICALLY START PHASE 3.**

Commercial validation remains independently governed by G0.
