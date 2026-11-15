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

**Recommendation:** run a 1-2 day Phase 0 spike on Option A. If it can show a customer's own Storage Items after login, use it. If not, go with Option B.

## Authentication
- Email and password or magic link, with password reset.
- Match login email to the CRM contact; one contact, one login.
- Staff accounts are separate from customer accounts.

## CRM connection
- If CSMS CRM **is** GHL: store Storage Items directly in GHL.
- If it is a **separate system**: scheduled or webhook sync into GHL (one direction, CRM to GHL), with a log of failures and an alert to ops.

## Security and privacy checklist
- Customer can open only own records (test by trying another customer's ID).
- HTTPS only; session timeout; rate-limited login.
- Photos and documents not publicly guessable URLs.
- Data retention and deletion rules agreed.
- Access review for who holds admin rights in GHL and GitHub.
