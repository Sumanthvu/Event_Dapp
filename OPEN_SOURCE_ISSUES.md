# Open Source Issue Seed List (12 Total)

This file gives you ready-to-create GitHub issues based on the current codebase.

Difficulty split:
- Easy: 4
- Medium: 4
- Hard: 4

Suggested labels to create first:
- difficulty:easy
- difficulty:medium
- difficulty:hard
- frontend
- backend
- subgraph
- testing
- docs
- security
- ui-ux
- good first issue

---

## Easy (4)

### 1) Replace outdated frontend README with real project docs
- Difficulty: easy
- Labels: difficulty:easy, docs, good first issue
- Scope:
  - event-dappp/README.md
- Problem:
  - The frontend README is still the default Create React App template and does not explain this dApp.
- Expected work:
  - Replace it with real setup steps, env vars, scripts, architecture summary, and troubleshooting.
- Acceptance criteria:
  - README includes install/run/build/test commands.
  - README includes required env var names (without secrets).
  - README explains how frontend connects to contract and subgraph.

### 2) Fix outdated default React test
- Difficulty: easy
- Labels: difficulty:easy, testing, good first issue
- Scope:
  - event-dappp/src/App.test.js
- Problem:
  - Test still checks for "learn react" text and does not match the actual UI.
- Expected work:
  - Update tests to assert visible app content from current app flow.
- Acceptance criteria:
  - Tests pass with npm test.
  - No references to "learn react" remain.

### 3) Remove debug console logs from production UI paths
- Difficulty: easy
- Labels: difficulty:easy, frontend, good first issue
- Scope:
  - event-dappp/src/App.js
  - event-dappp/src/components/UserProfile.jsx
  - event-dappp/src/components/EventList.jsx
- Problem:
  - Multiple console logs are still present in normal user flows.
- Expected work:
  - Remove or guard debug logs behind a development flag.
- Acceptance criteria:
  - No noisy logs in production runtime.
  - Error logging remains meaningful.

### 4) Improve mobile nav/header usability
- Difficulty: easy
- Labels: difficulty:easy, ui-ux, frontend, good first issue
- Scope:
  - event-dappp/src/App.css
- Problem:
  - Header/nav behavior on small screens can be improved for readability and touch usage.
- Expected work:
  - Improve spacing, button sizing, and wrapping behavior for mobile widths.
- Acceptance criteria:
  - Navigation remains usable on <=480px and <=768px screens.
  - No overlap between title, nav, and wallet actions.

---

## Medium (4)

### 5) Replace hash-based profile navigation with app state navigation
- Difficulty: medium
- Labels: difficulty:medium, frontend, ui-ux
- Scope:
  - event-dappp/src/components/UserProfile.jsx
  - event-dappp/src/App.js
- Problem:
  - Profile buttons currently use window.location.hash, but app routing is state-based.
- Expected work:
  - Pass navigation callbacks from App into UserProfile and switch pages through state.
- Acceptance criteria:
  - "Create Your First Event" opens create-event page.
  - "Browse Events" opens event-list page.
  - No hash mutations are used.

### 6) Add robust validation and inline errors for event creation form
- Difficulty: medium
- Labels: difficulty:medium, frontend, ui-ux
- Scope:
  - event-dappp/src/components/CreateEventPage.jsx
- Problem:
  - Form relies mostly on basic input attributes and generic error messages.
- Expected work:
  - Add clear validation for date-in-future, positive numeric values, reasonable ticket bounds, and user-friendly field errors.
- Acceptance criteria:
  - Invalid fields display inline messages.
  - Submit remains disabled until form is valid.
  - Error messages are specific and actionable.

### 7) Refactor legacy commented blocks and split large components
- Difficulty: medium
- Labels: difficulty:medium, frontend, cleanup
- Scope:
  - event-dappp/src/App.js
  - event-dappp/src/components/EventList.jsx
  - event-dappp/src/components/CreateEventPage.jsx
  - event-dappp/src/components/UserProfile.jsx
- Problem:
  - Files contain large commented-out legacy implementations, making maintenance difficult.
