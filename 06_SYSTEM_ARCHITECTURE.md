# KAERVAX — System Architecture

**Status:** FOUNDATION / IMPLEMENTATION BLUEPRINT  
**Document:** 06_SYSTEM_ARCHITECTURE.md  
**Depends on:** 01 Brand Architecture → 02 Naming System → 03 Business Architecture → 04 Product Architecture → 05 MVP Scope

## 1. Purpose

This document translates the KAERVAX product architecture and MVP scope into a vendor-independent technical system.

The architecture must support the commercial loop without prematurely becoming a large autonomous platform.

Primary principle:

> **Keep business truth inside KAERVAX; keep external tools behind replaceable adapters.**

## 2. System Objective

The system must support:

```text
INPUT
  ↓
DEMAND INGESTION
  ↓
DOMAIN / BUSINESS LOGIC
  ↓
PERSISTENT BUSINESS DATA
  ↓
AI / CONNECTOR WORKERS
  ↓
APPROVAL GATES
  ↓
EXTERNAL ACTION
  ↓
TRANSACTION / DELIVERY
  ↓
OUTCOME + LEARNING
```

The system should make one real commercial case traceable from source to outcome.

## 3. Architectural Principles

1. **Domain-first:** business entities are independent from vendors.
2. **API-first:** application capabilities should be callable through explicit interfaces.
3. **Connector isolation:** external platforms are adapters.
4. **Human-in-the-loop:** consequential actions have approval gates.
5. **Auditability:** important state changes are traceable.
6. **Least privilege:** workers receive only the access they require.
7. **Secrets separation:** credentials never become ordinary business data.
8. **Idempotency:** repeated events must not create duplicate commercial records.
9. **Provider replaceability:** changing an AI/search/payment provider should not require rewriting the domain model.
10. **Build restraint:** infrastructure must match the MVP, not the imagined future platform.

## 4. Logical Architecture

```text
┌─────────────────────────────────────────────┐
│                KAERVAX CLIENT               │
│ UI / Operator Console / Future Voice        │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              APPLICATION API                │
│ commands • queries • auth • validation      │
└──────────────────────┬──────────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌───────────────────┐     ┌───────────────────┐
│ DOMAIN / WORKFLOW │     │ WORKER ORCHESTR.  │
│ business rules    │     │ jobs / retries    │
└─────────┬─────────┘     └─────────┬─────────┘
          │                         │
          ▼                         ▼
┌───────────────────┐     ┌───────────────────┐
│ BUSINESS DATABASE │     │ CONNECTOR LAYER   │
│ source of truth   │     │ AI/search/social  │
└─────────┬─────────┘     │ payment/etc.      │
          │               └─────────┬─────────┘
          │                         │
          └────────────┬────────────┘
                       ▼
              ┌─────────────────┐
              │ EVENTS / AUDIT  │
              │ outcome history │
              └─────────────────┘
```

## 5. Runtime Components

### 5.1 Client

The operator-facing interface.

Responsibilities:
- display demand and opportunities;
- submit commands;
- show AI recommendations;
- show approval requests;
- display transaction and delivery state;
- expose learning/outcome information.

The client must not contain authoritative business rules.

### 5.2 Application API

The primary boundary between clients and the business system.

Responsibilities:
- authentication and authorization;
- request validation;
- command handling;
- query handling;
- transaction boundaries;
- idempotency checks;
- audit event creation.

### 5.3 Domain / Workflow Layer

Owns KAERVAX business rules.

Responsibilities:
- demand lifecycle;
- opportunity qualification;
- scoring rules;
- offer lifecycle;
- action approval state;
- transaction linkage;
- delivery state;
- learning relationships.

This layer must not depend directly on a specific social platform or AI provider.

### 5.4 Worker / Orchestration Layer

Runs asynchronous or long-running work.

Examples:
- ingest demand;
- enrich a demand signal;
- generate a draft;
- calculate a score;
- sync payment status;
- execute an approved connector action;
- retry failed jobs.

Workers must be bounded by explicit job contracts.

### 5.5 Database

The primary persistent store for KAERVAX business truth.

The database should hold canonical records for:

- demand signals;
- opportunities;
- offers;
- actions;
- conversations/leads;
- transactions;
- deliveries;
- learning;
- connectors/configuration references;
- audit events.

The exact database technology is intentionally deferred to implementation constraints, provided it supports relational integrity, transactions, indexes, and secure access.

### 5.6 Connector Layer

All external services enter through adapters.

