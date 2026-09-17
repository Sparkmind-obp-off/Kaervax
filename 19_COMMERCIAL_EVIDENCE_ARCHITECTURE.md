# KAERVAX — Commercial Evidence Architecture

**Status:** Production Evidence Contract

## 1. Purpose

Evidence is the mechanism that distinguishes a working business system from a demo or simulated application.

KAERVAX must be able to reconstruct the lifecycle of a real commercial event without relying on memory or screenshots alone.

## 2. Evidence Chain

```text
DEMAND EVIDENCE
→ OPPORTUNITY DECISION
→ APPROVED OFFER
→ CUSTOMER INTENT
→ ORDER / CHECKOUT
→ PROVIDER PAYMENT EVIDENCE
→ VERIFIED TRANSACTION
→ DELIVERY EVIDENCE
→ CUSTOMER OUTCOME
→ RECONCILIATION
→ LEARNING
```

## 3. Evidence Classes

```text
OBSERVED   = directly captured from a source
INFERRED   = interpretation derived from evidence
GENERATED  = produced by AI/system
VERIFIED   = reviewed/confirmed by an authorized source/person
```

Do not relabel generated or inferred information as observed merely because it looks plausible.

## 4. Evidence Object

Where practical, record:

```text
evidence_id
object_type
object_id
source_type
source_reference
captured_at
captured_by
classification
integrity/reference metadata
```

## 5. Commercial Evidence Minimum

For the first real transaction, preserve enough evidence to answer:

1. Where did the demand come from?
2. What opportunity was selected and why?
3. Which offer/version was shown?
4. What did the customer purchase?
5. What amount/currency was expected?
6. Which provider reference identifies the payment?
7. What authoritative evidence verified payment?
8. What was delivered?
9. What was the customer outcome?
10. Did internal and provider records reconcile?

## 6. Evidence Integrity

Evidence should be append-oriented where practical. Do not silently overwrite historical commercial facts.

Corrections should produce an audit event describing what changed and why.

## 7. Sensitive Data

Evidence must not become a dumping ground for personal data, payment credentials, API keys, OAuth tokens, or unnecessary sensitive content.

Use references to secure systems where possible.

## 8. Evidence Review

Before declaring the first transaction commercially proven, an operator should review the chain for completeness and contradictions.

## 9. Evidence Status

```text
CAPTURED
REVIEWED
VERIFIED
CONTESTED
SUPERSEDED
REDACTED
```

## 10. Commercial Proof Record

The system should eventually support a compact proof record containing:

```text
commercial_proof_id
transaction_id
customer_reference
offer_reference
payment_reference
payment_verified_at
delivery_reference
outcome_reference
reconciliation_status
reviewed_by
reviewed_at
exceptions
```

## 11. Rule

> **Evidence must show what happened, where it came from, when it happened, and who/what verified it. A screenshot may support evidence; it is not automatically the evidence.**
