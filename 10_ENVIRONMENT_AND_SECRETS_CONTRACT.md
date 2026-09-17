# KAERVAX — Environment & Secrets Contract

**Status:** Architecture Lock → Build Contract  
**Scope:** Development, test, staging, production, credentials, configuration, deployment  
**Brand:** KAERVAX  
**Repository:** `Sparkmind-obp-off/Kaervax`

---

## 1. Purpose

This document defines how KAERVAX separates environments, configuration, secrets, credentials, deployment authority, and runtime access.

The objective is simple:

> **Code may move between environments; production authority and production secrets must not leak backward into development.**

This contract complements `08_SECURITY_OWNERSHIP_CONTRACT.md` and converts its security principles into an operational environment model.

---

## 2. Environment Model

KAERVAX uses four logical environments when practical:

```text
LOCAL / DEV
    ↓
TEST
    ↓
STAGING
    ↓
PRODUCTION
```

### Local / Development

Purpose:

- active coding;
- local debugging;
- unit/integration development;
- synthetic or sanitized fixtures.

Rules:

- no production credentials;
- no uncontrolled production data;
- external integrations may use sandbox/test accounts;
- secrets remain local and uncommitted.

### Test

Purpose:

- automated tests;
- CI validation;
- migration testing;
- connector contract testing.

Rules:

- deterministic data preferred;
- provider mocks/sandboxes preferred;
- credentials are test-only;
- destructive operations must be isolated.

### Staging

Purpose:

- production-like verification;
- release candidate testing;
- integration validation;
- operator acceptance testing.

Rules:

- isolated credentials;
- isolated database;
- production configuration shape without production secrets;
- real provider integration only when explicitly justified.

### Production

Purpose:

- real business operations;
- real customers;
- real transactions;
- authoritative business data.

Rules:

- controlled deployment;
- production-only secrets;
- audit and observability enabled;
- backup/recovery enabled;
- consequential actions subject to production approval policies.

---

## 3. Environment Isolation Contract

The following boundaries are mandatory:

```text
DEV      ≠ TEST      ≠ STAGING      ≠ PRODUCTION
DB       isolated    isolated       isolated
SECRETS  isolated    isolated       isolated
DATA     synthetic   test           controlled real
PAYMENT  sandbox     sandbox         controlled live
```

A credential created for one environment MUST NOT be assumed valid or appropriate for another environment.

Production data MUST NOT be copied into development merely for convenience.

---

## 4. Configuration Classes

Configuration is divided into three classes.

### Class A — Public/Non-sensitive

Examples:

```text
APP_ENV
APP_URL
LOG_LEVEL
FEATURE_VOICE_ENABLED
CONNECTOR_TIMEOUT_MS
RETRY_LIMIT
```

These values may be versioned when they contain no secrets and no sensitive infrastructure information.

### Class B — Operationally sensitive

Examples:

```text
internal service endpoints
private webhook paths
deployment identifiers
non-public feature configuration
provider account identifiers
```

These SHOULD be injected through environment/deployment configuration rather than committed when exposure creates operational risk.

### Class C — Secret

Examples:

```text
DATABASE_PASSWORD
AI_API_KEY
OAUTH_CLIENT_SECRET
OAUTH_REFRESH_TOKEN
PAYMENT_SECRET
WEBHOOK_SIGNING_SECRET
DEPLOYMENT_TOKEN
```

Class C values MUST be stored in the environment's secret-management mechanism.

---

## 5. Secret Storage Contract

Secrets MUST NOT be committed to Git.

Forbidden locations include:

- source files;
- Markdown documentation;
- JSON fixtures;
- test snapshots;
- frontend bundles;
- public configuration files;
- screenshots;
- issue comments;
- AI prompts;
- generated code artifacts;
- normal application logs.

Safe conceptual model:

```text
Repository
  └── secret NAME/reference only

Deployment Secret Store
  └── secret VALUE

Runtime
  └── resolves VALUE only when required
```

The repository should document **what secret names are required**, never the secret values.

---

## 6. `.env` Contract

Local development may use an ignored `.env` file.

Required repository controls:

```text
.env
.env.*
```

must be excluded from version control except explicitly approved safe example files.

A safe template MAY exist:

```text
.env.example
```

It must contain placeholders only, for example:

```text
DATABASE_URL=
AI_API_KEY=
PAYMENT_SECRET=
WEBHOOK_SECRET=
```

No real credential may appear in `.env.example`.

---

## 7. Secret Naming Convention

Use stable, descriptive names.

Recommended pattern:

```text
<PROVIDER>_<PURPOSE>_<TYPE>
```

Examples:

```text
OPENAI_API_KEY
THREADS_ACCESS_TOKEN
DUITKU_API_KEY
DUITKU_MERCHANT_CODE
DUITKU_WEBHOOK_SECRET
DATABASE_URL
```

