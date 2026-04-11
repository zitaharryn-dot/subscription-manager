<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into **Subly**, a React Native / Expo subscription manager app. The integration covers user identity, authentication events, subscription lifecycle tracking, and screen analytics — giving you full visibility into your users' journey from sign-up through ongoing engagement.

## What was changed

| File | Changes |
|------|---------|
| `app.config.js` | Created — dynamic Expo config that exposes `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` env vars to the app via `expo-constants` extras |
| `.env` | Created — stores `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` (git-ignored) |
| `lib/posthog.ts` | Created — PostHog client singleton, reads keys from `Constants.expoConfig.extra`, disabled gracefully if token is missing |
| `app/_layout.tsx` | Updated — wraps app in `PostHogProvider`, adds manual screen tracking via `posthog.screen()` on pathname changes (Expo Router compatible) |
| `app/(auth)/sign-in.tsx` | Updated — identifies user and captures `user_signed_in` on successful password and MFA sign-in |
| `app/(auth)/sign-up.tsx` | Updated — identifies user and captures `user_signed_up` after email verification completes |
| `app/(tabs)/settings.tsx` | Updated — captures `user_signed_out` and calls `posthog.reset()` before Clerk sign-out |
| `components/CreateSubscriptionModal.tsx` | Updated — captures `subscription_created` with name, price, billing frequency, and category |
| `app/(tabs)/index.tsx` | Updated — captures `add_subscription_tapped` when the + button is pressed, and `subscription_expanded` when a card is expanded |
| `app/(tabs)/subscriptions.tsx` | Updated — captures `subscription_searched` (debounced 800ms) when the search input is used |

## Events instrumented

| Event | Description | File |
|-------|-------------|------|
| `user_signed_up` | User completes email verification and creates a new account | `app/(auth)/sign-up.tsx` |
| `user_signed_in` | User successfully signs in (password or MFA) | `app/(auth)/sign-in.tsx` |
| `user_signed_out` | User taps Sign Out in Settings | `app/(tabs)/settings.tsx` |
| `subscription_created` | User creates a new subscription via the modal form | `components/CreateSubscriptionModal.tsx` |
| `subscription_expanded` | User expands a subscription card to view details | `app/(tabs)/index.tsx` |
| `subscription_searched` | User submits a non-empty search on the subscriptions tab | `app/(tabs)/subscriptions.tsx` |
| `add_subscription_tapped` | User taps the + button on the home screen | `app/(tabs)/index.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/157258/dashboard/615612
  - [Sign-up to first subscription funnel](https://eu.posthog.com/project/157258/insights/Dt9S6cEY) — activation funnel: sign-up → first subscription created
  - [Daily sign-ups vs sign-ins](https://eu.posthog.com/project/157258/insights/EGPsNdBy) — acquisition and return engagement over time
  - [Subscriptions created by category](https://eu.posthog.com/project/157258/insights/dTNFoHpK) — which subscription types users track most
  - [Daily sign-outs (churn signal)](https://eu.posthog.com/project/157258/insights/Zey9NmfZ) — proxy for session churn
  - [Add subscription button to created conversion](https://eu.posthog.com/project/157258/insights/G5oYifnU) — modal completion rate

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
