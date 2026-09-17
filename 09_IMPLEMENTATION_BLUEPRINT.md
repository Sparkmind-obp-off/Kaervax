# KAERVAX — Implementation Blueprint

**Status:** Architecture Lock → Build-Ready
**Scope:** MVP implementation foundation
**Brand:** KAERVAX
**Repository:** `Sparkmind-obp-off/Kaervax`

---

## 1. Purpose

This document converts the KAERVAX business, product, system, data, connector, and security architecture into an implementation sequence that an engineering/coding agent can execute without redefining the architecture.

The implementation goal is deliberately narrow:

> **Build the smallest production-capable system that can move one real demand signal through opportunity, offer, action, transaction, delivery, and learning.**

The implementation is not allowed to expand into a generic SaaS platform before the commercial loop is proven.

---

## 2. Implementation Doctrine

The implementation MUST follow these priorities:

1. commercial loop;
2. canonical business data;
3. security and ownership;
4. traceability;
5. reliable execution;
6. provider replaceability;
7. development speed;
8. scalability only when evidence requires it.

The system should be boring where correctness matters and flexible where experimentation matters.

---

## 3. Target MVP Loop

```text
REAL DEMAND
   ↓
CAPTURE
   ↓
NORMALIZE
   ↓
QUALIFY
   ↓
OPPORTUNITY
   ↓
APPROVE
   ↓
OFFER
   ↓
ACTION
   ↓
CONVERSATION
   ↓
PAYMENT
   ↓
DELIVERY
   ↓
OUTCOME
   ↓
LEARNING
   ↺
NEXT DEMAND
```

A feature is justified when it materially helps this loop or protects it.

---

## 4. Recommended MVP Stack Shape

The architecture MUST remain provider-agnostic. Exact vendors may be selected during implementation according to availability, cost, and deployment constraints.

Recommended shape:

```text
Web / Mobile Browser
        ↓
Application API
        ↓
Domain Services
        ↓
Relational Database
        ↓
Worker / Job Runtime
        ↓
Connector Layer
   ↙    ↓     ↘
Search  AI   Payment / Automation
```

Supporting layers:

```text
Auth ───────────────┐
Secrets ────────────┤
Audit / Observability├── KAERVAX Core
Config ─────────────┤
Tests ──────────────┘
```

Do not introduce microservices merely for architectural appearance. A modular monolith is the preferred MVP starting point unless a concrete operational requirement proves otherwise.

---

## 5. Repository Structure

Target structure:

```text
/
├── app/
│   ├── ui/
│   └── routes/
├── api/
│   ├── demands/
│   ├── opportunities/
│   ├── offers/
│   ├── actions/
│   ├── transactions/
│   ├── deliveries/
│   └── learning/
├── domain/
│   ├── demand/
│   ├── opportunity/
│   ├── offer/
│   ├── action/
│   ├── transaction/
│   ├── delivery/
│   └── learning/
├── workers/
├── connectors/
│   ├── discovery/
│   ├── intelligence/
│   ├── action/
│   ├── transaction/
│   ├── storage/
│   └── automation/
├── db/
├── auth/
├── observability/
├── tests/
├── docs/
└── README.md
```

The exact framework/language can vary, but the domain boundaries MUST remain recognizable.

---

## 6. Build Order

Implementation MUST proceed in dependency order rather than UI-first order.

### Phase I — Foundation

Build:

- application bootstrap;
- environment configuration;
- database connection;
- migration system;
- structured logging;
- error model;
- authentication foundation;
- authorization middleware;
- audit infrastructure;
- secret references/config contract;
- test harness.

**Exit condition:** application can start safely in development and test environments with no production credentials.

### Phase II — Canonical Domain

Implement entities and lifecycle rules for:

1. Source;
2. DemandSignal;
3. Opportunity;
4. Offer;
5. Action;
6. Conversation/Lead;
7. Transaction;
8. Delivery;
9. Learning;
10. Connector;
11. ConnectorExecution;
12. AuditEvent.

Implement:

- internal IDs;
- relationships;
- status transitions;
- validation;
- timestamps;
- provenance/evidence metadata;
- soft archive where appropriate.

**Exit condition:** canonical business state can be created and transitioned without any external provider.

### Phase III — Demand Intake

Implement:

- manual demand capture;
- source metadata;
- raw evidence reference;
- normalization;
- deduplication;
- qualification fields;
- review queue.

