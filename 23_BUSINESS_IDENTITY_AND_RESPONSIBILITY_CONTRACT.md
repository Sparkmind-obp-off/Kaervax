# KAERVAX — Business Identity & Responsibility Contract

**Status:** Production Business Contract v1.1  
**Purpose:** Menetapkan identitas bisnis, hubungan brand–entitas hukum–payment identity, dan batas tanggung jawab sebelum KAERVAX digunakan untuk transaksi komersial nyata.

---

## 1. Purpose

Dokumen ini menjadi **source of truth internal** untuk menjawab satu pertanyaan dasar:

> **Ketika seseorang berinteraksi dan membayar KAERVAX, sebenarnya ia bertransaksi dengan siapa, melalui sistem apa, dan siapa yang bertanggung jawab?**

Dokumen ini bukan pengganti nasihat hukum, perjanjian customer, kebijakan privasi, atau kewajiban registrasi/perizinan. Dokumen ini menghubungkan seluruh layer tersebut agar identitas yang ditampilkan konsisten.

---

## 2. Identity Model

KAERVAX harus memisahkan empat identitas berikut:

```text
BRAND IDENTITY
KAERVAX
      ↓
OPERATING / LEGAL ENTITY
[Entitas hukum yang benar-benar mengoperasikan bisnis]
      ↓
COMMERCIAL IDENTITY
[Offer, invoice, terms, support, customer communication]
      ↓
PAYMENT IDENTITY
[Duitku merchant/project + rekening settlement sesuai verifikasi]
```

Di samping empat identitas bisnis di atas, KAERVAX juga harus menyimpan **Responsible Person Identity** secara terpisah:

```text
RESPONSIBLE PERSON IDENTITY
[Nama legal orang yang berwenang/bertanggung jawab]
      ↓
berhubungan dengan
      ↓
OPERATING / LEGAL ENTITY
```

Aturan utama:

- **KAERVAX** adalah brand/customer-facing identity.
- Entitas hukum yang benar harus dinyatakan secara akurat pada tempat yang relevan.
- Nama brand tidak boleh dipresentasikan sebagai badan hukum jika secara hukum bukan badan hukum tersebut.
- Nama pada invoice, checkout, payment notification, dan bukti transaksi harus dapat dijelaskan hubungannya dengan KAERVAX.
- Identitas personal owner/responsible person **bukan pengganti legal entity** ketika transaksi secara hukum dijalankan oleh badan usaha.
- Responsible person boleh dicatat sebagai identitas internal dan/atau ditampilkan pada disclosure tertentu jika memang diwajibkan atau relevan, tetapi tidak boleh mengaburkan pihak yang sebenarnya berkontrak dengan customer.

---

## 3. Canonical Business Identity

Sebelum production, field berikut **MUST** diisi dari data legal/business yang benar:

| Field | Canonical Value | Classification | Required Before Live Transaction |
|---|---|---|---|
| Brand Name | KAERVAX | Public | YES |
| Official Domain | kaervax.biz.id / production domain yang ditetapkan | Public | YES |
| Legal Entity Name | `[TBD — exact legal name from official document]` | Public/Restricted as applicable | YES |
| Legal Entity Type | `[TBD — PT / other verified form]` | Public/Restricted as applicable | YES |
| Business Address | `[TBD — exact registered/business address]` | Restricted; disclose only as required/appropriate | YES where required |
| Official Business Email | `[TBD — e.g. hello@kaervax.biz.id if verified as official]` | Public | YES |
| Official Support Channel | `[TBD — verified business channel]` | Public | YES |
| Responsible Person — Legal Name | `[TBD — exact legal name]` | Internal/Restricted; public only where required/appropriate | YES internally |
| Tax/Business Identifiers | `[TBD — NIB/NPWP/etc., exact values from authoritative documents]` | Restricted | YES where required |
| Duitku Merchant Identity | `[TBD — verified merchant/project identity]` | Internal/Customer disclosure as applicable | YES |
| Settlement Account | `[TBD]` | Restricted | YES |
| Customer Invoice Identity | `[TBD — exact issuer identity]` | Customer-facing | YES |

**No placeholder may remain in customer-facing production surfaces.**

### 3.1 Verified Personal Identity

If the verified responsible person's legal name is **Haidar Faras Muhadidzib**, it should be stored in the Responsible Person field exactly as it appears on the authoritative legal/business document.

Do **not** automatically use the personal name as the public KAERVAX seller name. The public relationship should follow the actual legal structure.

### 3.2 Verified Legal Entity

If the authoritative business documents confirm the legal entity as **PT Waskita Cakrawarti Digital**, the exact registered name may be recorded as the Legal Entity Name.

Until the current official business document/NIB confirms that exact name, the system MUST treat it as **unverified** and MUST NOT hard-code or publicly claim it as the legal operator.