Exact provider names may change; the connector layer should prevent provider-specific environment names from leaking throughout the domain layer.

---

## 8. Runtime Secret Access

Application code MUST request only the secrets required for its operation.

Preferred flow:

```text
Domain Command
    ↓
Connector
    ↓
auth_reference
    ↓
Secret Manager / Runtime Secret Store
    ↓
Provider Credential
```

Do not inject every available production secret into every worker process.

A worker that only needs search access should not receive payment credentials.

---

## 9. Secret Redaction

Secrets MUST be redacted from logs and error responses.

The logging layer SHOULD recognize common sensitive fields such as:

```text
authorization
api_key
access_token
refresh_token
client_secret
password
secret
signature
cookie
```

Redaction must occur before the record reaches the persistent logging destination.

---

## 10. Credential Lifecycle

Every production credential should have a lifecycle:

```text
CREATE
  ↓
REGISTER
  ↓
STORE SECURELY
  ↓
USE
  ↓
MONITOR
  ↓
ROTATE
  ↓
REVOKE
```

Credentials must be revocable independently of the KAERVAX business records that reference them.

If a provider account is replaced, canonical business data should remain intact.

---

## 11. OAuth Contract

For OAuth-based connectors:

- access tokens are treated as secrets;
- refresh tokens are treated as high-sensitivity secrets;
- scopes MUST be minimized;
- callback URLs MUST be environment-specific;
- token refresh must occur server-side;
- tokens must not be exposed to frontend JavaScript unless the provider explicitly requires a safe browser flow;
- revocation/disconnection should invalidate the connector authorization reference.

Conceptual mapping:

```text
KAERVAX Connector
      ↓
Provider Account
      ↓
OAuth Authorization
      ↓
Secret Store
```

---

## 12. Database Contract

Each environment MUST use its own database or an equivalently isolated logical database.

Production database access MUST NOT be embedded in client-side code.

Application code should access the database through the server-side data layer.

Database credentials MUST be treated as production secrets.

Backups MUST follow the same or stronger access controls as the production database.

---

## 13. Production Data Contract

Production data includes:

- real demand signals;
- real customer/lead information;
- offers;
- actions;
- payment references;
- delivery records;
- learning records;
- audit events.

Production data MUST NOT be used as generic development fixtures.

If debugging requires representative data, use:

1. synthetic fixtures;
2. sanitized copies;
3. minimum necessary excerpts;
4. controlled access.

---

## 14. Payment Environment Contract

Payment integrations MUST distinguish test/sandbox from live production mode.

Development/test environments should use provider sandbox/test credentials where available.

Production payment credentials must be isolated and never copied into local environments.

The application MUST make the current payment environment explicit enough to prevent accidental live transactions during testing.

Example configuration concept:

```text
PAYMENT_MODE=test
```

or:

```text
PAYMENT_MODE=live
```

The exact implementation may vary, but accidental mode ambiguity is not acceptable.

---

## 15. Webhook Environment Contract

Webhook endpoints must be environment-specific where the provider supports this.

Example:

```text
TEST       → test webhook endpoint
STAGING    → staging webhook endpoint
PRODUCTION → production webhook endpoint
```

Webhook secrets MUST also be environment-specific.

A valid production webhook signature MUST NOT automatically authorize a test environment to mutate production state.

---

## 16. Deployment Authority

Production deployment MUST be controlled independently from AI coding environments.

Genspark, coding agents, Make.com, E2B/Daytona, local machines, and temporary sandboxes may produce artifacts or execute development tasks, but they are not inherently production authority.

Preferred flow:

```text
CODE
 ↓
TEST
 ↓
REVIEW / VALIDATION
 ↓
BUILD ARTIFACT
 ↓
CONTROLLED DEPLOYMENT
 ↓
PRODUCTION
```

Production credentials MUST not be required merely to build or test application source code.

---

## 17. CI/CD Contract

CI/CD should perform, as applicable:

1. dependency installation;
2. linting;
3. type checking;
4. unit tests;
5. integration tests;
6. security/static checks;
7. build;
8. migration validation;
9. deployment to the intended environment.

CI logs MUST NOT expose secrets.

Production deployment jobs MUST have narrower permissions than repository-wide administration where possible.

---

## 18. Migration Contract

Database schema changes MUST be version-controlled.

Migration sequence:

```text
WRITE MIGRATION
   ↓
TEST LOCALLY
   ↓
RUN IN TEST
   ↓
VALIDATE STAGING
   ↓
BACKUP / RECOVERY CHECK
   ↓
PRODUCTION MIGRATION
```

Destructive migrations require additional review and a recovery strategy.

Never rely on manual undocumented production SQL as the normal migration mechanism.

