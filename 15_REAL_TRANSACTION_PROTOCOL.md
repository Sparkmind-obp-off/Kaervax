# KAERVAX — Real Transaction Protocol

**Status:** Production Control  
**Purpose:** Define the minimum conditions, controls, states, evidence, and responsibilities required for a genuine customer transaction.

## 1. Objective

This protocol distinguishes technical testing from a real commercial transaction.

A real transaction requires a real customer, real commercial terms, a real order, a real payment path, authoritative payment verification, accountable fulfillment, and reconciliation.

## 2. Transaction Classes

### A. Synthetic Test
No real customer or money. Used for development.

### B. Payment Integration Test
Uses provider sandbox/test mode or equivalent. Validates integration mechanics only.

### C. Controlled Real Transaction
A real customer voluntarily purchases a real offer using the authorized production payment path. This is the first valid commercial evidence class.

### D. Repeat Commercial Transaction
A subsequent independent transaction demonstrating that the loop can operate beyond the first proof.

Only classes C and D count as real-money commercial evidence.

## 3. Pre-Transaction Gate

Before accepting a real payment:

```text
[ ] offer approved
[ ] price/currency confirmed
[ ] scope and exclusions clear
[ ] delivery owner assigned
[ ] customer communication path ready
[ ] checkout tested
[ ] production/test payment mode explicitly verified
[ ] payment verification path tested
[ ] transaction persistence tested
[ ] refund/cancellation process known
[ ] evidence capture ready
```

## 4. Execution

```text
CUSTOMER DISCOVERS OFFER
→ CUSTOMER CHOOSES
→ CHECKOUT CREATED
→ PAYMENT INITIATED
→ PAYMENT PROVIDER PROCESSING
→ AUTHORITATIVE STATUS RECEIVED
→ KAERVAX VERIFIES
→ TRANSACTION MARKED PAID
→ FULFILLMENT AUTHORIZED
→ DELIVERY
→ CUSTOMER OUTCOME
→ RECONCILIATION
→ LEARNING
```

## 5. No False Positive

Never classify a transaction as paid from UI state, redirect, client callback, AI output, screenshot, or operator assumption alone.

## 6. Evidence Minimum

Preserve references for:

- customer/order;
- offer version;
- internal transaction ID;
- payment provider reference;
- amount/currency;
- authoritative payment status;
- timestamps;
- delivery evidence;
- customer outcome;
- reconciliation result.

Do not preserve credentials or unnecessary sensitive data as evidence.

## 7. Exception Handling

Any mismatch moves the transaction to review rather than silently resolving it.

Examples:

- amount mismatch;
- unknown provider reference;
- duplicate callback;
- delayed provider status;
- payment failure;
- refund mismatch;
- delivery issue.

## 8. Commercial Proof Gate

The first transaction is accepted as proof only after payment, fulfillment, outcome, and reconciliation are all reviewed.

## 9. Required Report

```text
TRANSACTION ID:
OFFER:
CUSTOMER REFERENCE:
PAYMENT PROVIDER:
PAYMENT MODE:
AMOUNT/CURRENCY:
PAYMENT STATUS:
PAYMENT VERIFIED AT:
DELIVERY STATUS:
CUSTOMER OUTCOME:
RECONCILIATION:
EXCEPTIONS:
EVIDENCE REFERENCES:
REVIEWED BY:
REVIEW DATE:
```

## 10. Rule

> **A real transaction creates a real obligation. Treat every paid order as an operational responsibility, not as a demo success counter.**
