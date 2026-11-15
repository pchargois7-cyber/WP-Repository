# Architecture

## Principles
- **CRM is the source of truth.** The portal is read-mostly.
- **Least exposure.** A customer sees only records linked to their own contact. No other customer's data is ever in the page.
- **No secrets in GitHub.** API keys and tokens live in GHL or a secrets manager, never in this repo.

## Data model (draft)
**Storage Item** (GHL custom object, associated to Contact)
- Item ID, description, category (furniture, boxes, vehicle, etc.)
- Quantity, condition notes, photo(s)
- Unit / location code
- Date in, scheduled out date, status (In Storage, Retrieval Requested, Out for Delivery, Released)
- Monthly rate / balance (optional, show only if finance approves)

## Build options
| Option | How | Pros | Cons |
|---|---|---|---|
| A. Native GHL | Client Portal / membership site with custom-object data shown on a page | Fastest, no hosting, stays inside GHL | Display flexibility depends on what GHL supports; must be verified in Phase 0 |
| B. Custom app + GHL API | Small web app, login via magic link, reads Contacts and custom objects through the GHL API (Private Integration token) | Full control of layout and features | Needs hosting, security upkeep, developer |
| C. Marketplace app (OAuth) | Registered GHL Marketplace app | Installable across sub-accounts, resellable | Most overhead; only worth it if sold to other businesses |

**Decision (confirmed):** Option A. GHL's native portal can show a customer their own Storage Items after login, so we build there. Options B and C stay as fallbacks only if a display need can't be met.

## Authentication
- Email and password or magic link, with password reset.
- Match login email to the CRM contact; one contact, one login.
- Staff accounts are separate from customer accounts.

## CRM connection (confirmed: CSMS CRM is proprietary and separate from GHL)
The CSMS CRM stays the source of truth. A small **sync layer** copies the customer-visible fields into GHL, one direction only (CSMS CRM to GHL). GHL never writes back inventory.

```
CSMS CRM  --(export/API/webhook)-->  Sync service  --(GHL API)-->  GHL Contacts + Storage Item objects  -->  Customer portal
```
Sync service responsibilities:
- Match each CSMS customer to a GHL contact by a stable key (CSMS customer ID stored in a GHL custom field; email is only a fallback).
- Create, update, and archive Storage Items; never delete without a rule.
- Run on a schedule (start: every 15 minutes) or on change events if the CRM can send them.
- Log every run, retry failures, and alert ops on mismatches or failures.
- Hold GHL credentials (Private Integration token) in a secrets store, not in GitHub.

**Integration method, in order of preference** (to be decided in Phase 0 once we know what the CRM offers):
1. CRM API or webhooks
2. Scheduled database view or read replica (read-only account)
3. Scheduled CSV/file export that the sync service ingests

Because the sync service is code, the repo gains a `sync/` folder and needs a small host (e.g., a scheduled cloud function). Which runtime is chosen by the tech lead.

Customer retrieval requests flow the other way as a **GHL task/notification to staff**; staff then act in the CSMS CRM. (Writing requests into the CSMS CRM is out of scope unless it exposes a safe API.)

## Security and privacy checklist
- Customer can open only own records (test by trying another customer's ID).
- HTTPS only; session timeout; rate-limited login.
- Photos and documents not publicly guessable URLs.
- Data retention and deletion rules agreed.
- Access review for who holds admin rights in GHL and GitHub.