The same rule applies to the entity type, registered address, NIB, NPWP, and other legal identifiers.

---

## 4. Brand-to-Legal Relationship

Customer-facing language must use the legally correct relationship.

Preferred pattern when applicable:

> **KAERVAX is a brand operated by [Legal Entity Name].**

Do not use wording that falsely implies:

> KAERVAX = [Legal Entity Name]

unless KAERVAX is in fact the registered legal entity name.

If the verified structure is:

```text
KAERVAX
   ↓ brand
PT Waskita Cakrawarti Digital
   ↓ legal/operator entity
Haidar Faras Muhadidzib
   ↓ responsible person
```

then those roles MUST remain distinct in system data and customer-facing language.

The exact public wording must be synchronized across:

- website footer/about page;
- offer page;
- checkout;
- invoice/receipt;
- Terms of Service;
- Privacy Policy;
- refund/issue policy;
- customer support messages;
- payment-related notifications where controllable.

---

## 5. Commercial Responsibility

### KAERVAX / Operating Entity is responsible for

Within the agreed scope:

- accurately presenting the offer;
- communicating scope, price, timing, and exclusions;
- receiving and recording customer orders;
- maintaining the internal transaction record;
- using the authorized payment path;
- verifying payment status using authoritative payment evidence;
- delivering the purchased scope;
- communicating material delivery issues;
- handling eligible refund/issue requests according to the applicable terms;
- maintaining relevant commercial evidence and audit records.

### Customer is responsible for

- accuracy and legality of information about its own business/product/service;
- rights to assets, images, text, trademarks, and other materials supplied;
- timely provision of required inputs;
- payment of the agreed amount;
- decisions and business obligations outside KAERVAX's agreed scope;
- fulfillment obligations that were explicitly retained by the customer.

No party may silently inherit responsibilities that were not communicated or agreed.

---

## 6. Payment Identity Contract

Duitku is treated as the **payment processing/collection layer**, not as the owner of KAERVAX's commercial truth.

KAERVAX MUST maintain its own internal:

- order/transaction ID;
- customer reference;
- offer version;
- expected amount;
- payment attempt;
- payment status;
- provider transaction/reference ID;
- verification timestamp;
- reconciliation state;
- refund/issue state when applicable.

**Rule:**

```text
Payment Gateway Evidence
        ↓
Verification
        ↓
KAERVAX Transaction State
        ↓
Fulfillment Authorization
```

A customer screenshot, redirect result, or client-side claim alone MUST NOT set a transaction to `PAID`.

---

## 7. Customer Verification Experience

A customer should be able to answer these questions without contacting the owner personally:

1. What is KAERVAX?
2. Who operates it?
3. What exactly am I buying?
4. How much does it cost?
5. How do I pay?
6. What happens after payment?
7. Who do I contact if something goes wrong?
8. Where can I read the applicable terms/privacy/refund information?
9. How can I identify my order/transaction?

Minimum customer-facing trust signals:

- official domain;
- clear business/brand identity;
- clear offer scope;
- clear price;
- authorized payment path;
- order/transaction reference;
- support contact;
- applicable terms;
- privacy notice where personal data is processed;
- clear delivery/issue/refund handling.

Trust must come from **verifiable information**, not exaggerated claims, fake badges, fake testimonials, or artificial urgency.

---

## 8. Customer-Facing Disclosure Layer

The following surfaces should eventually expose the appropriate subset of canonical identity information:

### Public Website

- KAERVAX brand;
- operator/legal entity disclosure as required/appropriate;
- official contact;
- Terms;
- Privacy;
- refund/issue information;
- relevant business information.

### Offer Page

- provider/brand identity;
- scope;
- exclusions;
- price;
- delivery expectation;
- payment path;
- support/issue path;
- link to applicable terms.

### Checkout

- product/offer name;
- amount;
- customer identity fields required for fulfillment;
- order/reference ID;
- applicable terms acknowledgement where required;
- payment provider information.

### Post-Payment

- order/transaction reference;
- payment status;
- next step;
- onboarding instructions;
- support contact;
- expected delivery path.

---

## 9. Terms / Privacy / Refund Relationship

These documents are separate customer-facing instruments but MUST inherit identity from this contract.

```text
23 Business Identity & Responsibility Contract
              ↓
      Customer Disclosures
         ↙    ↓     ↘
      Terms  Privacy  Refund/Issue
              ↓
        Checkout / Payment
              ↓
        Transaction / Delivery
```

The documents must not contain conflicting:

- legal entity names;
- contact channels;
- payment identity;
- responsibility statements;
- refund authority;
- data-controller/operator identity where applicable.

---

## 10. PSE / Compliance Check

KAERVAX MUST perform a current compliance review before the production system is opened to users for applicable electronic commerce/transaction functionality.

