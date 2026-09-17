# KAERVAX — Testing & Delivery Contract

**Status:** Architecture Lock → Build Gate  
**Scope:** Quality, security validation, release, deployment, rollback, and commercial validation

## 1. Purpose

This document defines the minimum testing and delivery standard for KAERVAX.

> KAERVAX is not done because the code runs. It is done when intended business behavior is tested, safely deployable, observable, recoverable, and capable of supporting a real commercial transaction.

## 2. Quality Doctrine

Testing priority follows business risk:

1. Money and consequential actions.
2. Security and authorization.
3. Canonical business state.
4. External connector reliability.
5. Data integrity.
6. Core user workflow.
7. Presentation/UI details.
8. Optimization and scale.

Do not spend more testing effort on cosmetic UI than on transaction, authorization, or state-transition correctness.

## 3. Test Pyramid

```text
                 E2E / Commercial Flow
                       ▲
                Integration Tests
                       ▲
                  Domain Tests
                       ▲
                 Unit Tests
```

- **Unit:** fast deterministic behavior.
- **Domain:** business rules and state transitions.
- **Integration:** database, connectors, webhooks, workers.
- **E2E:** realistic user/business workflow.
- **Commercial validation:** real-world business outcome, not merely software behavior.

## 4. Test Environments

Tests MUST run against isolated environments:

```text
LOCAL → TEST → STAGING → PRODUCTION
```

Production data and live payment credentials MUST NOT be used for ordinary automated tests.

## 5. Unit Test Contract

Unit tests MUST cover critical deterministic logic, including validation, state transitions, qualification rules, scoring/decision calculations, permission policies, idempotency, evidence classification, normalization, and error classification.

Unit tests should not depend on live external providers.

## 6. Domain Test Contract

Every canonical lifecycle entity MUST have tests for valid initial state, valid transitions, invalid transitions, required fields, authorization conditions, audit requirements, side effects, and failure behavior.

Minimum lifecycle coverage:

```text
Demand / Opportunity / Offer / Action / Transaction / Delivery / Learning
```

A state transition that violates the architecture MUST fail deterministically.

## 7. Integration Test Contract

Integration tests SHOULD cover database reads/writes, migrations, connector adapters, authentication, webhook verification, provider-response normalization, workers, payment reconciliation, and audit persistence.

External integrations should use provider sandboxes, test accounts, mocks, or contract fixtures where available.

## 8. Connector Contract Tests

Every production connector MUST test:

1. capability declaration;
2. valid input;
3. invalid input;
4. authentication failure;
5. authorization failure;
6. provider error;
7. timeout/rate limit;
8. normalized success result;
9. partial result;
10. reconciliation/reference handling;
11. idempotent retry behavior where supported.

## 9. Webhook Tests

Webhook integrations MUST test valid/invalid/missing signatures, malformed payloads, unknown events, duplicates, replay/old events where applicable, unexpected state transitions, and successful reconciliation.

A webhook should be safe to receive more than once.

## 10. Payment Tests

At minimum test:

```text
payment created → pending → paid
pending → failed
pending → refunded
```

The system MUST verify payment state from the authoritative payment provider.

Invalid validation methods include trusting browser success alone, trusting an AI statement, manually setting `paid` without provider evidence, or using a fake payment as proof of commercial validation.

## 11. Security Test Contract

Security testing MUST cover:

- unauthenticated and invalid/expired-session access;
- unauthorized commands and cross-object access;
- privilege escalation;
- secret exposure in logs, errors, bundles, and artifacts;
- prompt injection from external content;
- AI attempts to bypass approval;
- generated false payment confirmation;
- unsupported factual claims entering canonical state;
- duplicate action execution;
- replayed webhook and unsafe retry.

## 12. Data Integrity Tests

Test that foreign-key relationships remain valid, canonical IDs remain stable, external IDs remain separate, duplicate demand signals can be detected/reconciled, invalid state combinations are rejected, audit history is retained appropriately, and transaction/delivery linkage remains intact.

Data integrity failures that can corrupt business truth are release blockers.

## 13. API Contract Tests

Important endpoints SHOULD test valid requests, missing/malformed fields, authentication and authorization failures, invalid state transitions, successful responses, expected error envelopes, and internal failures without sensitive leakage.

API behavior must remain consistent with the canonical domain model.

## 14. End-to-End Core Flow

The mandatory E2E happy path is:

```text
Capture Demand
  ↓
Qualify Demand
  ↓
Create Opportunity
  ↓
Approve Opportunity
  ↓
Create Offer
  ↓
Approve Offer
  ↓
Create Action
  ↓
Approve Action
  ↓
Execute Action
  ↓
Record Conversation / Lead
  ↓
Record Transaction
  ↓
Verify Payment
  ↓
Create Delivery
  ↓
Complete Delivery
  ↓
Record Outcome
  ↓
Capture Learning
```

The test must prove that records remain linked across the journey.

## 15. Failure-Path E2E Tests

Test realistic failures including demand rejection, opportunity loss, offer rejection/expiry, action denial/failure, connector timeout/partial result, payment failure/refund, and delivery/customer issues.

Each failure must result in a known state rather than an ambiguous silent failure.

## 16. Idempotency Tests

For retry-sensitive operations, test duplicate webhooks, duplicate payment synchronization, repeated action execution requests, and repeated external creates where provider idempotency is supported.

Repeated delivery of the same logical event must not silently produce multiple unintended business effects.

## 17. Migration Tests

Every schema migration MUST be tested on both a fresh database and an existing test database. Destructive migrations require a recovery/rollback strategy or a documented forward-only plan.

