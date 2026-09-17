# KAERVAX — Roadmap & Phase Gates

**Status:** Architecture Lock → Execution Roadmap  
**Scope:** From foundation to real commercial loop and controlled expansion

## 1. Purpose

This document defines the execution order for KAERVAX and the gates required before moving from one phase to the next.

The roadmap is intentionally **evidence-driven**. KAERVAX must not expand into a broad platform before the core demand-to-revenue loop has demonstrated real utility.

## 2. North-Star Loop

```text
DEMAND
  ↓
INTELLIGENCE
  ↓
OPPORTUNITY
  ↓
OFFER
  ↓
ACTION
  ↓
CONVERSATION
  ↓
TRANSACTION
  ↓
DELIVERY
  ↓
OUTCOME
  ↓
LEARNING
  ↺
NEXT DEMAND
```

Every phase exists to make one part of this loop reliable.

## 3. Roadmap Doctrine

Priority order:

1. Real demand.
2. Real commercial outcome.
3. Canonical business truth.
4. Security and ownership.
5. Traceability.
6. Reliable execution.
7. Provider replaceability.
8. Operator speed.
9. Scale and sophistication.

A technically impressive feature that does not strengthen the loop should remain outside the current phase.

## 4. Phase Map

| Phase | Name | Primary Outcome |
|---|---|---|
| 0 | Validation & Operating Setup | Real demand hypothesis and operating method |
| 1 | Foundation | Deployable KAERVAX skeleton |
| 2 | Canonical Domain | Business truth and lifecycle engine |
| 3 | Demand Intelligence | Real demand enters structured system |
| 4 | Opportunity & Offer | Demand becomes actionable commercial opportunity |
| 5 | Action & Connectors | Approved work can be executed safely |
| 6 | Transaction | Payment becomes traceable business state |
| 7 | Delivery | Paid work reaches completion |
| 8 | Learning | Outcomes improve future decisions |
| 9 | Commercial Validation | Real paid loop proven |
| 10 | Controlled Expansion | Evidence-based automation and productization |

---

# PHASE 0 — VALIDATION & OPERATING SETUP

## Objective

Validate the first business workflow before significant software expansion.

## Activities

- identify one concrete buyer/problem class;
- collect real demand signals;
- manually inspect source quality;
- define initial offer hypothesis;
- define delivery method;
- define payment path;
- record evidence in KAERVAX-compatible structure.

## Allowed tooling

Manual research, ChatGPT, Make.com, accessible APIs, browser workflows, spreadsheets, and lightweight scripts may be used.

## Gate 0

Proceed only when:

- a real demand source exists;
- demand can be captured consistently enough to test;
- a concrete offer hypothesis exists;
- payment and delivery path are understood;
- synthetic demand is clearly separated from observed demand.

**Output:** first validated operating experiment.

---

# PHASE 1 — FOUNDATION

## Objective

Create the smallest production-capable application foundation.

## Scope

- repository structure;
- application runtime;
- database connection;
- configuration system;
- authentication baseline;
- authorization baseline;
- health checks;
- logging/observability baseline;
- migration framework;
- test framework;
- deployment pipeline skeleton.

## Gate 1 — Foundation Ready

```text
[ ] application boots
[ ] database connects
[ ] migrations run
[ ] authentication works
[ ] authorization baseline works
[ ] secrets are externalized
[ ] logs are redacted
[ ] health check works
[ ] automated test command works
[ ] deployment target is reproducible
```

No business expansion if the foundation is unstable.

---

# PHASE 2 — CANONICAL DOMAIN

## Objective

Implement KAERVAX business truth independent of external providers.

## Core entities

```text
Source
DemandSignal
Opportunity
Offer
Action
Conversation / Lead
Transaction
Delivery
Learning
Connector
ConnectorExecution
AuditEvent
```

## Scope

- internal IDs;
- lifecycle states;
- domain validation;
- command handlers;
- relationships;
- audit events;
- evidence classification;
- idempotency primitives.

## Gate 2 — Domain Ready

The system can create and transition canonical records without relying on a vendor-specific data model.

Invalid state transitions must fail.

---

# PHASE 3 — DEMAND INTELLIGENCE

## Objective

Move from raw external demand to structured, reviewable demand signals.

## Scope

- demand capture;
- source provenance;
- raw payload retention where appropriate;
- normalization;
- deduplication;
- evidence classification;
- AI-assisted structuring;
- qualification;
- operator review.

## Initial sources

Start narrow. Use whichever real source provides measurable demand; Threads/X/social/community sources may be connected through approved APIs, Make.com, browser workflows, or other scoped connectors as appropriate.

