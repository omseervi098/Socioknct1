import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const development = {
  name: "Development",
  port: process.env.PORT || 5000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GOOGLE_MAILER_USERNAME,
      pass: process.env.GOOGLE_MAILER_PASSWORD,
    },
  },
  weatherApiKey: process.env.WEATHER_APIKEY,
  newsApiKey: process.env.NEWS_APIKEY,
  rateLimit1: process.env.RATELIMIT1,
  rateLimit2: process.env.RATELIMIT2,
  webSocketUrl: process.env.WEBSOCKET_URI,
};
const production = {
  name: "Production",
  port: process.env.PORT || 5000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GOOGLE_MAILER_USERNAME,
      pass: process.env.GOOGLE_MAILER_PASSWORD,
    },
  },
  weatherApiKey: process.env.WEATHER_APIKEY,
  newsApiKey: process.env.NEWS_APIKEY,
  rateLimit1: process.env.RATELIMIT1,
  rateLimit2: process.env.RATELIMIT2,
  webSocketUrl: process.env.WEBSOCKET_URI,
};
export default process.env.NODE_ENV === "development"
  ? development
  : production;