## 18. Regression Contract

Before release, run regression coverage for demand capture, qualification, opportunity, offer, action, transaction, delivery, learning, authentication, authorization, and audit.

Critical regression failures block release.

## 19. Performance Baseline

MVP performance testing should measure API latency, database query latency, worker execution time, connector latency, and webhook processing time.

Do not optimize for hypothetical massive scale before real usage provides evidence.

## 20. Observability Validation

Important operations MUST produce enough telemetry to identify request ID, actor, object ID, operation, connector/execution ID where applicable, result, error code, and timing.

Logs must remain redacted.

## 21. Release Candidate Checklist

```text
[ ] architecture contract preserved
[ ] domain tests pass
[ ] integration tests pass
[ ] security tests pass
[ ] connector tests pass
[ ] payment tests pass
[ ] webhook tests pass
[ ] E2E core flow passes
[ ] regression suite passes
[ ] migrations validated
[ ] secrets scan passes
[ ] build succeeds
[ ] observability verified
[ ] backup/recovery verified
[ ] release notes prepared
[ ] rollback/recovery path understood
```

## 22. Release Gates

### Gate A — Code Quality

Build, lint/type checks where applicable, critical tests, and critical security checks pass.

### Gate B — Architecture

Ownership and connector boundaries are preserved; no secrets are committed; approval gates remain intact; canonical state model is preserved.

### Gate C — Operational Readiness

Environment configuration, secrets, migrations, logging/monitoring, and backup/recovery are ready.

### Gate D — Commercial Readiness

For the real-business MVP milestone, payment, delivery, operator workflow, real demand capture, and outcome recording are operational.

## 23. Rollback Contract

Every production release must have a recovery strategy:

```text
DETECT → CONTAIN → DISABLE RISKY FEATURE IF POSSIBLE → ROLL BACK / FORWARD-FIX → RECONCILE EXTERNAL STATE → VERIFY BUSINESS DATA → RECORD INCIDENT
```

Database rollback must not be assumed safe for every migration.

## 24. Feature Rollout Contract

High-risk capabilities should use staged rollout where practical:

```text
OFF → INTERNAL → LIMITED OPERATOR → CONTROLLED PRODUCTION → GENERAL AVAILABILITY
```

Sensitive capabilities include outbound messaging, automated publishing, payment operations, voice-triggered commands, new external connectors, and autonomous research/execution.

## 25. Human Acceptance Test

Before a release is usable, the operator should be able to complete the core journey without engineering intervention:

1. capture real demand;
2. review and qualify it;
3. approve an opportunity;
4. prepare and approve an offer;
5. approve/execute the required action;
6. track buyer response;
7. reconcile payment;
8. record delivery;
9. record outcome and learning.

If the operator cannot understand what happened, the system is not operationally ready even if backend tests pass.

## 26. Commercial Validation Contract

Software testing and business validation are separate.

**Software validation:** Does the system behave according to its contract?

**Commercial validation:** Did a real market interaction produce a real business outcome?

The first real commercial milestone requires:

```text
REAL DEMAND
→ REAL OFFER
→ REAL BUYER INTERACTION
→ REAL PAYMENT
→ REAL DELIVERY
→ REAL OUTCOME
```

Synthetic data can validate software. It cannot prove market demand.

## 27. Coding-Agent Delivery Contract

For each implementation batch, a coding agent MUST report:

- files changed;
- architecture documents referenced;
- tests added/changed;
- commands/tests executed;
- pass/fail result;
- unresolved issues;
- migration impact;
- security impact;
- deployment impact.

The agent MUST NOT report “complete” solely because files were generated or committed. If tests cannot be run, it must state that clearly.

## 28. Delivery Artifact Contract

A production release should have a traceable artifact containing source commit/reference, build identifier, environment target, migration version, test summary, deployment timestamp, and rollback/recovery reference.

## 29. Severity & Release Blocking

### Blocker

Secret exposure, unauthorized financial action, corrupted canonical state, false `paid` state, approval bypass, or unrecoverable high-risk deployment.

**Release: blocked.**

### Critical

Core commercial flow broken, repeated external side effect possible, major authorization failure, or unreliable transaction reconciliation.

**Release: blocked until mitigated or explicitly accepted through controlled incident process.**

### Major

Meaningful degradation with a known workaround. Requires explicit review.

### Minor

Low-impact defect with no material business/security effect. May proceed with tracking.

## 30. Minimum MVP Definition of Done

Technical delivery readiness requires:

- canonical domain exists;
- security contract implemented;
- environments/secrets isolated;
- core API works;
- operator UI supports the loop;
- required connector path works;
- transaction reconciliation works;
- delivery can be tracked;
- learning can be captured;
- critical tests pass;
- production deployment is controlled;
- recovery path exists.

**Commercial validation** occurs only after a real paid case is completed and recorded.

## 31. Non-Negotiable Rules

```text
NO TEST EVIDENCE        → NO CLAIM OF COMPLETION
NO SECURITY BASELINE    → NO PRODUCTION
NO PAYMENT VERIFICATION → NO PAID STATE
NO APPROVAL             → NO CONSEQUENTIAL ACTION
NO RECOVERY PATH        → NO HIGH-RISK RELEASE
NO REAL TRANSACTION     → NO CLAIM OF MARKET VALIDATION
```

## 32. Architecture Lock

This document locks the KAERVAX testing and delivery standard.

Implementation may add stronger tests and release controls, but MUST NOT weaken release gates for security, financial integrity, authorization, canonical business state, or real commercial validation.

**Next:** `12_ROADMAP_AND_PHASE_GATES.md`
