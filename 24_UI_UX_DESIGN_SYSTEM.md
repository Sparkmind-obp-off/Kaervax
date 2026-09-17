# KAERVAX — UI/UX Design System

**Status:** FOUNDATION / SHARED DESIGN CONTRACT v1.0  
**Purpose:** Menetapkan bahasa visual dan prinsip UX bersama untuk seluruh surface KAERVAX tanpa mengubah business logic atau memaksa implementasi UI sebelum waktunya.

---

## 1. Purpose

Dokumen ini adalah **shared UI/UX contract** untuk KAERVAX.

Tujuannya bukan membuat dashboard yang terlihat canggih. Tujuannya adalah memastikan setiap interface KAERVAX membantu operator:

- memahami keadaan bisnis dengan cepat;
- mengetahui apa yang perlu dilakukan berikutnya;
- membedakan fakta, inferensi, proposal, dan hasil terverifikasi;
- memahami risiko sebelum melakukan tindakan consequential;
- melakukan approval secara sadar;
- melihat status transaksi dan delivery dengan jelas;
- menemukan masalah dan jalur recovery;
- bekerja dari mobile maupun desktop tanpa kehilangan konteks.

KAERVAX harus terasa seperti **operator system**, bukan generic AI dashboard.

Brand architecture menetapkan KAERVAX sebagai brand untuk mengubah demand nyata menjadi outcome bisnis yang dieksekusi. fileciteturn11file0

---

## 2. Design Thesis

```text
SEE CLEARLY
    ↓
UNDERSTAND CONTEXT
    ↓
DECIDE
    ↓
APPROVE WHEN REQUIRED
    ↓
ACT
    ↓
VERIFY
    ↓
LEARN
```

Primary UX principle:

> **Every important screen should answer: “What is happening, why does it matter, and what can I do next?”**

Secondary principle:

> **Clarity over decoration. Evidence over appearance. Action over vanity metrics.**

---

## 3. Primary User

Primary user for the initial system is the **Operator / Owner**.

The interface should assume the operator is:

- managing real work and real customers;
- switching between opportunities, offers, actions, payments, and delivery;
- operating with limited time;
- making consequential decisions;
- needing evidence rather than artificial confidence.

Future roles may include AI Workers, human collaborators, customers, or specialized operators, but they MUST NOT force a different navigation or visual language until validated.

---

## 4. UX Priorities

Order of priority:

1. Business clarity
2. Next action clarity
3. Trust and evidence
4. Safety / approval visibility
5. Speed of operation
6. Error recovery
7. Accessibility
8. Visual polish

Do not reverse this order for visual appeal.

---

## 5. Information Hierarchy

Every meaningful surface should follow this hierarchy where applicable:

```text
1. WHAT — object / situation
2. STATUS — current state
3. WHY — relevant context / evidence
4. VALUE / RISK — why it matters
5. NEXT ACTION — what can be done
6. HISTORY — what already happened
7. DETAILS — secondary information
```

Primary action should be visually and semantically obvious.

Secondary actions should not compete with the primary action.

Destructive or consequential actions require explicit confirmation and clear consequences.

---

## 6. Navigation Model

The canonical product surfaces follow the implementation blueprint:

```text
Command / Capture
Demand Inbox
Opportunities
Offer Workspace
Action Center
Transactions
Delivery
Learning
```

Navigation rules:

- Keep the primary navigation stable.
- Do not create a new top-level section for every feature.
- Prefer contextual detail panels/pages over navigation sprawl.
- Show object status in navigation when useful, but avoid noisy badge counts.
- Preserve operator context when moving from one object to a related object.
- Deep links should open the relevant object in its current state.

The information architecture must follow the business domain, not the underlying database tables.

---

## 7. Layout Principles

### 7.1 Operator-first

The default workspace should prioritize current work over decorative summaries.

### 7.2 Dense but readable

KAERVAX may present more operational information than a consumer application, but density must be controlled through hierarchy, whitespace, grouping, and progressive disclosure.

### 7.3 One primary decision per context

A screen may contain many facts but should make the most important next decision obvious.

### 7.4 Progressive disclosure

Keep secondary technical metadata available without forcing it into the primary reading path.

