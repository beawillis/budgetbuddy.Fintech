# BudgetBuddy Fintech

BudgetBuddy is a mobile-first fintech application for personal savings, goal tracking, transaction management, wallet visibility, financial reports, and AI-assisted money guidance. The app is built with Next.js, React, TypeScript, Tailwind CSS, and a live BudgetBuddy backend API.

## Highlights

- Mobile-first fintech dashboard with wallet balance, goals, recent activity, and quick actions
- Authentication flows for sign in, sign up, password recovery, and session restoration
- Savings goals with goal creation, progress tracking, and goal deposits
- Transactions screen with backend-backed create, refresh, and delete actions
- Wallet summary integration with defensive parsing for multiple backend response shapes
- Reports screen with weekly, monthly, and yearly views
- PDF report download and email report actions wired to backend report services
- Profile management, notifications, two-factor setup screens, savings, emergency, challenge, loans, investments, and assistant experiences
- JWT-based protected API access using browser local storage

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- Deployed backend integration via REST API

## Backend Integration

The frontend reads `NEXT_PUBLIC_API_URL` and falls back to the deployed Railway API:

```env
NEXT_PUBLIC_API_URL=https://budgetbuddy-backend-production-81d7.up.railway.app
```

Implemented API areas include:

| Area | Frontend Support |
| --- | --- |
| Auth | Register, login, forgot password, reset password, 2FA setup/status |
| User profile | Get profile, update profile, avatar upload, change password |
| Dashboard | Dashboard summary and wallet-derived metrics |
| Wallet | Wallet summary, balance, income, and expenses |
| Transactions | List, create, and delete transactions |
| Goals | List goals, create goals, deposit into goals |
| Reports | Summary, PDF download, and email report actions |
| Categories | List/create/delete category API methods |
| Savings | Start plan, deposit, and status |
| Challenge | Start challenge and fetch challenge data |
| Emergency | Emergency endpoint integration |
| Loans | Loan calculator and saved loan endpoint |
| Investments | Investment simulation endpoint |
| Notifications | Notifications endpoint |
| Assistant | Backend assistant chat endpoint |

Protected endpoints expect a JWT stored as:

```text
budgetbuddy.token
```

The signed-in user snapshot is stored as:

```text
budgetbuddy.user
```

## Wallet and Transactions

Wallet and transaction support is now implemented as first-class app functionality:

- `GET /api/v1/wallet/summary` powers wallet balance, income, and expense values.
- `GET /api/v1/transactions` loads activity into app state.
- `POST /api/v1/transactions` is used by the Transactions screen create form.
- `DELETE /api/v1/transactions/:id` is used by transaction delete actions.
- Transaction and wallet parsing supports common backend response formats, including arrays, wrapped `data`, `transactions`, `items`, `results`, and paginated-style `docs`.

## Reports, PDF, and Email

The Reports screen connects to backend report functionality:

- Report summary by period: weekly, monthly, yearly
- PDF report download
- Email report delivery

The API layer includes fallback route support for common report endpoint names so the frontend remains tolerant while backend route names settle.

## Project Structure

```text
app/
  globals.css          Global styles and Tailwind theme tokens
  layout.tsx           Root layout and metadata
  page.tsx             App entry point

components/
  ScreenRenderer.tsx   Screen routing and bottom navigation
  screens/             Main app screens
  ui/                  Shared UI primitives

lib/
  api.ts               Backend API client
  AppContext.tsx       App state, data refresh, and backend response normalization
  greetings.ts         Time-based greeting helpers
  utils.ts             Shared utilities

public/
  logo.png             App logo
  icons/placeholders   Static app assets
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create an environment file if you need to override the default backend URL:

```bash
NEXT_PUBLIC_API_URL=https://budgetbuddy-backend-production-81d7.up.railway.app
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Runs the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a build.

```bash
npm run lint
```

Runs the configured lint command. Note: this project currently declares the script, but the local `eslint` binary may need to be installed/configured before the command can run successfully.

## Verification

The app has been verified with:

```bash
npm.cmd run build
```

The production build completes successfully.

## Implementation Notes

- The app uses client-side screen routing through `ScreenRenderer` rather than file-based routes for every view.
- Protected requests automatically attach `Authorization: Bearer <token>`.
- Backend responses using `{ success, data }` are unwrapped in the API client.
- Wallet, goals, and transactions are normalized in `AppContext` to reduce coupling to one exact backend response shape.
- Deposit actions refresh backend-backed state after completion so wallet and activity data stay current.

## Status

BudgetBuddy currently has working frontend coverage for the core fintech flows: authentication, dashboard, wallet, transactions, goals, reports, PDF/email actions, and supporting financial tools. Remaining production hardening should focus on full TypeScript cleanup, lint setup, automated tests, and confirming final backend report route names.