Conceptually:

```text
KAERVAX Domain
      ↓
Connector Interface
      ↓
Provider Adapter
      ↓
External Service
```

Potential adapter categories:
- demand/search source;
- social platform;
- messaging;
- AI/model provider;
- payment provider;
- storage;
- automation platform.

## 6. Application Boundaries

### Inside KAERVAX

Authoritative:
- business objects;
- lifecycle state;
- qualification rules;
- approval state;
- offer versions;
- transaction linkage;
- delivery records;
- learning history;
- audit trail.

### Outside KAERVAX

Provider-owned:
- external account identities;
- platform content systems;
- model execution;
- payment processing;
- third-party search/indexes;
- external automation runtime.

KAERVAX stores the minimum references and results needed to operate its business.

## 7. API Design

The initial API should be organized around business commands rather than database CRUD alone.

Example command groups:

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

Read endpoints may expose:

```text
GET /demands
GET /opportunities
GET /offers/{id}
GET /actions
GET /transactions
GET /deliveries
GET /learning
```

Exact route naming may change during implementation, but commands must map to explicit business operations.

## 8. Domain Event Model

Important lifecycle changes should produce internal events.

Examples:

```text
DemandCaptured
DemandQualified
OpportunityApproved
OfferCreated
OfferApproved
ActionApprovalRequested
ActionApproved
ActionCompleted
ActionFailed
PaymentRequested
PaymentReceived
PaymentFailed
DeliveryStarted
DeliveryCompleted
OutcomeRecorded
LearningCaptured
```

Events are useful for auditability and asynchronous processing.

The MVP does not require a distributed event-sourcing architecture. A durable audit/event table plus transactional application logic is sufficient unless scale later proves otherwise.

## 9. Command Execution Pattern

Consequential work should follow:

```text
COMMAND
  ↓
VALIDATE
  ↓
CREATE PROPOSAL / ACTION
  ↓
APPROVAL GATE
  ↓
EXECUTE CONNECTOR
  ↓
VERIFY RESULT
  ↓
PERSIST RESULT
  ↓
EMIT EVENT / AUDIT
```

AI-generated content should normally be treated as a proposal until accepted.

## 10. Connector Contract

Each connector should expose a normalized contract.

```text
Connector
├── connector_id
├── provider
├── capability
├── version
├── auth_reference
├── input_schema
├── output_schema
├── timeout_policy
├── retry_policy
├── rate_limit_policy
├── execution()
└── health()
```

The domain layer consumes normalized results instead of provider-specific response structures.

## 11. AI Provider Contract

AI providers should be accessed through an abstraction such as:

```text
AIProvider
├── provider_id
├── model
├── capability
├── input
├── output_schema
├── usage metadata
├── safety metadata
└── error
```

Supported capabilities may include:
- extraction;
- classification;
- summarization;
- scoring assistance;
- offer drafting;
- outreach drafting;
- analysis.

The model provider is replaceable.

## 12. Authentication and Authorization

Initial MVP may use a single-owner account model, but authorization boundaries must still exist.

Required concepts:
- authenticated operator;
- session/token;
- resource ownership;
- action permission;
- approval permission.

Do not implement a complex enterprise RBAC matrix unless MVP requirements create a real need.

## 13. Secrets Architecture

Secrets must be externalized from source code and ordinary business records.

Examples:
- AI API keys;
- social credentials;
- payment credentials;
- database credentials;
- webhook secrets.

Application records should contain references such as:

```text
secret_ref = "provider/payment/main"
```

rather than raw secret values.

The exact secret-management mechanism is specified in the later security/environment contract.

## 14. Payment Architecture

The payment provider is an adapter.

Conceptual flow:

```text
Offer
  ↓
Payment Request
  ↓
Provider
  ↓
Webhook / Polling / Manual Confirmation
  ↓
Transaction State
  ↓
Delivery
```

The provider response must not be treated as the entire business record. KAERVAX owns its internal transaction representation.

## 15. External Ingestion Architecture

MVP ingestion may be:

### Manual
Operator enters a demand.

### Semi-automatic
Make.com, search tools, or another approved worker retrieves signals and sends normalized data to KAERVAX.

### API-based
An official provider API feeds a connector.

All three should converge on the same internal `DemandSignal` contract.

This allows the ingestion method to evolve without redesigning the product.

## 16. Data Flow — Commercial Case

