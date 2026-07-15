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
| **Input – Source** (required) | Per‑seller calculation sheet (`.csv` or `.xlsx`). Contains the seller header block + a table of original invoices to be credited. |
| **Target template** (built‑in) | The SDI template is **embedded in the app** — by default you upload **only the seller file**. A clean, fully‑formatted SDI sheet (headers, styles, column widths and the FX‑rate link, no third‑party data) is used as the starting point. |
| **Target template** (optional upload) | Switch to **“Upload my own”** to consolidate this seller into an existing **master** SDI register (a file that already holds other sellers' rows). |
| **Output** | A fully Excel‑compatible `.xlsx` containing this seller's Credit/Rebill rows — either as a fresh sheet (built‑in) or appended to your master (upload). |

> **Why optional?** For a single seller you don't need to supply anything but the calculation file — the tool already knows the exact output layout. You only upload a template when you're *consolidating* into a live master that accumulates many sellers over time.

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
| Seller Exemption Certificate Start Date | **AM** *Identificativo dichiarazione date* | Exemption certificate start date (written as a date) |
| VAT Certificate Protocol Number | **AN** *Identificativo dichiarazione* | Exemption certificate protocol number |

> **Output header relabelling:** in the generated file the last two header cells are renamed
> from `FE Date` / `FE Number` to **`Identificativo dichiarazione date`** / **`Identificativo dichiarazione`**.
> The column matcher accepts *both* the old and the new labels, so the tool keeps working if a
> previously‑generated (already‑renamed) file is re‑used as the target template for consolidation.

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
| Original Invoice Number *(col S)* **+ suffix** | **I** = `<S>` + `/CN` | **I** = `<S>` + `/RB` |
| Credit Note Ref. № / Corresponding Revised № | **I** — used instead *if* the source (SPS) column is filled | *(same, for the rebill)* |
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
**H** Accounting period, **M** Italian fiscal code,
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

### Robustness to messy input

* **Typo‑tolerant column & label matching.** Headers and seller labels are matched first by precise
  keyword rules, then by a **fuzzy fallback** (Damerau‑Levenshtein, so one typo *or* an adjacent letter
  swap is forgiven, e.g. `Orignal Invoice Nmber` → *Original Invoice Number*, `Naem` → *Name*). Fuzzy
  matches raise a **“matched approximately — please verify”** warning so nothing is mapped silently, and
  an ambiguous match is left unmapped rather than guessed.
* **Locale‑aware numbers.** `parseNum` handles US (`1,130,000.50`) and EU (`1.130.000,50`) notation,
  currency symbols, spaces and `(...)` negatives.
* **Flexible dates.** `DD‑MM‑YY`, `DD/MM/YYYY`, ISO and Excel serials are all accepted.
* **Graceful degradation.** Missing invoice numbers / `Qualify = No` rows are skipped with a reason;
  blank optional fields are left empty; mandatory gaps surface as errors — never a silent wrong value.

### Scale & performance

All work is client‑side and synchronous. Measured end‑to‑end (parse → map → write) on a laptop:

| Source invoices | Output rows | Time | Output size |
|---|---|---|---|
| ~20 (typical seller) | ~42 | < 50 ms | ~16 KB |
| 1,000 | 2,000 | ~0.6 s | 0.3 MB |
| 10,000 | 20,000 | ~5 s | 2.6 MB |
| 50,000 | 100,000 | ~30 s | 13 MB |

Repetitive per‑row notes are **aggregated** (e.g. “*N rows: credit‑note numbers not yet filled*”) and the
on‑screen list is capped, so the UI stays light regardless of row count. For the real workflow (tens of
rows per seller) it is effectively instant. The remaining cost at extreme sizes is the synchronous
ZIP/XML build on the main thread — see *Future enhancements* for the Web‑Worker path if 5‑figure row
counts ever become routine.

---

## 4. Instructions for use

1. Open **`index.html`** in a browser (double‑click, or host it anywhere static).
2. **Drag & drop** (or click) the **Source** seller file (`.csv`/`.xlsx`). A live status shows ✓ loaded / ✕ error.
3. **Target template** — leave it on **“⚡ Built‑in SDI template”** (default) to produce a fresh sheet for this seller.
   Only switch to **“📊 Upload my own”** if you're consolidating into an existing master register; then upload it and pick a **write mode**:
   * **Append** *(default for uploads)* — keep all existing rows, add this seller after the last one.
   * **Replace** — clear existing data rows (keep the header) and write this seller from row 2.
4. Review the **Mapping settings** — issue date, Use Case, Updated By, Amazon VAT, marketplace, reason (sensible defaults pre‑filled).
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
* The **Rebill/credit number (col I)** is auto‑generated from the original invoice number (col S): Credit rows get a `/CN` suffix, Rebill rows get an `/RB` suffix (e.g. `IT-AEU-2026-99022` → `…/CN` / `…/RB`). If the source (SPS) already carries an explicit Credit‑Note / Corresponding‑Revised number, that value is used instead.
* The last two columns (**AM / AN**) carry the seller's exemption certificate **Start Date** and **Protocol Number** (repeated on every row, since the certificate applies to the whole seller), and their output headers are relabelled to **`Identificativo dichiarazione date`** and **`Identificativo dichiarazione`**.
* `Use Case` defaults to **VAT rate adjustment** (the 22 % → 0 % mechanic); switch to *VAT Refund* etc. per your SOP.

---

## 6. Recommended future enhancements

* **Web Worker + streaming write** — for 5‑figure row counts, move parsing/zip generation to a Web Worker (with `fflate`'s async API) so the UI never blocks, and drive a *real* per‑row progress bar. Not needed for the current per‑seller volumes, but the clean way to scale to very large consolidations.
* **Batch processing** — accept many seller files at once and consolidate them into a single template run.
* **Saved mapping configurations** — persist settings and custom column mappings (localStorage / export‑import JSON) per workflow.
* **Mapping‑confirmation step** — when fuzzy matching is used, show a small “did you mean” review grid so the user can confirm/correct approximate column matches before processing.
* **Validation dashboard** — totals reconciliation (Σ credits vs. Σ rebills vs. exemption used/remaining), per‑seller threshold checks, and exportable validation reports.
* **Audit log** — record source file name/hash, settings, row counts and a timestamp into a hidden sheet or sidecar file for traceability.
* **Mapping editor UI** — let users remap or override any source→target column without code changes.
* **i18n / locale options** — explicit date‑order and decimal‑separator toggles for non‑IT marketplaces.

---

## 7. Technical notes

* **Single file**, no backend, all processing client‑side.
* **Built‑in template:** a clean SDI template is embedded as base64 inside the HTML. It is a **scrubbed** copy of the master — header row + per‑column styles + column widths + the FX‑rate external link only; **all sample/third‑party rows and strings were removed** (verified: no seller names, VAT numbers or amounts are embedded). On processing it is decoded in‑browser and used as the starting sheet.
* **Libraries:** [fflate](https://github.com/101arrowz/fflate) (ZIP read/write) is **inlined**; the CSV parser, minimal XLSX reader, mapping engine and the format‑preserving XLSX writer are hand‑written and commented (sections A–F in the `<script>`).
* **Browser support:** any current Chrome / Edge / Firefox / Safari (uses `FileReader`, `Blob`, `TextEncoder`, `atob`).
* **Error handling:** invalid file types, non‑ZIP `.xlsx`, missing worksheets, unparseable dates and missing mandatory fields are all caught and reported in the UI.

### Updating the built‑in template

If the master SDI layout changes, regenerate the embedded template: take the new master `.xlsx`, strip its data rows (keep row 1 + one styled prototype row), base64‑encode it, and replace the `EMBEDDED_TPL_B64` constant in `index.html`. The column matcher keys off **header text**, so added/re‑ordered columns keep working as long as the header labels are recognisable.
