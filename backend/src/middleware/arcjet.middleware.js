import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {


// ✅ Skip Arcjet checks on localhost (for Postman/local dev)
if (
  req.hostname === "localhost" ||
  req.hostname === "127.0.0.1" ||
  req.ip === "::1"
) {
  return next();
}


    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        });
      }
    }
    // check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }
    next();
  } catch (error) {
    console.log("Arcjet Protection Error:", error);
    next();
  }
};
