const requireEnvVars = [
  "PORT",
  "NODE_ENV",
  "CLIENT_URL",
  "MONGODB_URI",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "RESET_TOKEN_SECRET",
  "ACCESS_TOKEN_EXPIRY",
  "REFRESH_TOKEN_EXPIRY",
  "RESET_TOKEN_EXPIRY",
] as const;

requireEnvVars.forEach((key) => {
  if (!process.env[key])
    throw new Error(`Missing required environmental variable: ${key}`);
});

export const config = {
  port: Number(process.env.PORT) || 3000,
  isProduction: process.env.NODE_ENV === "production",
  clientURL: process.env.CLIENT_URL!,
  mongodbURI: process.env.MONGODB_URI!,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  resetTokenSecret: process.env.RESET_TOKEN_SECRET!,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY!,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY!,
  resetTokenExpiry: process.env.RESET_TOKEN_EXPIRY!,
};