Manual capture is intentionally first-class. The MVP must not depend on scraping or a platform API to prove the business model.

**Exit condition:** a real demand signal can be captured, reviewed, qualified, and converted into an opportunity.

### Phase IV — Opportunity & Offer

Implement:

- opportunity scoring/qualification rules;
- shortlist state;
- operator approval;
- offer drafting;
- offer versioning;
- offer approval;
- offer status tracking.

AI may assist with qualification and drafting, but canonical status is controlled by domain logic.

**Exit condition:** operator can select a real opportunity and produce an approved offer.

### Phase V — Action & Connector Execution

Implement:

- action proposals;
- approval gate;
- connector capability checks;
- execution records;
- idempotency keys;
- retries with bounded policy;
- normalized results;
- failure/partial/needs-review states.

Start with the smallest connector set required for one commercial workflow.

**Exit condition:** an approved action can execute through a real connector and produce a verified result.

### Phase VI — Transaction

Implement:

- transaction record;
- payment request/reference;
- provider reconciliation;
- webhook verification where available;
- paid/failed/refunded states;
- audit linkage.

Payment status MUST never be inferred solely from an AI response or client-side event.

**Exit condition:** a real buyer can pay and KAERVAX can reconcile the transaction.

### Phase VII — Delivery

Implement:

- delivery record;
- delivery status;
- deliverable/reference;
- customer acceptance or issue state;
- completion audit.

The delivery mechanism can remain manual in the first MVP.

**Exit condition:** the paid case reaches a traceable delivery outcome.

### Phase VIII — Learning

Implement:

- outcome capture;
- win/loss reason;
- demand quality feedback;
- offer feedback;
- connector/execution outcome;
- learning record;
- next-cycle reference.

**Exit condition:** the completed commercial case produces structured learning that can influence the next opportunity.

---

## 7. Domain Command Pattern

All consequential business operations SHOULD use explicit commands.

Example:

```text
POST /demands
POST /demands/{id}/qualify
POST /opportunities/{id}/approve
POST /opportunities/{id}/reject
POST /offers
POST /offers/{id}/approve
POST /actions/{id}/approve
POST /actions/{id}/execute
POST /transactions/{id}/sync
POST /deliveries
POST /learning
```

Command flow:

```text
REQUEST
  ↓
AUTHENTICATE
  ↓
AUTHORIZE
  ↓
VALIDATE
  ↓
DOMAIN RULES
  ↓
STATE CHANGE / PROPOSAL
  ↓
AUDIT
  ↓
OPTIONAL CONNECTOR EXECUTION
  ↓
VERIFY RESULT
  ↓
PERSIST
```

The API must not directly expose arbitrary database mutation.

---

## 8. State-Machine Rules

### Demand

```text
captured → reviewed → qualified
                    ↘ rejected
                    ↘ archived
```

### Opportunity

```text
new → shortlisted → approved → active → won/lost
```

### Offer

```text
draft → approved → sent/published → accepted/rejected/expired
```

### Action

```text
draft → awaiting_approval → approved → executing
                                      ↘ failed
                                      ↘ completed
```

### Transaction

```text
pending → paid
        ↘ failed
        ↘ refunded
```

### Delivery

```text
not_started → in_progress → delivered → accepted
                                      ↘ issue
```

### Learning

```text
captured → reviewed → incorporated
```

Invalid transitions MUST be rejected server-side.

---

## 9. Database Implementation

Use a relational database as the canonical MVP store.

Core tables should map closely to the canonical entities.

Minimum requirements:

- primary internal ID;
- created/updated timestamps;
- lifecycle state;
- source/provenance references where relevant;
- external provider IDs stored separately;
- indexes for lookup and reconciliation;
- uniqueness constraints for deduplication;
- foreign-key integrity where appropriate;
- migration files under version control.

Do not add a vector database, event-sourcing platform, data warehouse, or graph database unless an actual MVP requirement proves it necessary.

---

## 10. API Contract

API design should be command-oriented and domain-oriented.

Minimum read surfaces:

```text
GET /demands
GET /demands/{id}
GET /opportunities
GET /opportunities/{id}
GET /offers/{id}
GET /actions/{id}
GET /transactions/{id}
GET /deliveries/{id}
GET /learning
```

Minimum write surfaces are the command endpoints defined above.

Every API response should use a consistent error envelope.

Example conceptual error:

```json
{
  "error": {
    "code": "ACTION_APPROVAL_REQUIRED",
    "message": "Action requires approval before execution.",
    "request_id": "..."
  }
}
```

