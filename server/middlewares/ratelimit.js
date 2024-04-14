import setRateLimit from "express-rate-limit";
import environment from "../config/environment.js";
console.log(environment.rateLimit1, environment.rateLimit2);
// Rate limit middleware
export const rateLimit1 = setRateLimit({
  windowMs: 60 * 1000,
  max: environment.rateLimit1,
  message: `You have exceeded your ${environment.rateLimit1} requests per minute limit.`,
  headers: true,
});
export const rateLimit2 = setRateLimit({
  windowMs: 60 * 1000,
  max: environment.rateLimit2,
  message: `You have exceeded your ${environment.rateLimit2} requests per minute limit.`,
  headers: true,
});
