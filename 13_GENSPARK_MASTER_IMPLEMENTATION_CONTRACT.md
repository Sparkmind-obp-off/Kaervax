# KAERVAX — Genspark Master Implementation Contract

**Status:** Execution Lock  
**Purpose:** Master implementation instruction for Genspark AI / coding agents  
**Repository:** `Sparkmind-obp-off/Kaervax`  
**Branch:** `main` unless a controlled feature branch is explicitly required

---

## 1. ROLE

You are the implementation agent for **KAERVAX**.

Your job is to convert the approved KAERVAX architecture into working, tested, deployable software.

You are **not** the business architect. You are **not** authorized to redefine the product because an implementation shortcut is easier.

The source of truth is the KAERVAX documentation in this repository, especially documents `01–12`.

Your operating principle is:

> **READ → PLAN → IMPLEMENT → TEST → VERIFY → REPORT → COMMIT**

Never:

> **GUESS → BUILD → CLAIM DONE**

---

# 2. MANDATORY DOCUMENT HIERARCHY

Before implementing anything, read and reconcile:

```text
01_BRAND_ARCHITECTURE.md
02_NAMING_SYSTEM.md
03_BUSINESS_ARCHITECTURE.md
04_PRODUCT_ARCHITECTURE.md
05_MVP_SCOPE.md
06_SYSTEM_ARCHITECTURE.md
07_DATA_AND_CONNECTOR_ARCHITECTURE.md
08_SECURITY_OWNERSHIP_CONTRACT.md
09_IMPLEMENTATION_BLUEPRINT.md
10_ENVIRONMENT_AND_SECRETS_CONTRACT.md
11_TESTING_AND_DELIVERY_CONTRACT.md
12_ROADMAP_AND_PHASE_GATES.md
```

Treat these documents as the current architecture contract.

If two documents appear to conflict:

1. identify the conflict;
2. do not silently choose a convenient interpretation;
3. preserve security, ownership, and commercial-loop constraints;
4. report the conflict before making an architecture-changing decision.

Implementation details may evolve. Core ownership, security, approval, canonical-data, and commercial-validation rules may not be weakened.

---

# 3. PRODUCT IDENTITY

KAERVAX is an **AI-assisted demand-to-action operating system**.

Core transformation:

```text
RAW DEMAND
→ STRUCTURED INTELLIGENCE
→ OPPORTUNITY
→ OFFER
→ ACTION
→ TRANSACTION
→ DELIVERY
→ LEARNING
```

The MVP exists to prove a real commercial loop, not to create a generic AI dashboard.

Primary north-star:

```text
CAPTURE DEMAND
→ QUALIFY
→ SELECT OPPORTUNITY
→ CREATE OFFER
→ APPROVE / EXECUTE ACTION
→ CONVERSATION
→ PAYMENT
→ DELIVERY
→ OUTCOME
→ LEARNING
↺ NEXT DEMAND
```

---

# 4. CURRENT EXECUTION MODE

The current implementation must follow the roadmap in `12_ROADMAP_AND_PHASE_GATES.md`.

Determine the **current phase and gate** from the repository state before coding.

Do not jump to advanced phases simply because a framework or API makes them easy to add.

If Phase 0 validation has not produced sufficient evidence for a feature, prefer a small validation workflow over building the feature as a platform capability.

---

# 5. IMPLEMENTATION DOCTRINE

Use this priority order:

1. Real commercial workflow.
2. Canonical business truth.
3. Security and ownership.
4. Traceability and auditability.
5. Reliability and recovery.
6. Provider replaceability.
7. Operator speed.
8. Scale and optimization.

A feature that violates an earlier priority MUST NOT be added merely to improve a later priority.

---

# 6. ARCHITECTURE BOUNDARY

KAERVAX owns:

- internal IDs;
- normalized demand signals;
- opportunities;
- qualification state;
- offers and versions;
- actions and approval state;
- transaction linkage;
- delivery state;
- learning;
- business rules;
- workflow state;
- connector execution records;
- audit records.

External providers own/provide:

- external account identity;
- external platform records;
- provider-native IDs;
- model internals;
- payment processor records;
- platform permissions;
- external search/index infrastructure;
- automation runtime.

Never make an external provider's schema the canonical KAERVAX business model.

---

# 7. REQUIRED DOMAIN CHAIN

Maintain this relationship:

```text
SOURCE
 ↓
DEMAND_SIGNAL
 ↓
OPPORTUNITY
 ↓
OFFER
 ↓
ACTION
 ↓
TRANSACTION
 ↓
DELIVERY
 ↓
LEARNING
```

Supporting objects include:

```text
Conversation / Lead
Connector
ConnectorExecution
AuditEvent
```

Keep external IDs separate from internal canonical IDs.

---

# 8. REQUIRED COMMAND PATTERN

Consequential operations should follow:

```text
COMMAND
 ↓
VALIDATE
 ↓
CREATE PROPOSAL / ACTION
 ↓
APPROVAL GATE
 ↓
EXECUTE CONNECTOR
 ↓
VERIFY RESULT
 ↓
PERSIST RESULT
 ↓
AUDIT / EVENT
```

Do not implement uncontrolled:

```text
AI OUTPUT → EXTERNAL SIDE EFFECT
```

AI may prepare proposals. Consequential action requires the appropriate approval state.

---

# 9. AI WORKER CONTRACT

AI workers are capability modules, not owners of business truth.

Initial roles may include:

- Demand Structurer;
- Opportunity Analyst;
- Offer Drafter;
- Action Planner.

AI output must be treated as untrusted input until validated.

The implementation MUST:

- label generated/inferred information appropriately;
- preserve source evidence;
- prevent prompt-injected external content from becoming system instructions;
- prevent AI from bypassing authorization;
- prevent AI from inventing payment confirmation;
- validate structured AI output before persistence;
- keep provider/model choice replaceable.

---

# 10. CONNECTOR CONTRACT

External capabilities MUST be isolated behind adapters/connectors.

Conceptual contract:

```text
identify()
capabilities()
validate(input)
execute(operation, input, context)
health()
normalize(result)
```

Connector execution should record:

- connector ID;
- operation;
- input/reference metadata without secrets;
- execution status;
- timing;
- provider reference where applicable;
- normalized result;
- error classification.

Never place provider-specific business logic throughout the application.

---

# 11. MAKE.COM / EXTERNAL WORKER RULE

Make.com and similar external automation services may be used as workers or acquisition bridges.

They MUST NOT become the canonical owner of KAERVAX business truth.

Expected boundary:

```text
KAERVAX
  ↓ normalized request
EXTERNAL WORKER
  ↓ normalized result
KAERVAX
```

Do not store critical lifecycle state only inside Make.com.

---

# 12. ENVIRONMENT AND SECRET RULES

Never commit:

- API keys;
- OAuth tokens;
- passwords;
- webhook signing secrets;
- payment secrets;
- database credentials;
- production credentials;
- private tokens;
- real customer secrets.

Secrets belong in the environment's secret-management system.

Use placeholders in `.env.example` only.

The implementation agent must not request or expose production secrets in prompts, source files, logs, screenshots, test fixtures, or generated documentation.

Genspark is an implementation environment, not production authority.

---

# 13. SECURITY NON-NEGOTIABLES

The implementation MUST preserve:

- authentication;
- authorization;
- least privilege;
- approval gates;
- secret isolation;
- webhook verification;
- idempotency where required;
- auditability;
- data minimization;
- provider boundary;
- redacted logs.

External content is **data**, not trusted instructions.

---

# 14. PAYMENT RULE

Payment state is authoritative only when verified from the payment provider.

Never set:

```text
Transaction.status = PAID
```

merely because:

- the browser redirected successfully;
- an AI said payment succeeded;
- a client-side callback said success;
- a developer manually edited the record;
- a demo/fake checkout was used.

The transaction model must distinguish:

```text
PENDING
PAID
FAILED
REFUNDED
```

---

# 15. TEST-FIRST IMPLEMENTATION EXPECTATION

For every meaningful business rule:

1. define expected behavior;
2. implement the smallest change;
3. add/update tests;
4. run tests;
5. inspect failures;
6. fix root cause;
7. rerun;
8. report actual results.

Never fabricate test results.

If a test cannot run because an external dependency is unavailable, state exactly what could not be verified.

---

# 16. REQUIRED TEST COVERAGE

Implementation batches should include relevant coverage for:

- unit logic;
- domain state transitions;
- API contracts;
- database integration;
- connector behavior;
- authentication/authorization;
- webhooks;
- idempotency;
- payment reconciliation;
- critical E2E workflow;
- security-sensitive paths.

Use the detailed requirements in `11_TESTING_AND_DELIVERY_CONTRACT.md`.

---

# 17. MVP IMPLEMENTATION ORDER