### 7.5 Stable spatial relationships

Repeated objects such as status, owner, timestamp, evidence, and next action should appear in predictable locations.

---

## 8. Visual Language

KAERVAX does not yet lock a final brand color palette in this contract.

Implementation MUST use semantic design tokens rather than scattering literal colors throughout components.

Required semantic token categories:

```text
--color-bg
--color-surface
--color-surface-muted
--color-text
--color-text-muted
--color-border
--color-primary
--color-primary-contrast
--color-success
--color-warning
--color-danger
--color-info
--color-focus
```

If a final brand palette is introduced later, map it to these semantic tokens rather than rewriting component semantics.

Visual direction:

- restrained;
- professional;
- technical but approachable;
- high information clarity;
- minimal decorative gradients;
- minimal ornamental illustration;
- no fake “AI magic” visual effects;
- no visual treatment that implies certainty beyond available evidence.

---

## 9. Typography

Typography should prioritize fast scanning and clear hierarchy.

Required hierarchy:

```text
Page title
Section heading
Object / record title
Primary body
Secondary metadata
Helper / system text
```

Rules:

- Use one primary UI type family unless the brand later defines otherwise.
- Avoid excessive font-weight variation.
- Use tabular/numeric-friendly presentation for financial values where supported.
- Do not communicate meaning through font size alone.

---

## 10. Spacing, Radius, Elevation

Use a consistent spacing scale.

Recommended baseline:

```text
4 / 8 / 12 / 16 / 24 / 32 / 48
```

Component spacing should use tokens, not arbitrary per-component values.

Border radius should be restrained and consistent. Avoid excessive pill-shaped UI unless the element is genuinely a tag, status, filter, or compact control.

Elevation should communicate hierarchy, not decoration.

Prefer borders and surface separation over heavy shadows.

---

## 11. Component Rules

Core reusable components should include, as needed:

- Button
- Icon Button
- Input
- Textarea
- Select
- Search
- Filter
- Tabs
- Badge / Status
- Alert
- Card / Panel
- Table / Data List
- Timeline
- Drawer / Modal
- Confirmation Dialog
- Empty State
- Loading State
- Error State
- Evidence Block
- Approval Block
- Activity / Audit Item
- Metric / Value Block

Component behavior MUST be consistent across product surfaces.

Do not create one-off visual variants when an existing semantic component can represent the state.

---

## 12. Status Language

Status is a first-class part of KAERVAX UX.

Where possible, status should use:

```text
Label + visual distinction + optional explanation
```

Do not rely on color alone.

Core business state concepts include:

```text
Draft
Pending / Awaiting Approval
Ready
Executing
Completed
Failed
Partial
Needs Review
Paid
Refunded
Delivered
Accepted
Issue
Archived
```

The exact allowed state values remain governed by the domain contracts. UI MUST NOT invent a state that does not exist in the canonical domain.

---

## 13. Evidence States

KAERVAX distinguishes evidence quality.

The interface should make these states understandable:

```text
OBSERVED
INFERRED
GENERATED
VERIFIED
```

UX rules:

- Observed information should show its source when useful.
- Inferred information must not look like a confirmed fact.
- Generated content must be recognizable as generated/proposed content where relevant.
- Verified information may receive stronger confirmation treatment, but verification must come from the underlying business/process evidence.

Never use polished UI to hide uncertainty.

---

## 14. Approval & Consequential Action UX

Consequential actions require an explicit approval experience.

Canonical interaction:

```text
INTENT
  ↓
PROPOSAL
  ↓
CONTEXT + RISK
  ↓
APPROVAL
  ↓
EXECUTION
  ↓
RESULT
  ↓
AUDIT
```

Approval UI should clearly show:

- what will happen;
- which object/account/provider is affected;
- relevant amount or scope;
- important assumptions/evidence;
- irreversible or external consequences;
- who is approving;
- the exact action being approved.

Do not hide approval inside a generic “Continue” button.

Destructive actions should use explicit labels such as `Reject`, `Refund`, `Cancel`, or `Delete`, not ambiguous labels such as `Continue`.

---

## 15. Loading, Empty, Error, Partial & Recovery States

Every major async surface must define at least:

### Loading

Explain what is being loaded or processed when the wait is meaningful.