- Expected work:
  - Remove dead/commented code and extract reusable logic into smaller helpers/hooks.
- Acceptance criteria:
  - Active code is clearly separated and readable.
  - No giant commented legacy sections remain.
  - No behavior regression in existing flows.

### 8) Centralize Graph query layer and improve fetch resilience
- Difficulty: medium
- Labels: difficulty:medium, frontend, subgraph
- Scope:
  - event-dappp/src/App.js
  - event-dappp/src/graphql/queries.js
- Problem:
  - Query constants and request config are duplicated/inlined in App.
- Expected work:
  - Move query + URL + request helper into graphql module and use consistent react-query options (staleTime/retry/error states).
- Acceptance criteria:
  - App consumes shared query module.
  - Friendly error state and retry behavior are visible to users.
  - No hardcoded placeholder API token strings in UI code.

---

## Hard (4)

### 9) Security hardening: remove exposed secrets and implement safe IPFS upload flow
- Difficulty: hard
- Labels: difficulty:hard, security, frontend, backend
- Scope:
  - event-dappp/src/components/CreateEventPage.jsx
  - event-dappp/src/index.js
  - Add backend endpoint or serverless function for signed upload flow
- Problem:
  - Pinata API credentials and JWT are present in frontend code; comments also expose sensitive info.
- Expected work:
  - Remove all secrets from client code.
  - Add secure server-side upload signing/token exchange pattern.
  - Rotate compromised credentials.
- Acceptance criteria:
  - No secrets in git-tracked frontend files.
  - Upload still works end-to-end.
  - README documents secure setup.

### 10) Replace boilerplate subgraph tests with real mapping coverage
- Difficulty: hard
- Labels: difficulty:hard, subgraph, testing
- Scope:
  - event-ticketinng/tests/event-ticketing.test.ts
  - event-ticketinng/tests/event-ticketing-utils.ts
  - event-ticketinng/src/event-ticketing.ts
- Problem:
  - Current tests are scaffold-style and not aligned with active mapping handlers and entities.
- Expected work:
  - Write tests for EventCreated, TicketPurchased, SpecialOfferMinted, StakeClaimed, and user level transitions.
- Acceptance criteria:
  - graph test passes with meaningful assertions on Event, Ticket, and User entities.
  - Test cases include normal flow and edge cases.

### 11) Improve subgraph data model with relationships and pagination-ready queries
- Difficulty: hard
- Labels: difficulty:hard, subgraph, backend
- Scope:
  - event-ticketinng/schema.graphql
  - event-ticketinng/src/event-ticketing.ts
  - event-dappp/src/graphql/queries.js
  - event-dappp/src/App.js
- Problem:
  - Schema currently stores IDs/arrays but lacks richer graph relationships and scalable query patterns.
- Expected work:
  - Add relation fields (for example Event-to-Ticket, User-to-Ticket via derived fields), regenerate types, and update frontend queries for pagination.
- Acceptance criteria:
  - New schema compiles and subgraph builds.
  - Frontend uses pagination parameters instead of fixed shallow slices.
  - Existing views still render correctly.

### 12) Add CI quality gates for frontend and subgraph
- Difficulty: hard
- Labels: difficulty:hard, testing, devops
- Scope:
  - .github/workflows/* (new)
  - event-dappp package scripts
  - event-ticketinng package scripts
- Problem:
  - Repo currently lacks automated checks for pull requests.
- Expected work:
  - Add GitHub Actions workflow(s) to run frontend install/build/test and subgraph codegen/build/test.
- Acceptance criteria:
  - PRs trigger CI automatically.
  - Failing checks block bad changes from merging.
  - Workflow docs are added to README.

---

## Suggested Milestones
- v0.1 contributor onboarding: issues 1-4
- v0.2 maintainability: issues 5-8
- v0.3 reliability and security: issues 9-12

## Suggested Assignment Strategy
- Keep easy issues unassigned for new contributors.
- Tag 1-2 medium issues with help wanted.
- Keep hard issues as mentor-led tasks with architecture notes.
