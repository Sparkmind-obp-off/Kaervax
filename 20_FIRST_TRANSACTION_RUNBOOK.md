# KAERVAX — First Real Transaction Runbook

**Status:** Controlled Production Runbook  
**Objective:** Execute and verify the first genuine commercial transaction end-to-end.

## 1. Principle

The first transaction is a controlled production experiment and an operational commitment.

Do not optimize for speed at the expense of payment correctness, customer clarity, fulfillment, or evidence.

## 2. PRE-FLIGHT

### Business

```text
[ ] real offer approved
[ ] real customer/problem identified
[ ] price and currency confirmed
[ ] scope/exclusions confirmed
[ ] delivery promise realistic
[ ] support path available
[ ] cancellation/refund terms known
```

### Technical

```text
[ ] production deployment identified
[ ] database healthy
[ ] transaction creation works
[ ] checkout works
[ ] payment callback/webhook path verified
[ ] provider reference mapping works
[ ] idempotency protection exists
[ ] logs are redacted
[ ] audit events work
[ ] backups/recovery expectations understood
```

### Payment

```text
[ ] Duitku account/integration is authorized for intended use
[ ] payment mode explicitly confirmed
[ ] production vs sandbox/test mode is unambiguous
[ ] expected amount/currency verified
[ ] authoritative verification path verified
[ ] refund path understood
```

## 3. CUSTOMER FLOW

```text
1. Customer receives/opens approved offer.
2. Customer reviews scope, price, and terms.
3. Customer initiates checkout.
4. KAERVAX creates internal order/transaction reference.
5. Customer proceeds through Duitku payment flow.
6. Provider processes payment.
7. KAERVAX receives provider result/callback.
8. Server verifies authoritative payment evidence.
9. Transaction becomes PAID only after verification.
10. Customer receives clear confirmation.
11. Fulfillment begins.
12. Delivery is recorded.
13. Customer outcome/acceptance is recorded.
14. Reconciliation is performed.
15. Commercial learning is captured.
```

## 4. OPERATOR CHECKPOINTS

### Checkpoint A — Before Payment

Confirm the customer knows:

- what they are buying;
- the total price;
- expected delivery;
- applicable terms;
- how to get help.

### Checkpoint B — After Payment Attempt

Do not assume payment succeeded.

Verify through the authoritative provider path.

### Checkpoint C — Before Fulfillment

Confirm:

```text
transaction = PAID
payment evidence = VERIFIED
order/offer linkage = MATCHED
```

### Checkpoint D — After Delivery

Record delivery evidence and customer outcome.

### Checkpoint E — Reconciliation

Confirm internal and provider records match or explicitly record an exception.

## 5. FAILURE PLAYBOOK

### Payment Pending

Do not deliver paid-only service unless business policy explicitly permits it. Monitor/reconcile.

### Payment Failed

Keep transaction failed/pending as appropriate. Do not claim success.

### Provider Callback Duplicate

Idempotently ignore/reconcile the duplicate.

### Amount Mismatch

Move to review. Do not fulfill or mark paid solely on assumption.

### Payment Verified but Delivery Fails

Open an operational issue and follow the defined remediation/refund policy.

### Refund Initiated

Do not mark refunded until the provider result is verified.

## 6. FIRST-TRANSACTION EVIDENCE PACK

Collect references for:

```text
Demand
Opportunity
Offer + version
Customer/order
Checkout
Internal transaction
Duitku/provider reference
Authoritative payment verification
Delivery
Customer outcome
Reconciliation
Exceptions
```

Never include secrets in the evidence pack.

## 7. POST-TRANSACTION REVIEW

Within the first review cycle, answer:

- Did the customer understand the offer?
- Did checkout work?
- Did payment verification work?
- Did the transaction reconcile?
- Was fulfillment completed as promised?
- Did the customer report an issue?
- What failed or was manual?
- What evidence is missing?
- What should be fixed before the next transaction?

## 8. PROOF STATUS

Use one of:

```text
NOT_STARTED
TECHNICAL_TEST_ONLY
REAL_TRANSACTION_IN_PROGRESS
REAL_TRANSACTION_COMPLETED_PENDING_REVIEW
COMMERCIAL_PROOF_VERIFIED
```

`COMMERCIAL_PROOF_VERIFIED` requires completion of the full evidence chain and review.

## 9. NO-GO CONDITIONS

Stop before taking real money if:

- production/test payment mode is unclear;
- payment verification is not authoritative;
- the customer cannot understand what is being purchased;
- fulfillment responsibility is undefined;
- support path is unavailable;
- transaction state cannot be reconciled;
- secrets are exposed;
- critical audit evidence cannot be preserved.

## 10. FINAL CHECK

The run is complete only when:

```text
REAL CUSTOMER
+ REAL OFFER
+ REAL PAYMENT
+ VERIFIED PAYMENT
+ REAL DELIVERY
+ CUSTOMER OUTCOME
+ RECONCILIATION
+ EVIDENCE REVIEW
```

All must be true for the first commercial proof.

## 11. Rule

> **Do not celebrate the payment notification. Close the loop: verify the money, fulfill the promise, reconcile the records, protect the customer, and capture the evidence.**
