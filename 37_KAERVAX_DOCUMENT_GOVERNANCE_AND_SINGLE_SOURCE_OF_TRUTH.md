# KAERVAX — DOCUMENT GOVERNANCE & SINGLE SOURCE OF TRUTH

**Status:** CANONICAL / GOVERNANCE LOCK  
**Date:** September 2026  
**Repository:** `Sparkmind-obp-off/Kaervax`

## 1. Purpose
This document resolves the repository's accumulated architecture, business, naming, and implementation documents into one governance model.

The repository contains historical and current layers. The current canonical master brand is **KAERVAX**.

Where any document conflicts with this governance contract, this document governs the naming and architecture decisions below.

## 2. Canonical Master Brand

**KAERVAX** is the current approved and locked master business brand.

The GitHub repository slug `Kaervax` and the established domain identity are aligned with the master brand.

There is no active `Kaerfak` brand. Any remaining Kaerfak references are deprecated terminology and must not be introduced into new work.

No new naming exploration is authorized during execution unless a future explicit rebrand decision is made.

## 3. Canonical Business Model

Kaervax is a real commercial business built around:

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

The business may monetize through:
- productized services;
- implementation;
- automation/integration;
- digital systems;
- custom/high-tier systems;
- recurring support where real recurring value exists.

## 4. Canonical Product Hierarchy

```
KAERVAX
├── Products
│   └── Runner OS
├── Services
│   ├── Automation
│   ├── Integration
│   └── Digital Systems
└── Custom Systems
    └── High-Tier / Private Instances
```

Runner OS is a Kaervax product/system, not a second parent brand.

Private instances may be highly personalized but must remain isolated in data, identity, and configuration.

## 5. Canonical Commercial Priority

Execution priority is:
1. customer discovery and real demand;
2. clear sellable offer;
3. first transaction;
4. reliable delivery;
5. evidence;
6. repeatability;
7. productization/systemization;
8. broader automation.

The approximately **70/30** operating split remains a heuristic:
- 70% commercial/revenue/customer/sales/delivery;
- 30% product, experimentation, and custom/private work.

## 6. Canonical Technical Architecture

```
Web / Operator Interface
        ↓
Application / Domain Layer
        ↓
Canonical Business Data
        ↓
Workers + Connector Adapters
        ↓
Approval Gates
        ↓
External Actions / Payment
        ↓
Delivery + Outcome
        ↓
Learning
```

Core principles:
- Kaervax owns canonical business truth;
- external providers are replaceable adapters;
- consequential external actions are approval-gated;
- secrets never enter business records, prompts, or source control;
- provider responses are verified before becoming canonical state;
- commercial evidence must remain traceable.

## 7. Canonical MVP Strategy

The first commercial MVP is not a broad autonomous platform.

The first implementation target is the smallest system that can support one real commercial workflow.

Manual, semi-manual, Make.com, approved APIs, AI workers, and human browser workflows are valid during validation.

Software must not become a substitute for market validation.

## 8. Current Offer Hypothesis

`21_OFFER_DESIGN_AND_COMMERCIAL_PACKAGING.md` defines the current first-offer hypothesis.

`22_PRICING_ARCHITECTURE.md` defines the current V1 pricing hypothesis.

These remain hypotheses and may change only through a documented commercial decision.

## 9. Payment Decision

The architecture remains provider-agnostic.

For the first controlled transaction, Duitku is only a current payment-path implementation hypothesis where the required merchant/account authorization exists.

It must not become a hard-coded assumption for the whole platform.

## 10. Effective Roadmap

```
PHASE 0 — Validate / Operating Setup
PHASE 1 — Technical Foundation
PHASE 2 — Canonical Domain
PHASE 3 — Demand Intelligence
PHASE 4 — Opportunity + Offer
PHASE 5 — Safe Action + Connectors
PHASE 6 — Transaction
PHASE 7 — Delivery
PHASE 8 — Learning
PHASE 9 — Commercial Validation
PHASE 10 — Evidence-Based Expansion
```

## 11. Document Precedence

When two documents disagree, apply:

```
37_KAERVAX_DOCUMENT_GOVERNANCE_AND_SINGLE_SOURCE_OF_TRUTH.md
        ↓
26–36 Current Kaervax Business Layer
        ↓
14–25 Commercial / UX / Sprint Layer
        ↓
01–13 Foundation / Technical Layer
```

A document is not authoritative merely because its filename number is larger; this governance contract defines precedence.

## 12. Conflict Resolution Rules

### Brand
**KAERVAX wins.** Deprecated Kaerfak terminology must not be used in new work.

### Product hierarchy
**Kaervax → Products / Services / Custom Systems → Runner OS** wins.

### Payment
Provider-agnostic architecture wins globally; any named provider is an implementation hypothesis only.

### MVP
Sell and validate before scale.

### Pricing
Pricing is a commercial hypothesis, not a permanent universal fact.

### AI autonomy
Human approval remains required for consequential actions unless a later explicit policy grants narrower authority.

### Customer/private systems
Private instances may exist, but they must not become the commercial dependency of Kaervax.

## 13. Duplicate / Naming Cleanup

- The duplicate `docs/01_BRAND_ARCHITECTURE.md` has been removed.
- Root `01_BRAND_ARCHITECTURE.md` is the canonical historical foundation document and already uses KAERVAX.
- `04_PRODUCT_ARCHITECTURE.md` is the canonical product architecture.
- The former `KAERFAK` filenames in the 26–37 business/governance layer are renamed to `KAERVAX`.
- Existing 23-number collision is retained for historical continuity; governance determines precedence.
- No parallel architecture document should be created for the same concern.

## 14. Implementation Rule

Before changing code, the implementation agent MUST:
1. read this governance document;
2. identify the current phase and gate;
3. inspect existing code before changing stack or structure;
4. preserve the canonical Kaervax business hierarchy;
5. preserve security and approval boundaries;
6. avoid secrets;
7. implement the smallest justified scope;
8. test and report actual results;
9. stop if a new architecture conflict appears.

## 15. Immediate Execution State

The repository is documentation-reconciled enough to execute.

Next work:

```
CURRENT REPO / CODE AUDIT
→ PHASE + GATE IDENTIFICATION
→ MINIMUM IMPLEMENTATION
→ TEST
→ DEPLOY / PILOT
→ REAL CUSTOMER VALIDATION
```

**Single source of truth:** this document governs naming, hierarchy, and cross-document conflicts.
