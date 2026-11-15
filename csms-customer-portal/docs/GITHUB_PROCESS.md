# How we work in GitHub

## Roles
- **Maintainers** (owner, tech lead): merge changes, manage labels and milestones.
- **Contributors** (ops, sales, support, finance): open issues, comment, review wording and data rules.
- **Observers**: read and comment.

## Where things go
| Need | Use |
|---|---|
| Question or idea | Issue with `question` or `idea` label |
| Decision required | Issue with `decision-needed`, assigned to the decider, due date set |
| Bug or problem | Issue using the bug template |
| Change to docs, email copy, config | Branch, then Pull Request |
| Progress view | GitHub Project board: Backlog, Ready, In progress, Review, Done |

## Rules
1. One topic per issue. Link related issues.
2. `main` is protected: changes arrive by Pull Request with at least 1 approval.
3. Branch names: `docs/short-name`, `feature/short-name`, `fix/short-name`.
4. Decisions are written down in the issue and summarized in `docs/` (Architecture Decision Record style: context, decision, consequence).
5. **Never post** customer names, phone numbers, addresses, passwords, or API keys. Use fake sample data.
6. Respond to a `decision-needed` issue within 3 business days or the decider may proceed.
7. Weekly 20-minute check-in; notes posted as an issue comment.

## Labels
`decision-needed`, `question`, `idea`, `bug`, `data`, `design`, `security`, `training`, `blocked`, `phase-0` through `phase-7`.

## Milestones
One milestone per phase in WORKFLOW.md, each with its gate sign-off as the last checklist item.