Do not require universal platform coverage.

## Gate 3 — Demand Ready

```text
REAL SOURCE
→ CAPTURE
→ NORMALIZE
→ QUALIFY
→ OPERATOR REVIEW
```

The operator can distinguish observed evidence from inference or generated content.

---

# PHASE 4 — OPPORTUNITY & OFFER

## Objective

Turn qualified demand into a commercially actionable opportunity and offer.

## Scope

- opportunity creation;
- scoring/qualification rules;
- operator approval;
- offer drafting;
- offer versions;
- pricing/terms fields where relevant;
- approval workflow;
- buyer-facing offer preparation.

## Gate 4 — Offer Ready

At least one real demand signal can become:

```text
QUALIFIED DEMAND
→ APPROVED OPPORTUNITY
→ APPROVED OFFER
```

The system must retain the evidence and reasoning trail used by the operator.

---

# PHASE 5 — ACTION & CONNECTORS

## Objective

Execute approved actions through replaceable connectors without bypassing control gates.

## Scope

- action records;
- approval gate;
- connector registry;
- connector execution;
- retries;
- idempotency;
- result normalization;
- execution audit;
- failure/review states.

## Typical actions

- prepare outreach;
- send approved communication;
- publish approved content;
- create external draft;
- submit an approved request;
- trigger a scoped automation.

Autonomous high-risk action is not a Phase 5 requirement.

## Gate 5 — Safe Action

```text
PROPOSAL
→ APPROVAL
→ EXECUTION
→ VERIFY
→ RECORD
```

No consequential action may silently bypass approval.

---

# PHASE 6 — TRANSACTION

## Objective

Connect commercial activity to authoritative payment state.

## Scope

- transaction records;
- payment-provider connector;
- checkout/reference linkage;
- webhook handling;
- signature verification;
- reconciliation;
- failed/refunded states;
- transaction audit.

## Gate 6 — Transaction Ready

The system can distinguish:

```text
PENDING ≠ PAID ≠ FAILED ≠ REFUNDED
```

`PAID` requires authoritative provider evidence.

---

# PHASE 7 — DELIVERY

## Objective

Track the actual fulfillment of a paid commercial commitment.

## Scope

- delivery records;
- delivery status;
- milestones where necessary;
- deliverable references;
- acceptance/issue state;
- completion timestamp;
- buyer outcome capture.

## Gate 7 — Delivery Ready

A real paid transaction can be linked to a delivery and brought to a known final state.

---

# PHASE 8 — LEARNING

## Objective

Turn commercial outcomes into structured learning without corrupting observed facts.

## Scope

- outcome capture;
- learning records;
- source/evidence references;
- hypotheses;
- operator review;
- changes to qualification/offer/action assumptions;
- experiment tracking.

## Evidence rule

```text
OBSERVED → VERIFIED
INFERRED → REVIEWED
GENERATED → LABELED
```

Generated analysis must not silently become business fact.

## Gate 8 — Learning Ready

At least one completed workflow can produce a recorded outcome and an actionable learning item.

---

# PHASE 9 — COMMERCIAL VALIDATION

## Objective

Prove the complete loop with a real market interaction.

## Required chain

```text
REAL DEMAND
→ REAL OPPORTUNITY
→ REAL OFFER
→ REAL BUYER INTERACTION
→ REAL PAYMENT
→ REAL DELIVERY
→ REAL OUTCOME
→ REAL LEARNING
```

## Gate 9 — Commercial Proof

The milestone is passed only when a real paid case has completed through delivery and outcome recording.

A demo, fake checkout, seeded database, AI-generated lead, or internal test does not satisfy this gate.

This phase is the primary anti-overbuilding checkpoint.

---

# PHASE 10 — CONTROLLED EXPANSION

## Objective

Expand only where real evidence shows that additional automation, sources, or product capabilities create measurable value.

Potential expansion areas:

- additional demand sources;
- more connector capabilities;
- voice-first command interface;
- stronger opportunity scoring;
- automated offer variants;
- distribution workflows;
- recurring service/product models;
- team/operator roles;
- customer-facing workspace;
- analytics and experimentation;
- selective autonomous execution.

## Gate 10 — Expansion Evidence

A new capability should have:

- documented user/business problem;
- evidence of demand;
- measurable expected outcome;
- security assessment;
- ownership impact assessment;
- operational cost assessment;
- rollback/recovery path.

No expansion merely because a technology is available.

---

# 5. Phase Gate Matrix