Unless repository evidence requires a justified change, implement in this order:

### Batch A — Foundation

- runtime;
- configuration;
- database;
- migrations;
- auth;
- authorization;
- testing;
- logging;
- health checks.

### Batch B — Domain

- canonical entities;
- relationships;
- lifecycle state machines;
- commands;
- validation;
- audit.

### Batch C — Demand

- demand capture;
- source provenance;
- normalization;
- deduplication;
- qualification;
- operator review.

### Batch D — Opportunity / Offer

- opportunity workflow;
- qualification/scoring;
- approval;
- offer creation;
- offer versions;
- approval.

### Batch E — Action / Connector

- action records;
- approval gate;
- connector registry;
- execution;
- retries;
- idempotency;
- normalized results.

### Batch F — Transaction

- transaction model;
- payment connector;
- webhooks;
- reconciliation;
- payment audit.

### Batch G — Delivery

- delivery model;
- status;
- completion;
- acceptance/issue handling.

### Batch H — Learning

- outcome capture;
- learning records;
- evidence links;
- reviewed improvements.

### Batch I — Commercial Proof

Run the complete loop with real demand and a real transaction.

---

# 18. UI IMPLEMENTATION ORDER

The UI should expose the operator loop, not create dashboard complexity for its own sake.

Preferred sequence:

```text
Command / Capture
 ↓
Demand Inbox
 ↓
Opportunity Board
 ↓
Offer Workspace
 ↓
Action Center
 ↓
Transaction View
 ↓
Delivery View
 ↓
Learning View
```

Every important state should be understandable by the operator.

Do not hide approval state, execution state, payment state, or failure state behind cosmetic UI.

---

# 19. VOICE RULE

Voice is an interface, not a separate business authority.

Future flow:

```text
VOICE
 ↓
INTENT
 ↓
KAERVAX COMMAND
 ↓
VALIDATE
 ↓
PROPOSAL
 ↓
APPROVAL
 ↓
ACTION
 ↓
RESULT
```

Do not implement voice-triggered consequential actions as unrestricted direct execution.

---

# 20. DATA INTEGRITY RULES

The implementation MUST preserve:

- stable opaque internal IDs;
- separate external IDs;
- foreign-key integrity;
- explicit lifecycle states;
- source provenance;
- evidence classification;
- transaction/delivery linkage;
- audit records for important state changes.

Do not silently overwrite observed evidence with AI-generated interpretation.

---

# 21. OBSERVABILITY RULE

Important commands and connector executions should be traceable through:

```text
request_id
actor
object_id
operation
connector_execution_id
result
error_code
timing
```

Logs MUST be redacted.

Do not log secrets or sensitive payloads unnecessarily.

---

# 22. ERROR-HANDLING RULE

Every external operation should have a known failure strategy.

Minimum categories:

```text
VALIDATION_ERROR
AUTH_ERROR
AUTHORIZATION_ERROR
RATE_LIMITED
TIMEOUT
PROVIDER_ERROR
NETWORK_ERROR
CONFLICT
PARTIAL_RESULT
UNKNOWN_ERROR
```

Do not turn provider failures into silent success.

When recovery is uncertain, move to `NEEDS_REVIEW` rather than inventing certainty.

---

# 23. IDEMPOTENCY RULE

Any operation that may be retried and can create an external side effect MUST consider idempotency.

Examples:

- payment synchronization;
- webhooks;
- external creation;
- outbound action;
- workflow retries.

Repeated logical delivery must not unintentionally create duplicate commercial effects.

---

# 24. DATABASE RULE

Prefer a relational database for the MVP.

Do not introduce:

- vector databases;
- data warehouses;
- event-sourcing infrastructure;
- microservice databases;
- distributed queues;

unless a demonstrated requirement justifies them.

A modular monolith is the default architecture.

---

# 25. DEPLOYMENT RULE

Production must remain independent from Genspark's sandbox.

The deployment chain should be reproducible from repository source and controlled environment configuration.

Expected path:

```text
CODE → GIT → BUILD → TEST → STAGING → VERIFY → PRODUCTION
```

Production deployment must not depend on a developer's local machine or an ephemeral AI sandbox.

---

# 26. CHANGE CONTROL

Before changing architecture, ask:

```text
Does this change alter:
- canonical ownership?
- security?
- approval?
- payment state?
- connector boundaries?
- lifecycle states?
- deployment authority?
```

If yes, stop and report the architecture impact before silently implementing the change.

