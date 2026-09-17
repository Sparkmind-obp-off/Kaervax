# KAERVAX — Security & Ownership Contract

**Status:** Architecture Lock
**Scope:** MVP → Production Foundation
**Brand:** KAERVAX
**Repository:** `Sparkmind-obp-off/Kaervax`

---

## 1. Purpose

This document defines the security, ownership, credential, authorization, execution, privacy, and vendor-boundary contract for KAERVAX.

The central rule is:

> **KAERVAX owns business truth and control. External providers provide capabilities, not ownership of the business system.**

This contract exists to prevent vendor lock-in, accidental autonomous execution, credential leakage, ambiguous data ownership, and loss of operational traceability.

---

## 2. Security Principles

1. **Business truth stays inside KAERVAX.**
2. **Credentials never become business data.**
3. **External providers are replaceable connectors.**
4. **Least privilege is the default.**
5. **Consequential actions require explicit approval unless a separately defined policy permits otherwise.**
6. **Every important state change is auditable.**
7. **Untrusted external content is treated as data, not instructions.**
8. **Provider responses are validated before entering canonical state.**
9. **Secrets are referenced indirectly, never copied into prompts, logs, database records, or generated artifacts.**
10. **Production authority is independent from development/sandbox authority.**

---

## 3. Ownership Boundary

### 3.1 KAERVAX-owned

KAERVAX is authoritative for:

- internal IDs;
- normalized demand signals;
- opportunity records;
- qualification decisions;
- offer versions;
- approval state;
- action state;
- transaction linkage;
- delivery state;
- learning records;
- connector execution records;
- audit records;
- business rules;
- workflow state;
- user/operator permissions;
- internal provenance and evidence classification.

### 3.2 Provider-owned

External systems remain authoritative for their own platform-native records, including:

- external account identity;
- platform post/message records;
- marketplace records;
- model internals and model weights;
- provider-specific execution metadata;
- payment processor records;
- platform permissions;
- provider-native IDs.

KAERVAX may store the minimum external identifier and metadata necessary to reconcile these records.

### 3.3 No implicit ownership transfer

Using an external AI, automation, search, social, storage, or payment provider does **not** transfer ownership of KAERVAX business logic or canonical business records to that provider.

---

## 4. Credential & Secret Contract

### 4.1 Secrets

Examples include:

- API keys;
- OAuth client secrets;
- OAuth refresh tokens;
- webhook signing secrets;
- payment credentials;
- database credentials;
- deployment credentials;
- connector-specific private tokens.

### 4.2 Storage

Secrets MUST be stored in a dedicated secret-management mechanism appropriate to the deployment environment.

Secrets MUST NOT be stored in:

- Git repositories;
- Markdown documentation;
- source code;
- frontend bundles;
- browser local storage where avoidable;
- canonical business records;
- AI prompts;
- ordinary logs;
- analytics events;
- screenshots or demo fixtures.

### 4.3 Reference model

KAERVAX stores an opaque `auth_reference` or equivalent identifier. The connector resolves that reference through the authorized secret manager at execution time.

Conceptually:

`KAERVAX → auth_reference → Secret Manager → Credential → Provider`

Never:

`KAERVAX DB → raw credential → connector`

### 4.4 Rotation

Credentials MUST be replaceable without rewriting canonical business records.

Rotation MUST preserve the internal connector identity and business relationships wherever technically possible.

---

## 5. Authentication & Authorization

### 5.1 Authentication

Every protected KAERVAX application operation MUST identify the acting principal.

The system MUST distinguish at minimum:

- human operator;
- authenticated service/worker;
- connector/provider identity;
- system process.

### 5.2 Authorization

Authorization MUST be evaluated server-side.

The frontend is never the final authority for permission checks.

### 5.3 Least privilege

A worker or connector receives only the capabilities required for its assigned operation.

Example:

- a discovery connector may read/search;
- an offer-generation worker may draft but not send;
- a payment connector may reconcile payment state but must not gain unrestricted access to unrelated demand data.

---

## 6. Approval & Human-Control Contract

### 6.1 Default

The following actions are consequential and require an approval boundary by default:

