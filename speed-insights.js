// Import and initialize Vercel Speed Insights
import { injectSpeedInsights } from './node_modules/@vercel/speed-insights/dist/index.mjs';

// Initialize Speed Insights
// This will automatically track web vitals and performance metrics
injectSpeedInsights({
  debug: false, // Set to true to enable debug logging in development
});
