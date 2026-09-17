# KAERVAX — MVP Scope

**Status:** FOUNDATION / BUILD-GATED  
**Document:** 05_MVP_SCOPE.md  
**Depends on:** Brand Architecture, Naming System, Business Architecture, Product Architecture

## 1. MVP Objective

The KAERVAX MVP exists to prove one thing:

> Can KAERVAX help an operator move from real observed demand to a real paid transaction and recorded outcome with materially less operational friction?

The MVP is therefore an **end-to-end commercial loop**, not a miniature version of the future platform.

## 2. MVP North-Star Loop

```text
CAPTURE DEMAND
      ↓
STRUCTURE + QUALIFY
      ↓
SELECT OPPORTUNITY
      ↓
CREATE OFFER
      ↓
PREPARE / EXECUTE ACTION
      ↓
CONVERSATION
      ↓
PAYMENT
      ↓
DELIVERY
      ↓
OUTCOME + LEARNING
      └────────────→ NEXT DEMAND
```

The MVP is successful only when this loop can be exercised with real market activity.

## 3. MVP Strategy

### Build the smallest useful operator system

The first version should optimize for:

- speed to first real transaction;
- evidence quality;
- operator control;
- traceability;
- low integration risk;
- easy provider replacement;
- learning from real outcomes.

### Hybrid is allowed

The MVP may combine:

- software;
- manual research;
- AI workers;
- Make.com workflows;
- approved APIs;
- human-operated browser workflows;
- payment-provider workflows.

A workflow does not need to be fully automated to validate the business.

## 4. MVP User

Primary user:

**Operator / Owner**

The MVP is not designed around a large multi-user organization.

Secondary participants:
- prospective buyer;
- paying customer;
- external connector/provider;
- AI worker.

## 5. MVP Core Capabilities

### M1 — Demand Capture

Operator can create or import a demand record containing:

- source;
- original reference/evidence;
- captured time;
- problem/request;
- requested outcome;
- buyer context when known;
- urgency/budget signals when available.

Manual entry is valid for MVP.

### M2 — Demand Qualification

The system converts a raw demand into a structured record and exposes the reasoning/evidence behind qualification.

Minimum qualification dimensions:

- demand clarity;
- buyer clarity;
- urgency;
- commercial fit;
- delivery feasibility;
- repeatability potential.

The score is decision support, not an autonomous decision.

### M3 — Opportunity Selection

Operator can:

- view qualified opportunities;
- inspect evidence;
- compare relevant signals;
- approve an opportunity;
- reject/archive an opportunity;
- define the next action.

### M4 — Offer Creation

For an approved opportunity, the MVP can create a structured offer containing:

- problem addressed;
- deliverables;
- exclusions;
- turnaround;
- price or pricing rule;
- CTA;
- payment route.

AI may draft the offer; operator owns the final decision.

### M5 — Action Preparation

The MVP can turn an offer into an actionable step such as:

- response draft;
- outreach draft;
- application draft;
- landing/checkout copy;
- follow-up task;
- payment request.

External sending/publishing remains approval-gated by default.

### M6 — Transaction Tracking

The MVP must record whether an offer results in:

- no response;
- conversation;
- payment requested;
- paid;
- failed;
- refunded.

Where available, payment-provider references must be linked to the originating offer.

### M7 — Delivery Tracking

After payment or approved commercial commitment, the operator can record:

- delivery scope;
- delivery status;
- completion evidence;
- delivery time;
- issues;
- completion date.

### M8 — Learning Capture

The operator can record why an opportunity/offer succeeded or failed.

Examples:
- buyer need was strong;
- price objection;
- wrong target;
- slow response;
- delivery too complex;
- repeat demand detected;
- referral generated.

The learning record must remain connected to the originating opportunity and transaction when applicable.

## 6. MVP Minimum Data Model

The MVP should implement only the objects required for the commercial loop:

```text
DemandSignal
Opportunity
Offer
Action
Conversation/Lead
Transaction
Delivery
Learning
Source
Connector
AuditEvent
```

A separate object should not be created merely for theoretical future flexibility.

## 7. MVP Status Model

### DemandSignal

`captured → reviewed → qualified → rejected/archived`

### Opportunity

`new → shortlisted → approved → active → won/lost`

### Offer

`draft → approved → sent/published → accepted/rejected/expired`

### Action

`draft → awaiting_approval → approved → executing → completed/failed`

### Transaction

`pending → paid → failed/refunded`

### Delivery

`not_started → in_progress → delivered → accepted/issue`

### Learning

`captured → reviewed → incorporated`

Exact implementation may simplify states if the chosen MVP workflow requires it, but lifecycle transitions must remain auditable.

## 8. MVP Operator Flow

### Step 1 — Capture

Operator submits a real demand signal.

### Step 2 — Inspect

KAERVAX extracts the problem, buyer context, urgency, outcome, and evidence.

### Step 3 — Decide

KAERVAX proposes qualification and score dimensions. Operator decides whether to pursue.

### Step 4 — Offer

KAERVAX drafts a concrete commercial offer. Operator edits and approves it.

### Step 5 — Act

KAERVAX prepares the response/outreach/payment path. Operator approves consequential external action.

### Step 6 — Convert

The system records conversation and payment status.

### Step 7 — Deliver

Operator performs or coordinates fulfillment and records evidence.

### Step 8 — Learn

Outcome is captured and connected to the original demand.

## 9. First MVP Interface

The MVP may use a compact operator console with these surfaces:

1. **Inbox** — incoming demand.
2. **Opportunities** — qualified and prioritized opportunities.
3. **Offer** — offer drafting and approval.
4. **Actions** — pending and completed actions.
5. **Transactions** — payment and commercial state.
6. **Delivery** — fulfillment tracking.
7. **Learning** — outcome observations.

No separate dashboard is mandatory.

## 10. MVP Connector Policy

Connectors are infrastructure adapters.

Initial architecture should allow a connector to provide:

- source ingestion;
- search/retrieval;
- publishing/messaging;
- payment event retrieval;
- other bounded external actions.

The MVP may begin with manual or semi-manual connectors.

The internal product must not encode business logic directly around a single vendor when avoidable.

Conceptual contract:

```text
Connector
├── identity
├── capabilities
├── input schema
├── output schema
├── authentication reference
├── rate/usage limits
├── execution result
└── error model
```

## 11. MVP AI Worker Policy

AI is used where it reduces operator effort, especially for:

- extraction;
- classification;
- summarization;
- qualification assistance;
- offer drafting;
- message drafting;
- analysis;
- learning synthesis.

AI output is not automatically business truth.

The MVP should store enough provenance to answer:

> What source or instruction produced this recommendation?

## 12. Real Transaction Requirement

The MVP must be capable of reaching a real payment flow.

For the first experiment, manual fulfillment is acceptable.

The following are **not** sufficient as validation by themselves:

- fake checkout;
- simulated payment;
- demo-only lead records;
- generated opportunities with no market evidence;
- UI completeness;
- successful AI generation without customer response.

The system should make a real transaction observable from:

`Demand → Opportunity → Offer → Transaction → Delivery → Outcome`.

## 13. MVP Non-Goals

Explicitly out of scope for the first MVP:

- multi-tenant SaaS architecture;
- universal social-platform coverage;
- full autonomous outbound agent;
- mass unsolicited messaging;
- full CRM replacement;
- full accounting/ERP;
- advanced BI/data warehouse;
- complex team permissions;
- custom model training;
- marketplace creation;
- generalized workflow builder;
- complete voice-control platform;
- fully automated fulfillment;
- large-scale scraping infrastructure.

These may become later capabilities only after evidence supports them.

## 14. MVP Guardrails

1. **No spam automation.** External communication must respect platform rules and applicable law.
2. **No hidden autonomous action.** Consequential actions require operator approval by default.
3. **No credential leakage.** Secrets are referenced through controlled configuration, not embedded in business records or prompts.
4. **No vendor lock-in by domain model.** External providers remain adapters.
5. **No unsupported inference presented as fact.** AI-generated qualification must distinguish evidence from inference.
6. **No feature expansion without evidence.** New scope requires a business reason.
7. **No fake validation.** Demo success is not commercial success.

## 15. MVP Acceptance Criteria

The MVP is ready for a real-world pilot when all of the following are true:

### A. Demand
- A real demand can be captured.
- Source/evidence is preserved.
- Demand can be converted into a structured record.

### B. Opportunity
- An opportunity can be created from demand.
- Qualification dimensions are visible.
- Operator can approve/reject.

### C. Offer
- An approved opportunity can produce an offer.
- Operator can edit and approve the offer.

### D. Action
- The system can produce a concrete next action.
- Consequential external actions have an approval gate.
- Execution result is recorded.

### E. Transaction
- A real payment path can be initiated.
- Payment status can be recorded.
- Transaction is linked to the offer/opportunity.

### F. Delivery
- A paid/approved job can enter delivery.
- Completion evidence can be recorded.

### G. Learning
- Outcome can be recorded.
- Learning is linked back to the commercial loop.

### H. Traceability

An operator can trace one real case end-to-end:

`source → demand → opportunity → offer → action → transaction → delivery → learning`.

## 16. MVP Success Metrics

Primary:

- qualified opportunities;
- offers sent;
- conversations started;
- paid transactions;
- revenue;
- delivery completion;
- repeat/referral signals.

Secondary:

- time from demand capture to offer;
- operator minutes per opportunity;
- offer acceptance rate;
- delivery turnaround;
- failure reasons.

Do not optimize for:

- number of AI calls;
- number of screens;
- number of integrations;
- lines of code;
- automation percentage.

## 17. Build Gate

Before implementation begins, the team must be able to answer:

1. What exact commercial workflow is being tested?
2. Where will the first real demand come from?
3. What offer will be sold?
4. Who can buy it?
5. How will payment occur?
6. How will delivery occur?
7. What evidence proves success or failure?

If these answers are unknown, implementation should pause and return to demand validation.

## 18. Phase Boundary

### MVP Phase 1 — Prove the Loop

Build only what is necessary to capture, qualify, offer, act, transact, deliver, and learn.

### Later Expansion

Only after evidence:

- more demand sources;
- deeper connector automation;
- voice operator;
- reusable offer templates;
- productized services;
- advanced opportunity scoring;
- multi-user/team controls;
- vertical products;
- broader SaaS/platform capabilities.

## 19. Definition of Done

The KAERVAX MVP is **not done when the application looks complete**.

It is done when the operator can run at least one real commercial case through the complete traceable loop and the system captures enough evidence to decide what should be improved, repeated, or stopped.

## 20. Next Architecture Step

With MVP scope locked, the next document should translate this product boundary into implementation structure:

**`06_SYSTEM_ARCHITECTURE.md`**

That document should define application boundaries, runtime components, storage, APIs, workers, connector interfaces, authentication, event flow, observability, and deployment without expanding MVP scope.