Do not expose internal stack traces or secrets to clients.

---

## 11. Connector Implementation

Each connector lives behind an adapter interface.

Conceptual interface:

```text
Connector
├── identify()
├── capabilities()
├── validate(input)
├── execute(operation, input, context)
├── health()
└── normalize(result)
```

Connector implementation sequence:

1. define capability;
2. define input schema;
3. define normalized output schema;
4. define auth reference;
5. implement provider adapter;
6. validate provider response;
7. persist ConnectorExecution;
8. reconcile external ID;
9. emit domain/audit result.

A provider SDK must remain inside the connector boundary whenever practical.

---

## 12. External Search / Make.com Bridge

For sources without a stable official API or while access approval is pending, external research/automation may be used.

The implementation boundary is:

```text
KAERVAX
  ↓
Research Job
  ↓
Make.com / Search / Human Browser Worker
  ↓
Raw Result
  ↓
Normalizer
  ↓
Canonical DemandSignal
```

Rules:

- Make.com is not canonical storage;
- scraped/retrieved content is evidence, not truth by default;
- source URL/external ID should be preserved where available;
- results must be normalized before entering the domain;
- rate limits and platform terms must be respected;
- no spam or uncontrolled mass outreach.

---

## 13. AI Worker Implementation

AI workers should be narrow and role-specific.

Recommended first workers:

### Demand Structurer

Input: raw demand evidence.

Output:

- normalized problem;
- buyer/context;
- urgency signals;
- explicit requirements;
- evidence references;
- uncertainty.

### Opportunity Analyst

Input: qualified demand.

Output:

- opportunity attributes;
- qualification rationale;
- suggested next action;
- uncertainty/evidence state.

### Offer Drafter

Input: approved opportunity.

Output:

- offer draft;
- scope;
- assumptions;
- price proposal if supplied by business rules;
- delivery assumptions;
- risks/unknowns.

### Action Planner

Input: approved offer/action intent.

Output:

- proposed execution steps;
- connector capability needed;
- required approval;
- expected result.

AI workers do not directly own canonical lifecycle transitions.

---

## 14. UI Implementation Order

Do not build a large dashboard first.

Build the minimum operator surfaces in this order:

1. **Command/Capture** — create demand quickly;
2. **Demand Inbox** — review and qualify;
3. **Opportunity Board** — shortlist and approve;
4. **Offer Workspace** — draft, review, approve;
5. **Action Center** — approval and execution state;
6. **Transaction View** — payment/reconciliation;
7. **Delivery View** — fulfillment;
8. **Learning View** — outcome and feedback.

A voice interface may be layered on top of these commands later. It must map to the same domain commands rather than create a second business logic system.

---

## 15. Voice-First Extension

When voice is introduced:

```text
VOICE
 ↓
INTENT PARSING
 ↓
COMMAND PROPOSAL
 ↓
DOMAIN VALIDATION
 ↓
APPROVAL GATE
 ↓
ACTION
```

Example:

> “Cari demand website dari Threads yang punya urgency tinggi.”

The voice layer should translate that request into a structured query/command. It must not directly grant itself unrestricted access or execution authority.

---

## 16. Observability

Every production operation should be traceable through a request/execution ID.

Minimum telemetry:

- request ID;
- actor;
- operation;
- object ID;
- connector ID;
- execution ID;
- duration;
- result;
- error code;
- retry count.

Metrics should initially focus on:

- demand capture count;
- qualified demand count;
- opportunity conversion;
- offers created/sent;
- actions completed/failed;
- real payments;
- delivery completion;
- outcome/learning capture.

Business metrics are more important than infrastructure vanity metrics during MVP.

---

## 17. Error Handling

Errors should be classified into:

```text
VALIDATION_ERROR
AUTHENTICATION_ERROR
AUTHORIZATION_ERROR
PROVIDER_ERROR
RATE_LIMITED
TIMEOUT
NETWORK_ERROR
CONFLICT
IDEMPOTENCY_CONFLICT
PARTIAL_RESULT
NEEDS_REVIEW
INTERNAL_ERROR
```

Retry only errors that are safely retryable.

Never automatically retry a consequential action when doing so could create a duplicate external effect unless the connector has a safe idempotency/reconciliation strategy.

---

## 18. Testing Strategy

### Unit tests

Test:

- domain rules;
- state transitions;
- qualification logic;
- validation;
- idempotency;
- authorization policies.

