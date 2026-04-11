// Dynamic app config extends app.json with runtime environment variables.
// PostHog keys are read here and passed to the app via expo-constants extras.
// @see https://docs.expo.dev/versions/latest/config/app/
const baseConfig = require('./app.json')

export default {
  ...baseConfig.expo,
  extra: {
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST,
  },
}