Regulatory applicability must be verified against the actual business model, legal entity, website/app functionality, payment flow, and data processing activities. KAERVAX must **verify its specific obligation rather than assume either exemption or obligation without review**.

Compliance review MUST cover at minimum:

- PSE applicability and registration status;
- business licensing/OSS status relevant to the actual activity;
- personal-data protection obligations;
- consumer-facing disclosures;
- payment/merchant requirements;
- tax/invoicing requirements applicable to the transaction model;
- sector-specific rules if KAERVAX later serves regulated sectors;
- recordkeeping and incident/complaint handling.

---

## 11. Production Gate

KAERVAX MUST NOT declare the commercial system production-ready until the following are true:

### Identity

- [ ] Legal entity identity verified from authoritative business documents.
- [ ] Brand-to-entity relationship approved.
- [ ] Official domain/contact verified.
- [ ] Responsible operator identified internally.
- [ ] Personal identity is separated from legal-entity identity.

### Payment

- [ ] Duitku merchant identity verified.
- [ ] Production project/credentials configured through secret management.
- [ ] Settlement destination verified.
- [ ] Customer-visible payment identity is explainable.

### Customer Disclosure

- [ ] Offer identity and scope are clear.
- [ ] Terms are available.
- [ ] Privacy disclosure is available where required.
- [ ] Refund/issue handling is defined.
- [ ] Support channel is operational.

### Compliance

- [ ] PSE applicability reviewed.
- [ ] Required PSE registration completed or a documented, legally reviewed basis for the applicable status exists.
- [ ] Relevant business licensing reviewed.
- [ ] Data protection requirements reviewed.
- [ ] Payment/merchant requirements satisfied.

### Transaction

- [ ] Internal transaction ID exists.
- [ ] Payment verification is authoritative.
- [ ] Reconciliation path exists.
- [ ] Delivery responsibility is assigned.
- [ ] Issue/refund path is executable.
- [ ] Evidence can be retained without exposing unnecessary personal data.

---

## 12. Information Classification

Not every business/legal detail belongs on the public website.

### Public / Customer-Facing

- brand identity;
- relevant legal/operator identity;
- official contact;
- terms/privacy/refund information;
- offer and price;
- transaction/order reference where appropriate.

### Internal / Restricted

- responsible person's private identifiers;
- NIB/NPWP and supporting legal documents unless disclosure is required;
- registered address where not needed publicly;
- API keys;
- merchant secret/API credentials;
- private account credentials;
- internal risk rules;
- sensitive reconciliation data;
- private customer data beyond what is necessary;
- internal incident details not required for customer communication.

### Never Public

- payment API secrets;
- database credentials;
- access tokens;
- signing secrets;
- private keys;
- authentication recovery secrets;
- government-issued personal identifiers unless a specific legal requirement and approved disclosure process applies.

---

## 13. Implementation Contract

Implementation MUST consume this document as the canonical identity source.

No developer, AI agent, connector, or UI component may invent business identity values.

Required pattern:

```text
Authoritative Business / Legal Documents
              ↓
Canonical Business Identity
              ↓
Configuration / Environment
              ↓
Application / Checkout / Invoice
              ↓
Customer Communication
```

If a required identity value is missing or inconsistent:

```text
STOP → FLAG → RESOLVE → VERIFY → CONTINUE
```

Do not silently substitute a personal name, guessed company name, test merchant, or placeholder in production.

---

## 14. Relationship to Existing KAERVAX Contracts

This document complements, rather than replaces:

- `01_BRAND_ARCHITECTURE.md`
- `03_BUSINESS_ARCHITECTURE.md`
- `08_SECURITY_OWNERSHIP_CONTRACT.md`
- `10_ENVIRONMENT_AND_SECRETS_CONTRACT.md`
- `14_CORE_COMMERCIAL_LOOP.md`
- `15_REAL_TRANSACTION_PROTOCOL.md`
- `16_CUSTOMER_JOURNEY_AND_FUNNEL.md`
- `17_COMMERCIAL_RESPONSIBILITY_AND_OPERATIONS.md`
- `18_PAYMENT_RECONCILIATION_REFUND_CONTRACT.md`
- `19_COMMERCIAL_EVIDENCE_ARCHITECTURE.md`
- `20_FIRST_TRANSACTION_RUNBOOK.md`
- `21_OFFER_DESIGN_AND_COMMERCIAL_PACKAGING.md`
- `22_PRICING_ARCHITECTURE.md`

It becomes the identity anchor for their implementation.

---

## 15. Final Rule

> **KAERVAX must always make it clear who is selling, who receives the payment, what the customer is buying, who is responsible for delivery, and where the customer can seek help.**

The objective is not to look corporate.

The objective is to make the commercial relationship **clear, verifiable, accountable, and safe enough to operate with real customers and real money.**
