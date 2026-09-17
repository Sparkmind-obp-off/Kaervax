# KAERVAX — Payment, Reconciliation & Refund Contract

**Status:** Production Financial Control

## 1. Purpose

Define how KAERVAX handles money-related state without confusing checkout, provider status, internal state, fulfillment, or refund.

## 2. Source of Truth

Duitku/provider-side evidence is authoritative for payment processing status, while KAERVAX remains the canonical owner of its internal transaction record and business linkage.

Never manufacture provider evidence.

## 3. Required Mapping

```text
KAERVAX Transaction ID
↕
KAERVAX Order/Reference
↕
Provider Reference
↕
Expected Amount + Currency
↕
Observed Provider Amount + Currency
```

## 4. Payment States

```text
CREATED
PENDING
PAID
FAILED
EXPIRED/CANCELLED
REFUND_PENDING
REFUNDED
REVIEW
```

Exact provider-specific states must be normalized without destroying the original provider status.

## 5. Verification

A payment is verified only when the server-side integration receives and validates authoritative provider evidence according to the payment connector implementation.

Validation should cover, as applicable:

- provider reference;
- internal order/reference;
- amount;
- currency;
- expected merchant/account context;
- signature/authentication mechanism;
- current transaction state;
- duplicate/replay handling.

## 6. Reconciliation

Run reconciliation after payment events and whenever a transaction enters an exception state.

```text
MATCHED
PENDING_REVIEW
MISMATCH
MISSING_PROVIDER_EVIDENCE
DUPLICATE
REFUND_MISMATCH
```

A mismatch must not silently become `PAID` or `REFUNDED`.

## 7. Refund

Refund handling must record:

```text
transaction_id
reason
requested_by
requested_at
authorization
provider_reference
provider_result
verified_at
final_state
customer_communication_reference
```

The exact commercial refund policy must be defined for the actual product/service before launch.

## 8. Fees and Net Amount

The system should preserve the distinction between:

- customer gross amount;
- payment-provider fees where known;
- refunds;
- adjustments;
- reconciled net amount.

Do not label gross payment volume as net business revenue.

## 9. Webhooks / Notifications

Provider callbacks must be authenticated/verified according to the provider integration requirements.

Duplicate callbacks must be safe.

Out-of-order events must not corrupt transaction state.

## 10. Manual Review

Manual reconciliation is an acceptable MVP control when automation is incomplete, provided the operator records the reason and evidence rather than editing state without trace.

## 11. Financial Evidence

Keep sufficient references to reproduce the transaction audit without storing secrets.

## 12. Rule

> **Money state must be evidence-driven, reversible where appropriate, and auditable from customer order to provider record to internal transaction to fulfillment.**