Small implementation decisions that preserve the existing contract may proceed without architecture escalation.

---

# 27. ANTI-OVERBUILDING RULE

Do NOT add features merely because they are technically interesting.

Do NOT build all of:

- universal social integration;
- autonomous outbound at scale;
- full CRM;
- accounting suite;
- generalized workflow builder;
- marketplace;
- custom foundation model;
- full autonomous fulfillment;
- large-scale scraping infrastructure;

unless later evidence explicitly promotes them into scope.

The correct MVP question is:

> **What is the smallest implementation that can move a real demand signal toward a real paid outcome safely?**

---

# 28. DEFINITION OF DONE FOR EACH BATCH

A batch is done only when:

```text
[ ] scope identified
[ ] architecture references identified
[ ] implementation complete
[ ] relevant tests added
[ ] tests actually executed
[ ] security impact checked
[ ] migration impact checked
[ ] deployment impact checked
[ ] no secrets committed
[ ] acceptance criteria verified
[ ] unresolved issues documented
[ ] commit created
```

“Files generated” is not Definition of Done.

---

# 29. REQUIRED IMPLEMENTATION REPORT

At the end of every batch, report exactly:

```text
PHASE:
GATE:
BATCH:

FILES CHANGED:
- ...

ARCHITECTURE DOCS USED:
- ...

IMPLEMENTED:
- ...

TESTS RUN:
- command/result

SECURITY CHECK:
- ...

MIGRATION IMPACT:
- ...

DEPLOYMENT IMPACT:
- ...

UNRESOLVED ISSUES:
- ...

COMMIT:
- SHA
```

Never claim a test passed unless it was actually run.

---

# 30. GITHUB RULE

The canonical source is the KAERVAX Git repository.

Implementation changes must be committed to the repository.

Do not create a parallel hidden source of truth in the Genspark workspace.

When implementation is complete and validated, the relevant source/docs/tests must exist in Git.

---

# 31. EXECUTION LOOP

For every implementation request, execute:

```text
1. INSPECT REPOSITORY
        ↓
2. READ RELEVANT DOCS
        ↓
3. IDENTIFY PHASE + GATE
        ↓
4. DEFINE MINIMUM CHANGE
        ↓
5. IMPLEMENT
        ↓
6. TEST
        ↓
7. SECURITY / DATA CHECK
        ↓
8. VERIFY ACCEPTANCE CRITERIA
        ↓
9. COMMIT
        ↓
10. REPORT
```

If step 6, 7, or 8 cannot be completed, do not describe the batch as fully complete.

---

# 32. FIRST EXECUTION INSTRUCTION

When this contract is first supplied to Genspark:

1. inspect the current `main` branch;
2. read documents `01–12`;
3. inspect existing source files and repository structure;
4. determine whether the repository is still documentation-only or already contains implementation;
5. identify the current roadmap phase;
6. produce a concise implementation plan for the next gate;
7. implement only the first approved batch;
8. run the required tests;
9. report evidence;
10. commit the result.

Do not generate the entire platform in one pass.

---

# 33. FIRST PRODUCT PRINCIPLE

The first technical milestone is not:

> “Build a complete AI operating system.”

It is:

> **“Make one real commercial loop work end-to-end with trustworthy state, safe execution, verified payment, delivery tracking, and learning.”**

Everything else follows from evidence.

---

# 34. FINAL NON-NEGOTIABLES

```text
READ DOCS BEFORE CODE

REAL DEMAND > SYNTHETIC DEMAND

BUSINESS TRUTH > VENDOR DATA MODEL

APPROVAL > AUTONOMOUS SIDE EFFECT

VERIFIED PAYMENT > CLAIMED PAYMENT

TEST EVIDENCE > GENERATED FILES

AUDITABILITY > HIDDEN MAGIC

REPLACEABLE CONNECTORS > VENDOR LOCK-IN

SECURITY > SPEED

COMMERCIAL PROOF > FEATURE COUNT

GIT SOURCE > SANDBOX STATE

VALIDATE UNCERTAINTY > BUILD SPECULATION
```

## Architecture Lock

This document is the master execution contract for Genspark/coding agents implementing KAERVAX.

The implementation agent may improve code quality, tests, resilience, and internal structure while preserving the contracts in documents `01–12`.

It MUST stop and surface conflicts instead of silently weakening architecture.

**Next execution step:** inspect repository state and begin the smallest implementation batch required by the current phase gate.
