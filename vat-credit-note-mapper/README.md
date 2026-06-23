# SDI Credit Note Mapper — IT VAT Exemption

A **single, standalone HTML application** that reads a per‑seller *IT VAT Exemption credit‑note
calculation* file and populates the master **SDI / EVA VAT‑Compliance template**, automatically
generating the paired **Credit (TD04)** and **Rebill (TD01)** lines for every invoice — while
preserving every formula, number format, column width, merged cell and the template's external
`[1]FX rates` link.

* **File:** [`index.html`](./index.html) — open it in any modern browser. No install, no server, no internet required.
* **Everything runs locally** in the browser. No data is ever uploaded. The ZIP/XLSX engine
  ([fflate](https://github.com/101arrowz/fflate)) is inlined, so it also works **fully offline / behind a firewall**.

---

## 1. What it does

| | |
|---|---|
| **Input – Source** | Per‑seller calculation sheet (`.csv` or `.xlsx`). Contains the seller header block + a table of original invoices to be credited. |
| **Input – Target** | The master SDI template (`.xlsx`) — a consolidation register that already holds many sellers' rows. |
| **Output** | The same template with this seller's rows added, downloadable as a fully Excel‑compatible `.xlsx`. |

For each **qualifying** original invoice the tool writes **two rows**, matching the template's own pattern:

1. **Credit note** — reverses the original invoice in full (negative Net / VAT / Total at the original 22 % rate), SDI reason **`TD04`**.
2. **Rebill** — re‑issues the revised net at **0 % VAT** under the exemption certificate, SDI reason **`TD01`**.

The net cash effect to the seller equals the reversed VAT — i.e. the *Net VAT Refund* in the source.

---

## 2. Field‑mapping analysis

### 2.1 Source structure (auto‑detected by label / header text, not by fixed position)

**Seller header block** (key/value rows): `Seller MCID`, `Seller Legal Name`,
`Does Seller has Multiple Account`, `Seller Address`, `VAT registration number`,
`VAT Certificate Protocol Number`, `Seller Exemption Threshold`,
`Seller Exemption Certificate Start Date`, `Seller Used Exemption Amount`, `Seller Remaining Threshold`.

**Invoice line‑item table** (one row per original invoice). Recognised columns:
`Sno`, `Paragon Ticket Number`, `Original Invoice Number`, `Original Invoice Gross Value`,
`Original Invoice Net Value`, `Original Invoice VAT Component`, `Original Invoice Date`,
`Seller Original Invoice Link`, `Qualify for Credit Note`,
`Credit Note Reason for … disqualification`, `VAT Refund Reason code`,
`Revised Invoice Net Value`, `Credit Note Gross Value`, `Net VAT Refund to the Seller`,
`Invoice Reason code`, `Credit Note Reference Number`, `Corresponding Revised invoice Number`,
`SPLAT Request Link`, `Date When Submitted to SDI System`, `SDI Submission Time Stamp`.

### 2.2 Target template (`VAT Compliance Sheet Italy`, columns A–AN)

The tool matches each target column by its **header text** (row 1), so it keeps working even if columns
are re‑ordered. All 40 columns are resolved; styles are inherited per‑column from the template's own data rows.

### 2.3 Source → Target map

**Seller‑level (repeated on every generated row)**

| Source | → Target column | Notes |
|---|---|---|
| Seller MCID | **A** Case Id | Seller account identifier (numeric) |
| Seller Legal Name | **U** Customer name | The seller is Amazon's *customer* for these fees |
| VAT registration number | **L** Customer VAT number | Seller's VAT number |
| Seller Address | **V / W / X / Y** | Parsed → street / postcode / town / country (`IT → Italy`) |
| Seller Exemption Certificate Start Date | **AM** FE Date | Exemption certificate start date (written as a date) |
| VAT Certificate Protocol Number | **AN** FE Number | Exemption certificate protocol number |

**Per invoice → Credit row (TD04) and Rebill row (TD01)**

| Source | → Credit row | → Rebill row |
|---|---|---|
| Original Invoice Number | **S** | **S** |
| Original Invoice Date | **R**; **F/G** = that invoice's month start/end | **R**; **F/G** = *issue* month start/end |
| Original Invoice Net Value | **Z**/**AF** = −Net | — |
| Original Invoice VAT Component | **AA**/**AG** = −VAT | **AA**/**AG** = 0 |
| Original Invoice Gross Value | **AB**/**AH** = −Gross | — |
| Revised Invoice Net Value | — | **Z / AB / AF / AH** = +Revised Net |
| *(derived)* VAT rate | **AI** = original rate (e.g. 22) | **AI** = 0 |
| Credit Note Reference Number | **I** (when filled by SPS) | — |
| Corresponding Revised invoice Number | — | **I** (when filled by SPS) |
| Date When Submitted to SDI System | **AK** Date accepted in SDI | **AK** |
| *(constant)* | **N** = `Credit`, **AL** = `TD04` | **N** = `Rebill`, **AL** = `TD01` |

**From the settings panel / constants**

| Setting (default) | → Target column |
|---|---|
| Use Case (`VAT rate adjustment`) | **B** |
| Updated By | **C** |
| Credit‑note issue date (today) | **E**; **D** = month name; rebill **F/G** period |
| Amazon VAT reg. (`IT08973230967`) | **K** |
| AEU Marketplace (`IT`) | **J** |
| Reason for credit | **Q** |
| `Services` | **O** Goods/Services |
| `EUR`, FX `1` | **AC / AE**, **AD** |

**Left blank** (not present in the source — filled later by the downstream / SPS team):
**H** Accounting period, **I** Rebill/credit number *(pending SPS)*, **M** Italian fiscal code,
**P** SP business status, **T** Fee type name, **AJ** SDI Identifier.

---

## 3. Data‑transformation logic

* **Two‑row expansion** — every qualifying invoice becomes a Credit + Rebill pair (the template's native SDI pattern). 21 invoices → 42 rows.
* **Sign convention** — the Credit row negates the original Net/VAT/Gross; the Rebill row carries the positive revised net with zero VAT.
* **VAT rate** is derived from the source (`round(VAT / Net × 100)`), so it adapts if a row isn't 22 %.
* **Dates** are parsed from `DD‑MM‑YY` (European, day‑first), ISO, or Excel serials, and written back as real Excel date serials using the template's date style.
* **Numbers** accept thousands separators (`1,130,000`) and parentheses negatives; values are transferred at full source precision.
* **Addresses** are split on commas into street / postcode (4–5 digits) / town / country, with graceful fallback.
* **Qualification gate** — rows whose *Qualify for Credit Note* = `No` are skipped (warning); rows missing an invoice number are skipped (error). Blank/missing values elsewhere are handled gracefully and surfaced as warnings.
* **Reconciliation check** — warns when `Gross ≠ Net + VAT`.

### Format preservation (how)

The output is produced by **surgically editing only the worksheet XML** inside the `.xlsx` ZIP:
new `<row>` elements reuse the template's own per‑column style indices, and new text is written as
*inline strings* so `sharedStrings.xml` is never touched. `styles.xml`, `theme`, `externalLinks`
(the FX‑rate link), column widths, the auto‑filter and every other sheet are passed through
byte‑for‑byte. `calcChain.xml` is dropped so Excel rebuilds it cleanly (no "repair" prompt), and the
sheet dimension / auto‑filter / `_FilterDatabase` ranges are extended to the new last row.

---

## 4. Instructions for use

1. Open **`index.html`** in a browser (double‑click, or host it anywhere static).
2. **Drag & drop** (or click) the **Source** file (`.csv`/`.xlsx`) and the **Target** template (`.xlsx`).
   Each upload shows a live status (✓ loaded / ✕ error).
3. Review the **Mapping settings** — issue date, Use Case, Updated By, Amazon VAT, marketplace, reason.
   Defaults come from the template and SOP.
4. Choose a **write mode**:
   * **Append** *(default)* — keep all existing template rows, add this seller after the last one (for consolidation).
   * **Replace** — clear existing data rows (keep the header) and write this seller from row 2.
5. Click **⚙️ Process & map**. Watch the progress bar, then review the **Mapping summary**:
   fields detected, columns mapped, columns left blank, and validation errors/warnings, plus a preview of the generated rows.
6. Click **⬇️ Download populated template** to save the Excel file
   (`SDI_Credit_Note_Request_<Seller>_<date>.xlsx`). Open it in Excel — formatting, formulas and the FX link are intact.

---

## 5. Assumptions

* **Customer = the seller.** Amazon issues these credit notes *to* the seller, so the seller's legal name / VAT / address populate the *Customer* columns.
* **Case Id = Seller MCID** (the template groups rows by a per‑seller id).
* **Issue date defaults to today**; it drives the *Month*, *Invoice Date* and the rebill period (start/end of the issue month). The credit row's period follows the original invoice's month.
* **Dates are day‑first** (`DD‑MM‑YY`), matching the Italian source; **comma = thousands**, **dot = decimal**.
* **Amazon VAT `IT08973230967`** and **marketplace `IT`** are pre‑filled from the template — override in settings if needed.
* The **Rebill/credit number (col I)** is produced downstream (SPS / issuing team); it is left blank with an info note when absent in the source.
* **FE Date (col AM)** and **FE Number (col AN)** carry the seller's exemption certificate **Start Date** and **Protocol Number** (repeated on every row, since the certificate applies to the whole seller).
* `Use Case` defaults to **VAT rate adjustment** (the 22 % → 0 % mechanic); switch to *VAT Refund* etc. per your SOP.

---

## 6. Recommended future enhancements

* **Batch processing** — accept many seller files at once and consolidate them into a single template run.
* **Saved mapping configurations** — persist settings and custom column mappings (localStorage / export‑import JSON) per workflow.
* **Validation dashboard** — totals reconciliation (Σ credits vs. Σ rebills vs. exemption used/remaining), per‑seller threshold checks, and exportable validation reports.
* **Audit log** — record source file name/hash, settings, row counts and a timestamp into a hidden sheet or sidecar file for traceability.
* **Mapping editor UI** — let users remap or override any source→target column without code changes.
* **Drag‑and‑drop multi‑select & templates library** — remember the last target template; drag several sources onto one window.
* **i18n / locale options** — explicit date‑order and decimal‑separator toggles for non‑IT marketplaces.

---

## 7. Technical notes

* **Single file**, no backend, all processing client‑side.
* **Libraries:** [fflate](https://github.com/101arrowz/fflate) (ZIP read/write) is **inlined**; the CSV parser, minimal XLSX reader, mapping engine and the format‑preserving XLSX writer are hand‑written and commented (sections A–F in the `<script>`).
* **Browser support:** any current Chrome / Edge / Firefox / Safari (uses `FileReader`, `Blob`, `TextEncoder`).
* **Error handling:** invalid file types, non‑ZIP `.xlsx`, missing worksheets, unparseable dates and missing mandatory fields are all caught and reported in the UI.
