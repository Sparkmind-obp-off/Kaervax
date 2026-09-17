# KAERVAX — Core Commercial Loop

**Status:** Production Business Contract  
**Purpose:** Define the real-money commercial loop that KAERVAX must operate and prove.  
**Scope:** Traffic/Demand → Intelligence → Opportunity → Offer → Customer Journey → Checkout → Duitku Payment → Reconciliation → Delivery → Outcome → Learning

---

## 1. PURPOSE

KAERVAX is not considered commercially proven because an application can be opened, a form can be submitted, or a demo checkout can be completed.

The commercial proof must be a real customer journey ending in a **real transaction using the production payment path**, followed by accountable fulfillment and reconciliation.

The core loop is:

```text
TRAFFIC / DEMAND
      ↓
DEMAND SIGNAL
      ↓
INTELLIGENCE
      ↓
OPPORTUNITY
      ↓
OFFER
      ↓
CUSTOMER JOURNEY
      ↓
CHECKOUT
      ↓
DUITKU PAYMENT
      ↓
VERIFIED TRANSACTION
      ↓
CUSTOMER / ORDER RECORD
      ↓
DELIVERY / FULFILLMENT
      ↓
CUSTOMER OUTCOME
      ↓
RECONCILIATION
      ↓
LEARNING
      ↺ NEXT DEMAND
```

This document defines the business contract. Technical implementation remains governed by documents `04–13`.

---

# 2. COMMERCIAL PRINCIPLE

The unit of proof is not a feature.

The unit of proof is:

> **A real person or organization encounters a real offer, voluntarily initiates a real purchase, completes a real payment through the authorized payment path, receives the promised service/product, and the business can reconcile and evidence the entire lifecycle.**

A synthetic transaction may test software behavior, but it cannot be counted as market validation.

---

# 3. COMMERCIAL OBJECTIVE

The first commercial milestone is:

```text
1 real demand
→ 1 real offer
→ 1 real customer interaction
→ 1 real payment
→ 1 verified transaction
→ 1 accountable delivery
→ 1 recorded outcome
→ 1 learning cycle
```

The objective is **not** to maximize transaction volume during the first proof.

The objective is to establish a trustworthy end-to-end operating capability.

---

# 4. TRAFFIC / DEMAND LAYER

Traffic is any legitimate path through which a potential buyer can discover or express a problem, need, intent, or request relevant to the business.

Possible sources include:

- social content;
- community requests;
- search;
- referrals;
- direct outreach where permitted;
- existing relationships;
- landing pages;
- marketplace demand;
- inbound messages.

Every commercially useful demand signal should preserve provenance:

```text
source
observed_at
external_reference (if available)
original_context
captured_by
```

Do not represent inferred demand as observed demand.

---

# 5. DEMAND INTELLIGENCE

The system converts raw demand into structured information.

Minimum questions:

- What problem is being expressed?
- Who appears to have the problem?
- What outcome is requested?
- What urgency is visible?
- What evidence supports the interpretation?
- Is the request within the current service/product scope?
- What uncertainty remains?

Evidence classification:

```text
OBSERVED
INFERRED
GENERATED
VERIFIED
```

AI may assist interpretation, but the original evidence remains preserved.

---

# 6. OPPORTUNITY

A DemandSignal becomes an Opportunity only when the operator/system has enough evidence to define a commercially actionable problem.

Minimum Opportunity information:

- problem;
- customer/buyer context;
- desired outcome;
- evidence;
- proposed solution class;
- estimated effort/cost;
- commercial hypothesis;
- risks/constraints;
- status;
- approval owner.

An Opportunity is not automatically an Offer.

---

# 7. OFFER

An Offer is a customer-facing commercial proposition.

Minimum Offer contract:

```text
offer_id
product_or_service
customer_problem
promised_outcome
scope
exclusions
price
currency
payment_terms
delivery_terms
validity
support/contact path
refund/cancellation terms where applicable
version
approval status
```

No customer-facing offer should make promises that the operator cannot reasonably fulfill.

Pricing must be explicit before payment.

---

# 8. CUSTOMER JOURNEY

The customer journey should be intentionally short and understandable.

Reference flow:

```text
DISCOVER
 ↓
UNDERSTAND
 ↓
TRUST
 ↓
CHOOSE
 ↓
CHECKOUT
 ↓
PAY
 ↓
CONFIRMATION
 ↓
DELIVERY
 ↓
SUPPORT
 ↓
OUTCOME
```

At each step, the customer must know what happens next.

The system must avoid misleading status, hidden pricing, ambiguous promises, or confusing payment state.

---

# 9. CHECKOUT CONTRACT

Checkout must establish an unambiguous commercial intent before payment.

Minimum checkout information:

- offer reference;
- buyer identity/contact information appropriate to the transaction;
- item/service;
- quantity where applicable;
- price;
- currency;
- total payable;
- applicable terms;
- order/reference ID;
- payment status.