### Integration tests

Test:

- database persistence;
- connector adapters;
- webhook verification;
- transaction reconciliation;
- worker/domain boundaries.

### End-to-end tests

Test the complete happy path:

```text
Demand → Opportunity → Offer → Action → Transaction → Delivery → Learning
```

### Security tests

Test at minimum:

- unauthorized action;
- missing approval;
- invalid webhook;
- secret leakage paths;
- prompt-injection handling;
- cross-object access;
- duplicate webhook/action;
- invalid state transition.

---

## 19. Deployment Contract

Production deployment MUST be independent of Genspark or another coding sandbox.

The production environment must provide:

- application runtime;
- database;
- secret management;
- HTTPS;
- logs;
- backup/recovery;
- controlled deployment;
- environment-specific configuration.

Cloudflare or another production platform may provide the runtime components, but the architecture must remain portable enough to replace a vendor when required.

---

## 20. Configuration Contract

Environment configuration should distinguish safe configuration from secrets.

Examples of non-secret configuration:

```text
APP_ENV
APP_URL
LOG_LEVEL
CONNECTOR_TIMEOUT_MS
RETRY_LIMIT
FEATURE_VOICE_ENABLED
```

Examples of secrets:

```text
DATABASE_PASSWORD
AI_API_KEY
OAUTH_REFRESH_TOKEN
PAYMENT_SECRET
WEBHOOK_SECRET
```

Secrets MUST come from the deployment secret mechanism and MUST NOT be committed.

---

## 21. Feature Flags

Feature flags should be used for risky or experimental capabilities, especially:

- new connectors;
- outbound execution;
- voice commands;
- autonomous research;
- automated publishing;
- payment features.

A disabled feature MUST fail safely rather than silently executing a fallback action.

---

## 22. Definition of Done — Technical

A feature is technically complete only when:

- domain rule exists;
- authorization exists;
- validation exists;
- persistence exists;
- audit exists where required;
- error states are defined;
- tests exist;
- connector boundary is respected;
- secrets are handled safely;
- UI/API path is usable;
- deployment configuration is documented.

---

## 23. Definition of Done — Commercial

The MVP itself is not validated merely because code works.

Commercial validation requires at least one real case in which:

1. a real demand existed;
2. KAERVAX captured and structured it;
3. an opportunity was selected;
4. an offer was produced;
5. an action/conversation occurred;
6. a real buyer paid through a real transaction path;
7. delivery occurred or was accepted;
8. the outcome was recorded;
9. learning was captured.

A demo, synthetic lead, fake payment, or internally generated opportunity does not satisfy this criterion.

---

## 24. Anti-Overbuilding Gate

Before adding a major feature, answer:

```text
Does this help capture demand?
Does this improve opportunity selection?
Does this improve offer creation?
Does this improve action/execution?
Does this improve transaction/delivery?
Does this create useful learning?
Does this materially protect security/reliability?
```

If the answer is no to all, defer the feature.

---

## 25. Implementation Sequence Summary

```text
01 Foundation
      ↓
02 Canonical Domain
      ↓
03 Demand Intake
      ↓
04 Opportunity + Offer
      ↓
05 Action + Connector
      ↓
06 Transaction
      ↓
07 Delivery
      ↓
08 Learning
      ↓
09 Real Commercial Validation
      ↓
10 Evidence-Based Expansion
```

Only after the first real commercial loop should KAERVAX consider broader automation, additional platforms, multi-tenant architecture, advanced analytics, vector search, autonomous execution, or generalized workflow capabilities.

---

## 26. Coding-Agent Contract

Any coding agent implementing this repository MUST:

1. read architecture documents `01` through `09` before changing foundational structure;
2. preserve the canonical domain model;
3. preserve the security/ownership boundary;
4. never commit secrets;
5. never invent production credentials;
6. never bypass approval gates for convenience;
7. implement incrementally in dependency order;
8. add tests with meaningful domain behavior;
9. report changed files and validation results;
10. stop and surface an architecture conflict rather than silently redefining the architecture.

The coding agent is an implementation worker, not the owner of product strategy or business truth.

---

## 27. Architecture Lock

This blueprint is the implementation bridge between KAERVAX architecture and actual code.

The next implementation documents should define the concrete execution contract, environment/secrets contract, testing/delivery gates, and phased roadmap as needed.

**Next:** `10_ENVIRONMENT_AND_SECRETS_CONTRACT.md`