---

## 19. Access Control Matrix

Conceptual access model:

| Actor | Dev | Test | Staging | Production |
|---|---:|---:|---:|---:|
| Developer | Read/Write | Controlled | Limited | No direct secret access by default |
| Coding Agent | Read/Write code | Test execution | Controlled | No direct production secrets |
| CI Runner | Build/Test | Build/Test | Deploy/Verify as configured | Deploy only with explicit scoped authority |
| Operator | Optional | Optional | Review | Business operations |
| Connector Worker | Test credentials | Test credentials | Staging credentials | Scoped production credentials |
| Public Client | No | No | Limited | Public application surface only |

This matrix is conceptual; deployment tooling may implement equivalent controls.

---

## 20. Make.com / Automation Environment

Make.com or equivalent automation systems may hold provider credentials needed for a specific automation scenario.

However:

- credentials should be scoped to that scenario;
- canonical KAERVAX secrets should not be duplicated unnecessarily;
- critical business state should remain in KAERVAX;
- automation outputs must be normalized before canonical persistence;
- production automation must be separately identifiable from test automation;
- disabling an automation must fail safely.

If a connector can be implemented directly in KAERVAX without unnecessary duplication, the architecture should retain the connector boundary so the automation provider can later be replaced.

---

## 21. AI/Coding-Agent Environment

AI coding agents may receive:

- architecture documents;
- source code;
- test fixtures;
- non-secret configuration;
- repository context.

They MUST NOT receive production secrets merely to implement code.

If an implementation requires a provider credential, use a controlled test/sandbox credential or an execution environment designed for that specific integration.

Never paste production API keys into AI chat prompts.

---

## 22. Secret Leak Response

If a secret is suspected to be exposed:

```text
STOP USE
   ↓
REVOKE / ROTATE
   ↓
IDENTIFY EXPOSURE
   ↓
REMOVE FROM ACTIVE ARTIFACTS
   ↓
AUDIT ACCESS
   ↓
RESTORE SAFE CONFIGURATION
   ↓
DOCUMENT INCIDENT
```

Removing the visible secret from the latest commit is not sufficient if the credential remains valid. The credential itself must be rotated or revoked.

---

## 23. Environment Health Checks

Each environment SHOULD expose a safe health status that verifies:

- application availability;
- database connectivity;
- required non-secret configuration;
- connector availability;
- worker availability.

Health responses MUST NOT expose:

- credentials;
- secret values;
- private tokens;
- sensitive database details.

---

## 24. Required Environment Documentation

The repository MUST document:

- required configuration names;
- which values are secret;
- which environment requires each value;
- where the value is provisioned;
- connector capability dependencies;
- deployment prerequisites.

It MUST NOT document actual secret values.

Recommended supporting files later:

```text
.env.example
DEPLOYMENT.md
SECRET_ROTATION.md
```

Only add these files when implementation needs them; do not create documentation for appearance alone.

---

## 25. MVP Environment Minimum

Before first real commercial production use, KAERVAX MUST have at least:

- isolated production database;
- production secret store/environment variables;
- no committed secrets;
- environment-specific payment configuration;
- environment-specific webhook configuration;
- server-side provider credentials;
- basic logging with secret redaction;
- controlled deployment path;
- backup/recovery mechanism;
- test environment or equivalent isolated validation path.

---

## 26. Acceptance Criteria

This contract passes when:

1. A new developer can configure local development without receiving production secrets.
2. The repository contains no real credentials.
3. Production credentials are isolated from test/staging credentials.
4. Payment mode cannot be confused silently between test and live.
5. Webhook credentials are environment-specific.
6. AI coding agents can implement the system without production credentials.
7. Logs do not expose credential values.
8. Credentials can be rotated without changing canonical business IDs.
9. Production deployment has explicit authority boundaries.
10. Production data is not casually copied into development.
11. Database migrations are version-controlled.
12. A suspected secret leak has a defined revoke/rotate response.

---

## 27. Non-Negotiable Rules

```text
CODE              → Git
SAFE CONFIG       → versioned/documented where appropriate
SECRETS           → environment secret store
PRODUCTION DATA   → production boundary
PAYMENT LIVE MODE → production only
AI AGENT          → no production secrets by default
MAKE.COM          → scoped capability, not canonical truth
Genspark          → implementation environment, not production authority
DEPLOYMENT        → controlled pipeline
LOGS              → redacted
CREDENTIALS       → rotatable/revocable
```

---

## 28. Architecture Lock

This document locks the KAERVAX environment and secret-handling contract.

Future implementation may strengthen isolation, secret management, deployment controls, and auditability, but MUST NOT weaken the separation between development tooling and production authority.

**Next:** `11_TESTING_AND_DELIVERY_CONTRACT.md`
