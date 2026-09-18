# KAERFAK — DOCUMENT GOVERNANCE & SINGLE SOURCE OF TRUTH

**Status:** CANONICAL / GOVERNANCE LOCK  
**Date:** September 2026  
**Repository:** `Sparkmind-obp-off/Kaervax`

## 1. Purpose

This document resolves the repository's accumulated architecture, business, naming, and implementation documents into one governance model.

The repository contains two historical layers:

- **Legacy foundation layer (01–25):** largely written under the former master-brand spelling **KAERVAX** and containing the original demand-first technical architecture.
- **Current business layer (26–36):** establishes **KAERFAK** as the current commercial master brand, with Runner OS beneath it.

Where the layers conflict, this document and the current 26–36 decisions prevail.

## 2. Canonical Master Brand

**KAERFAK** is the current approved master business brand.

**KAERVAX** is treated as the legacy/codename spelling in historical documents unless explicitly retained for a technical repository identifier.

The GitHub repository slug `Kaervax` is an infrastructure identifier and does not override the commercial brand decision.

No new naming exploration is authorized during execution.

## 3. Canonical Business Model

Kaerfak is a real commercial business built around:

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
KAERFAK
├── Products
│   └── Runner OS
├── Services
│   ├── Automation
│   ├── Integration
│   └── Digital Systems
└── Custom Systems
    └── High-Tier / Private Instances
```

Runner OS is a Kaerfak product/system, not a second parent brand.

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

The approximately **70/30** operating split is a heuristic:
- 70% commercial/revenue/customer/sales/delivery;
- 30% product, experimentation, and custom/private work.

It is not a forecast or guaranteed allocation.

## 6. Canonical Technical Architecture

The technical architecture from the legacy foundation remains valid where compatible with the current business model:

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

Core principles remain:
- Kaerfak owns canonical business truth;
- external providers are replaceable adapters;
- consequential external actions are approval-gated;
- secrets never enter business records, prompts, or source control;
- provider responses are verified before becoming canonical state;
- commercial evidence must remain traceable.

## 7. Canonical MVP Strategy

The first commercial MVP is **not** a broad autonomous platform.

The first implementation target is the smallest system that can support one real commercial workflow.

Manual, semi-manual, Make.com, approved APIs, AI workers, and human browser workflows are valid during validation.

Software must not become a substitute for market validation.

## 8. Offer Decision

`21_OFFER_DESIGN_AND_COMMERCIAL_PACKAGING.md` defines the current first-offer hypothesis:

**Kaerfak Revenue Launch Sprint**

It is a fixed-scope productized service.

`22_PRICING_ARCHITECTURE.md` defines the current V1 pricing hypothesis:

**Rp1.500.000 / project, 100% upfront, fixed scope.**

This is a **validation hypothesis**, not a claim of market-standard pricing. It may change only through a documented commercial decision.

## 9. Payment Decision

The architecture remains provider-agnostic.

For the first controlled transaction, **Duitku** is the current payment-path implementation hypothesis where the required merchant/account authorization exists.

Therefore:

- `07_DATA_AND_CONNECTOR_ARCHITECTURE.md` remains authoritative for provider abstraction;
- `14`, `18`, `20`, and `22` may describe Duitku as the current first-transaction provider;
- Duitku must not become a hard-coded assumption for the whole platform.

## 10. Roadmap Decision

The effective roadmap is:

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

The shorter 35 phase-gate document is the operating summary; 12 is the detailed legacy roadmap. They are not competing roadmaps.

## 11. Document Precedence

When two documents disagree, apply this order:

```
37_DOCUMENT_GOVERNANCE_AND_SINGLE_SOURCE_OF_TRUTH.md
        ↓
26–36 Current Kaerfak Business Layer
        ↓
14–25 Commercial / UX / Sprint Layer
        ↓
01–13 Legacy Foundation / Technical Contracts
```

A later document is not automatically superior merely because its number is larger; precedence is determined by this governance contract.

## 12. Conflict Resolution Rules

### Brand conflict
**KAERFAK wins.** Historical KAERVAX references are legacy terminology.

### Product hierarchy conflict
**Kaerfak → Products / Services / Custom Systems → Runner OS** wins.

### Payment conflict
**Provider-agnostic architecture wins globally; Duitku is only the current first-transaction implementation hypothesis.**

### MVP conflict
**Sell and validate before scale** wins. Technical build must support the smallest commercial experiment.

### Pricing conflict
The current V1 price is a commercial hypothesis. It must not be treated as permanent or universal.

### AI autonomy conflict
Human approval remains required for consequential actions unless a later explicit policy grants narrower authority.

### Customer/private-system conflict
Private instances may exist, but they must not become the commercial dependency of Kaerfak.

## 13. Duplicate / Missing Document Resolution

- `docs/01_BRAND_ARCHITECTURE.md` duplicates the root brand architecture and is deprecated.
- The root `01_BRAND_ARCHITECTURE.md` remains the canonical historical foundation document, interpreted through this governance contract.
- The previously referenced but missing `04_PRODUCT_ARCHITECTURE.md` is now restored as the canonical product architecture.
- No additional parallel architecture documents should be created for the same concern.
- Existing 23-number collision is retained for historical continuity; governance, not filename numbering, determines precedence.

## 14. Implementation Rule

Before changing code, the implementation agent MUST:

1. read this governance document;
2. identify the current phase and gate;
3. inspect existing code before changing stack or structure;
4. preserve the canonical business hierarchy;
5. preserve security and approval boundaries;
6. avoid secrets;
7. implement the smallest justified scope;
8. test and report actual results;
9. stop if a new architecture conflict appears.

## 15. Immediate Execution State

The repository is now considered **documentation-reconciled enough to execute**.

The next work is not another architecture-writing cycle.

The next work is:

```
CURRENT REPO / CODE AUDIT
→ PHASE + GATE IDENTIFICATION
→ MINIMUM IMPLEMENTATION
→ TEST
→ DEPLOY / PILOT
→ REAL CUSTOMER VALIDATION
```

**Single source of truth:** this document governs conflicts across the repository.
