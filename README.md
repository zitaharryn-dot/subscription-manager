# Subly

A React Native subscription tracker built with Expo and Expo Router.

This app helps users manage recurring services by tracking upcoming renewals, subscription balances, and detailed billing information.

## Features

- User authentication using Clerk
- Home dashboard with current subscription balance
- Upcoming renewals carousel
- Full subscription list with expandable details
- Add new subscriptions via modal form
- Analytics events captured with PostHog
- Styled using NativeWind and Expo components

## Getting started

### Prerequisites

- Node.js
- pnpm
- Expo CLI (`npm install -g expo-cli` or `pnpm add -g expo-cli`)

### Install dependencies

```bash
pnpm install
```

### Run locally

```bash
pnpm start
```

Then choose one of the available Expo targets:

- Android emulator
- iOS simulator
- Expo Go
- Web

### Useful scripts

- `pnpm start` — Start the Expo development server
- `pnpm android` — Launch on Android
- `pnpm ios` — Launch on iOS
- `pnpm web` — Run the web version
- `pnpm lint` — Run ESLint checks

## App structure

- `app/` — App routes and screen entry points
- `components/` — Reusable UI components
- `constants/` — Static data, icons, and images
- `lib/` — App utilities, context, and analytics setup
- `global.css` — Global styling with NativeWind and Tailwind configuration

## Technology stack

- Expo
- Expo Router
- React Native
- TypeScript
- Clerk for authentication
- PostHog for event tracking
- NativeWind for styling
- Day.js for date formatting

## Notes

The app is designed as a subscription management experience with a mobile-first interface. New subscriptions are added through a modal and details can be expanded inline for quick access.

If you want to extend this app, consider adding persistent storage for subscriptions or multi-user data sync.