### Empty

Explain why the surface is empty and provide the most useful next action.

Bad:

> No data.

Better:

> Belum ada demand yang masuk. Capture demand pertama untuk memulai.

### Error

State:

- what failed;
- whether the user's data/action was saved;
- whether retry is safe;
- what the user can do next.

### Partial

If only part of an operation succeeded, show exactly which part succeeded and which part requires review.

### Needs Review

Make the reason and next decision visible.

Never show a generic success message when the underlying operation is only partially complete.

---

## 16. Transaction UX

Transactions involve real money and therefore require stronger clarity than ordinary records.

Transaction surfaces should make visible, where applicable:

- order / transaction reference;
- offer version;
- expected amount;
- payment attempt;
- payment status;
- authoritative verification state;
- provider reference where appropriate;
- reconciliation state;
- refund / issue state;
- next fulfillment step.

Rules:

- `PAID` must represent verified payment evidence, not a UI assumption.
- Client-side redirect or screenshot is not sufficient evidence of payment.
- Payment status and fulfillment status must remain distinct.
- Customer-facing payment language must be consistent with the business identity contract.

---

## 17. Surface-Specific UX Rules

### 17.1 Command / Capture

Purpose: quickly express or capture a business intention.

Priorities:

- low input friction;
- clear interpretation;
- editable structured result;
- visible source/context;
- safe confirmation before consequential action.

Voice can eventually map into the same command model but must not create a separate business logic path.

### 17.2 Demand Inbox

Purpose: review raw and normalized demand.

Show:

- source;
- captured time;
- demand summary;
- evidence state;
- qualification state;
- relevant next action.

Avoid turning every signal into an opportunity automatically.

### 17.3 Opportunity Board

Purpose: decide which qualified opportunities deserve attention.

Show:

- problem / demand;
- evidence;
- qualification;
- potential offer direction;
- status;
- operator decision.

Do not present a score as objective truth. Explain what the score represents and its evidence/limitations.

### 17.4 Offer Workspace

Purpose: construct and review the actual customer offer.

Show clearly:

- offer name;
- outcome/promise;
- scope;
- exclusions;
- price;
- timing;
- customer inputs;
- delivery boundary;
- version;
- approval state.

The primary CTA should reflect the current lifecycle state.

### 17.5 Action Center

Purpose: manage outbound or consequential actions.

Show:

- proposed action;
- target;
- connector/provider;
- evidence/context;
- approval state;
- execution state;
- result;
- retry/recovery option where safe.

No hidden autonomous send/publish/payment behavior.

### 17.6 Transactions

Purpose: know what was requested, paid, failed, refunded, or needs reconciliation.

Optimize for correctness and traceability rather than visual analytics.

### 17.7 Delivery

Purpose: ensure a paid commitment becomes delivered value.

Show:

- customer/order;
- scope;
- delivery owner;
- progress;
- deliverable/reference;
- customer acceptance or issue;
- next action.

### 17.8 Learning

Purpose: convert outcomes into better future decisions.

Show:

- outcome;
- evidence;
- what worked / did not work;
- confidence/limitations;
- recommended learning;
- relation to future demand or offers.

Do not manufacture insights when sample size is too small.

---

## 18. Copy & Language

Default customer-facing/product UI language for the initial Indonesian market should be **Bahasa Indonesia yang jelas dan natural**.

Technical English terms may remain in developer/admin contexts where they improve precision, but customer-facing copy should not feel machine-translated.

Copy principles:

- direct;
- short;
- concrete;
- honest;
- action-oriented;
- no hype;
- no fake urgency;
- no unsupported promises.

Prefer:

> Pembayaran belum terverifikasi.

over:

> Payment failed magically. Please try again.

Prefer:

> Menunggu persetujuan Anda.

over:

> AI is preparing the next step.

---

## 19. Accessibility & Responsive Behavior

Minimum requirements:

- keyboard-operable interactive controls;
- visible focus state;
- semantic HTML where applicable;
- accessible labels for controls and inputs;
- sufficient text/background contrast;
- color is never the only status indicator;
- touch targets must be comfortably usable on mobile;
- forms should preserve entered data when recoverable;
- responsive layouts must not hide critical business information solely because the viewport is narrow;
- tables should degrade into readable responsive patterns rather than forcing unusable horizontal layouts where practical.

