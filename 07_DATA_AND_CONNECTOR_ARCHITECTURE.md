# KAERVAX — Data & Connector Architecture

**Status:** FOUNDATION / IMPLEMENTATION CONTRACT  
**Document:** 07_DATA_AND_CONNECTOR_ARCHITECTURE.md  
**Depends on:** 01–06 architecture documents

## 1. Purpose

This document defines the canonical data model and connector boundary for KAERVAX MVP.

The central rule is:

> **KAERVAX owns business truth. Connectors own access to external systems.**

The architecture must allow demand sources, AI providers, automation tools, messaging platforms, and payment providers to change without changing the core commercial model.

## 2. Canonical Commercial Chain

```text
SOURCE
  ↓
DEMAND_SIGNAL
  ↓
OPPORTUNITY
  ↓
OFFER
  ↓
ACTION
  ↓
TRANSACTION
  ↓
DELIVERY
  ↓
LEARNING
```

Supporting objects provide identity, evidence, conversation context, connector execution, and auditability.

## 3. Data Ownership Model

### KAERVAX-owned

- internal IDs;
- normalized business records;
- lifecycle states;
- qualification results;
- offer versions;
- approval decisions;
- transaction linkage;
- delivery records;
- learning records;
- audit events;
- connector execution records.

### Provider-owned

- external account IDs;
- external posts/messages;
- model internals;
- payment processor records;
- external platform permissions;
- provider-specific metadata.

KAERVAX may retain provider references and permitted evidence required for operation, audit, and continuity.

## 4. Canonical ID Strategy

Every internal business object receives a stable opaque ID.

Example:

```text
id = ks_<object>_<unique-value>
```

The exact ID implementation may use UUID/ULID or another collision-safe mechanism.

External IDs must be stored separately:

```text
internal_id
provider
external_id
external_url/reference
```

An external ID must never become the primary KAERVAX identity.

## 5. Core Entities

### 5.1 Source

Represents where a demand signal originated.

Core fields:

```text
source_id
source_type
provider
name
reference
status
metadata
created_at
updated_at
```

Examples of `source_type`:
- social;
- search;
- marketplace;
- community;
- direct;
- imported;
- referral.

### 5.2 DemandSignal

Represents one observed market need.

Core fields:

```text
demand_id
source_id
external_reference
captured_at
raw_content_reference
problem
requested_outcome
buyer_context
urgency_signal
budget_signal
location_context
language
confidence
deduplication_key
status
created_at
updated_at
```

Raw external content should be retained only to the extent permitted and necessary. Prefer references/evidence over unnecessary duplication of third-party content.

### 5.3 Opportunity

Represents a commercially qualified possibility.

Core fields:

```text
opportunity_id
demand_id / demand_ids
title
problem_summary
buyer_profile
qualification
score
confidence
commercial_fit
delivery_feasibility
repeatability
next_action
status
created_at
updated_at
```

Scoring should be decomposable rather than a mysterious single number.

Recommended dimensions:

```text
clarity
urgency
buyer_fit
commercial_fit
feasibility
repeatability
```

### 5.4 Offer

Represents a commercial proposition.

Core fields:

```text
offer_id
opportunity_id
version
problem
promise
deliverables
exclusions
pricing
turnaround
terms
cta
payment_route
content_reference
status
created_at
updated_at
```

Offer revisions create versions rather than silently overwriting historically used offers.

### 5.5 Action

Represents an intended or executed operational action.

Core fields:

```text
action_id
origin_type
origin_id
action_type
target
payload_reference
approval_state
execution_state
idempotency_key
connector_id
execution_reference
result
error_code
created_at
approved_at
executed_at
```

### 5.6 Conversation / Lead

Represents buyer interaction where a conversation is required.

Core fields:

```text
conversation_id
opportunity_id
offer_id
channel
external_reference
participant_reference
status
last_activity_at
notes_reference
created_at
updated_at
```

Avoid storing unnecessary personal information.

### 5.7 Transaction

Represents a commercial payment state in KAERVAX.

Core fields:

```text
transaction_id
offer_id
opportunity_id
buyer_reference
amount
currency
provider
provider_transaction_id
status
payment_requested_at
paid_at
refunded_at
metadata
created_at
updated_at
```

Payment status must be reconciled with provider evidence where applicable.

### 5.8 Delivery

Represents fulfillment.

Core fields:

```text
delivery_id
transaction_id
offer_id
scope
status
deliverables_reference
completion_evidence_reference
started_at
delivered_at
accepted_at
issue
created_at
updated_at
```