The customer must not be told that payment succeeded merely because checkout was created.

---

# 10. DUITKU PAYMENT CONTRACT

Duitku is treated as the payment execution/provider boundary for the first real-money proof where the configured production integration is authorized for that transaction.

KAERVAX owns:

- internal transaction ID;
- order/reference mapping;
- offer linkage;
- expected amount;
- expected currency;
- transaction lifecycle;
- reconciliation record;
- audit trail.

Duitku owns/provides authoritative payment-processing records and provider-side transaction state.

The implementation must reconcile provider evidence against the KAERVAX transaction.

Reference rule:

```text
Checkout Created
≠
Payment Pending
≠
Payment Paid
≠
Delivery Authorized
```

A transaction becomes `PAID` only after authoritative payment evidence is verified according to the payment integration contract.

---

# 11. MONEY STATE MACHINE

Minimum state machine:

```text
CREATED
  ↓
PENDING
  ├──→ PAID
  ├──→ FAILED
  └──→ EXPIRED / CANCELLED (where applicable)

PAID
  ↓
FULFILLMENT AUTHORIZED
  ↓
DELIVERED
  ↓
ACCEPTED / ISSUE

PAID
  ↓
REFUND REQUESTED (where applicable)
  ↓
REFUNDED
```

Never collapse these states into a single boolean such as `success=true`.

---

# 12. TRANSACTION RESPONSIBILITY

A real transaction creates an operational responsibility.

Once payment is verified, the system must know:

- what the customer purchased;
- what was promised;
- who is responsible for delivery;
- what deadline or milestone applies;
- what evidence confirms delivery;
- how the customer can raise an issue;
- how refund/cancellation handling works when applicable;
- how the transaction is reconciled.

The business cannot treat payment receipt as the end of the workflow.

Payment starts the fulfillment obligation.

---

# 13. DELIVERY CONTRACT

Every paid transaction must map to a Delivery record or equivalent fulfillment record.

Minimum fields:

```text
delivery_id
transaction_id
offer_version
responsible_operator
status
milestones
due_at
delivered_at
customer_acceptance / issue
deliverable_reference
audit_reference
```

Delivery status should be explicit:

```text
NOT_STARTED
IN_PROGRESS
DELIVERED
ACCEPTED
ISSUE
CANCELLED
```

Do not mark delivery complete without evidence appropriate to the offer.

---

# 14. CUSTOMER SUPPORT / ISSUE PATH

A real business needs a path for customers who experience a problem.

At minimum:

```text
CUSTOMER ISSUE
→ IDENTIFY TRANSACTION
→ CLASSIFY ISSUE
→ ASSIGN OWNER
→ RESOLVE / REFUND / REMEDIATE
→ RECORD OUTCOME
```

The MVP does not need a sophisticated support platform.

It does need a known human-operable path.

---

# 15. REFUND / CANCELLATION PRINCIPLE

Refund and cancellation behavior must be defined before relying on a real-money workflow.

The exact policy depends on the product/service and applicable law/terms.

The implementation must never silently mark a transaction as refunded because an operator intended to refund it.

Record:

- reason;
- requested_at;
- authorized_by;
- provider action/reference;
- verified result;
- final state;
- customer communication evidence where appropriate.

---

# 16. RECONCILIATION

Reconciliation answers:

> “Does our internal transaction truth match the authoritative payment evidence and fulfillment state?”

Minimum reconciliation dimensions:

```text
internal_order_id
internal_transaction_id
provider_reference
expected_amount
observed_amount
currency
payment_state
provider_timestamp
internal_timestamp
fulfillment_state
reconciliation_state
exception
```

Possible reconciliation states:

```text
MATCHED
PENDING_REVIEW
MISMATCH
MISSING_PROVIDER_EVIDENCE
DUPLICATE
REFUND_MISMATCH
```

Exceptions must not be hidden.

---

# 17. EVIDENCE CHAIN

A real transaction should generate a traceable evidence chain:

```text
Demand Evidence
→ Opportunity Decision
→ Approved Offer
→ Customer Intent
→ Checkout / Order Reference
→ Provider Payment Evidence
→ Internal Transaction
→ Delivery Evidence
→ Customer Outcome
→ Reconciliation
→ Learning
```

Evidence should be timestamped and linked to stable internal IDs where practical.

Do not store secrets as evidence.

---

# 18. COMMERCIAL FUNNEL METRICS

The first implementation should measure only metrics that help understand the real loop.

Minimum funnel:

```text
Traffic / Demand
→ Qualified Demand
→ Opportunities
→ Offers
→ Checkout Starts
→ Payment Attempts
→ Verified Paid
→ Delivered
→ Accepted
→ Repeat / Referral / Next Opportunity
```

Useful rates can include:

- demand-to-qualified;
- qualified-to-opportunity;
- opportunity-to-offer;
- offer-to-checkout;
- checkout-to-paid;
- paid-to-delivered;
- delivered-to-accepted.

Do not optimize a funnel before there is enough real evidence to interpret it.

---

# 19. FIRST TRANSACTION RULE

The first real transaction is a controlled production experiment.

Before allowing it, verify:

```text
[ ] Offer is real
[ ] Price is real
[ ] Customer is real
[ ] Checkout is real
[ ] Duitku production/test mode is explicitly identified
[ ] Payment state verification is implemented
[ ] Delivery responsibility is assigned
[ ] Customer contact/support path exists
[ ] Refund/cancellation handling is known
[ ] Transaction evidence can be preserved
[ ] Reconciliation can be performed
```

A test-mode transaction may validate integration mechanics but does not count as the first market transaction.

---

# 20. REAL TRANSACTION ACCEPTANCE TEST

The first commercial proof passes only when all of these are true:

```text
REAL DEMAND
AND
REAL CUSTOMER
AND
REAL OFFER
AND
REAL PAYMENT
AND
AUTHORITATIVE PAYMENT VERIFICATION
AND
INTERNAL TRANSACTION RECORD
AND
ACCOUNTABLE DELIVERY
AND
CUSTOMER OUTCOME
AND
RECONCILIATION
AND
EVIDENCE PRESERVED
```

If any required element is missing, classify the result as a partial technical/business test rather than full commercial proof.

---

# 21. OPERATOR RESPONSIBILITY

The platform can automate records and workflows, but business responsibility cannot be delegated blindly to an AI agent.

For consequential decisions, the operator remains the accountable authority unless a later governance contract explicitly defines another authorized role.

The system should make responsibility visible:

```text
WHO PROPOSED?
WHO APPROVED?
WHO EXECUTED?
WHO VERIFIED?
WHO DELIVERS?
WHO RESOLVES ISSUES?
```

---

# 22. COMMERCIAL DATA OWNERSHIP

KAERVAX must retain canonical business records needed to operate the commercial loop.

External services may process parts of the workflow, but the business must remain portable.

A provider outage must not erase:

- customer/order linkage;
- offer history;
- transaction history;
- delivery status;
- learning;
- audit records.

---

# 23. AI BOUNDARY IN THE COMMERCIAL LOOP

AI may help:

- discover demand;
- structure demand;
- qualify;
- draft offers;
- summarize conversations;
- prepare actions;
- identify anomalies;
- generate learning hypotheses.

AI must not independently fabricate:

- payment confirmation;
- delivery completion;
- customer acceptance;
- refund completion;
- provider authorization.

Authoritative evidence must come from the appropriate system/person.

---

# 24. PRODUCTION READINESS PRINCIPLE

Production-ready does not mean “all possible features exist.”

For the first commercial loop, production readiness means the business can safely:

1. receive a real demand;
2. make a real offer;
3. accept a real order/payment;
4. verify the payment;
5. fulfill the promise;
6. support the customer;
7. handle exceptions;
8. reconcile the money;
9. preserve evidence;
10. learn from the outcome.

---

# 25. STOP CONDITIONS

Do not move to broader traffic or automation if:

- payment verification is unreliable;
- transaction state is ambiguous;
- customer responsibility is undefined;
- delivery cannot be tracked;
- refund/cancellation path is unknown;
- secrets are exposed;
- audit evidence is missing;
- provider responses are treated as trusted without validation;
- the business cannot reconcile the transaction.

Fix the weakest commercial control first.

---

# 26. DEFINITION OF COMMERCIAL PROOF

KAERVAX earns the label **Commercially Proven — Initial Transaction** only after one real transaction completes the defined loop and its evidence has been reviewed.

This status must never be granted because of:

- a demo;
- seeded data;
- mock payment;
- fake customer;
- internal test purchase;
- AI-generated demand;
- screenshots without authoritative records.

---

# 27. NEXT DOCUMENTS / IMPLEMENTATION SET

This contract should be implemented alongside the following commercial controls:

```text
15_REAL_TRANSACTION_PROTOCOL.md
16_CUSTOMER_JOURNEY_AND_FUNNEL.md
17_COMMERCIAL_RESPONSIBILITY_AND_OPERATIONS.md
18_PAYMENT_RECONCILIATION_REFUND_CONTRACT.md
19_COMMERCIAL_EVIDENCE_ARCHITECTURE.md
20_FIRST_TRANSACTION_RUNBOOK.md
```

Together they define the operational layer between the KAERVAX product architecture and the first real-money proof.

---

# 28. FINAL RULE

> **KAERVAX is not proven when the software works. KAERVAX is proven when the commercial loop works, the money is real, the customer is real, the promise is fulfilled, the records reconcile, and the evidence can withstand review.**