```text
External Source / Operator
          ↓
      DemandSignal
          ↓
   Qualification Worker
          ↓
      Opportunity
          ↓
    Offer Composer
          ↓
        Offer
          ↓
   Approval / Action
          ↓
   Buyer Conversation
          ↓
      Transaction
          ↓
       Delivery
          ↓
        Outcome
          ↓
       Learning
```

Every transition must preserve references to the preceding business object.

## 17. Idempotency and Reliability

The MVP must prevent obvious duplicate effects.

Required examples:
- duplicate ingestion does not create unlimited identical demand records;
- repeated payment webhooks do not create duplicate transactions;
- retrying a failed worker does not silently duplicate an external action;
- an approved action has a stable execution identifier.

For external actions where idempotency cannot be guaranteed, the system must surface the uncertainty to the operator rather than pretending success.

## 18. Error Handling

Every worker/connector execution should produce a normalized result:

```text
success
partial
retryable_error
permanent_error
needs_human_review
```

Errors should include:
- stable error code;
- human-readable message;
- provider reference where relevant;
- retryability;
- timestamp;
- originating job/action.

Never expose provider secrets in logs.

## 19. Observability

MVP observability should answer:

- What happened?
- When did it happen?
- Which business object caused it?
- Which worker/connector executed it?
- Did it succeed?
- If it failed, why?
- Was an external action actually executed?

Minimum telemetry:
- request ID;
- job ID;
- action ID;
- connector ID;
- duration;
- status;
- error code;
- timestamp.

Detailed observability can be expanded later.

## 20. Deployment Architecture

Production architecture should remain independent from the AI coding environment.

Conceptually:

```text
GitHub
  ↓
CI/CD
  ↓
Production Runtime
  ├── Web / API
  ├── Worker
  ├── Database
  ├── Secret Store
  └── External Connectors
```

Genspark, local development environments, or temporary sandboxes are implementation environments, not the authoritative production runtime.

Cloud production can use managed services where appropriate, but provider selection must remain an implementation decision rather than a domain dependency.

## 21. Environment Separation

At minimum:

```text
local
staging / preview
production
```

Each environment must have isolated configuration and credentials.

Production credentials must never be copied into development prompts or repositories.

## 22. Security Baseline

MVP must include:

- HTTPS in production;
- authenticated API access;
- authorization checks;
- input validation;
- secure secret handling;
- webhook verification;
- rate limiting where exposed publicly;
- audit logging for consequential actions;
- safe error responses;
- dependency/update hygiene.

A later dedicated security document may strengthen these controls.

## 23. Scalability Strategy

The MVP should scale by separation of responsibilities rather than premature distributed infrastructure.

Initial pattern:

```text
Single Application
+ Managed Database
+ Background Worker
+ External Connectors
```

Scale later through:
- queue workers;
- caching;
- connector-specific workers;
- read optimization;
- job concurrency controls;
- partitioning where justified.

Do not introduce microservices merely because the future architecture may require them.

## 24. Recommended Initial Repository Structure

```text
/
├── app/                 # application entrypoints
├── domain/              # business entities + rules
├── api/                 # HTTP/API boundary
├── workers/             # asynchronous jobs
├── connectors/          # external adapters
├── db/                  # schema/migrations
├── auth/                # authentication/authorization
├── observability/       # logging/telemetry
├── tests/               # automated tests
├── docs/                # architecture and implementation docs
└── README.md
```

Exact framework structure may differ, but the architectural boundaries should remain recognizable.

## 25. Architecture Decision Rules

When implementation choices conflict, prioritize in this order:

1. real commercial workflow;
2. data ownership;
3. security;
4. traceability;
5. reliability;
6. provider replaceability;
7. development speed;
8. scalability.

A technically elegant system that delays the first real transaction is not an architectural success for this MVP.

## 26. System Architecture Acceptance Criteria

The architecture is ready for detailed implementation when:

- application boundaries are explicit;
- business truth has a clear owner;
- connector boundaries are explicit;
- AI providers are abstracted;
- payment flow is represented;
- approval gates are represented;
- asynchronous work has a job model;
- failures and retries have defined semantics;
- secrets are separated;
- auditability is defined;
- deployment environments are separated;
- the architecture can implement the MVP without adding unrelated platform scope.

## 27. Next Step

System Architecture is now the implementation-level source of truth for the next design layer.

**Next document:** `07_DATA_AND_CONNECTOR_ARCHITECTURE.md`

That document should lock the canonical data schema, connector contracts, source normalization, ownership boundaries, and provider abstraction in greater detail.