| Gate | Must Prove | Blocks Next Phase If |
|---|---|---|
| G0 | Real demand hypothesis + operating path | Demand is purely hypothetical |
| G1 | Stable technical foundation | Deployment/security basics fail |
| G2 | Canonical business truth | State model is vendor-dependent |
| G3 | Structured real demand | Sources cannot be traced/qualified |
| G4 | Actionable opportunity + offer | Offer cannot be reviewed/approved |
| G5 | Safe execution | Approval/idempotency/audit fail |
| G6 | Authoritative payment state | Payment cannot be reconciled |
| G7 | Fulfillment traceability | Paid work cannot reach known outcome |
| G8 | Outcome → learning | Results cannot inform next iteration |
| G9 | Real paid commercial loop | Validation relies on synthetic activity |
| G10 | Evidence for expansion | Feature is speculative or unjustified |

---

# 6. Stop Conditions

Development MUST pause when any of these occur:

- architecture contradiction is discovered;
- security boundary is unclear;
- production secret handling is unclear;
- payment state cannot be verified;
- external action lacks approval control;
- canonical data ownership becomes ambiguous;
- connector behavior cannot be reconciled;
- real demand evidence is absent for an expansion;
- implementation becomes feature accumulation without commercial evidence.

When stopped, resolve the contract conflict before continuing.

---

# 7. Build vs Validate Rule

Use this decision loop:

```text
DO WE HAVE EVIDENCE?
        │
   ┌────┴────┐
  YES        NO
   │          │
 BUILD      VALIDATE
   │          │
 TEST       OBSERVE
   │          │
 MEASURE    LEARN
   └────┬─────┘
        ↓
   NEXT DECISION
```

The default response to uncertainty is validation, not more software.

---

# 8. Implementation Batch Contract

Every implementation batch should identify:

- current phase;
- gate being targeted;
- files/modules affected;
- architecture contracts referenced;
- tests required;
- acceptance criteria;
- deployment impact;
- security impact;
- rollback/recovery considerations.

A batch that cannot identify its phase and gate should not be merged into the main implementation stream.

---

# 9. Coding-Agent Phase Rules

A coding agent MUST:

1. read the applicable architecture documents before implementation;
2. identify the current phase and gate;
3. implement only the approved scope;
4. preserve canonical ownership;
5. preserve approval gates;
6. avoid committing secrets;
7. add/update tests;
8. report actual test results;
9. stop when an architecture conflict appears;
10. never claim commercial validation from synthetic data.

The coding agent is an execution layer, not the authority for business architecture.

---

# 10. Human Operator Authority

The operator remains authoritative for:

- selecting the initial commercial experiment;
- approving opportunities;
- approving consequential offers/actions;
- interpreting ambiguous evidence;
- accepting delivery outcomes;
- deciding whether evidence justifies expansion.

AI may assist analysis and preparation, but must not silently replace operator authority over consequential business decisions.

---

# 11. Voice-First Roadmap

Voice is an interface layer, not a separate business architecture.

Future path:

```text
VOICE
 ↓
INTENT
 ↓
KAERVAX COMMAND
 ↓
VALIDATION
 ↓
PROPOSAL
 ↓
APPROVAL
 ↓
ACTION
 ↓
RESULT
```

Voice automation should be introduced only after the underlying command and approval model is reliable.

---

# 12. Production Promotion Rule

Promotion between environments follows:

```text
LOCAL
  ↓
TEST
  ↓
STAGING
  ↓
PRODUCTION
```

A phase gate is not satisfied merely by source-code completion. The gate requires the evidence specified in this document and the testing/delivery requirements in `11_TESTING_AND_DELIVERY_CONTRACT.md`.

---

# 13. Roadmap Success Definition

KAERVAX succeeds as an MVP when it can repeatedly support this practical operator loop:

```text
FIND REAL DEMAND
→ UNDERSTAND IT
→ SELECT AN OPPORTUNITY
→ CREATE AN OFFER
→ TAKE CONTROLLED ACTION
→ GET PAID
→ DELIVER
→ LEARN
→ FIND THE NEXT DEMAND
```

The long-term platform is built from proven loops, not from speculative feature breadth.

---

# 14. Architecture Lock

This roadmap locks the execution order for KAERVAX.

Future documents and implementation may refine phase details, but MUST NOT bypass the fundamental sequence:

> **Validate → Build Foundation → Establish Business Truth → Connect Demand → Enable Safe Commercial Action → Verify Transaction → Deliver → Learn → Prove → Expand.**

**Next:** implementation master prompt / execution contract derived from documents `01–12`.