Accessibility is part of functional quality, not a visual afterthought.

---

## 20. Mobile-First Operational Rules

KAERVAX should remain useful from a mobile browser because operator work may happen away from a desktop.

Mobile priorities:

1. current status;
2. next action;
3. customer / object identity;
4. approval / risk;
5. essential evidence;
6. secondary details.

Avoid dense multi-column dashboards that become unreadable on mobile.

Use drawers, stacked sections, tabs, or progressive disclosure where appropriate.

---

## 21. Trust & Commercial UX

Because KAERVAX is intended to operate with real customers and real money, the interface must reinforce verifiable trust.

Customer-facing surfaces should make it understandable:

- what KAERVAX is;
- who operates it where applicable;
- what the customer is buying;
- price;
- payment path;
- what happens after payment;
- support path;
- terms/privacy/refund information where applicable;
- transaction/order reference.

Do not use:

- fake testimonials;
- fake badges;
- fake counters;
- fabricated customer logos;
- artificial urgency;
- invented guarantees;
- misleading “AI verified” labels.

Trust comes from clear evidence and accountable operations.

---

## 22. Visual Anti-Patterns

The following are explicitly discouraged unless evidence later justifies them:

- generic “AI dashboard” layouts;
- excessive glassmorphism;
- excessive gradients;
- animated decoration with no operational value;
- giant hero sections inside operator workflows;
- vanity KPI walls;
- dozens of cards with equal visual weight;
- arbitrary status colors;
- hidden approval steps;
- modal overload;
- unexplained AI scores;
- fake real-time indicators;
- fake activity feeds;
- decorative charts without decisions attached;
- UI that looks complete while business data is still mocked.

---

## 23. Design System Implementation Rules

### MUST

- use semantic tokens;
- reuse shared components;
- preserve canonical domain states;
- preserve evidence distinctions;
- expose approval boundaries;
- expose meaningful errors/recovery;
- keep business logic outside presentation components;
- make important state transitions traceable;
- maintain responsive behavior.

### MUST NOT

- invent business state in the UI;
- hard-code legal/business identity values that are not verified;
- put secrets in frontend code;
- infer payment success from client-side behavior;
- bypass authorization because an action is initiated from UI;
- create a second business logic implementation inside the frontend;
- redesign the product architecture solely for visual convenience.

The Business Identity contract explicitly requires missing or inconsistent identity values to follow `STOP → FLAG → RESOLVE → VERIFY → CONTINUE`. fileciteturn10file0

---

## 24. Relationship to Implementation Roadmap

This design contract is a **shared prerequisite**, not a reason to expand Sprint 1.

```text
UI/UX DESIGN CONTRACT
        ↓
Shared component / interaction rules
        ↓
Domain implementation
        ↓
Surface implementation
        ↓
Commercial workflow
```

Sprint 1 — System Foundation remains focused on technical foundation.

Do not build the full Demand Inbox, Opportunity Board, Offer Workspace, Action Center, Transaction, Delivery, or Learning UI during Sprint 1 merely because this document exists.

The full UI should be implemented incrementally when its corresponding business/domain capabilities exist.

---

## 25. Design Acceptance Checklist

Before a major UI surface is considered complete:

- [ ] Purpose of the surface is clear.
- [ ] Primary user/task is clear.
- [ ] Current status is visible.
- [ ] Next action is obvious.
- [ ] Evidence state is represented where relevant.
- [ ] Approval/risk is explicit for consequential actions.
- [ ] Loading/empty/error/partial/recovery states exist.
- [ ] Domain state is not invented by UI.
- [ ] Customer/business identity is sourced from canonical configuration.
- [ ] Responsive behavior is usable.
- [ ] Keyboard/focus/accessibility baseline is met.
- [ ] No fake data is presented as real.
- [ ] No secrets or sensitive credentials are exposed.

---

## 26. Final Rule

> **KAERVAX UI should help the operator see reality, make a decision, take the right action, verify the result, and learn — with as little visual noise as possible.**

The interface is not the product's proof.

The interface is the control surface through which the real business system is operated safely.
