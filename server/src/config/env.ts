const requireEnvVars = ["PORT", "MONGODB_URI"] as const;

requireEnvVars.forEach((key) => {
  if (!process.env[key])
    throw new Error(`Missing required environmental variable: ${key}`);
});

export const config = {
  port: Number(process.env.PORT) || 3000,
  mongodbURI: process.env.MONGODB_URI! 
};
