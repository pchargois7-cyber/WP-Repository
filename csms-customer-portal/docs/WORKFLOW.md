# Workflow: from idea to live portal

Each phase ends with a **gate**: a named person signs off in GitHub before the next phase starts.

| # | Phase | Key work | Deliverable | Gate (sign-off) |
|---|---|---|---|---|
| 0 | Discovery | Document how the proprietary CSMS CRM exposes data (API, DB access, or exports) and who supports it. Inventory the data we hold per stored item. Decide the privacy rules. | Completed open-questions list, data inventory | Owner approves scope |
| 1 | Design | Pick the build option (see ARCHITECTURE). Define the Storage Item record, portal screens, notification wording. | Approved architecture + wireframes | Owner + Ops lead |
| 2 | Data foundation | Create the Storage Item structure in GHL, build the CSMS CRM-to-GHL sync, match customers by CSMS customer ID, run the first full import. Clean duplicate contacts. | Populated sandbox with 10-20 real-shaped test records | Ops lead confirms data matches the warehouse |
| 3 | Build | Login, "My Storage" view, item detail, request-a-pull / contact buttons, branded look, welcome and reset emails. | Working pilot in a GHL sandbox/sub-account | Tech lead |
| 4 | Test (UAT) | Staff and 5-10 friendly customers try it. Security checks. | Signed test log | Owner + Ops lead |
| 5 | Pilot launch | Invite a small batch of customers. Watch support volume. | Pilot report | Owner |
| 6 | Full rollout | Invite everyone in waves, train staff, publish help page. | Live portal | Owner |
| 7 | Operate | Monthly data audit, backlog review, feature requests via Issues. | Monthly check-in notes | Ongoing |

## Core customer flow
1. CSMS staff create or update a storage record in the CSMS CRM (item, unit/location, date in, status).
2. The sync service copies it to GHL against the customer's contact.
3. Customer receives an invite email, sets a password (or uses a magic link).
4. Customer logs in and sees only their own items.
5. Customer can request an item retrieval or ask a question. This creates a task or opportunity in the CRM for staff.

## Automation workflows to build in GHL
- **New storage customer:** tag added, then portal invite sent, then follow-up reminder after 3 days if not logged in.
- **Item status change:** optional text/email notice (in storage, scheduled for delivery, delivered).
- **Retrieval request:** form creates a task for the dispatcher, sends a confirmation to the customer.
- **Login help:** password reset and "can't find my item" routes to a staff inbox.
- **Monthly storage summary:** optional email listing items on file.

## Definition of done (every phase)
- Work tracked in a GitHub Issue and merged by Pull Request.
- Decisions recorded in `docs/` (not only in email or chat).
- Gate sign-off posted as a PR approval or issue comment.
