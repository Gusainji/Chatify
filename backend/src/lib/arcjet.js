import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const isProd = ENV.NODE_ENV === "production";

const aj = arcjet({
  // Your Arcjet site key (keep it secret!)
  key: ENV.ARCJET_KEY,

  rules: [
    // Basic protection (SQL injection, XSS, etc.)
    shield({ mode: "LIVE" }),

    // Bot detection rule
    detectBot({
      mode:"LIVE", // In dev, log only instead of blocking
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc.
        "CATEGORY:DEVELOPER_TOOL",
        "AGENT:PostmanRuntime", // ✅ specifically allow Postman
      ],
    }),

    // Rate limiting rule (100 req per 60s)
    slidingWindow({
      mode: isProd ? "LIVE" : "DRY_RUN",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