### 5.9 Learning

Represents an observation derived from the commercial loop.

Core fields:

```text
learning_id
origin_type
origin_id
observation
signal_type
impact
confidence
recommended_change
applied_state
created_at
```

### 5.10 Connector

Represents an installed/configured integration adapter.

Core fields:

```text
connector_id
connector_type
provider
capabilities
version
auth_reference
configuration_reference
status
health_status
created_at
updated_at
```

Never store raw credentials here.

### 5.11 ConnectorExecution

Represents one connector invocation.

Core fields:

```text
execution_id
connector_id
action_id / job_id
operation
input_reference
output_reference
status
provider_request_id
retry_count
started_at
completed_at
error_code
```

This creates a clean separation between business action and technical execution.

### 5.12 AuditEvent

Represents a traceable business/security event.

Core fields:

```text
event_id
actor_type
actor_id
event_type
entity_type
entity_id
before_reference
after_reference
request_id
created_at
```

Sensitive values must not be copied into audit payloads unnecessarily.

## 6. Relationships

Canonical relationships:

```text
Source 1 ─── * DemandSignal
DemandSignal * ─── * Opportunity
Opportunity 1 ─── * Offer
Offer 1 ─── * Action
Opportunity 1 ─── * Conversation
Offer 1 ─── * Transaction
Transaction 1 ─── * Delivery
Any commercial object 1 ─── * Learning
Action 1 ─── * ConnectorExecution
Any important object 1 ─── * AuditEvent
```

The implementation may simplify cardinalities for MVP, but must preserve traceability.

## 7. Evidence Model

Demand intelligence must distinguish:

```text
OBSERVED
INFERRED
GENERATED
VERIFIED
```

Example:

```text
Observed: buyer explicitly requested a website.
Inferred: buyer may have an urgent launch date.
Generated: AI drafted an offer.
Verified: buyer confirmed budget.
```

This distinction prevents AI inference from silently becoming business fact.

## 8. Normalization Pipeline

External data enters through:

```text
PROVIDER PAYLOAD
      ↓
RAW ADAPTER RESULT
      ↓
NORMALIZER
      ↓
CANONICAL SCHEMA
      ↓
VALIDATION
      ↓
DEDUPLICATION
      ↓
DEMAND_SIGNAL
```

Provider-specific fields remain inside the adapter/raw metadata boundary unless they have clear product value.

## 9. Deduplication

The MVP should detect obvious duplicate demand.

Candidate deduplication signals:
- provider + external ID;
- canonical source URL;
- normalized content fingerprint;
- source timestamp window;
- matching buyer/problem references.

Deduplication should prefer marking records as related/duplicate rather than destructive deletion.

## 10. Connector Taxonomy

### Discovery Connectors

Retrieve demand signals.

Examples:
- search;
- social feeds;
- marketplaces;
- community sources.

### Intelligence Connectors

Perform bounded enrichment or AI analysis.

Examples:
- LLM provider;
- classification service;
- extraction service.

### Action Connectors

Perform approved external actions.

Examples:
- messaging;
- publishing;
- application submission;
- task creation.

### Transaction Connectors

Connect payment events.

### Storage Connectors

Provide external file/object storage when needed.

### Automation Connectors

Allow external workflow systems such as Make.com to act as workers while preserving KAERVAX's canonical contract.

## 11. Connector Contract

Every connector should implement a normalized interface conceptually equivalent to:

```text
identify()
capabilities()
validate(input)
execute(operation, input, context)
health()
normalize(result)
```

The implementation language/framework is not prescribed.

## 12. Connector Capability Model

Capabilities should be explicit.

Example:

```text
search
read
create_draft
send
publish
payment_status
webhook
analyze
```

A connector must not claim a capability that it cannot reliably perform.

## 13. Authentication Contract

Connector configuration should reference credentials through a secret manager.

Conceptual structure:

```text
connector
  ↓
auth_reference
  ↓
secret store
  ↓
credential at execution time
```

Workers receive credentials only for the duration and scope required for the operation.

## 14. Connector Execution Lifecycle

```text
CREATED
  ↓
VALIDATING
  ↓
READY
  ↓
EXECUTING
  ↓
SUCCESS / PARTIAL / FAILED / NEEDS_REVIEW
```

Retries are permitted only for operations classified as retry-safe.

## 15. Idempotency Contract

Every externally consequential operation should carry an idempotency key where supported.

Conceptual key:

```text
<action_id>:<operation>:<attempt-scope>
```

For providers without idempotency support, KAERVAX should record uncertainty and avoid blind retries when duplicate execution could cause commercial or reputational harm.

## 16. Webhook Contract

Inbound provider events should follow:

```text
receive
 ↓
verify signature/authenticity
 ↓
store event reference
 ↓
deduplicate
 ↓
normalize
 ↓
apply business transition
 ↓
audit
```

Payment and other high-impact webhooks require verification before state changes.

## 17. Provider Metadata

Provider-specific metadata may be retained under a controlled metadata field, but the canonical model must not become a provider payload dump.

Rule:

> **Promote a provider field into the canonical schema only when it has stable product meaning.**

## 18. Data Retention

Retention should be driven by:
- business usefulness;
- legal requirements;
- platform terms;
- privacy/security risk;
- operational needs.

Do not retain third-party content indefinitely simply because storage is cheap.

## 19. Privacy Minimization

Only collect personal information required for the commercial workflow.

Prefer:
- public/business references;
- external IDs;
- contact references;
- minimum required communication data.

Avoid building a large personal-data database before a real business need exists.

## 20. Data Access Boundaries

### UI

Receives only fields required for the current view/action.

### AI Worker

Receives only the context necessary for its task.

### Connector

Receives only operation-specific input and authorized credentials.

### Audit

Receives metadata sufficient for traceability without copying secrets.

## 21. Source Provenance

Every normalized demand should retain provenance sufficient to answer:

- where did this come from?
- when was it captured?
- what external reference supports it?
- which connector retrieved it?
- was the content observed, inferred, or generated?

This provenance is a core intelligence asset.

## 22. Learning Feedback Link

Learning must connect back to the source commercial context.

Example:

```text
Demand D1
  ↓
Opportunity O1
  ↓
Offer O1-V2
  ↓
Transaction T1
  ↓
Delivery DLV1
  ↓
Learning L1
```

This allows KAERVAX to eventually answer which types of demand, offers, channels, and workflows produce useful outcomes.

## 23. MVP Storage Guidance

A relational database is the preferred conceptual model because the MVP requires:
- relationships;
- transaction integrity;
- status transitions;
- indexing;
- audit queries;
- traceability.

A separate data warehouse/vector database is not required for MVP unless a concrete use case proves it necessary.

Vector search may be added later for semantic retrieval, but must not replace canonical relational records.

## 24. External Worker / Make.com Boundary

If Make.com or another external automation system is used, the boundary should be:

```text
KAERVAX
  ↓
normalized job/request
  ↓
external worker
  ↓
normalized result
  ↓
KAERVAX
```

The external workflow must not become the canonical database of opportunities, offers, or transactions.

## 25. Example Normalized Job

```json
{
  "job_type": "discover_demand",
  "source": "approved-source",
  "input": {
    "query": "website request for small business"
  },
  "callback": {
    "job_id": "job_123"
  }
}
```

Normalized result concept:

```json
{
  "job_id": "job_123",
  "status": "success",
  "items": [
    {
      "external_reference": "source_456",
      "problem": "needs website",
      "requested_outcome": "launch online presence",
      "evidence_reference": "..."
    }
  ]
}
```

The exact payload is an implementation contract to be finalized before coding.

## 26. Data Integrity Rules

1. Internal IDs are stable.
2. External IDs are references, not primary identity.
3. Commercial objects preserve lineage.
4. State changes are validated.
5. Provider events are deduplicated.
6. Payment events are reconciled.
7. Offer history is versioned where commercially relevant.
8. AI inference is distinguishable from verified evidence.
9. Secrets are never stored in business records.
10. Deletion must respect dependencies, audit needs, and applicable retention rules.

## 27. Acceptance Criteria

This architecture is ready for implementation when:

- every MVP object has a canonical purpose;
- relationships support end-to-end traceability;
- provenance is preserved;
- provider IDs are separated from internal IDs;
- source normalization is defined;
- connector capabilities are explicit;
- authentication is separated from connector configuration;
- connector executions are auditable;
- idempotency expectations are explicit;
- webhook verification is defined;
- Make.com/external workers can integrate without owning business truth;
- the schema remains small enough for the MVP.

## 28. Next Step

With data ownership and connector boundaries defined, the next architecture layer is:

**`08_SECURITY_OWNERSHIP_CONTRACT.md`**

That document should lock security responsibilities, credential ownership, access boundaries, approval authority, privacy controls, threat assumptions, and operational ownership before implementation.
