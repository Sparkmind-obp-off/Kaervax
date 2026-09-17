# KAERVAX — Customer Journey & Commercial Funnel

**Status:** Production Business Contract

## 1. Purpose

Define the path from attention/demand to a completed, supported, and learned commercial transaction.

## 2. Journey

```text
DISCOVER
→ UNDERSTAND
→ TRUST
→ SELECT
→ CHECKOUT
→ PAY
→ CONFIRM
→ RECEIVE
→ USE / EXPERIENCE
→ SUPPORT
→ ACCEPT / ISSUE
→ NEXT ACTION
```

## 3. Funnel Objects

```text
Traffic / Demand
→ Qualified Demand
→ Opportunity
→ Approved Offer
→ Customer Interaction
→ Checkout
→ Payment Attempt
→ Verified Paid
→ Delivery
→ Accepted
→ Repeat / Referral / New Demand
```

## 4. Customer Transparency

At every commercial step, the customer should be able to understand:

- what is being offered;
- what it costs;
- what is included/excluded;
- how payment works;
- what payment status means;
- what happens after payment;
- when/how delivery occurs;
- how to request help;
- applicable cancellation/refund terms.

## 5. Funnel Instrumentation

Record meaningful transitions without unnecessary personal-data collection.

Minimum event concepts:

```text
DemandObserved
OfferViewed
OfferSelected
CheckoutStarted
PaymentInitiated
PaymentVerified
DeliveryStarted
DeliveryCompleted
CustomerAccepted
IssueRaised
RefundCompleted
OutcomeRecorded
```

## 6. Metrics

Initial metrics should include counts and rates for:

- qualified demand;
- opportunities;
- offers;
- checkout starts;
- payment attempts;
- verified payments;
- delivered orders;
- accepted orders;
- issues/refunds;
- repeat/referral signals.

Revenue reporting must distinguish gross payment activity from reconciled business revenue and applicable fees/refunds.

## 7. Optimization Rule

Do not optimize for clicks or checkout volume while ignoring failed payments, delivery problems, refunds, or customer outcomes.

The funnel is healthy only when downstream commercial obligations are handled correctly.

## 8. First-Transaction Instrumentation

The first real customer journey must be manually reviewable end-to-end. Automated analytics are helpful but cannot replace transaction evidence.

## 9. Privacy

Collect only data necessary for the commercial relationship, payment, fulfillment, support, compliance, and audit requirements applicable to the business.

## 10. Rule

> **Traffic is not revenue. Checkout is not payment. Payment is not fulfillment. Fulfillment is not outcome. The complete journey is the commercial unit.**