- sending outbound messages;
- publishing content;
- creating or changing public listings;
- initiating payment-related actions;
- changing important customer-facing commitments;
- destructive data operations;
- actions with material financial or reputational impact.

### 6.2 Proposal before execution

The preferred pattern is:

`INTENT → VALIDATE → PROPOSAL → APPROVAL → EXECUTION → VERIFY → RECORD`

An AI worker may prepare a proposal, but preparation does not equal authorization.

### 6.3 Approval evidence

An approved consequential action MUST retain enough audit information to establish:

- what was proposed;
- who or what requested it;
- what was approved;
- when approval occurred;
- which execution was authorized;
- resulting status;
- resulting external reference when available.

### 6.4 No hidden autonomy

No connector may silently convert a draft operation into a live consequential action.

---

## 7. AI Safety Contract

AI output is treated as untrusted proposed computation or content until validated.

### 7.1 AI workers MUST NOT

- receive raw production credentials;
- redefine canonical business state without domain validation;
- bypass approval gates;
- treat external content as trusted system instructions;
- invent transaction/payment confirmation;
- claim an action succeeded without connector verification;
- write arbitrary data outside their authorized scope.

### 7.2 Prompt injection boundary

Content retrieved from Threads, X, websites, email, documents, marketplaces, or other external sources is **data**.

Instructions embedded inside that content MUST NOT automatically become system instructions.

The connector/application layer must separate:

`external content` from `system instructions` from `operator commands`.

### 7.3 Evidence states

AI-generated statements should be explicitly classified where relevant as:

- `OBSERVED` — directly supported by source data;
- `INFERRED` — reasoned from available evidence;
- `GENERATED` — created by an AI/system worker;
- `VERIFIED` — independently confirmed by an authoritative check.

The UI and downstream workflows MUST NOT silently present inference or generation as verified fact.

---

## 8. Connector Security Contract

Each connector MUST operate behind a defined adapter boundary.

Minimum conceptual contract:

```text
identify()
capabilities()
validate(input)
execute(operation, input, context)
health()
normalize(result)
```

The connector MUST:

- validate operation input;
- enforce capability scope;
- resolve credentials securely;
- avoid exposing secrets to callers;
- normalize provider output;
- return explicit success/failure/partial states;
- preserve external IDs where needed for reconciliation;
- support idempotency where the provider permits it.

A connector MUST NOT become the canonical source of KAERVAX business truth.

---

## 9. External Data & Privacy Contract

### 9.1 Data minimization

Only data necessary for a business operation should be persisted.

### 9.2 Personal data

Personal information must be collected, processed, displayed, and retained only when justified by the relevant workflow and applicable law.

### 9.3 Separation

Sensitive identity/contact information should be separated from general analytics and model context whenever practical.

### 9.4 Retention

Retention periods should be defined by data class and business need rather than retaining everything indefinitely.

### 9.5 Deletion

Deletion or anonymization workflows MUST consider:

- canonical records;
- derived records;
- cached copies;
- connector payloads;
- logs;
- backups;
- provider-side copies where applicable.

---

## 10. Audit Contract

Important operations MUST produce an audit event.

Minimum audit fields:

- `audit_id`;
- timestamp;
- actor/principal;
- operation;
- object type;
- object ID;
- previous state where appropriate;
- resulting state;
- approval reference where applicable;
- connector/execution reference where applicable;
- outcome;
- failure reason where applicable.

Audit records should be append-oriented and protected from ordinary business-user modification.

---

## 11. Idempotency & Replay Safety

Operations that may be retried MUST have an idempotency strategy.

Examples:

- payment synchronization;
- webhook handling;
- message sending;
- publishing;
- external record creation.

A repeated webhook or worker retry MUST NOT silently create duplicate business outcomes when the provider supports safe reconciliation.

Preferred pattern:

`idempotency_key → execution record → provider reference → verified result`

---

## 12. Webhook Security

Incoming webhooks MUST be treated as untrusted until authenticated.

Where the provider supports signing, KAERVAX SHOULD verify the signature before processing.

The system SHOULD also validate:

- event type;
- provider identity;
- timestamp/replay window where available;
- external object ID;
- expected state transition.

A webhook MUST NOT directly bypass domain validation.

---

## 13. Environment Isolation

