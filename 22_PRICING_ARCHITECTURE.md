# KAERVAX — Pricing Architecture

**Status:** Commercial Pricing v1 — First Real Transaction  
**Purpose:** Menentukan harga awal secara terukur untuk offer pertama KAERVAX, termasuk unit economics, scope protection, payment amount, dan aturan perubahan harga.

---

# 1. PRICING OBJECTIVE

Harga pertama KAERVAX bukan dimaksudkan untuk memaksimalkan revenue sejak hari pertama.

Tujuan utama adalah mendapatkan **real paid transaction** dengan harga yang:

- cukup rendah untuk mengurangi friction;
- cukup tinggi untuk membuktikan willingness-to-pay;
- cukup sehat untuk membayar waktu dan biaya delivery;
- tidak membuat KAERVAX menjanjikan scope yang tidak sanggup dipenuhi;
- dapat diuji dan dinaikkan berdasarkan evidence.

---

# 2. FIRST PRICE RECOMMENDATION

## KAERVAX Revenue Launch Sprint

### Launch Price

**Rp1.500.000 / project**

Harga ini berlaku untuk **fixed-scope first commercial offer**.

Harga belum termasuk biaya pihak ketiga yang secara eksplisit diperlukan dan tidak termasuk dalam scope, misalnya paid ads, domain/hosting tertentu, atau layanan SaaS berbayar milik customer.

Tidak ada biaya tersembunyi.

---

# 3. WHY RP1.500.000

Harga diposisikan sebagai titik uji awal, bukan klaim bahwa Rp1.500.000 adalah harga pasar universal.

Rasionalnya:

1. cukup konkret untuk menghasilkan keputusan pembelian nyata;
2. tidak terlalu kecil sehingga transaksi dapat dianggap sekadar nominal simbolis;
3. memungkinkan delivery productized service dengan scope terbatas;
4. masih dapat dijangkau oleh sebagian target UMKM/service business;
5. memberi ruang untuk mengukur waktu delivery dan gross contribution sebelum menaikkan harga.

Harga ini harus dianggap sebagai **commercial hypothesis V1**.

---

# 4. WHAT CUSTOMER BUYS

Customer membayar:

```text
ONE COMMERCIAL SYSTEM SETUP
```

bukan sekadar:

- jumlah halaman;
- jumlah jam coding;
- akses ke AI;
- source code semata.

Nilai offer berada pada hasil terintegrasi:

```text
OFFER
→ CONVERSION ASSET
→ LEAD / ORDER FLOW
→ PAYMENT PATH
→ DELIVERY HANDOFF
```

---

# 5. INCLUDED VALUE

Dengan Rp1.500.000 customer mendapatkan scope dalam `21_OFFER_DESIGN_AND_COMMERCIAL_PACKAGING.md`:

- offer structuring;
- satu conversion asset;
- satu lead/order flow;
- payment path;
- delivery handoff;
- handover;
- dua revision rounds;
- target delivery 5–7 business days setelah input lengkap.

---

# 6. UNIT ECONOMICS TARGET

Pricing harus dievaluasi terhadap:

```text
REVENUE
− DIRECT DELIVERY COST
− PAYMENT / PLATFORM COST
− EXTERNAL TOOL COST
− REFUND / ISSUE RESERVE
− VARIABLE OPERATING COST
= CONTRIBUTION
```

Untuk V1, KAERVAX harus mencatat actual values setelah setiap project.

Minimal metrics:

- price paid;
- payment fee;
- external tool cost;
- hours spent;
- delivery days;
- revision count;
- issue count;
- refund amount if any;
- contribution estimate.

Jangan menganggap margin sehat sebelum actual delivery cost diketahui.

---

# 7. TIME ECONOMICS

Target internal delivery effort:

**maksimum sekitar 8–12 jam kerja aktif** untuk standard project V1, tidak termasuk waktu menunggu customer.

Jika actual effort konsisten jauh di atas target, KAERVAX harus memilih salah satu:

1. mengurangi scope;
2. meningkatkan price;
3. meningkatkan automation;
4. memecah offer menjadi tier baru.

Jangan mempertahankan harga rendah sambil menerima scope tanpa batas.

---

# 8. PRICE FLOOR

Untuk V1, jangan menerima project dengan total scope yang secara realistis membutuhkan custom implementation besar tetapi tetap dipaksa masuk Rp1.500.000.

Price floor bukan hanya angka.

Price floor ditentukan oleh:

```text
DELIVERY EFFORT
+ THIRD-PARTY COST
+ RISK
+ RESPONSIBILITY
+ REQUIRED SUPPORT
```

Jika requirement melampaui fixed-scope offer, customer harus menerima change request atau offer berbeda.

---

# 9. OPTIONAL FUTURE TIERS

Tier berikut **belum menjadi default launch offer**.

Setelah evidence tersedia, pricing dapat berkembang menjadi:

### Starter

Untuk kebutuhan setup paling sederhana.

### Growth

Untuk setup + automation/integration yang lebih luas.

### Managed

Untuk ongoing optimization/maintenance.

Jangan menjual ketiga tier sebelum ada evidence bahwa segmentasi tersebut dibutuhkan.

---

# 10. NO UNLIMITED PRICING

Hindari wording:

- unlimited revisions;
- unlimited integrations;
- unlimited support;
- everything you need;
- guaranteed sales;
- guaranteed leads.

Fixed price membutuhkan fixed scope.

---

# 11. PAYMENT POLICY

Default:

**100% payment before project execution begins.**

Reason:

- productized scope;
- small project value;
- simple operational model;
- avoids financing customer work from KAERVAX cashflow;
- makes transaction verification clean.

Execution begins only after payment is verified according to the payment contract.

---

# 12. PAYMENT GATEWAY

For KAERVAX's first controlled transaction, the checkout/payment path may use **Duitku** through the authorized merchant configuration.

KAERVAX must preserve:

```text
ORDER CREATED
→ PAYMENT REQUESTED
→ PAYMENT PENDING
→ PROVIDER VERIFICATION
→ PAID
→ DELIVERY ENABLED
```

A browser redirect alone is not payment verification.

---

# 13. REFUND PRINCIPLE

Refund terms must be explicit before payment.

If customer cancels before work begins, refund handling follows the published commercial terms.

After work begins, refund eligibility depends on:

- work already performed;
- customer-provided inputs;
- scope status;
- applicable terms;
- documented service issue.

Do not promise "no refund under any circumstance" without appropriate legal/commercial review.

---

# 14. CHANGE REQUEST PRICING

Anything outside the approved scope must be separately quoted.

Examples:

- additional landing page;
- new integration;
- major redesign;
- new product funnel;
- custom dashboard;
- custom application;
- ongoing management.

Do not silently absorb scope expansion.

---

# 15. PRICE EXPERIMENTS

Price changes are experiments, not random discounts.

Example future sequence:

```text
V1 = Rp1.500.000
        ↓
REAL CUSTOMER EVIDENCE
        ↓
ANALYZE CONVERSION + DELIVERY COST
        ↓
V2 PRICE HYPOTHESIS
```

Each price version records:

- effective date;
- offer version;
- price;
- target segment;
- conversion evidence;
- delivery economics;
- reason for change.

---

# 16. DISCOUNT POLICY

Do not use permanent artificial discounts.

A launch discount may be used only if:

- explicitly labeled;
- time/quantity bounded;
- recorded internally;
- not falsely presented as a normal price.

For the first commercial validation, the cleaner default is to sell the offer at the approved launch price rather than manipulate pricing with fake urgency.

---

# 17. COMMERCIAL METRICS

Track:

### Acquisition

- qualified prospects;
- offer views;
- offer conversations;
- checkout starts.

### Transaction

- payment attempts;
- successful payments;
- failed payments;
- refunds;
- payment value.

### Delivery

- delivery time;
- hours spent;
- revisions;
- issue rate;
- acceptance.

### Economics

- revenue;
- direct cost;
- contribution;
- effective hourly economics.

### Learning

- objections;
- requested features;
- reasons for rejection;
- reasons for purchase;
- repeat demand.

---

# 18. COMMERCIAL VALIDATION THRESHOLD

The first paid transaction is evidence that:

> at least one buyer completed the commercial path at the approved price.

It is **not** evidence of:

- product-market fit;
- repeatability;
- scalable acquisition;
- sustainable profitability;
- universal market demand.

Those require additional transactions and evidence.

---

# 19. PRICE GOVERNANCE

Pricing cannot be changed silently inside the UI or checkout.

Approved price must be represented as versioned commercial configuration.

Example:

```text
OFFER: KAERVAX_REVENUE_LAUNCH_SPRINT
VERSION: V1
PRICE: IDR 1,500,000
CURRENCY: IDR
PAYMENT: FULL_PREPAYMENT
STATUS: ACTIVE_FOR_VALIDATION
```

Historical transactions retain their original price/version.

---

# 20. FINAL PRICING DECISION V1

**Offer:** KAERVAX Revenue Launch Sprint  
**Launch price:** **Rp1.500.000**  
**Payment:** 100% upfront  
**Scope:** fixed  
**Delivery target:** 5–7 business days after required input is complete  
**Revisions:** 2 rounds  
**Payment path:** Duitku-capable authorized checkout  
**Commercial status:** validation hypothesis pending real buyer evidence

This pricing decision should remain stable for the initial validation window unless a documented operational or commercial reason requires a version change.

---

# 21. CORE RULE

> **The first price is not chosen to look impressive. It is chosen so KAERVAX can make a clear promise, collect real money, deliver the promised result, measure the economics, and learn from an actual buyer.**
