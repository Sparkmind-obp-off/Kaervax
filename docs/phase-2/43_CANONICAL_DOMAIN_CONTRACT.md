# KAERVAX — Canonical Domain Contract

**Phase:** 2 — Canonical Domain

**Gate:** G2

**Status:** Implemented contract
**Commercial gate:** G0 remains **PARTIAL / BLOCKED**

## 1. Decision

Phase 2 establishes a small, vendor-neutral domain kernel in `src/domain/index.js`. It is a pure in-process module with no network, provider, database, authentication, payment, or external-action implementation.

Persistence remains **deferred**. The current objective is to prove canonical ownership, lifecycle rules, command boundaries, and audit semantics. No operational workflow yet requires durable application records, and adding D1 now would create infrastructure without a Phase 2 need.

## 2. Ownership Boundary

| Boundary | Authority |
|---|---|
| Canonical IDs, business records, state, lifecycle rules, and audit semantics | KAERVAX |
| Provider-native IDs, accounts, payloads, and platform state | External provider |
| Consequential approval | Human operator |
| Payment confirmation | Future authoritative provider-verification path; not implemented in Phase 2 |
| Connector execution | Future adapter/runtime path; not implemented in Phase 2 |
| Persistence and durable audit storage | Deferred until a stateful protected capability is authorized |

External references may be retained in provenance/evidence references. They never replace `kx_<type>_<opaque>` canonical identities.

## 3. Canonical Concepts

All roadmap target concepts are formally modeled at the boundary. Only generic creation, demand creation, lifecycle transition, and audit-event construction are implemented.

| Concept | Purpose | Required relationship in current kernel | Initial state | Phase 2 disposition |
|---|---|---|---|---|
| `Source` | Origin classification/reference | None | `ACTIVE` | Formally modeled |
| `DemandSignal` | One observed or classified need | `sourceId` | `CAPTURED` | Creation command implemented |
| `Opportunity` | Qualified commercial possibility | `demandSignalId` | `DRAFT` | Minimal creation/transition implemented |
| `Offer` | Versionable commercial proposition boundary | `opportunityId` | `DRAFT` | Minimal creation/transition implemented |
| `Action` | Proposed consequential operation | `originId` | `PROPOSED` | Proposal/approval state only; no execution |
| `Conversation` | Buyer-interaction reference | `opportunityId` | `OPEN` | Formally modeled; no messaging |
| `Transaction` | Vendor-neutral commercial payment state | `offerId` | `PENDING` | State vocabulary modeled; authoritative payment transitions blocked |
| `Delivery` | Fulfilment state boundary | `transactionId` | `PENDING` | Formally modeled; no automation |
| `Learning` | Reviewed learning tied to an origin | `originId` | `DRAFT` | Formally modeled; no automation |
| `Connector` | Replaceable adapter identity/capability boundary | None | `INACTIVE` | Formally modeled; no credentials/runtime |
| `ConnectorExecution` | Technical invocation trace boundary | `connectorId` | `REQUESTED` | State vocabulary modeled; execution transitions blocked |
| `AuditEvent` | Append-oriented state-change description | target entity reference | N/A | Produced with commands; durable storage deferred |

## 4. Common Record Contract

Implemented canonical records contain:

- stable KAERVAX identity;
- explicit `entityType` and `owner = KAERVAX`;
- lifecycle state;
- provenance containing `sourceType`, `sourceRef`, and evidence classification;
- zero or more evidence references;
- creation/update timestamps supplied by the application boundary;
- monotonically increasing revision;
- minimal relationship and business attributes.

Core fields (`id`, owner, type, state, timestamps, revision) are domain-controlled and cannot be supplied by generic callers. Records and outputs are frozen to discourage mutation outside commands.

## 5. Evidence and Provenance

Allowed evidence classes:

- `OBSERVED` — directly supported by repository/runtime/provider/human evidence;
- `DERIVED` — reasoned from observed evidence;
- `SYNTHETIC` — fixture, generated, simulated, or illustrative.

Phase 2 tests use only `SYNTHETIC` business examples. They validate software behavior and are not commercial evidence.

## 6. Lifecycle Rules

### Source

`ACTIVE → INACTIVE`; `INACTIVE → ACTIVE`.

### DemandSignal

`CAPTURED → QUALIFIED | REJECTED`. `QUALIFIED` and `REJECTED` are terminal. Qualification requires at least one evidence reference.