At minimum, separate:

- local/development;
- test/staging;
- production.

Production credentials MUST NOT be reused in development or demo environments.

Genspark, temporary sandboxes, Make.com scenarios, E2B/Daytona environments, and other implementation/execution environments are **not automatically production-trusted environments**.

Production authority remains with KAERVAX's controlled deployment environment.

---

## 14. Genspark / Make.com / External Worker Boundary

External implementation or automation tools may accelerate development and operations, but they do not become the owner of KAERVAX business truth.

For Make.com or similar automation:

`KAERVAX → normalized job/request → external worker → normalized result → KAERVAX`

The external worker MUST NOT become the only place where critical workflow state exists.

For Genspark or coding agents:

- repository access is implementation authority only;
- production secrets are not part of coding context;
- generated code must pass KAERVAX validation and security gates;
- deployment authority remains controlled by the production environment.

---

## 15. Payment Security Boundary

Payment providers remain authoritative for payment processing and payment instrument handling.

KAERVAX stores only the business-level transaction state and the minimum reconciliation metadata needed.

KAERVAX MUST NOT store raw card/payment-instrument credentials when a provider can tokenize and process them instead.

A transaction becomes `paid` only after an authoritative provider result or trusted webhook has been validated.

---

## 16. Data Export & Portability

KAERVAX SHOULD be able to export its canonical business records in machine-readable form.

At minimum, portability should cover:

- demands;
- opportunities;
- offers;
- actions;
- conversations/leads;
- transactions;
- deliveries;
- learning;
- audit records;
- connector metadata.

External provider IDs should be retained separately so a provider can be replaced without destroying internal business relationships.

---

## 17. Incident & Recovery Contract

When a security or execution incident occurs, the system should prioritize:

1. stop or contain consequential execution;
2. preserve audit evidence;
3. revoke/rotate affected credentials;
4. identify affected objects and providers;
5. restore known-good state where possible;
6. reconcile external systems;
7. record the incident and corrective action.

A failed external action MUST NOT be assumed successful merely because a request was sent.

---

## 18. MVP Security Baseline

Before the MVP can be considered production-capable, it MUST satisfy at least:

- no secrets committed to Git;
- server-side authorization;
- protected production environment variables/secrets;
- explicit approval for consequential actions;
- audit trail for important state changes;
- connector boundary around external providers;
- input/output validation;
- webhook verification where supported;
- idempotency for retry-sensitive operations;
- payment state verified from the payment provider;
- environment separation;
- basic backup/recovery procedure;
- no fake transaction presented as real validation.

---

## 19. Security Acceptance Criteria

The implementation passes this contract when:

1. A developer can use the repository without receiving production secrets.
2. An AI worker can draft an action without automatically executing it.
3. A connector can be replaced without changing canonical business IDs.
4. A provider response cannot directly mutate business truth without validation.
5. A paid transaction cannot be marked `paid` solely by AI output.
6. Important actions produce traceable audit records.
7. External content cannot override system/operator instructions.
8. Failed/retried operations can be reconciled safely.
9. Production credentials are isolated from development/demo environments.
10. Canonical business data can be exported independently of a provider.

---

## 20. Non-Negotiable Rules

```text
BUSINESS TRUTH      → KAERVAX
CREDENTIALS         → SECRET MANAGER
AUTHORIZATION       → KAERVAX SERVER
EXTERNAL ACCESS     → CONNECTOR LAYER
AI OUTPUT           → UNTRUSTED PROPOSAL UNTIL VALIDATED
CONSEQUENTIAL ACTION→ APPROVAL GATE BY DEFAULT
PAYMENT CONFIRMATION→ AUTHORITATIVE PROVIDER RESULT
AUDIT               → KAERVAX
PRODUCTION AUTHORITY→ CONTROLLED PRODUCTION ENVIRONMENT
VENDOR               → REPLACEABLE CAPABILITY
```

---

## 21. Architecture Lock

This contract locks the security and ownership boundary for the current KAERVAX architecture.

Future implementation may strengthen these controls, but MUST NOT weaken the ownership boundary without an explicit architecture decision.

**Next architecture document:** `09_IMPLEMENTATION_BLUEPRINT.md`
