# BudgetBuddy Fintech

BudgetBuddy is a mobile-first fintech app built with Next.js, React, TypeScript, and Tailwind CSS. The experience includes onboarding, authentication, savings goals, deposits, analytics, profile management, and live integration with the BudgetBuddy backend API.

## What has been implemented

- Premium fintech-style UI with polished cards, gradients, and mobile-friendly screens
- Onboarding flow and authentication screens for sign in, sign up, and password recovery
- Main app experience with dashboard, goals, analytics, profile, notifications, and deposit flows
- Goal creation and goal contribution workflows
- Live backend connectivity for:
  - authentication
  - profile management
  - dashboard and wallet summary
  - transactions
  - goals
  - categories
  - challenge, savings, loan, investment, analytics, and assistant endpoints
- Token-based auth persistence using local storage so signed-in users keep their session
- Loading-aware state refresh for dashboard and profile data

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

## Getting started

Install dependencies:

```bash
npm install
```

Create a local environment file and point it to the backend API if needed:

```bash
NEXT_PUBLIC_API_URL=https://budgetbuddy-backend-production-81d7.up.railway.app
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Build

```bash
npm run build
```

## Backend integration notes

The frontend uses the deployed Railway backend and stores the JWT in local storage under the key `budgetbuddy.token`. Protected endpoints are called automatically after sign-in and on app refresh.