### Opportunity

`DRAFT → APPROVED | REJECTED`; `APPROVED → CLOSED`. `REJECTED` and `CLOSED` are terminal. Approval requires a demand link and an explicit reason.

### Offer

`DRAFT → APPROVED | WITHDRAWN`; `APPROVED → WITHDRAWN | EXPIRED`. `WITHDRAWN` and `EXPIRED` are terminal. Approval requires an opportunity link and explicit reason.

### Action

`PROPOSED → APPROVED | DENIED | CANCELLED`; `APPROVED → CANCELLED`. Approval requires a `HUMAN_OPERATOR` actor and `approvalRef`. No execute command exists.

### Conversation

`OPEN → CLOSED`; `CLOSED` is terminal.

### Transaction

Vocabulary: `PENDING`, `PAID`, `FAILED`, `REFUNDED`, `CANCELLED`. The state map documents `PENDING → PAID | FAILED | CANCELLED` and `PAID → REFUNDED`, but Phase 2 command policy rejects transitions to `PAID` and `REFUNDED`. Later payment work must add authoritative verification before enabling them.

### Delivery

`PENDING → IN_PROGRESS | CANCELLED`; `IN_PROGRESS → DELIVERED | ISSUE | CANCELLED`; `DELIVERED → ACCEPTED | ISSUE`; `ISSUE → IN_PROGRESS | CANCELLED`. `ACCEPTED` and `CANCELLED` are terminal.

### Learning

`DRAFT → REVIEWED | DISMISSED`; `REVIEWED` and `DISMISSED` are terminal.

### Connector

`INACTIVE → ACTIVE`; `ACTIVE → SUSPENDED | INACTIVE`; `SUSPENDED → ACTIVE | INACTIVE`.

### ConnectorExecution

Vocabulary: `REQUESTED`, `RUNNING`, `SUCCEEDED`, `FAILED`, `NEEDS_REVIEW`. Phase 2 command policy blocks execution-state transitions because connector runtime belongs to Phase 5.

All unlisted transitions are invalid and fail with `INVALID_TRANSITION`.

## 7. Commands

### `CreateDemandSignal`

Intent: create a canonical demand record from already-bounded input. Requires actor, source link, problem, requested outcome, provenance, application-supplied timestamp, canonical ID factory, and audit ID factory. Returns the immutable entity plus `DemandSignalCreated` audit event.

### `Create<Entity>`

Intent: create a minimal record for a formally modeled canonical concept. Validates the actor, common provenance, evidence class, canonical ID, reserved fields, secret exclusions, and required relationship. It does not perform persistence or external work.

### `TransitionEntity`

Intent: move one canonical record through an explicitly allowed lifecycle transition. Validates entity ownership/invariants, actor, allowed transition, transition-specific preconditions, future-phase boundaries, timestamp, and audit event.

There is intentionally no general patch/update command, direct state setter, external execution command, payment confirmation command, or persistence repository in Phase 2.

## 8. Audit Semantics

Every implemented create/transition command returns one `AuditEvent` description containing:

- canonical event identifier;
- event type;
- actor type and identifier;
- initiating source;
- command;
- target type and canonical identifier;
- previous/resulting state where relevant;
- optional reason;
- optional correlation identifier;
- optional approval reference;
- evidence references;
- occurrence timestamp.

Audit events contain references and state deltas, not complete before/after record snapshots. Secret-shaped keys and recognized credential-shaped values are rejected. Durable append-only storage remains deferred with application persistence.

## 9. Security and Mutation Rules

- Domain and audit values reject secret-shaped keys and recognized credential prefixes.
- Provider credentials are neither modeled nor accepted.
- Only a human operator may approve an `Action`.
- No command can execute an action or connector.
- No command can mark a transaction paid or refunded.
- No caller can supply core identity/state/ownership/revision fields.
- Authentication is deferred because no public mutation/API route is exposed; actors in pure command tests are trusted application-boundary inputs, not an auth implementation.

## 10. Deferred Work

Deferred to later authorized phases:

- D1 schema, migrations, repositories, and durable audit persistence;
- authenticated application API and authorization policy;
- demand ingestion, deduplication, qualification/scoring;
- offer composition/version operations;
- outbound actions and connector runtime;
- payment verification/reconciliation;
- delivery and learning automation;
- customer portal, tenancy, and RBAC.

This deferral is deliberate scope control, not evidence that those capabilities work.
